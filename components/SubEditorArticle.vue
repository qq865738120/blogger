<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editArtical') }}</p>
    <el-form :model="form" status-icon ref="form" label-width="80px">
      <quill-editor :articleId="articleId" @onEditorChange="onEditorChange"></quill-editor>
      <el-form-item size="large">
        <el-button size="large"  type="primary" @click="onSubmit('form')">{{ $t('common.public') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import QuillEditor from '~/components/QuillEditor.vue'

export default {
  components: {
    QuillEditor
  },

  props: {
    articleId: String
  },

  data() {
    return {
      form: {},
      content: '', //富文本编辑器内容
      text: '', //富文本编辑器纯文本内容
      body: '', //富文本编辑器预设内容
    }
  },

  async created() {


  },

  methods: {
    onSubmit(formName, status) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          console.log('status', status);
          console.log('submit article');
          var file = new File([this.content], 'fileName', {type: 'text/html'});
          file.uid = new Date().getTime()
          console.log(file);
          this.$utils.upLoadFile(this, file, this.$store.state.userInfo.username, async data => {

          }, (err) => {
            loading.close()
            console.log('err', err);
          })
        }
      });
    },

    onEditorChange(content, text) {
      this.content = content
      this.text = text
    },

  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.editor-artical-root {
  width: 900px;
}
.title {
  font-size: $--extra-large;
  color: $--color-base-black-2;
  padding-bottom: $--px12;
  border-bottom: 1px solid $--color-main-light-8;
  margin-block-start: $--px30;
  margin-block-end: $--px30;
}
</style>
