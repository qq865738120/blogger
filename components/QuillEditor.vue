<template>
  <section class="quill-editor-root">
    <div id="toolbar">
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.bold')" placement="bottom-start">
          <button class="ql-bold"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.italic')" placement="bottom-start">
          <button class="ql-italic"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.underline')" placement="bottom-start">
          <button class="ql-underline"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.strike')" placement="bottom-start">
          <button class="ql-strike"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.blockquote')" placement="bottom-start">
          <button class="ql-blockquote"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.codeBlock')" placement="bottom-start">
          <button class="ql-code-block"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.header1')" placement="bottom-start">
          <button class="ql-header" value="1"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.header2')" placement="bottom-start">
          <button class="ql-header" value="2"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.list1')" placement="bottom-start">
          <button class="ql-list" value="ordered"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.list2')" placement="bottom-start">
          <button class="ql-list" value="bullet"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.script1')" placement="bottom-start">
          <button class="ql-script" value="sub"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.script2')" placement="bottom-start">
          <button class="ql-script" value="super"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.indent1')" placement="bottom-start">
          <button class="ql-indent" value="-1"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.indent2')" placement="bottom-start">
          <button class="ql-indent" value="+1"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.direction')" placement="bottom-start">
          <button class="ql-direction" value="rtl"></button>
        </el-tooltip>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <select class="ql-size">
          <option value="small">{{ $t('quillEditor.fontSize1') }}</option>
          <option selected>{{ $t('quillEditor.fontSize2') }}</option>
          <option value="large">{{ $t('quillEditor.fontSize3') }}</option>
          <option value="huge">{{ $t('quillEditor.fontSize4') }}</option>
        </select>
        <select class="ql-header">
          <option value="1">{{ $t('quillEditor.header1') }}</option>
          <option value="2">{{ $t('quillEditor.header2') }}</option>
          <option value="3">{{ $t('quillEditor.header3') }}</option>
          <option value="4">{{ $t('quillEditor.header4') }}</option>
          <option selected value="5">{{ $t('quillEditor.header5') }}</option>
        </select>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.insertLink')" placement="bottom-start">
          <button class="ql-link"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.insertImage')" placement="bottom-start">
          <button class="ql-image"></button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="$t('quillEditor.insertVideo')" placement="bottom-start">
          <button class="ql-video"></button>
        </el-tooltip>
      </span>
      <span class="ql-formats">
        <el-tooltip effect="dark" :content="$t('quillEditor.clean')" placement="bottom-start">
          <button class="ql-clean"></button>
        </el-tooltip>
      </span>
    </div>

    <div
      class="quill-editor"
      v-model="content"
      ref="myQuillEditor"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption">
    </div>
    <div v-html="html">

    </div>
    <el-button @click="onSubmit">提交</el-button>
  </section>
</template>

<script>

export default {
  data () {
    return {
      content: '',
      html: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar',
          syntax: true,
        },
        placeholder: this.$t('common.enterContent'),
      }
    }
  },
  async mounted() {
    // let res = await this.$axios.get('https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/user/111/9906182432051.html')
    // console.log('res', res.data);
    // this.html = res.data
    hljs.configure({
      languages: ['c#','c++','css','coffeescript','html','xml','http','json','java','javascript','markdown','nginx','php','python','ruby','sql','shell']
    });
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.html = html
    },
    onSubmit() {
      console.log('submit');
      var file = new File([this.html], 'test', {type: 'text/html'});
      file.uid = new Date().getTime()
      console.log(file);
      this.$utils.upLoadFile(this, file, '111', data => {
        console.log(data);

      }, (err) => {
        console.log('err', err);
      })
    }
  }
}
</script>

<style lang="scss" scoped >

.quill-editor {
  min-height: 400px;
  max-height: 740px;
  overflow-y: auto;
}
</style>
