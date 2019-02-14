<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editArtical') }}</p>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
      <el-form-item :label="$t('editor.title')" prop="title" style="width: 600px;" >
        <el-input type="text" v-model="form.title" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editor.illustration')" style="width: 600px;">
        <upload-file :uid="articleId"></upload-file>
      </el-form-item>
      <quill-editor @onEditorChange="onEditorChange"></quill-editor>
      <el-form-item :label="$t('header.classify')" prop="selectedValue" style="margin-top: 30px;">
        <el-select v-model="form.selectedValue" :placeholder="$t('editor.selectClassify')">
          <el-option
            v-for="item in classify"
            :key="item.id"
            :label="item.classification"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('common.keyWords')" prop="keyWords">
        <el-select
          v-model="form.keyWords"
          multiple
          filterable
          allow-create
          default-first-option
          :placeholder="$t('editor.selectKeyWords')">
          <el-option
            v-for="item in keyWordsList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button size="large"  type="primary" @click="onSubmit('form', '1')">{{ $t('common.public') }}</el-button>
        <el-button size="large" type="primary" @click="onSubmit('form', '0')">{{ $t('common.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadFile from '~/components/UploadFile.vue'
import QuillEditor from '~/components/QuillEditor.vue'

export default {
  components: {
    UploadFile,
    QuillEditor
  },

  props: {
    articleId: String
  },

  data() {
    var validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('editor.titleTip')));
      } else {
        callback();
      }
    };
    var validateClassify = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('editor.classifyTip')));
      } else {
        callback();
      }
    };
    var validateKeyWords = (rule, value, callback) => {
      console.log('value', value);
      if (value.length > 6) {
        callback(new Error(this.$t('editor.classifyTip')));
      } else {
        callback();
      }
    };
    return {
      form: {
        title: '',
        selectedValue: '',
        keyWords: []
      },
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        selectedValue: [
          { validator: validateClassify, trigger: 'blur' }
        ],
        keyWords: [
          { validator: validateKeyWords, trigger: 'blur' }
        ]
      },
      content: '', //富文本编辑器内容
      text: '', //富文本编辑器纯文本内容
      classify: this.$store.state.classList,
      keyWordsList: ['spring', 'vue', '框架', '教程', '心得', 'react']
    }
  },

  mounted() {
    if (!this.classify) {
      this.$axios.get('/api/v1/classify').then(res => {
        console.log(res.data.data);
        this.$store.commit('SET_CLASSIFY', res.data.data)
        this.classify = res.data.data
      })
    }
  },

  methods: {
    onSubmit(formName, status) {
      if (this.text.length < 300) {
        this.$alert(this.$t('editor.contentTip'), this.$t('common.tip'), {
         confirmButtonText: this.$t('common.know')
       });
       return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          console.log('status', status);
          console.log('submit article');
          var file = new File([this.content], 'fileName', {type: 'text/html'});
          file.uid = this.articleId
          console.log(file);
          this.$utils.upLoadFile(this, file, this.$store.state.userInfo.username, data => {
            console.log(data);
            let keywords = ''
            for (let item of this.form.keyWords) {
              keywords += item + '##'
            }
            let postData = {
              id: this.articleId,
              title: this.form.title,
              authorId: this.$store.state.userInfo.id,
              classId: this.form.selectedValue,
              content: 'https://' + data.Location,
              status: status,
              illustration: this.$store.state.oldIllustration,
              keywords: keywords,
              describe: this.text.substring(0, 200)
            }
            this.$axios.post('/api/v1/article/add', postData).then(res => {
              console.log('新增文章', res.data);
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
      console.log('text', text);
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
