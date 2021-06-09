import amqp, { Channel } from 'amqplib/callback_api';

import { properties } from '@/properties';
import logger from '@/shared/logger.service';
import { requester } from '@/app/features/file-converter/file-converter';
import { io } from '@/shared/socket/socket';
import { RoomService } from '@/app/features/room/room.service';
import { UserService } from '@/app/features/user/user.service';
import { NotFoundError } from '@/shared/errors/not-found.error';
import { Utils } from '@/shared/utils/utils';

export class RabbitmqConfig {
  private readonly roomService = new RoomService();
  private readonly userService = new UserService();
  private rabbitConnection = properties.rabbitMq.url;
  private queueName = 'stock_by_code';
  private channel: Channel | null = null;

  consumer(): void {
    io.on('disconnected', () => this.closeConnection());

    amqp.connect(this.rabbitConnection, (error, connection) => {
      logger.debug(
        'connecting rabbitmq',
        error || connection.getMaxListeners()
      );

      if (error) {
        logger.error(error);
        return;
      }

      connection.createChannel((err, channel) => {
        this.channel = channel;

        if (err) {
          logger.error(err);
          return;
        }

        channel.assertQueue(this.queueName, {
          durable: false,
        });

        channel.consume(
          this.queueName,
          (msg) => {
            const prefix = '/stock=';
            const { message = '', error = '', roomId = '' } = JSON.parse(
              msg?.content.toString() || '{}'
            );
            try {
              /**
               * Returns the stock_code after the /prefix=
               */
              const getStockCode = (prefix: string) => {
                return message.toString().slice(prefix.length, message.length);
              };

              if (error) {
                io.sockets.emit(
                  'updated messages with error',
                  Utils.createBotMessage(error, roomId)
                );
                return;
              }

              if (message.startsWith(prefix)) {
                const stockCode = getStockCode(prefix);
                requester(stockCode, roomId);
              }
            } catch (error) {
              io.sockets.emit(
                'updated messages with error',
                Utils.createBotMessage(error, roomId)
              );
            }
          },
          {
            noAck: true,
          }
        );
      });
    });
  }

  producer(userId: string, roomId: string, message: string): void {
    amqp.connect(this.rabbitConnection, (error: Error, connection) => {
      if (error) {
        logger.error(error);
        return;
      }

      connection.createChannel(async (err: Error, channel) => {
        if (err) {
          logger.error(err);
          return;
        }

        const isValidRoom = await this.roomService.findById(roomId);
        const isValidUser = await this.userService.exists(userId);
        if (isValidRoom && isValidUser) {
          channel.sendToQueue(
            this.queueName,
            Buffer.from(JSON.stringify({ message, roomId }))
          );
          return;
        }

        if (!isValidUser) {
          channel.sendToQueue(
            this.queueName,
            Buffer.from(
              JSON.stringify({
                error: new NotFoundError('User does not exist'),
                roomId,
              })
            )
          );
          return;
        }

        channel.assertQueue(this.queueName);

        channel.sendToQueue(
          this.queueName,
          Buffer.from(
            JSON.stringify({
              error: new NotFoundError('Room does not exist'),
              roomId,
            })
          )
        );
      });
    });
  }

  closeConnection(): void {
    this.channel?.close(() => {
      logger.info('closed channel');
    });
  }
}

export const rabbitMq = new RabbitmqConfig();
