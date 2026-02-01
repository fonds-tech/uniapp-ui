<template>
  <ui-overlay
    v-if="props.overlay"
    :show="visible"
    :duration="props.duration"
    :z-index="currentZIndex"
    :lazy-render="props.lazyRender"
    :custom-style="props.overlayStyle"
    @click="handleOverlayClick"
  />
  <view v-if="inited" class="ui-action-sheet" :style="[panelStyle]" :class="[classNames, props.customClass]" @transitionend="transition.end" @touchmove.prevent.stop="() => {}">
    <slot name="header">
      <view v-if="props.title || props.description" class="ui-action-sheet__header">
        <slot name="title">
          <text v-if="props.title" class="ui-action-sheet__title" :style="[headerTitleStyle]">{{ props.title }}</text>
        </slot>
        <slot name="description">
          <text v-if="props.description" class="ui-action-sheet__description" :style="[headerDescStyle]">{{ props.description }}</text>
        </slot>
      </view>
    </slot>
    <scroll-view class="ui-action-sheet__scroll" enable-flex scroll-y :style="[scrollStyle]">
      <slot>
        <view class="ui-action-sheet__content">
          <view
            v-for="(item, index) in safeActions"
            :key="item.id ?? index"
            class="ui-action-sheet__item"
            :class="{ 'ui-action-sheet__item--disabled': item.disabled, 'ui-action-sheet__item--loading': item.loading }"
            @click="handleItemClick(item, index)"
          >
            <ui-loading v-if="item.loading" size="36rpx" />
            <template v-else>
              <view class="ui-action-sheet__item__main">
                <ui-icon v-if="item.icon" :name="item.icon" class="ui-action-sheet__item__icon" />
                <text class="ui-action-sheet__item__title" :style="[actionTitleStyle, item.titleStyle, item.color && { color: item.color }]">{{ item.title }}</text>
              </view>
              <text v-if="item.description" class="ui-action-sheet__item__description" :style="[actionDescStyle, item.descriptionStyle]">{{ item.description }}</text>
            </template>
          </view>
        </view>
      </slot>
    </scroll-view>
    <slot name="footer">
      <template v-if="props.showCancel">
        <view class="ui-action-sheet__gap" />
        <button class="ui-action-sheet__cancel" :style="[cancelBtnStyle]" hover-class="ui-action-sheet__cancel--active" @click="handleCancel">
          {{ props.cancelText }}
        </button>
      </template>
    </slot>
    <ui-safe-area-bottom v-if="props.safeAreaInsetBottom" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ActionSheetAction } from "./index"
import { callInterceptor } from "../utils/interceptor"
import { isNumber, isFunction } from "../utils/check"
import { ref, watch, computed } from "vue"
import { actionSheetEmits, actionSheetProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

defineOptions({ name: "ui-action-sheet" })

const props = defineProps(actionSheetProps)
const emits = defineEmits(actionSheetEmits)

// 使用 transition hook 管理动画状态
const transition = useTransition()
// 当前层级（动态计算，用于多个弹窗层级管理）
const currentZIndex = ref<number>()
// 面板是否可见（控制遮罩层显示）
const visible = ref(false)

// 是否已初始化（懒渲染场景：首次打开后才渲染内容）
const inited = computed(() => !props.lazyRender || transition.inited.value)
// 安全的 actions 数组（防御性处理，确保始终为数组）
const safeActions = computed(() => {
  return Array.isArray(props.actions) ? props.actions : []
})
// 面板样式（包含层级、圆角、过渡动画、自定义样式）
const panelStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.zIndex = currentZIndex.value
  styles.borderTopLeftRadius = useUnit(props.borderRadius)
  styles.borderTopRightRadius = useUnit(props.borderRadius)
  return useStyle({ ...styles, ...useStyle(props.customStyle), ...transition.styles.value })
})
// 样式类名（过渡动画相关类名）
const classNames = computed(() => [transition.classs.value])
// 头部标题样式（颜色、大小、粗细）
const headerTitleStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.titleColor)
  styles.fontSize = useUnit(props.titleSize)
  styles.fontWeight = props.titleWeight
  return useStyle(styles)
})
// 头部描述样式（颜色、大小、粗细）
const headerDescStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.descriptionColor)
  styles.fontSize = useUnit(props.descriptionSize)
  styles.fontWeight = props.descriptionWeight
  return useStyle(styles)
})
// 取消按钮样式（颜色、大小、粗细、背景）
const cancelBtnStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.cancelTextColor)
  styles.fontSize = useUnit(props.cancelTextSize)
  styles.fontWeight = props.cancelTextWeight
  styles.background = useColor(props.cancelBackground)
  return useStyle(styles)
})
// 滚动区域样式（高度、最大高度）
const scrollStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(props.height)
  styles.maxHeight = useUnit(props.maxHeight)
  return useStyle(styles)
})
// 操作项标题样式（合并默认样式与用户自定义样式）
const actionTitleStyle = computed(() => useStyle(props.actionTitleStyle))
// 操作项描述样式（合并默认样式与用户自定义样式）
const actionDescStyle = computed(() => useStyle(props.actionDescriptionStyle))

