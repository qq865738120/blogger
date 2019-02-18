<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editArtical') }}</p>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
      <quill-editor @onEditorChange="onEditorChange"></quill-editor>
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
    }
  },

  methods: {
    onSubmit(formName, status) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          console.log('status', status);
          console.log('submit article');
          var file = new File([this.content], 'fileName', {type: 'text/html'});
          file.uid = this.articleId
          console.log(file);
          this.$utils.upLoadFile(this, file, this.$store.state.userInfo.username, async data => {
            console.log(data);
            let keywords = ''
            for (let item of this.form.keyWords) {
              keywords += item + '##'
            }
            let url = '/api/v1/article/'
            let postData = {
              id: this.articleId,
              title: this.form.title,
              authorId: this.$store.state.userInfo.id,
              classId: this.form.selectedValue,
              content: 'https://' + data.Location,
              status: status,
              illustration: this.$store.state.oldIllustration,
              keywords: keywords,
              describe: this.text.replace(/\s+/g,"").substring(0, 200)
            }
            let resData = await this.$axios.get('/api/v1/article/id', { params: { id: this.articleId } })
            if (resData.data.code == 200) {
              url += 'modify'
              postData.lastDate = this.$moment().format('YYYY-MM-DD HH:mm:ss');
            } else {
              url += 'add'
            }
            this.$axios.post(url, postData).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  message: status == 0 ? this.$t('editor.saveSuccessTip') : this.$t('editor.publicSuccessTip'),
                  type: 'success'
                });
              } else {
                this.$message({
                  message: status == 0 ? this.$t('editor.saveFailTip') : this.$t('editor.publicFailTip'),
                  type: 'error'
                });
              }
            })
            loading.close()
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
