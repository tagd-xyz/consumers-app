
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ItemsPage.vue') },
      { path: '/items', component: () => import('pages/ItemsPage.vue') },
      { path: '/notifications', component: () => import('pages/NotificationsPage.vue') },
      { path: '/reseller-verification', component: () => import('pages/ResellerVerificationPage.vue') },
      { path: '/gift-tag', component: () => import('pages/GiftTagPage.vue') },
      { path: '/account', component: () => import('pages/AccountPage.vue') },
    ]
  }, {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AuthPage.vue') },
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
