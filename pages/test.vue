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
    // this.$utils.doLogin(this, { passwd: '1', username: '1' }, async () => {

      let result = await this.$axios.post('/api/v1/article/collection', { userId: '4CFD08792740050D9B5587B2DB0B7F', collectionId: '0C425132FB73CEACDD50CDF0825D3D' })
      console.log('result', result.data);
      this.result = result.data

    // }, '/test')
  }
}
</script>

<style>

</style>
