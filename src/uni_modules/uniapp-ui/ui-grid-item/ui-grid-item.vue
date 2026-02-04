<template>
  <view class="ui-grid-item" :class="[rootClass, props.customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-grid-item__content" :class="[contentClass]" :style="[contentStyle]">
      <!-- 图标插槽 -->
      <view v-if="hasIcon" class="ui-grid-item__icon">
        <slot name="icon">
          <ui-badge :dot="props.dot" :value="props.badge">
            <ui-icon :name="props.icon" :color="props.iconColor" :size="iconSize" />
          </ui-badge>
        </slot>
      </view>
      <!-- 文字插槽 -->
      <view v-if="hasText" class="ui-grid-item__text">
        <slot name="text">
          <text>{{ props.text }}</text>
        </slot>
      </view>
      <!-- 默认插槽 -->
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { gridKey } from "../ui-grid"
import { computed, useSlots } from "vue"
import { useUnit, useStyle, useParent } from "../hooks"
import { gridItemEmits, gridItemProps } from "./index"

defineOptions({ name: "ui-grid-item" })

const props = defineProps(gridItemProps)
const emits = defineEmits(gridItemEmits)
const slots = useSlots()

// 获取父组件
const { index, parent } = useParent(gridKey)

// 默认图标大小
const DEFAULT_ICON_SIZE = "56rpx"

// 计算图标大小
const iconSize = computed(() => {
  if (props.iconSize) return useUnit(props.iconSize)
  return DEFAULT_ICON_SIZE
})

// 是否有图标
const hasIcon = computed(() => {
  return props.icon || slots.icon
})

// 是否有文字内容
const hasText = computed(() => {
  return props.text || slots.text
})

// 计算列宽百分比
const columnWidth = computed(() => {
  const columnNum = parent?.props.columnNum || 4
  return `${100 / columnNum}%`
})

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.flexBasis = columnWidth.value

  // 处理间距
  if (parent?.props.gutter) {
    const gutterValue = useUnit(parent.props.gutter)
    style.paddingRight = gutterValue
    style.paddingTop = index.value >= (parent.props.columnNum || 4) ? gutterValue : undefined
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  // 正方形需要相对定位
  if (parent?.props.square) {
    list.push("ui-grid-item--square")
  }
  return list
})

// 内容区域样式
const contentStyle = computed(() => {
  const style: CSSProperties = {}

  // 正方形格子
  if (parent?.props.square) {
    style.paddingTop = "100%"
  }

  return useStyle(style)
})

// 内容区域类名
const contentClass = computed(() => {
  const list: string[] = []

  // 内容排列方向
  if (parent?.props.direction === "horizontal") {
    list.push("ui-grid-item__content--horizontal")
  }

  // 居中
  if (parent?.props.center) {
    list.push("ui-grid-item__content--center")
  }

  // 正方形
  if (parent?.props.square) {
    list.push("ui-grid-item__content--square")
  }

  // 可点击
  if (parent?.props.clickable) {
    list.push("ui-grid-item__content--clickable")
  }

  // 边框
  if (parent?.props.border && !parent?.props.gutter) {
    list.push("ui-grid-item__content--border")
  }

  return list
})

// 点击事件
function onClick(event: any) {
  if (parent?.props.clickable) {
    emits("click", event)
  }
}

defineExpose({ name: "ui-grid-item", index })
</script>

<script lang="ts">
export default {
  name: "ui-grid-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-grid-item {
  box-sizing: border-box;

  &--square {
    position: relative;
  }

  &__content {
    display: flex;
    padding: 32rpx 16rpx;
    box-sizing: border-box;
    flex-direction: column;
    background-color: var(--ui-color-background);

    &--horizontal {
      flex-direction: row;
    }

    &--center {
      align-items: center;
      justify-content: center;
    }

    &--square {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }

    &--clickable {
      cursor: pointer;
      transition: background-color var(--ui-transition-fast);

      &:active {
        background-color: var(--ui-color-background-dark);
      }
    }

    &--border {
      position: relative;

      &::after {
        top: 0;
        left: 0;
        right: 0;
        border: 0 solid var(--ui-color-border);
        bottom: 0;
        content: "";
        position: absolute;
        box-sizing: border-box;
        pointer-events: none;
        border-right-width: var(--ui-border-width);
        border-bottom-width: var(--ui-border-width);
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-sm);
    margin-top: 16rpx;
    word-break: break-all;
    line-height: 1.4;

    .ui-grid-item__content--horizontal & {
      margin-top: 0;
      margin-left: 16rpx;
    }
  }
}
</style>
