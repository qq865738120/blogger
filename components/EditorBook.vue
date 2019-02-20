<template>
  <div class="editor-artical-root">
    <p class="title">{{ $t('editor.editBook') }}</p>
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
      <el-form-item :label="$t('editor.bookName')" prop="title" style="width: 600px;" >
        <el-input type="text" v-model="form.title" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editor.subTitle')" prop="subTitle" style="width: 600px;" >
        <el-input type="text" v-model="form.subTitle" autocomplete="off" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('editor.cover')" style="width: 600px;">
        <upload-file :url="url" :tip="uploadFileTip" :storeName="'oldCover'" :mutationName="'SET_OLD_COVER'"></upload-file>
      </el-form-item>
      <el-form-item :label="$t('editor.chapterSet')" style="width: 600px;">
        <list-edit></list-edit>
      </el-form-item>
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
      <el-form-item size="large">
        <el-button size="large"  type="primary" @click="onSubmit('form')">{{ $t('common.created') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UploadFile from '~/components/UploadFile.vue'
import QuillEditor from '~/components/QuillEditor.vue'
import ListEdit from '~/components/ListEdit.vue'

export default {
  components: {
    UploadFile,
    ListEdit
  },

  props: {
    bookId: String
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
        subTitle: ''
      },
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        selectedValue: [
          { validator: validateClassify, trigger: 'blur' }
        ]
      },
      classify: this.$store.state.classList,
      url: '',
      uploadFileTip: '只能上传jpg/png文件，且不超过2MB。上传3:4的图片效果更佳。'
    }
  },

  async mounted() {
    let loading = this.$utils.loading(this)
    if (!this.classify) {
      let res = await this.$axios.get('/api/v1/classify')
      this.$store.commit('SET_CLASSIFY', res.data.data)
      this.classify = res.data.data
    }
    // let data = await this.$axios.get('/api/v1/article/id', { params: { id: this.bookId } })
    // if (data.data.code == 200) {
    //   this.form.title = data.data.data.title
    //   this.url = data.data.data.illustration
    //   this.form.selectedValue = data.data.data.class_id
    //   let keys = data.data.data.keywords.split('##')
    //   keys.pop()
    //   this.form.keyWords = keys
    // }
    loading.close()
  },

  methods: {
    onSubmit(formName, status) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          let postData = {
            id: this.bookId,
            name: this.form.title,
            subTitle: this.form.subTitle,
            cover: this.$store.state.oldCover,
            classId: this.form.selectedValue,
            authorId: this.$store.state.userInfo.id
          }
          let bookRes = await this.$axios.post('/api/v1/book', postData)
          if (res.data.code == 200) {
            this.$message({
              message: this.$t('common.createdSuccess'),
              type: 'success'
            });
          } else {
            this.$message({
              message: this.$t('common.createdFail'),
              type: 'error'
            });
          }
          let listEdit = JSON.parse(JSON.stringify(this.$store.state.listEdit));
          for (let item of listEdit) {
            item.bookId = this.bookId
          }
          this.$axios.post('/api/v1/chapters', { values: listEdit }).then(res => {
            loading.close()
            if (res.data.code == 200) {
              this.$message({
                message: this.$t('common.createdSuccess'),
                type: 'success'
              });
            } else {
              this.$message({
                message: this.$t('common.createdFail'),
                type: 'error'
              });
            }
          })
        }
      });
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
