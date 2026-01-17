<template>
  <view v-if="isVisible" class="ui-avatar" :class="[classNames, customClass]" :style="rootStyle" @click="onClick">
    <!-- 图片头像 -->
    <image
      v-if="useProps.src && !hasError"
      class="ui-avatar__image"
      :src="useProps.src"
      :mode="imageMode"
      :lazy-load="useProps.lazyLoad"
      @load="onImageLoad"
      @error="onImageError"
    />
    <!-- 加载失败时的内容 -->
    <template v-else-if="hasError">
      <slot name="error">
        <view class="ui-avatar__fallback">
          <ui-icon name="image-error" :color="fallbackIconColor" :size="iconSizeValue" />
        </view>
      </slot>
    </template>
    <!-- 图标头像 -->
    <template v-else-if="useProps.icon">
      <view class="ui-avatar__icon">
        <ui-icon :name="useProps.icon" :color="iconColorValue" :size="iconSizeValue" />
      </view>
    </template>
    <!-- 文字头像 -->
    <template v-else-if="useProps.text">
      <view class="ui-avatar__text" :style="textStyle">
        {{ displayText }}
      </view>
    </template>
    <!-- 默认插槽 -->
    <template v-else>
      <slot>
        <view class="ui-avatar__fallback">
          <ui-icon name="user" :color="fallbackIconColor" :size="iconSizeValue" />
        </view>
      </slot>
    </template>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { avatarGroupKey } from "../ui-avatar-group"
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { avatarEmits, avatarProps, useAvatarProps } from "./index"

// 定义组件名称
defineOptions({ name: "ui-avatar" })

// 定义 props 和 emits
const props = defineProps(avatarProps)
const emits = defineEmits(avatarEmits)
const useProps = useAvatarProps(props)

// 获取父级头像组组件
const { parent: avatarGroup, index: avatarIndex } = useParent(avatarGroupKey)

// 图片加载状态
const hasError = ref(false)

// 是否在头像组内
const inGroup = computed(() => !!avatarGroup)

// 从头像组获取配置
const groupConfig = computed(() => {
  if (!avatarGroup) return null
  return avatarGroup.useProps
})

// 是否可见（如果在组内，需要检查是否超出 max 限制）
const isVisible = computed(() => {
  if (!inGroup.value || !avatarGroup) return true
  const max = Number(groupConfig.value?.max) || 5
  return avatarIndex.value < max
})

// 图片模式映射（UniApp image mode）
const imageModeMap: Record<string, UniHelper.ImageProps["mode"]> = {
  contain: "aspectFit",
  cover: "aspectFill",
  fill: "scaleToFill",
  none: "center",
  "scale-down": "aspectFit",
}

// 计算图片模式
const imageMode = computed(() => {
  return imageModeMap[useProps.fit] || "aspectFill"
})

// 预设尺寸映射
const sizeMap: Record<string, string> = {
  mini: "48rpx",
  small: "64rpx",
  medium: "80rpx",
  large: "120rpx",
}

// 计算实际尺寸（优先使用组的配置）
const actualSize = computed(() => {
  if (inGroup.value && groupConfig.value?.size) {
    return groupConfig.value.size
  }
  return useProps.size
})

// 计算实际形状（优先使用组的配置）
const actualShape = computed(() => {
  if (inGroup.value && groupConfig.value?.shape) {
    return groupConfig.value.shape
  }
  return useProps.shape
})

// 计算尺寸值
const sizeValue = computed(() => {
  const size = actualSize.value
  if (typeof size === "string") {
    if (size in sizeMap) return useUnit(sizeMap[size], "px")
    const normalized = size.trim()
    if (normalized.endsWith("px") || normalized.endsWith("rpx")) return useUnit(normalized, "px")
  }
  return useUnit(size, "px")
})

// 计算图标大小（默认为头像尺寸的 50%）
const iconSizeValue = computed(() => {
  if (useProps.iconSize) {
    return useUnit(useProps.iconSize, "px")
  }
  const size = actualSize.value
  if (typeof size === "string" && size in sizeMap) {
    // 预设尺寸对应的图标大小
    const iconSizeMap: Record<string, string> = {
      mini: "24rpx",
      small: "32rpx",
      medium: "40rpx",
      large: "60rpx",
    }
    return useUnit(iconSizeMap[size], "px")
  }
  // 自定义尺寸时，图标为头像的 50%
  return `calc(${sizeValue.value} * 0.5)`
})

