import { Component, Vue } from 'vue-property-decorator';

import Paginate from '@/shared/components/paginate/paginate.vue';
import AlButton from '@/shared/components/button/button.vue';
import AlInput from '@/shared/components/forms/input/al-input.vue';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { Room } from '@/app/rooms/room';
import { RoomService } from '@/app/rooms/room.service';
import { onError, onSuccess } from '@/shared/utils/error';

@Component({
  components: {
    Paginate,
    AlButton,
    AlInput,
  },
})
export default class RoomController extends Vue {
  private readonly service = new RoomService();
  pagination: Pagination = { start: 0 } as Pagination;
  rows: Room[] = [];
  counter = 0;
  private record = {} as Room;

  private async callServer(pagination: Pagination) {
    this.pagination = pagination;
    const { data, count } = await this.service.findAll(pagination);

    this.rows = data;
    this.counter = count;
  }

  addNew(): void {
    this.$modal.show('addNew');
  }

  async save(): Promise<void> {
    try {
      await this.service.create(this.record);
      onSuccess();
      this.onCloseModal();
      this.callServer(this.pagination);
    } catch (error) {
      onError(error);
    }
  }

  onCloseModal(): void {
    this.$modal.hide('addNew');
  }
}
