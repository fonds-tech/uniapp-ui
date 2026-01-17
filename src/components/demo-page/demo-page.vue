<template>
  <view class="demo-page" :class="[customClass]" :style="[customStyle]">
    <slot />
    <!-- 全局 Toast 组件，供 useToast() 使用 -->
    <ui-toast ref="toastRef" />
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import type { ToastInstance } from "@/uni_modules/uniapp-ui/ui-toast"
import { provideToast } from "@/uni_modules/uniapp-ui/ui-toast"
import { ref, onMounted } from "vue"

defineProps<{
  customClass?: string
  customStyle?: string | Record<string, any>
}>()

// Toast 组件实例引用
const toastRef = ref<ToastInstance | null>(null)

// 注册全局 Toast 实例
onMounted(() => {
  provideToast(toastRef)
})
</script>

<script lang="ts">
export default {
  name: "demo-page",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.demo-page {
  padding: 24rpx;
  background: var(--ui-color-background-light);
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
