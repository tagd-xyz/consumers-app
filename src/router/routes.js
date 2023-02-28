
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      // { path: '', component: () => import('pages/ItemsPage.vue') },
      { name: 'items', path: 'items', component: () => import('pages/ItemsPage.vue') },
      { name: 'notifications', path: 'notifications', component: () => import('pages/NotificationsPage.vue') },
      { name: 'resellerVerification', path: 'reseller-verification', component: () => import('pages/ResellerVerificationPage.vue') },
      { name: 'giftTag', path: 'gift-tag', component: () => import('pages/GiftTagPage.vue') },
      { name: 'account', path: 'account', component: () => import('pages/AccountPage.vue') },
    ]
  }, {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { name: 'signIn', path: '', component: () => import('pages/AuthPage.vue') },
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
