
import router from '../permission/permission'
import { Message } from 'element-ui'
import axios from 'axios'
import jsonBig from 'json-bigint'
// // // 在相应数据回来之前我们需要处理一下大数字的问题
axios.defaults.transformResponse = [function (data) {
  // data 是响应回来的字符串
  return data ? jsonBig.parse(data) : data
}]
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 在这之前用一个函数 手动给每一个header都加入一个token这样可以省去每次写请求都得取一次token
// 在这里我们引入一个axios拦截器
// 一个请求拦截器  一个相应拦截器
// 请求拦截器  自动添加token
// 响应拦截中 解除一层数据结构data
// config是发送请求的配置信息
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应数据的处理 我们需要拖掉一层data
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存 这里的话清除掉所有的缓存因为没有token需要跳转到登陆页面
      router.push('/login') // 因为这里
      break
    case 404:
      message = '手机号不正确'
      break
  }
  Message.success({ message })
  //   希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () {})// 如果不穿参数(resolvt或者reject)话那么就不会进入then或者catch  到此就会结束 不再进入下一个.catch
})
export default axios
