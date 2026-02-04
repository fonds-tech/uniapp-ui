<template>
  <view class="ui-collapse-item" :class="[rootClass, props.customClass]" :style="[rootStyle]">
    <!-- 头部区域 -->
    <view
      class="ui-collapse-item__header"
      :class="[headerClass]"
      :hover-class="hoverClass"
      :hover-stay-time="50"
      @click="onClickHeader"
    >
      <slot name="title" :expanded="expanded" :disabled="props.disabled">
        <text class="ui-collapse-item__title">{{ props.title }}</text>
      </slot>
      <!-- 右侧箭头 -->
      <view v-if="props.isLink" class="ui-collapse-item__arrow" :class="[arrowClass]">
        <ui-icon name="down" />
      </view>
    </view>

    <!-- 内容区域（带展开/收起动画） -->
    <view class="ui-collapse-item__wrapper" :style="[wrapperStyle]" @transitionend="onTransitionEnd">
      <view :id="contentId" class="ui-collapse-item__body">
        <slot />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { collapseKey } from "../ui-collapse"
import { useRect, useStyle, useParent } from "../hooks"
import { collapseItemEmits, collapseItemProps } from "./index"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-collapse-item" })

const props = defineProps(collapseItemProps)
const emits = defineEmits(collapseItemEmits)

// 获取父组件
const { index, parent } = useParent(collapseKey)

// 组件实例
const instance = getCurrentInstance()!

// 内容区域 ID
const contentId = ref(`collapse-body-${uuid()}`)

// 内容区域高度
const height = ref<number | string>("")

// 是否已初始化（用于首次加载不播放动画）
const inited = ref(false)

// 内部展开状态（用于控制动画）
const expanded = ref(false)

// 是否被选中（来自父组件）
const isSelected = computed(() => {
  if (!parent) return false
  return parent.activeNames.value.includes(props.name)
})

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 根节点类名
const rootClass = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-collapse-item--disabled")
  if (props.readonly) list.push("ui-collapse-item--readonly")
  if (expanded.value) list.push("ui-collapse-item--expanded")
  return list
})

// 头部类名
const headerClass = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__header--expanded")
  return list
})

// 点击态类名
const hoverClass = computed(() => {
  if (props.disabled || props.readonly) return ""
  return "ui-collapse-item__header--active"
})

// 箭头类名
const arrowClass = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__arrow--expanded")
  return list
})

// 包裹器样式（控制展开/收起动画）
const wrapperStyle = computed(() => {
  const style: CSSProperties = {}

  // 初始化后启用动画
  if (inited.value) {
    style.transition = "height 0.3s ease-in-out"
  }

  // 收起状态
  if (!expanded.value) {
    style.height = "0px"
  } else if (height.value) {
    // 展开状态，有高度值时使用具体高度
    style.height = typeof height.value === "number" ? `${height.value}px` : height.value
  }
  // expanded 为 true 且 height 为空时，不设置 height，让内容自适应

  return useStyle(style)
})

// 等待一帧
function pause() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 20)
  })
}

// 获取内容高度并更新展开状态
async function initRect() {
  const rect = await useRect(`#${contentId.value}`, instance)
  if (rect) {
    height.value = rect.height || 0
  }

  await pause()

  // 设置展开状态
  expanded.value = isSelected.value

  // 标记初始化完成
  if (!inited.value) {
    inited.value = true
  }
}

// 动画结束处理
function onTransitionEnd() {
  // 展开完成后，清空高度让内容自适应
  if (expanded.value) {
    height.value = ""
  }
}

// 监听选中状态变化
watch(
  () => isSelected.value,
  () => {
    initRect()
  },
)

// 切换展开状态
function toggle(expand?: boolean) {
  if (props.disabled || props.readonly) return
  if (!parent) return

  const targetExpanded = expand !== undefined ? expand : !expanded.value
  parent.toggle(props.name, targetExpanded)
}

// 点击头部
function onClickHeader(event: any) {
  emits("click", event)
  toggle()
}

// 组件挂载时初始化
onMounted(() => {
  initRect()
})

defineExpose({
  name: props.name,
  expanded,
  toggle,
})
</script>

<script lang="ts">
export default {
  name: "ui-collapse-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-collapse-item {
  position: relative;
  background-color: var(--ui-color-background);

  &--disabled {
    .ui-collapse-item__header {
      cursor: not-allowed;
    }

    .ui-collapse-item__title {
      color: var(--ui-color-text-disabled);
    }

    .ui-collapse-item__arrow {
      color: var(--ui-color-text-disabled);
    }
  }

  &--readonly {
    cursor: default;
  }

  &__header {
    cursor: pointer;
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    overflow: hidden;
    position: relative;
    align-items: center;
    user-select: none;
    justify-content: space-between;

    // 底部分割线（只在收起状态且不是最后一个 item 时显示）
    &::after {
      left: 0;
      right: 0;
      bottom: 0;
      content: "";
      position: absolute;
      border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
      pointer-events: none;
    }

    &--active {
      background-color: var(--ui-color-active);
    }
  }

  // 展开状态：内容区域也显示底部边框
  &--expanded &__body::after {
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    position: absolute;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    pointer-events: none;
  }

  // 最后一个 item 收起时不显示底部边框
  &:last-child:not(&--expanded) &__header::after {
    display: none;
  }

  // 最后一个 item 展开时不显示内容底部边框
  &:last-child &__body::after {
    display: none;
  }

  &__title {
    flex: 1;
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-md);
    font-weight: 500;
  }

  &__arrow {
    color: var(--ui-color-text-tertiary);
    display: block;
    font-size: 24rpx;
    transition: transform 0.3s;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-sm);

    &--expanded {
      transform: rotate(-180deg);
    }
  }

  &__wrapper {
    overflow: hidden;
    position: relative;
    will-change: height;
  }

  &__body {
    color: var(--ui-color-text-secondary);
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    position: relative;
    font-size: var(--ui-font-size-sm);
    line-height: 1.5;
  }
}
</style>
