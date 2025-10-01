import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import './assets/css/index';
import App from './App.vue';
import { DARK_MODE_CLASS, STORAGE_LANGUAGE_KEY, STORAGE_MODE_KEY } from './constants.ts';
import { router } from './router.ts';
import {
  users,
  hotels,
  trips,
  cities,
  loyalty,
  stages,
  categories,
  criteria,
  reports,
  reviews,
  accessibilityListForTravel,
  awards,
  stagesProgress,
  categoriesProgress,
} from './api/mocks/constants.ts';
import ConfirmationService from 'primevue/confirmationservice';
import { localizationMessages } from './localization';
import type { LocalizationMessagesKeys } from './types.ts';

// todo: удалить, когда появится реальное апи
/** -- mocks -- **/
!localStorage.getItem('users') && localStorage.setItem('users', JSON.stringify(users));
!localStorage.getItem('hotels') && localStorage.setItem('hotels', JSON.stringify(hotels));
!localStorage.getItem('trips') && localStorage.setItem('trips', JSON.stringify(trips));
!localStorage.getItem('cities') && localStorage.setItem('cities', JSON.stringify(cities));
!localStorage.getItem('loyalty') && localStorage.setItem('loyalty', JSON.stringify(loyalty));
!localStorage.getItem('stages') && localStorage.setItem('stages', JSON.stringify(stages));
!localStorage.getItem('categories') &&
  localStorage.setItem('categories', JSON.stringify(categories));
!localStorage.getItem('criteria') && localStorage.setItem('criteria', JSON.stringify(criteria));
!localStorage.getItem('reports') && localStorage.setItem('reports', JSON.stringify(reports));
!localStorage.getItem('reviews') && localStorage.setItem('reviews', JSON.stringify(reviews));
!localStorage.getItem('awards') && localStorage.setItem('awards', JSON.stringify(awards));
!localStorage.getItem('accessibilityListForTravel') &&
  localStorage.setItem('accessibilityListForTravel', JSON.stringify(accessibilityListForTravel));
!localStorage.getItem('stagesProgress') &&
  localStorage.setItem('stagesProgress', JSON.stringify(stagesProgress));
!localStorage.getItem('categoriesProgress') &&
  localStorage.setItem('categoriesProgress', JSON.stringify(categoriesProgress));
const { worker } = await import('./api/mocks/browser');
await worker.start({
  onUnhandledRequest: 'bypass',
});
/** -- mocks -- **/

type MessageSchema = (typeof localizationMessages)['ru'];

const locale: LocalizationMessagesKeys =
  (localStorage.getItem(STORAGE_LANGUAGE_KEY) as LocalizationMessagesKeys) || 'ru';

const i18n = createI18n<[MessageSchema], LocalizationMessagesKeys>({
  legacy: false,
  locale,
  messages: localizationMessages,
});

const app = createApp(App);

const themes: Record<string, boolean> = {
  light: false,
  dark: true,
};

const currentTheme = localStorage.getItem(STORAGE_MODE_KEY) || 'light';

app.use(PrimeVue, {
  theme: {
    preset: definePreset(Lara, {
      semantic: {
        primary: {
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}',
        },
      },
    }),
    options: {
      darkModeSelector: `.${DARK_MODE_CLASS}`,
    },
  },
});

if (themes[currentTheme]) {
  document.documentElement.classList.add(DARK_MODE_CLASS);
}

app.provide('themes', themes);
app.provide('currentTheme', currentTheme);

app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);
app.use(router);

app.mount('#app');
