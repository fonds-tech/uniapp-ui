<template>
  <view v-if="visible" class="ui-tag" :class="[classes, props.customClass]" :style="[style]" @click="onClick">
    <view v-if="props.icon || slots.icon" class="ui-tag__icon">
      <slot name="icon">
        <ui-icon :name="props.icon" :color="props.iconColor" :size="props.iconSize" :weight="props.iconWeight" />
      </slot>
    </view>
    <view class="ui-tag__text" :style="[textStyle]">
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
import { tagEmits, tagProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, useSlots } from "vue"

defineOptions({ name: "ui-tag" })

const props = defineProps(tagProps)
const emits = defineEmits(tagEmits)
const slots = useSlots()

// 是否可见
const visible = ref(true)

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.padding = props.padding
  style.color = useColor(props.textColor)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.borderRadius)

  if (props.borderColor) {
    style.borderColor = useColor(props.borderColor)
    style.borderStyle = "solid"
    style.borderWidth = useUnit(props.borderWidth) || "1rpx"
  } else if (props.borderWidth) {
    style.borderWidth = useUnit(props.borderWidth)
  }

  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-tag--${props.type}`)
  if (props.round) list.push("ui-tag--round")
  if (props.plain) list.push("ui-tag--plain")
  if (props.closeable) list.push("ui-tag--closeable")
  return list
})
// 文字样式
const textStyle = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  return useStyle(style)
})

// 监听 show 属性
watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
  { immediate: true },
)
// 监听可见性变化
watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
  },
)

// 点击事件
function onClick() {
  emits("click")
}

// 关闭事件
function onClose() {
  visible.value = false
  emits("close")
}
</script>

<script lang="ts">
export default {
  name: "ui-tag",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-tag {
  width: fit-content;
  display: inline-flex;
  padding: 4rpx 8rpx;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4rpx;
  justify-content: center;
  background-color: var(--ui-color-primary);

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 4rpx;
  }

  &__text {
    font-size: 20rpx;
    white-space: nowrap;
  }

  &__close {
    display: flex;
    align-items: center;
    margin-left: 4rpx;
  }

  &--round {
    border-radius: 9999px;
  }

  &--plain {
    border-style: solid;
    border-width: 1rpx;
    background-color: var(--ui-color-background);
  }

  @each $type in (primary, success, warning, danger, info) {
    &--#{$type} {
      color: var(--ui-color-background);
      background-color: var(--ui-color-#{$type});

      &.ui-tag--plain {
        color: var(--ui-color-#{$type});
        border-color: var(--ui-color-#{$type});
        background-color: var(--ui-color-background);
      }
    }
  }
}
</style>
