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

      let result = await this.$axios.post('/api/v1/article/add', { id: '12ddd3', title: '标题', authorId: '6EAED90D25FAF43DC1D98A6F4D7E12', classId: 'd41d8cd98f00b204e9800998ecf8427e', content: '123', status: '0' })
      console.log('result', result.data);
      this.result = result.data

    }, '/test')
  }
}
</script>

<style>

</style>
