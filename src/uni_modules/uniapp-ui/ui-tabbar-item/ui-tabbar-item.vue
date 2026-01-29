<template>
  <view class="ui-tabbar-item" :style="[style, props.customStyle]" :class="[classs, props.customClass]" @click="onClick">
    <view class="ui-tabbar-item__icon" :style="[iconStyle]">
      <ui-badge :dot="props.dot" :value="props.badge">
        <slot name="icon">
          <image v-if="isImageIcon" :src="currentIcon" class="ui-tabbar-item__image" mode="aspectFit" />
          <ui-icon v-else :name="currentIcon" :size="props.iconSize" :weight="props.iconWeight" :custom-prefix="props.iconPrefix" />
        </slot>
      </ui-badge>
    </view>
    <view v-if="props.text || $slots.default" class="ui-tabbar-item__text" :style="[textStyle]">
      <slot>{{ props.text }}</slot>
    </view>
    <slot name="extra" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { computed } from "vue"
import { tabbarKey } from "../ui-tabbar"
import { createUrlParams } from "../utils/utils"
import { tabbarItemEmits, tabbarItemProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-tabbar-item" })

const props = defineProps(tabbarItemProps)
const emits = defineEmits(tabbarItemEmits)
const { parent, index } = useParent(tabbarKey)

let navigating = false

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle(style)
})

const classs = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tabbar-item--active")
  if (props.disabled) list.push("ui-tabbar-item--disabled")
  return list
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = useUnit(props.iconSize)
  style.color = active.value ? useColor(prop("activeColor")) : useColor(prop("inactiveColor"))
  return useStyle(style)
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = active.value ? useColor(prop("activeColor")) : useColor(prop("inactiveColor"))
  return useStyle(style)
})

const name = computed(() => (isDef(props.name) ? props.name : index.value))
const active = computed(() => parent?.props.modelValue === name.value)
const currentIcon = computed(() => {
  if (active.value && props.activeIcon) return props.activeIcon
  return props.icon
})

const isImageIcon = computed(() => {
  const icon = currentIcon.value
  if (!icon) return false
  if (/^(?:https?:|data:|\/|\.\.?\/)/.test(icon)) return true
  return /\.(?:png|jpe?g|gif|svg|webp|ico|bmp)$/i.test(icon)
})

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent?.props[name])) return parent.props[name]
  return ""
}

function normalizeRoute(route: string) {
  return route.replace(/^\//, "")
}

function onClick() {
  if (props.disabled) return
  emits("click", name.value)
  if (!parent) return

  if (parent.props.route) {
    if (!props.route) {
      console.error("ui-tabbar-item: route is required")
      return
    }
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (normalizeRoute(props.route) === normalizeRoute(page.route || "")) {
      return
    }
    if (navigating) return
    navigating = true
    parent.updateValue(name.value)
    uni[props.routeType]({
      url: props.routeType === "switchTab" ? props.route : `${props.route}${createUrlParams(props.routeParams)}`,
      complete: () => {
        navigating = false
      },
    })
  } else {
    parent.updateValue(name.value)
  }
}

defineExpose({ name, index })
</script>

<script lang="ts">
export default {
  name: "ui-tabbar-item",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-tabbar-item {
  flex: 1;
  color: var(--ui-color-text-secondary);
  display: flex;
  position: relative;
  align-items: center;
  line-height: 1;
  flex-direction: column;
  justify-content: center;

  &--active {
    color: var(--ui-color-primary);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  &__icon {
    height: var(--ui-icon-size-md);
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: var(--ui-spacing-sm);
    justify-content: center;
  }

  &__image {
    width: var(--ui-icon-size-md);
    height: var(--ui-icon-size-md);
  }

  &__text {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 1;
    align-items: center;
    text-overflow: ellipsis;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
