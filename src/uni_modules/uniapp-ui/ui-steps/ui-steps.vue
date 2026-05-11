<template>
  <view class="ui-steps" :class="[classNames, customClass]" :style="[rootStyle]">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { stepsKey, stepsEmits, stepsProps } from "./index"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"

defineOptions({ name: "ui-steps" })

const props = defineProps(stepsProps)
const emits = defineEmits(stepsEmits)
const { childrens, linkChildren } = useChildren(stepsKey)

const count = computed(() => childrens.length)

const active = computed(() => {
  const val = Number(props.active)
  if (Number.isNaN(val)) return 0
  const maxIndex = Math.max(0, count.value - 1)
  return Math.max(0, Math.min(val, maxIndex))
})

const classNames = computed(() => {
  const list: string[] = []
  if (props.direction === "vertical") list.push("ui-steps--vertical")
  if (props.clickable) list.push("ui-steps--clickable")
  if (props.simple) list.push("ui-steps--simple")
  if (props.dot) list.push("ui-steps--dot")
  if (props.center) list.push("ui-steps--center")
  return list
})

// 根节点 CSS var 注入；子 ui-step 通过 cascade 读取
const rootStyle = computed(() => {
  const vars: Record<string, string | undefined> = {}
  if (props.activeColor) vars["--ui-step-color-active"] = useColor(props.activeColor)
  if (props.inactiveColor) vars["--ui-step-color-inactive"] = useColor(props.inactiveColor)
  if (props.errorColor) vars["--ui-step-color-error"] = useColor(props.errorColor)
  if (props.iconSize) vars["--ui-step-icon-display-size"] = useUnit(props.iconSize)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

function onClickStep(index: number) {
  if (props.clickable) emits("clickStep", index)
}

linkChildren({ props, active, count, onClickStep })
</script>

<script lang="ts">
export default {
  name: "ui-steps",
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
.ui-steps {
  --ui-step-dot-size: 16rpx;
  --ui-step-transition: var(--ui-transition-fast);
  --ui-step-circle-size: 48rpx;
  --ui-step-color-error: var(--ui-color-danger);
  --ui-step-content-gap: var(--ui-spacing-sm);
  --ui-step-color-active: var(--ui-color-primary);
  --ui-step-color-inactive: var(--ui-color-text-placeholder);
  --ui-step-line-thickness: 2rpx;
  --ui-step-icon-text-color: var(--ui-color-text-inverse);

  width: 100%;
  display: flex;
  padding: var(--ui-spacing-md) 0;
  overflow: hidden;
  background: var(--ui-color-background);

  &--vertical {
    padding: 0 var(--ui-spacing-md) 0 var(--ui-spacing-xxl);
    flex-direction: column;
  }

  &--clickable {
    cursor: pointer;
  }
}
</style>
