import mongoose from 'mongoose';

import { properties } from '@/properties';
import logger from '@/shared/logger.service';

export class MongoConfig {
  public async mongoSetup() {
    try {
      const { host, base, port } = properties.mongo;
      const mongoUrl = `mongodb://${host}:${port}/${base}`;
      const connect = () => {
        mongoose
          .connect(mongoUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,
          })
          .then(() => {
            logger.debug('Connected on MongoDB:', mongoUrl);
          })
          .catch((err) => {
            logger.error('Error connecting to database:', err);
            return process.exit(1);
          });
      };

      connect();

      mongoose.connection.on('disconnected', connect);
    } catch (error) {
      logger.error(error);
    }
  }
}
