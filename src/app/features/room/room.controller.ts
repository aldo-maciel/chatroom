import { Request, Response } from 'express';

import logger from '@/shared/logger.service';
import { RoomService } from './room.service';
import { handleError } from '@/shared/errors/error.service';
import { IPagination } from '@/shared/pagination/pagination';
import { MandatoryParamError } from '@/shared/errors/mandatory-param.error';
import { Room } from '@/app/features/room/room';
import { NotFoundError } from '@/shared/errors/not-found.error';

export class RoomController {
  private readonly service: RoomService = new RoomService();

  public async findAll(req: Request, res: Response): Promise<void> {
    logger.debug('finding rooms');

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
      const { userId } = req.params;
      const { roomName, capacity } = req.body;
      const isInvalid = !(userId && roomName);

      if (isInvalid) {
        const invalidField = userId ? 'roomName' : 'userId';

        return handleError(
          req,
          res,
          new MandatoryParamError(`${invalidField} param is mandatory`)
        );
      }

      const room = { roomName, capacity, ownerId: userId } as Room;

      const obj = await this.service.create(room);

      return res.json({ success: true, _id: obj._id });
    } catch (error) {
      handleError(req, res, error);
    }
  }

  /**
   * Remove data on the database
   *
   * @param req
   * @param res
   */
  async remove(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const { userId, id } = req.params;
      const isInvalid = !(userId && id);

      if (isInvalid) {
        const invalidField = userId ? 'id' : 'userId';

        return handleError(
          req,
          res,
          new MandatoryParamError(`${invalidField} param is mandatory`)
        );
      }

      const room = await this.service.findById(id);

      if (!room || room.ownerId.toString() !== userId) {
        return handleError(
          req,
          res,
          new NotFoundError("Room does not exist or you aren't the owner")
        );
      }

      const deletedCount = await this.service.remove(id);

      return res.json({ success: deletedCount > 0 });
    } catch (error) {
      handleError(req, res, error);
    }
  }
}
