import { User } from '@/app/users/user';
import { Room } from '@/app/rooms/room';

export type MessageType = {
  date: Date;
  text: string;
  user: string;
};

export interface Chatroom {
  readonly _id: string;
  readonly createAt: Date;
  readonly updateAt: Date;
  usersId: string[];
  users: User[];
  roomId: string;
  room: Room;
  messages: MessageType[];
}
