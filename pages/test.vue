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

      let result = await this.$axios.post('/api/v1/article/modify', { id: '656B6BAD9A443A89E36470A515AD05', lastDate: '2018-12-1 22:12:33' })
      console.log('result', result.data);
      this.result = result.data

    }, '/test')
  }
}
</script>

<style>

</style>
