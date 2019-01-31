<template>
  <section class="container">
    <div id="toolbar">
      <el-tooltip effect="dark" content="加粗" placement="bottom-start">
        <button class="ql-bold"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="斜体" placement="bottom-start">
        <button class="ql-italic"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="下划线" placement="bottom-start">
        <button class="ql-underline"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="删除线" placement="bottom-start">
        <button class="ql-strike"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="块引用" placement="bottom-start">
        <button class="ql-blockquote"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="代码块" placement="bottom-start">
        <button class="ql-code-block"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="标题1" placement="bottom-start">
        <button class="ql-header" value="1"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="标题2" placement="bottom-start">
        <button class="ql-header" value="2"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="数字序号" placement="bottom-start">
        <button class="ql-list" value="ordered"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="点序号" placement="bottom-start">
        <button class="ql-list" value="bullet"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="脚标" placement="bottom-start">
        <button class="ql-script" value="sub"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="角标" placement="bottom-start">
        <button class="ql-script" value="super"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="缩进 -1" placement="bottom-start">
        <button class="ql-indent" value="-1"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="缩进 +1" placement="bottom-start">
        <button class="ql-indent" value="+1"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="方向" placement="bottom-start">
        <button class="ql-direction" value="rtl"></button>
      </el-tooltip>
      <el-tooltip effect="dark" content="方向" placement="bottom-start">
        <select class="ql-size">
          <option value="small">小</option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected>正常</option>
          <option value="large">大</option>
          <option value="huge">巨大</option>
        </select>
      </el-tooltip>

      <select class="ql-header">
        <option value="1">标题1</option>
        <!-- Note a missing, thus falsy value, is used to reset to default -->
        <option value="2">标题2</option>
        <option value="3">标题3</option>
        <option value="4">标题4</option>
        <option value="5">标题5</option>
        <option selected value="6">标题6</option>
      </select>
      <select class="ql-color"></select>
      <select class="ql-background"></select>
      <select class="ql-font">
        <option value="cursive">微软雅黑</option>
        <option value="SimSun">宋体</option>
      </select>
      <select class="ql-align"></select>
      <button class="ql-clean"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
    </div>

    <div class="quill-editor"
     :content="content"
     @change="onEditorChange($event)"
     @blur="onEditorBlur($event)"
     @focus="onEditorFocus($event)"
     @ready="onEditorReady($event)"
     v-quill:myQuillEditor="editorOption">
    </div>
  </section>
</template>

<script>
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
  ['image','video']
];

  export default {
    data () {
      return {
        content: '<p>I am Example</p>',
        editorOption: {
          // some quill options
          modules: {
            // toolbar: [
            //   ['bold', 'italic', 'underline', 'strike'],
            //   ['blockquote', 'code-block']
            // ]
            toolbar: '#toolbar'
          },
          placeholder: '请输入内容',
        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)
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
        this.content = html
      }
    }
  }
</script>

<style lang="scss" scoped >
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>
