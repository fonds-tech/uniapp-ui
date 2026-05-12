<template>
  <view class="ui-tooltip" :class="[customClass]" :style="[rootStyle]" @click.stop="noop">
    <!-- 隐藏测量节点（结构镜像显示分支） -->
    <view class="ui-tooltip__measure">
      <view class="ui-tooltip__popup">
        <view class="ui-tooltip__inner">
          <slot name="content">
            <text class="ui-tooltip__text">{{ props.content }}</text>
          </slot>
        </view>
      </view>
    </view>

    <!-- 点击外部关闭遮罩（透明全屏 view） -->
    <view v-if="showTooltip && props.closeOnClickOutside" class="ui-tooltip__overlay" :style="[overlayStyle]" @click="close" />

    <!-- 提示框 -->
    <ui-transition :show="showTooltip" name="fade" :duration="props.duration" custom-class="ui-tooltip__pos" :custom-style="popupStyle">
      <view class="ui-tooltip__popup">
        <view v-if="props.showArrow" class="ui-tooltip__arrow" :class="[arrowClass]" />
        <view class="ui-tooltip__inner">
          <slot name="content">
            <text class="ui-tooltip__text">{{ props.content }}</text>
          </slot>
        </view>
      </view>
    </ui-transition>

    <!-- 触发元素：v-on 对象动态绑定（hover 仅 H5 / App，MP 忽略 mouseenter/mouseleave） -->
    <view class="ui-tooltip__target" v-on="targetListeners">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TooltipPlacement } from "./index"
import { noop } from "../utils/utils"
import { isNumber } from "../utils/check"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useGlobalZIndex } from "../hooks"
import { tooltipEmits, tooltipProps, TOOLTIP_ARROW_SIZE, TOOLTIP_ARROW_CLASS_MAP } from "./index"

defineOptions({ name: "ui-tooltip" })

const props = defineProps(tooltipProps)
const emits = defineEmits(tooltipEmits)

const instance = getCurrentInstance()

// 显示状态
const showTooltip = ref(false)
// 触发元素尺寸
const targetWidth = ref(0)
const targetHeight = ref(0)
// 弹出框尺寸
const popupWidth = ref(0)
const popupHeight = ref(0)
// 弹出框位置 inline
const popupPositionStyle = ref<CSSProperties>({})
// 层级
const zIndex = ref<number>()

// 根节点样式
const rootStyle = computed(() => useStyle(props.customStyle))
// 遮罩样式（透明，z-index 比 popup 低 1）
const overlayStyle = computed<CSSProperties>(() => ({ zIndex: (zIndex.value ?? 0) - 1 }))
// 弹出框样式（用 CSS var 注入，popup 与箭头通过 cascade 同步色值）
const popupStyle = computed(() => {
  const style: CSSProperties = { zIndex: zIndex.value, position: "absolute", minWidth: "10px" }
  if (props.bgColor) style["--ui-tooltip-bg" as keyof CSSProperties] = useColor(props.bgColor) as never
  if (props.textColor) style["--ui-tooltip-color" as keyof CSSProperties] = useColor(props.textColor) as never
  if (props.maxWidth !== undefined) style["--ui-tooltip-max-width" as keyof CSSProperties] = useUnit(props.maxWidth) as never
  Object.assign(style, popupPositionStyle.value)
  return useStyle(style)
})
// 箭头类名
const arrowClass = computed(() => TOOLTIP_ARROW_CLASS_MAP[props.placement as TooltipPlacement] || "ui-tooltip__arrow--down")
// target 事件监听（hover 触发条件编译排除 MP）
const targetListeners = computed(() => {
  const list: Record<string, () => void> = { click: onClickTarget }
  // #ifndef MP
  list.mouseenter = onMouseEnter
  list.mouseleave = onMouseLeave
  // #endif
  return list
})

