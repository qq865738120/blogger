import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import Quill from 'quill'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

if (process.browser) {
  Quill.register('modules/ImageExtend', ImageExtend)

  Vue.use(VueQuillEditor)
}
