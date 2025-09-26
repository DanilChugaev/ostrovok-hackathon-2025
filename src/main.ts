import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { DARK_MODE_CLASS, STORAGE_MODE_KEY } from './constants.ts';
import 'primeicons/primeicons.css';

const app = createApp(App);

const themes: Record<string, boolean> = {
  light: false,
  dark: true,
};

const currentTheme = localStorage.getItem(STORAGE_MODE_KEY) || 'light';

app.use(PrimeVue, {
  theme: {
    preset: Lara,
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

app.mount('#app');
