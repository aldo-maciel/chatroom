import Vue from 'vue';
import vmodal from 'vue-js-modal';

import App from '@/app.vue';
import i18n from '@/shared/i18n';
import router from '@/shared/router';

Vue.config.productionTip = false;

Vue.use(vmodal, {
  componentName: 'vue-js-modal',
});

new Vue({
  router,
  i18n,
  render: (ren) => ren(App),
}).$mount('#app');
