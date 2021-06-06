import { model, Schema } from 'mongoose';

import { ModelEnum } from '@/app/enums/model.enum';
import { User } from '@/app/features/user/user';
import crypto from 'crypto';

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
  const salt = crypto.randomBytes(16).toString('hex');

  doc.password = crypto.scryptSync(doc.password, salt, 512).toString('hex');
});

export const userModel = model<User>(ModelEnum.USER, schema);
