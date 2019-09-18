import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
Vue.config.productionTip = false
Vue.proyotype.$axios = Axios
Vue.use(ElementUI)
Vue.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
