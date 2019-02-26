<template>
  <div class="editor-artical-root">
    <!-- <p class="title">{{ $t('editor.editBook') }}</p> -->
    <div class="head">
      <el-steps :active="stepActive">
        <el-step :title="$t('editor.editingBook')" :description="$t('editor.editingBookTip')"></el-step>
        <el-step :title="$t('personal.addArtical')" :description="$t('editor.addArticleTip')"></el-step>
      </el-steps>
    </div>

    <transition name="el-fade-in-linear">
      <el-form v-show="stepActive == 1" :model="form" status-icon :rules="rules" ref="form" label-width="80px">
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
          <list-edit :wait="wait" :stateName="'listEdit'" :methodName="'SET_LIST_EDIT'"></list-edit>
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
          <el-button size="large"  type="primary" @click="onSubmit('form')">{{ $t('common.nextStep') }}</el-button>
        </el-form-item>
      </el-form>
    </transition>

    <transition name="el-fade-in-linear">
      <el-form v-show="stepActive == 2" :model="form" status-icon label-width="80px">
        <el-form-item :label="$t('editor.selectChapter')" style="margin-top: 30px;">
          <el-select v-model="form.selectedChapter" :placeholder="$t('editor.selectClassify')">
            <el-option
              v-for="item in chapters"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('personal.addArtical')" style="width: 600px;">
          <list-edit
            :wait="wait2"
            :stateName="'chapterEdit'"
            :methodName="'SET_CHAPTER_EDIT'"
            :placeholder="'editor.pleaseInputSection'"
            :showSelect="true"
            :chapterId="form.selectedChapter"
            ></list-edit>
        </el-form-item>
        <el-form-item size="large">
          <el-button size="large"  type="primary" @click="onPrevious()">{{ $t('common.previous') }}</el-button>
          <el-button size="large"  type="primary" @click="onFinish()">{{ $t('common.finish') }}</el-button>
        </el-form-item>
      </el-form>
    </transition>

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
        selectedValue: '001',
        subTitle: '',
        selectedChapter: ''
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
      chapters: [],
      url: '',
      uploadFileTip: '只能上传jpg/png文件，且不超过2MB。上传5:7的图片效果更佳。',
      hasBook: false, //该id对应的书是否已创建
      hasSection: false, //该id对应的小节是否有创建过
      wait: false,
      wait2: false,
      stepActive: 1, //步骤条当前激活
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
      this.$store.commit('SET_LIST_EDIT', [{ title: '' }])
      this.wait = this.wait ? false : true
    }
    if (this.hasBook) {
      let chaptersData = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
      if (chaptersData.data.code == 200) {
        let list = []
        for (let item of chaptersData.data.data) {
          list.push({
            id: item.id,
            title: item.title
          })
        }
        this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(list)))
        this.wait = this.wait ? false : true
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
        if (delRes.data.code != 200) {
          this.$message({
            message: this.hasBook ? this.$t('common.modifyFail') : this.$t('common.createdFail'),
            type: 'error'
          });
        }
      }
      let listEdit = JSON.parse(JSON.stringify(this.$store.state.listEdit));
      for (let i = 0; i < listEdit.length; i++) {
        if (ids && ids.data.code == 200 && ids.data.data[i]) {
          listEdit[i].id = ids.data.data[i].id
        }
        listEdit[i].bookId = this.bookId
        listEdit[i].title = listEdit[i].title.replace(/\s+/g,"");
        if (!listEdit[i].title) {
          this.$message({
            message: this.$t('editor.chapterNotNull'),
            type: 'error'
          });
          return
        }
      }
      this.$store.commit('SET_LIST_EDIT', JSON.parse(JSON.stringify(listEdit)))
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
          this.$axios.post('/api/v1/chapters', { values: listEdit }).then(async res => {
            loading.close()
            // this.$router.push({name: 'personal', params: { tabsName: 'workManagement' }})
            if (res.data.code == 200 && isSuccess) {
              this.hasBook = true
              await this.nextStep()
              this.stepActive = 2
              // this.$message({
              //   message: this.hasBook ? this.$t('common.modifySuccess2') : this.$t('common.createdSuccess'),
              //   type: 'success'
              // });
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

    async nextStep() {
      let loading = this.$utils.loading(this)
      let chaptersRes = await this.$axios.get('/api/v1/chapters', { params: { bookId: this.bookId } })
      if (chaptersRes.data.code == 200) {
        this.chapters = chaptersRes.data.data
        this.form.selectedChapter = chaptersRes.data.data[0].id
      } else {
        this.$router.push({ name: 'error', params: { statusCode: 500 } })
      }
      let getBookRes = await this.$axios.get('/api/v1/book/article', { params: { bookId: this.bookId } })
      if (getBookRes.data.code == 200) {
        this.hasSection = true
        let chapterEditList = getBookRes.data.data.map(item => {
          return { chapterId: item.chapter_id, id: item.article_id, title: item.section_title }
        })
        for (let item of chaptersRes.data.data) {
          let count = 0
          for (let it of chapterEditList) {
            if (item.id == it.chapterId) {
              count++
            }
          }
          if (count <= 0) {
            chapterEditList.push({ chapterId: item.id, title: '' })
          }
        }
        this.$store.commit('SET_CHAPTER_EDIT', chapterEditList)
      } else if (getBookRes.data.code == 201 && getBookRes.data.msg == "没有数据") {
        this.hasSection = false
        let chapterEditList = []
        for (let item of chaptersRes.data.data) {
          chapterEditList.push({ chapterId: item.id, title: '' })
        }
        this.$store.commit('SET_CHAPTER_EDIT', chapterEditList)
      }
      this.wait2 = this.wait2 ? false : true
      loading.close()
    },

    onPrevious() {
      this.$alert('返回上一步会丢失当前编辑的内容', '警告', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action == 'confirm') {
            this.stepActive = 1;
          }
        }
      });
    },

    async onFinish() {
      let loading = this.$utils.loading(this)
      let data = JSON.parse(JSON.stringify(this.$store.state.chapterEdit))
      let sendData = []
      for (let item of data) {
        if (!item.chapterId && (!item.id || !item.title)) {
          this.$message({
            message: this.$t('editor.sectionTip'),
            type: 'error'
          });
          return
        } else if (item.chapterId && item.id && item.title) {
          sendData.push({
            bookId: this.bookId,
            articleId: item.id,
            sectionTitle: item.title,
            chapterId: item.chapterId
          })
        }
      }
      console.log('data', data);
      console.log('sendData', sendData);

      if (sendData.length == 0) {
        loading.close()
      } else {
        let getBookRes = await this.$axios.get('/api/v1/book/article', { params: { bookId: this.bookId } })
        if (getBookRes.data.code == 200) {
          let delBookRes = await this.$axios.get('/api/v1/book/article/delete', { params: { ids: getBookRes.data.data.map(item => { return item.id }) } })
          if (delBookRes.data.code == 200) {
            let bookRes = await this.$axios.post('/api/v1/book/article', { values: sendData })
            if (bookRes.data.code == 200) {
              // this.$router.push({name: 'personal'})
              this.$utils.showMessage(this, 'editor.saveSuccessTip', 'success', loading)
            } else {
              this.$utils.showMessage(this, 'editor.saveFailTip', 'error', loading)
            }
          } else {
            this.$utils.showMessage(this, 'editor.saveFailTip', 'error', loading)
          }
        } else {
          let bookRes = await this.$axios.post('/api/v1/book/article', { values: sendData })
          if (bookRes.data.code == 200) {
            // this.$router.push({name: 'personal'})
            this.$utils.showMessage(this, 'editor.saveSuccessTip', 'success', loading)
          } else {
            this.$utils.showMessage(this, 'editor.saveFailTip', 'error', loading)
          }
        }
      }
      this.$axios.get('/api/v1/redundance/book/article', { params: { bookId: this.bookId } })
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
.head {
  width: 740px;
  margin: 50px auto;
}
</style>
