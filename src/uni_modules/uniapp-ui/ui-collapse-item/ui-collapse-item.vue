<template>
  <view class="ui-collapse-item" :class="[classs, customClass]" :style="[style]">
    <!-- 标题区域 -->
    <view class="ui-collapse-item__header" :class="headerClasss" :hover-class="hoverClass" :hover-stay-time="50" @click="onHeaderClick">
      <!-- 左侧图标插槽 -->
      <slot name="icon">
        <view v-if="useProps.icon" class="ui-collapse-item__icon" :style="iconStyle">
          <ui-icon :name="useProps.icon" :size="useProps.iconSize" :color="useProps.iconColor" :weight="useProps.iconWeight" />
        </view>
      </slot>

      <!-- 标题区域 -->
      <view class="ui-collapse-item__title-wrapper">
        <slot name="title">
          <text class="ui-collapse-item__title">{{ useProps.title }}</text>
        </slot>
        <slot name="label">
          <text v-if="useProps.label" class="ui-collapse-item__label">{{ useProps.label }}</text>
        </slot>
      </view>

      <!-- 右侧内容 -->
      <slot name="value">
        <text v-if="useProps.value" class="ui-collapse-item__value">{{ useProps.value }}</text>
      </slot>

      <!-- 右侧箭头 -->
      <slot name="right-icon">
        <view v-if="useProps.isLink" class="ui-collapse-item__arrow" :class="arrowClasss">
          <ui-icon :name="useProps.arrowIcon" />
        </view>
      </slot>
    </view>

    <!-- 内容区域 - 使用高度动画实现展开收起 -->
    <view class="ui-collapse-item__wrapper" :style="wrapperStyle">
      <view class="ui-collapse-item__content" :style="contentStyle">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { collapseKey } from "../ui-collapse"
import { useRect, useUnit, useStyle, useParent } from "../hooks"
import { collapseItemEmits, collapseItemProps, useCollapseItemProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-collapse-item" })

const props = defineProps(collapseItemProps)
const emits = defineEmits(collapseItemEmits)
const useProps = useCollapseItemProps(props)

// 获取父组件
const { index, parent } = useParent(collapseKey)

// 获取当前组件实例
const instance = getCurrentInstance()

// 内容区域高度
const contentHeight = ref(0)
// 是否正在动画中
const isAnimating = ref(false)
// 是否已完成首次渲染
const isReady = ref(false)

/**
 * 计算面板名称，优先使用 props.name，否则使用索引
 */
const name = computed(() => {
  return useProps.name !== undefined && useProps.name !== "" ? useProps.name : index.value
})

/**
 * 计算是否展开
 */
const expanded = computed(() => {
  if (!parent) return false
  return parent.isExpanded(name.value)
})

/**
 * 计算组件样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

/**
 * 计算组件类名
 */
const classs = computed(() => {
  const list: string[] = []
  if (useProps.border) list.push("ui-collapse-item--border")
  if (useProps.disabled) list.push("ui-collapse-item--disabled")
  return list
})

/**
 * 计算标题区域类名
 */
const headerClasss = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__header--expanded")
  if (useProps.disabled) list.push("ui-collapse-item__header--disabled")
  return list
})

/**
 * 计算 hover 类名
 */
const hoverClass = computed(() => {
  if (useProps.disabled || useProps.readonly) return ""
  return "ui-collapse-item__header--active"
})

/**
 * 计算图标样式
 */
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle(style)
})

/**
 * 计算箭头类名
 */
const arrowClasss = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__arrow--expanded")
  return list
})

/**
 * 计算内容区域包装器样式（用于动画）
 */
const wrapperStyle = computed(() => {
  const style: CSSProperties = {}

  if (!isReady.value) {
    // 首次渲染时，如果是展开状态则显示，否则隐藏
    style.height = expanded.value ? "auto" : "0"
    style.opacity = expanded.value ? "1" : "0"
  } else if (isAnimating.value) {
    // 动画中：使用具体高度
    style.height = expanded.value ? `${contentHeight.value}px` : "0"
    style.opacity = expanded.value ? "1" : "0"
  } else {
    // 动画结束：展开时使用 auto，收起时使用 0
    style.height = expanded.value ? "auto" : "0"
    style.opacity = expanded.value ? "1" : "0"
  }

  return useStyle(style)
})

/**
 * 计算内容区域样式
 */
const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (useProps.contentPadding) {
    style.padding = useUnit(useProps.contentPadding) as string
  }
  return useStyle(style)
})

/**
 * 获取内容区域高度
 */
async function getContentHeight() {
  await nextTick()
  if (!instance) return
  const rect = await useRect(".ui-collapse-item__content", instance)
  if (rect) {
    contentHeight.value = rect.height || 0
  }
}

