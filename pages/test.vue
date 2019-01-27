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
    // let result = await this.$axios.post('/api/v1/file/sts',
    //   [{
    //     action: 'name/cos:PutObject',
    //     bucket: 'weixin-1251663069',
    //     region: 'ap-chengdu',
    //     prefix: 'user/*',
    //   }]
    // )
    // console.log('result', result.data);
    // this.result = result.data
  }
}
</script>

<style>

</style>
