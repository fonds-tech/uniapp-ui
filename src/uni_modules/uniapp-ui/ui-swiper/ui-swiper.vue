<template>
  <view class="ui-swiper" :class="[customClass]" :style="[rootStyle]">
    <swiper
      class="ui-swiper__list"
      :current="current"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      :vertical="vertical"
      :autoplay="autoplay"
      :indicator-dots="false"
      :disable-touch="disableTouch"
      :easing-function="props.easingFunction"
      @change="onChange"
      @transition="onTransition"
      @animationfinish="onAnimationFinish"
    >
      <swiper-item v-for="(item, index) in list" :key="forKey ? item[forKey] : index" @click="onClick(index)">
        <view class="ui-swiper__item" :class="getItemClass(index)" :style="[getItemStyle()]">
          <video v-if="item.type === 'video'" class="ui-swiper__video" :src="item.url" :poster="item.poster" controls />
          <ui-image v-else :src="item.url" width="100%" :height="props.height" :radius="props.radius" :mode="imageMode" />
        </view>
      </swiper-item>
    </swiper>

    <template v-if="indicator">
      <slot name="indicator" :index="current" :total="list.length">
        <view v-if="indicatorType === 'dot'" class="ui-swiper__indicator" :class="indicatorClass">
          <view v-for="(_, index) in list" :key="index" class="ui-swiper__indicator__dot" :class="{ 'ui-swiper__indicator__dot--active': index === current }" />
        </view>
        <view v-if="indicatorType === 'number'" class="ui-swiper__indicator ui-swiper__indicator--number" :class="indicatorClass">
          <text class="ui-swiper__indicator__number">{{ current + 1 }}/{{ list.length }}</text>
        </view>
      </slot>
    </template>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useStyle } from "../hooks"
import { isArray, isString } from "../utils/check"
import { ref, watch, computed } from "vue"
import { swiperEmits, swiperProps } from "./index"

defineOptions({ name: "ui-swiper" })

const props = defineProps(swiperProps)
const emits = defineEmits(swiperEmits)

// 当前激活索引
const current = ref(props.current || 0)

// 字段映射（user 传入与默认合并）
const fieldKeys = computed(() => ({
  type: "type",
  url: "url",
  poster: "poster",
  title: "title",
  ...(props.fieldKeys || {}),
}))

// 标准化 list（字符串拆分 / URL 字符串数组 / 对象数组）
const list = computed(() => {
  const fk = fieldKeys.value
  if (isString(props.list)) {
    return (props.list as string).split(",").filter(Boolean).map((url) => ({ url, type: getFileType(url) }))
  }
  if (!isArray(props.list)) return []
  return (props.list as unknown[])
    .map((item) => {
      if (isString(item)) return { url: item, type: getFileType(item as string) }
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>
        const url = obj[fk.url] as string
        const type = (obj[fk.type] as string) || getFileType(url)
        return {
          url,
          type,
          poster: obj[fk.poster],
          title: obj[fk.title],
        }
      }
      return null
    })
    .filter(Boolean) as Array<{ url: string; type: string; poster?: unknown; title?: unknown } & Record<string, unknown>>
})

// 根容器尺寸 + 圆角（唯一一处宽高定义）
const rootStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.width !== undefined) style.width = useUnit(props.width)
  if (props.height !== undefined) style.height = useUnit(props.height)
  if (props.radius !== undefined) style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 每项内 padding（前后露出）
function getItemStyle(): CSSProperties {
  const style: CSSProperties = {}
  if (props.prevGap !== undefined) style.paddingLeft = useUnit(props.prevGap)
  if (props.nextGap !== undefined) style.paddingRight = useUnit(props.nextGap)
  return useStyle(style)
}

// 每项相对位置类（用户可基于此自定义动画）
function getItemClass(index: number): string[] {
  const i = +index
  if (i < current.value) return ["ui-swiper__item--prev"]
  if (i > current.value) return ["ui-swiper__item--next"]
  return ["ui-swiper__item--current"]
}

const indicatorClass = computed(() => {
  const list: string[] = []
  list.push(`ui-swiper__indicator--${props.indicatorType}`)
  list.push(`ui-swiper__indicator--${props.indicatorPosition}`)
  if (props.vertical) list.push("ui-swiper__indicator--vertical")
  return list
})

// 外部 v-model:current 同步到内部
watch(
  () => props.current,
  (val) => {
    if (val !== current.value) current.value = val
  },
)

// 内部 current 变化统一向外 emit update:current（避免在 prev/next/onChange 多路径里重复 emit）
watch(current, (val) => {
  emits("update:current", val)
})

