/**
 * axios的二次封装
 */
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import config from '../config'
import { useUserStore } from '@/store/user'
import { getCookies } from '@/utils/storage'

// 创建axios实例对象，添加全局对象
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // TO-DO
    // const headers = config.headers
    // const { token = '' } = storage.getItem('userInfo') || {}
    // if (!headers.Authorization) headers.Authorization = 'Bearer ' + token

    const userStore = useUserStore()
    if (userStore.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getCookies('Admin-Token')
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()

    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm('您已经注销，您可以取消以留在此页面，也可以重新登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          userStore.resetToken().then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    console.log(`err${error}`) // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

/**
 * 请求核心函数
 * @param {*} options 请求配置
 * @returns
 */
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.datas
  }

  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 生产环境
  if (config.env === 'production') {
    // 不使用mock
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}

;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options,
    })
  }
})

export default request
