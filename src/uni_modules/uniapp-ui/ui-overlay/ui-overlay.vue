<template>
  <view
    v-if="inited"
    class="ui-overlay"
    :class="[transition.classs.value, customClass]"
    :style="[style]"
    @click="onClick"
    @transitionend="transition.end"
    @touchmove.prevent.stop="noop"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { noop } from "../utils/utils"
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"
import { overlayEmits, overlayProps, useOverlayProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-overlay" })

// 定义props和emits
const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)
const useProps = useOverlayProps(props)
// 使用transition钩子
const transition = useTransition()

// 用于存储z-index值
const zIndex = ref<number>()

// 计算是否显示overlay
const inited = computed(() => !useProps.lazyRender || transition.inited.value)

// 为transition的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 计算overlay的样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "block" : "none"
  style.background = `rgba(0, 0, 0, ${useProps.opacity})`
  return useStyle({ ...style, ...useStyle(useProps.customStyle), ...transition.styles.value })
})

// 监听show属性变化,触发open或close方法
watch(
  () => useProps.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

// 监听duration属性变化,重新初始化transition
watch(() => [useProps.duration, useProps.enterTimingFunction, useProps.leaveTimingFunction], initTransition, { immediate: true })

// 初始化transition
function initTransition() {
  transition.init({
    name: "fade",
    duration: useProps.duration,
    enterTimingFunction: useProps.enterTimingFunction,
    leaveTimingFunction: useProps.leaveTimingFunction,
  })
}

// 打开overlay
function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(useProps.zIndex) ? +useProps.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 关闭overlay
function close() {
  if (transition.visible.value) {
    transition.leave()
    emits("update:show", false)
  }
}

// 处理点击事件
function onClick() {
  emits("click")
}

// 暴露open和close方法
defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-overlay",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}
</style>
