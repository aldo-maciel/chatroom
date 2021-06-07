export interface User {
  readonly _id: string;
  readonly createAt: Date;
  readonly updateAt: Date;
  username: string;
  password: string;
  readonly: boolean;
  admin: boolean;
}
