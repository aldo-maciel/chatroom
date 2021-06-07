import { ServiceFacade } from '@/shared/service/facade.service';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { User } from '@/app/users/user';

interface ResultType {
  data: User[];
  count: number;
}

export class UserService extends ServiceFacade {
  private static get URL(): string {
    return 'users';
  }

  create(originalUrl: string): Promise<User> {
    return this.doPost<User>(UserService.URL, { originalUrl });
  }

  findAll(pagination: Pagination): Promise<ResultType> {
    return this.doGet<ResultType>(UserService.URL, pagination);
  }
}
