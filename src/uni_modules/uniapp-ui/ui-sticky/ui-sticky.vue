<template>
  <view :id="stickyId" class="ui-sticky" :style="[placeholderStyle]">
    <view class="ui-sticky__container" :class="[customClass]" :style="[containerStyle]">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { stickyEmits, stickyProps } from "./index"
import { useRect, useColor, useStyle, useUnitToPx, useSystemInfo } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-sticky" })

const props = defineProps(stickyProps)
const emits = defineEmits(stickyEmits)

const instance = getCurrentInstance()!
const stickyId = `sticky-${uuid()}`

// 是否处于吸顶状态
const isSticky = ref(false)
// 元素自身布局
const rect = ref({ width: 0, height: 0 })
// 当前观察者
const observer = ref<UniApp.IntersectionObserver | null>(null)

// 吸顶 top 偏移（px）= 系统 navbar（windowTop 动态值；自定义 navbar 时 0）+ offsetTop
const offsetTopPx = computed(() => {
  const winTop = useSystemInfo().windowTop || 0
  return winTop + (useUnitToPx(props.offsetTop ?? 0) || 0)
})

// 占位元素样式：吸顶时保持高度避免布局塌陷
const placeholderStyle = computed(() => {
  const style: CSSProperties = { position: "relative" }
  if (rect.value.width) style.width = `${rect.value.width}px`
  if (rect.value.height) style.height = `${rect.value.height}px`
  if (props.zIndex !== undefined) style.zIndex = props.zIndex as number | string
  return useStyle(style)
})

// 实际定位容器
const containerStyle = computed(() => {
  const style: CSSProperties = {}
  if (isSticky.value) {
    style.position = "fixed"
    style.left = "0"
    style.right = "0"
    style.top = `${offsetTopPx.value}px`
  } else {
    style.position = "relative"
    style.top = "0"
  }
  if (props.zIndex !== undefined) style.zIndex = props.zIndex as number | string
  if (props.background) style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      setSticky(false)
      clearObserver()
    } else {
      observe()
    }
  },
)

function setSticky(next: boolean) {
  if (isSticky.value === next) return
  isSticky.value = next
  emits("change", next)
  emits("scroll", { scrollTop: 0, isFixed: next })
}

function clearObserver() {
  observer.value?.disconnect()
  observer.value = null
}

async function measure() {
  try {
    const r = await useRect(`#${stickyId}`, instance)
    if (r?.width) rect.value = { width: r.width, height: r.height || 0 }
  } catch (err) {
    console.warn("[ui-sticky] measure failed", err)
  }
}

// 创建 IntersectionObserver 监听元素到达视口顶部线
async function observe() {
  if (props.disabled) return
  await measure()
  if (!rect.value.height) return

  clearObserver()
  // relativeToViewport({ top: -(offsetTop + height) }) → 元素完全划出顶部线时吸顶切换
  const ob = uni.createIntersectionObserver(instance, { thresholds: [0] })
  ob.relativeToViewport({ top: -(offsetTopPx.value + rect.value.height) }).observe(`#${stickyId}`, (result) => {
    if (props.disabled) return
    setSticky((result.boundingClientRect?.top ?? 0) < offsetTopPx.value)
  })
  observer.value = ob

  // mount 后即时校正一次（避免初始位置已超出顶部线）
  const r = await useRect(`#${stickyId}`, instance).catch(() => null)
  if (r && typeof r.top === "number") {
    setSticky(r.top < offsetTopPx.value)
  }
}

// 手动重新测量与观察（外部尺寸变化时调用）
async function resize() {
  await nextTick()
  observe()
}

onMounted(observe)
onUnmounted(clearObserver)

defineExpose({
  name: "ui-sticky",
  resize,
  isFixed: () => isSticky.value && !props.disabled,
})
</script>

<script lang="ts">
export default {
  name: "ui-sticky",
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
.ui-sticky {
  width: 100%;

  &__container {
    width: 100%;
  }
}
</style>
