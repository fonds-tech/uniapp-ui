<template>
  <view class="demo-page" :class="[customClass]" :style="[style]">
    <slot />

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
    height?: string | number
    padding?: string | number
    paddingX?: string | number
    paddingY?: string | number
    customClass?: string
    customStyle?: string | Record<string, any>
  }>(),
  { padding: "24rpx" },
)

const style = computed(() => {
  const height = props.height !== undefined ? useUnit(props.height) : ""
  const padding = useUnit(props.padding)
  const paddingX = props.paddingX !== undefined ? useUnit(props.paddingX) : padding
  const paddingY = props.paddingY !== undefined ? useUnit(props.paddingY) : padding
  const s: CSSProperties = {
    height,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
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
  background: var(--ui-color-background-page);
  box-sizing: border-box;
}
</style>
