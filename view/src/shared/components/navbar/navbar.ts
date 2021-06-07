import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import AlButton from '@/shared/components/button/button.vue';

@Component({
  components: {
    AlButton,
  },
})
export default class Navbar extends Vue {}
