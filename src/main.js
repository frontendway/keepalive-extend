import Vue from 'vue'
import App from './App.vue'
import router from './router'
import KeepaliveExtend from '../lib/index.js'

Vue.config.productionTip = false

Vue.use(KeepaliveExtend)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
