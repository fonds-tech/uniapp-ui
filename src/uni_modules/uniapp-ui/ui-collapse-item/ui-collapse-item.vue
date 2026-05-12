<template>
  <view class="ui-collapse-item" :class="[classNames, props.customClass]" :style="[rootStyle]">
    <view
      class="ui-collapse-item__header"
      :class="[headerClassList, props.headerClass]"
      :style="[props.headerStyle]"
      :hover-class="hoverClass"
      :hover-stay-time="0"
      role="button"
      :aria-expanded="expanded"
      @click="onClickHeader"
    >
      <view v-if="props.icon" class="ui-collapse-item__icon">
        <ui-icon :name="props.icon" />
      </view>
      <view class="ui-collapse-item__title-wrapper">
        <slot name="title" :expanded="expanded" :disabled="props.disabled">
          <text class="ui-collapse-item__title">{{ props.title }}</text>
        </slot>
        <text v-if="props.label" class="ui-collapse-item__label">{{ props.label }}</text>
      </view>
      <text v-if="props.value" class="ui-collapse-item__value">{{ props.value }}</text>
      <view v-if="props.isLink" class="ui-collapse-item__arrow" :class="[arrowClassList]">
        <ui-icon name="arrow-down" />
      </view>
      <view v-if="props.border" class="ui-collapse-item__divider" />
    </view>

    <view class="ui-collapse-item__wrapper" :style="[wrapperStyle]" @transitionend="onTransitionEnd">
      <view :id="contentId" class="ui-collapse-item__body" :class="[props.bodyClass]" :style="[props.bodyStyle]">
        <slot />
        <view v-if="expanded && props.border" class="ui-collapse-item__divider" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { uuid } from "../utils/utils"
import { isDef } from "../utils/check"
import { collapseKey } from "../ui-collapse"
import { collapseItemEmits, collapseItemProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"
import { ref, watch, computed, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-collapse-item" })

const props = defineProps(collapseItemProps)
const emits = defineEmits(collapseItemEmits)

// 父级 collapse
const { parent } = useParent(collapseKey)

// 组件实例
const instance = getCurrentInstance()!

// 内容区 DOM id
const contentId = ref(`collapse-body-${uuid()}`)
// 唯一标识：name 优先，未传则 fallback uuid
const resolvedName = ref<string | number>(isDef(props.name) ? props.name : uuid())
// 是否已初始化（首次挂载不播动画）
const inited = ref(false)
// 内部展开状态（用于驱动 wrapper height 动画）
const expanded = ref(false)
// 内容区高度（px）；为 "" 时表示自适应
const height = ref<number | string>("")

// 单行 computed
const isSelected = computed(() => (parent ? parent.activeNames.value.includes(resolvedName.value) : false))
const hoverClass = computed(() => (props.disabled || props.readonly ? "" : "ui-collapse-item__header--active"))

// 多行 computed
const rootStyle = computed<CSSProperties>(() => {
  const s: Record<string, any> = {}
  if (props.padding !== undefined) s["--ui-collapse-item-padding"] = useUnit(props.padding)
  if (props.background) s["--ui-collapse-item-background"] = useColor(props.background)
  if (props.titleSize !== undefined) s["--ui-collapse-item-title-size"] = useUnit(props.titleSize)
  if (props.titleColor) s["--ui-collapse-item-title-color"] = useColor(props.titleColor)
  if (props.titleWeight !== undefined) s["--ui-collapse-item-title-weight"] = String(props.titleWeight)
  if (props.labelSize !== undefined) s["--ui-collapse-item-label-size"] = useUnit(props.labelSize)
  if (props.labelColor) s["--ui-collapse-item-label-color"] = useColor(props.labelColor)
  if (props.labelWeight !== undefined) s["--ui-collapse-item-label-weight"] = String(props.labelWeight)
  if (props.labelGap !== undefined) s["--ui-collapse-item-label-gap"] = useUnit(props.labelGap)
  if (props.valueSize !== undefined) s["--ui-collapse-item-value-size"] = useUnit(props.valueSize)
  if (props.valueColor) s["--ui-collapse-item-value-color"] = useColor(props.valueColor)
  if (props.valueWeight !== undefined) s["--ui-collapse-item-value-weight"] = String(props.valueWeight)
  if (props.iconSize !== undefined) s["--ui-collapse-item-icon-size"] = useUnit(props.iconSize)
  if (props.iconColor) s["--ui-collapse-item-icon-color"] = useColor(props.iconColor)
  if (props.iconWeight !== undefined) s["--ui-collapse-item-icon-weight"] = String(props.iconWeight)
  if (props.iconGap !== undefined) s["--ui-collapse-item-icon-gap"] = useUnit(props.iconGap)
  if (props.arrowSize !== undefined) s["--ui-collapse-item-arrow-size"] = useUnit(props.arrowSize)
  if (props.arrowColor) s["--ui-collapse-item-arrow-color"] = useColor(props.arrowColor)
  if (props.borderColor) s["--ui-collapse-item-border-color"] = useColor(props.borderColor)
  if (props.borderWidth !== undefined) s["--ui-collapse-item-border-width"] = useUnit(props.borderWidth)
  return useStyle({ ...s, ...(useStyle(props.customStyle) || {}) }) as CSSProperties
})
const classNames = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-collapse-item--disabled")
  if (props.readonly) list.push("ui-collapse-item--readonly")
  if (expanded.value) list.push("ui-collapse-item--expanded")
  return list
})
const arrowClassList = computed(() => ({ "ui-collapse-item__arrow--expanded": expanded.value }))
const headerClassList = computed(() => ({ "ui-collapse-item__header--expanded": expanded.value }))
const wrapperStyle = computed<CSSProperties>(() => {
  const s: CSSProperties = {}
  const duration = +props.duration || 300
  // 首次挂载不播动画（避免初始展开闪烁）
  if (inited.value) s.transition = `height ${duration}ms ease-in-out`
  if (!expanded.value) s.height = "0px"
  else if (height.value) s.height = typeof height.value === "number" ? `${height.value}px` : height.value
  // expanded && height === "" → 不设 height，让内容自适应
  return useStyle(s) as CSSProperties
})

