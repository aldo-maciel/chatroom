import logger from '@/shared/logger.service';
import { userModel } from './user.model';
import { User } from '@/app/features/user/user';
import { IPagination, Pagination } from '@/shared/pagination/pagination';

export class UserService {
  /**
   * Get all records on database
   */
  @Pagination
  public async findAll(
    pagination: IPagination
  ): Promise<{ count: number; data: Array<User> }> {
    logger.debug('Users pagination', pagination);

    const data: User[] = await userModel
      .find({}, { password: 0 })
      .skip(pagination.start)
      .limit(pagination.step)
      .sort(pagination.sort)
      .lean(true);

    const count = await userModel.countDocuments();

    logger.debug('Total of users', count);

    return { count, data };
  }

  /**
   * Create new data on the database
   */
  public async create(user: User): Promise<User> {
    logger.debug('Creating user: ', { ...user, password: '?' });

    try {
      const res = await userModel.create(user);
      logger.debug('Room created successfully: ', res.username);

      return res;
    } catch (error) {
      logger.error('Error to create user: ', error);
      throw error;
    }
  }
}
