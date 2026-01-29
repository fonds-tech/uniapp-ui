<template>
  <view class="ui-dropdown-item" :class="[classs, customClass]" :style="[style]">
    <ui-overlay v-if="prop('overlay')" :show="visible" :z-index="zIndex" :duration="prop('duration')" :custom-style="overlayStyle" @click="onClickOverlay" />
    <view v-if="inited" class="ui-dropdown-item__content" :style="[contentStyle]" :class="[contentClass]" @transitionend="transition.end" @touchmove.prevent.stop="noop">
      <slot name="header" />
      <scroll-view scroll-y enable-flex :style="[scrollViewStyle]" @touchmove.stop="noop">
        <slot>
          <view class="ui-dropdown-item__options">
            <view v-for="(option, index) in options" :key="index" class="ui-dropdown-item__option" :class="{ 'is-select': isSelected(option) }" @click="onClickOption(option)">
              <text class="ui-dropdown-item__label" :style="[labelStyle(option)]">{{ option[labelField] }}</text>
              <view v-if="isSelected(option)" class="ui-dropdown-item__icon">
                <ui-icon name="success" :size="useUnit(props.iconSize)" :weight="iconWeight" :color="iconColor(option)" />
              </view>
            </view>
          </view>
        </slot>
      </scroll-view>
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { TransitionName } from "../hooks"
import type { DropdownItemValue, DropdownItemOption } from "./index"
import { noop } from "../utils/utils"
import { dropdownMenuKey } from "../ui-dropdown-menu"
import { dropdownItemEmits, dropdownItemProps } from "./index"
import { isDef, isArray, isEmpty, isNumber, isString } from "../utils/check"
import { ref, toRaw, watch, computed, nextTick, onMounted } from "vue"
import { useUnit, useColor, useStyle, useParent, useLockScroll, useSystemInfo, useTransition, useGlobalZIndex } from "../hooks"

// 定义组件名称
defineOptions({ name: "ui-dropdown-item" })

// 定义props和emits
const props = defineProps(dropdownItemProps)
const emits = defineEmits(dropdownItemEmits)
// 获取父组件实例
const { parent } = useParent(dropdownMenuKey)

// 使用transition hook
const transition = useTransition()

// 定义响应式变量
const zIndex = ref<number | string>()
const visible = ref(false)
const current = ref<any>("")
const windowHeight = ref(0)

// 计算属性: 是否已初始化
const inited = computed(() => transition.inited.value)

// 计算样式
const style = computed(() => {
  const style: CSSProperties = { zIndex: zIndex.value }
  const { top, bottom } = parent?.rect.value || {}
  if (prop("direction") === "up") style.bottom = `${windowHeight.value - top}px`
  if (prop("direction") === "down") style.top = `${bottom}px`
  if (isEmpty(transition.visible.value)) style.display = "none"
  return useStyle({ ...style, ...useStyle(props.customClass) })
})

// 计算类名
const classs = computed(() => {
  const list: string[] = [`ui-dropdown-item--${prop("direction")}`]
  return list
})

// 计算遮罩层样式
const overlayStyle = computed(() => {
  const style: CSSProperties = {}
  const direction = prop("direction")
  style.left = 0
  style.width = "100%"
  style.height = "100%"
  style.position = "absolute"
  if (direction === "up") style.bottom = 0
  if (direction === "down") style.top = 0
  return useStyle(style)
})

// 计算内容样式
const contentStyle = computed(() => {
  const style: CSSProperties = { zIndex: zIndex.value }
  style.background = useColor(props.background)
  if (prop("direction") === "up") {
    style.borderTopLeftRadius = useUnit(prop("borderRadius"))
    style.borderTopRightRadius = useUnit(prop("borderRadius"))
  }
  if (prop("direction") === "down") {
    style.borderBottomLeftRadius = useUnit(prop("borderRadius"))
    style.borderBottomRightRadius = useUnit(prop("borderRadius"))
  }
  if (isEmpty(transition.visible.value)) style.display = "none"
  return useStyle({ ...style, ...transition.styles.value })
})

// 计算内容类名
const contentClass = computed(() => {
  const list: string[] = [`ui-dropdown-item__content--${prop("direction")}`, transition.classs.value]
  return list
})

// 计算滚动视图样式
const scrollViewStyle = computed(() => {
  const style: CSSProperties = {}
  style.minHeight = useUnit(props.minHeight)
  style.maxHeight = useUnit(props.maxHeight)
  return useStyle(style)
})

// 计算标签样式
const labelStyle = computed(() => (option: DropdownItemOption) => {
  const style: CSSProperties = {}
  style.color = checkIsSelected(option) ? useColor(prop("activeOptionColor")) : useColor(prop("optionColor"))
  style.fontSize = useUnit(prop("optionSize"))
  style.fontWeight = useUnit(prop("optionWeight"))
  return useStyle(style)
})

