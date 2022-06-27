<template>
  <section class="search-outer">
    <h3>
      <button @click="$router.go(-1)">返回</button>
      search页面
    </h3>
    <button @click="$router.push('/detail')">去详情页</button>
  </section>
</template>

<script>
export default {
  name: 'search',

  created () {
    console.log('created search')
  }
}
</script>
