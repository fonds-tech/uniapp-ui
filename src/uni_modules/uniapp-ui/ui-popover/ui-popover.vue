<template>
  <view class="ui-popover">
    <!-- 触发元素 -->
    <view ref="referenceRef" class="ui-popover__reference" @click="onClickReference">
      <slot />
    </view>

    <!-- 遮罩层（透明，用于点击外部关闭） -->
    <ui-overlay
      v-if="closeOnClickOutside || overlay"
      :show="visible"
      :duration="duration"
      :z-index="overlayZIndex"
      :lazy-render="true"
      :opacity="overlay ? overlayOpacity : 0"
      @click="onClickOverlay"
    />

    <!-- 气泡内容 -->
    <view v-if="inited" class="ui-popover__content" :class="[contentClass, customClass]" :style="[contentStyle]" @transitionend="transition.end" @touchmove.stop="noop">
      <!-- 箭头 -->
      <view v-if="showArrow" class="ui-popover__arrow" :class="[arrowClass]" :style="[arrowStyle]" />

      <!-- 自定义内容插槽 -->
      <slot name="content">
        <!-- 默认菜单选项 -->
        <view class="ui-popover__actions">
          <view
            v-for="(action, index) in actions"
            :key="index"
            class="ui-popover__action"
            :class="[action.disabled ? 'is-disabled' : '', action.className]"
            @click.stop="onSelectAction(action, index)"
          >
            <ui-icon v-if="action.icon" :name="action.icon" :size="actionIconSize" :color="getActionIconColor(action)" class="ui-popover__action-icon" />
            <text class="ui-popover__action-text" :style="[getActionTextStyle(action)]">{{ action.text }}</text>
          </view>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { PopoverAction } from "./index"
import type { CSSProperties } from "vue"
import { noop } from "../utils/utils"
import { isNumber } from "../utils/check"
import { ref, watch, computed, getCurrentInstance } from "vue"
import { popoverEmits, popoverProps, usePopoverProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-popover" })

// 定义 props 和 emits
const props = defineProps(popoverProps)
const emits = defineEmits(popoverEmits)
const useProps = usePopoverProps(props)

// 使用 transition 钩子
const transition = useTransition()

// 获取当前组件实例
const instance = getCurrentInstance()

// 响应式状态
const zIndex = ref<number>() // 气泡层的 z-index
const visible = ref(false) // 控制气泡的可见性
const referenceRect = ref<UniApp.NodeInfo>({}) // 触发元素的位置信息
const contentRect = ref<{ width: number; height: number }>({ width: 0, height: 0 }) // 气泡内容的尺寸

// 计算 overlay 的 z-index（比气泡层低一级）
const overlayZIndex = computed(() => (zIndex.value ? zIndex.value - 1 : undefined))

// 计算是否已初始化
const inited = computed(() => transition.inited.value)

// 为 transition 的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 计算气泡内容的样式
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = zIndex.value
  style["--ui-popover-border-radius"] = useUnit(useProps.borderRadius)

  // 设置主题颜色
  if (useProps.theme === "dark") {
    style["--ui-popover-bg"] = "#4a4a4a"
    style["--ui-popover-text-color"] = "#ffffff"
    style["--ui-popover-arrow-color"] = "#4a4a4a"
  } else {
    style["--ui-popover-bg"] = "#ffffff"
    style["--ui-popover-text-color"] = "var(--ui-color-text-primary)"
    style["--ui-popover-arrow-color"] = "#ffffff"
  }

  // 计算位置
  const position = getContentPosition()
  Object.assign(style, position)

  return useStyle({ ...style, ...useStyle(useProps.customStyle), ...transition.styles.value })
})

// 计算气泡内容的类名
const contentClass = computed(() => {
  const list: string[] = []
  list.push(`ui-popover__content--${useProps.theme}`)
  list.push(transition.classs.value)
  return list
})

