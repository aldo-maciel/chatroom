import { Application } from 'express';

import { UserRouter } from '@/app/features/user/user.router';
import { RoomRouter } from '@/app/features/room/room.router';
import { ChatroomRouter } from '@/app/features/chatroom/chatroom.router';

export class RoutesMiddleware {
  public userRouter = new UserRouter();
  public roomRouter = new RoomRouter();
  public chatroomRouter = new ChatroomRouter();

  public config(app: Application): void {
    const baseUrl = '/api/v1';

    app.use(baseUrl, this.userRouter.routes);
    app.use(baseUrl, this.roomRouter.routes);
    app.use(baseUrl, this.chatroomRouter.routes);
  }
}
