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
    const userId = '60bea13f5f061c3d9ff46624';

    if (userId) {
      return this.doPost<Room>(`${RoomService.URL}/${userId}`, room);
    }
    return this.doPost<Room>(RoomService.URL, room);
  }

  findAll(pagination: Pagination): Promise<ResultType> {
    return this.doGet<ResultType>(RoomService.URL, pagination);
  }
}
