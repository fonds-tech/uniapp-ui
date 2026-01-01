<template>
  <view class="ui-back-top" hover-class="ui-back-top--hover" :hover-stay-time="100" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <slot>
      <view class="ui-back-top__content">
        <ui-icon name="back-top" size="40rpx" color="#fff" weight="bold" />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { backTopEmits, backTopProps, useBackTopProps } from "./index"
import { useMitt, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-back-top" })

// 定义props和emits
const props = defineProps(backTopProps)
const emits = defineEmits(backTopEmits)
const useProps = useBackTopProps(props)

// 使用mitt事件总线
const mitt = useMitt()
// 控制组件是否可见的响应式变量
const visible = ref(false)

// 计算组件的class列表
const classs = computed(() => {
  const list: string[] = []
  // 当visible为true时,添加active类
  if (visible.value) list.push("ui-back-top--active")
  return list
})

// 计算组件的样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.zIndex = useProps.zIndex
  style.right = useUnit(useProps.right)
  style.bottom = useUnit(useProps.bottom)
  style.background = useColor(useProps.background)
  style.borderRadius = useUnit(useProps.borderRadius)
  // 合并自定义样式
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 监听滚动事件
function onEvent() {
  mitt.on("scroll", (options: { scrollTop: number }) => {
    // 当滚动位置超过设定的偏移量时,显示组件
    visible.value = options.scrollTop >= useUnitToPx(useProps.offset)
  })
}

// 点击事件处理函数
function onClick() {
  // 滚动到页面顶部
  uni.pageScrollTo({ scrollTop: 0, duration: +useProps.duration })
  // 触发click事件
  emits("click")
}

onEvent()
</script>

<script lang="ts">
export default {
  name: "ui-back-top",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-back-top {
  right: var(--ui-spacing-xl);
  bottom: 200rpx;
  display: flex;
  position: fixed;
  transform: scale(0);
  transition: var(--ui-transition-duration) cubic-bezier(0.25, 0.8, 0.5, 1);
  border-radius: var(--ui-radius-round);
  background-color: var(--ui-color-primary);

  &--hover {
    opacity: var(--ui-opacity-active);
  }

  &--active {
    transform: scale(1);
  }

  &__content {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    box-shadow: var(--ui-shadow-md);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }
}
</style>
