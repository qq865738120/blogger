<template>
  <div class="editor-root">
    <editor-article v-if="$route.params.type == 'article'" :articleId="$route.params.id"></editor-article>
    <sub-editor-article v-if="$route.params.type == 'subArticle'" :articleId="$route.params.id"></sub-editor-article>
    <editor-book v-if="$route.params.type == 'book'" :bookId="$route.params.id"></editor-book>
  </div>
</template>

<script>
import EditorArticle from '~/components/EditorArticle.vue'
import EditorBook from '~/components/EditorBook.vue'
import SubEditorArticle from '~/components/SubEditorArticle.vue'

export default {
  name: 'editor',
  layout: 'main',
  middleware: 'autho',
  components: {
    EditorArticle,
    SubEditorArticle,
    EditorBook
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
