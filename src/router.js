import Vue from 'vue'
import Router from 'vue-router'
// 在入口处引入一级路由
import Home from './views/home/' // 简写
import Login from './views/login/'
import Main from './views/home/main'
// import HomePublish from './components/content/home-children/home-publish'
// import HomeArticles from './components/content/home-children/home-articles'
// import HomeFansdata from './components/content/home-children/home-fansdata'
// import HomeFansinfo from './components/content/home-children/home-fansinfo'
// import HomeFanslist from './components/content/home-children/home-fanslist'
// import HomeFansimg from './components/content/home-children/home-fansimg'
// import HomeCenter from './components/content/home-children/home-account'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 这里两个都是一级路由 我们为空的时候应该默认跳转到首页
      path: '/',
      directives: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '', // 上面都不写 默认二级路由
          component: Main
        },
        // {
        //   path: 'publish',
        //   component: HomePublish
        // },
        {
          path: 'articles',
          component: () => import('./views/contents')
        },
        {
          path: 'comment',
          component: () => import('./views/comment/index.vue')
        },
        {
          path: 'material',
          component: () => import('./views/material')
        },
        {
          // 因为带了id跳转会找不到所以只能重新定义一个 如果带着id参数跳转那么就可以跳转到同一页面
          path: 'publish/:articleId',
          component: () => import('./views/publish')
        },
        {
          path: 'publish',
          component: () => import('./views/publish')
        }
        // {

        //   path: 'fansdata',
        //   component: HomeFansdata
        // },
        // {

        //   path: 'fansinfo',
        //   component: HomeFansinfo
        // },
        // {

        //   path: 'fanslist',
        //   component: HomeFanslist
        // },
        // {

        //   path: 'fansimg',
        //   component: HomeFansimg
        // },
        // {
        //   path: 'account',
        //   component: HomeCenter
        // }
      ]
      // 二级路由的地址 如果以/开头那么就会默认从根路径开始找起 如果不以/开头 就会从你的父路由上进行追
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
