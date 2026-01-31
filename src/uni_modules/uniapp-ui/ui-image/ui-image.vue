<template>
  <view class="ui-image" :class="[classs, props.customClass]" :style="[style]" @click="onClick">
    <view v-if="showLoading" class="ui-image__placeholder">
      <slot name="loading">
        <view class="ui-image__icon ui-image__icon--loading" />
      </slot>
    </view>
    <view v-else-if="showError" class="ui-image__placeholder">
      <slot name="error">
        <view class="ui-image__icon ui-image__icon--error" />
      </slot>
    </view>
    <image
      v-if="props.src"
      v-show="!loading && !error"
      class="ui-image__image"
      :class="{ 'ui-image__image--fade': props.fade }"
      :src="props.src"
      :mode="props.mode"
      :webp="props.webp"
      :lazy-load="props.lazyLoad"
      :draggable="props.draggable"
      :show-menu-by-longpress="props.showMenuByLongpress"
      @load="onImageLoad"
      @error="onImageError"
    />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { ref, watch, computed } from "vue"
import { imageEmits, imageProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-image" })

const props = defineProps(imageProps)
const emits = defineEmits(imageEmits)

// 加载错误状态
const error = ref(false)
// 加载中状态
const loading = ref(true)

// 根节点样式
const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.background = useColor(props.background)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 类名数组
const classs = computed(() => {
  const list = []
  if (props.round) list.push("ui-image--round")
  if (props.block) list.push("ui-image--block")
  if (props.square) list.push("ui-image--square")
  return list
})
// 是否显示加载中
const showLoading = computed(() => !props.src || (loading.value && !error.value))
// 是否显示错误
const showError = computed(() => props.src && error.value)

// 监听 src 变化
watch(
  () => props.src,
  () => {
    error.value = false
    loading.value = true
  },
)

// 图片加载成功
function onImageLoad(event: any) {
  loading.value = false
  emits("load", event)
}

// 图片加载失败
function onImageError(event: any) {
  loading.value = false
  error.value = true
  emits("error", event)
}

// 点击事件
function onClick(event: any) {
  emits("click", event)
}
</script>

<script lang="ts">
export default {
  name: "ui-image",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-image {
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;

  &__image {
    width: 100%;
    height: 100%;

    &--fade {
      animation: ui-image-fade-in 0.3s ease-out;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    background-color: var(--ui-color-background-light);
  }

  &__icon {
    width: 48rpx;
    border: 3rpx solid var(--ui-color-text-placeholder);
    height: 48rpx;
    position: relative;
    border-radius: 6rpx;

    &--loading {
      border: none;
      animation: ui-image-loading 0.8s linear infinite;
      border-top: 3rpx solid var(--ui-color-text-placeholder);
      border-left: 3rpx solid transparent;
      border-right: 3rpx solid var(--ui-color-text-placeholder);
      border-bottom: 3rpx solid var(--ui-color-text-placeholder);
      border-radius: 50%;
    }

    &--error {
      border: none;
      border-radius: 50%;
      background-color: var(--ui-color-text-placeholder);
    }

    &--error::before {
      top: 8rpx;
      left: 50%;
      width: 4rpx;
      height: 20rpx;
      content: "";
      position: absolute;
      transform: translateX(-50%);
      border-radius: 2rpx;
      background-color: #fff;
    }

    &--error::after {
      left: 50%;
      width: 4rpx;
      bottom: 8rpx;
      height: 4rpx;
      content: "";
      position: absolute;
      transform: translateX(-50%);
      border-radius: 50%;
      background-color: #fff;
    }
  }

  &--block {
    width: 100%;
    display: block;
  }

  &--round {
    border-radius: 9999px;
  }

  &--square {
    aspect-ratio: 1 / 1;
  }
}

@keyframes ui-image-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ui-image-loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
