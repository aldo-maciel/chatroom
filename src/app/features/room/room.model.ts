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
      required: true,
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
  localField: 'owner',
  foreignField: '_id',
  options: { sort: { username: -1 } },
});

export const roomModel = model<Room>(ModelEnum.ROOM, schema);
