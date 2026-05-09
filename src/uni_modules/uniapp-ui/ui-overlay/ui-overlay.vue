<template>
  <view
    v-if="inited"
    class="ui-overlay"
    :class="[transition.classs.value, props.customClass]"
    :style="[rootStyle]"
    @click="onClick"
    @transitionend="transition.end"
    @touchmove.prevent.stop="() => {}"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { isNumber } from "../utils/check"
import { ref, watch, computed } from "vue"
import { overlayEmits, overlayProps } from "./index"
import { useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-overlay" })

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)

const transition = useTransition()
const zIndex = ref<number>()

const inited = computed(() => !props.lazyRender || transition.inited.value)
// 根节点样式：CSS var 注入 + 动态显隐
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  vars["--ui-overlay-opacity"] = String(props.opacity)
  if (props.background) vars["--ui-overlay-background"] = useColor(props.background)
  if (zIndex.value !== undefined) vars["--ui-overlay-z-index"] = String(zIndex.value)
  return useStyle({
    ...vars,
    display: transition.visible.value ? "block" : "none",
    ...useStyle(props.customStyle),
    ...transition.styles.value,
  })
})

transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

watch(
  () => props.show,
  (val) => (val ? open() : close()),
  { immediate: true },
)
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

// 打开
function open() {
  if (transition.visible.value) return
  initTransition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  transition.enter()
  emits("update:show", true)
}

// 关闭
function close() {
  if (transition.visible.value) {
    transition.leave()
    emits("update:show", false)
  }
}

function onClick() {
  emits("click")
}

defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-overlay",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-overlay {
  --ui-overlay-opacity: 0.7;
  --ui-overlay-background: rgba(0, 0, 0, var(--ui-overlay-opacity));

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--ui-overlay-z-index);
  position: fixed;
  background: var(--ui-overlay-background);
}
</style>
