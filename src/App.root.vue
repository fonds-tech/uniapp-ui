<template>
  <ui-config-provider height="100%" background="#F3F4F5" :theme-vars="themeVars" :css-vars="cssVars">
    <root-view />
    <ui-toast ref="toastRef" />
  </ui-config-provider>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/ui/ui-toast"
import { provideToast } from "@/ui/ui-toast"
import { ref, onMounted } from "vue"

// 全局 Toast 实例
const toastRef = ref<ToastInstance | null>(null)

const cssVars = ref({
  "--ui-main-color": "#212121",
  "--ui-secondary-color": "#6A6A6A",
})

const themeVars = ref({ primary: "#165DFF" })

onShow(() => {})

// 需要在 onMounted 中调用，确保组件已挂载
onMounted(() => {
  provideToast(toastRef)
})
</script>
