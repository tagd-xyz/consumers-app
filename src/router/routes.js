const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      // { path: '', component: () => import('pages/ItemsPage.vue') },
      {
        name: 'items',
        path: 'items',
        component: () => import('src/pages/Items/Index.vue'),
      },
      {
        name: 'notifications',
        path: 'notifications',
        component: () => import('src/pages/Notifications/Index.vue'),
      },
      {
        name: 'account',
        path: 'account',
        component: () => import('src/pages/Account/Index.vue'),
      },
      // { name: 'resellerVerification', path: 'reseller-verification', component: () => import('pages/ResellerVerificationPage.vue') },
      // { name: 'giftTag', path: 'gift-tag', component: () => import('pages/GiftTagPage.vue') },
    ],
  },
  {
    path: '/item',
    component: () => import('layouts/Single.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'item',
        path: ':id',
        component: () => import('src/pages/Item/Show.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        name: 'signIn',
        path: '',
        component: () => import('pages/SignIn/Index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
