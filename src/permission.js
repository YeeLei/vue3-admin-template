import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import router from './router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from './utils/storage' // get token from cookie
import usePageTitle from '@/hooks/usePageTitle'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // 无重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // 设置页面标题
  document.title = usePageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()

  const userStore = useUserStore()

  const permissionStore = usePermissionStore()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户详情
          // note: 角色必须是对象数组！例如: ['admin'] or ['developer','editor']
          const { roles } = await userStore.getInfo()

          // 基于角色生成可访问路由表
          const accessRoutes = await permissionStore.generateRoutes(roles)

          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })

          // hack method to ensure that addRoutes is complete
          // 设置replace:true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token，并转到登录页面重新登录
          await userStore.resetToken()
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页面将重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
