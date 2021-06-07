import { User } from '@/app/users/user';
import { Room } from '@/app/rooms/room';

export interface Chatroom {
  readonly _id: string;
  readonly createAt: Date;
  readonly updateAt: Date;
  usersId: string[];
  users: User[];
  roomId: string;
  room: Room;
  messages: {
    date: Date;
    text: string;
    userId: string;
  }[];
}