function prev() {
  if (current.value > 0) updateCurrent(current.value - 1)
  else if (props.circular) updateCurrent(list.value.length - 1)
}

function next() {
  if (current.value < list.value.length - 1) updateCurrent(current.value + 1)
  else if (props.circular) updateCurrent(0)
}

function swiperTo(index: number) {
  updateCurrent(index)
}

// 单出口更新 current + emit change（update:current 由 watch 统一发）
function updateCurrent(index: number) {
  if (index === current.value) return
  current.value = index
  emits("change", index)
}

function onClick(index: number) {
  emits("click", +index)
}

// swiper 原生 change（用户手势 / autoplay 触发）
function onChange(event: any) {
  updateCurrent(event.detail.current)
}

function onTransition(event: any) {
  emits("transition", { x: event.detail.dx, y: event.detail.dy })
}

function onAnimationFinish(event: any) {
  emits("animationfinish", event.detail.current)
}

// 文件类型：从 URL 路径取扩展名（剥 query/hash）
function getFileType(link: string) {
  if (!link) return "image"
  const clean = String(link).split(/[?#]/)[0]
  const match = clean.match(/\.([^.]+)$/)
  if (!match) return "image"
  const ext = match[1].toLowerCase()
  if (["jpg", "jpeg", "gif", "png", "bmp", "webp"].includes(ext)) return "image"
  if (["mp4", "wmv", "avi", "mov"].includes(ext)) return "video"
  return "image"
}

defineExpose({ name: "ui-swiper", prev, next, swiperTo })
</script>

<script lang="ts">
export default {
  name: "ui-swiper",
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
.ui-swiper {
  --ui-swiper-indicator-bg: var(--ui-color-mask-light);
  --ui-swiper-indicator-offset: var(--ui-spacing-md);
  --ui-swiper-indicator-dot-gap: var(--ui-spacing-xs);
  --ui-swiper-indicator-padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
  --ui-swiper-indicator-dot-size: 12rpx;
  --ui-swiper-indicator-font-size: var(--ui-font-size-xs);
  --ui-swiper-indicator-text-color: var(--ui-color-text-inverse);

  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;

  &__list {
    width: 100%;
    height: 100%;
  }

  &__item {
    transition: all var(--ui-transition-duration) var(--ui-transition-timing);
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__indicator {
    position: absolute;

    &--dot {
      gap: var(--ui-swiper-indicator-dot-gap);
      display: flex;
      align-items: center;
    }

    &--vertical#{&}--dot {
      flex-direction: column;
    }

    &--number {
      color: var(--ui-swiper-indicator-text-color);
      padding: var(--ui-swiper-indicator-padding);
      font-size: var(--ui-swiper-indicator-font-size);
      background: var(--ui-swiper-indicator-bg);
      white-space: nowrap;
      border-radius: var(--ui-radius-md);
    }

    &--left {
      top: 50%;
      left: var(--ui-swiper-indicator-offset);
      right: auto;
      bottom: auto;
      transform: translateY(-50%);
    }

    &--top-left {
      top: var(--ui-swiper-indicator-offset);
      left: var(--ui-swiper-indicator-offset);
      right: auto;
      bottom: auto;
    }

    &--top {
      top: var(--ui-swiper-indicator-offset);
      left: 50%;
      right: auto;
      bottom: auto;
      transform: translateX(-50%);
    }

    &--top-right {
      top: var(--ui-swiper-indicator-offset);
      left: auto;
      right: var(--ui-swiper-indicator-offset);
      bottom: auto;
    }

    &--bottom-left {
      top: auto;
      left: var(--ui-swiper-indicator-offset);
      right: auto;
      bottom: var(--ui-swiper-indicator-offset);
    }

    &--bottom {
      top: auto;
      left: 50%;
      right: auto;
      bottom: var(--ui-swiper-indicator-offset);
      transform: translateX(-50%);
    }

    &--bottom-right {
      top: auto;
      left: auto;
      right: var(--ui-swiper-indicator-offset);
      bottom: var(--ui-swiper-indicator-offset);
    }

    &--right {
      top: 50%;
      left: auto;
      right: var(--ui-swiper-indicator-offset);
      bottom: auto;
      transform: translateY(-50%);
    }

    &__dot {
      width: var(--ui-swiper-indicator-dot-size);
      height: var(--ui-swiper-indicator-dot-size);
      opacity: var(--ui-opacity-medium);
      background: var(--ui-color-text-inverse);
      transition: opacity var(--ui-transition-duration) var(--ui-transition-timing);
      border-radius: 50%;

      &--active {
        opacity: 1;
      }
    }

    &__number {
      color: var(--ui-swiper-indicator-text-color);
    }
  }
}
</style>
