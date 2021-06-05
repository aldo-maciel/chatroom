import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import logger from '@/shared/logger.service';

class MongoTestConfig {
    private server = new MongoMemoryServer();

    async mongoSetup() {
        const mongooseOpts = {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };

        try {
            this.server.getUri().then((mongoUrl) => {

                mongoose.connect(mongoUrl, mongooseOpts);

                mongoose.connection.on('error', (e) => {
                    if (e.message.code === 'ETIMEDOUT') {
                        logger.error(e);
                        mongoose.connect(mongoUrl, mongooseOpts);
                    }
                    logger.error(e);
                });
            });
        } catch (err) {
            logger.error('Error connecting to database:', err);
            return process.exit(1);
        }
    }

    async stop() {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await this.server.stop();
    }

    async cleanup() {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    }
}

export const testDbUtils = new MongoTestConfig();
