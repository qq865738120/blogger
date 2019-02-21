<template>
  <div class="book-page-root">
    {{ $route.params.id }}
  </div>
</template>

<script>
  export default {
    layout: 'main',
  }
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

</style>
