import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  }
  return true
}

/**
 * 通过递归筛选异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [],
      addRoutes: [],
    }
  },
  actions: {
    /**
     * @method generateRoutes 生成路由
     */
    generateRoutes(roles) {
      return new Promise((resolve) => {
        const accessedRoutes = roles.includes('admin') ? asyncRoutes || [] : filterAsyncRoutes(asyncRoutes, roles)
        this.addRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
  },
})
