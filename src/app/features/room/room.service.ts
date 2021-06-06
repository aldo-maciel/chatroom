import logger from '@/shared/logger.service';
import { roomModel } from './room.model';
import { IPagination, Pagination } from '@/shared/pagination/pagination';
import { Room } from '@/app/features/room/room';

export class RoomService {
  /**
   * Get all records on database
   */
  @Pagination
  public async findAll(
    pagination: IPagination
  ): Promise<{ count: number; data: Array<Room> }> {
    logger.debug('Rooms pagination', pagination);

    const data: Room[] = await roomModel
      .find({}, { password: 0 })
      .skip(pagination.start)
      .limit(pagination.step)
      .sort(pagination.sort)
      .populate('owner', { password: 0 })
      .lean(true);

    const count = await roomModel.countDocuments();

    logger.debug('Total of rooms', count);

    return { count, data };
  }

  /**
   * Get one record by id
   */
  public findById(id: string): Promise<Room | null> {
    logger.debug('Get room by id: ', id);

    return roomModel.findById(id, null, { lean: true }).exec();
  }

  /**
   * Exists on the database
   */
  public async exists(id: string): Promise<boolean> {
    logger.debug('Exists room: ', id);

    return roomModel.exists({ _id: id });
  }

  /**
   * Create new data on the database
   */
  public async create(room: Room): Promise<Room> {
    logger.debug('Creating room: ', room);

    try {
      const res = await roomModel.create(room);
      logger.debug('Room created successfully: ', res.roomName);

      return res;
    } catch (error) {
      logger.error('Error to create room: ', error);
      throw error;
    }
  }

  /**
   * Remove data on the database
   *
   * @return count of deleted records
   */
  async remove(room: string): Promise<number> {
    logger.debug('Removing room: ', room);

    try {
      const res = await roomModel.deleteOne({ _id: room });
      logger.debug('Removed count: ', res.deletedCount);

      return res.deletedCount || 0;
    } catch (error) {
      logger.error('Error to create room: ', error);
      throw error;
    }
  }
}
