import { Application } from 'express';

import { UserRouter } from '@/app/user/user.router';

export class RoutesMiddleware {
  public userRouter = new UserRouter();

  public config(app: Application): void {
    const baseUrl = '/api/v1';

    app.use(baseUrl, this.userRouter.routes);
  }
}