watch(
  () => props.visible,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

watch(
  () => props.placement,
  () => {
    if (showTooltip.value) calculatePosition()
  },
)

onMounted(() => {
  initRect()
})

// 测量触发元素与测量节点尺寸
async function initRect() {
  if (!instance) return
  const [targetRect, popupRect] = await Promise.all([useRect(".ui-tooltip__target", instance), useRect(".ui-tooltip__measure", instance)])
  if (targetRect) {
    targetWidth.value = targetRect.width || 0
    targetHeight.value = targetRect.height || 0
  }
  if (popupRect) {
    popupWidth.value = popupRect.width || 0
    popupHeight.value = popupRect.height || 0
  }
}

// 计算 popup 位置
function calculatePosition() {
  const placement = props.placement as TooltipPlacement
  const offset = isNumber(props.offset) ? +props.offset : 0
  const arrowOffset = props.showArrow ? TOOLTIP_ARROW_SIZE + 4 : 4

  const tw = targetWidth.value
  const th = targetHeight.value
  const pw = popupWidth.value
  const ph = popupHeight.value

  const style: CSSProperties = {}

  switch (placement) {
    case "top":
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
      break
    case "top-start":
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = "0"
      break
    case "top-end":
      style.bottom = `${th + arrowOffset + offset}px`
      style.right = "0"
      break
    case "bottom":
      style.top = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
      break
    case "bottom-start":
      style.top = `${th + arrowOffset + offset}px`
      style.left = "0"
      break
    case "bottom-end":
      style.top = `${th + arrowOffset + offset}px`
      style.right = "0"
      break
    case "left":
      style.right = `${tw + arrowOffset + offset}px`
      style.top = `${(th - ph) / 2}px`
      break
    case "left-start":
      style.right = `${tw + arrowOffset + offset}px`
      style.top = "0"
      break
    case "left-end":
      style.right = `${tw + arrowOffset + offset}px`
      style.bottom = "0"
      break
    case "right":
      style.left = `${tw + arrowOffset + offset}px`
      style.top = `${(th - ph) / 2}px`
      break
    case "right-start":
      style.left = `${tw + arrowOffset + offset}px`
      style.top = "0"
      break
    case "right-end":
      style.left = `${tw + arrowOffset + offset}px`
      style.bottom = "0"
      break
    default:
      style.bottom = `${th + arrowOffset + offset}px`
      style.left = `${(tw - pw) / 2}px`
  }

  popupPositionStyle.value = style
}

// 打开
async function open() {
  if (props.disabled) return
  if (showTooltip.value) return
  await initRect()
  calculatePosition()
  zIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  showTooltip.value = true
  emits("update:visible", true)
  emits("open")
}

// 关闭
function close() {
  if (!showTooltip.value) return
  showTooltip.value = false
  emits("update:visible", false)
  emits("close")
}

// 切换
function toggle() {
  showTooltip.value ? close() : open()
}

// 点击触发元素
function onClickTarget() {
  if (props.disabled) return
  if (props.trigger === "click") toggle()
}

// H5 hover 触发
function onMouseEnter() {
  if (props.disabled) return
  if (props.trigger === "hover") open()
}

function onMouseLeave() {
  if (props.disabled) return
  if (props.trigger === "hover") close()
}

defineExpose({ open, close, toggle })
</script>

<script lang="ts">
export default {
  name: "ui-tooltip",
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
.ui-tooltip {
  --ui-tooltip-bg: rgba(38, 39, 40, 0.85);
  --ui-tooltip-color: var(--ui-color-text-inverse);
  --ui-tooltip-radius: var(--ui-radius-sm);
  --ui-tooltip-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  --ui-tooltip-padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  --ui-tooltip-font-size: var(--ui-font-size-sm);
  --ui-tooltip-max-width: 400rpx;
  --ui-tooltip-arrow-size: 5px;
  --ui-tooltip-arrow-offset: 4px;

  display: inline-block;
  position: relative;

  &__measure {
    top: 0;
    left: -9999px;
    opacity: 0;
    z-index: -1;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  }

  &__overlay {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: transparent;
  }

  &__popup {
    color: var(--ui-tooltip-color);
    padding: var(--ui-tooltip-padding);
    position: relative;
    // max-content 让 popup 撑到内容自然宽度，max-width 兜上限；脱离父级 inline-block 的宽度约束
    width: max-content;
    font-size: var(--ui-tooltip-font-size);
    max-width: var(--ui-tooltip-max-width);
    background: var(--ui-tooltip-bg);
    box-shadow: var(--ui-tooltip-shadow);
    line-height: var(--ui-line-height-normal);
    border-radius: var(--ui-tooltip-radius);
    overflow-wrap: break-word;
  }

  &__arrow {
    width: 0;
    height: 0;
    position: absolute;
    border-color: transparent;
    border-style: solid;
    border-width: var(--ui-tooltip-arrow-size);

    &--up {
      top: calc(var(--ui-tooltip-arrow-size) * -1);
      left: 50%;
      transform: translateX(-50%);
      border-top-width: 0;
      border-bottom-color: var(--ui-tooltip-bg);
    }

    &--down {
      left: 50%;
      bottom: calc(var(--ui-tooltip-arrow-size) * -1);
      transform: translateX(-50%);
      border-top-color: var(--ui-tooltip-bg);
      border-bottom-width: 0;
    }

    &--left {
      top: 50%;
      left: calc(var(--ui-tooltip-arrow-size) * -1);
      transform: translateY(-50%);
      border-left-width: 0;
      border-right-color: var(--ui-tooltip-bg);
    }

    &--right {
      top: 50%;
      right: calc(var(--ui-tooltip-arrow-size) * -1);
      transform: translateY(-50%);
      border-left-color: var(--ui-tooltip-bg);
      border-right-width: 0;
    }
  }

  &__inner {
    display: block;
  }

  &__text {
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  &__target {
    display: inline-block;
  }
}
</style>
