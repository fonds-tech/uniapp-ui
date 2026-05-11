<template>
  <view
    class="ui-swipe-cell"
    :class="[{ 'ui-swipe-cell--disabled': props.disabled }, customClass]"
    :style="[rootStyle]"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="ui-swipe-cell__left" @click="onSideClick('left')">
      <slot name="left" />
    </view>

    <view class="ui-swipe-cell__wrapper" :style="[wrapperStyle]" @click="onCellClick">
      <slot />
    </view>

    <view class="ui-swipe-cell__right" @click="onSideClick('right')">
      <slot name="right" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SwipeCellPosition } from "./index"
import { isDef } from "../utils/check"
import { useRect, useStyle, useUnitToPx } from "../hooks"
import { ref, computed, nextTick, onMounted, getCurrentInstance } from "vue"
import { swipeCellEmits, swipeCellProps, SWIPE_CELL_DIRECTION_THRESHOLD } from "./index"

defineOptions({ name: "ui-swipe-cell" })

const props = defineProps(swipeCellProps)
const emits = defineEmits(swipeCellEmits)
const instance = getCurrentInstance()

// 当前 transform 偏移（px）
const offset = ref(0)
// 拖动中
const dragging = ref(false)
// 当前打开位置（"" = 关闭）
const position = ref<SwipeCellPosition>("")
// 锁定 click 避免拖动后误触
const lockClick = ref(false)

// 触摸起点 + 当前偏移基线
const startX = ref(0)
const startY = ref(0)
const startOffset = ref(0)
// 已判定为垂直滚动，本次手势跳过
const verticalScroll = ref(false)

// 左右侧实际宽度（px）
const leftWidth = ref(0)
const rightWidth = ref(0)

const rootStyle = computed(() => useStyle(props.customStyle))

const wrapperStyle = computed<CSSProperties>(() => ({
  transform: `translateX(${offset.value}px)`,
  transitionDuration: dragging.value ? "0s" : "0.3s",
}))

// 解析用户传入的宽度（支持 number / px / rpx）；未传或 0 时返回 0 走 useRect 兜底
function resolveWidth(v: unknown): number {
  if (!isDef(v)) return 0
  const px = useUnitToPx(v as number | string)
  return px && px > 0 ? px : 0
}

async function measureSlot(selector: string): Promise<number> {
  if (!instance) return 0
  try {
    const rect = await useRect(selector, instance)
    return rect?.width || 0
  } catch {
    return 0
  }
}

async function initWidths() {
  leftWidth.value = resolveWidth(props.leftWidth) || (await measureSlot(".ui-swipe-cell__left"))
  rightWidth.value = resolveWidth(props.rightWidth) || (await measureSlot(".ui-swipe-cell__right"))
}

function getTouch(event: TouchEvent) {
  return event.touches?.[0] || event.changedTouches?.[0] || { clientX: 0, clientY: 0 }
}

function onTouchStart(event: TouchEvent) {
  if (props.disabled) return
  const t = getTouch(event)
  verticalScroll.value = false
  dragging.value = true
  lockClick.value = false
  startX.value = t.clientX
  startY.value = t.clientY
  startOffset.value = offset.value
}

function onTouchMove(event: TouchEvent) {
  if (props.disabled || verticalScroll.value || !dragging.value) return
  const t = getTouch(event)
  const dx = t.clientX - startX.value
  const dy = t.clientY - startY.value
  const absX = Math.abs(dx)
  const absY = Math.abs(dy)

  // 优先判定垂直滚动，丢弃本次手势
  if (absY > absX && absY > SWIPE_CELL_DIRECTION_THRESHOLD) {
    verticalScroll.value = true
    dragging.value = false
    return
  }

  // 阻止冒泡（仅 H5 生效）
  if (props.stopPropagation && absX > SWIPE_CELL_DIRECTION_THRESHOLD) {
    event.stopPropagation?.()
  }

  // 计算并夹紧偏移范围
  const next = startOffset.value + dx
  if (next > 0) offset.value = Math.min(next, leftWidth.value)
  else offset.value = Math.max(next, -rightWidth.value)

  if (absX > SWIPE_CELL_DIRECTION_THRESHOLD) lockClick.value = true
}

function onTouchEnd() {
  if (props.disabled || !dragging.value) {
    dragging.value = false
    return
  }
  dragging.value = false

  const threshold = Number(props.threshold) || 0
  const absOff = Math.abs(offset.value)

  if (offset.value > 0 && absOff > leftWidth.value * threshold) open("left")
  else if (offset.value < 0 && absOff > rightWidth.value * threshold) open("right")
  else close()

  // 拖动结束后下一帧解锁 click，避免触发 cellClick 自动关闭
  nextTick(() => {
    lockClick.value = false
  })
}

async function open(pos: SwipeCellPosition) {
  if (!pos) return
  const target = pos === "left" ? leftWidth.value : -rightWidth.value
  offset.value = target
  if (position.value === pos) return
  position.value = pos
  emits("open", { name: isDef(props.name) ? props.name : "", position: pos })
}

async function close(callBefore = true) {
  if (!position.value && offset.value === 0) return
  const cur = position.value
  if (callBefore && props.beforeClose) {
    const result = await props.beforeClose({
      position: cur,
      close: () => close(false),
    })
    if (result === false) return
  }
  offset.value = 0
  if (position.value) {
    const prev = position.value
    position.value = ""
    emits("close", { name: isDef(props.name) ? props.name : "", position: prev })
  }
}

function onCellClick() {
  if (lockClick.value) return
  emits("click", "cell")
  if (position.value) close()
}

function onSideClick(side: "left" | "right") {
  if (lockClick.value) return
  emits("click", side)
}

onMounted(initWidths)

defineExpose({
  /** 打开指定方向 */
  open,
  /** 关闭（走 beforeClose 拦截链） */
  close,
  /** 当前是否打开 */
  isOpen: () => !!position.value,
})
</script>

<script lang="ts">
export default {
  name: "ui-swipe-cell",
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
.ui-swipe-cell {
  overflow: hidden;
  position: relative;
  background: var(--ui-color-background);

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &__wrapper {
    z-index: 1;
    position: relative;
    background: inherit;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1);
  }

  // 左右 panels 静态贴在 cell 边内侧；wrapper z-index 盖住，平移露出
  &__left,
  &__right {
    top: 0;
    height: 100%;
    display: flex;
    z-index: 0;
    position: absolute;
    align-items: center;
  }

  &__left {
    left: 0;
  }

  &__right {
    right: 0;
  }
}
</style>
