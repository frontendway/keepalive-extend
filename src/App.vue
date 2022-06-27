<template>
  <div id="app">
    <keepalive-extend
      unique-key="app"
      exclude="home"
    >
      <router-view />
    </keepalive-extend>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      rules: {
        search: {
          notRefresh: 'detail'
        }
      }
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
