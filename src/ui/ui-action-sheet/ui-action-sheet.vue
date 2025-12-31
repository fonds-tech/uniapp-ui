<template>
  <ui-overlay
    v-if="props.overlay"
    :show="visible"
    :duration="props.duration"
    :z-index="currentZIndex"
    :lazy-render="props.lazyRender"
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
          <view v-for="(item, index) in actions" :key="index" class="ui-action-sheet__item" @click="handleSelectAction(item, index)">
            <text class="ui-action-sheet__item__title">{{ item.title }}</text>
            <text v-if="item.description" class="ui-action-sheet__item__description">{{ item.description }}</text>
          </view>
        </view>
      </slot>
    </scroll-view>
    <slot name="footer">
      <view class="ui-action-sheet__gap" />
      <button class="ui-action-sheet__cancel" :style="[cancelBtnStyle]" hover-class="ui-action-sheet__cancel--active" @click="handleCancel">
        {{ props.cancelText }}
      </button>
    </slot>
    <ui-safe-area-bottom v-if="props.safeAreaInsetBottom" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { ActionSheetAction } from "./index"
import { callInterceptor } from "../utils/interceptor"
import { isNumber, isFunction } from "../utils/check"
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

// 计算属性: 是否已初始化
const inited = computed(() => !props.lazyRender || transition.inited.value)

// 为 transition 的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 计算面板样式
const panelStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.zIndex = currentZIndex.value
  styles.borderTopLeftRadius = useUnit(props.borderRadius)
  styles.borderTopRightRadius = useUnit(props.borderRadius)
  return useStyle({ ...styles, ...useStyle(props.customStyle), ...transition.styles.value })
})

// 计算类名
const classNames = computed(() => [transition.classs.value])

// 计算标题样式
const headerTitleStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.titleColor)
  styles.fontSize = useUnit(props.titleSize)
  styles.fontWeight = props.titleWeight
  return useStyle(styles)
})

// 计算描述样式
const headerDescStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.descriptionColor)
  styles.fontSize = useUnit(props.descriptionSize)
  styles.fontWeight = props.descriptionWeight
  return useStyle(styles)
})

// 计算取消按钮样式
const cancelBtnStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.color = useColor(props.cancelTextColor)
  styles.fontSize = useUnit(props.cancelTextSize)
  styles.fontWeight = props.cancelTextWeight
  styles.background = useColor(props.cancelBackground)
  return useStyle(styles)
})

// 计算滚动区域样式
const scrollStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.height = useUnit(props.height)
  styles.maxHeight = useUnit(props.maxHeight)
  return useStyle(styles)
})

// 监听 show 属性变化
watch(
  () => props.show,
  (val) => {
    val ? open() : close()
  },
  { immediate: true },
)

// 监听 duration 属性变化
watch(() => [props.duration], initTransition, { immediate: true })

// 初始化 transition
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
    flex-direction: column;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    &:active {
      background-color: var(--ui-color-background-dark);
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
      background: #000;
      user-select: none;
      border-color: #000;
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
