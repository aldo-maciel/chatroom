import { model, Schema } from 'mongoose';
import crypto from 'crypto';
import uuid from 'uuid';

import { ModelEnum } from '@/shared/enums/model.enum';
import { User } from '@/app/features/user/user';
import { Utils } from '@/shared/utils/utils';

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: ModelEnum.USER,
    timestamps: true,
    versionKey: false,
  }
);

schema.post('validate', (doc) => {
  doc.password = Utils.encrypt(doc.password);
});

export const userModel = model<User>(ModelEnum.USER, schema);
userModel.findOneAndUpdate(
  {
    username: 'BOT',
  },
  {
    username: 'BOT',
    admin: true,
    readonly: true,
    password: uuid.v4(),
  },
  {
    upsert: true,
  }
);
