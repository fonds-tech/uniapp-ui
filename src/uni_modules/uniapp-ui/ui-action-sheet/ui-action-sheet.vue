<template>
  <ui-overlay
    v-if="props.overlay && inited"
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
            hover-class="ui-action-sheet__item--active"
            :hover-stay-time="0"
            @click="handleItemClick(item, index)"
          >
            <ui-loading v-if="item.loading" size="var(--ui-icon-size-sm)" />
            <template v-else>
              <view class="ui-action-sheet__item__main">
                <ui-icon v-if="item.icon" :name="item.icon" class="ui-action-sheet__item__icon" />
                <text class="ui-action-sheet__item__title" :style="[actionTitleStyle, item.titleStyle, item.color ? { color: useColor(item.color) } : null]">{{ item.title }}</text>
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

// 过渡动画状态机
const transition = useTransition()

// 面板可见性
const visible = ref(false)
// 当前层级
const currentZIndex = ref<number>()

// 是否已初始化（懒渲染：首次打开后才渲染内容）
const inited = computed(() => !props.lazyRender || transition.inited.value)
// 过渡动画类名集合
const classNames = computed(() => [transition.classs.value])
// 操作项标题样式
const actionTitleStyle = computed(() => useStyle(props.actionTitleStyle))
// 操作项描述样式
const actionDescStyle = computed(() => useStyle(props.actionDescriptionStyle))
// 防御性处理 actions（确保数组）
const safeActions = computed(() => (Array.isArray(props.actions) ? props.actions : []))

// 面板样式（含层级、圆角、过渡动画）
const panelStyle = computed(() => {
  const styles: CSSProperties = { zIndex: currentZIndex.value }
  // prop 传值才覆盖 SCSS 默认 --ui-action-sheet-radius
  if (props.borderRadius !== undefined) {
    const radius = useUnit(props.borderRadius)
    styles.borderTopLeftRadius = radius
    styles.borderTopRightRadius = radius
  }
  // 离开动画结束后 panel 仍 inited=true 留 DOM；当前 slide-up 出屏不拦点击，加 display:none 防御未来动画变更
  if (!transition.visible.value) styles.display = "none"
  return useStyle({ ...styles, ...useStyle(props.customStyle), ...transition.styles.value })
})
// 滚动区高度
const scrollStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(props.height)
  styles.maxHeight = useUnit(props.maxHeight)
  return useStyle(styles)
})
// 取消按钮样式
const cancelBtnStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.cancelTextColor)
  styles.fontSize = useUnit(props.cancelTextSize)
  styles.fontWeight = props.cancelTextWeight
  styles.background = useColor(props.cancelBackground)
  return useStyle(styles)
})
// 头部描述样式
const headerDescStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.descriptionColor)
  styles.fontSize = useUnit(props.descriptionSize)
  styles.fontWeight = props.descriptionWeight
  return useStyle(styles)
})
// 头部标题样式
const headerTitleStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.titleColor)
  styles.fontSize = useUnit(props.titleSize)
  styles.fontWeight = props.titleWeight
  return useStyle(styles)
})

// 桥接过渡动画生命周期到 emits
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)
watch(() => [props.duration], initTransition, { immediate: true })

// 初始化过渡动画
function initTransition() {
  transition.init({ name: "slide-up", duration: props.duration })
}

// 打开面板
function open() {
  if (transition.visible.value) return
  initTransition()
  currentZIndex.value = isNumber(props.zIndex) ? +props.zIndex : useGlobalZIndex()
  visible.value = true
  transition.enter()
  emits("update:show", true)
}

// 关闭面板
function close() {
  if (transition.visible.value) {
    visible.value = false
    transition.leave()
    emits("update:show", false)
  }
}

// 点击操作项
function handleItemClick(item: ActionSheetAction, index: number) {
  if (item.disabled || item.loading) return
  handleSelectAction(item, index)
}

// 选择操作项（触发 select 并按配置关闭）
function handleSelectAction(item: ActionSheetAction, index: number) {
  emits("select", item, index)
  if (props.closeOnClickAction) {
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

// 点击取消按钮
function handleCancel() {
  emits("cancel")
  close()
}

// 点击遮罩层
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
  // 局部变量（便于覆盖）
  --ui-action-sheet-radius: var(--ui-radius-lg);
  --ui-action-sheet-max-height: 80%;

  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
  position: fixed;
  max-height: var(--ui-action-sheet-max-height);
  flex-direction: column;
  background-color: var(--ui-color-background);
  transition-duration: var(--ui-transition-duration);
  border-top-left-radius: var(--ui-action-sheet-radius);
  border-top-right-radius: var(--ui-action-sheet-radius);

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
    color: var(--ui-color-text);
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

    // 通过 hover-class 控制按下态（小程序 :active 不可靠）
    &--active:not(.ui-action-sheet__item--disabled):not(.ui-action-sheet__item--loading) {
      background-color: var(--ui-color-background-hover);
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
      opacity: var(--ui-opacity-disabled);

      .ui-action-sheet__item__title {
        color: var(--ui-color-text-tertiary);
      }
    }

    &--loading {
      opacity: var(--ui-opacity-active);
    }

    &__title {
      color: var(--ui-color-text);
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
    background-color: var(--ui-color-background-page);
  }

  &__cancel {
    color: var(--ui-color-text);
    height: var(--ui-size-lg);
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
      background: var(--ui-color-text);
      user-select: none;
      border-color: var(--ui-color-text);
      border-radius: inherit;
    }

    &::after {
      content: none;
    }

    &--active {
      background-color: var(--ui-color-background-hover);
    }
  }
}
</style>
