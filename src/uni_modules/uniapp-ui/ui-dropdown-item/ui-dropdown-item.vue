<template>
  <view class="ui-dropdown-item" :class="[classs, customClass]" :style="[style]">
    <ui-overlay v-if="parent.props.overlay" :show="visible" :z-index="zIndex" :duration="prop('duration')" :custom-style="overlayStyle" @click="onClickOverlay" />
    <view v-if="inited" class="ui-dropdown-item__content" :style="[contentStyle]" :class="[contentClass]" @transitionend="transition.end" @touchmove.prevent.stop="noop">
      <slot name="header" />
      <scroll-view scroll-y enable-flex :style="[scrollViewStyle]" @touchmove.stop="noop">
        <slot>
          <view class="ui-dropdown-item__options">
            <view v-for="(option, index) in options" :key="index" class="ui-dropdown-item__option" :class="{ 'is-select': isSelected(option) }" @click="onClickOption(option)">
              <text class="ui-dropdown-item__label" :style="[labelStyle(option)]">{{ option[parent.props.labelField] }}</text>
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

const inited = computed(() => transition.inited.value)

const style = computed(() => {
  const style: CSSProperties = { zIndex: zIndex.value }
  const { top, bottom } = parent?.rect.value || {}
  // 用 var(--window-top/bottom) 抵消自定义 navbar / H5 tabbar 偏移；默认页面两值为 0，无副作用
  if (prop("direction") === "up") style.bottom = `calc(var(--window-bottom) + ${windowHeight.value - top}px)`
  if (prop("direction") === "down") style.top = `calc(var(--window-top) + ${bottom}px)`
  if (isEmpty(transition.visible.value)) style.display = "none"
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = [`ui-dropdown-item--${prop("direction")}`]
  return list
})

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

const contentStyle = computed(() => {
  const style: Record<string, string | number | undefined> = { zIndex: zIndex.value }
  style.background = useColor(props.background)
  // borderRadius 注入 CSS var，SCSS 内按 direction 选择对应两个角；未设时走 SCSS 默认
  const radius = prop("borderRadius")
  if (radius !== undefined) style["--ui-dropdown-item-radius"] = useUnit(radius as any)
  if (isEmpty(transition.visible.value)) style.display = "none"
  return useStyle({ ...style, ...transition.styles.value })
})

const contentClass = computed(() => {
  const list: string[] = [`ui-dropdown-item__content--${prop("direction")}`, transition.classs.value]
  return list
})

const scrollViewStyle = computed(() => {
  const style: CSSProperties = {}
  style.minHeight = useUnit(props.minHeight)
  style.maxHeight = useUnit(props.maxHeight)
  return useStyle(style)
})

// 标签样式（普通函数，避免 computed 包装单参数函数的反模式）
function labelStyle(option: DropdownItemOption) {
  const style: CSSProperties = {}
  style.color = checkIsSelected(option) ? useColor(prop("activeOptionColor")) : useColor(prop("optionColor"))
  style.fontSize = useUnit(prop("optionSize") as any)
  style.fontWeight = prop("optionWeight") as any
  return useStyle(style)
}

// 图标颜色
function iconColor(option: DropdownItemOption) {
  return checkIsSelected(option) ? useColor(prop("activeOptionColor")) : useColor(prop("optionColor"))
}

// 选中态判定（template 透传给原 computed isSelected 名）
function isSelected(option: DropdownItemOption) {
  return checkIsSelected(option)
}

// 计算标题
const title = computed(() => {
  if (props.mode === "multiple") return props.title
  const find = props.options.find((option) => option[parent.props.valueField] === props.modelValue)
  return find ? find[parent.props.labelField] : props.title
})

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

// 获取属性值（自身优先，回退父级菜单；都未设则返回 undefined，保留 useUnit/useColor 内部默认行为）
// 返回 any 因 props/parent.props 字段类型异构，调用方按各自上下文使用
function prop(name: string): any {
  if (isDef(props[name as keyof typeof props])) return props[name as keyof typeof props]
  if (isDef(parent.props[name as keyof typeof parent.props])) return parent.props[name as keyof typeof parent.props]
  return undefined
}

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

function toggle(state = !visible.value) {
  state ? open() : close()
}

// 检查选项是否被选中
function checkIsSelected(option: DropdownItemOption) {
  if (props.mode === "multiple") {
    if (isArray(props.modelValue)) {
      return props.modelValue.includes(option[parent.props.valueField])
    }
    if (isString(props.modelValue)) {
      return props.modelValue.split(",").includes(option[parent.props.valueField])
    }
  }
  if (props.mode === "single") {
    return props.modelValue === option[parent.props.valueField]
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
      const index = current.value.findIndex((val: any) => val === option[parent.props.valueField])
      index >= 0 ? current.value.splice(index, 1) : current.value.push(option[parent.props.valueField])
      updateValue(current.value)
    }
    if (isString(props.modelValue)) {
      const list = props.modelValue ? props.modelValue.split(",") : []
      const index = list.findIndex((val: any) => val === option[parent.props.valueField])
      index >= 0 ? list.splice(index, 1) : list.push(option[parent.props.valueField])
      updateValue(list.join(","))
    }
  }
  if (props.mode === "single") {
    if (props.modelValue === option[parent.props.valueField]) return
    updateValue(option[parent.props.valueField])
  }
}

// 点击遮罩层时的处理函数
// closeOnClickOverlay 由父级 menu 统一控制（item 自身 default 会无法表达"未设置"，会覆盖 menu 的显式 false）
function onClickOverlay() {
  if (parent.props.closeOnClickOverlay) {
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
  border-top: var(--ui-border-width) solid var(--ui-color-border-light);

  &--up {
    top: 0;
  }

  &--down {
    bottom: 0;
  }

  &__content {
    --ui-dropdown-item-radius: var(--ui-radius-xl);

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
      border-radius: var(--ui-dropdown-item-radius) var(--ui-dropdown-item-radius) 0 0;
    }
  }

  &--down {
    .ui-dropdown-item__content {
      border-radius: 0 0 var(--ui-dropdown-item-radius) var(--ui-dropdown-item-radius);
    }
  }
}
</style>
