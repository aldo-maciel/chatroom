import { Request, Response } from 'express';

import logger from '@/shared/logger.service';
import { UserService } from './user.service';
import { handleError } from '@/shared/errors/error.service';
import { IPagination } from '@/shared/pagination/pagination';
import { MandatoryParamError } from '@/shared/errors/mandatory-param.error';
import { User } from '@/app/features/user/user';

export class UserController {
  private readonly service: UserService = new UserService();

  public async findAll(req: Request, res: Response): Promise<void> {
    logger.debug('finding users');

    try {
      const params = (req.query as unknown) as IPagination;

      const { data, count } = await this.service.findAll(params);

      res.json({ data, count });
    } catch (error) {
      handleError(req, res, error);
    }
  }

  /**
   * Create new data on the database
   *
   * @param req
   * @param res
   */
  async create(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { username, password, readonly = false } = req.body;
      const isInvalid = !(username && password);

      if (isInvalid) {
        const invalidField = username ? 'password' : 'username';

        return handleError(
          req,
          res,
          new MandatoryParamError(`${invalidField} param is mandatory`)
        );
      }
      const user = { username, password, readonly } as User;

      const obj = await this.service.create(user);

      return res.json({ success: true, _id: obj._id });
    } catch (error) {
      handleError(req, res, error);
    }
  }
}
