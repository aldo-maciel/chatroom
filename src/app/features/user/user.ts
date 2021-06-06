import { Document } from 'mongoose';

export interface User extends Document {
  readonly createAt: Date;
  readonly updateAt: Date;
  username: string;
  password: string;
  readonly: boolean;
  admin: boolean;
}
