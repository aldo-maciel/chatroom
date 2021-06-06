import MongoTestConfig from 'src/config/mongo-test.config';

const testDbUtils = new MongoTestConfig();

export const mochaGlobalSetup = async (): Promise<void> => {
  await testDbUtils.mongoSetup();
};

export const mochaGlobalTeardown = async (): Promise<void> => {
  await testDbUtils.cleanup();
  await testDbUtils.stop();
};
