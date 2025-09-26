import { createWebHistory, createRouter } from 'vue-router';

import Main from './pages/Main/Main.vue';
import SubmitRequest from './pages/SubmitRequest.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/submit-request', component: SubmitRequest },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
