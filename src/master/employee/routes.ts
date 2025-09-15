export const routes = [
  {
    path: 'master-employee',
    name: 'parent Employee',
    component: () => import('pages/ParentPage.vue'),
    meta: {
      isSubmenu: true,
      subtitle: 'Employee',
      parent: 'Master',
    },
    redirect: { name: 'Employee' },
    children: [
      { path: '', name: 'Employee', component: () => import('pages/master/employee/ListPage.vue') },
      {
        path: 'manage-employee',
        name: 'Manage Employee',
        component: () => import('pages/master/employee/FormPage.vue'),
      },
      {
        path: 'detail-employee/:id',
        name: 'Detail Employee',
        component: () => import('pages/master/employee/DetailPage.vue'),
      },
    ],
  },
];
