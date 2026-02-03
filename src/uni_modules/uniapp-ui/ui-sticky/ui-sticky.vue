<template>
  <view :style="[rootStyle]">
    <view :id="stickyId" class="ui-sticky" :style="[stickyStyle]">
      <view class="ui-sticky__container" :style="[containerStyle]" :class="[customClass]">
        <ui-resize custom-style="display: inline-block;" @resize="handleResize">
          <slot />
        </ui-resize>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { stickyEmits, stickyProps } from "./index"
import { useRect, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, reactive, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-sticky" })

const props = defineProps(stickyProps)
const emits = defineEmits(stickyEmits)
// 唯一 ID
const stickyId = ref(`sticky-${uuid()}`)
const instance = getCurrentInstance()!

const stickyState = reactive({
  // 非吸顶时用 absolute，吸顶时用 fixed
  position: "absolute" as "absolute" | "fixed",
  top: 0,
  height: 0,
  width: 0,
  state: "" as "" | "sticky" | "normal",
})

// 观察器列表
const observerList = ref<UniApp.IntersectionObserver[]>([])

// 计算内部偏移量（H5 需要加上导航栏高度）
const innerOffsetTop = computed(() => {
  let top = 0
  // #ifdef H5
  // H5 端导航栏高度为 44px
  top = 44
  // #endif
  return top + Number(props.offsetTop || 0)
})

// 根容器样式 - 外层占位
const rootStyle = computed(() => {
  const style: CSSProperties = {
    display: "inline-block",
    position: "relative",
    zIndex: props.zIndex,
    width: stickyState.width ? `${stickyState.width}px` : undefined,
    height: stickyState.height ? `${stickyState.height}px` : undefined,
  }
  return useStyle(style)
})

// sticky 容器样式 - 保持占位
const stickyStyle = computed(() => {
  const style: CSSProperties = {
    position: "relative",
    zIndex: props.zIndex,
    width: stickyState.width ? `${stickyState.width}px` : undefined,
    height: stickyState.height ? `${stickyState.height}px` : undefined,
  }
  return useStyle(style)
})

// 内容容器样式 - 实际定位
const containerStyle = computed(() => {
  const style: CSSProperties = {
    position: stickyState.position,
    top: `${stickyState.top}px`,
    zIndex: props.zIndex,
  }

  // fixed 定位时需要设置 left/right
  if (stickyState.position === "fixed") {
    style.left = "0"
    style.right = "0"
  }

  if (props.background) {
    style.background = useColor(props.background)
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 判断是否吸顶
const isFixed = computed(() => stickyState.state === "sticky")

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      setNormalState()
      clearObserver()
    } else {
      observeScroll()
    }
  },
)

// 清除所有观察器
function clearObserver() {
  while (observerList.value.length > 0) {
    observerList.value.pop()?.disconnect()
  }
}

// 创建观察器
function createObserver() {
  const observer = uni.createIntersectionObserver(instance, {
    thresholds: [0, 0.5],
  })
  observerList.value.push(observer)
  return observer
}

// 处理位置变化
function handleRelativeTo(result: { boundingClientRect: { top: number; bottom: number } }) {
  if (props.disabled) {
    if (stickyState.state === "sticky") {
      setNormalState()
    }
    return
  }

  const { boundingClientRect } = result
  let shouldFix = boundingClientRect.top <= innerOffsetTop.value

  // #ifdef H5 || APP-PLUS
  shouldFix = boundingClientRect.top < innerOffsetTop.value
  // #endif

  if (shouldFix) {
    setStickyState()
  } else {
    setNormalState()
  }
}

function setStickyState() {
  if (stickyState.state === "sticky") return // 防止重复触发

  stickyState.state = "sticky"
  stickyState.position = "fixed"
  stickyState.top = innerOffsetTop.value

  emits("change", true)
  emits("scroll", { scrollTop: 0, isFixed: true })
}

function setNormalState() {
  if (stickyState.state === "normal") return // 防止重复触发

  stickyState.state = "normal"
  stickyState.position = "absolute"
  stickyState.top = 0

  emits("change", false)
  emits("scroll", { scrollTop: 0, isFixed: false })
}

async function observeScroll() {
  if (stickyState.height === 0 && stickyState.width === 0) return
  if (props.disabled) return

  const offset = innerOffsetTop.value + stickyState.height
  clearObserver()

  // 创建观察器监听元素与视口的交叉状态
  createObserver()
    .relativeToViewport({ top: -offset })
    .observe(`#${stickyId.value}`, (result) => {
      handleRelativeTo(result)
    })

  try {
    const rect = await useRect(`#${stickyId.value}`, instance)
    if (rect) {
      let bottom = rect.bottom ?? 0
      // #ifdef H5
      bottom = bottom + 44
      // #endif
      if (bottom <= offset) {
        handleRelativeTo({ boundingClientRect: { top: rect.top ?? 0, bottom } })
      }
    }
  } catch {
    // 忽略错误
  }
}

// 处理内容尺寸变化
async function handleResize(detail: { width: number; height: number }) {
  stickyState.width = detail.width
  stickyState.height = detail.height
  await nextTick()
  observeScroll()
}

// 手动重新计算
async function resize() {
  await nextTick()
  observeScroll()
}

onUnmounted(() => {
  clearObserver()
})

defineExpose({
  name: "ui-sticky",
  resize,
  isFixed: () => isFixed.value,
})
</script>

<script lang="ts">
export default {
  name: "ui-sticky",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-sticky {
  width: 100%;

  &__container {
    width: 100%;
  }
}
</style>
