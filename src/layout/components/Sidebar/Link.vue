<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal as utilsIsExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

// 是否外部链接
const isExternal = computed(() => utilsIsExternal(props.to))

// 标签类型
const type = computed(() => (isExternal.value ? 'a' : 'router-link'))

// 标签属性
const linkProps = () => {
  if (isExternal.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return {
    to: props.to,
  }
}
</script>
