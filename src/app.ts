import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import handleError from '@/shared/errors/error.service';
import { RoutesMiddleware } from '@/config/router.config';
import { MongoConfig } from '@/config/mongo.config';
import { testDbUtils } from '@/config/mongo-test.config';

const isTestEnvrioment = process.env.NODE_ENV === 'test';

class App {
    public app: Application = express();

    constructor() {
        this.config();
    }

    private async config(): Promise<void> {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(handleError);
        this.app.use(express.static(__dirname + '/../view/dist/'));

        if (isTestEnvrioment) {
            await testDbUtils.mongoSetup();
        } else {
            await new MongoConfig().mongoSetup();
        }
        new RoutesMiddleware().config(this.app);
    }
}

export default new App().app;
