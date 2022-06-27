import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Nav1 from '../views/home/modules/nav1.vue'
import Nav2 from '../views/home/modules/nav2.vue'
import Nav3 from '../views/home/modules/nav3.vue'
import Nav4 from '../views/home/modules/nav4.vue'
import Login from '../views/login/index.vue'
import Search from '../views/search/index.vue'
import Detail from '../views/detail/index.vue'

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
    component: Home,
    redirect: '/home/nav1',
    children: [
      {
        path: '/home/nav1',
        name: 'nav1',
        component: Nav1
      },
      {
        path: '/home/nav2',
        name: 'nav2',
        component: Nav2
      },
      {
        path: '/home/nav3',
        name: 'nav3',
        component: Nav3
      },
      {
        path: '/home/nav4',
        name: 'nav4',
        component: Nav4
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
