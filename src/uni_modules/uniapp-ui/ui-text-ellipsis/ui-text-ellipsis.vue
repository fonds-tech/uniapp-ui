<template>
  <view class="ui-text-ellipsis" :class="[customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-text-ellipsis__measure">
      {{ props.content }}
    </view>
    <view class="ui-text-ellipsis__content" :style="[contentStyle]">
      {{ props.content }}
    </view>
    <view v-if="props.showAction && hasOverflow" class="ui-text-ellipsis__footer" :class="{ 'ui-text-ellipsis__footer--expanded': expanded }">
      <view v-if="!expanded" class="ui-text-ellipsis__gradient" />
      <view class="ui-text-ellipsis__action" @click.stop="onToggle">
        {{ expanded ? props.collapseText : props.expandText }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { textEllipsisEmits, textEllipsisProps } from "./index"
import { useUnit, useColor, useRects, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-text-ellipsis" })

const props = defineProps(textEllipsisProps)
const emits = defineEmits(textEllipsisEmits)
const instance = getCurrentInstance()

const expanded = ref(false)
const hasOverflow = ref(false)

// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | undefined> = {}
  if (props.color) vars["--ui-text-ellipsis-color"] = useColor(props.color)
  if (props.fontSize) vars["--ui-text-ellipsis-font-size"] = useUnit(props.fontSize)
  if (props.lineHeight) vars["--ui-text-ellipsis-line-height"] = String(props.lineHeight)
  if (props.actionColor) vars["--ui-text-ellipsis-action-color"] = useColor(props.actionColor)
  if (props.gradientColor) vars["--ui-text-ellipsis-gradient-color"] = useColor(props.gradientColor)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

// 内容区样式：折叠时 line-clamp，展开时无限制
const contentStyle = computed<CSSProperties>(() => {
  if (expanded.value) return {}
  return {
    display: "-webkit-box",
    overflow: "hidden",
    "-webkit-line-clamp": String(props.rows),
    "-webkit-box-orient": "vertical",
  } as CSSProperties
})

watch(() => props.content, calcOverflow, { immediate: true })
watch(() => props.rows, calcOverflow)

// 比较测量容器与内容容器高度差判断是否溢出
async function calcOverflow() {
  await nextTick()
  const [measureRects, contentRects] = await Promise.all([useRects(".ui-text-ellipsis__measure", instance), useRects(".ui-text-ellipsis__content", instance)])
  if (measureRects?.[0] && contentRects?.[0]) {
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

onMounted(calcOverflow)

defineExpose({
  toggle: onToggle,
  expand: () => {
    expanded.value = true
    emits("change", true)
  },
  collapse: () => {
    expanded.value = false
    emits("change", false)
  },
})
</script>

<script lang="ts">
export default {
  name: "ui-text-ellipsis",
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
.ui-text-ellipsis {
  --ui-text-ellipsis-color: var(--ui-color-text);
  --ui-text-ellipsis-font-size: var(--ui-font-size-md);
  --ui-text-ellipsis-fade-height: 60rpx;
  --ui-text-ellipsis-line-height: var(--ui-line-height-normal);
  --ui-text-ellipsis-action-color: var(--ui-color-primary);
  --ui-text-ellipsis-gradient-color: var(--ui-color-background);

  width: 100%;
  position: relative;

  // 隐藏测量容器：用于获取完整文本高度
  &__measure {
    top: 0;
    left: 0;
    color: var(--ui-text-ellipsis-color);
    right: 0;
    opacity: 0;
    z-index: -1;
    position: absolute;
    font-size: var(--ui-text-ellipsis-font-size);
    word-break: break-all;
    line-height: var(--ui-text-ellipsis-line-height);
    pointer-events: none;
  }

  &__content {
    color: var(--ui-text-ellipsis-color);
    font-size: var(--ui-text-ellipsis-font-size);
    word-break: break-all;
    line-height: var(--ui-text-ellipsis-line-height);
  }

  // 底部操作区：渐变 + 按钮
  &__footer {
    display: flex;
    position: relative;
    margin-top: calc(var(--ui-text-ellipsis-fade-height) * -1);
    align-items: center;
    padding-top: var(--ui-text-ellipsis-fade-height);
    flex-direction: column;

    &--expanded {
      margin-top: 0;
      padding-top: var(--ui-spacing-sm);
    }
  }

  &__gradient {
    top: 0;
    left: 0;
    right: 0;
    height: var(--ui-text-ellipsis-fade-height);
    position: absolute;
    background: linear-gradient(to bottom, transparent, var(--ui-text-ellipsis-gradient-color));
    pointer-events: none;
  }

  &__action {
    color: var(--ui-text-ellipsis-action-color);
    display: inline-flex;
    font-size: var(--ui-font-size-xs);
  }
}
</style>
