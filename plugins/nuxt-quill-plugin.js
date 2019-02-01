import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import Quill from 'quill'

if (process.browser) {
  Vue.use(VueQuillEditor)
}
