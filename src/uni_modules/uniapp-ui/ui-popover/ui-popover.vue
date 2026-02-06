<template>
  <view class="ui-popover-wrapper">
    <!-- 触发元素容器 -->
    <view class="ui-popover__reference" @click="onClickReference">
      <slot name="reference">
        <slot />
      </slot>
    </view>
    <!-- 遮罩层 -->
    <ui-overlay v-if="props.overlay" :show="visible" :duration="props.duration" :z-index="currentZIndex" :custom-style="props.overlayStyle" @click="onClickOverlay" />
    <!-- 气泡内容 -->
    <view v-if="inited" class="ui-popover" :class="[popoverClass, props.customClass]" :style="[popoverStyle]" @transitionend="transition.end" @touchmove.stop="() => {}">
      <!-- 箭头 -->
      <view v-if="props.showArrow" class="ui-popover__arrow" :class="[arrowClass]" />
      <!-- 内容区域 -->
      <view class="ui-popover__content">
        <slot name="content">
          <!-- 默认操作列表 -->
          <view v-for="(action, index) in safeActions" :key="action.id ?? index" class="ui-popover__action" :class="[actionClass(action)]" @click="onClickAction(action, index)">
            <ui-icon v-if="action.icon" :name="action.icon" class="ui-popover__action__icon" />
            <text class="ui-popover__action__text">{{ action.text }}</text>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { PopoverAction, PopoverPlacement } from "./index"
import { isNumber } from "../utils/check"
import { popoverEmits, popoverProps } from "./index"
import { useRect, useStyle, useTransition, useGlobalZIndex } from "../hooks"
import { ref, watch, computed, onMounted, onUnmounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-popover" })

const props = defineProps(popoverProps)
const emits = defineEmits(popoverEmits)

// 组件实例
const instance = getCurrentInstance()

// 过渡动画 hook
const transition = useTransition()

// 层级管理
const currentZIndex = ref<number>()

// 控制气泡可见性
const visible = ref(false)

// 触发元素位置信息
const referenceRect = ref<UniApp.NodeInfo>({})

// 计算后的气泡位置
const popoverPosition = ref<{ top?: string; left?: string; right?: string; bottom?: string }>({})

// 是否已初始化
const inited = computed(() => transition.inited.value)

// 安全的 actions 数组
const safeActions = computed(() => {
  return Array.isArray(props.actions) ? props.actions : []
})

// 气泡样式
const popoverStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = currentZIndex.value
  // 合并位置样式
  Object.assign(style, popoverPosition.value)
  return useStyle({ ...style, ...useStyle(props.customStyle), ...transition.styles.value })
})

// 气泡类名
const popoverClass = computed(() => {
  const list: string[] = [`ui-popover--${props.theme}`, `ui-popover--${props.placement}`, transition.classs.value]
  return list
})

// 箭头类名
const arrowClass = computed(() => {
  const placement = props.placement as PopoverPlacement
  // 根据位置确定箭头方向
  if (placement.startsWith("top")) return "ui-popover__arrow--bottom"
  if (placement.startsWith("bottom")) return "ui-popover__arrow--top"
  if (placement === "left") return "ui-popover__arrow--right"
  if (placement === "right") return "ui-popover__arrow--left"
  return ""
})

// 操作项类名
const actionClass = computed(() => (action: PopoverAction) => {
  const list: string[] = []
  if (action.disabled) list.push("ui-popover__action--disabled")
  if (action.className) list.push(action.className)
  return list
})

// 过渡事件绑定
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 监听 show 变化
watch(
  () => props.show,
  (val) => {
    if (val) open()
    else close()
  },
  { immediate: true },
)

// 监听 duration 变化
watch(() => props.duration, initTransition, { immediate: true })

// 组件挂载
onMounted(() => {
  // 初始获取位置
  updateReferenceRect()
})

// 组件卸载
onUnmounted(() => {
  // 清理工作由 transition hook 内部处理
})

// 初始化过渡动画
function initTransition() {
  transition.init({ name: "zoom-in", duration: props.duration })
}

// 更新触发元素位置
async function updateReferenceRect() {
  if (!instance) return
  referenceRect.value = await useRect(".ui-popover__reference", instance)
  calculatePosition()
}

