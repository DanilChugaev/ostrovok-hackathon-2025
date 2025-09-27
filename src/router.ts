import { createWebHistory, createRouter } from 'vue-router';

import Main from './pages/Main/Main.vue';
import SubmitRequest from './pages/SubmitRequest.vue';
import { PAGES } from './constants.ts';

const routes = [
  { path: PAGES.Main, component: Main },
  { path: PAGES.SubmitRequest, component: SubmitRequest },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
