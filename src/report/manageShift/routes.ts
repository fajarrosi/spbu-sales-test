export const routes = [
  {
    path: 'report-manage-shift',
    name: 'parent Manage Shift',
    component: () => import('pages/ParentPage.vue'),
    meta: {
      isSubmenu: true,
      subtitle: 'Manage Shift',
      parent: 'Report',
    },
    redirect: { name: 'Manage Shift' },
    children: [
      { path: '', name: 'Manage Shift', component: () => import('pages/report/manageShift/ListPage.vue') },
      {
        path: 'store-shift',
        name: 'Store Shift',
        component: () => import('pages/report/manageShift/FormPage.vue'),
      },
      {
        path: 'detail-shift/:id',
        name: 'Detail Shift',
        component: () => import('pages/report/manageShift/DetailPage.vue'),
      },
    ],
  },
];
