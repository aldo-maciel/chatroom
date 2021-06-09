import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { Socket } from 'socket.io';
import {
  EventNames,
  EventParams,
  EventsMap,
} from 'socket.io/dist/typed-events';

import logger from '@/shared/logger.service';
import { handleError } from '@/shared/errors/error.service';
import { RoomService } from '@/app/features/room/room.service';
import { NotFoundError } from '@/shared/errors/not-found.error';
import { UserService } from '@/app/features/user/user.service';
import { ChatroomService } from '@/app/features/chatroom/chatroom.service';
import { io } from '@/shared/socket/socket';
import { rabbitMq } from '@/config/rabbitmq.config';
import { Utils } from '@/shared/utils/utils';

export class ChatroomController {
  private readonly service = new ChatroomService();
  private readonly roomService = new RoomService();
  private readonly userService = new UserService();
  private sockets: Socket[] = [];

  constructor() {
    io.on('connection', (socket) => {
      this.sockets.push(socket);

      socket.on('disconnect', () => {
        logger.debug('user disconnected');
      });

      socket.on('chat message', ({ userId, roomId, message }) => {
        rabbitMq.producer(userId, roomId, message);
        this.sendMessage(roomId, userId, message);
      });
    });
  }

  public async find(req: Request, res: Response): Promise<void> {
    logger.debug('finding chatroom');

    try {
      const { roomId } = req.params;

      const chatroom = await this.service.findByRoom(roomId);

      res.status(httpStatusCode.OK).json(Utils.limitChatroomMessages(chatroom));
    } catch (error) {
      handleError(req, res, error);
    }
  }

  public async joinInOrLeave(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    logger.debug('Join in or leave the chatroom');

    try {
      const { roomId, userId } = req.params;
      const { leaving } = req.query;
      const isLeaving = leaving === 'true';

      const isValidRoom = this.roomService.exists(roomId);
      const isValidUser = this.userService.exists(userId);

      if (isValidRoom && isValidUser) {
        const chatroom = await this.service.updateChatroom(
          isLeaving,
          roomId,
          userId
        );

        return res
          .status(httpStatusCode.OK)
          .json(Utils.limitChatroomMessages(chatroom));
      }

      if (!isValidUser) {
        return handleError(req, res, new NotFoundError('User does not exist'));
      }

      return handleError(req, res, new NotFoundError('Room does not exist'));
    } catch (error) {
      handleError(req, res, error);
    }
  }

  public async sendMessage(
    roomId: string,
    userId: string,
    text: string
  ): Promise<void> {
    logger.debug('sending message');

    try {
      if (text.startsWith('/stock')) {
        return;
      }
      const isValidRoom = await this.roomService.exists(roomId);
      const user = await this.userService.findById(userId);
      const message = {
        user: user?.username ?? '',
        text,
      };

      if (isValidRoom && user?._id) {
        const chatroom = await this.service.sendMessage(roomId, message);

        this.emit('updated chatroom', Utils.limitChatroomMessages(chatroom));
        return;
      }

      if (!user?._id) {
        this.emit(
          'updated messages with error',
          Utils.createBotMessage('User does not exist', roomId)
        );
        return;
      }

      this.emit(
        'updated messages with error',
        Utils.createBotMessage('Room does not exist', roomId)
      );
    } catch (error) {
      logger.error(error);
      this.emit(
        'updated messages with error',
        Utils.createBotMessage(error, roomId)
      );
    }
  }

  private emit(
    message: string,
    ...args: EventParams<EventsMap, EventNames<EventsMap>>
  ) {
    this.sockets.forEach((socket) => socket.emit(message, ...args));
  }
}
