<template>
  <section class="detail-outer">
    <h3>
      <button @click="$router.go(-1)">返回</button>
      详情页
    </h3>
    <p>搜索结果：详情内容</p>
  </section>
</template>

<script>
export default {
  name: 'detail',

  created () {
    console.log('created detail')
  }
}
</script>