// 为 transition 的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 监听 show 属性变化
watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)
// 监听 duration 变化重新初始化 transition
watch(() => [props.duration], initTransition, { immediate: true })

// 初始化过渡动画（配置滑入动画和持续时间）
function initTransition() {
  transition.init({ name: "slide-up", duration: props.duration })
}

// 打开面板（初始化动画、设置层级、触发事件）
function open() {
  // 防止重复打开
  if (transition.visible.value) return
  initTransition()
  // 使用指定层级或自动生成全局层级
  currentZIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

// 关闭面板（触发离开动画、更新状态）
function close() {
  if (transition.visible.value) {
    visible.value = false
    transition.leave()
    emits("update:show", false)
  }
}

// 点击操作项（处理禁用和加载状态，触发选择事件）
function handleItemClick(item: ActionSheetAction, index: number) {
  // 禁用或加载中时不响应点击
  if (item.disabled || item.loading) return
  handleSelectAction(item, index)
}

// 选择操作项（触发事件并根据配置关闭面板）
function handleSelectAction(item: ActionSheetAction, index: number) {
  emits("select", item, index)
  if (props.closeOnClickAction) {
    // 存在拦截器时先执行拦截器
    if (isFunction(props.beforeClose)) {
      callInterceptor(props.beforeClose, {
        args: [item, index],
        done: () => close(),
      })
    } else {
      close()
    }
  }
}

// 点击取消按钮（触发取消事件并关闭面板）
function handleCancel() {
  emits("cancel")
  close()
}

// 点击遮罩层（触发事件并根据配置关闭面板）
function handleOverlayClick() {
  emits("clickOverlay")
  if (props.closeOnClickOverlay) close()
}

defineExpose({ open, close })
</script>

<script lang="ts">
export default {
  name: "ui-action-sheet",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
@use "../styles/animation.scss";

.ui-action-sheet {
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  position: fixed;
  max-height: 80%;
  flex-direction: column;
  background-color: var(--ui-color-background);
  transition-duration: var(--ui-transition-duration);
  border-top-left-radius: var(--ui-radius-lg);
  border-top-right-radius: var(--ui-radius-lg);

  &__header {
    display: grid;
    padding: var(--ui-spacing-md);
    row-gap: var(--ui-spacing-xs);
    position: relative;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    &::after {
      left: var(--ui-spacing-lg);
      right: var(--ui-spacing-lg);
      bottom: 0;
      height: var(--ui-border-width-thin);
      content: "";
      position: absolute;
      background-color: var(--ui-color-border-light);
    }
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-md);
    text-align: center;
    font-weight: var(--ui-font-weight-bold);
  }

  &__description {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-sm);
    text-align: center;
  }

  &__scroll {
    flex: 1;
    min-height: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: grid;
    padding: var(--ui-spacing-md);
    row-gap: var(--ui-spacing-xs);
    position: relative;
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    justify-items: center;
    flex-direction: column;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    &:active {
      background-color: var(--ui-color-background-dark);
    }

    // 操作项分割线
    &::after {
      left: var(--ui-spacing-lg);
      right: var(--ui-spacing-lg);
      bottom: 0;
      height: var(--ui-border-width-thin);
      content: "";
      position: absolute;
      background-color: var(--ui-color-border-light);
    }

    // 最后一项不显示分割线
    &:last-child::after {
      display: none;
    }

    &--disabled {
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }

      .ui-action-sheet__item__title {
        color: var(--ui-color-text-tertiary);
      }
    }

    &--loading {
      cursor: not-allowed;

      &:active {
        background-color: transparent;
      }
    }

    &__title {
      color: var(--ui-color-text-primary);
      font-size: var(--ui-font-size-md);
      text-align: center;
    }

    &__main {
      gap: var(--ui-spacing-xs);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      font-size: var(--ui-icon-size-md);
    }

    &__description {
      color: var(--ui-color-text-tertiary);
      font-size: var(--ui-font-size-xs);
      text-align: center;
    }
  }

  &__gap {
    height: var(--ui-spacing-md);
    background-color: var(--ui-color-background-light);
  }

  &__cancel {
    color: var(--ui-color-text-primary);
    height: var(--ui-size-large);
    margin: 0;
    display: flex;
    position: relative;
    font-size: var(--ui-font-size-md);
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    white-space: nowrap;
    border-radius: 0;
    justify-content: center;
    background-color: var(--ui-color-background);

    &::before {
      top: 50%;
      left: 50%;
      width: 100%;
      border: inherit;
      height: 100%;
      content: "";
      opacity: 0;
      position: absolute;
      transform: translate3d(-50%, -50%, -1px);
      background: var(--ui-color-text-primary);
      user-select: none;
      border-color: var(--ui-color-text-primary);
      border-radius: inherit;
    }

    &::after {
      content: none;
    }

    &--active {
      background-color: var(--ui-color-background-dark);
    }
  }
}
</style>
