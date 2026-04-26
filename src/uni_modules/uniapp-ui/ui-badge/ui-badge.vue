<template>
  <view class="ui-badge" :style="[rootStyle]">
    <slot />
    <view v-if="isShow" class="ui-badge__inner" :class="[classNames, props.customClass]" :style="[innerStyle]" @click="emits('click')">
      <slot name="content">
        <ui-icon v-if="isShowIcon" :name="props.icon" />
        <text v-else class="ui-badge__value">{{ formatValue }}</text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isArray, isNumber } from "../utils/check"
import { computed, useSlots } from "vue"
import { badgeEmits, badgeProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-badge" })

const props = defineProps(badgeProps)
const emits = defineEmits(badgeEmits)
const slots = useSlots()

const isShowIcon = computed(() => !!props.icon && !props.dot)
// 格式化值：超过 max 显示 "max+"
const formatValue = computed(() => {
  if (isNumber(props.value) && isNumber(props.max)) {
    return Number(props.value) > Number(props.max) ? `${props.max}+` : props.value
  }
  return props.value
})
// 是否多字符（用于切换正圆 / 药丸）
const isMulti = computed(() => !props.dot && !isShowIcon.value && String(formatValue.value).length > 1)
// 是否显示
const isShow = computed(() => {
  if (props.dot || props.icon) return true
  if (props.value === undefined || props.value === null || props.value === "") return false
  if (isNumber(props.value)) return +props.value > 0 || (+props.value === 0 && props.showZero)
  return true
})

const classNames = computed(() => [
  `ui-badge__inner--${props.position}`,
  {
    "ui-badge__inner--dot": props.dot,
    "ui-badge__inner--icon": isShowIcon.value,
    "ui-badge__inner--multi": isMulti.value,
    "ui-badge__inner--absolute": !!slots.default,
  },
])

const rootStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    zIndex: props.zIndex,
  }
  if (props.color) styles["--ui-badge-background"] = useColor(props.color)
  if (props.dotSize !== undefined) styles["--ui-badge-dot-size"] = useUnit(props.dotSize)
  if (props.height !== undefined) styles["--ui-badge-height"] = useUnit(props.height)
  if (props.radius !== undefined) styles["--ui-badge-radius"] = useUnit(props.radius)
  if (props.valueColor) styles["--ui-badge-value-color"] = useColor(props.valueColor)
  if (props.valueSize) styles["--ui-badge-value-size"] = useUnit(props.valueSize)
  if (props.valueWeight) styles["--ui-badge-value-weight"] = String(props.valueWeight)
  return useStyle(styles)
})

// inner 样式：仅放偏移（动态 top/right，依赖数组解构）
const innerStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {}
  if (props.offset !== undefined && props.offset !== "") {
    if (isArray(props.offset)) {
      styles.top = useUnit(props.offset[0] || 0)
      styles.right = useUnit(props.offset[1] || 0)
    } else {
      styles.top = useUnit(props.offset)
      styles.right = useUnit(props.offset)
    }
  }
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})
</script>

<script lang="ts">
export default {
  name: "ui-badge",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-badge {
  --ui-badge-height: 40rpx;
  --ui-badge-radius: var(--ui-radius-round);
  --ui-badge-dot-size: 16rpx;
  --ui-badge-padding-x: var(--ui-spacing-xs);
  --ui-badge-background: var(--ui-color-danger);
  --ui-badge-value-size: var(--ui-font-size-xs);
  --ui-badge-value-color: var(--ui-color-text-inverse);
  --ui-badge-icon-padding: var(--ui-spacing-xxs);
  --ui-badge-value-weight: normal;

  width: max-content;
  height: max-content;
  display: flex;
  position: relative;

  // 默认正圆（单字符 / 单图标）：宽 = 高，避免字体宽度差异导致椭圆
  &__inner {
    color: var(--ui-badge-value-color);
    width: var(--ui-badge-height);
    height: var(--ui-badge-height);
    display: flex;
    padding: 0;
    background: var(--ui-badge-background);
    box-sizing: border-box;
    align-items: center;
    line-height: 1;
    border-radius: var(--ui-badge-radius);
    justify-content: center;

    &--absolute {
      position: absolute;
    }

    // 多字符药丸：宽度自适应，左右 padding 撑开
    &--multi {
      width: auto;
      padding: 0 var(--ui-badge-padding-x);
    }

    // 图标内边距（小图标视觉留白）
    &--icon {
      padding: var(--ui-badge-icon-padding);
    }

    // 圆点
    &--dot {
      width: var(--ui-badge-dot-size);
      height: var(--ui-badge-dot-size);
      padding: 0;
      border-radius: 50%;
    }

    &--top-right {
      &.ui-badge__inner--absolute {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        transform-origin: 100%;
      }
    }

    &--top-left {
      &.ui-badge__inner--absolute {
        top: 0;
        left: 0;
        right: auto;
        transform: translate(-50%, -50%);
        transform-origin: 0;
      }
    }

    &--bottom-right {
      &.ui-badge__inner--absolute {
        top: auto;
        right: 0;
        bottom: 0;
        transform: translate(50%, 50%);
        transform-origin: 100%;
      }
    }

    &--bottom-left {
      &.ui-badge__inner--absolute {
        top: auto;
        left: 0;
        right: auto;
        bottom: 0;
        transform: translate(-50%, 50%);
        transform-origin: 0;
      }
    }
  }

  &__value {
    color: inherit;
    font-size: var(--ui-badge-value-size);
    font-family:
      -apple-system-font,
      helvetica neue,
      arial,
      sans-serif;
    font-weight: var(--ui-badge-value-weight);
    line-height: 1;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
}
</style>
