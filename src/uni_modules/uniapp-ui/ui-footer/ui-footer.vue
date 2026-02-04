<template>
  <view class="ui-footer">
    <view class="ui-footer__inner" :style="[style]" :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
      <ui-resize width="100%" @resize="resize">
        <slot />
      </ui-resize>
    </view>
    <view class="ui-footer__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { footerEmits, footerProps } from "./index"
import { ref, computed, nextTick, onMounted, getCurrentInstance } from "vue"
import { useMitt, useRect, useColor, useStyle, usePxToRpx, useUnitToPx } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-footer" })

// 定义 props 和 emits
const props = defineProps(footerProps)
const emits = defineEmits(footerEmits)

// 事件总线
const mitt = useMitt()
// 组件位置信息
const rect = ref<UniApp.NodeInfo>({ height: 0 })
// tabbar 高度
const tabbarHeight = ref(0)
// 组件实例
const instance = getCurrentInstance()

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.position = "fixed"
  style.zIndex = props.zIndex
  style.bottom = `${tabbarHeight.value + useUnitToPx(props.offset)}px`
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 占位区样式
const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${usePxToRpx(rect.value.height)}rpx`
  return useStyle(style)
})

// 初始化事件监听
function onEvent() {
  mitt.on("ui-tabbar:rect", (rect: UniApp.NodeInfo) => {
    if (rect) tabbarHeight.value = rect.height
  })
}

// 重新计算尺寸
async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-footer__inner", instance)
  emits("rect", rect.value)
  emits("height", rect.value.height)
  mitt.emit("ui-tabbar:rect:get", (rect: UniApp.NodeInfo) => {
    if (rect) tabbarHeight.value = rect.height
  })
}

// 初始化
onEvent()
onMounted(resize)

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-footer",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-footer {
  z-index: 100;
  position: relative;
  margin-top: auto;

  &__inner {
    left: 0;
    width: 100%;
    background-color: var(--ui-color-text-inverse);
  }
}
</style>
