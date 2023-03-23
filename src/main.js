import { createApp, nextTick } from 'vue'

import 'normalize.css' // a modern alternative to CSS resets
import '@/styles/index.scss' // 全局css

import App from './App.vue'
import { createPinia } from 'pinia' // pinia
import router from './router'

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Pagination from '@/components/Pagination/index.vue'

import settings from '@/settings' // 全局设置
import './permission' // 权限控制
import { isString, isArray } from '@/utils/validate'

import { useErrorLogStore } from '@/store/errorLog'

const app = createApp(App)

// 全局注册组件
app.component('SvgIcon', SvgIcon).component('Pagination', Pagination)

app.use(createPinia()).use(router).mount('#app')

const errorLogStore = useErrorLogStore()
const { errorLog: needErrorLog } = settings

/**
 * @method checkNeed 检查需要日志
 * @returns
 */
function checkNeed() {
  const env = import.meta.env.MODE
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  app.config.errorHandler = (err, vm, info) => {
    // 处理错误
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    nextTick(() => {
      errorLogStore.addErrorLog({
        err,
        vm,
        info,
        url: window.location.href,
      })
    })
  }
}
