<template>
  <ui-transition :show="visible" :name="useProps.transition" :custom-style="transitionStyle">
    <view class="ui-back-top" hover-class="ui-back-top--hover" :hover-stay-time="100" :class="[customClass]" :style="[style]" @click="onClick">
      <slot>
        <view class="ui-back-top__content" :style="contentStyle">
          <ui-icon :name="useProps.icon" :size="useProps.iconSize" :color="useProps.iconColor" :weight="useProps.iconWeight" />
          <text v-if="useProps.text" class="ui-back-top__text" :style="textStyle">{{ useProps.text }}</text>
        </view>
      </slot>
    </view>
  </ui-transition>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { backTopEmits, backTopProps, useBackTopProps } from "./index"
import { useMitt, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue"

// ===================== Props/Emits =====================
const props = defineProps(backTopProps)
const emits = defineEmits(backTopEmits)
const useProps = useBackTopProps(props)

// ===================== 响应式状态 =====================
const mitt = useMitt()
const innerScrollTop = ref(0)
let bindRoute = ""

// ===================== 计算属性 =====================
const useExternalScrollTop = computed(() => isDef(useProps.scrollTop))

const currentScrollTop = computed(() => (useExternalScrollTop.value ? Number(useProps.scrollTop) : innerScrollTop.value))

const visible = computed(() => {
  const offset = useUnitToPx(useProps.offset)
  return currentScrollTop.value >= offset
})

// 传递给 ui-transition 的样式（fixed 定位相关）
const transitionStyle = computed(() => {
  const style: CSSProperties = {}
  style.position = "fixed"
  style.zIndex = useProps.zIndex
  style.right = useUnit(useProps.right)
  style.bottom = useUnit(useProps.bottom)
  return useStyle(style)
})

const style = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.borderRadius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(useProps.width) || useUnit(useProps.size)
  style.height = useUnit(useProps.height) || useUnit(useProps.size)
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.textColor)
  style.fontSize = useUnit(useProps.textSize)
  if (useProps.textWeight) style.fontWeight = useProps.textWeight
  return useStyle(style)
})

// ===================== 侦听器 =====================
watch(useExternalScrollTop, (useExternal) => {
  if (useExternal) {
    clearAutoListener()
  } else {
    nextTick(initAutoListener)
  }
})

// ===================== 生命周期 =====================
onMounted(() => {
  nextTick(initAutoListener)
})

onUnmounted(() => {
  clearAutoListener()
})

// ===================== 方法 =====================
function handleScroll(options: { scrollTop: number }) {
  innerScrollTop.value = options.scrollTop
}

function getCurrentRoute() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]?.route || ""
}

function initAutoListener() {
  if (useExternalScrollTop.value || bindRoute) return

  bindRoute = getCurrentRoute()
  if (bindRoute) {
    mitt.on(`scroll:${bindRoute}`, handleScroll)
  }
}

function clearAutoListener() {
  if (bindRoute) {
    mitt.off(`scroll:${bindRoute}`, handleScroll)
    bindRoute = ""
  }
}

function onClick() {
  uni.pageScrollTo({ scrollTop: 0, duration: +useProps.duration })
  emits("click")
}
</script>

<script lang="ts">
export default {
  name: "ui-back-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-back-top {
  display: flex;
  border-radius: var(--ui-radius-round);
  background-color: var(--ui-color-primary);

  &--hover {
    opacity: var(--ui-opacity-active);
  }

  &__content {
    display: flex;
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-round);
    flex-direction: column;
    justify-content: center;
  }

  &__text {
    line-height: 1.2;
  }
}
</style>
