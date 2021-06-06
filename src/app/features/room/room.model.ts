import { model, Schema } from 'mongoose';

import { ModelEnum } from '@/app/enums/model.enum';
import { Room } from '@/app/features/room/room';

const schema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    usersId: {
      type: Schema.Types.ObjectId,
      ref: ModelEnum.USER,
    },
  },
  {
    collection: ModelEnum.ROOM,
    timestamps: true,
    versionKey: false,
  }
);

schema.virtual('users', {
  ref: ModelEnum.USER,
  localField: 'usersId',
  foreignField: '_id',
  options: { sort: { username: -1 } },
});

export const roomModel = model<Room>(ModelEnum.ROOM, schema);