// 计算文字大小（默认为头像尺寸的 40%）
const textSizeValue = computed(() => {
  if (useProps.textSize) {
    return useUnit(useProps.textSize, "px")
  }
  const size = actualSize.value
  if (typeof size === "string" && size in sizeMap) {
    const textSizeMap: Record<string, string> = {
      mini: "20rpx",
      small: "24rpx",
      medium: "28rpx",
      large: "40rpx",
    }
    return useUnit(textSizeMap[size], "px")
  }
  return `calc(${sizeValue.value} * 0.4)`
})

// 显示的文字（截取前两个字符）
const displayText = computed(() => {
  const text = useProps.text
  if (!text) return ""
  return text.slice(0, 2)
})

// 图标颜色
const iconColorValue = computed(() => {
  return useProps.iconColor || "var(--ui-color-text-placeholder)"
})

// 回退图标颜色
const fallbackIconColor = computed(() => {
  return "var(--ui-color-text-placeholder)"
})

// 计算根元素样式
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = sizeValue.value
  style.height = sizeValue.value

  if (useProps.background) {
    style.background = useColor(useProps.background)
  }

  // 处理边框：优先使用组件自身的配置，如果在组内且未自定义则使用组的配置
  const borderColor = useProps.borderColor || (inGroup.value ? groupConfig.value?.borderColor : "")
  const borderWidth = useProps.borderWidth || (inGroup.value ? groupConfig.value?.borderWidth : "")

  if (borderColor) {
    style.borderColor = useColor(borderColor)
    style.borderWidth = useUnit(borderWidth, "px") || "2px"
    style.borderStyle = "solid"
  }

  // 自定义圆角（仅 square 形状时生效）
  if (actualShape.value === "square" && useProps.radius) {
    style.borderRadius = useUnit(useProps.radius)
  }

  // 如果在头像组内，添加堆叠相关的样式
  if (inGroup.value && groupConfig.value) {
    const gap = groupConfig.value.gap
    const direction = groupConfig.value.direction
    const max = Number(groupConfig.value.max) || 5

    // 设置 z-index 实现堆叠效果
    if (direction === "right") {
      // 右侧在上：索引越大 z-index 越大
      style.zIndex = avatarIndex.value + 1
    } else {
      // 左侧在上：索引越小 z-index 越大
      style.zIndex = max - avatarIndex.value
    }

    // 设置左边距（第一个头像不需要）
    if (avatarIndex.value > 0) {
      style.marginLeft = useUnit(gap)
    }
  }

  const customStyle = useStyle(useProps.customStyle)
  const mergedStyle = useStyle({ ...style, ...(customStyle && typeof customStyle === "object" ? customStyle : {}) })
  return useStyle(mergedStyle, "string")
})

// 计算文字样式
const textStyle = computed(() => {
  const style: CSSProperties = {}
  style.fontSize = textSizeValue.value
  if (useProps.textColor) {
    style.color = useColor(useProps.textColor)
  }
  return useStyle(style, "string")
})

// 计算类名
const classNames = computed(() => {
  const classList: string[] = []
  classList.push(`ui-avatar--${actualShape.value}`)
  const size = actualSize.value
  if (typeof size === "string" && size in sizeMap) {
    classList.push(`ui-avatar--${size}`)
  }
  // 如果在组内添加特定类名
  if (inGroup.value) {
    classList.push("ui-avatar--in-group")
  }
  return classList
})

// 图片加载成功
function onImageLoad(event: any) {
  hasError.value = false
  emits("load", event)
}

// 图片加载失败
function onImageError(event: any) {
  hasError.value = true
  emits("error", event)
}

// 点击事件
function onClick(event: any) {
  emits("click", event)
}

// 监听 src 变化，重置错误状态
watch(
  () => useProps.src,
  () => {
    hasError.value = false
  },
)
</script>

<script lang="ts">
export default {
  name: "ui-avatar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-avatar {
  display: inline-flex;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  vertical-align: middle;
  justify-content: center;
  background-color: var(--ui-color-background-light);

  &__image {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    color: var(--ui-color-text-secondary);
    display: flex;
    align-items: center;
    font-weight: 500;
    white-space: nowrap;
    text-transform: uppercase;
    justify-content: center;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 形状
  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: var(--ui-radius-md);
  }

  // 预设尺寸
  &--mini {
    width: 48rpx;
    height: 48rpx;
  }

  &--small {
    width: 64rpx;
    height: 64rpx;
  }

  &--medium {
    width: 80rpx;
    height: 80rpx;
  }

  &--large {
    width: 120rpx;
    height: 120rpx;
  }
}
</style>
