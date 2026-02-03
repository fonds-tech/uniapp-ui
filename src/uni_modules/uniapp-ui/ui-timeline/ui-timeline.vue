<template>
  <view class="ui-timeline" :class="[classes, customClass]" :style="[style]">
    <slot />
    <!-- 加载中状态 -->
    <view v-if="pending" class="ui-timeline__pending">
      <view class="ui-timeline__pending-dot">
        <ui-loading size="24rpx" />
      </view>
      <view class="ui-timeline__pending-content">
        <slot name="pending">加载中...</slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useStyle, useChildren } from "../hooks"
import { timelineKey, timelineEmits, timelineProps } from "./index"

defineOptions({ name: "ui-timeline" })

const props = defineProps(timelineProps)
const emits = defineEmits(timelineEmits)
const { childrens, linkChildren } = useChildren(timelineKey)

/**
 * 子组件数量
 */
const count = computed(() => childrens.length)

/**
 * 组件容器样式
 */
const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

/**
 * 组件容器类名
 */
const classes = computed(() => {
  const list: string[] = []
  list.push(`ui-timeline--${props.mode}`)
  if (props.reverse) {
    list.push("ui-timeline--reverse")
  }
  if (props.pending) {
    list.push("ui-timeline--pending")
  }
  return list
})

/**
 * 点击时间轴项事件处理
 */
function onClickItem(index: number) {
  emits("clickItem", index)
}

linkChildren({ props, count, onClickItem })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-timeline {
  display: flex;
  flex-direction: column;

  &--reverse {
    flex-direction: column-reverse;
  }

  &__pending {
    display: flex;
    align-items: flex-start;
  }

  &__pending-dot {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
  }

  &__pending-content {
    flex: 1;
    color: var(--ui-color-text-secondary);
    font-size: 28rpx;
    padding-left: 24rpx;
  }
}
</style>
