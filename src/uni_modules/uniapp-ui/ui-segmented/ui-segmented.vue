<template>
  <scroll-view
    v-if="props.scrollable"
    scroll-x
    scroll-with-animation
    class="ui-segmented ui-segmented--scrollable"
    :class="[rootClasses, props.customClass]"
    :style="[rootStyle]"
    :show-scrollbar="false"
    :scroll-left="scrollLeft"
  >
    <view class="ui-segmented__track">
      <!-- 滑块背景 -->
      <view v-if="props.type === 'filled' || props.type === 'block'" class="ui-segmented__indicator" :style="[indicatorStyle]" />
      <!-- 选项 -->
      <view
        v-for="(option, index) in props.options"
        :id="`segmented-${index}`"
        :key="option.value"
        class="ui-segmented__item"
        :class="[itemClasses(option)]"
        :style="[itemStyle(option)]"
        @click="handleClick(option, index)"
      >
        <ui-icon v-if="option.icon" :name="option.icon" class="ui-segmented__icon" :size="iconSize" />
        <text class="ui-segmented__text">{{ option.label }}</text>
      </view>
    </view>
  </scroll-view>
  <view v-else class="ui-segmented" :class="[rootClasses, props.customClass]" :style="[rootStyle]">
    <!-- 滑块背景 -->
    <view v-if="props.type === 'filled' || props.type === 'block'" class="ui-segmented__indicator" :style="[indicatorStyle]" />
    <!-- 选项 -->
    <view
      v-for="(option, index) in props.options"
      :key="option.value"
      class="ui-segmented__item"
      :class="[itemClasses(option)]"
      :style="[itemStyle(option)]"
      @click="handleClick(option, index)"
    >
      <ui-icon v-if="option.icon" :name="option.icon" class="ui-segmented__icon" :size="iconSize" />
      <text class="ui-segmented__text">{{ option.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SegmentedOption } from "./index"
import { segmentedEmits, segmentedProps } from "./index"
import { useRect, useUnit, useColor, useRects, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-segmented" })

const props = defineProps(segmentedProps)
const emits = defineEmits(segmentedEmits)

// 当前选中索引
const activeIndex = ref(0)
// 每个选项的宽度（用于滑块动画）
const itemWidth = ref(0)

// 监听 modelValue 变化更新索引
watch(
  () => props.modelValue,
  (val) => {
    const index = props.options.findIndex((opt) => opt.value === val)
    if (index !== -1) activeIndex.value = index
  },
  { immediate: true },
)

// 监听 options 变化计算宽度
watch(
  () => props.options,
  () => {
    nextTick(() => {
      if (props.options.length > 0) {
        itemWidth.value = 100 / props.options.length
      }
    })
  },
  { immediate: true },
)

// 组件实例
const instance = getCurrentInstance()!
// 滚动距离
const scrollLeft = ref(0)
// 是否已初始化
const inited = ref(false)

// 滚动到指定选项居中
async function scrollToCenter(index: number) {
  if (!props.scrollable) return
  await nextTick()

  // 获取容器宽度
  const containerRect = await useRect(".ui-segmented--scrollable", instance)
  if (!containerRect) return

  // 获取所有选项的宽度
  const itemRects = await useRects(".ui-segmented__item", instance)
  if (!itemRects || !Array.isArray(itemRects) || itemRects.length === 0) return

  // 计算目标选项的中心位置
  let offset = 0
  for (let i = 0; i < index; i++) {
    offset += itemRects[i]?.width || 0
  }
  const itemCenter = offset + (itemRects[index]?.width || 0) / 2
  const scrollCenter = (containerRect.width || 0) / 2

  scrollLeft.value = Math.max(0, itemCenter - scrollCenter)
}

// 监听 modelValue 变化滚动到居中
watch(
  () => activeIndex.value,
  (index) => {
    if (inited.value) {
      scrollToCenter(index)
    }
  },
)

// 初始化时滚动到当前选中项
onMounted(async () => {
  await nextTick()
  if (props.scrollable) {
    scrollToCenter(activeIndex.value)
    setTimeout(() => (inited.value = true), 100)
  }
})

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.padding = useUnit(props.indicatorGap)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClasses = computed(() => [
  `ui-segmented--${props.type}`,
  {
    "ui-segmented--block": props.block,
    "ui-segmented--round": props.round,
    "ui-segmented--disabled": props.disabled,
  },
])

// 滑块样式
const indicatorStyle = computed<CSSProperties>(() => {
  const count = props.options.length
  if (count === 0) return {}
  const gap = useUnit(props.indicatorGap)
  // 选项宽度 = (100% - 左右 gap) / 选项数量
  const itemWidth = `(100% - ${gap} * 2) / ${count}`
  // 滑块宽度和位置与选项对齐
  return {
    width: `calc(${itemWidth})`,
    height: `calc(100% - ${gap} * 2)`,
    left: `calc(${gap} + ${activeIndex.value} * ${itemWidth})`,
    backgroundColor: props.activeColor ? useColor(props.activeColor) : undefined,
    borderRadius: props.radius ? useUnit(props.radius) : undefined,
  }
})

// 图标尺寸
const iconSize = computed(() => useUnit(props.fontSize))

// 选项通用样式
const itemBaseStyle = computed<CSSProperties>(() => {
  return {
    height: useUnit(props.height),
    lineHeight: useUnit(props.height),
    fontSize: useUnit(props.fontSize),
  }
})

// 滑块高度样式
const indicatorHeightStyle = computed<CSSProperties>(() => {
  if (props.height) {
    return { height: `calc(${useUnit(props.height)} - 8rpx)` }
  }
  return {}
})

// 选项类名
function itemClasses(option: SegmentedOption) {
  const isActive = option.value === props.modelValue
  return {
    "ui-segmented__item--active": isActive,
    "ui-segmented__item--disabled": option.disabled || props.disabled,
  }
}

// 选项样式
function itemStyle(option: SegmentedOption): CSSProperties {
  const isActive = option.value === props.modelValue
  const style: CSSProperties = { ...itemBaseStyle.value }
  if (isActive) {
    if (props.activeTextColor) style.color = useColor(props.activeTextColor)
  } else {
    if (props.inactiveColor) style.backgroundColor = useColor(props.inactiveColor)
    if (props.inactiveTextColor) style.color = useColor(props.inactiveTextColor)
  }
  return style
}

// 处理点击
function handleClick(option: SegmentedOption, index: number) {
  if (props.disabled || option.disabled) return
  emits("click", option)
  if (option.value !== props.modelValue) {
    activeIndex.value = index
    emits("update:modelValue", option.value)
    emits("change", option.value)
  }
}
</script>

<script lang="ts">
export default {
  name: "ui-segmented",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-segmented {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: stretch;
  border-radius: 8rpx;
  background-color: var(--ui-color-background-section);

  // 滚动模式
  &--scrollable {
    display: block;

    .ui-segmented__track {
      display: inline-flex;
      position: relative;
      align-items: stretch;
      white-space: nowrap;
    }

    .ui-segmented__item {
      flex: none;
    }
  }

  &--block {
    width: 100%;
  }

  &--round {
    border-radius: var(--ui-radius-round);

    .ui-segmented__indicator,
    .ui-segmented__item {
      border-radius: var(--ui-radius-round);
    }
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  // ===== 样式变体 =====
  // Filled 样式（默认）- 主题色滑块
  &--filled:not(&--block) {
    .ui-segmented__indicator {
      background-color: var(--ui-color-primary);
    }

    .ui-segmented__item--active {
      color: var(--ui-color-text-inverse);
    }
  }

  // Block 样式 + 默认 Block 模式 - 白色滑块带阴影
  &--block {
    .ui-segmented__indicator {
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
      background-color: var(--ui-color-background);
    }
  }

  // Outline 样式
  &--outline {
    border: var(--ui-border-width) solid var(--ui-color-primary);
    background-color: transparent;

    .ui-segmented__indicator {
      display: none;
    }

    .ui-segmented__item--active {
      color: var(--ui-color-primary);
      background-color: var(--ui-color-primary-light);
    }
  }

  &__indicator {
    top: 50%;
    z-index: 0;
    position: absolute;
    transform: translateY(-50%);
    transition:
      left var(--ui-transition-duration) var(--ui-transition-timing),
      width var(--ui-transition-duration) var(--ui-transition-timing);
    border-radius: 8rpx;
  }

  &__item {
    gap: 8rpx;
    flex: 1;
    color: var(--ui-color-text-secondary);
    cursor: pointer;
    display: flex;
    z-index: 1;
    position: relative;
    min-width: 0;
    text-align: center;
    transition:
      color var(--ui-transition-fast) var(--ui-transition-timing),
      font-weight var(--ui-transition-fast) var(--ui-transition-timing);
    align-items: center;
    font-weight: 400;
    white-space: nowrap;
    border-radius: 8rpx;
    justify-content: center;

    &--active {
      font-weight: 550;
    }

    &--disabled {
      color: var(--ui-color-text-placeholder);
      cursor: not-allowed;
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
