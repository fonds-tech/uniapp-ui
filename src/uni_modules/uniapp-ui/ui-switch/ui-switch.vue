<template>
  <view :id="switchId" class="ui-switch" :class="[classs, useProps.customClass]" :style="[style]" @click="onClick">
    <view v-if="useProps.activeText" class="ui-switch__text ui-switch__text--left" :style="[textStyle, { opacity: isActive ? 1 : 0 }]">
      {{ useProps.activeText }}
    </view>
    <view class="ui-switch__node" :style="[nodeStyle]">
      <ui-loading v-if="useProps.loading" :size="useProps.loadingIconSize" :color="useProps.loadingIconColor" />
      <slot v-else name="node" :checked="isActive" />
    </view>
    <view v-if="useProps.inactiveText" class="ui-switch__text ui-switch__text--right" :style="[textStyle, { opacity: isActive ? 0 : 1 }]">
      {{ useProps.inactiveText }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { isFunction } from "../utils/check"
import { switchEmits, switchProps, useSwitchProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-switch" })

const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)
const useProps = useSwitchProps(props)

const switchId = `switch-${Math.random().toString(36).slice(2, 10)}`

const active = ref(useProps.modelValue)
const switchRect = ref<UniApp.NodeInfo>({})
const nodeRect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()!

const style = computed(() => {
  const style: any = {}
  style.background = isActive.value ? useColor(useProps.activeColor) : useColor(useProps.inactiveColor)
  if (useProps.size) {
    style.width = `${useUnitToPx(useProps.size) * 2}px`
    style.height = useUnit(useProps.size)
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (isActive.value) list.push("ui-switch--active")
  if (useProps.disabled) list.push("ui-switch--disabled")
  return list
})

const nodeStyle = computed(() => {
  const style: any = {}
  const size = useUnitToPx(useProps.size || "40rpx")
  const gutter = useProps.gutter ? useUnitToPx(useProps.gutter) : useUnitToPx("4rpx")
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

const textStyle = computed(() => {
  const style: any = {}
  if (useProps.textSize) style.fontSize = useUnit(useProps.textSize)
  if (useProps.textColor) style.color = useColor(useProps.textColor)
  if (useProps.textWeight) style.fontWeight = useProps.textWeight
  return style
})

const isActive = computed(() => {
  return active.value === useProps.activeValue
})

watch(
  () => useProps.modelValue,
  (val) => {
    active.value = val
  },
)

watch(() => [useProps.size, useProps.gutter, useProps.customStyle], resize, { deep: true })

async function resize() {
  await nextTick()
  switchRect.value = await useRect(`#${switchId}`, instance)
  nodeRect.value = await useRect(`#${switchId} .ui-switch__node`, instance)
}

function onClick() {
  if (useProps.loading) return
  if (useProps.disabled) return
  updateValue(isActive.value ? useProps.inactiveValue : useProps.activeValue)
}

function updateValue(value: number | string | boolean) {
  const next = (val: number | string | boolean = value) => {
    active.value = val
    emits("change", active.value)
    emits("update:modelValue", active.value)
  }
  if (isFunction(useProps.beforeChange)) {
    useProps.beforeChange(value, next)
  } else {
    next()
  }
}

onMounted(() => resize())
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
    color: #fff;
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
