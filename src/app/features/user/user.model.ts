import { model, Schema } from 'mongoose';

import { ModelEnum } from '@/shared/enums/model.enum';
import { User } from '@/app/features/user/user';
import logger from '@/shared/logger.service';

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

export const userModel = model<User>(ModelEnum.USER, schema);

// TODO: just to the tests
try {
  logger.info('creating new users');
  userModel
    .findOneAndUpdate(
      {
        username: 'admin',
      },
      {
        username: 'admin',
        admin: true,
        readonly: true,
        password: '123',
      },
      {
        upsert: true,
      }
    )
    .exec();
} catch (error) {
  logger.error(error);
}
