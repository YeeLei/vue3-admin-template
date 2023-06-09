<template>
  <div :class="{ show: show }" class="search-container" @click.stop="click">
    <svg-icon class="search" name="search" />
    <el-select
      ref="refHeaderSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      size="default"
      class="search-container-select"
      value-key="path"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'
import path from 'path-browserify'
import { reactive, toRefs, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/permission'

const router = useRouter()

const state = reactive({
  search: '',
  options: [],
  searchPool: [],
  show: false,
  fuse: undefined,
  refHeaderSearchSelect: null,
})

const { search, options, show, refHeaderSearchSelect } = toRefs(state)

const permissionStore = usePermissionStore()
const routes = computed(() => permissionStore.routes)

const click = () => {
  state.show = !state.show
  if (state.show) {
    state.refHeaderSearchSelect && state.refHeaderSearchSelect.focus()
  }
}

const close = () => {
  state.refHeaderSearchSelect && state.refHeaderSearchSelect.blur()
  state.options = []
  state.show = false
}

const change = (val) => {
  router.push(val.path)
  state.search = ''
  state.options = []
  nextTick(() => {
    state.show = false
  })
}

const initFuse = (list) => {
  state.fuse = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7,
      },
      {
        name: 'path',
        weight: 0.3,
      },
    ],
  })
}

// 筛选出可以在侧边栏中显示的路线, 并生成国际化标题
const generateRoutes = (routesList, basePath = '/', prefixTitle = []) => {
  let res = []

  for (const routeItem of routesList) {
    // 跳过隐藏的路线项目
    if (routeItem.hidden) {
      continue
    }

    const data = {
      path: path.resolve(basePath, routeItem.path),
      title: [...prefixTitle],
    }

    if (routeItem.meta && routeItem.meta.title) {
      data.title = [...data.title, routeItem.meta.title]

      if (routeItem.redirect !== 'noRedirect') {
        // 只推送有标题的路线列表
        // 特殊情况：需要排除父路由项而不重定向
        res.push(data)
      }
    }

    // 递归子路由列表
    if (routeItem.children) {
      const tempRoutes = generateRoutes(routeItem.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

const querySearch = (query) => {
  if (query !== '') {
    state.options = state.fuse.search(query).map((item) => item.item)
  } else {
    state.options = []
  }
}

watch(
  routes,
  () => {
    state.searchPool = generateRoutes(routes.value)
  },
  {
    immediate: true,
  },
)

watch(
  () => state.searchPool,
  (newValue) => {
    initFuse(newValue)
  },
  { immediate: true },
)

watch(
  () => state.show,
  (newValue) => {
    if (newValue) {
      document.body.addEventListener('click', close)
    } else {
      document.body.removeEventListener('click', close)
    }
  },
)
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  transition: background 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }

  .search {
    font-size: 18px;
    color: #5a5e66;
  }

  .search-container-select {
    font-size: 18px;
    transition: width 0.3s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }

  &.show {
    &:hover {
      background: transparent;
    }

    .search-container-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>

<style lang="scss">
.search-container-select {
  .el-input__wrapper {
    box-shadow: none !important;
  }

  .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
  }

  .el-input__wrapper.is-focus {
    box-shadow: none !important;
  }

  .el-input__inner {
    border-radius: 0;
    border: 0;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }
}
</style>
