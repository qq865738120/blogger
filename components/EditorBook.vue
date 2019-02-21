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
        <list-edit :wait="wait"></list-edit>
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
        <el-button size="large"  type="primary" @click="onSubmit('form')">{{ hasBook ? $t('common.modify') : $t('common.created') }}</el-button>
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
      uploadFileTip: '只能上传jpg/png文件，且不超过2MB。上传5:7的图片效果更佳。',
      hasBook: false, //该id对应的书是否已创建
      wait: false
    }
  },

  async mounted() {
    let loading = this.$utils.loading(this)
    this.$store.commit('SET_OLD_COVER', '')
    if (!this.classify) {
      let res = await this.$axios.get('/api/v1/classify')
      this.$store.commit('SET_CLASSIFY', res.data.data)
      this.classify = res.data.data
    }
    let data = await this.$axios.get('/api/v1/book', { params: { id: this.bookId } })
    if (data.data.code == 200) {
      this.form.title = data.data.data[0].title
      this.form.subTitle = data.data.data[0].sub_title
      this.url = data.data.data[0].cover
      this.form.selectedValue = data.data.data[0].class_id
      this.$store.commit('SET_OLD_COVER', data.data.data[0].cover)
      this.hasBook = true
    } else {
      this.hasBook = false
    }
    if (this.hasBook) {
      let chaptersData = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
      if (chaptersData.data.code == 200) {
        let list = []
        for (let item of chaptersData.data.data) {
          list.push({
            title: item.title
          })
        }
        this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(list)))
        this.wait = true
      } else {
        this.$router.push({ name: 'error', params: { statusCode: 500 } })
      }
    }
    loading.close()
  },

  methods: {
    async onSubmit(formName, status) {
      if (this.$store.state.listEdit.length <= 1 && !this.$store.state.listEdit[0].title) {
        this.$message({
          message: this.$t('editor.chapterNotNull'),
          type: 'error'
        });
        return
      }
      let ids = ''
      if (this.hasBook) {
        ids = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
        if (ids.data.code != 200) {
          this.$message({
            message: this.hasBook ? this.$t('common.modifyFail') : this.$t('common.createdFail'),
            type: 'error'
          });
        }
        let dataArr = []
        for (let item of ids.data.data) {
          dataArr.push(item.id)
        }
        let delRes = await this.$axios.get('/api/v1/chapters/delete', { params: { ids: dataArr } })
      }
      let listEdit = JSON.parse(JSON.stringify(this.$store.state.listEdit));
      for (let item of listEdit) {
        item.bookId = this.bookId
        item.title = item.title.replace(/\s+/g,"");
        if (!item.title) {
          this.$message({
            message: this.$t('editor.chapterNotNull'),
            type: 'error'
          });
          return
        }
      }
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
          let isSuccess = false
          let bookRes = await this.$axios.post('/api/v1/book' + (this.hasBook ? '/update' : ''), postData)
          if (bookRes.data.code == 200) {
            isSuccess = true
          }
          this.$axios.post('/api/v1/chapters' + (this.hasBook ? '/update' : ''), { values: listEdit }).then(res => {
            loading.close()
            this.$router.push({name: 'personal', params: { tabsName: 'workManagement' }})
            if (res.data.code == 200 && isSuccess) {
              this.$message({
                message: this.hasBook ? this.$t('common.modifySuccess2') : this.$t('common.createdSuccess'),
                type: 'success'
              });
            } else {
              this.$message({
                message: this.hasBook ? this.$t('common.modifyFail') : this.$t('common.createdFail'),
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
