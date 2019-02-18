<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editArtical') }}</p>
    <el-form :model="form" status-icon ref="form" label-width="60px">
      <quill-editor :articleId="articleId" @onEditorChange="onEditorChange"></quill-editor>
      <el-form-item size="large" class="margin-top-40">
        <el-button size="large"  type="primary" @click="onSubmit('form')">{{ $t('common.commitModify') }}</el-button>
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
    async onSubmit(formName, status) {
      let loading = this.$utils.loading(this)
      console.log('status', status);
      console.log('submit article');
      var file = new File([this.content], 'fileName', {type: 'text/html'});
      file.uid = new Date().getTime()
      let res = await this.$axios.get('/api/v1/editor/modify', { params: { modifierId: this.$store.state.userInfo.id, articleId: this.articleId } })
      if (res.data.code == 201 || (res.data.code == 200 && res.data.data.length < 3)) {
        this.$utils.upLoadFile(this, file, this.$store.state.userInfo.username, async data => {
          console.log('data', data);
          let res = await this.$axios.post('/api/v1/editor/modify', { modifierId: this.$store.state.userInfo.id, content: 'https://' + data.Location, articleId: this.articleId })
          if (res.data.code == 200) {
            this.$message({
              message: this.$t('common.modifySuccess'),
              type: 'success'
            });
          } else {
            this.$message({
              message: this.$t('common.modifyFail'),
              type: 'error'
            });
          }
          loading.close()
          this.$router.go(-1)
        }, (err) => {
          loading.close()
          console.log('err', err);
          this.$router.push({name: 'error', params: { statusCode: 500 }})
        })
      } else if (res.data.code != 200) {
        this.$router.push({name: 'error', params: { statusCode: 500 }})
        loading.close()
      } else if (res.data.code == 200 && res.data.data.length >= 3) {
        loading.close()
        this.$message({
          message: this.$t('editor.modifyLimitTip'),
          type: 'error'
        });
      }
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
