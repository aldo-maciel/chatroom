import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

import logger from '@/shared/logger.service';
import { handleError } from '@/shared/errors/error.service';
import { RoomService } from '@/app/features/room/room.service';
import { NotFoundError } from '@/shared/errors/not-found.error';
import { UserService } from '@/app/features/user/user.service';
import { ChatroomService } from '@/app/features/chatroom/chatroom.service';

export class ChatroomController {
  private readonly service = new ChatroomService();
  private readonly roomService = new RoomService();
  private readonly userService = new UserService();

  public async find(req: Request, res: Response): Promise<void> {
    logger.debug('finding chatroom');

    try {
      const { roomId } = req.params;

      const chatroom = await this.service.findByRoom(roomId);

      res.status(httpStatusCode.OK).json(chatroom);
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

        const contains = chatroom?.usersId?.some(
          (it) => it.toString() === userId
        );

        return res.status(httpStatusCode.OK).json({
          success: isLeaving ? !contains : contains,
        });
      }

      if (!isValidUser) {
        return handleError(req, res, new NotFoundError('User does not exist'));
      }

      return handleError(req, res, new NotFoundError('Room does not exist'));
    } catch (error) {
      handleError(req, res, error);
    }
  }
}
