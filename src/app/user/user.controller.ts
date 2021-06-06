import { Request, Response } from 'express';

import logger from '@/shared/logger.service';
import { UserService } from './user.service';
import { handleError } from '@/shared/errors/error.service';
import { IPagination } from '@/shared/pagination/pagination';
import { MandatoryParamError } from '@/shared/errors/mandatory-param.error';
import { User } from '@/app/user/user';

export class ShortenedUrlController {
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
  async create(req: Request, res: Response) {
    try {
      const { username, password, readonly = false } = req.body;

      if (!username) {
        throw new MandatoryParamError('username param is mandatory');
      }

      if (!password) {
        throw new MandatoryParamError('password param is mandatory');
      }

      const user = { username, password, readonly } as User;

      const obj = await this.service.create(user);

      res.json({ success: true, _id: obj._id });
    } catch (error) {
      handleError(req, res, error);
    }
  }
}
