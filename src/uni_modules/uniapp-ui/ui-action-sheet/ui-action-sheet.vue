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
            :key="index"
            class="ui-action-sheet__item"
            :class="{ 'ui-action-sheet__item--disabled': item.disabled, 'ui-action-sheet__item--loading': item.loading }"
            @click="!item.disabled && !item.loading && handleSelectAction(item, index)"
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

// 定义组件名称
defineOptions({ name: "ui-action-sheet" })

// 定义props和emits
const props = defineProps(actionSheetProps)
const emits = defineEmits(actionSheetEmits)
// 使用 transition hook
const transition = useTransition()

// 定义响应式变量
const currentZIndex = ref<number>()
const visible = ref(false)

const inited = computed(() => !props.lazyRender || transition.inited.value)

// 计算属性: 安全的 actions 数组
const safeActions = computed(() => {
  return Array.isArray(props.actions) ? props.actions : []
})

// 为 transition 的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

const panelStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.zIndex = currentZIndex.value
  styles.borderTopLeftRadius = useUnit(props.borderRadius)
  styles.borderTopRightRadius = useUnit(props.borderRadius)
  return useStyle({ ...styles, ...useStyle(props.customStyle), ...transition.styles.value })
})

const classNames = computed(() => [transition.classs.value])

const headerTitleStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.titleColor)
  styles.fontSize = useUnit(props.titleSize)
  styles.fontWeight = props.titleWeight
  return useStyle(styles)
})

const headerDescStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.descriptionColor)
  styles.fontSize = useUnit(props.descriptionSize)
  styles.fontWeight = props.descriptionWeight
  return useStyle(styles)
})

const cancelBtnStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.cancelTextColor)
  styles.fontSize = useUnit(props.cancelTextSize)
  styles.fontWeight = props.cancelTextWeight
  styles.background = useColor(props.cancelBackground)
  return useStyle(styles)
})

const scrollStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(props.height)
  styles.maxHeight = useUnit(props.maxHeight)
  return useStyle(styles)
})

const actionTitleStyle = computed(() => useStyle(props.actionTitleStyle))

const actionDescStyle = computed(() => useStyle(props.actionDescriptionStyle))

watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

watch(() => [props.duration], initTransition, { immediate: true })

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

// 选择操作项
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
    padding: var(--ui-spacing-lg);
    row-gap: var(--ui-spacing-xs);
    padding-bottom: var(--ui-spacing-md);
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-md);
    text-align: center;
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
    padding: var(--ui-spacing-lg);
    row-gap: var(--ui-spacing-xs);
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    justify-items: center;
    flex-direction: column;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    &:active {
      background-color: var(--ui-color-background-dark);
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
      font-size: var(--ui-font-size-lg);
    }

    &__description {
      color: var(--ui-color-text-tertiary);
      font-size: var(--ui-font-size-xs);
      text-align: center;
    }
  }

  &__gap {
    height: var(--ui-spacing-sm);
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
