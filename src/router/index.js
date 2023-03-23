import { createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/* Router Modules */
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu 仅在路由时显示 children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不设置alwaysShow，当项目有多个子路由时，它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置为noRedirect，则面包屑中将不会重定向
 * name:'router-name'             该名称由＜keep-alive＞使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'/'el-icon-x' 侧边栏中显示的图标
    noCache: true                如果设置为true，则不会缓存页面（默认值为false）
    affix: true                  如果设置为true，则标签将粘贴在标签视图中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  nestedRouter,
]

/**
 * asyncRoutes
 * 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。
 */
export const asyncRoutes = [
  {
    path: '/chat',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/chat/index.vue'),
        name: 'Chat',
        meta: {
          title: 'Chat',
          icon: 'icon',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index.vue'),
        name: 'Clipboard',
        meta: {
          title: 'Clipboard',
          icon: 'icon',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/markdown',
    component: Layout,
    redirect: '/markdown/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/markdown/index.vue'),
        name: 'Markdown',
        meta: {
          title: 'Markdown',
          icon: 'icon',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    meta: {
      title: 'Excel',
      icon: 'icon',
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel.vue'),
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel',
        },
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel.vue'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' },
      },
      {
        path: 'merge-header',
        component: () => import('@/views/excel/merge-header.vue'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' },
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel.vue'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' },
      },
    ],
  },
  {
    path: '/dom-to-image',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dom-to-image/index.vue'),
        name: 'DomToImage',
        meta: {
          title: 'DomToImage',
          icon: 'icon',
          roles: ['admin'],
        },
      },
    ],
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/zhihuifanqiechaodan/vue3-admin-template',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '/:pathchMatch(.*)', redirect: '/404' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

// 重置路由为静态路由
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && asyncRoutes.find((item) => item.name === name)) {
      router.removeRoute(name)
    }
  })
}

export default router
