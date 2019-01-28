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
    this.$utils.doLogin(this, { passwd: 'test', username: 'test' }, async () => {

      let result = await this.$axios.post('/api/v1/user/update',
        {
          nickname: 'lalala'
        }
      )
      console.log('result', result.data);
      this.result = result.data

    }, '/test')
  }
}
</script>

<style>

</style>
