<template>
  <ui-overlay
    v-if="useProps.overlay"
    :show="visible"
    :duration="useProps.duration"
    :z-index="currentZIndex"
    :lazy-render="useProps.lazyRender"
    :custom-style="overlayStyle"
    @click="handleOverlayClick"
  />
  <view v-if="inited" class="ui-action-sheet" :style="[panelStyle]" :class="[classNames, customClass]" @transitionend="transition.end" @touchmove.prevent.stop="() => {}">
    <slot name="header">
      <view class="ui-action-sheet__header">
        <slot name="title">
          <text class="ui-action-sheet__title" :style="[headerTitleStyle]">{{ title }}</text>
        </slot>
        <slot name="description">
          <text class="ui-action-sheet__description" :style="[headerDescStyle]">{{ description }}</text>
        </slot>
      </view>
    </slot>
    <scroll-view class="ui-action-sheet__scroll" enable-flex scroll-y :style="[scrollStyle]">
      <slot>
        <view class="ui-action-sheet__content">
          <view
            v-for="(item, index) in actions"
            :key="index"
            class="ui-action-sheet__item"
            :class="{ 'ui-action-sheet__item--disabled': item.disabled, 'ui-action-sheet__item--loading': item.loading }"
            @click="!item.disabled && !item.loading && handleSelectAction(item, index)"
          >
            <ui-loading v-if="item.loading" size="36rpx" />
            <text v-else class="ui-action-sheet__item__title" :style="{ color: item.color }">{{ item.title }}</text>
            <text v-if="item.description" class="ui-action-sheet__item__description">{{ item.description }}</text>
          </view>
        </view>
      </slot>
    </scroll-view>
    <slot name="footer">
      <view class="ui-action-sheet__gap" />
      <button class="ui-action-sheet__cancel" :style="[cancelBtnStyle]" hover-class="ui-action-sheet__cancel--active" @click="handleCancel">
        {{ useProps.cancelText }}
      </button>
    </slot>
    <ui-safe-area-bottom v-if="useProps.safeAreaInsetBottom" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ActionSheetAction } from "./index"
import { callInterceptor } from "../utils/interceptor"
import { isNumber, isFunction } from "../utils/check"
import { ref, watch, computed } from "vue"
import { actionSheetEmits, actionSheetProps, useActionSheetProps } from "./index"
import { useUnit, useColor, useStyle, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-action-sheet" })

// 定义props和emits
const props = defineProps(actionSheetProps)
const emits = defineEmits(actionSheetEmits)
const useProps = useActionSheetProps(props)
// 使用 transition hook
const transition = useTransition()

// 定义响应式变量
const currentZIndex = ref<number>()
const visible = ref(false)

// 计算属性: 是否已初始化
const inited = computed(() => !useProps.lazyRender || transition.inited.value)

// 为 transition 的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 计算面板样式
const panelStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.zIndex = currentZIndex.value
  styles.borderTopLeftRadius = useUnit(useProps.borderRadius)
  styles.borderTopRightRadius = useUnit(useProps.borderRadius)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle), ...transition.styles.value })
})

// 计算类名
const classNames = computed(() => [transition.classs.value])

// 计算标题样式
const headerTitleStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(useProps.titleColor)
  styles.fontSize = useUnit(useProps.titleSize)
  styles.fontWeight = useProps.titleWeight
  return useStyle(styles)
})

// 计算描述样式
const headerDescStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(useProps.descriptionColor)
  styles.fontSize = useUnit(useProps.descriptionSize)
  styles.fontWeight = useProps.descriptionWeight
  return useStyle(styles)
})

// 计算取消按钮样式
const cancelBtnStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(useProps.cancelTextColor)
  styles.fontSize = useUnit(useProps.cancelTextSize)
  styles.fontWeight = useProps.cancelTextWeight
  styles.background = useColor(useProps.cancelBackground)
  return useStyle(styles)
})

// 计算滚动区域样式
const scrollStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(useProps.height)
  styles.maxHeight = useUnit(useProps.maxHeight)
  return useStyle(styles)
})

// 监听 show 属性变化
watch(
  () => useProps.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

// 监听 duration 属性变化
watch(() => [useProps.duration], initTransition, { immediate: true })

// 初始化 transition
function initTransition() {
  transition.init({ name: "slide-up", duration: useProps.duration })
}

// 打开面板
function open() {
  if (transition.visible.value) return
  initTransition()
  currentZIndex.value = isNumber(useProps.zIndex) ? +useProps.zIndex : useGlobalZIndex()
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
  if (useProps.closeOnClickAction) {
    if (isFunction(useProps.beforeClose)) {
      callInterceptor(useProps.beforeClose, {
        args: [{ action: item, index }],
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
  if (useProps.closeOnClickOverlay) close()
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
  max-width: 100vw;
  max-height: 100vh;
  flex-direction: column;
  background-color: var(--ui-color-background);
  transition-duration: var(--ui-transition-duration);
  border-top-left-radius: var(--ui-radius-xl);
  border-top-right-radius: var(--ui-radius-xl);

  &__header {
    display: grid;
    padding: var(--ui-spacing-xl);
    row-gap: var(--ui-spacing-md);
    padding-bottom: var(--ui-spacing-md);
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  &__title {
    color: var(--ui-color-text-primary);
    font-size: var(--ui-font-size-lg);
    text-align: center;
  }

  &__description {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-md);
    text-align: center;
  }

  &__scroll {
    max-height: 100vh;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: grid;
    padding: var(--ui-spacing-xl);
    row-gap: var(--ui-spacing-md);
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
      font-size: var(--ui-font-size-lg);
      text-align: center;
    }

    &__description {
      color: var(--ui-color-text-secondary);
      font-size: var(--ui-font-size-md);
      text-align: center;
    }
  }

  &__gap {
    height: var(--ui-spacing-lg);
    background-color: var(--ui-color-background-light);
  }

  &__cancel {
    color: var(--ui-color-text-primary);
    height: var(--ui-size-large);
    margin: 0;
    display: flex;
    position: relative;
    font-size: var(--ui-font-size-lg);
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
