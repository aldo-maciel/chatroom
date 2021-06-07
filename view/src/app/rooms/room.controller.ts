import { Component, Vue } from 'vue-property-decorator';

import Paginate from '@/shared/components/paginate/paginate.vue';
import AlButton from '@/shared/components/button/button.vue';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { Room } from '@/app/rooms/room';
import { RoomService } from '@/app/rooms/room.service';

@Component({
  components: {
    Paginate,
    AlButton,
  },
})
export default class RoomController extends Vue {
  private readonly service = new RoomService();
  pagination: Pagination = { start: 0 } as Pagination;
  rows: Room[] = [];
  counter = 0;

  private async callServer(pagination: Pagination) {
    this.pagination = pagination;
    const { data, count } = await this.service.findAll(pagination);

    this.rows = data;
    this.counter = count;
  }
}
