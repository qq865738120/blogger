<template>
  <div class="page-signin-root" :style="{ background: bg }">
    <img v-lazy="logoSrc" class="margin-bottom-30"/>
    <signin-form></signin-form>
  </div>
</template>

<script>
import SigninForm from '~/components/SigninForm.vue'

export default {
  components: {
    SigninForm
  },
  data() {
    return {
      logoSrc: '',
      bg: ''
    }
  },
  created() {
    this.logoSrc = `${process.env.cosPath}/system/logo.png`
    this.bg = `url(${process.env.cosPath}/system/simple-codelines.svg),#2b3843`
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.page-signin-root {
  height: 100%;
  @include felx(flex, column, center, center, nowrap);
}
</style>
