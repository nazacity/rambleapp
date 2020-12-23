import i18n from 'i18n-js';

import th from './th';
import en from './en';

export const init = () => {};
i18n.defaultLocale = 'th';
i18n.fallbacks = true;

i18n.translations = {
  'en-US': en,
  en,
  th,
};
