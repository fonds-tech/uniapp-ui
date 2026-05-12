<template>
  <view class="ui-avatar-group" :class="[customClass]" :style="[rootStyle]" @click="emits('click', $event)">
    <view class="ui-avatar-group__container" :class="[containerClass]">
      <slot />
    </view>

    <view v-if="shouldShowExcess" class="ui-avatar-group__excess" :class="[excessShapeClass]" :style="[excessStyle]" @click.stop="emits('clickExcess', $event)">
      <text class="ui-avatar-group__excess-text">+{{ excessCount }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { computed } from "vue"
import { useUnit, useColor, useStyle, useChildren } from "../hooks"
import { avatarGroupKey, avatarGroupEmits, avatarGroupProps } from "./index"

defineOptions({ name: "ui-avatar-group" })

const props = defineProps(avatarGroupProps)
const emits = defineEmits(avatarGroupEmits)

const { childrens, linkChildren } = useChildren(avatarGroupKey)

// 容器布局 modifier（堆叠方向）
const containerClass = computed(() => ({ "ui-avatar-group__container--reverse": props.direction === "left" }))
// 超出形状 modifier
const excessShapeClass = computed(() => `ui-avatar-group__excess--${props.shape}`)
// 超出数量
const excessCount = computed(() => Math.max(0, childrens.length - (isDef(props.max) ? Number(props.max) : 5)))
// 是否显示超出
const shouldShowExcess = computed(() => excessCount.value > 0)

// 根节点样式：所有可配置项通过 CSS var 注入（子节点继承）
const rootStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    "--ui-avatar-group-size": useUnit(props.size),
    "--ui-avatar-group-border-color": useColor(props.borderColor),
    "--ui-avatar-group-border-width": useUnit(props.borderWidth),
  }
  if (props.excessColor) styles["--ui-avatar-group-excess-color"] = useColor(props.excessColor)
  if (props.excessBackground) styles["--ui-avatar-group-excess-background"] = useColor(props.excessBackground)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

// 超出节点动态样式：z-index 与 margin 依赖 direction/max 动态，无法走 CSS var
const excessStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {}
  const gap = useUnit(props.gap)
  if (props.direction === "left") {
    styles.marginRight = gap
    styles.zIndex = 0
  } else {
    styles.marginLeft = gap
    const max = isDef(props.max) ? Number(props.max) : 5
    styles.zIndex = max + 1
  }
  return useStyle(styles)
})

linkChildren({ props })
</script>

<script lang="ts">
export default {
  name: "ui-avatar-group",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-avatar-group {
  --ui-avatar-group-size: 80rpx;
  --ui-avatar-group-border-color: var(--ui-color-text-inverse);
  --ui-avatar-group-border-width: 4rpx;
  --ui-avatar-group-excess-color: var(--ui-color-text-secondary);
  --ui-avatar-group-excess-background: var(--ui-color-background-page);

  display: inline-flex;
  align-items: center;

  &__container {
    display: flex;
    align-items: center;

    &--reverse {
      flex-direction: row-reverse;
    }
  }

  &__excess {
    color: var(--ui-avatar-group-excess-color);
    width: var(--ui-avatar-group-size);
    height: var(--ui-avatar-group-size);
    display: inline-flex;
    overflow: hidden;
    position: relative;
    background: var(--ui-avatar-group-excess-background);
    box-sizing: border-box;
    align-items: center;
    flex-shrink: 0;
    border-color: var(--ui-avatar-group-border-color);
    border-style: solid;
    border-width: var(--ui-avatar-group-border-width);
    justify-content: center;

    &--circle {
      border-radius: 50%;
    }

    &--square {
      border-radius: var(--ui-radius-md);
    }
  }

  &__excess-text {
    color: inherit;
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }
}
</style>
