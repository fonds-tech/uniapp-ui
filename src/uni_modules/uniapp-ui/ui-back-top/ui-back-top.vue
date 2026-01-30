<template>
  <ui-transition :show="visible" :name="props.transition" :custom-style="transitionStyle">
    <view class="ui-back-top" hover-class="ui-back-top--hover" :hover-stay-time="100" :class="[customClass]" :style="[style]" @click="onClick">
      <slot>
        <view class="ui-back-top__content" :style="contentStyle">
          <ui-icon :name="props.icon" :size="props.iconSize" :color="props.iconColor" :weight="props.iconWeight" />
          <text v-if="props.text" class="ui-back-top__text" :style="textStyle">{{ props.text }}</text>
        </view>
      </slot>
    </view>
  </ui-transition>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { backTopEmits, backTopProps } from "./index"
import { useMitt, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue"

const props = defineProps(backTopProps)
const emits = defineEmits(backTopEmits)
const mitt = useMitt()
const innerScrollTop = ref(0)
let bindRoute = ""

const useExternalScrollTop = computed(() => isDef(props.scrollTop))

const currentScrollTop = computed(() => (useExternalScrollTop.value ? Number(props.scrollTop) : innerScrollTop.value))

const visible = computed(() => {
  const offset = useUnitToPx(props.offset)
  return currentScrollTop.value >= offset
})

// 传递给 ui-transition 的样式（fixed 定位相关）
const transitionStyle = computed(() => {
  const style: CSSProperties = {}
  style.position = "fixed"
  style.zIndex = props.zIndex
  style.right = useUnit(props.right)
  style.bottom = useUnit(props.bottom)
  return useStyle(style)
})

const style = computed(() => {
  const style: CSSProperties = {}
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width) || useUnit(props.size)
  style.height = useUnit(props.height) || useUnit(props.size)
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

watch(useExternalScrollTop, (useExternal) => {
  if (useExternal) {
    clearAutoListener()
  } else {
    nextTick(initAutoListener)
  }
})

onMounted(() => {
  nextTick(initAutoListener)
})

onUnmounted(() => {
  clearAutoListener()
})

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
  uni.pageScrollTo({ scrollTop: 0, duration: +props.duration })
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
