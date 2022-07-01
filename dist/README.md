# keepalive-extend

<p>
  <img src="https://img.shields.io/github/workflow/status/frontendway/keepalive-extend/test-coverage/master">
  <img src="https://img.shields.io/codecov/c/github/frontendway/keepalive-extend/master">
  <img src="https://img.shields.io/github/size/frontendway/keepalive-extend/dist/index.umd.min.js">
  <img src="https://img.shields.io/github/license/frontendway/keepalive-extend">
  <img src="https://img.shields.io/npm/v/keepalive-extend">
</p>

### Brief Introduction
- Compatible with vue2.x API native keepalive component
- Can decide whether to refresh the matching route page according to the rules
- This component depends on Vue-router. Please ensure that Vue router is installed

### Install
```js
# npm
npm install keepalive-extend -S

# or yarn
yarn add keepalive-extend -S
```

### How to use
```js
import Vue from 'vue'
import KeepaliveExtend from 'keepalive-extend'
Vue.use(KeepaliveExtend)
```

### Component API
```html
<!-- include,exclude,max consistent with that of keep-alive -->
<keepalive-extend
  unique-key="app"
  :rules="{
    page1: {refresh: 'page2', notRefresh: 'page3'}
  }"
  :keep-active="false"
  include="page1"
  exclude="page1"
  max="2"
>
  <router-view />
</keepalive-extend>
```

### API
|   property  |                description                 |      type        | required |
|     ----    |                    ----                    |      ----        |   ----   |
| unique-key  |             unique key value               |     string       |   true   |
| keep-active |    whether to persistent cache             |     boolean      |   false  |
|    rules    | whether the target page refreshes the rule |     object       |   false  |
|   include   |    consistent with that of keep-alive      |     string       |   false  |
|   exclude   |    consistent with that of keep-alive      |     string       |   false  |
|     max     |    consistent with that of keep-alive      | string or number |   false  |

### Rules Api
- Enter page1 page from Page2 or Page3 page, and page1 re renders
```js
rules = {
  page1: {
    refresh: 'page2,page3'
    // notRefresh: 'page2,page3'
  }
}
```
```js
rules = {
  page1: {
    refresh: /paeg2|page3/
    // notRefresh: /paeg2|page3/
  }
}
```
```js
rules = {
  page1: {
    refresh: ['page2', /page3/]
    # or
    refresh: [['page2', /page3/]]
    // notRefresh: ['page2', /page3/]
    // notRefresh: [['page2', /page3/]]
  }
}
```

### Remind
- The component name must be consistent with the name in the routing configuration
- Name attribute must be configured
```js
# ./src/page1.vue
<script>
export default {
  name: 'page1',
  ...
}
</script>

# router.js
const routes = [
  {
    path: '/',
    name: 'page1',
    component: () => import('./src/page1.vue')
  }
  ...
]
```
- The name value of the page where the nested keepalive-extend is located must be configured in the exclude of the parent keepalive-extend
- For the nested keepalive-extend page, if the slot needs to be permanently cached, turn on keep-active
- Root keepalive-extend component does not need to enable keep-active
