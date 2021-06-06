import { Router } from 'express';
import { RoomController } from './room.controller';

export class RoomRouter {
  private router: Router = Router();
  private path = '/rooms';
  private readonly ctrl: RoomController = new RoomController();

  constructor() {
    this.createRoutes();
  }

  get routes(): Router {
    return this.router;
  }

  private createRoutes(): void {
    this.router
      .get(this.path, this.ctrl.findAll.bind(this.ctrl))
      .post(`${this.path}/:userId`, this.ctrl.create.bind(this.ctrl))
      .delete(`${this.path}/:id/:userId`, this.ctrl.remove.bind(this.ctrl));
  }
}
