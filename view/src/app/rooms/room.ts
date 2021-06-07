import { User } from '@/app/users/user';

export interface Room {
  readonly _id: string;
  readonly createAt: Date;
  readonly updateAt: Date;
  roomName: string;
  owner: User;
  capacity: number;
  ownerId: string;
}