// 监听选中状态变化 → 触发动画
watch(
  () => isSelected.value,
  () => initRect(),
)

// 测内容区真实高度并切换展开状态
async function initRect() {
  const rect = await useRect(`#${contentId.value}`, instance)
  if (rect) height.value = rect.height || 0
  // 必须让浏览器先把当前高度 paint 一帧，CSS transition 才能从 X 过渡到 0；
  // 仅 nextTick (microtask) 会和后续高度变化合批，导致收起无动画
  await new Promise<void>((resolve) => setTimeout(resolve, 20))
  expanded.value = isSelected.value
  if (!inited.value) inited.value = true
}

// 动画结束：清空高度让内容自适应（content 动态变化时也能扩展）
function onTransitionEnd() {
  if (expanded.value) height.value = ""
}

// 切换展开状态（屏蔽禁用/只读）
function toggle(expand?: boolean) {
  if (props.disabled || props.readonly) return
  if (!parent) return
  parent.toggle(resolvedName.value, expand !== undefined ? expand : !expanded.value)
}

// 点击头部
function onClickHeader(event: Event) {
  emits("click", event)
  toggle()
}

onMounted(() => {
  initRect()
})

defineExpose({
  name: resolvedName.value,
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
  --ui-collapse-item-padding: var(--ui-spacing-md);
  --ui-collapse-item-icon-gap: var(--ui-spacing-sm);
  --ui-collapse-item-icon-size: var(--ui-font-size-md);
  --ui-collapse-item-label-gap: var(--ui-spacing-xs);
  --ui-collapse-item-arrow-size: var(--ui-font-size-xs);
  --ui-collapse-item-background: var(--ui-color-background);
  --ui-collapse-item-icon-color: var(--ui-color-text-secondary);
  --ui-collapse-item-label-size: var(--ui-font-size-xs);
  --ui-collapse-item-title-size: var(--ui-font-size-sm);
  --ui-collapse-item-value-size: var(--ui-font-size-sm);
  --ui-collapse-item-arrow-color: var(--ui-color-text-tertiary);
  --ui-collapse-item-icon-weight: normal;
  --ui-collapse-item-label-color: var(--ui-color-text-tertiary);
  --ui-collapse-item-title-color: var(--ui-color-text);
  --ui-collapse-item-value-color: var(--ui-color-text-secondary);
  --ui-collapse-item-border-color: var(--ui-color-border-light);
  --ui-collapse-item-border-width: var(--ui-border-width);
  --ui-collapse-item-label-weight: normal;
  --ui-collapse-item-title-weight: var(--ui-font-weight-normal);
  --ui-collapse-item-value-weight: normal;

  position: relative;
  background-color: var(--ui-collapse-item-background);

  &--disabled {
    .ui-collapse-item__header {
      cursor: not-allowed;
    }

    .ui-collapse-item__title,
    .ui-collapse-item__label,
    .ui-collapse-item__value,
    .ui-collapse-item__arrow,
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
    padding: var(--ui-collapse-item-padding);
    overflow: hidden;
    position: relative;
    align-items: center;
    user-select: none;

    &--active {
      background-color: var(--ui-color-background-hover);
    }
  }

  &__icon {
    color: var(--ui-collapse-item-icon-color);
    display: flex;
    font-size: var(--ui-collapse-item-icon-size);
    align-items: center;
    flex-shrink: 0;
    font-weight: var(--ui-collapse-item-icon-weight);
    margin-right: var(--ui-collapse-item-icon-gap);
  }

  &__title-wrapper {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-collapse-item-title-color);
    font-size: var(--ui-collapse-item-title-size);
    font-weight: var(--ui-collapse-item-title-weight);
  }

  &__label {
    color: var(--ui-collapse-item-label-color);
    font-size: var(--ui-collapse-item-label-size);
    margin-top: var(--ui-collapse-item-label-gap);
    font-weight: var(--ui-collapse-item-label-weight);
  }

  &__value {
    color: var(--ui-collapse-item-value-color);
    font-size: var(--ui-collapse-item-value-size);
    flex-shrink: 0;
    font-weight: var(--ui-collapse-item-value-weight);
  }

  &__arrow {
    color: var(--ui-collapse-item-arrow-color);
    display: flex;
    font-size: var(--ui-collapse-item-arrow-size);
    transition: transform var(--ui-transition-duration);
    align-items: center;
    flex-shrink: 0;

    &--expanded {
      transform: rotate(-180deg);
    }
  }

  &__divider {
    left: var(--ui-collapse-item-padding);
    right: var(--ui-collapse-item-padding);
    bottom: 0;
    height: 0;
    position: absolute;
    border-bottom: var(--ui-collapse-item-border-width) solid var(--ui-collapse-item-border-color);
    pointer-events: none;
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
    padding: var(--ui-collapse-item-padding);
    position: relative;
    font-size: var(--ui-font-size-sm);
    line-height: var(--ui-line-height-normal);
  }
}
</style>
