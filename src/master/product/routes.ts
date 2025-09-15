export const routes = [
  {
    path: 'master-product',
    name: 'parent Product',
    component: () => import('pages/ParentPage.vue'),
    meta: {
      isSubmenu: true,
      subtitle: 'Product',
      parent: 'Master',
    },
    redirect: { name: 'Product' },
    children: [
      { path: '', name: 'Product', component: () => import('pages/master/product/ListProduct.vue') },
      { path: 'manage-product', name: 'Manage Product', component: () => import('pages/master/product/FormPage.vue') },
      {
        path: 'detail-product/:id',
        name: 'Detail Product',
        component: () => import('pages/master/product/DetailPage.vue'),
      },
    ],
  },
];
