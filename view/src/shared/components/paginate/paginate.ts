import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Pagination } from './paginate.type';
import Button from '@/shared/components/button/button.vue';
import { EVariation } from '@/shared/components/style/variation';

@Component({
  components: {
    Button,
  },
})
export default class Paginate extends Vue {
  @Prop({ default: 10 }) step!: number;
  @Prop({ default: 0, required: true }) totalRecords!: number;
  protected pagination: Pagination = {
    start: 0,
    step: this.step,
    sort: {},
  };
  EVariation = EVariation;

  created(): void {
    this.pagination.step = this.step;
    this.callSearch();
  }

  get from(): number {
    return this.totalRecords > 0 ? (this.pagination.start || 0) + 1 : 0;
  }

  get of(): number {
    return this.pagination.start + this.step > this.totalRecords
      ? this.totalRecords
      : this.pagination.start + this.step;
  }

  /**
   * Call onChanges method whe the page changes
   */
  @Emit('onChange')
  callSearch(): Pagination {
    return this.pagination;
  }

  /**
   * Select the page according to <code>option</code> parameter
   *
   * @param option
   */
  paginate(option: number): void {
    switch (option) {
      case 1: {
        if (this.pagination.start + this.step > this.totalRecords) return;
        this.pagination.start += this.step;
        break;
      }
      case 2: {
        if (this.pagination.start <= 0) return;
        this.pagination.start -= this.step;
        break;
      }
      case 3: {
        this.pagination.start =
          Math.ceil(this.totalRecords / this.step) * this.step;
        if (this.pagination.start >= this.totalRecords) {
          this.pagination.start -= this.step;
        }
        break;
      }
      default: {
        this.pagination.start = 0;
      }
    }
    this.callSearch();
  }
}
