<template>
  <view v-if="visible" class="ui-tag" :class="[classes, customClass]" :style="[style]" @click="onClick">
    <view v-if="icon || slots.icon" class="ui-tag__icon">
      <slot name="icon">
        <ui-icon :name="icon" :color="iconColor" :size="iconSize" :weight="iconWeight" />
      </slot>
    </view>
    <view class="ui-tag__text" :style="[textStyle]">
      <slot>{{ text }}</slot>
    </view>
    <view v-if="closeable || slots.close" class="ui-tag__close" @click="onClose">
      <slot name="close">
        <ui-icon name="cross" :color="iconColor" :size="iconSize" :weight="iconWeight" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { tagEmits, tagProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-tag" })

const props = defineProps(tagProps)
const emits = defineEmits(tagEmits)
const slots = useSlots()
const visible = ref(true)

const style = computed(() => {
  const style: any = {}
  style.padding = props.padding
  style.color = useColor(props.textColor)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderColor = useColor(props.borderColor)
  style.borderWidth = useUnit(props.borderWidth)
  style.borderRadius = useUnit(props.borderRadius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-tag--${props.type}`)
  if (props.round) list.push("ui-tag--round")
  if (props.plain) list.push("ui-tag--plain")
  if (props.closeable) list.push("ui-tag--closeable")
  return list
})

const textStyle = computed(() => {
  const style: any = {}
  style.fontSize = useUnit(props.textSize)
  style.fontWeight = props.textWeight
  return useStyle(style)
})

watch(
  () => props.show,
  (val) => {
    visible.value = val
  },
  { immediate: true },
)

watch(
  () => visible.value,
  (val) => {
    emits("update:show", val)
  },
)

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
  border-color: currentcolor;
  border-style: solid;
  border-width: 1rpx;
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
    background-color: var(--ui-color-background);
  }

  @each $type in (primary, success, warning, danger, info) {
    &--#{$type} {
      color: var(--ui-color-background);
      border-color: var(--ui-color-#{$type});
      background-color: var(--ui-color-#{$type});

      &.ui-tag--plain {
        color: var(--ui-color-#{$type});
        background-color: var(--ui-color-background);
      }
    }
  }
}
</style>
