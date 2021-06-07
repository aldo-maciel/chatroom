import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

import { EVariation } from '@/shared/components/style/variation';
import { ESize } from '@/shared/components/style/sizer';

@Component
export default class ButtonController extends Vue {
    @Prop({ default: EVariation.DEFAULT }) variation!: EVariation;
    @Prop({ default: ESize.NORMAL }) size!: ESize;
    @Prop({ default: false }) disabled!: boolean;

    onClick(): void {
        !this.disabled && this.$emit('click');
    }
}
