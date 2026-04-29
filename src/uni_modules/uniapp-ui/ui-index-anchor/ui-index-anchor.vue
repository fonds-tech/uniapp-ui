<template>
  <view class="ui-index-anchor" :class="[classNames, customClass]" :style="[rootStyle]">
    <slot>
      <view class="ui-index-anchor__index" :style="[indexStyle]">{{ text }}</view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { indexBarKey } from "../ui-index-bar"
import { indexAnchorProps } from "./index"
import { ref, computed, getCurrentInstance } from "vue"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-index-anchor" })

const props = defineProps(indexAnchorProps)

const { index, parent } = useParent(indexBarKey)

const instance = getCurrentInstance()

const rect = ref<UniApp.NodeInfo | null>(null)

const name = computed(() => (isDef(props.name) ? props.name : index.value))
const isActive = computed(() => parent?.currentName?.value === name.value)
const classNames = computed(() => (isActive.value ? "is-active" : ""))

const rootStyle = computed(() => {
  const style: CSSProperties = {
    height: useUnit(props.height),
    background: useColor(isActive.value ? props.stickyBackground : props.background),
  }
  // 父组件 sticky=true 时锚点用 position:sticky 自动吸顶；后锚点 z-index 更高覆盖前者
  if (parent?.props?.sticky) {
    style.top = 0
    style.position = "sticky"
    style.zIndex = index.value + 1
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const indexStyle = computed(() => {
  const style: CSSProperties = isActive.value
    ? { color: useColor(props.stickyColor), fontSize: useUnit(props.stickyFontSize), fontWeight: props.stickyFontWeight }
    : { color: useColor(props.color), fontSize: useUnit(props.fontSize), fontWeight: props.fontWeight }
  return useStyle(style)
})

async function resize() {
  rect.value = await useRect(".ui-index-anchor", instance)
}

defineExpose({ rect, name, resize })
</script>

<script lang="ts">
export default {
  name: "ui-index-anchor",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-index-anchor {
  height: 60rpx;
  display: flex;
  align-items: center;

  &.is-active {
    color: var(--ui-color-primary);
    background-color: var(--ui-color-text-inverse);
  }

  &__index {
    flex: 1;
    padding: 12rpx 24rpx;
  }
}
</style>
