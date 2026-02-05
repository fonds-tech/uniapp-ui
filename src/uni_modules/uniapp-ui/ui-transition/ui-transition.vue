<template>
  <view v-if="inited" class="ui-transition" :class="[transition.classs.value, props.customClass]" :style="[style]" @transitionend="onTransitionEnd" @click="onClick">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { transitionEmits, transitionProps } from "./index"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-transition" })

const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)

// 过渡动画 hook
const transition = useTransition()
// z-index 值
const zIndex = ref<number>()

// 是否已初始化
const inited = computed(() => !props.lazyRender || transition.inited.value)
// 根节点样式
const style = computed(() => {
  const baseStyle: Record<string, any> = {
    zIndex: zIndex.value,
    display: transition.visible.value ? "block" : "none",
  }

  return useStyle({
    ...baseStyle,
    ...useStyle(props.customStyle),
    ...transition.styles.value,
  })
})

// 过渡事件绑定
transition.on("enter", () => emits("enter"))
transition.on("leave", () => emits("leave"))
transition.on("before-enter", () => emits("beforeEnter"))
transition.on("after-enter", () => emits("afterEnter"))
transition.on("before-leave", () => emits("beforeLeave"))
transition.on("after-leave", () => emits("afterLeave"))

// 监听 show 变化
watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  { immediate: true },
)
// 监听动画相关属性变化
watch(() => [props.name, props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

// 初始化过渡动画
function initTransition() {
  transition.init({
    name: props.name,
    duration: props.duration,
    enterTimingFunction: props.enterTimingFunction,
    leaveTimingFunction: props.leaveTimingFunction,
  })
}

// 进入过渡
function enter() {
  initTransition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 离开过渡
function leave() {
  transition.leave()
  emits("update:show", false)
}

// transitionend 事件处理
function onTransitionEnd(event: Event) {
  if (event.target === event.currentTarget) {
    transition.end()
  }
}

// 点击事件
function onClick() {
  emits("click")
}

defineExpose({ enter, leave })
</script>

<script lang="ts">
export default {
  name: "ui-transition",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
@use "../styles/animation.scss";
.ui-transition {
  position: relative;
}
</style>
