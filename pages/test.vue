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
    let result = await this.$axios.get('/api/v1/user/info')
    console.log('result', result);
    this.result = result
  }
}
</script>

<style>

</style>
