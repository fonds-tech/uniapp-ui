<template>
  <view v-if="inited" class="ui-transition" :class="[transition.classs.value, customClass]" :style="[style]" @transitionend="onTransitionEnd" @click="onClick">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { transitionEmits, transitionProps } from "./index"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-transition" })

// 定义 props 和 emits
const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)
const transition = useTransition()

const zIndex = ref<number>()
const inited = computed(() => !props.lazyRender || transition.inited.value)

transition.on("enter", () => emits("enter"))
transition.on("leave", () => emits("leave"))
transition.on("before-enter", () => emits("beforeEnter"))
transition.on("after-enter", () => emits("afterEnter"))
transition.on("before-leave", () => emits("beforeLeave"))
transition.on("after-leave", () => emits("afterLeave"))

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

// 监听 show 变化，触发进入或离开过渡
watch(
  () => props.show,
  (val) => {
    val ? enter() : leave()
  },
  { immediate: true },
)

watch(() => [props.name, props.duration, props.enterTimingFunction, props.leaveTimingFunction], initTransition, { immediate: true })

function initTransition() {
  transition.init({
    name: props.name,
    duration: props.duration,
    enterTimingFunction: props.enterTimingFunction,
    leaveTimingFunction: props.leaveTimingFunction,
  })
}

// 进入过渡
// 移除 visible 检查，允许从任何状态（包括离开中）切换到进入状态
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
  // 只处理当前元素的事件，忽略子元素冒泡
  if (event.target === event.currentTarget) {
    transition.end()
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

<style lang="scss">
@use "../styles/animation.scss";
.ui-transition {
  position: relative;
}
</style>
