import Vue from 'vue';

import App from '@/app.vue';
import i18n from '@/shared/i18n';
import router from '@/shared/router';

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    render: (ren) => ren(App)
}).$mount('#app');
