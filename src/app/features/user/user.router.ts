import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
  private router: Router = Router();
  private path = '/users';
  private readonly ctrl: UserController = new UserController();

  constructor() {
    this.createRoutes();
  }

  get routes(): Router {
    return this.router;
  }

  private createRoutes(): void {
    this.router
      .get(this.path, this.ctrl.findAll.bind(this.ctrl))
      .post(this.path, this.ctrl.create.bind(this.ctrl));
  }
}
