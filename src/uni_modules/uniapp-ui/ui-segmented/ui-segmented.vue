<template>
  <view class="ui-segmented" :class="[rootClasses, props.customClass]" :style="rootStyle" role="tablist">
    <!-- 非 scrollable：indicator + 等宽 items -->
    <template v-if="!props.scrollable">
      <view v-if="showIndicator" class="ui-segmented__indicator" :style="indicatorStyle" />
      <view
        v-for="(option, index) in props.options"
        :key="option.value"
        class="ui-segmented__item"
        :class="itemClassMap[index]"
        :style="itemStyle(option)"
        role="tab"
        :aria-selected="option.value === props.modelValue"
        :aria-disabled="!!(option.disabled || props.disabled)"
        @click="handleClick(option, index)"
      >
        <ui-icon v-if="option.icon" :name="option.icon" class="ui-segmented__icon" color="currentColor" :size="iconSize" />
        <text class="ui-segmented__text">{{ option.label }}</text>
      </view>
    </template>
    <!-- scrollable：滚动容器内 items (无浮动 indicator，激活项靠 bg 样式呈现) -->
    <scroll-view v-else scroll-x scroll-with-animation class="ui-segmented__scroll" :show-scrollbar="false" :scroll-left="scrollLeft">
      <view class="ui-segmented__track">
        <view
          v-for="(option, index) in props.options"
          :id="`segmented-${index}`"
          :key="option.value"
          class="ui-segmented__item"
          :class="itemClassMap[index]"
          :style="itemStyle(option)"
          role="tab"
          :aria-selected="option.value === props.modelValue"
          :aria-disabled="!!(option.disabled || props.disabled)"
          @click="handleClick(option, index)"
        >
          <ui-icon v-if="option.icon" :name="option.icon" class="ui-segmented__icon" color="currentColor" :size="iconSize" />
          <text class="ui-segmented__text">{{ option.label }}</text>
        </view>
      </view>
    </scroll-view>
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

const scrollLeft = ref(0)
const inited = ref(false)
const instance = getCurrentInstance()!

// 当前激活 index：直接从 modelValue 派生 (-1 表示无匹配)
const activeIndex = computed(() => props.options.findIndex((o) => o.value === props.modelValue))

// 是否渲染浮动 indicator (scrollable / outline / 无匹配项 时不渲染)
const showIndicator = computed(() => !props.scrollable && activeIndex.value >= 0 && (props.type === "filled" || props.type === "block"))

// 图标尺寸跟随字号
const iconSize = computed(() => useUnit(props.fontSize))

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.padding = useUnit(props.indicatorGap)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名 (block prop 用 --full 避免跟 type="block" 碰撞)
const rootClasses = computed(() => [
  `ui-segmented--${props.type}`,
  {
    "ui-segmented--scrollable": props.scrollable,
    "ui-segmented--full": props.block,
    "ui-segmented--round": props.round,
    "ui-segmented--disabled": props.disabled,
  },
])

// 滑块样式 (等宽假设：仅 non-scrollable 走此路径)
const indicatorStyle = computed<CSSProperties>(() => {
  const count = props.options.length
  if (count === 0) return {}
  const gap = useUnit(props.indicatorGap)
  const itemWidth = `(100% - ${gap} * 2) / ${count}`
  const style: CSSProperties = {
    width: `calc(${itemWidth})`,
    height: `calc(100% - ${gap} * 2)`,
    left: `calc(${gap} + ${activeIndex.value} * (${itemWidth}))`,
  }
  if (props.activeColor) style.backgroundColor = useColor(props.activeColor)
  if (props.radius) style.borderRadius = useUnit(props.radius)
  return useStyle(style)
})

// 选项类名 map (按 index 缓存)
const itemClassMap = computed(() =>
  props.options.map((option) => ({
    "ui-segmented__item--active": option.value === props.modelValue,
    "ui-segmented__item--disabled": option.disabled || props.disabled,
  })),
)

// 选项基础样式
const itemBaseStyle = computed(() => ({
  height: useUnit(props.height),
  lineHeight: useUnit(props.height),
  fontSize: useUnit(props.fontSize),
  padding: `0 ${useUnit(props.itemPadding)}`,
}))

// 选项样式 (含激活态颜色覆盖)
function itemStyle(option: SegmentedOption): CSSProperties {
  const isActive = option.value === props.modelValue
  const style: CSSProperties = { ...itemBaseStyle.value }
  if (isActive) {
    if (props.activeTextColor) style.color = useColor(props.activeTextColor)
  } else {
    if (props.inactiveColor) style.backgroundColor = useColor(props.inactiveColor)
    if (props.inactiveTextColor) style.color = useColor(props.inactiveTextColor)
  }
  return useStyle(style)
}

