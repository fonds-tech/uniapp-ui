<template>
  <view class="ui-collapse-item" :class="[rootClass, props.customClass]" :style="[rootStyle]">
    <!-- 头部区域 -->
    <view
      class="ui-collapse-item__header"
      :class="[headerClassList, props.headerClass]"
      :style="[headerStyleComputed]"
      :hover-class="hoverClass"
      :hover-stay-time="0"
      @click="onClickHeader"
    >
      <!-- 左侧图标 -->
      <view v-if="props.icon" class="ui-collapse-item__icon" :style="[iconStyle]">
        <ui-icon :name="props.icon" :size="props.iconSize" :color="iconColorValue" :weight="props.iconWeight" />
      </view>

      <!-- 标题区域 -->
      <view class="ui-collapse-item__title-wrapper">
        <slot name="title" :expanded="expanded" :disabled="props.disabled">
          <text class="ui-collapse-item__title" :style="[titleStyle]">{{ props.title }}</text>
        </slot>
        <!-- 描述标签 -->
        <text v-if="props.label" class="ui-collapse-item__label" :style="[labelStyle]">{{ props.label }}</text>
      </view>

      <!-- 右侧值 -->
      <text v-if="props.value" class="ui-collapse-item__value" :style="[valueStyle]">{{ props.value }}</text>

      <!-- 右侧箭头 -->
      <view v-if="props.isLink" class="ui-collapse-item__arrow" :class="[arrowClassList]" :style="[arrowStyle]">
        <ui-icon name="arrow-down" :size="props.arrowSize" :color="arrowColorValue" />
      </view>

      <!-- 分割线 -->
      <view v-if="props.border" class="ui-collapse-item__divider" :style="[dividerStyle]" />
    </view>

    <!-- 内容区域（带展开/收起动画） -->
    <view class="ui-collapse-item__wrapper" :style="[wrapperStyle]" @transitionend="onTransitionEnd">
      <view :id="contentId" class="ui-collapse-item__body" :class="[props.bodyClass]" :style="[bodyStyleComputed]">
        <slot />
        <!-- 展开时的分割线 -->
        <view v-if="expanded && props.border" class="ui-collapse-item__divider" :style="[dividerStyle]" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { collapseKey } from "../ui-collapse"
import { collapseItemEmits, collapseItemProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-collapse-item" })

const props = defineProps(collapseItemProps)
const emits = defineEmits(collapseItemEmits)

// 获取父组件
const { parent } = useParent(collapseKey)

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

// 计算 padding 值
const paddingValue = computed(() => {
  if (!props.padding) return ""
  return useUnit(props.padding)
})

// 图标颜色值
const iconColorValue = computed(() => {
  if (!props.iconColor) return ""
  return useColor(props.iconColor)
})

// 箭头颜色值
const arrowColorValue = computed(() => {
  if (!props.arrowColor) return ""
  return useColor(props.arrowColor)
})

// 根节点样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.background) {
    style.backgroundColor = useColor(props.background)
  }
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

// 头部样式
const headerStyleComputed = computed(() => {
  const style: CSSProperties = {}
  if (paddingValue.value) {
    style.padding = paddingValue.value
  }
  return useStyle({ ...style, ...useStyle(props.headerStyle) })
})

// 头部类名
const headerClassList = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__header--expanded")
  return list
})

// 标题样式
const titleStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.titleSize) {
    style.fontSize = useUnit(props.titleSize)
  }
  if (props.titleColor) {
    style.color = useColor(props.titleColor)
  }
  if (props.titleWeight) {
    style.fontWeight = String(props.titleWeight)
  }
  return style
})

// 描述标签样式
const labelStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.labelSize) {
    style.fontSize = useUnit(props.labelSize)
  }
  if (props.labelColor) {
    style.color = useColor(props.labelColor)
  }
  if (props.labelWeight) {
    style.fontWeight = String(props.labelWeight)
  }
  if (props.labelGap) {
    style.marginTop = useUnit(props.labelGap)
  }
  return style
})

