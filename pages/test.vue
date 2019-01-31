<template>
  <div>
    {{result}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: ''
    }
  },
  async mounted() {
    this.$utils.doLogin(this, { passwd: '1', username: '1' }, async () => {

      let result = await this.$axios.get('/api/v1/article/createtime?page=0')
      console.log('result', result.data);
      this.result = result.data

    }, '/test')
  }
}
</script>

<style>

</style>
