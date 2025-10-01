import { createWebHistory, createRouter } from 'vue-router';
import { PAGES } from './constants.ts';

import Main from './pages/Main/Main.vue';
import HealthCheck from './pages/HealthCheck.vue';
import NotFound from './pages/NotFound.vue';
import Login from './pages/Login.vue';
import SubmitRequest from './pages/SubmitRequest/SubmitRequest.vue';
import Profile from './pages/Profile/Profile.vue';
import Admin from './pages/Admin.vue';
import HotelAccount from './pages/HotelAccount.vue';
import Hotels from './pages/Hotels/Hotels.vue';
import HotelReports from './pages/HotelReport/HotelReports.vue';
import HotelReport from './pages/HotelReport/HotelReport.vue';
import HotelReportStages from './pages/HotelReport/HotelReportStages.vue';
import HotelReportCategories from './pages/HotelReport/HotelReportCategories.vue';
import HotelReportCriteria from './pages/HotelReport/HotelReportCriteria.vue';

const routes = [
  { path: PAGES.Health, component: HealthCheck },
  { path: PAGES.Main, component: Main },
  { path: PAGES.Login, component: Login },
  { path: PAGES.SubmitRequest, component: SubmitRequest },
  { path: PAGES.Profile, component: Profile },
  { path: PAGES.Admin, component: Admin },
  { path: PAGES.HotelAccount, component: HotelAccount },
  { path: PAGES.Hotels, component: Hotels },
  {
    path: PAGES.HotelReports,
    component: HotelReports,
  },
  {
    path: PAGES.HotelReport,
    component: HotelReport,
    props: (route: any) => ({
      reportId: route.query.reportId,
    }),
  },
  {
    path: PAGES.HotelReportStages,
    component: HotelReportStages,
    props: (route: any) => ({
      reportId: route.query.reportId,
    }),
  },
  {
    path: PAGES.HotelReportCategories,
    component: HotelReportCategories,
    props: (route: any) => ({
      reportId: route.query.reportId,
      stageId: route.query.stageId,
    }),
  },
  {
    path: PAGES.HotelReportCriteria,
    component: HotelReportCriteria,
    props: (route: any) => ({
      reportId: route.query.reportId,
      stageId: route.query.stageId,
      categoryId: route.query.categoryId,
    }),
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
