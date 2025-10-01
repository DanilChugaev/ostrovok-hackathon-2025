import { createWebHistory, createRouter } from 'vue-router';
import { PAGES } from './constants.ts';

import Main from './pages/Main/Main.vue';
import Login from './pages/Login.vue';
import SubmitRequest from './pages/SubmitRequest/SubmitRequest.vue';
import Profile from './pages/Profile/Profile.vue';
import Admin from './pages/Admin.vue';
import HotelAccount from './pages/HotelAccount.vue';
import Hotels from './pages/Hotels/Hotels.vue';
import HotelReports from './pages/HotelReport/HotelReports.vue';
import HotelReport from './pages/HotelReport/HotelReport.vue';
import HotelReportCategories from './pages/HotelReport/HotelReportCategories.vue';
import HotelReportStages from './pages/HotelReport/HotelReportStages.vue';
import HotelReportCriteria from './pages/HotelReport/HotelReportCriteria.vue';

const routes = [
  { path: PAGES.Main, component: Main },
  { path: PAGES.Login, component: Login },
  { path: PAGES.SubmitRequest, component: SubmitRequest },
  { path: PAGES.Profile, component: Profile },
  { path: PAGES.Admin, component: Admin },
  { path: PAGES.HotelAccount, component: HotelAccount },
  { path: PAGES.Hotels, component: Hotels },
  {
    path: `${PAGES.HotelReports}`,
    component: HotelReports,
    children: [
      {
        path: `/:id`, // id отчета
        component: HotelReport,
        children: [
          {
            path: `/stages`,
            component: HotelReportStages,
            children: [
              {
                path: `/:id/categories`, // id этапа
                component: HotelReportCategories,
                children: [
                  {
                    path: `/:id/criteria`, // id категории
                    component: HotelReportCriteria,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
