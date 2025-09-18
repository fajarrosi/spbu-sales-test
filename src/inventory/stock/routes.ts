export const routes = [
  {
    path: 'report-stock',
    name: 'parent Stock',
    component: () => import('pages/ParentPage.vue'),
    meta: {
      isSubmenu: true,
      subtitle: 'Manage Stock',
      parent: 'Inventory',
    },
    redirect: { name: 'Manage Stock' },
    children: [
      { path: '', name: 'Manage Stock', component: () => import('pages/inventory/stock/ListPage.vue') },
      {
        path: 'store-stock',
        name: 'Store Stock',
        component: () => import('pages/inventory/stock/FormPage.vue'),
      },
      {
        path: 'detail-stock/:id',
        name: 'Detail Stock',
        component: () => import('pages/inventory/stock/DetailPage.vue'),
      },
    ],
  },
];