// 计算标题
const title = computed(() => {
  if (props.mode === "multiple") return props.title
  const find = props.options.find((option) => option[props.valueField] === props.modelValue)
  return find ? find[props.labelField] : props.title
})

// 计算图标颜色
const iconColor = computed(() => (option: DropdownItemOption) => (checkIsSelected(option) ? useColor(prop("activeOptionColor")) : useColor(prop("optionColor"))))

// 计算是否选中
const isSelected = computed(() => (option: DropdownItemOption) => checkIsSelected(option))

// 监听modelValue的变化
watch(
  () => props.modelValue,
  (value) => {
    current.value = value
  },
  { immediate: true },
)

// 为transition的各个阶段绑定事件
transition.on("before-enter", () => emits("open"))
transition.on("after-enter", () => emits("opened"))
transition.on("before-leave", () => emits("close"))
transition.on("after-leave", () => emits("closed"))

// 重新计算窗口高度
function resize() {
  windowHeight.value = useSystemInfo().windowHeight
}

// 获取属性值
function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent.props[name])) return parent.props[name]
  return ""
}

// 初始化transition
function initTransition() {
  const modes = { up: "slide-up", down: "slide-down" }
  transition.init({ name: modes[prop("direction")] as TransitionName, duration: prop("duration") })
}

// 打开下拉菜单
function open() {
  if (visible.value) return
  initTransition()
  zIndex.value = isNumber(prop("zIndex")) ? prop("zIndex") : useGlobalZIndex()
  visible.value = true
  transition.enter()
}

// 关闭下拉菜单
function close() {
  visible.value = false
  transition.leave()
}

// 切换下拉菜单状态
function toggle(state = !visible.value) {
  state ? open() : close()
}

// 检查选项是否被选中
function checkIsSelected(option: DropdownItemOption) {
  if (props.mode === "multiple") {
    if (isArray(props.modelValue)) {
      return props.modelValue.includes(option[props.valueField])
    }
    if (isString(props.modelValue)) {
      return props.modelValue.split(",").includes(option[props.valueField])
    }
  }
  if (props.mode === "single") {
    return props.modelValue === option[props.valueField]
  }
  return false
}

// 更新值
async function updateValue(value: DropdownItemValue) {
  current.value = value
  emits("change", toRaw(value))
  await nextTick()
  emits("update:modelValue", toRaw(value))
}

// 点击选项时的处理函数
function onClickOption(option: DropdownItemOption) {
  if (props.mode === "multiple") {
    if (isArray(props.modelValue)) {
      const index = current.value.findIndex((val: any) => val === option[props.valueField])
      index >= 0 ? current.value.splice(index, 1) : current.value.push(option[props.valueField])
      updateValue(current.value)
    }
    if (isString(props.modelValue)) {
      const list = props.modelValue ? props.modelValue.split(",") : []
      const index = list.findIndex((val: any) => val === option[props.valueField])
      index >= 0 ? list.splice(index, 1) : list.push(option[props.valueField])
      updateValue(list.join(","))
    }
  }
  if (props.mode === "single") {
    if (props.modelValue === option[props.valueField]) return
    updateValue(option[props.valueField])
  }
}

// 点击遮罩层时的处理函数
function onClickOverlay() {
  if (prop("closeOnClickOverlay")) {
    parent.close()
  }
}

useLockScroll(() => visible.value)
onMounted(resize)
defineExpose({ props, title, visible, toggle })
</script>

<script lang="ts">
export default {
  name: "ui-dropdown-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
@use "../styles/animation.scss";

.ui-dropdown-item {
  left: 0;
  right: 0;
  overflow: hidden;
  position: fixed;
  border-top: var(--ui-border-width) solid var(--ui-color-background-dark);

  &--up {
    top: 0;
  }

  &--down {
    bottom: 0;
  }

  &__content {
    left: 0;
    width: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    flex-direction: column;
    background-color: var(--ui-color-background);

    &--up {
      bottom: 0;
    }

    &--down {
      top: 0;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
  }

  &__option {
    margin: 0 var(--ui-spacing-lg);
    display: flex;
    padding: var(--ui-spacing-lg) 0;
    position: relative;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child)::after {
      left: 0;
      right: 0;
      bottom: 0;
      content: " ";
      position: absolute;
      box-sizing: border-box;
      border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
      pointer-events: none;
    }

    &.is-select {
      color: var(--ui-color-primary);
    }
  }

  &__label {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    margin-right: var(--ui-spacing-lg);
    text-overflow: ellipsis;
  }

  &--up {
    .ui-dropdown-item__content {
      border-radius: var(--ui-radius-xl) var(--ui-radius-xl) 0 0;
    }
  }

  &--down {
    .ui-dropdown-item__content {
      border-radius: 0 0 var(--ui-radius-xl) var(--ui-radius-xl);
    }
  }
}
</style>
