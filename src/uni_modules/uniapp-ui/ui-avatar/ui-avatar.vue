<template>
  <view v-if="isVisible" class="ui-avatar" :class="[classNames, props.customClass]" :style="[rootStyle]" @click="emits('click', $event)">
    <image v-if="props.src && !hasError" class="ui-avatar__image" :src="props.src" :mode="imageMode" :lazy-load="props.lazyLoad" @load="onImageLoad" @error="onImageError" />

    <template v-else-if="hasError">
      <slot name="error">
        <view class="ui-avatar__fallback">
          <ui-icon name="photo-fail" />
        </view>
      </slot>
    </template>

    <template v-else-if="props.icon">
      <view class="ui-avatar__icon">
        <ui-icon :name="props.icon" />
      </view>
    </template>

    <template v-else-if="props.text">
      <view class="ui-avatar__text">{{ displayText }}</view>
    </template>

    <template v-else>
      <slot>
        <view class="ui-avatar__fallback">
          <ui-icon name="user-o" />
        </view>
      </slot>
    </template>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { avatarGroupKey } from "../ui-avatar-group"
import { ref, watch, computed } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { avatarEmits, avatarProps, AVATAR_IMAGE_MODE_MAP } from "./index"

defineOptions({ name: "ui-avatar" })

const props = defineProps(avatarProps)
const emits = defineEmits(avatarEmits)

// 父级头像组（决定 size/shape/border 等回退值与堆叠顺序）
const { parent: avatarGroup, index: avatarIndex } = useParent(avatarGroupKey)

// 图片是否加载失败
const hasError = ref(false)

// 是否在头像组内
const inGroup = computed(() => !!avatarGroup)
// uniapp <image> mode（默认 aspectFill）
const imageMode = computed(() => AVATAR_IMAGE_MODE_MAP[props.fit] ?? "aspectFill")
// 实际尺寸（组配置覆盖独立 prop）
const actualSize = computed(() => groupConfig.value?.size ?? props.size)
// 类名集合
const classNames = computed(() => [`ui-avatar--${actualShape.value}`, { "ui-avatar--in-group": inGroup.value }])
// 文字头像内容（截前两个字）
const displayText = computed(() => props.text?.slice(0, 2) ?? "")
// 实际形状
const actualShape = computed(() => groupConfig.value?.shape ?? props.shape)
// 头像组配置（无父组时为 null）
const groupConfig = computed(() => avatarGroup?.props ?? null)

// 头像组超过 max 时不渲染（剩余数量由 group 渲染 +N 标签，默认 5）
const isVisible = computed(() => {
  if (!inGroup.value) return true
  const max = isDef(groupConfig.value?.max) ? Number(groupConfig.value?.max) : 5
  return avatarIndex.value < max
})

// 根节点样式：所有可配置项通过 CSS var 注入；group 堆叠 z-index/margin 因依赖动态 index 只能 inline
const rootStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    "--ui-avatar-size": useUnit(actualSize.value),
  }
  if (props.iconSize) styles["--ui-avatar-icon-size"] = useUnit(props.iconSize)
  if (props.textSize) styles["--ui-avatar-text-size"] = useUnit(props.textSize)
  if (props.iconColor) styles["--ui-avatar-icon-color"] = useColor(props.iconColor)
  if (props.textColor) styles["--ui-avatar-text-color"] = useColor(props.textColor)
  if (props.background) styles["--ui-avatar-background"] = useColor(props.background)

  // 边框：独立 prop 优先，组配置后备；borderColor 传值时 borderWidth 默认 2rpx
  const borderColor = props.borderColor || groupConfig.value?.borderColor
  const borderWidth = props.borderWidth || groupConfig.value?.borderWidth
  if (borderColor) {
    styles.borderColor = useColor(borderColor)
    styles.borderWidth = useUnit(borderWidth) || "2rpx"
    styles.borderStyle = "solid"
  }

  if (actualShape.value === "square" && props.radius) {
    styles["--ui-avatar-radius"] = useUnit(props.radius)
  }

  // 头像组堆叠
  if (inGroup.value && groupConfig.value) {
    const { gap, direction } = groupConfig.value
    const max = Number(groupConfig.value.max) || 5
    styles.zIndex = direction === "right" ? avatarIndex.value + 1 : max - avatarIndex.value
    if (avatarIndex.value > 0) {
      const marginKey = direction === "left" ? "marginRight" : "marginLeft"
      styles[marginKey] = useUnit(gap)
    }
  }

  return useStyle({ ...styles, ...useStyle(props.customStyle) }, "string")
})

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

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
</script>

<style lang="scss">
.ui-avatar {
  --ui-avatar-size: 80rpx;
  --ui-avatar-radius: var(--ui-radius-md);
  --ui-avatar-icon-size: calc(var(--ui-avatar-size) * 0.5);
  --ui-avatar-text-size: calc(var(--ui-avatar-size) * 0.4);
  --ui-avatar-background: var(--ui-color-background-page);
  --ui-avatar-icon-color: var(--ui-color-text-placeholder);
  --ui-avatar-text-color: var(--ui-color-text-secondary);

  width: var(--ui-avatar-size);
  height: var(--ui-avatar-size);
  display: inline-flex;
  overflow: hidden;
  position: relative;
  background: var(--ui-avatar-background);
  box-sizing: border-box;
  align-items: center;
  flex-shrink: 0;
  vertical-align: middle;
  justify-content: center;

  &__image {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__icon,
  &__fallback {
    color: var(--ui-avatar-icon-color);
    display: flex;
    font-size: var(--ui-avatar-icon-size);
    align-items: center;
    justify-content: center;
  }

  &__text {
    color: var(--ui-avatar-text-color);
    display: flex;
    font-size: var(--ui-avatar-text-size);
    align-items: center;
    font-weight: var(--ui-font-weight-medium);
    white-space: nowrap;
    text-transform: uppercase;
    justify-content: center;
  }

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: var(--ui-avatar-radius);
  }
}
</style>
