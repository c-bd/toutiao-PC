import Vue from 'vue'
import App from './App.vue'
import router from './permission/permission.js'
import Axios from './utils/axiosconfig.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import Component from './components/index.js'
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(ElementUI)
Vue.use(Component)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