// 右侧值样式
const valueStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.valueSize) {
    style.fontSize = useUnit(props.valueSize)
  }
  if (props.valueColor) {
    style.color = useColor(props.valueColor)
  }
  if (props.valueWeight) {
    style.fontWeight = String(props.valueWeight)
  }
  return style
})

// 图标样式
const iconStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.iconGap) {
    style.marginRight = useUnit(props.iconGap)
  }
  return style
})

// 箭头样式
const arrowStyle = computed(() => {
  const style: CSSProperties = {}
  return style
})

// 箭头类名
const arrowClassList = computed(() => {
  const list: string[] = []
  if (expanded.value) list.push("ui-collapse-item__arrow--expanded")
  return list
})

// 内容区域样式
const bodyStyleComputed = computed(() => {
  const style: CSSProperties = {}
  if (paddingValue.value) {
    style.padding = paddingValue.value
  }
  return useStyle({ ...style, ...useStyle(props.bodyStyle) })
})

// 分割线样式
const dividerStyle = computed(() => {
  const style: CSSProperties = {}
  if (paddingValue.value) {
    style.left = paddingValue.value
    style.right = paddingValue.value
  }
  if (props.borderColor) {
    style.borderBottomColor = useColor(props.borderColor)
  }
  if (props.borderWidth) {
    style.borderBottomWidth = useUnit(props.borderWidth)
  }
  return style
})

// 点击态类名
const hoverClass = computed(() => {
  if (props.disabled || props.readonly) return ""
  return "ui-collapse-item__header--active"
})

// 包裹器样式（控制展开/收起动画）
const wrapperStyle = computed(() => {
  const style: CSSProperties = {}
  const duration = props.duration || 300

  // 初始化后启用动画
  if (inited.value) {
    style.transition = `height ${duration}ms ease-in-out`
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

    .ui-collapse-item__label {
      color: var(--ui-color-text-disabled);
    }

    .ui-collapse-item__value {
      color: var(--ui-color-text-disabled);
    }

    .ui-collapse-item__arrow {
      color: var(--ui-color-text-disabled);
    }

    .ui-collapse-item__icon {
      color: var(--ui-color-text-disabled);
    }
  }

  &--readonly {
    cursor: default;
  }

  &__header {
    gap: var(--ui-spacing-sm);
    cursor: pointer;
    display: flex;
    padding: var(--ui-spacing-md);
    overflow: hidden;
    position: relative;
    align-items: center;
    user-select: none;

    &--active {
      background-color: var(--ui-color-active);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: var(--ui-spacing-sm);
  }

  &__title-wrapper {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: 500;
  }

  &__label {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xs);
  }

  &__value {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    flex-shrink: 0;
  }

  &__arrow {
    color: var(--ui-color-text-tertiary);
    display: flex;
    font-size: 24rpx;
    transition: transform 0.3s;
    align-items: center;
    flex-shrink: 0;

    &--expanded {
      transform: rotate(-180deg);
    }
  }

  // 分割线
  &__divider {
    left: var(--ui-spacing-md);
    right: var(--ui-spacing-md);
    bottom: 0;
    height: 0;
    position: absolute;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    pointer-events: none;
  }

  // 展开状态：隐藏 header 的分割线
  &--expanded &__header > &__divider {
    display: none;
  }

  // 最后一个 item 收起时不显示分割线
  &:last-child:not(&--expanded) &__header > &__divider {
    display: none;
  }

  // 最后一个 item 展开时不显示内容底部分割线
  &:last-child &__body > &__divider {
    display: none;
  }

  &__wrapper {
    overflow: hidden;
    position: relative;
    will-change: height;
  }

  &__body {
    color: var(--ui-color-text-secondary);
    padding: var(--ui-spacing-md);
    position: relative;
    font-size: var(--ui-font-size-sm);
    line-height: 1.5;
  }
}
</style>
