import Vue from 'vue/dist/vue.common.js'
import VueRouter from 'vue-router'
import KeepaliveExtend from '../lib/index.js'
import {
  createElm,
  querySelector,
  fnCreatedCallsCount,
  fnDestroyedCallsCount
} from './utils.js'

let Home = null
let Nav1 = null
let Nav2 = null
let Nav3 = null
let Login = null
let Search = null
let Detail = null
let Shop = null
let router = null
let routes = null
let el = null
let vm = null

Vue.use(VueRouter)
Vue.use(KeepaliveExtend)

beforeEach(() => {
  el = createElm('div')

  Home = {
    name: 'home',
    template: `
      <div>
        <h3>home</h3>
        <div>
          <keepalive-extend
            unique-key="home"
          >
            <router-view />
          </keepalive-extend>
        </div>
      </div>
    `,
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Nav1 = {
    name: 'nav1',
    template: '<div class="nav1">nav1</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Nav2 = {
    name: 'nav2',
    template: '<div class="nav2">nav2</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Nav3 = {
    name: 'nav3',
    template: '<div class="nav3">nav3</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Login = {
    name: 'login',
    template: '<div>login</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Search = {
    name: 'search',
    template: '<div>search</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Detail = {
    name: 'detail',
    template: '<div>detail</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  Shop = {
    name: 'shop',
    template: '<div>shop</div>',
    created: jest.fn(),
    destroyed: jest.fn()
  }

  routes = [
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
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    }
  ]
})

afterEach(() => {
  vm.$destroy()
})

it(`
  1. 只配置 unique-key 场景
  2. 渲染登录页面，登录页面 created 钩子被调用
  3. 跳转到 home 页面，home 页面 created 钩子被调用
  4. 返回登录页面，created 钩子不被调用
`,
async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)
})

it('include string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        include="login,home"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(2)
})

it('include regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :include="/login/"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)
})

it('include array string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :include="['login', 'home']"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(2)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(3)
})

it('include array regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :include="[/login/, /home/]"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(2)
})

it('include array [string|regExp|array] 混合场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :include="['login', /home/, ['search']]"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(2)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(3)
})

it('exclude string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        exclude="login,home"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('exclude regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :exclude="/login/"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(3)
})

it('exclude array string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :exclude="['login', 'home']"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)
})

it('exclude array regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :exclude="[/login/, /home/]"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)
})

it('exclude array [string|regExp|array] 混合场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :exclude="['login', /home/, ['search']]"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(2)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)
})

it('max', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        max="2"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)
  expect(fnDestroyedCallsCount(Login)).toBe(1)
  expect(fnDestroyedCallsCount(Home)).toBe(0)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(2)
  expect(fnDestroyedCallsCount(Home)).toBe(1)
  expect(fnDestroyedCallsCount(Search)).toBe(0)
})

it('rules refresh string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          refresh: 'detail,search'
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('rules refresh regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          refresh: /detail/
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)
})

it('rules refresh array string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          refresh: ['detail', 'search']
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('rules refresh array regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          refresh: [/detail/, /search/]
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('rules refresh array [string|regExp|array] 混合场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          refresh: ['detail', /search/, ['shop']]
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)

  await router.push('/shop')
  expect(vm.$el.textContent).toBe('shop')
  expect(fnCreatedCallsCount(Shop)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(4)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(4)
})

it('rules notRefresh string 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          notRefresh: 'detail,search'
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/shop')
  expect(vm.$el.textContent).toBe('shop')
  expect(fnCreatedCallsCount(Shop)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('rules notRefresh array 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          notRefresh: ['detail', 'search']
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/shop')
  expect(vm.$el.textContent).toBe('shop')
  expect(fnCreatedCallsCount(Shop)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('rules notRefresh regExp 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :rules="rules"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      rules: {
        home: {
          notRefresh: /detail/
        }
      }
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(2)

  await router.push('/shop')
  expect(vm.$el.textContent).toBe('shop')
  expect(fnCreatedCallsCount(Shop)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)

  await router.push('/detail')
  expect(vm.$el.textContent).toBe('detail')
  expect(fnCreatedCallsCount(Detail)).toBe(1)

  await router.push('/home')
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
})

it('嵌套 keepalive-extend 不配置 keep-active 场景', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        exclude="home"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Nav1)).toBe(1)
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/home/nav1')
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
  expect(fnCreatedCallsCount(Nav1)).toBe(1)

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)
  expect(fnDestroyedCallsCount(Home)).toBe(1)
  expect(fnDestroyedCallsCount(Nav1)).toBe(1)
  expect(fnDestroyedCallsCount(Nav2)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(2)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Nav1)).toBe(2)
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
})

