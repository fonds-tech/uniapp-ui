<template>
  <view class="ui-tabbar-item" :style="[style]" :class="[classs]" @click="onClick">
    <view class="ui-tabbar-item__icon" :style="[iconStyle]">
      <view class="ui-tabbar-item__icon__absolute">
        <slot name="icon">
          <ui-icon :name="icon" :size="iconSize" :weight="iconWeight" :custom-prefix="iconPrefix" />
        </slot>
      </view>
    </view>
    <view class="ui-tabbar-item__text" :style="[testStyle]">
      <slot />
    </view>
    <slot name="extra" />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { isDef } from "../utils/check"
import { tabbarKey } from "../ui-tabbar"
import { debounce, createUrlParams } from "../utils/utils"
import { tabbarItemEmits, tabbarItemProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-tabbar-item" })

const props = defineProps(tabbarItemProps)
const emits = defineEmits(tabbarItemEmits)

const { parent, index } = useParent(tabbarKey)

const style = computed(() => {
  const style: CSSProperties = {}
  return useStyle(style)
})

const classs = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tabbar-item--active")
  return list
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = useUnit(props.iconSize)
  style.color = active.value ? useColor(prop("activeColor")) : useColor(prop("inactiveColor"))
  return useStyle(style)
})

const testStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = active.value ? useColor(prop("activeColor")) : useColor(prop("inactiveColor"))
  return useStyle(style)
})

const name = computed(() => props.name || index.value)
const active = computed(() => parent?.props.modelValue === name.value)

function prop(name: string) {
  if (isDef(props[name])) return props[name]
  if (isDef(parent?.props[name])) return parent.props[name]
  return ""
}

function onClick() {
  emits("click", name.value)
  if (parent) {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (parent.props.route) {
      if (!props.route) {
        console.error("ui-tabbar-item: route is required")
        return
      } else if (props.route === page.route) {
        return
      }
      debounce(
        () => {
          uni[props.routeType]({
            url: `${props.route}${createUrlParams(props.routeParams)}`,
            fail: (err: any) => {
              throw err
            },
          })
        },
        300,
        true,
      )
    } else {
      parent.updateValue(name.value)
    }
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
  color: #999;
  display: flex;
  position: relative;
  align-items: center;
  line-height: 1;
  flex-direction: column;
  justify-content: center;

  &--active {
    color: var(--ui-color-primary);
  }

  &__icon {
    height: 44rpx;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 8rpx;
    justify-content: center;

    &__absolute {
      left: 50%;
      bottom: 0;
      display: flex;
      z-index: 1;
      position: absolute;
      transform: translateX(-50%);
    }
  }

  &__text {
    display: -webkit-box;
    overflow: hidden;
    align-items: center;
    text-overflow: ellipsis;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>
