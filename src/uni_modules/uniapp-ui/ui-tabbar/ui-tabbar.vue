<template>
  <view class="ui-tabbar">
    <view class="ui-tabbar__content" :class="[classs, customClass]" :style="[style]">
      <view class="ui-tabbar__list">
        <slot />
      </view>
      <ui-safe-area-bottom @height="onSafeAreaBottomHeight" />
    </view>
    <view class="ui-tabbar__placeholder" :style="[placeholderStyle]" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isFunction } from "../utils/check"
import { ref, watch, computed, getCurrentInstance, nextTick } from "vue"
import { tabbarKey, tabbarEmits, tabbarProps, useTabbarProps } from "./index"
import { useMitt, useRect, useColor, useStyle, usePxToRpx, useChildren, useUnitToRpx } from "../hooks"

defineOptions({ name: "ui-tabbar" })

const props = defineProps(tabbarProps)
const emits = defineEmits(tabbarEmits)
const useProps = useTabbarProps(props)
const { childrens, linkChildren } = useChildren(tabbarKey)

const mitt = useMitt()
const rect = ref<UniApp.NodeInfo>({ height: 0 })
const offsetHeight = ref(0)
const instance = getCurrentInstance()

const style = computed(() => {
  const style: CSSProperties = {}
  style.height = `${useUnitToRpx(useProps.height) + usePxToRpx(offsetHeight.value)}rpx`
  style.background = useColor(useProps.background)
  style.paddingBottom = `${useUnitToRpx(offsetHeight.value)}rpx`
  return useStyle({ ...useStyle(useProps.customStyle), ...style })
})

const classs = computed(() => {
  const list: string[] = []
  if (useProps.border) list.push("ui-tabbar__content--border")
  return list
})

const placeholderStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${useUnitToRpx(useProps.height) + usePxToRpx(offsetHeight.value)}rpx`
  return useStyle(style)
})

watch(
  () => useProps.modelValue,
  (value) => emits("change", value),
)

watch(() => childrens.length, resize)

function onEvent() {
  mitt.on("ui-tabbar:rect:get", async (cb: any) => {
    const result = await useRect(".ui-tabbar__content", instance)
    isFunction(cb) && cb(result)
  })
}

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
  emits("update:modelValue", value)
}

function onSafeAreaBottomHeight(height: number) {
  offsetHeight.value = height
  resize()
}

onEvent()
linkChildren({ props, useProps, updateValue })
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
    position: fixed;
    flex-direction: column;

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
