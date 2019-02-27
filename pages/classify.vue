<template>
  <div class="classify-page-root">
    <div class="head">
      <div v-for="(item, index) of classList">
        <img v-lazy="item.image" />
        <span>{{ item.classification }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
      classList: []
    }
  },
  async asyncData({ app, store }) {
    console.log('process.client',process.client);
    if (process.client) {
      console.log('ok', store.state);
      if (!store.state.classList) {
        let row = await app.$axios.get('/api/v1/classify')
        if (row.data.code == 200) {
          store.commit('SET_CLASSIFY', row.data.data)

          return {
            classList: row.data.data
          }
        } else {
          this.$router.push({name: 'error', params: { statusCode: 500 }})
        }
      } else {
        return {
          classList: store.state.classList
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';
</style>
