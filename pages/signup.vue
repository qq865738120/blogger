<template>
  <div class="page-signup-root" :style="{ background: bg }">
    <img v-lazy="logoSrc" class="margin-bottom-30"/>
    <signup-form></signup-form>
  </div>
</template>

<script>
import SignupForm from '~/components/SignupForm.vue'

export default {
  components: {
    SignupForm
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

.page-signup-root {
  height: 100%;
  @include felx(flex, column, center, center, nowrap);
}
</style>
