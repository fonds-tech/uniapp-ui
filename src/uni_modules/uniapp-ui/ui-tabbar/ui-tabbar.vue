<template>
  <view class="ui-tabbar">
    <view class="ui-tabbar__content" :class="[classNames, customClass]" :style="[contentStyle]">
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
import { useMitt, useRect, useUnit, useColor, useStyle, usePxToRpx, useChildren, useUnitToRpx } from "../hooks"

defineOptions({ name: "ui-tabbar" })

const props = defineProps(tabbarProps)
const emits = defineEmits(tabbarEmits)
const { childrens, linkChildren } = useChildren(tabbarKey)

const mitt = useMitt()
const instance = getCurrentInstance()
// tabbar 容器实际尺寸（含安全区）
const rect = ref<UniApp.NodeInfo>({ height: 0 })
// 底部安全区高度（px）
const offsetHeight = ref(0)

const classNames = computed(() => {
  const list: string[] = []
  if (props.border) list.push("ui-tabbar__content--border")
  if (props.fixed) list.push("ui-tabbar__content--fixed")
  return list
})

// 总高度 = height(rpx) + 安全区(px→rpx)
const totalHeightRpx = computed(() => useUnitToRpx(props.height) + usePxToRpx(offsetHeight.value))

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = `${totalHeightRpx.value}rpx`
  style.paddingBottom = `${usePxToRpx(offsetHeight.value)}rpx`
  if (props.background) style.background = useColor(props.background)
  if (props.zIndex !== undefined) style.zIndex = useUnit(props.zIndex)
  return useStyle({ ...useStyle(props.customStyle), ...style })
})

const placeholderStyle = computed<CSSProperties>(() => ({
  height: `${totalHeightRpx.value}rpx`,
}))

watch(
  () => props.modelValue,
  (value) => emits("change", value),
)

// 子项数量变化重新测尺寸
watch(() => childrens.length, resize)

// mitt 跨组件取尺寸接口
async function rectGetHandler(cb: unknown) {
  const result = await useRect(".ui-tabbar__content", instance)
  if (isFunction(cb)) cb(result)
}

mitt.on("ui-tabbar:rect:get", rectGetHandler)
onUnmounted(() => mitt.off("ui-tabbar:rect:get", rectGetHandler))

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-tabbar__content", instance)
  if (!rect.value) return
  emits("rect", rect.value)
  emits("height", rect.value.height || 0)
  mitt.emit("ui-tabbar.rect", rect.value)
}

async function updateValue(value: string | number) {
  if (props.beforeChange) {
    try {
      const result = await props.beforeChange(value)
      if (result === false) return
    } catch (err) {
      console.warn("[ui-tabbar] beforeChange rejected", err)
      return
    }
  }
  emits("update:modelValue", value)
}

function onSafeAreaBottomHeight(height: number) {
  offsetHeight.value = height
  resize()
}

linkChildren({ props, updateValue })
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-tabbar",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-tabbar {
  --ui-tabbar-background: var(--ui-color-background);

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
    background: var(--ui-tabbar-background);
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
