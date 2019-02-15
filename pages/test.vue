<template>
  <div>
    <quill-editor></quill-editor>
    {{result}}
  </div>
</template>

<script>
import QuillEditor from '~/components/QuillEditor.vue'

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      result: ''
    }
  },
  async mounted() {
    this.$utils.doLogin(this, { passwd: '1', username: '1' }, async () => {

      let result = await this.$axios.get('/api/v1/author/info', { params: { articleId: '6EAED90D25FAF43DC1D98A6F4D7E12' } })
      console.log('result', result.data);
      this.result = result.data

    }, '/test')
  }
}
</script>

<style>

</style>