// 计算箭头的类名
const arrowClass = computed(() => {
  const list: string[] = []
  const placement = useProps.placement
  // 根据位置确定箭头方向
  if (placement.startsWith("top")) {
    list.push("ui-popover__arrow--bottom")
  } else if (placement.startsWith("bottom")) {
    list.push("ui-popover__arrow--top")
  } else if (placement.startsWith("left")) {
    list.push("ui-popover__arrow--right")
  } else if (placement.startsWith("right")) {
    list.push("ui-popover__arrow--left")
  }
  return list
})

// 计算箭头的样式
const arrowStyle = computed(() => {
  const style: CSSProperties = {}
  const placement = useProps.placement

  // 根据对齐方式调整箭头位置
  if (placement.endsWith("-start")) {
    if (placement.startsWith("top") || placement.startsWith("bottom")) {
      style.left = "24rpx"
    } else {
      style.top = "24rpx"
    }
  } else if (placement.endsWith("-end")) {
    if (placement.startsWith("top") || placement.startsWith("bottom")) {
      style.right = "24rpx"
    } else {
      style.bottom = "24rpx"
    }
  } else {
    // 居中
    if (placement.startsWith("top") || placement.startsWith("bottom")) {
      style.left = "50%"
      style.transform = "translateX(-50%)"
    } else {
      style.top = "50%"
      style.transform = "translateY(-50%)"
    }
  }

  return useStyle(style)
})

// 计算选项图标大小
const actionIconSize = computed(() => useProps.iconSize || "32rpx")

// 监听 show 属性变化
watch(
  () => useProps.show,
  (val) => {
    if (val) open()
    else close()
  },
  { immediate: true },
)

// 监听 duration 属性变化，重新初始化 transition
watch(() => useProps.duration, initTransition, { immediate: true })

// 初始化 transition
function initTransition() {
  transition.init({
    name: "zoom-in",
    duration: useProps.duration,
    enterTimingFunction: "ease-out",
    leaveTimingFunction: "ease-in",
  })
}

// 获取选项图标颜色
function getActionIconColor(action: PopoverAction): string {
  if (action.color) return action.color
  if (useProps.iconColor) return useProps.iconColor
  if (useProps.theme === "dark") return "#ffffff"
  return "var(--ui-color-text-primary)"
}

// 获取选项文字样式
function getActionTextStyle(action: PopoverAction): CSSProperties {
  const style: CSSProperties = {}
  if (action.color) {
    style.color = action.color
  } else if (useProps.textColor) {
    style.color = useColor(useProps.textColor)
  }
  if (useProps.textSize) {
    style.fontSize = useUnit(useProps.textSize)
  }
  return style
}

// 计算气泡内容位置
function getContentPosition(): CSSProperties {
  const style: CSSProperties = {}
  const rect = referenceRect.value
  const placement = useProps.placement
  const [offsetX = 0, offsetY = 0] = useProps.offset

  if (!rect.left && !rect.top) {
    return style
  }

  const arrowGap = useProps.showArrow ? 10 : 4 // 箭头间距（px）

  // 获取触发元素的位置信息
  const refTop = rect.top || 0
  const refLeft = rect.left || 0
  const refWidth = rect.width || 0
  const refHeight = rect.height || 0

  // 使用 transform 来处理定位，避免使用 100vh/100vw 计算
  const transforms: string[] = []

  // 计算基础位置
  if (placement.startsWith("top")) {
    style.top = `${refTop - arrowGap + offsetY}px`
    transforms.push("translateY(-100%)")
  } else if (placement.startsWith("bottom")) {
    style.top = `${refTop + refHeight + arrowGap + offsetY}px`
  } else if (placement.startsWith("left")) {
    style.left = `${refLeft - arrowGap + offsetX}px`
    transforms.push("translateX(-100%)")
  } else if (placement.startsWith("right")) {
    style.left = `${refLeft + refWidth + arrowGap + offsetX}px`
  }

  // 计算对齐方式
  if (placement.startsWith("top") || placement.startsWith("bottom")) {
    if (placement.endsWith("-start")) {
      style.left = `${refLeft + offsetX}px`
    } else if (placement.endsWith("-end")) {
      style.left = `${refLeft + refWidth + offsetX}px`
      transforms.push("translateX(-100%)")
    } else {
      style.left = `${refLeft + refWidth / 2 + offsetX}px`
      transforms.push("translateX(-50%)")
    }
  } else {
    if (placement.endsWith("-start")) {
      style.top = `${refTop + offsetY}px`
    } else if (placement.endsWith("-end")) {
      style.top = `${refTop + refHeight + offsetY}px`
      transforms.push("translateY(-100%)")
    } else {
      style.top = `${refTop + refHeight / 2 + offsetY}px`
      transforms.push("translateY(-50%)")
    }
  }

  // 合并 transform
  if (transforms.length > 0) {
    style.transform = transforms.join(" ")
  }

  return style
}

