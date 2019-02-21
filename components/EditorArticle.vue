<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editArtical') }}</p>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
      <el-form-item :label="$t('editor.title')" prop="title" style="width: 600px;" >
        <el-input type="text" v-model="form.title" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editor.illustration')" style="width: 600px;">
        <upload-file :url="url" :tip="uploadFileTip" :storeName="'oldIllustration'" :mutationName="'SET_OLD_ILLUSTRATION'"></upload-file>
      </el-form-item>
      <quill-editor :articleId="articleId" @onEditorChange="onEditorChange"></quill-editor>
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
        callback(new Error(this.$t('editor.kewordsTip')));
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
      keyWordsList: ['spring', 'vue', '框架', '教程', '心得', 'react'],
      url: '',
      uploadFileTip: '只能上传jpg/png文件，且不超过2MB'
    }
  },

  async created() {
    if (process.client) {

    }
  },

  async mounted() {
    let loading = this.$utils.loading(this)
    this.$store.commit('SET_OLD_ILLUSTRATION', '')
    if (!this.classify) {
      let res = await this.$axios.get('/api/v1/classify')
      this.$store.commit('SET_CLASSIFY', res.data.data)
      this.classify = res.data.data
    }
    let data = await this.$axios.get('/api/v1/article/id', { params: { id: this.articleId } })
    if (data.data.code == 200) {
      this.form.title = data.data.data.title
      this.url = data.data.data.illustration
      this.form.selectedValue = data.data.data.class_id
      let keys = data.data.data.keywords.split('##')
      keys.pop()
      this.form.keyWords = keys
      this.$store.commit('SET_OLD_ILLUSTRATION', data.data.data.illustration)
    }
    loading.close()
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
            this.$router.push({name: 'personal', params: { tabsName: 'workManagement' }})
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
