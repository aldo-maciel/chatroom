import { Component, Vue } from 'vue-property-decorator';

import navbar from '@/shared/components/navbar/navbar.vue';

@Component({
  components: {
    navbar,
  },
})
export default class App extends Vue {
  transitionName = 'slide-left';

  created() {
    this.$router.beforeEach((to, from, next) => {
      this.transitionName = to.name === 'History' ? 'drain' : 'slither';

      next();
    });
  }
}
