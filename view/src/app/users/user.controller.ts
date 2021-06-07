import { Component, Vue } from 'vue-property-decorator';

import Paginate from '@/shared/components/paginate/paginate.vue';
import AlButton from '@/shared/components/button/button.vue';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { User } from '@/app/users/user';
import { UserService } from '@/app/users/user.service';

@Component({
  components: {
    Paginate,
    AlButton,
  },
})
export default class UserController extends Vue {
  private readonly service = new UserService();
  pagination: Pagination = { start: 0 } as Pagination;
  rows: User[] = [];
  counter = 0;

  private async callServer(pagination: Pagination) {
    this.pagination = pagination;
    const { data, count } = await this.service.findAll(pagination);

    this.rows = data;
    this.counter = count;
  }
}
