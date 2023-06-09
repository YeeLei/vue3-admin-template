<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title
        }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { watch, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const state = reactive({
  levelList: null,
})

// 面包屑list
const { levelList } = toRefs(state)

const router = useRouter()

const route = useRoute()

const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const getBreadcrumb = () => {
  // 仅显示具有meta.title的路线
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
  }

  state.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const pathCompile = (path) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

// 跳转路由
const handleLink = (item) => {
  const { redirect, path } = item

  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

getBreadcrumb()

// 路由变化时，重新计算
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
)
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  white-space: nowrap;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  a {
    font-weight: normal;
  }
}
</style>
