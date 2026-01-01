<template>
  <view class="ui-text-ellipsis" :class="[customClass]" :style="[style]" @click="onClick">
    <text class="ui-text-ellipsis__col">{{ colText }}</text>
    <text class="ui-text-ellipsis__placeholder">{{ text }}</text>
    <view v-if="isShowTail" class="ui-text-ellipsis__tail" :class="{ 'ui-text-ellipsis__action--expand': expand }" @click="onClickExpand">
      <text v-if="isShowDots" class="ui-text-ellipsis__dots" :style="[dotsStyle]">{{ dots }}</text>
      <slot :expand="expand">
        <text class="ui-text-ellipsis__action" :style="[actionStyle]">{{ expand ? useProps.collapseText : useProps.expandText }}</text>
      </slot>
    </view>
    {{ text }}
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useRect, useUnit, useColor, useStyle } from "../hooks"
import { textEllipsisEmits, textEllipsisProps, useTextEllipsisProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-text-ellipsis" })

// 定义props和emits
const props = defineProps(textEllipsisProps)
const emits = defineEmits(textEllipsisEmits)
const useProps = useTextEllipsisProps(props)
// 定义refs用于存储DOM元素的尺寸信息
const rect = ref<UniApp.NodeInfo>(null)
const colRect = ref<UniApp.NodeInfo>(null)
const fullRect = ref<UniApp.NodeInfo>(null)

// 控制文本是否展开的状态
const expand = ref(false)
// 获取当前组件实例
const instance = getCurrentInstance()

// 计算组件的样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.color)
  style.fontWeight = useProps.weight
  style.lineHeight = useUnit(useProps.lineHeight)
  // 如果未展开且有列高度，设置最大高度
  if (!expand.value && colRect.value?.height) {
    style.maxHeight = `calc(${colRect.value.height}px * ${useProps.rows})`
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

// 计算省略号的样式
const dotsStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.color)
  style.fontWeight = useProps.weight
  style.lineHeight = useUnit(useProps.lineHeight)
  return useStyle(style)
})

// 计算展开/收起按钮的样式
const actionStyle = computed(() => {
  const style: CSSProperties = {}
  style.fontWeight = useProps.weight
  style.lineHeight = useUnit(useProps.lineHeight)
  style.color = useColor(expand.value ? useProps.collapseTextColor : useProps.expandTextColor)
  return useStyle(style)
})

// 获取文本的第一个字符（优先选择中文字符）
const colText = computed(() => {
  const matched = useProps.text.match(/[\u4E00-\u9FA5]/)
  if (matched) return matched[0]
  return useProps.text?.slice(0, 1) || ""
})

// 判断是否需要显示尾部（展开/收起按钮）
const isShowTail = computed(() => {
  const maxHeihgt = Math.floor(colRect.value?.height * +useProps.rows)
  return fullRect.value?.height > maxHeihgt && useProps.text
})

// 判断是否显示省略号
const isShowDots = computed(() => useProps.dots && !expand.value)

// 监听文本变化，触发重新计算尺寸
watch(() => useProps.text, resize, { immediate: true })

// 重新计算各元素尺寸
async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-text-ellipsis", instance)
  colRect.value = await useRect(".ui-text-ellipsis__col", instance)
  fullRect.value = await useRect(".ui-text-ellipsis__placeholder", instance)
}

// 点击整个组件时触发的事件
function onClick() {
  emits("click")
}

// 点击展开/收起按钮时触发的事件
function onClickExpand() {
  expand.value = !expand.value
}
</script>

<script lang="ts">
export default {
  name: "ui-text-ellipsis",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-text-ellipsis {
  overflow: hidden;
  position: relative;
  font-size: 24rpx;
  text-align: justify;
  flex-shrink: 1;
  line-height: 36rpx;
  &::before {
    float: right;
    width: 0;
    height: 100%;
    content: "";
    font-size: 24rpx;
    margin-bottom: -34rpx;
  }

  &__col {
    top: 0;
    left: 0;
    width: min-content;
    opacity: 0;
    position: absolute;
  }

  &__placeholder {
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    position: absolute;
  }

  &__tail {
    clear: both;
    color: #c5c5c5;
    float: right;
    width: 68rpx;
    position: relative;
    text-align: right;
  }
}
</style>
