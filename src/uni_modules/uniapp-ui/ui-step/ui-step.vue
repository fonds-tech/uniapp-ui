<template>
  <view class="ui-step" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-step__head">
      <view class="ui-step__line ui-step__line--before" />
      <view class="ui-step__icon-wrapper">
        <slot name="icon" :status="status" :index="safeIndex" :active="status === 'process'">
          <ui-icon v-if="currentIcon" :name="currentIcon" :size="currentIconSize" />
          <view v-else class="ui-step__circle">
            <ui-icon v-if="!isDot && status === 'finish'" name="checked" :size="circleInnerSize" />
            <ui-icon v-else-if="!isDot && status === 'error'" name="cross" :size="circleInnerSize" />
            <text v-else-if="!isDot" class="ui-step__index">{{ safeIndex + 1 }}</text>
          </view>
        </slot>
      </view>
      <view class="ui-step__line ui-step__line--after" />
    </view>

    <view class="ui-step__content">
      <slot :status="status" :index="safeIndex" :active="status === 'process'">
        <view v-if="title" class="ui-step__title">{{ title }}</view>
        <view v-if="description" class="ui-step__description">{{ description }}</view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { StepStatus, StepInheritKey } from "../ui-steps"
import { isDef } from "../utils/check"
import { stepsKey } from "../ui-steps"
import { computed } from "vue"
import { stepEmits, stepProps } from "./index"
import { useUnit, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-step" })

const props = defineProps(stepProps)
const emits = defineEmits(stepEmits)
const { parent, index } = useParent(stepsKey)

const safeIndex = computed(() => Math.max(0, index.value))
const isFirst = computed(() => index.value === 0)
const isLast = computed(() => !parent || index.value === parent.count.value - 1)
const isDot = computed(() => parent?.props.dot ?? false)
const isSimple = computed(() => parent?.props.simple ?? false)

// 派生 status：props.status 优先；否则按父 active 判定
const status = computed<StepStatus>(() => {
  if (props.status) return props.status
  if (!parent) return "wait"
  const a = parent.active.value
  if (index.value < a) return "finish"
  if (index.value === a) return "process"
  return "wait"
})

// 取属性值：自身 props 优先，缺省回退到父 ui-steps 同名 prop
function inherit<K extends StepInheritKey>(key: K) {
  const self = (props as Record<string, unknown>)[key]
  if (isDef(self)) return self
  return parent?.props?.[key]
}

// 当前 status 对应的图标（props.icon 显式优先）
const currentIcon = computed<string>(() => {
  if (isDot.value) return ""
  if (props.icon) return props.icon
  switch (status.value) {
    case "finish":
      return String(inherit("finishIcon") ?? "")
    case "process":
      return String(inherit("activeIcon") ?? "")
    case "error":
      return String(inherit("errorIcon") ?? "")
    case "wait":
      return String(inherit("inactiveIcon") ?? "")
    default:
      return ""
  }
})

const currentIconSize = computed(() => {
  const size = props.iconSize ?? inherit("iconSize")
  return isDef(size) ? useUnit(size as string | number) : undefined
})

// 圆圈内置图标用 CSS var 决定的圆圈尺寸 0.5 比例（CSS calc 替代 JS 计算）
const circleInnerSize = computed(() => "calc(var(--ui-step-circle-size, 48rpx) * 0.5)")

const classNames = computed(() => {
  const list: string[] = [`ui-step--${status.value}`]
  if (parent?.props.direction === "vertical") list.push("ui-step--vertical")
  if (isFirst.value) list.push("ui-step--first")
  if (isLast.value) list.push("ui-step--last")
  if (isDot.value) list.push("ui-step--dot")
  if (isSimple.value) list.push("ui-step--simple")
  return list
})

const rootStyle = computed(() => {
  const vars: Record<string, string | undefined> = {}
  if (props.iconSize) vars["--ui-step-icon-display-size"] = useUnit(props.iconSize)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

function onClick() {
  emits("click", safeIndex.value)
  parent?.onClickStep(safeIndex.value)
}

defineExpose({ index: safeIndex, status, currentStatus: status })
</script>

<script lang="ts">
export default {
  name: "ui-step",
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
.ui-step {
  flex: 1;
  color: var(--ui-color-text-secondary);
  display: flex;
  font-size: var(--ui-font-size-sm);
  flex-direction: column;

  &__head {
    display: flex;
    align-items: center;
  }

  &__line {
    flex: 1;
    height: var(--ui-step-line-thickness, 2rpx);
    background: var(--ui-step-color-inactive, var(--ui-color-text-placeholder));
    transition: background var(--ui-step-transition, 0.2s);
  }

  &__icon-wrapper {
    display: flex;
    padding: 0 var(--ui-spacing-xs);
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  &__circle {
    color: var(--ui-step-icon-text-color, var(--ui-color-text-inverse));
    width: var(--ui-step-circle-size, 48rpx);
    border: var(--ui-border-width) solid var(--ui-step-color-inactive, var(--ui-color-text-placeholder));
    height: var(--ui-step-circle-size, 48rpx);
    display: flex;
    font-size: var(--ui-font-size-xs);
    background: transparent;
    transition:
      background var(--ui-step-transition, 0.2s),
      border-color var(--ui-step-transition, 0.2s),
      transform var(--ui-step-transition, 0.2s);
    align-items: center;
    flex-shrink: 0;
    font-weight: var(--ui-font-weight-medium);
    border-radius: 50%;
    justify-content: center;
  }

  &__index {
    color: inherit;
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-medium);
    line-height: 1;
  }

  &__content {
    display: flex;
    text-align: center;
    padding-top: var(--ui-step-content-gap, var(--ui-spacing-sm));
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    transition: color var(--ui-step-transition, 0.2s);
    word-break: break-word;
    font-weight: var(--ui-font-weight-medium);
    line-height: 1.4;
  }

  &__description {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
    transition: color var(--ui-step-transition, 0.2s);
    word-break: break-word;
    line-height: 1.4;
  }

  // 首尾隐藏连接线
  &--first .ui-step__line--before {
    visibility: hidden;
  }

  &--last .ui-step__line--after {
    visibility: hidden;
  }

  // 状态切换（CSS 单路径）
  &--process,
  &--finish,
  &--error {
    .ui-step__line--before {
      background: var(--ui-step-color-active, var(--ui-color-primary));
    }
  }

  &--finish .ui-step__line--after {
    background: var(--ui-step-color-active, var(--ui-color-primary));
  }

  &--process {
    .ui-step__circle {
      transform: scale(1.05);
      background: var(--ui-step-color-active, var(--ui-color-primary));
      box-shadow: var(--ui-shadow-sm);
      border-color: var(--ui-step-color-active, var(--ui-color-primary));
    }

    .ui-step__title {
      color: var(--ui-step-color-active, var(--ui-color-primary));
    }
  }

  &--finish {
    .ui-step__circle {
      background: var(--ui-step-color-active, var(--ui-color-primary));
      border-color: var(--ui-step-color-active, var(--ui-color-primary));
    }
  }

  &--error {
    .ui-step__circle {
      background: var(--ui-step-color-error, var(--ui-color-danger));
      border-color: var(--ui-step-color-error, var(--ui-color-danger));
    }

    .ui-step__title {
      color: var(--ui-step-color-error, var(--ui-color-danger));
    }
  }

  &--wait {
    .ui-step__index {
      color: var(--ui-step-color-inactive, var(--ui-color-text-placeholder));
    }
  }

  &--dot {
    .ui-step__circle {
      width: var(--ui-step-dot-size, 16rpx);
      border: none;
      height: var(--ui-step-dot-size, 16rpx);
    }

    .ui-step__index {
      display: none;
    }

    &.ui-step--wait .ui-step__circle {
      background: var(--ui-step-color-inactive, var(--ui-color-text-placeholder));
    }
  }

  &--simple {
    .ui-step__content {
      display: none;
    }
  }

  &--vertical {
    padding: 0;
    min-height: var(--ui-size-md);
    flex-direction: row;

    .ui-step__head {
      width: var(--ui-step-circle-size, 48rpx);
      flex-shrink: 0;
      margin-right: var(--ui-spacing-md);
      flex-direction: column;
    }

    .ui-step__line {
      flex: 1;
      width: var(--ui-step-line-thickness, 2rpx);
      height: auto;
      min-height: var(--ui-spacing-md);
    }

    .ui-step__icon-wrapper {
      padding: var(--ui-spacing-xs) 0;
    }

    .ui-step__content {
      flex: 1;
      text-align: left;
      padding-top: 0;
      justify-content: center;
    }
  }
}
</style>
