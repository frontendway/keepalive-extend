import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    redirect: '/home/nav1',
    children: [
      {
        path: '/home/nav1',
        name: 'nav1',
        component: () => import('../views/home/modules/nav1.vue')
      },
      {
        path: '/home/nav2',
        name: 'nav2',
        component: () => import('../views/home/modules/nav2.vue')
      },
      {
        path: '/home/nav3',
        name: 'nav3',
        component: () => import('../views/home/modules/nav3.vue')
      },
      {
        path: '/home/nav4',
        name: 'nav4',
        component: () => import('../views/home/modules/nav3.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/detail/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
