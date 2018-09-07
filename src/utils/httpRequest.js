import Vue from 'vue'
import axios from 'axios'
<<<<<<< HEAD
// import router from '@/router'
=======
import router from '@/router'
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
<<<<<<< HEAD
  console.log('请求拦截里面的response')
  console.log(response)
  if (response.data && response.data.code === 500106) { // 401, token失效
    clearLoginInfo()
    window.location.href = 'https://www.jizhangyl.com/jizhangyl/wechat/qrAuthorize?returnUrl=https://www.jizhangyl.com/jizhangyl/user/login'
=======
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'home' })
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
<<<<<<< HEAD
  return 'https://www.jizhangyl.com/jizhangyl/' + actionName
  // return 'http://jizhangyl.natapp1.cc/jizhangyl/' + actionName
=======
  return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/jizhangyl/' : window.SITE_CONFIG.baseUrl) + actionName
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
<<<<<<< HEAD
    't': new Date().getTime(),
    'type': 'develop'
=======
    't': new Date().getTime()
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
<<<<<<< HEAD
http.adornData = (data = {}, openDefultdata = true, contentType = 'form') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
=======
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  data = openDefultdata ? merge(data) : data
>>>>>>> 52aa519cf86f5f228359be46b880db9378353327
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
