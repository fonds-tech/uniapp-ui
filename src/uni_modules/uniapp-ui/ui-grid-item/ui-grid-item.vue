<template>
  <view class="ui-grid-item" :class="[itemClass, props.customClass]" :style="[itemStyle]" @click="onClick">
    <view class="ui-grid-item__content" :class="[contentClass]">
      <view v-if="hasIcon" class="ui-grid-item__icon">
        <slot name="icon">
          <ui-badge :dot="props.dot" :value="props.badge">
            <ui-icon :name="props.icon" :color="props.iconColor" :size="iconSize" />
          </ui-badge>
        </slot>
      </view>
      <view v-if="hasText" class="ui-grid-item__text">
        <slot name="text">
          <text>{{ props.text }}</text>
        </slot>
      </view>
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
const { parent } = useParent(gridKey)

const hasIcon = computed(() => props.icon || slots.icon)
const hasText = computed(() => props.text || slots.text)
const iconSize = computed(() => useUnit(props.iconSize) || "56rpx")

const itemClass = computed(() => {
  const list: string[] = []
  if (parent?.props.square) list.push("ui-grid-item--square")
  if (parent?.props.border && !parent?.props.gutter) list.push("ui-grid-item--border")
  return list
})

const itemStyle = computed(() => {
  const style: CSSProperties = {}
  // square 模式靠 padding-top:100% 撑开等高
  if (parent?.props.square) style.paddingTop = "100%"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const contentClass = computed(() => {
  const list: string[] = []
  if (parent?.props.direction === "horizontal") list.push("ui-grid-item__content--horizontal")
  if (parent?.props.center) list.push("ui-grid-item__content--center")
  if (parent?.props.square) list.push("ui-grid-item__content--square")
  if (parent?.props.clickable) list.push("ui-grid-item__content--clickable")
  if (parent?.props.gutter) list.push("ui-grid-item__content--gutter")
  return list
})

function onClick(event: any) {
  if (parent?.props.clickable) emits("click", event)
}
</script>

<script lang="ts">
export default {
  name: "ui-grid-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-grid-item {
  position: relative;
  box-sizing: border-box;

  &--square {
    height: 0;
  }

  &--border {
    &::before {
      left: 0;
      width: 100%;
      bottom: 0;
      height: 1px;
      content: "";
      z-index: 1;
      position: absolute;
      transform: scaleY(0.5);
      background-color: var(--ui-color-border);
    }

    &::after {
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      content: "";
      position: absolute;
      transform: scaleX(0.5);
      background-color: var(--ui-color-border);
    }
  }

  &__content {
    height: 100%;
    display: flex;
    padding: var(--ui-spacing-lg) var(--ui-spacing-sm);
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
      height: auto;
      padding: 0;
      position: absolute;
    }

    &--clickable {
      cursor: pointer;
      transition: background-color var(--ui-transition-fast);

      &:active {
        background-color: var(--ui-color-background-hover);
      }
    }

    &--gutter {
      position: relative;
      border-radius: var(--ui-radius-sm);

      &::after {
        top: 0;
        left: 0;
        width: 200%;
        border: 1px solid var(--ui-color-border);
        height: 200%;
        content: "";
        position: absolute;
        transform: scale(0.5);
        box-sizing: border-box;
        border-radius: calc(var(--ui-radius-sm) * 2);
        pointer-events: none;
        transform-origin: top left;
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    margin-top: var(--ui-spacing-sm);
    word-break: break-all;
    line-height: 1.4;

    .ui-grid-item__content--horizontal & {
      margin-top: 0;
      margin-left: var(--ui-spacing-sm);
    }
  }
}
</style>
