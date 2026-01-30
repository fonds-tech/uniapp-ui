<template>
  <view class="ui-text-ellipsis" :class="[customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-text-ellipsis__measure" :style="[measureStyle]">
      {{ props.content }}
    </view>
    <view class="ui-text-ellipsis__content" :style="[contentStyle]">
      {{ props.content }}
    </view>
    <view v-if="props.showAction && hasOverflow" class="ui-text-ellipsis__footer" :class="{ 'ui-text-ellipsis__footer--expanded': expanded }">
      <view v-if="!expanded" class="ui-text-ellipsis__gradient" :style="[gradientStyle]" />
      <view class="ui-text-ellipsis__action" :style="[actionStyle]" @click.stop="onToggle">
        {{ expanded ? props.collapseText : props.expandText }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useRects, useStyle } from "../hooks"
import { textEllipsisEmits, textEllipsisProps } from "./index"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-text-ellipsis" })

const props = defineProps(textEllipsisProps)
const emits = defineEmits(textEllipsisEmits)
const instance = getCurrentInstance()

const expanded = ref(false)
const hasOverflow = ref(false)

// 格式化数值类型的样式值
function formatNumericStyle(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === "number" ? `${value}rpx` : String(value)
}

const rootStyle = computed(() => useStyle(props.customStyle))

// 测量容器样式：隐藏但保持布局计算，用于获取文本完整高度
const measureStyle = computed(() => {
  const style: Record<string, string> = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    opacity: "0",
    zIndex: "-1",
    pointerEvents: "none",
  }
  if (props.color) style.color = props.color
  const fontSize = formatNumericStyle(props.fontSize)
  const lineHeight = formatNumericStyle(props.lineHeight)
  if (fontSize) style.fontSize = fontSize
  if (lineHeight) style.lineHeight = lineHeight
  return useStyle(style)
})

// 内容区样式：未展开时应用 line-clamp 截断
const contentStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) style.color = props.color
  const fontSize = formatNumericStyle(props.fontSize)
  const lineHeight = formatNumericStyle(props.lineHeight)
  if (fontSize) style.fontSize = fontSize
  if (lineHeight) style.lineHeight = lineHeight
  // 折叠状态下应用多行截断
  if (!expanded.value) {
    style.display = "-webkit-box"
    style.overflow = "hidden"
    style.webkitLineClamp = String(props.rows)
    style.webkitBoxOrient = "vertical"
  }
  return useStyle(style)
})

const actionStyle = computed(() => {
  return useStyle({ color: props.actionColor || "var(--ui-color-primary)" })
})

const gradientStyle = computed(() => {
  if (!props.gradientColor) return undefined
  return useStyle({ background: `linear-gradient(to bottom, transparent, ${props.gradientColor})` })
})

// 计算文本是否溢出：比较测量容器与内容容器的高度差
async function calcOverflow() {
  await nextTick()
  const [measureRects, contentRects] = await Promise.all([useRects(".ui-text-ellipsis__measure", instance), useRects(".ui-text-ellipsis__content", instance)])
  if (measureRects?.[0] && contentRects?.[0]) {
    // 容差 1px，避免浮点误差
    hasOverflow.value = (measureRects[0].height || 0) > (contentRects[0].height || 0) + 1
  }
}

function onToggle() {
  expanded.value = !expanded.value
  emits("change", expanded.value)
}

function onClick(event: Event) {
  emits("click", event)
}

// 监听内容和行数变化，重新计算溢出状态
watch(() => props.content, calcOverflow, { immediate: true })
watch(() => props.rows, calcOverflow)

onMounted(calcOverflow)

defineExpose({
  /** 切换展开/收起状态 */
  toggle: onToggle,
  /** 展开文本 */
  expand: () => {
    expanded.value = true
    emits("change", true)
  },
  /** 收起文本 */
  collapse: () => {
    expanded.value = false
    emits("change", false)
  },
})
</script>

<script lang="ts">
export default {
  name: "ui-text-ellipsis",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-text-ellipsis {
  width: 100%;
  position: relative;

  // 隐藏的测量容器
  &__measure {
    top: 0;
    left: 0;
    color: var(--ui-color-text-primary);
    right: 0;
    opacity: 0;
    z-index: -1;
    position: absolute;
    font-size: var(--ui-font-size-md);
    word-break: break-all;
    line-height: 1.5;
    pointer-events: none;
  }

  &__content {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-md);
    word-break: break-all;
    line-height: 1.5;
  }

  // 底部操作区：渐变遮罩 + 按钮
  &__footer {
    display: flex;
    position: relative;
    margin-top: -60rpx;
    align-items: center;
    padding-top: 60rpx;
    flex-direction: column;

    &--expanded {
      margin-top: 0;
      padding-top: var(--ui-spacing-sm);
    }
  }

  // 渐变遮罩层
  &__gradient {
    top: 0;
    left: 0;
    right: 0;
    height: 60rpx;
    position: absolute;
    background: linear-gradient(to bottom, transparent, #ffffff);
    pointer-events: none;
  }

  // 展开/收起按钮
  &__action {
    color: var(--ui-color-primary);
    display: inline-flex;
    font-size: var(--ui-font-size-xs);
  }
}
</style>