// 滚动到指定选项居中 (仅 scrollable)
async function scrollToCenter(index: number) {
  if (!props.scrollable || index < 0) return
  await nextTick()
  // virtualHost 下根 class 不一定挂在自身节点，用 scroll-view 自身 selector 更稳
  const containerRect = await useRect(".ui-segmented__scroll", instance)
  if (!containerRect?.width) return
  const itemRects = await useRects(".ui-segmented__item", instance)
  if (!itemRects?.length) return
  let offset = 0
  for (let i = 0; i < index; i++) offset += itemRects[i]?.width || 0
  const itemCenter = offset + (itemRects[index]?.width || 0) / 2
  const scrollCenter = containerRect.width / 2
  scrollLeft.value = Math.max(0, itemCenter - scrollCenter)
}

// 监听激活 index 变更：mounted 后才滚动 (避免初始重复)
watch(activeIndex, (i) => {
  if (inited.value) scrollToCenter(i)
})

// options 列表变化时重新测量 + 居中
watch(
  () => props.options.length,
  () => {
    if (inited.value) scrollToCenter(activeIndex.value)
  },
)

onMounted(async () => {
  await nextTick()
  if (props.scrollable) await scrollToCenter(activeIndex.value)
  inited.value = true
})

// 处理点击：disabled 项静默 (不 emit click 也不 emit change)
function handleClick(option: SegmentedOption, index: number) {
  if (props.disabled || option.disabled) return
  emits("click", option, index)
  if (option.value === props.modelValue) return
  emits("update:modelValue", option.value)
  emits("change", option.value)
}
</script>

<script lang="ts">
export default {
  name: "ui-segmented",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-segmented {
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: stretch;
  border-radius: var(--ui-radius-sm);
  background-color: var(--ui-color-background-section);

  // scrollable：必须 width 100% 才有可滚的边界 (flex 父 align center 下不会自动 stretch)
  &--scrollable {
    width: 100%;
    display: block;
    overflow: hidden;
    min-width: 0;
  }

  &__scroll {
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
  }

  &__track {
    display: inline-flex;
    position: relative;
    align-items: stretch;
    white-space: nowrap;

    .ui-segmented__item {
      flex: none;
    }
  }

  // block prop (撑满父容器)
  &--full {
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

  // filled (默认)：indicator 主色 + 激活反色文字
  &--filled {
    .ui-segmented__indicator {
      background-color: var(--ui-color-primary);
    }

    .ui-segmented__item--active {
      color: var(--ui-color-text-inverse);
    }
  }

  // block：indicator 白底 + 阴影；激活项文字提到默认色 (避免灰底卡片对比度差)
  &--block {
    .ui-segmented__indicator {
      box-shadow: var(--ui-shadow-xs);
      background-color: var(--ui-color-background);
    }

    .ui-segmented__item--active {
      color: var(--ui-color-text);
    }
  }

  // outline：边框 + 激活 light 背景，无 indicator
  &--outline {
    border: var(--ui-border-width) solid var(--ui-color-primary);
    background-color: transparent;

    .ui-segmented__item--active {
      color: var(--ui-color-primary);
      background-color: var(--ui-color-primary-light);
    }
  }

  // scrollable 模式：浮动 indicator 不渲染，激活项靠 bg 呈现
  &--scrollable {
    &.ui-segmented--filled .ui-segmented__item--active {
      color: var(--ui-color-text-inverse);
      background-color: var(--ui-color-primary);
    }

    &.ui-segmented--block .ui-segmented__item--active {
      color: var(--ui-color-text);
      box-shadow: var(--ui-shadow-xs);
      background-color: var(--ui-color-background);
    }
  }

  &__indicator {
    top: 50%;
    z-index: 0;
    position: absolute;
    transform: translateY(-50%);
    transition:
      left var(--ui-transition-duration) var(--ui-transition-timing),
      width var(--ui-transition-duration) var(--ui-transition-timing),
      height var(--ui-transition-duration) var(--ui-transition-timing),
      border-radius var(--ui-transition-duration) var(--ui-transition-timing),
      background-color var(--ui-transition-duration) var(--ui-transition-timing);
    border-radius: var(--ui-radius-sm);
  }

  &__item {
    gap: var(--ui-spacing-xs);
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
      background-color var(--ui-transition-fast) var(--ui-transition-timing);
    align-items: center;
    font-weight: var(--ui-font-weight-normal);
    white-space: nowrap;
    border-radius: var(--ui-radius-sm);
    justify-content: center;

    &--active {
      font-weight: var(--ui-font-weight-medium);
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
