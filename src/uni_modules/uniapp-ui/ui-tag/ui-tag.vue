<template>
  <view v-if="visible" class="ui-tag" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <view v-if="props.icon || slots.icon" class="ui-tag__icon">
      <slot name="icon">
        <ui-icon :name="props.icon" :color="props.iconColor" :size="props.iconSize" :weight="props.iconWeight" />
      </slot>
    </view>
    <view class="ui-tag__text">
      <slot>{{ props.text }}</slot>
    </view>
    <view v-if="props.closeable || slots.close" class="ui-tag__close" @click.stop="onClose">
      <slot name="close">
        <ui-icon name="cross" :color="props.iconColor" :size="props.iconSize" :weight="props.iconWeight" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { tagEmits, tagProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, useSlots } from "vue"

defineOptions({ name: "ui-tag" })

const props = defineProps(tagProps)
const emits = defineEmits(tagEmits)
const slots = useSlots()

const visible = ref(props.show)

const classNames = computed(() => {
  const list: string[] = [`ui-tag--${props.type}`]
  if (props.round) list.push("ui-tag--round")
  if (props.plain) list.push("ui-tag--plain")
  if (props.closeable) list.push("ui-tag--closeable")
  return list
})

// 根节点 CSS var 注入：颜色 / 尺寸 / 边框走 var 单路径
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.height) vars["--ui-tag-height"] = useUnit(props.height)
  if (props.padding) vars["--ui-tag-padding"] = props.padding
  if (props.background) vars["--ui-tag-bg"] = useColor(props.background)
  if (props.textColor) vars["--ui-tag-text-color"] = useColor(props.textColor)
  if (props.textSize) vars["--ui-tag-text-size"] = useUnit(props.textSize)
  if (props.textWeight) vars["--ui-tag-text-weight"] = String(props.textWeight)
  if (props.borderColor) vars["--ui-tag-border-color"] = useColor(props.borderColor)
  if (props.borderWidth) vars["--ui-tag-border-width"] = useUnit(props.borderWidth)
  if (props.borderRadius) vars["--ui-tag-radius"] = useUnit(props.borderRadius)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

// 外部 show 变化同步内部
watch(
  () => props.show,
  (val) => {
    if (val !== visible.value) visible.value = val
  },
)

// 内部 visible 改变向外 emit（不 immediate，避免挂载时干扰父级）
watch(visible, (val) => {
  emits("update:show", val)
})

function onClick() {
  emits("click")
}

function onClose() {
  visible.value = false
  emits("close")
}
</script>

<script lang="ts">
export default {
  name: "ui-tag",
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
.ui-tag {
  --ui-tag-bg: var(--ui-color-primary);
  --ui-tag-radius: var(--ui-radius-xs);
  --ui-tag-padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
  --ui-tag-text-size: var(--ui-font-size-xs);
  --ui-tag-text-color: var(--ui-color-text-inverse);
  --ui-tag-text-weight: var(--ui-font-weight-normal);
  --ui-tag-border-color: transparent;
  --ui-tag-border-width: var(--ui-border-width-thin);
  color: var(--ui-tag-text-color);

  width: fit-content;
  height: var(--ui-tag-height, auto);
  display: inline-flex;
  padding: var(--ui-tag-padding);
  overflow: hidden;
  position: relative;
  font-size: var(--ui-tag-text-size);
  background: var(--ui-tag-bg);
  align-items: center;
  flex-shrink: 0;
  font-weight: var(--ui-tag-text-weight);
  border-radius: var(--ui-tag-radius);
  justify-content: center;

  &__icon {
    display: flex;
    align-items: center;
    margin-right: var(--ui-spacing-xxs);
  }

  &__text {
    color: inherit;
    font-size: inherit;
    white-space: nowrap;
  }

  &__close {
    display: flex;
    align-items: center;
    margin-left: var(--ui-spacing-xxs);
  }

  &--round {
    border-radius: var(--ui-radius-round);
  }

  // 镂空：白底 + 主题色边框/文字
  &--plain {
    background: var(--ui-color-background);
    border-color: var(--ui-tag-border-color);
    border-style: solid;
    border-width: var(--ui-tag-border-width);
  }

  // 主题色 type
  @each $type in (primary, success, warning, danger, info) {
    &--#{$type} {
      --ui-tag-bg: var(--ui-color-#{$type});
      --ui-tag-border-color: var(--ui-color-#{$type});

      &.ui-tag--plain {
        --ui-tag-text-color: var(--ui-color-#{$type});
      }
    }
  }
}
</style>
