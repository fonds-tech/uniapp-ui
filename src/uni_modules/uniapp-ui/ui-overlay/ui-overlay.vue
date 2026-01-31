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
import { overlayEmits, overlayProps } from "./index"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-overlay" })

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)

// 过渡动画 hook
const transition = useTransition()
// z-index 值
const zIndex = ref<number>()

// 是否已初始化
const inited = computed(() => !props.lazyRender || transition.inited.value)
// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "block" : "none"
  style.background = `rgba(0, 0, 0, ${props.opacity})`
  return useStyle({ ...style, ...useStyle(props.customStyle), ...transition.styles.value })
})

// 过渡事件绑定
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 监听 show 变化
watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)
// 监听动画相关属性变化
watch(() => [props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

// 初始化过渡动画
function initTransition() {
  transition.init({
    name: "fade",
    duration: props.duration,
    enterTimingFunction: props.enterTimingFunction,
    leaveTimingFunction: props.leaveTimingFunction,
  })
}

// 打开遮罩层
function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 关闭遮罩层
function close() {
  if (transition.visible.value) {
    transition.leave()
    emits("update:show", false)
  }
}

// 点击事件
function onClick() {
  emits("click")
}

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
