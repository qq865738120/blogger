<template>
  <div class="page-signin-root" :style="{ background: bg }">
    <sign-form></sign-form>
  </div>
</template>

<script>
import SignForm from '~/components/SignForm.vue'

export default {
  components: {
    SignForm
  },
  data() {
    return {
      bg: ''
    }
  },
  created() {
    this.bg = `url(${process.env.cosPath}/system/simple-codelines.svg),#2b3843`
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.page-signin-root {
  height: 100%;
  @include felx(flex, column, center, center);
}
</style>
