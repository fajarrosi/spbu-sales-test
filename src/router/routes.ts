import { RouteRecordRaw } from 'vue-router';
import { routes as home } from 'src/home/routes';
import { routes as master } from 'src/master';
import { routes as report } from 'src/report';
import { routes as inventory } from 'src/inventory';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'Home' },
    children: [...home, ...master, ...report, ...inventory],
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
