<template>
  <section>
    <h3>nav1</h3>
    <input type="text" @click="toSearchPage" placeholder="去搜搜">
  </section>
</template>

<script>
export default {
  name: 'nav1',

  created () {
    console.log('created nav1')
  },

  methods: {
    toSearchPage () {
      this.$router.push('/search')
    }
  }
}
</script>
