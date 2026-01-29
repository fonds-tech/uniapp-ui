<template>
  <view class="ui-tabbar">
    <view class="ui-tabbar__content" :class="[classs, customClass]" :style="[style]">
      <view class="ui-tabbar__list">
        <slot />
      </view>
      <ui-safe-area-bottom v-if="props.safeAreaInsetBottom" @height="onSafeAreaBottomHeight" />
    </view>
    <view v-if="props.fixed && props.placeholder" class="ui-tabbar__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isFunction } from "../utils/check"
import { tabbarKey, tabbarEmits, tabbarProps } from "./index"
import { ref, watch, computed, nextTick, onUnmounted, getCurrentInstance } from "vue"
import { useMitt, useRect, useColor, useStyle, usePxToRpx, useChildren, useUnitToRpx } from "../hooks"

defineOptions({ name: "ui-tabbar" })

const props = defineProps(tabbarProps)
const emits = defineEmits(tabbarEmits)
const { childrens, linkChildren } = useChildren(tabbarKey)

const mitt = useMitt()
const rect = ref<UniApp.NodeInfo>({ height: 0 })
const offsetHeight = ref(0)
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.height = `${useUnitToRpx(props.height) + usePxToRpx(offsetHeight.value)}rpx`
  style.background = useColor(props.background)
  style.paddingBottom = `${usePxToRpx(offsetHeight.value)}rpx`
  if (props.zIndex) style.zIndex = +props.zIndex
  return useStyle({ ...useStyle(props.customStyle), ...style })
})

const classs = computed(() => {
  const list: string[] = []
  if (props.border) list.push("ui-tabbar__content--border")
  if (props.fixed) list.push("ui-tabbar__content--fixed")
  return list
})

const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${useUnitToRpx(props.height) + usePxToRpx(offsetHeight.value)}rpx`
  return useStyle(style)
})

watch(
  () => props.modelValue,
  (value) => emits("change", value),
)

watch(() => childrens.length, resize)

async function rectGetHandler(cb: any) {
  const result = await useRect(".ui-tabbar__content", instance)
  isFunction(cb) && cb(result)
}

function onEvent() {
  mitt.on("ui-tabbar:rect:get", rectGetHandler)
}

onUnmounted(() => {
  mitt.off("ui-tabbar:rect:get", rectGetHandler)
})

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-tabbar__content", instance)
  if (rect.value) {
    emits("rect", rect.value)
    emits("height", rect.value.height)
    mitt.emit("ui-tabbar.rect", rect.value)
  }
}

async function updateValue(value: string | number) {
  if (props.beforeChange) {
    try {
      const result = await props.beforeChange(value)
      if (result === false) return
    } catch {
      return
    }
  }
  emits("update:modelValue", value)
}

function onSafeAreaBottomHeight(height: number) {
  offsetHeight.value = height
  resize()
}

onEvent()
linkChildren({ props, updateValue })
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-tabbar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-tabbar {
  width: 100%;
  display: flex;
  z-index: var(--ui-z-index-fixed);
  position: relative;
  margin-top: auto;
  flex-direction: column;

  &__list {
    height: 100%;
    display: flex;
  }

  &__content {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: relative;
    flex-direction: column;

    &--fixed {
      position: fixed;
    }

    &--border::after {
      inset: -50%;
      border: var(--ui-border-width) solid var(--ui-color-border-light);
      content: " ";
      position: absolute;
      transform: scale(0.5);
      box-sizing: border-box;
      pointer-events: none;
    }
  }

  &__placeholder {
    width: 100%;
    user-select: none;
    pointer-events: none;
  }
}
</style>
