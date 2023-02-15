<template>
  <div class="home-outer">
    <h3>home</h3>
    <div class="content-outer">
      <keepalive-extend
        unique-key="home"
        :keep-active="true"
      >
        <router-view />
      </keepalive-extend>
    </div>
    <nav class="nav-outer">
      <router-link to="/home/nav1">nav1</router-link>
      <router-link to="/home/nav2">nav2</router-link>
      <router-link to="/home/nav3">nav3</router-link>
      <router-link to="/home/nav4">nav4</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    console.log('home')
  }
}
</script>

<style scoped>
.home-outer{
  height: 100%;
}
.content-outer{
  height: calc(100% - 70px);
}
.nav-outer{
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
