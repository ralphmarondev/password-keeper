const routes = [
  {
    path: '/',
    name: 'auth',
    meta: {
      title: 'Auth | Password Keeper',
    },
    component: () => import('@/views/auth/AuthIndex.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home | Password Keeper',
      authRequired: true,
    },
    component: () => import('@/views/home/HomeIndex.vue'),
  },
]

export default routes
