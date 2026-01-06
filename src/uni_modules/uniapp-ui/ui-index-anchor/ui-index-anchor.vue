<template>
  <view class="ui-index-anchor" :class="[classs, customClass]" :style="[style]">
    <slot>
      <view class="ui-index-anchor__index" :style="[indexStyle]">
        {{ text }}
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue"

import { isDef } from "../utils/check"
import { indexBarKey } from "../ui-index-bar"
import { indexAnchorProps, useIndexAnchorProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-index-anchor" })

const props = defineProps(indexAnchorProps)
const useProps = useIndexAnchorProps(props)

const { index, parent } = useParent(indexBarKey)

const rect = ref<UniApp.NodeInfo>(null)
const instance = getCurrentInstance()

const classs = computed(() => {
  const list: any = []
  if (isActive.value) list.push("is-active")
  return list
})

const style = computed(() => {
  const style: any = {}
  style.height = useUnit(useProps.height)
  style.background = useColor(useProps.background)
  if (isActive.value) style.background = useColor(useProps.stickyBackground)
  if (parent.useProps.sticky) {
    style.top = 0
    style.position = "sticky"
  }
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const indexStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.fontSize)
  style.fontWeight = useProps.fontWeight
  if (isActive.value) {
    style.color = useColor(useProps.stickyColor)
    style.fontSize = useUnit(useProps.stickyFontSize)
    style.fontWeight = useProps.stickyFontWeight
  }
  return useStyle(style)
})

const name = computed(() => (isDef(useProps.name) ? useProps.name : index.value))
const isActive = computed(() => parent.currentName.value === name.value)

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
  z-index: 2;
  align-items: center;

  &.is-active {
    color: var(--ui-color-primary);
    background-color: #fff;
  }

  &__index {
    flex: 1;
    padding: 12rpx 24rpx;
  }
}
</style>
