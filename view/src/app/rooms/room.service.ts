import { ServiceFacade } from '@/shared/service/facade.service';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { Room } from '@/app/rooms/room';

interface ResultType {
  data: Room[];
  count: number;
}

export class RoomService extends ServiceFacade {
  private static get URL(): string {
    return 'rooms';
  }

  create(room: Room): Promise<Room> {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')._id;

    if (userId) {
      return this.doPost<Room>(`${RoomService.URL}/${userId}`, room);
    }
    return this.doPost<Room>(RoomService.URL, room);
  }

  findAll(pagination: Pagination): Promise<ResultType> {
    return this.doGet<ResultType>(RoomService.URL, pagination);
  }
}
