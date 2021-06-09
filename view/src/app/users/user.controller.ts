import { Component, Vue } from 'vue-property-decorator';

import Paginate from '@/shared/components/paginate/paginate.vue';
import AlButton from '@/shared/components/button/button.vue';
import AlInput from '@/shared/components/forms/input/al-input.vue';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { User } from '@/app/users/user';
import { UserService } from '@/app/users/user.service';
import { onError, onSuccess } from '@/shared/utils/error';

@Component({
  components: {
    Paginate,
    AlButton,
    AlInput,
  },
})
export default class UserController extends Vue {
  private readonly service = new UserService();
  private pagination: Pagination = { start: 0 } as Pagination;
  private rows: User[] = [];
  private counter = 0;
  private currentUser = {} as User;

  private async callServer(pagination: Pagination) {
    this.pagination = pagination;
    const { data, count } = await this.service.findAll(pagination);

    this.rows = data;
    this.counter = count;
  }

  addNew(): void {
    this.$modal.show('addNew');
  }

  async saveUser(): Promise<void> {
    try {
      await this.service.create(this.currentUser);
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
