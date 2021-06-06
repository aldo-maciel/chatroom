import { Document } from 'mongoose';
import { User } from '@/app/features/user/user';

export interface Room extends Document {
  readonly createAt: Date;
  readonly updateAt: Date;
  roomName: string;
  usersId: string[];
  users: User[];
  capacity: number;
  owner: string;
}
