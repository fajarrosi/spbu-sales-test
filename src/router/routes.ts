import { RouteRecordRaw } from 'vue-router';
import { routes as home } from 'src/home/routes';
import { routes as master } from 'src/master';
// import { routes as parametersetup } from 'src/parametersetup';
// import { routes as journeyplan } from 'src/journeyplan';
// import { routes as sales } from 'src/sales';
// import { routes as accountreceivable } from 'src/accountreceivable';
// import { routes as inventory } from 'src/inventory';
// import { routes as cndn } from 'src/cndn';
// import { routes as operation } from 'src/operation';
// import { routes as accountPayable } from 'src/accountPayable';
// import { routes as cashBank } from 'src/cashBank';
// import { routes as returnRoutes } from 'src/return';
// import { routes as shipment } from 'src/shipment';
// import { routes as gamification } from 'src/gamification';
// import { routes as parametersetupMobile } from 'src/parametersetupMobile';
// import { routes as tax } from 'src/manageTax';
// import { routes as price } from 'src/price';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'Home' },
    children: [
      ...home,
      ...master,
      // ...parametersetup,
      // ...parametersetupMobile,
      // ...journeyplan,
      // ...sales,
      // ...accountreceivable,
      // ...inventory,
      // ...cndn,
      // ...operation,
      // ...accountPayable,
      // ...cashBank,
      // ...returnRoutes,
      // ...shipment,
      // ...gamification,
      // ...tax,
      // ...price,
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
