import { Router } from 'express';
import { ChatroomController } from './chatroom.controller';

export class ChatroomRouter {
  private router: Router = Router();
  private path = '/chatroom';
  private readonly ctrl: ChatroomController = new ChatroomController();

  constructor() {
    this.createRoutes();
  }

  get routes(): Router {
    return this.router;
  }

  private createRoutes(): void {
    this.router
      .get(`${this.path}/:roomId`, this.ctrl.find.bind(this.ctrl))
      .patch(
        `${this.path}/:roomId/:userId`,
        this.ctrl.joinInOrLeave.bind(this.ctrl)
      );
  }
}
