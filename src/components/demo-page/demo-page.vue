<template>
  <view class="demo-page" :class="[customClass]" :style="[style]">
    <slot />
    <!-- 全局 Toast 组件，供 useToast() 使用 -->
    <ui-toast ref="toastRef" />
  </view>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ToastInstance } from "@/uni_modules/uniapp-ui/ui-toast"
import { provideToast } from "@/uni_modules/uniapp-ui/ui-toast"
import { useUnit, useStyle } from "@/uni_modules/uniapp-ui/hooks"
import { ref, computed, onMounted } from "vue"

const props = withDefaults(
  defineProps<{
    padding?: string | number
    customClass?: string
    customStyle?: string | Record<string, any>
  }>(),
  { padding: "24rpx" },
)

const style = computed(() => {
  const padding = useUnit(props.padding)
  const s: CSSProperties = {
    padding,
    paddingBottom: `calc(${padding} + env(safe-area-inset-bottom))`,
  }
  return useStyle({ ...s, ...useStyle(props.customStyle) })
})

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
  background: var(--ui-color-background-light);
  box-sizing: border-box;
  min-height: 100vh;
}
</style>
