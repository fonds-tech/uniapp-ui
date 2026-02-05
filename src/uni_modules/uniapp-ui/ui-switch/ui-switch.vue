<template>
  <view :id="switchId" class="ui-switch" :class="[classs, props.customClass]" :style="[style]" @click="onClick">
    <view v-if="props.activeText" class="ui-switch__text ui-switch__text--left" :style="[textStyle, { opacity: isActive ? 1 : 0 }]">
      {{ props.activeText }}
    </view>
    <view class="ui-switch__node" :style="[nodeStyle]">
      <ui-loading v-if="props.loading" :size="props.loadingIconSize" :color="props.loadingIconColor" />
      <slot v-else name="node" :checked="isActive" />
    </view>
    <view v-if="props.inactiveText" class="ui-switch__text ui-switch__text--right" :style="[textStyle, { opacity: isActive ? 0 : 1 }]">
      {{ props.inactiveText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { isDef, isFunction } from "../utils/check"
import { switchEmits, switchProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-switch" })

const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)

// 唯一 ID
const switchId = `switch-${Math.random().toString(36).slice(2, 10)}`

// 当前激活值
const active = ref(props.modelValue)
// 开关容器尺寸
const switchRect = ref<UniApp.NodeInfo>({})
// 节点尺寸
const nodeRect = ref<UniApp.NodeInfo>({})
// 组件实例
const instance = getCurrentInstance()!

// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.background = isActive.value ? useColor(props.activeColor) : useColor(props.inactiveColor)
  if (props.size) {
    style.width = `${useUnitToPx(props.size) * 2}px`
    style.height = useUnit(props.size)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classs = computed(() => {
  const list: string[] = []
  if (isActive.value) list.push("ui-switch--active")
  if (props.disabled) list.push("ui-switch--disabled")
  return list
})
// 节点样式
const nodeStyle = computed(() => {
  const style: any = {}
  const size = useUnitToPx(props.size || "40rpx")
  const gutter = isDef(props.gutter) ? useUnitToPx(props.gutter) : useUnitToPx("4rpx")
  const switchWidth = switchRect.value?.width || size * 2
  const nodeWidth = nodeRect.value?.width || size - gutter * 2
  style.top = `${gutter}px`
  style.left = `${gutter}px`
  style.width = `${size - gutter * 2}px`
  style.height = `${size - gutter * 2}px`

  if (isActive.value) {
    const distance = Math.max(switchWidth - nodeWidth - gutter * 2, 0)
    style.transform = `translateX(${distance}px)`
  }
  return useStyle(style)
})
// 文字样式
const textStyle = computed(() => {
  const style: any = {}
  if (props.textSize) style.fontSize = useUnit(props.textSize)
  if (props.textColor) style.color = useColor(props.textColor)
  if (props.textWeight) style.fontWeight = props.textWeight
  return style
})
// 是否激活
const isActive = computed(() => {
  return active.value === props.activeValue
})

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    active.value = val
  },
)
// 监听尺寸相关属性变化
watch(() => [props.size, props.gutter, props.customStyle], resize, { deep: true })

// 组件挂载时计算尺寸
onMounted(() => resize())

// 重新计算尺寸
async function resize() {
  await nextTick()
  switchRect.value = await useRect(`#${switchId}`, instance)
  nodeRect.value = await useRect(`#${switchId} .ui-switch__node`, instance)
}

// 点击事件
function onClick() {
  if (props.loading) return
  if (props.disabled) return
  updateValue(isActive.value ? props.inactiveValue : props.activeValue)
}

// 更新值
function updateValue(value: number | string | boolean) {
  const next = (val: number | string | boolean = value) => {
    active.value = val
    emits("change", active.value)
    emits("update:modelValue", active.value)
  }
  if (isFunction(props.beforeChange)) {
    props.beforeChange(value, next)
  } else {
    next()
  }
}

defineExpose({ name: "ui-switch" })
</script>

<script lang="ts">
export default {
  name: "ui-switch",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-switch {
  width: 80rpx;
  height: 40rpx;
  display: inline-flex;
  overflow: hidden;
  position: relative;
  box-sizing: content-box;
  transition: background-color var(--ui-transition-duration) cubic-bezier(0.3, 1.05, 0.4, 1.05);
  flex-shrink: 0;
  border-radius: var(--ui-radius-round);
  background-color: var(--ui-color-border);

  &--active {
    background-color: var(--ui-color-primary);
  }

  &--disabled {
    opacity: var(--ui-opacity-disabled);
  }

  &__text {
    color: var(--ui-color-text-inverse);
    padding: 0 8rpx;
    z-index: 1;
    font-size: 20rpx;
    align-self: center;
    transition: opacity var(--ui-transition-duration);
    line-height: 1;
    white-space: nowrap;

    &--left {
      margin-left: 8rpx;
      margin-right: auto;
    }

    &--right {
      margin-left: auto;
      margin-right: 8rpx;
    }
  }

  &__node {
    top: 4rpx;
    left: 4rpx;
    width: 32rpx;
    height: 32rpx;
    display: flex;
    position: absolute;
    box-shadow: var(--ui-shadow-sm);
    transition: transform var(--ui-transition-duration) cubic-bezier(0.3, 1.05, 0.4, 1.05);
    align-items: center;
    border-radius: 50%;
    justify-content: center;
    background-color: var(--ui-color-background);
  }
}
</style>
