
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      // { path: '', component: () => import('pages/ItemsPage.vue') },
      { name: 'items', path: 'items', component: () => import('src/pages/Items/ItemsIndex.vue') },
      { name: 'notifications', path: 'notifications', component: () => import('src/pages/Notifications/NotificationsIndex.vue') },
      { name: 'account', path: 'account', component: () => import('src/pages/Account/AccountIndex.vue') },
      // { name: 'resellerVerification', path: 'reseller-verification', component: () => import('pages/ResellerVerificationPage.vue') },
      // { name: 'giftTag', path: 'gift-tag', component: () => import('pages/GiftTagPage.vue') },
    ]
  }, {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { name: 'signIn', path: '', component: () => import('pages/SignIn/SignInIndex.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
