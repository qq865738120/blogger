<template>
  <div class="editor-root">
    <editor-artical></editor-artical>
  </div>
</template>

<script>
import EditorArtical from '~/components/EditorArtical.vue'

export default {
  name: 'editor',
  layout: 'main',
  middleware: 'autho',
  components: {
    EditorArtical
  },
  created() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
      console.log('e', this.$route.params.type);
    }
  },
  mounted() {
    hljs.initHighlightingOnLoad();
    console.log('hljs', hljs);
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';


</style>
