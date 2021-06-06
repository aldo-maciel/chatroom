import { model, Schema } from 'mongoose';

import { ModelEnum } from '@/shared/enums/model.enum';
import { Chatroom } from '@/app/features/chatroom/chatroom';

const schema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelEnum.ROOM,
    },
    usersId: {
      type: Schema.Types.ObjectId,
      ref: ModelEnum.USER,
    },
    messages: [
      {
        date: { type: Date, default: Date.now },
        text: { type: String },
        userId: { type: String },
      },
    ],
  },
  {
    collection: ModelEnum.CHATROOM,
    timestamps: true,
    versionKey: false,
  }
);

schema.virtual('users', {
  ref: ModelEnum.USER,
  localField: 'usersId',
  foreignField: '_id',
});

schema.virtual('room', {
  ref: ModelEnum.ROOM,
  localField: 'roomId',
  foreignField: '_id',
});

export const chatroomModel = model<Chatroom>(ModelEnum.CHATROOM, schema);
