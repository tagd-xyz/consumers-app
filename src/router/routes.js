const routes = [
  {
    path: '/',
    redirect: { name: 'tagds' },
    component: () => import('layouts/Main.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      // { path: '', component: () => import('pages/ItemsPage.vue') },
      {
        name: 'tagds',
        path: 'items',
        component: () => import('src/pages/Tagds/Index.vue'),
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
        name: 'tagd',
        path: ':id',
        component: () => import('src/pages/Tagd/Show.vue'),
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
  {
    path: '/splash',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        name: 'splash',
        path: '',
        component: () => import('pages/SignIn/Splash.vue'),
      },
    ],
  },
  {
    path: '/errorNetwork',
    name: 'errorNetwork',
    component: () => import('pages/ErrorNetwork.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
