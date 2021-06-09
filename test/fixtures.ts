import MongoTestConfig from 'src/config/mongo-test.config';
import { rabbitMq } from '@/config/rabbitmq.config';
import { io } from '@/shared/socket/socket';

const testDbUtils = new MongoTestConfig();

export const mochaGlobalSetup = async (): Promise<void> => {
  await testDbUtils.mongoSetup();
};

export const mochaGlobalTeardown = async (): Promise<void> => {
  await testDbUtils.cleanup();
  await testDbUtils.stop();
  rabbitMq.closeConnection();
  io.close();
};
