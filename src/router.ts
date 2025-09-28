import { createWebHistory, createRouter } from 'vue-router';

import Main from './pages/Main/Main.vue';
import Login from './pages/Login.vue';
import SubmitRequest from './pages/SubmitRequest/SubmitRequest.vue';
import Profile from './pages/Profile/Profile.vue';
import Admin from './pages/Admin.vue';
import HotelAccount from './pages/HotelAccount.vue';
import Hotels from './pages/Hotels/Hotels.vue';
import ReportHotel from './pages/ReportHotel.vue';
import { PAGES } from './constants.ts';

const routes = [
  { path: PAGES.Main, component: Main },
  { path: PAGES.Login, component: Login },
  { path: PAGES.SubmitRequest, component: SubmitRequest },
  { path: PAGES.Profile, component: Profile },
  { path: PAGES.Admin, component: Admin },
  { path: PAGES.HotelAccount, component: HotelAccount },
  { path: PAGES.Hotels, component: Hotels },
  { path: `${PAGES.ReportHotel}/:id`, component: ReportHotel },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
