import layoutAside from './home/layou-aside'
import layoutHeader from './header/layou-header'
import layoutContent from './content/home-children/home-comment.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-right-header', layoutHeader)
    Vue.component('layout-right-content', layoutContent)
  }
}
