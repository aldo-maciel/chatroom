import { Chatroom } from '@/app/features/chatroom/chatroom';
import { MessageType } from '@/shared/types/MessageType';
import crypto from 'crypto';

export class Utils {
  static limitChatroomMessages(
    chatroom: Chatroom | null,
    limit = -50
  ): Chatroom {
    return {
      ...chatroom,
      messages: chatroom?.messages?.slice(limit),
    } as Chatroom;
  }

  static createBotMessage(text: string, roomId: string): MessageType {
    return {
      user: 'BOT',
      date: new Date(),
      text,
      roomId,
    };
  }

  static encrypt(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');

    return crypto.scryptSync(password, salt, 512).toString('hex');
  }
}
