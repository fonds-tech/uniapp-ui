<template>
  <view class="ui-switch" :class="[classs, customClass]" :style="[style]" @click="onClick">
    <view class="ui-switch__node" :style="[nodeStyle]">
      <ui-loading v-if="loading" :size="loadingIconSize" :color="loadingIconColor" />
      <slot v-else name="node" :value="active" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { isFunction } from "../utils/check"
import { switchEmits, switchProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-switch" })

const props = defineProps(switchProps)
const emits = defineEmits(switchEmits)

const active = ref(props.modelValue)
const switchRect = ref<UniApp.NodeInfo>({})
const nodeRect = ref<UniApp.NodeInfo>({})
const instance = getCurrentInstance()

const style = computed(() => {
  const style: any = {}
  style.background = isActive.value ? useColor(props.activeColor) : useColor(props.inactiveColor)
  if (props.size) {
    style.width = `${useUnitToPx(props.size) * 2}px`
    style.height = useUnit(props.size)
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (isActive.value) list.push("ui-switch--active")
  if (props.disabled) list.push("ui-switch--disabled")
  return list
})

const nodeStyle = computed(() => {
  const style: any = {}
  const size = useUnitToPx(props.size || "40rpx")
  const gutter = props.gutter ? useUnitToPx(props.gutter) : useUnitToPx("4rpx")
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

const isActive = computed(() => {
  return active.value === props.activeValue
})

watch(
  () => props.modelValue,
  (val) => {
    active.value = val
  },
)

watch(() => [props.size, props.gutter, props.customStyle], resize, { deep: true })

async function resize() {
  await nextTick()
  switchRect.value = await useRect(".ui-switch", instance)
  nodeRect.value = await useRect(".ui-switch__node", instance)
}

function onClick() {
  if (props.loading) return
  if (props.disabled) return
  updateValue(isActive.value ? props.inactiveValue : props.activeValue)
}

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
