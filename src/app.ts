import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http, { Server } from 'http';

import handleError from '@/shared/errors/error.service';
import { RoutesMiddleware } from '@/config/router.config';
import { MongoConfig } from '@/config/mongo.config';
import { initSocketServer } from '@/shared/socket/socket';

const isNotTestEnvironment = process.env.NODE_ENV !== 'test';

class App {
  public app: Application = express();
  server: Server;

  constructor() {
    this.server = http.createServer(this.app);
    initSocketServer(this.server);
    this.config();
  }

  private async config(): Promise<void> {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(handleError);
    this.app.use(express.static(__dirname + '/../view/dist/'));

    if (isNotTestEnvironment) {
      await new MongoConfig().mongoSetup();
    }
    new RoutesMiddleware().config(this.app);
  }
}
export const app = new App().server;
