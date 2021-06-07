import { model, Schema } from 'mongoose';

import { ModelEnum } from '@/shared/enums/model.enum';
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
    ownerId: {
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

schema.virtual('owner', {
  ref: ModelEnum.USER,
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
});

export const roomModel = model<Room>(ModelEnum.ROOM, schema);
