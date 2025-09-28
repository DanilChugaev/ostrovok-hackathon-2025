import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import './assets/css/index';
import App from './App.vue';
import { DARK_MODE_CLASS, STORAGE_MODE_KEY } from './constants.ts';
import { router } from './router.ts';
import { users, hotels, trips } from './api/mocks/constants.ts';
import ConfirmationService from 'primevue/confirmationservice';

// todo: удалить, когда появится реальное апи
/** -- mocks -- **/
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('hotels', JSON.stringify(hotels));
localStorage.setItem('trips', JSON.stringify(trips));
const { worker } = await import('./api/mocks/browser');
await worker.start({
  onUnhandledRequest: 'bypass',
});
/** -- mocks -- **/

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

app.use(ToastService);
app.use(ConfirmationService);
app.use(router);

app.mount('#app');
