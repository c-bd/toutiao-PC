// 这里我们放权限信息  这里我们引出一个导航守卫的概念
// 判断当前登陆的标识 当前缓存中有token则证明可以进去首页 如果点击下一页或者上一页 或者跳转其他路由时
// 如果当前没有token那么我们就拦截你的请求，并强制跳转到登录页
// 导航守卫：是在路由发生变化  进入下一个路有前进行判断
// 因为这个是对路由的一个处理所以我们需要再次引入路由然后再将路由引出 在这里完成中间的筛选过程
import router from '../router'
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path.startsWith('/home')) {
    //    判断当前有没有token如果有则塞进来如果没有则跳转到登录页面
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
