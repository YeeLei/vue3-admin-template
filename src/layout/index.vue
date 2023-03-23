<template>
  <component :is="layoutMode" />
</template>

<script setup>
import { computed } from 'vue'
import Default from '@/layout/default/index.vue'
import Classic from '@/layout/classic/index.vue'
import Streamline from '@/layout/streamline/index.vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const layoutEnum = {
  Default,
  Classic,
  Streamline,
}
const layoutMode = computed(() => layoutEnum[settingsStore.layoutMode])
</script>
