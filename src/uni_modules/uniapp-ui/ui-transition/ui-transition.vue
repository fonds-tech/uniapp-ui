<template>
  <view v-if="inited" class="ui-transition" :class="[transition.classs.value, props.customClass]" :style="[rootStyle]" @transitionend="onTransitionEnd" @click="onClick">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { transitionEmits, transitionProps } from "./index"
import { useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-transition" })

const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)

const transition = useTransition()
// z-index
const zIndex = ref<number>()

// 是否已初始化挂载
const inited = computed(() => !props.lazyRender || transition.inited.value)
// 根节点样式
const rootStyle = computed(() => {
  const base: CSSProperties = {
    zIndex: zIndex.value,
    display: transition.visible.value ? "block" : "none",
  }
  return useStyle({
    ...base,
    ...useStyle(props.customStyle),
    ...transition.styles.value,
  })
})

// 过渡事件转发
transition.on("enter", () => emits("enter"))
transition.on("leave", () => emits("leave"))
transition.on("before-enter", () => emits("beforeEnter"))
transition.on("after-enter", () => emits("afterEnter"))
transition.on("before-leave", () => emits("beforeLeave"))
transition.on("after-leave", () => emits("afterLeave"))

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

// 进入
function enter() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 离开
function leave() {
  if (!transition.visible.value) return
  transition.leave()
  emits("update:show", false)
}

// transitionend 兜底
function onTransitionEnd(event: Event) {
  if (event.target === event.currentTarget) transition.end()
}

// 点击
function onClick() {
  emits("click")
}

defineExpose({ enter, leave })
</script>

<script lang="ts">
export default {
  name: "ui-transition",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
@use "../styles/animation.scss";

.ui-transition {
  position: relative;
}
</style>
