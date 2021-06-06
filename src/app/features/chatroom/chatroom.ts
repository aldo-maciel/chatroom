import { Document } from 'mongoose';
import { User } from '@/app/features/user/user';
import { Room } from '@/app/features/room/room';
import { MessageType } from '@/shared/types/MessageType';

export interface Chatroom extends Document {
  readonly createAt: Date;
  readonly updateAt: Date;
  usersId: string[];
  users: User[];
  roomId: string;
  room: Room;
  messages: MessageType[];
}
