<template>
  <view class="ui-index-anchor" :class="[classs, customClass]" :style="[style]">
    <slot>
      <view class="ui-index-anchor__index" :style="[indexStyle]">{{ text }}</view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { indexBarKey } from "../ui-index-bar"
import { indexAnchorProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-index-anchor" })

// 定义 props
const props = defineProps(indexAnchorProps)

// 获取父组件
const { index, parent } = useParent(indexBarKey)

// 锚点元素位置信息
const rect = ref<UniApp.NodeInfo>(null)
// 组件实例
const instance = getCurrentInstance()

// 动态类名
const classs = computed(() => {
  const list: any = []
  if (isActive.value) list.push("is-active")
  return list
})

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (isActive.value) style.background = useColor(props.stickyBackground)
  if (parent?.props?.sticky) {
    style.top = 0
    style.position = "sticky"
    // 动态 z-index: 后面的锚点覆盖前面的锚点
    style.zIndex = index.value + 1
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 索引文字样式
const indexStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  if (isActive.value) {
    style.color = useColor(props.stickyColor)
    style.fontSize = useUnit(props.stickyFontSize)
    style.fontWeight = props.stickyFontWeight
  }
  return useStyle(style)
})

// 锚点名称
const name = computed(() => (isDef(props.name) ? props.name : index.value))
// 是否激活
const isActive = computed(() => parent?.currentName?.value === name.value)

// 重新计算位置
async function resize() {
  rect.value = await useRect(".ui-index-anchor", instance)
}

defineExpose({ rect, name, resize })
</script>

<script lang="ts">
export default {
  name: "ui-index-anchor",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-index-anchor {
  height: 60rpx;
  display: flex;
  align-items: center;

  &.is-active {
    color: var(--ui-color-primary);
    background-color: var(--ui-color-text-inverse);
  }

  &__index {
    flex: 1;
    padding: 12rpx 24rpx;
  }
}
</style>
