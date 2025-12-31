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
import { isDef } from "../utils/check"
import { indexBarKey } from "../ui-index-bar"
import { indexAnchorProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-index-anchor" })

const props = defineProps(indexAnchorProps)

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
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  if (isActive.value) style.background = useColor(props.stickyBackground)
  if (parent.props.sticky) {
    style.top = 0
    style.position = "sticky"
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const indexStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  if (isActive.value) {
    style.color = useColor(props.stickyColor)
    style.fontSize = useUnit(props.stickyFontSize)
    style.fontWeight = props.stickyFontWeight
  }
  return useStyle(style)
})

const name = computed(() => (isDef(props.name) ? props.name : index.value))
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
