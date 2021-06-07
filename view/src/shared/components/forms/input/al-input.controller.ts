import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AlInputController extends Vue {
  private readonly name = `fieldName${Math.round(Math.random() * 10000)}`;
  @Prop() label!: string;
  @Prop({ default: false }) required!: boolean;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: 'text' }) type?: string;
  @Prop() pattern?: string;
  @Prop() placeholder?: string;
  @Prop() errorMessage?: string;
  @Prop() value?: string;

  @Emit('input')
  onInputChange(event: MouseEvent): string {
    return (event.target as HTMLInputElement).value;
  }

  get isValid() {
    const value = this.value || '';
    const pattern = this.pattern || /.+/;
    return new RegExp(pattern).test(value);
  }
}
