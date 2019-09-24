import layoutAside from './home/layou-aside'
import layoutHeader from './header/layou-header'
import layoutContent from './content/home-comment.vue'
import layoutpubishImg from './pubulish/cover-images.vue'// 文章列标上传图片
// 全局注册富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-right-header', layoutHeader)
    Vue.component('layout-right-content', layoutContent)
    Vue.component('quitor-editor', quillEditor)
    Vue.component('cover-image', layoutpubishImg)
  }
}
