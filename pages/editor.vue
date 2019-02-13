<template>
  <div class="editor-root">
    <editor-article :articleId="$route.params.id"></editor-article>
  </div>
</template>

<script>
import EditorArticle from '~/components/EditorArticle.vue'

export default {
  name: 'editor',
  layout: 'main',
  middleware: 'autho',
  components: {
    EditorArticle
  },
  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
      if (!this.$route.params.id || !this.$route.params.type) {
        this.$router.push({name: 'personal'})
      }
      console.log('e id', this.$route.params.id);
      console.log('e', this.$route.params.type);
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';


</style>
