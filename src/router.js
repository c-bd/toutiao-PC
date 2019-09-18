import Vue from 'vue'
import Router from 'vue-router'
// 在入口处引入一级路由
import Home from './views/home/' // 简写
import Login from './views/login/'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 这里两个都是一级路由 我们为空的时候应该默认跳转到首页
      path: '/',
      directives: 'home'

    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
