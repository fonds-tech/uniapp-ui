<template>
  <ui-transition :show="visible" name="fade">
    <view class="ui-back-top" hover-class="ui-back-top--hover" :hover-stay-time="100" :class="[customClass]" :style="[style]" @click="onClick">
      <slot>
        <view class="ui-back-top__content">
          <ui-icon :name="useProps.icon" :size="useProps.iconSize" :color="useProps.iconColor" :weight="useProps.iconWeight" />
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

const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  style.right = useUnit(useProps.right)
  style.bottom = useUnit(useProps.bottom)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.borderRadius)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
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
  right: var(--ui-spacing-xl);
  bottom: 200rpx;
  display: flex;
  position: fixed;
  border-radius: var(--ui-radius-round);
  background-color: var(--ui-color-primary);

  &--hover {
    opacity: var(--ui-opacity-active);
  }

  &__content {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }
}
</style>