// 获取触发元素的位置信息
async function getReferenceRect() {
  if (!instance) return
  referenceRect.value = await useRect(".ui-popover__reference", instance)
}

// 点击触发元素
function onClickReference() {
  if (useProps.trigger === "click") {
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
  if (useProps.closeOnClickOutside) {
    close()
  }
}

// 选择选项
function onSelectAction(action: PopoverAction, index: number) {
  if (action.disabled) return
  emits("select", action, index)
  if (useProps.closeOnClickAction) {
    close()
  }
}

// 打开气泡
async function open() {
  if (transition.visible.value) return
  await getReferenceRect()
  initTransition()
  zIndex.value = isNumber(useProps.zIndex) ? +useProps.zIndex : useGlobalZIndex()
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

// 暴露方法
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

.ui-popover {
  display: inline-block;
  position: relative;

  &__reference {
    display: inline-block;
  }

  &__content {
    --ui-popover-bg: #ffffff;
    --ui-popover-text-color: var(--ui-color-text-primary);
    --ui-popover-arrow-color: #ffffff;
    --ui-popover-border-radius: var(--ui-radius-lg);
    overflow: visible;

    position: fixed;
    box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.12);
    border-radius: var(--ui-popover-border-radius);
    background-color: var(--ui-popover-bg);
    transition-duration: var(--ui-transition-duration);

    &--dark {
      box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.2);
      background-color: var(--ui-popover-bg);
    }
  }

  &__arrow {
    width: 0;
    border: 12rpx solid transparent;
    height: 0;
    position: absolute;

    &--top {
      top: -24rpx;
      border-bottom-color: var(--ui-popover-arrow-color);
    }

    &--bottom {
      bottom: -24rpx;
      border-top-color: var(--ui-popover-arrow-color);
    }

    &--left {
      left: -24rpx;
      border-right-color: var(--ui-popover-arrow-color);
    }

    &--right {
      right: -24rpx;
      border-left-color: var(--ui-popover-arrow-color);
    }
  }

  &__actions {
    display: flex;
    min-width: 200rpx;
    flex-direction: column;
  }

  &__action {
    cursor: pointer;
    display: flex;
    padding: 20rpx 32rpx;
    transition: background-color var(--ui-transition-duration);
    align-items: center;

    &:first-child {
      border-top-left-radius: var(--ui-popover-border-radius);
      border-top-right-radius: var(--ui-popover-border-radius);
    }

    &:last-child {
      border-bottom-left-radius: var(--ui-popover-border-radius);
      border-bottom-right-radius: var(--ui-popover-border-radius);
    }

    &:not(:last-child) {
      border-bottom: 1rpx solid var(--ui-color-border-light);
    }

    &:active {
      background-color: var(--ui-color-background-light);
    }

    &.is-disabled {
      opacity: var(--ui-opacity-disabled);
      pointer-events: none;
    }
  }

  &__action-icon {
    flex-shrink: 0;
    margin-right: 16rpx;
  }

  &__action-text {
    flex: 1;
    color: var(--ui-popover-text-color);
    font-size: var(--ui-font-size-md);
    white-space: nowrap;
  }
}

// 暗色主题下的分割线颜色
.ui-popover__content--dark {
  .ui-popover__action:not(:last-child) {
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }

  .ui-popover__action:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
