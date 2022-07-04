<template>
  <div id="app">
    <keepalive-extend
      unique-key="app"
      :rules="rules"
    >
      <router-view />
    </keepalive-extend>
  </div>
</template>

<script>
// import Detail from './views/detail/index.vue'
// import Login from './views/login/index.vue'

export default {
  name: 'app',

  // components: {
  //   Detail,
  //   Login
  // },

  data () {
    return {
      name: 'Detail',
      rules: {
        search: {
          refresh: 'login',
          notRefresh: 'detail'
        }
      }
    }
  },

  methods: {
    toggle () {
      this.name = this.name === 'Detail' ? 'Login' : 'Detail'
    }
  }
}
</script>

<style>
h1,h2,h3,h4,h5,body{
  margin: 0px;
}
html,body,#app{
  height: 100%;
}
</style>
