import logger from '@/shared/logger.service';
import { chatroomModel } from './chatroom.model';
import { Chatroom } from '@/app/features/chatroom/chatroom';

export class ChatroomService {
  /**
   * Get all records on database
   */
  public findByRoom(roomId: string): Promise<Chatroom | null> {
    logger.debug('Chatroom by id', roomId);

    return chatroomModel
      .findById(roomId, null, { lean: true })
      .populate('room')
      .populate('users', { password: 0 })
      .exec();
  }

  /**
   * Join in or leave chatroom
   */
  public updateChatroom(
    isLeaving: boolean,
    roomId: string,
    userId: string
  ): Promise<Chatroom | null> {
    logger.debug(
      'Join in the chatroom: roomId -> ',
      roomId,
      ` roomId -> ${userId}`
    );

    let query: {
      $pull?: Record<string, string>;
      $addToSet?: Record<string, string>;
    } = {
      $addToSet: { usersId: userId },
    };

    if (isLeaving) {
      query = {
        $pull: { usersId: userId },
      };
    }

    return chatroomModel
      .findOneAndUpdate(
        { roomId },
        {
          ...query,
          roomId,
        },
        { lean: true, upsert: true, new: true }
      )
      .exec();
  }
}
