<template>
  <div v-loading="loading" class="dashboard-container">
    <markdown-editor v-model:value="value" :options="options" />
  </div>
</template>

<script setup name="Dashboard">
import { onMounted, reactive, toRefs } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'

const state = reactive({
  loading: false,
  value: '',
  options: {
    initialEditType: 'wysiwyg',
    height: '80vh',
  },
})

const { loading, value, options } = toRefs(state)

onMounted(() => {})
</script>

<style lang="scss">
.dashboard-container {
  margin: 20px;
  background-color: #fff;
  padding: 20px;
}
</style>