// 计算气泡位置
function calculatePosition() {
  const rect = referenceRect.value
  if (!rect || rect.width === undefined) return

  const [offsetX, offsetY] = props.offset || [0, 8]
  const placement = props.placement as PopoverPlacement
  const position: { top?: string; left?: string; right?: string; bottom?: string } = {}

  // 基于触发元素的位置计算气泡位置
  // 注意：这里使用固定定位，需要考虑页面滚动
  const top = rect.top || 0
  const left = rect.left || 0
  const width = rect.width || 0
  const height = rect.height || 0

  switch (placement) {
    case "top":
      position.top = `${top - offsetY}px`
      position.left = `${left + width / 2}px`
      break
    case "top-start":
      position.top = `${top - offsetY}px`
      position.left = `${left + offsetX}px`
      break
    case "top-end":
      position.top = `${top - offsetY}px`
      position.left = `${left + width + offsetX}px`
      break
    case "bottom":
      position.top = `${top + height + offsetY}px`
      position.left = `${left + width / 2}px`
      break
    case "bottom-start":
      position.top = `${top + height + offsetY}px`
      position.left = `${left + offsetX}px`
      break
    case "bottom-end":
      position.top = `${top + height + offsetY}px`
      position.left = `${left + width + offsetX}px`
      break
    case "left":
      position.top = `${top + height / 2}px`
      position.left = `${left - offsetX}px`
      break
    case "right":
      position.top = `${top + height / 2}px`
      position.left = `${left + width + offsetX}px`
      break
  }

  popoverPosition.value = position
}

// 打开气泡
async function open() {
  if (transition.visible.value) return
  initTransition()
  await updateReferenceRect()
  currentZIndex.value = isNumber(props.zIndex) ? +props.zIndex! : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

// 关闭气泡
function close() {
  if (transition.visible.value) {
    visible.value = false
    transition.leave()
    emits("update:show", false)
  }
}

// 点击触发元素
function onClickReference() {
  if (props.trigger === "click") {
    if (visible.value) {
      close()
    } else {
      open()
    }
  }
}

// 点击遮罩层
function onClickOverlay() {
  emits("clickOverlay")
  if (props.closeOnClickOutside) {
    close()
  }
}

// 点击操作项
function onClickAction(action: PopoverAction, index: number) {
  if (action.disabled) return
  emits("select", action, index)
  if (props.closeOnClickAction) {
    close()
  }
}

defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-popover",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-popover-wrapper {
  display: inline-block;
  position: relative;
}

.ui-popover__reference {
  display: inline-block;
}

.ui-popover {
  position: fixed;
  box-shadow: 0 2px 12px rgba(50, 50, 51, 0.12);
  border-radius: var(--ui-radius-md);
  transform-origin: center;
  transition-duration: var(--ui-transition-duration);

  // 主题样式
  &--light {
    color: var(--ui-color-text);
    background-color: var(--ui-color-background);

    .ui-popover__arrow {
      background-color: var(--ui-color-background);
    }
  }

  &--dark {
    color: var(--ui-color-white);
    background-color: #4a4a4a;

    .ui-popover__arrow {
      background-color: #4a4a4a;
    }
  }

  // 位置相关样式 - transform 用于居中调整
  &--top,
  &--top-start,
  &--top-end {
    transform-origin: bottom center;
  }

  &--top {
    transform: translateX(-50%) translateY(-100%);
  }

  &--top-start {
    transform: translateY(-100%);
  }

  &--top-end {
    transform: translateX(-100%) translateY(-100%);
  }

  &--bottom,
  &--bottom-start,
  &--bottom-end {
    transform-origin: top center;
  }

  &--bottom {
    transform: translateX(-50%);
  }

  &--bottom-start {
    // 默认位置
  }

  &--bottom-end {
    transform: translateX(-100%);
  }

  &--left {
    transform: translateX(-100%) translateY(-50%);
    transform-origin: right center;
  }

  &--right {
    transform: translateY(-50%);
    transform-origin: left center;
  }
}

.ui-popover__arrow {
  width: 16rpx;
  height: 16rpx;
  position: absolute;
  transform: rotate(45deg);

  &--top {
    top: -8rpx;
    left: 50%;
    margin-left: -8rpx;
  }

  &--bottom {
    left: 50%;
    bottom: -8rpx;
    margin-left: -8rpx;
  }

  &--left {
    top: 50%;
    left: -8rpx;
    margin-top: -8rpx;
  }

  &--right {
    top: 50%;
    right: -8rpx;
    margin-top: -8rpx;
  }
}

.ui-popover__content {
  overflow: hidden;
  border-radius: inherit;
}

.ui-popover__action {
  cursor: pointer;
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  position: relative;
  transition: background-color var(--ui-transition-fast);
  align-items: center;
  white-space: nowrap;

  &:active {
    background-color: var(--ui-color-background-hover);
  }

  // 分割线
  &::after {
    left: var(--ui-spacing-lg);
    right: var(--ui-spacing-lg);
    bottom: 0;
    height: var(--ui-border-width-thin);
    content: "";
    position: absolute;
    background-color: var(--ui-color-border-light);
  }

  &:last-child::after {
    display: none;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);

    &:active {
      background-color: transparent;
    }
  }

  &__icon {
    font-size: var(--ui-icon-size-sm);
    margin-right: var(--ui-spacing-sm);
  }

  &__text {
    font-size: var(--ui-font-size-md);
  }
}

// 深色主题下的分割线
.ui-popover--dark {
  .ui-popover__action {
    &::after {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
