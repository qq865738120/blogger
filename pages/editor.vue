<template>
  <div class="editor-root">
    <editor-artical></editor-artical>
  </div>
</template>

<script>
import EditorArtical from '~/components/EditorArtical.vue'

export default {
  layout: 'main',
  // middleware: 'autho',
  components: {
    EditorArtical
  },
  created() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';


</style>
