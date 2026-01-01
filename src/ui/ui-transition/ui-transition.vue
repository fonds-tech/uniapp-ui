<template>
  <view v-if="inited" class="ui-transition" :class="[transition.classs.value, customClass]" :style="[style]" @transitionend="transition.end" @click="onClick">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { isNumber } from "../utils/check"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"
import { transitionEmits, transitionProps, useTransitionProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-transition" })

// 定义props和emits
const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)
const useProps = useTransitionProps(props)
const transition = useTransition() // 使用transition钩子

const zIndex = ref<number>() // 用于存储z-index值
const inited = computed(() => !useProps.lazyRender || transition.inited.value)

// 为transition的各个阶段绑定事件
transition.on("enter", () => emits("enter"))
transition.on("leave", () => emits("leave"))
transition.on("before-enter", () => emits("beforeEnter"))
transition.on("after-enter", () => emits("afterEnter"))
transition.on("before-leave", () => emits("beforeLeave"))
transition.on("after-leave", () => emits("afterLeave"))

// 计算属性: 组合最终的样式对象
const style = computed(() => {
  const style: any = {}
  style.zIndex = zIndex.value
  style.display = transition.visible.value ? "block" : "none"
  return useStyle({ ...style, ...useStyle(useProps.customStyle), ...transition.styles.value })
})

// 监听visible的变化,触发enter或leave过渡
watch(
  () => useProps.show,
  (val) => {
    val ? enter() : leave()
  },
  { immediate: true },
)

// 监听props的变化,重新初始化transition
watch(() => [useProps.name, useProps.duration, useProps.enterTimingFunction, useProps.leaveTimingFunction], initTransition, { immediate: true })

// 初始化transition
function initTransition() {
  transition.init({
    name: useProps.name,
    duration: useProps.duration,
    enterTimingFunction: useProps.enterTimingFunction,
    leaveTimingFunction: useProps.leaveTimingFunction,
  })
}

// 进入过渡
function enter() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(useProps.zIndex) ? +useProps.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 离开过渡
function leave() {
  if (transition.visible.value) {
    transition.leave()
    emits("update:show", false)
  }
}

// 点击事件处理
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

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-transition {
  position: relative;
}
</style>
