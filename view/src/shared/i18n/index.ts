import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enJson from './message/en.json';
import numberFormats from './number-format';
import dateTimeFormats from './date-format';

Vue.use(VueI18n);

const messages = {
  en: enJson,
};

const i18n = new VueI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  messages,
  numberFormats,
  dateTimeFormats,
});

export default i18n;
