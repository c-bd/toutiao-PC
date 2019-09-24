import layoutAside from './home/layou-aside'
import layoutHeader from './header/layou-header'
import layoutContent from './content/home-comment.vue'
import layoutpubishImg from './pubulish/cover-images.vue'// 文章列标上传图片
import layoutPopImg from './pubulish/pup-images.vue'
// 全局注册富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-right-header', layoutHeader)// 全局注册头部组件
    Vue.component('layout-right-content', layoutContent)// 全局注册面包屑组件
    Vue.component('quitor-editor', quillEditor)// 全局注册富文本编辑器
    Vue.component('cover-image', layoutpubishImg)// 全局注册封面组件
    Vue.component('pop-image', layoutPopImg)// 全局注册封面组件
  }
}
