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

  login(username: string, password: string): Promise<User> {
    return this.doGet<User>(UserService.URL, { username, password });
  }

  create(user: User): Promise<User> {
    return this.doPost<User>(UserService.URL, user);
  }

  findAll(pagination: Pagination): Promise<ResultType> {
    return this.doGet<ResultType>(UserService.URL, pagination);
  }
}