/**
 * 标题点击事件
 */
function onHeaderClick() {
  if (useProps.disabled || useProps.readonly) return

  emits("click")
  toggle()
}

/**
 * 切换展开状态
 * @param value 是否展开，不传则取反
 */
function toggle(value?: boolean) {
  if (useProps.disabled || useProps.readonly) return
  if (!parent) return

  const newExpanded = value !== undefined ? value : !expanded.value

  // 触发动画
  startAnimation()

  // 通知父组件更新值
  parent.toggle(name.value, newExpanded)

  // 触发事件
  emits("change", newExpanded)
}

/**
 * 启动动画
 */
async function startAnimation() {
  // 获取内容高度
  await getContentHeight()

  isAnimating.value = true

  // 动画结束后重置状态
  setTimeout(() => {
    isAnimating.value = false
  }, 300)
}

/**
 * 监听展开状态变化，执行动画
 */
watch(
  () => expanded.value,
  async (newVal, oldVal) => {
    if (newVal !== oldVal && isReady.value) {
      await startAnimation()
    }
  },
)

/**
 * 组件挂载后获取内容高度
 */
onMounted(async () => {
  await nextTick()
  await getContentHeight()
  isReady.value = true
})

// 暴露属性和方法
defineExpose({
  componentName: "ui-collapse-item",
  name,
  useProps,
  expanded,
  toggle,
})
</script>

<script lang="ts">
export default {
  name: "ui-collapse-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style scoped lang="scss">
.ui-collapse-item {
  --ui-collapse-item-arrow-size: var(--ui-font-size-md);
  --ui-collapse-item-label-size: var(--ui-font-size-sm);
  --ui-collapse-item-title-size: var(--ui-font-size-md);
  --ui-collapse-item-value-size: var(--ui-font-size-md);
  --ui-collapse-item-arrow-color: var(--ui-color-text-secondary);
  --ui-collapse-item-label-color: var(--ui-color-text-secondary);
  --ui-collapse-item-title-color: var(--ui-color-text-primary);
  --ui-collapse-item-value-color: var(--ui-color-text-secondary);
  --ui-collapse-item-border-color: var(--ui-color-border-light);
  --ui-collapse-item-disabled-color: var(--ui-color-text-disabled);
  --ui-collapse-item-header-padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  --ui-collapse-item-content-padding: 0 var(--ui-spacing-lg) var(--ui-spacing-md);
  --ui-collapse-item-transition-duration: 300ms;
  background: var(--ui-color-background);

  &--border {
    &::after {
      left: var(--ui-spacing-lg);
      right: var(--ui-spacing-lg);
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: 1px solid var(--ui-collapse-item-border-color);
      pointer-events: none;
    }
  }

  &--disabled {
    .ui-collapse-item__header {
      cursor: not-allowed;
    }

    .ui-collapse-item__title,
    .ui-collapse-item__label,
    .ui-collapse-item__value,
    .ui-collapse-item__icon,
    .ui-collapse-item__arrow {
      color: var(--ui-collapse-item-disabled-color) !important;
    }
  }

  &__header {
    display: flex;
    padding: var(--ui-collapse-item-header-padding);
    position: relative;
    align-items: center;
    user-select: none;

    &--active {
      background: var(--ui-color-active);
    }

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__icon {
    display: flex;
    font-size: var(--ui-font-size-lg);
    align-items: center;
    margin-right: var(--ui-spacing-md);
  }

  &__title-wrapper {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-collapse-item-title-color);
    font-size: var(--ui-collapse-item-title-size);
    line-height: 1.5;
  }

  &__label {
    color: var(--ui-collapse-item-label-color);
    font-size: var(--ui-collapse-item-label-size);
    margin-top: var(--ui-spacing-xs);
    line-height: 1.4;
  }

  &__value {
    color: var(--ui-collapse-item-value-color);
    font-size: var(--ui-collapse-item-value-size);
    flex-shrink: 0;
    margin-left: var(--ui-spacing-md);
  }

  &__arrow {
    color: var(--ui-collapse-item-arrow-color);
    font-size: var(--ui-collapse-item-arrow-size);
    transform: rotate(0deg);
    transition: transform var(--ui-collapse-item-transition-duration) ease;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);

    &--expanded {
      transform: rotate(90deg);
    }
  }

  &__wrapper {
    overflow: hidden;
    transition:
      height var(--ui-collapse-item-transition-duration) ease,
      opacity var(--ui-collapse-item-transition-duration) ease;
  }

  &__content {
    color: var(--ui-color-text-regular);
    padding: var(--ui-collapse-item-content-padding);
    font-size: var(--ui-font-size-md);
    line-height: 1.6;
  }
}
</style>
