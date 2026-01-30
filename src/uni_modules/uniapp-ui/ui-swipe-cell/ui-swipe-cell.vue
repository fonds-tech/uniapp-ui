<template>
  <view class="ui-swipe-cell" :class="[customClass]" :style="[rootStyle]" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view ref="leftRef" class="ui-swipe-cell__left" @click="onLeftClick">
      <slot name="left" />
    </view>

    <view class="ui-swipe-cell__wrapper" :style="[wrapperStyle]" @click="onCellClick">
      <slot />
    </view>

    <view ref="rightRef" class="ui-swipe-cell__right" @click="onRightClick">
      <slot name="right" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SwipeCellPosition } from "./index"
import { isDef } from "../utils/check"
import { useRect, useStyle } from "../hooks"
import { swipeCellEmits, swipeCellProps } from "./index"
import { ref, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-swipe-cell" })

// 定义 props 和 emits
const props = defineProps(swipeCellProps)
const emits = defineEmits(swipeCellEmits)
// 获取组件实例
const instance = getCurrentInstance()

// 状态管理
const offset = ref(0) // 当前偏移量
const dragging = ref(false) // 是否正在拖动
const opened = ref(false) // 是否已打开
const position = ref<SwipeCellPosition>("") // 当前打开位置
const lockClick = ref(false) // 防止点击事件

// 触摸状态
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchDeltaX = ref(0)
const touchDeltaY = ref(0)
const touchStartOffset = ref(0)
const isVerticalScroll = ref(false)

// 左右侧区域宽度
const leftWidth = ref(0)
const rightWidth = ref(0)

// 根样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 包装器样式
const wrapperStyle = computed(() => {
  const style: CSSProperties = {
    transform: `translateX(${offset.value}px)`,
    transitionDuration: dragging.value ? "0s" : "0.3s",
  }
  return style
})

// 获取左右区域宽度
async function getLeftWidth(): Promise<number> {
  // 优先使用用户设置的宽度
  if (props.leftWidth && Number(props.leftWidth) > 0) {
    return Number(props.leftWidth)
  }
  // 自动计算插槽宽度
  if (!instance) return 0
  try {
    const rect = await useRect(".ui-swipe-cell__left", instance)
    return rect?.width || 0
  } catch {
    return 0
  }
}

async function getRightWidth(): Promise<number> {
  // 优先使用用户设置的宽度
  if (props.rightWidth && Number(props.rightWidth) > 0) {
    return Number(props.rightWidth)
  }
  // 自动计算插槽宽度
  if (!instance) return 0
  try {
    const rect = await useRect(".ui-swipe-cell__right", instance)
    return rect?.width || 0
  } catch {
    return 0
  }
}

// 初始化宽度
async function initWidths() {
  leftWidth.value = await getLeftWidth()
  rightWidth.value = await getRightWidth()
}

// 触摸开始
function onTouchStart(event: TouchEvent) {
  if (props.disabled) return

  // 重置状态
  isVerticalScroll.value = false
  dragging.value = true
  lockClick.value = false
  touchStartOffset.value = offset.value

  const touch = event.touches[0]
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  touchDeltaX.value = 0
  touchDeltaY.value = 0

  // 初始化宽度
  initWidths()
}

// 触摸移动
function onTouchMove(event: TouchEvent) {
  if (props.disabled || isVerticalScroll.value) return

  const touch = event.touches[0]
  touchDeltaX.value = touch.clientX - touchStartX.value
  touchDeltaY.value = touch.clientY - touchStartY.value

  // 判断是否为垂直滚动
  const absX = Math.abs(touchDeltaX.value)
  const absY = Math.abs(touchDeltaY.value)

  // 首次移动时判断方向
  if (!dragging.value) return

  if (absY > absX && absY > 10) {
    isVerticalScroll.value = true
    dragging.value = false
    return
  }

  // 阻止事件冒泡
  if (props.stopPropagation && absX > 10) {
    event.stopPropagation()
  }

  // 计算偏移量
  const newOffset = touchStartOffset.value + touchDeltaX.value

  // 限制偏移范围
  if (newOffset > 0) {
    // 向右滑动，显示左侧内容
    offset.value = Math.min(newOffset, leftWidth.value)
  } else {
    // 向左滑动，显示右侧内容
    offset.value = Math.max(newOffset, -rightWidth.value)
  }

  // 标记发生了滑动，需要锁定点击
  if (absX > 10) {
    lockClick.value = true
  }
}

// 触摸结束
function onTouchEnd() {
  if (props.disabled) return

  dragging.value = false

  const threshold = Number(props.threshold)
  const absOffset = Math.abs(offset.value)

  // 根据偏移量和阈值判断是否打开
  if (offset.value > 0) {
    // 向右滑动
    if (absOffset > leftWidth.value * threshold) {
      open("left")
    } else {
      close()
    }
  } else if (offset.value < 0) {
    // 向左滑动
    if (absOffset > rightWidth.value * threshold) {
      open("right")
    } else {
      close()
    }
  }

  // 延迟解除点击锁定
  setTimeout(() => {
    lockClick.value = false
  }, 0)
}

// 打开指定位置
async function open(pos: SwipeCellPosition) {
  if (!pos) return

  const targetOffset = pos === "left" ? leftWidth.value : -rightWidth.value

  // 更新状态
  offset.value = targetOffset
  position.value = pos

  if (!opened.value || position.value !== pos) {
    opened.value = true
    emits("open", {
      name: isDef(props.name) ? props.name : "",
      position: pos,
    })
  }
}

// 关闭
async function close(callBeforeClose = true) {
  // 如果当前已关闭，直接返回
  if (!opened.value && offset.value === 0) return

  const currentPosition = position.value

  // 调用关闭前回调
  if (callBeforeClose && props.beforeClose) {
    const result = await props.beforeClose({
      position: currentPosition,
      close: () => close(false),
    })

    // 如果返回 false，阻止关闭
    if (result === false) return
  }

  // 执行关闭
  offset.value = 0

  if (opened.value) {
    opened.value = false
    emits("close", {
      name: isDef(props.name) ? props.name : "",
      position: currentPosition,
    })
    position.value = ""
  }
}

// 点击事件处理
function onCellClick() {
  if (lockClick.value) return
  emits("click", "cell")

  // 如果已打开，点击内容区域关闭
  if (opened.value) {
    close()
  }
}

function onLeftClick() {
  if (lockClick.value) return
  emits("click", "left")
}

function onRightClick() {
  if (lockClick.value) return
  emits("click", "right")
}

// 暴露方法
defineExpose({
  /** 打开滑动单元格 */
  open,
  /** 关闭滑动单元格 */
  close,
})

// 组件挂载时初始化
onMounted(() => {
  initWidths()
})
</script>

<script lang="ts">
export default {
  name: "ui-swipe-cell",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-swipe-cell {
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background, #fff);

  &__wrapper {
    z-index: 1;
    position: relative;
    background: inherit;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1);
  }

  &__left,
  &__right {
    top: 0;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
  }

  &__left {
    left: 0;
    transform: translateX(-100%);
  }

  &__right {
    right: 0;
    transform: translateX(100%);
  }
}
</style>
