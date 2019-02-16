<template>
  <div class="err-page-root color-main-light-8">
    <div v-if="$route.params.statusCode === 404" class="iconfont open-icon-err404"></div>
    <div v-else class="iconfont open-icon-err500"></div>
    <p>{{ $route.params.statusCode  === 404 ? "很抱歉，您访问的页面不存在" : "服务器内部错误" }}</p>
    <el-button type="primary" @click="onJump" round>{{ time + $t('common.jumpToHome') }}</el-button>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
      time: 3,
      timer: ''
    }
  },
  mounted() {
    if (process.client) {
      let that = this;
      document.getElementsByTagName('body')[0].style.background="white";
      this.timer = setInterval(() => {
        that.time--
      }, 1000)
      setTimeout(() => {
        clearInterval(this.timer)
        that.$router.push('/')
      }, that.time * 1000)
    }
  },
  methods: {
    onJump() {
      clearInterval(this.timer)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.err-page-root {
  text-align: center;
  margin: 300px 0;
}
.err-page-root > div {
  margin: 0 0 40px 0;
}
.err-page-root > p {
  margin-block-end: 40px;
}
</style>
