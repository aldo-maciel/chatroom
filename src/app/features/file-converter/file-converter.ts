import csvParser from 'csv-parser';
import axios from 'axios';

import logger from '@/shared/logger.service';
import { io } from '@/shared/socket/socket';
import { properties } from '@/properties';
import { CsvType } from '@/shared/types/CsvType';
import { Utils } from '@/shared/utils/utils';

export const requester = async (
  stockCode: string,
  roomId: string
): Promise<void> => {
  try {
    const { general } = properties;
    const url = general.stockUrl(stockCode);
    const results: CsvType[] = [];

    const { data } = await axios.get(url, {
      responseType: 'stream',
    });

    data
      .pipe(csvParser())
      .on('data', (it: CsvType) => results.push(it))
      .on('end', () => {
        results.forEach(({ Symbol: symbol, Open: price }) => {
          let message = `${symbol} quote is $${price} per share`;
          if (isNaN(price)) {
            message = `${symbol} is invalid`;
          }

          io.sockets.emit(
            'updated chatroom bot',
            Utils.createBotMessage(message, roomId)
          );
        });
      });
  } catch (error) {
    io.sockets.emit(
      'updated messages with error',
      Utils.createBotMessage(error, roomId)
    );
    logger.error('It was not possible to get data.');
  }
};
