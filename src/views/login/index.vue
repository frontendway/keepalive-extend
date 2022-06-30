<template>
  <div class="login-outer">
    <button @click="$router.push('/')">请登录</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  created () {
    console.log('login')
  }
}
</script>

<style>
.login-outer{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