it('嵌套 keepalive-extend 配置 keep-active 场景', async () => {
  const Home = routes[1].component = {
    name: 'home',
    template: `
      <div>
        <h3>home</h3>
        <div>
          <keepalive-extend
            unique-key="home"
            :keep-active="true"
          >
            <router-view />
          </keepalive-extend>
        </div>
      </div>
    `,
    created: jest.fn(),
    destroyed: jest.fn()
  }

  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        exclude="home"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Nav1)).toBe(1)
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/home/nav1')
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)
  expect(fnDestroyedCallsCount(Nav1)).toBe(0)
  expect(fnDestroyedCallsCount(Nav2)).toBe(0)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(2)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Nav1)).toBe(1)
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)
})

it('嵌套 keepalive-extend 配置 keep-active，有 rules 场景', async () => {
  const Home = routes[1].component = {
    name: 'home',
    template: `
      <div>
        <h3>home</h3>
        <div>
          <keepalive-extend
            unique-key="home"
            :keep-active="true"
            :rules="rules"
          >
            <router-view />
          </keepalive-extend>
        </div>
      </div>
    `,
    data: () => ({
      rules: {
        nav1: {
          refresh: 'nav2,login'
        }
      }
    }),
    created: jest.fn(),
    destroyed: jest.fn()
  }

  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        exclude="home"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
  expect(fnCreatedCallsCount(Nav1)).toBe(1)
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')

  await router.push('/home/nav2')
  expect(querySelector('.nav2', vm.$el).textContent).toBe('nav2')
  expect(fnCreatedCallsCount(Nav2)).toBe(1)

  await router.push('/home/nav1')
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
  expect(fnCreatedCallsCount(Nav1)).toBe(2)

  await router.push('/home/nav3')
  expect(querySelector('.nav3', vm.$el).textContent).toBe('nav3')
  expect(fnCreatedCallsCount(Nav3)).toBe(1)

  await router.push('/home/nav1')
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
  expect(fnCreatedCallsCount(Nav1)).toBe(2)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home/nav1')
  expect(querySelector('.nav1', vm.$el).textContent).toBe('nav1')
  expect(fnCreatedCallsCount(Nav1)).toBe(3)
})

it('watch include', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :include="include"
      >
        <router-view />
      </keepalive-extend>
    `,
    data: () => ({
      include: 'login,home'
    })
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')

  await vm.$nextTick(() => {
    vm.include = 'login'
  })

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(2)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/search')
  expect(vm.$el.textContent).toBe('search')
  expect(fnCreatedCallsCount(Search)).toBe(1)

  await router.push('/login')
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(3)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')
})

it('destroyed 无 keepActive', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')

  await vm.$destroy()

  expect(fnDestroyedCallsCount(Login)).toBe(1)
  expect(fnDestroyedCallsCount(Home)).toBe(1)
  expect(fnDestroyedCallsCount(Nav1)).toBe(1)
})

it('destroyed 有 keepActive', async () => {
  router = new VueRouter({ routes })

  await router.push('/login')
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
        :keep-active="true"
      >
        <router-view />
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('login')
  expect(fnCreatedCallsCount(Login)).toBe(1)

  await router.push('/home')
  expect(fnCreatedCallsCount(Home)).toBe(1)
  expect(querySelector('h3', vm.$el).textContent).toBe('home')

  await vm.$destroy()

  expect(fnDestroyedCallsCount(Login)).toBe(0)
  expect(fnDestroyedCallsCount(Home)).toBe(0)
  expect(fnDestroyedCallsCount(Nav1)).toBe(0)
})

it('插槽中没有组件场景', () => {
  vm = new Vue({
    router,
    template: `
      <keepalive-extend
        unique-key="app"
      >
        <p>has p</p>
      </keepalive-extend>
    `
  }).$mount(el)
  expect(vm.$el.textContent).toBe('has p')
})
