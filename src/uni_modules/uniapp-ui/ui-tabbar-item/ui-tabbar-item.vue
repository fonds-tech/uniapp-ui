<template>
  <view class="ui-tabbar-item" :class="[classNames, customClass]" :style="[rootStyle]" @click="onClick">
    <view class="ui-tabbar-item__icon">
      <ui-badge :dot="props.dot" :value="props.badge">
        <slot name="icon">
          <image v-if="isImageIcon" :src="currentIcon" class="ui-tabbar-item__image" mode="aspectFit" />
          <ui-icon v-else :name="currentIcon" :size="props.iconSize" :weight="props.iconWeight" :custom-prefix="props.iconPrefix" />
        </slot>
      </ui-badge>
    </view>
    <view v-if="props.text || $slots.default" class="ui-tabbar-item__text">
      <slot>{{ props.text }}</slot>
    </view>
    <slot name="extra" />
  </view>
</template>

<script setup lang="ts">
import type { TabbarProps } from "../ui-tabbar"
import type { CSSProperties } from "vue"
import type { TabbarRouteType } from "./index"
import { isDef } from "../utils/check"
import { tabbarKey } from "../ui-tabbar"
import { ref, computed } from "vue"
import { createUrlParams } from "../utils/utils"
import { useColor, useStyle, useParent } from "../hooks"
import { tabbarItemEmits, tabbarItemProps } from "./index"

defineOptions({ name: "ui-tabbar-item" })

const props = defineProps(tabbarItemProps)
const emits = defineEmits(tabbarItemEmits)
const { parent, index } = useParent(tabbarKey)

// 导航锁，防止路由切换期间重复点击
const navigating = ref(false)

const name = computed(() => (isDef(props.name) ? props.name : index.value))
const active = computed(() => parent?.props.modelValue === name.value)

const classNames = computed(() => {
  const list: string[] = []
  if (active.value) list.push("ui-tabbar-item--active")
  if (props.disabled) list.push("ui-tabbar-item--disabled")
  return list
})

// 根节点 CSS var 注入：颜色由 active/inactive 通过 SCSS class 单路径切换
const rootStyle = computed(() => {
  const vars: Record<string, string | undefined> = {}
  const activeColor = inherit("activeColor")
  const inactiveColor = inherit("inactiveColor")
  if (isDef(activeColor)) vars["--ui-tabbar-item-color-active"] = useColor(activeColor as string)
  if (isDef(inactiveColor)) vars["--ui-tabbar-item-color-inactive"] = useColor(inactiveColor as string)
  return useStyle({ ...vars, ...useStyle(props.customStyle) } as CSSProperties)
})

const currentIcon = computed(() => {
  if (active.value && props.activeIcon) return props.activeIcon
  return props.icon ?? ""
})

// URL / data: / 绝对路径 / 相对路径 / 已知图片后缀 → 图片
const isImageIcon = computed(() => {
  const icon = currentIcon.value
  if (!icon) return false
  if (/^(?:https?:|data:|\/|\.\.?\/)/.test(icon)) return true
  const clean = icon.split(/[?#]/)[0]
  return /\.(?:png|jpe?g|gif|svg|webp|ico|bmp)$/i.test(clean)
})

// 自身 prop 优先，缺省回退到父 ui-tabbar 同名 prop
function inherit<K extends keyof TabbarProps>(key: K): unknown {
  const self = (props as Record<string, unknown>)[key as string]
  if (isDef(self)) return self
  return parent?.props?.[key]
}

function normalizeRoute(route: string) {
  return route.replace(/^\//, "")
}

async function onClick() {
  if (props.disabled) return
  emits("click", name.value)
  if (!parent) return

  if (!parent.props.route) {
    parent.updateValue(name.value)
    return
  }

  // 路由模式
  if (!props.route) {
    console.warn("[ui-tabbar-item] route 模式下 item.route 必填")
    return
  }
  if (parent.props.beforeChange) {
    try {
      const result = await parent.props.beforeChange(name.value)
      if (result === false) return
    } catch (err) {
      console.warn("[ui-tabbar-item] beforeChange rejected", err)
      return
    }
  }
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (normalizeRoute(props.route) === normalizeRoute(page?.route || "")) return
  if (navigating.value) return
  navigating.value = true
  parent.updateValue(name.value)
  const routeType = (props.routeType as TabbarRouteType) || "switchTab"
  const url = routeType === "switchTab" ? props.route : `${props.route}${createUrlParams(props.routeParams)}`
  uni[routeType]({
    url,
    complete: () => {
      navigating.value = false
    },
  })
}

defineExpose({ name, index })
</script>

<script lang="ts">
export default {
  name: "ui-tabbar-item",
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
.ui-tabbar-item {
  --ui-tabbar-item-color-active: var(--ui-color-primary);
  --ui-tabbar-item-color-inactive: var(--ui-color-text-secondary);

  flex: 1;
  color: var(--ui-tabbar-item-color-inactive);
  display: flex;
  position: relative;
  align-items: center;
  line-height: 1;
  flex-direction: column;
  justify-content: center;

  &--active {
    color: var(--ui-tabbar-item-color-active);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }

  &__icon {
    color: inherit;
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
    color: inherit;
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
