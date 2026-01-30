<template>
  <view class="ui-swiper" :style="[style]" :class="[customClass]">
    <swiper
      class="ui-swiper__list"
      :style="[listStyle]"
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
        <view class="ui-swiper__item" :class="[itemClass(index)]" :style="[itemStyle(index)]">
          <video v-if="item.type === 'video'" class="ui-swiper__video" :src="item.url" :poster="item.poster" controls />
          <ui-image v-else :src="item.url" width="100%" :height="props.height" :radius="props.radius" :mode="imageMode" />
        </view>
      </swiper-item>
    </swiper>

    <template v-if="indicator">
      <slot name="indicator" :index="current" :total="list.length">
        <view v-if="indicatorType === 'dot'" class="ui-swiper__indicator" :class="[indicatorClass]">
          <view v-for="(_, index) in list" :key="index" class="ui-swiper__indicator__dot" :class="{ 'ui-swiper__indicator__dot--active': index === current }" />
        </view>
        <view v-if="indicatorType === 'number'" class="ui-swiper__indicator" :class="[indicatorClass]">
          <text class="ui-swiper__indicator__number">{{ current + 1 }}/{{ list.length }}</text>
        </view>
      </slot>
    </template>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { useUnit, useStyle } from "../hooks"
import { ref, watch, computed } from "vue"
import { swiperEmits, swiperProps } from "./index"
import { isArray, isObject, isString } from "../utils/check"

// 定义组件名称
defineOptions({ name: "ui-swiper" })

// 定义props和emits
const props = defineProps(swiperProps)
const emits = defineEmits(swiperEmits)
// 当前活动项的索引
const current = ref(0)
// 字段键名映射
const fieldKeys = ref({ type: "type", url: "url", poster: "poster", title: "title" })

const list = computed(() => {
  let data: any = []
  // 如果list是字符串,按逗号分割并转换为对象数组
  if (isString(props.list)) {
    data = props.list.split(",").map((url: string) => {
      return { url, type: getFileType(url) }
    })
  }
  // 如果list是数组,处理每一项
  if (isArray(props.list)) {
    data = props.list.map((item: any) => {
      if (isString(item)) {
        return { url: item, type: getFileType(item) }
      } else if (isObject(item)) {
        const url = item[fieldKeys.value.url]
        const type = item[fieldKeys.value.type] || getFileType(url)
        const title = item[fieldKeys.value.title]
        const poster = item[fieldKeys.value.poster]
        return { url, poster, type, title }
      } else {
        return null
      }
    })
  }
  return data.filter(Boolean)
})

const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const listStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.borderRadius = useUnit(props.radius)
  return useStyle(style)
})

const itemStyle = computed(() => (index: string | number) => {
  const style: CSSProperties = {}
  style.paddingLeft = useUnit(props.prevGap)
  style.paddingRight = useUnit(props.nextGap)
  return useStyle(style)
})

const itemClass = computed(() => (index: string | number) => {
  const list: string[] = []
  const idx = +index
  if (idx < current.value) list.push("ui-swiper__item--prev")
  if (idx > current.value) list.push("ui-swiper__item--next")
  if (idx === current.value) list.push("ui-swiper__item--current")
  return list
})

const indicatorClass = computed(() => {
  const list: string[] = []
  list.push(`ui-swiper__indicator--${props.indicatorType}`)
  list.push(`ui-swiper__indicator--${props.indicatorPosition}`)
  if (props.vertical) list.push("ui-swiper__indicator--vertical")
  return list
})

watch(
  () => props.current,
  (val) => {
    current.value = val
  },
  { immediate: true },
)

watch(
  () => current.value,
  (val) => {
    emits("update:current", val)
  },
  { immediate: true },
)

watch(
  () => props.fieldKeys,
  (field) => {
    Object.assign(fieldKeys.value, field)
  },
  { immediate: true },
)

// 切换到上一项
function prev() {
  if (current.value > 0) {
    current.value = current.value - 1
    emits("change", current.value)
  } else if (props.circular) {
    current.value = list.value.length - 1
    emits("change", current.value)
  }
}

// 切换到下一项
function next() {
  if (current.value < list.value.length - 1) {
    current.value = current.value + 1
    emits("change", current.value)
  } else if (props.circular) {
    current.value = 0
    emits("change", current.value)
  }
}

// 切换到指定索引的项
function swiperTo(index: number) {
  current.value = index
  emits("change", index)
}

// 点击事件处理
function onClick(index: string | number) {
  emits("click", +index)
}

// 滑动改变事件处理
function onChange(event: any) {
  emits("change", event.detail.current)
}

// 过渡动画事件处理
function onTransition(event: any) {
  emits("transition", { x: event.detail.dx, y: event.detail.dy })
}

// 动画完成事件处理
function onAnimationFinish(event: any) {
  current.value = event.detail.current
  emits("animationfinish", event.detail.current)
}

// 根据文件链接获取文件类型
function getFileType(link: string) {
  if (link) {
    const match = link.match(/\.([^.]+)$/)
    if (!match) return "image"
    const extension = match[1].toLowerCase()
    const imageExtensions = ["jpg", "jpeg", "gif", "png", "bmp", "webp"]
    const videoExtensions = ["mp4", "wmv", "avi", "mov"]
    if (imageExtensions.includes(extension)) return "image"
    if (videoExtensions.includes(extension)) return "video"
  }
  return "image"
}

defineExpose({ name: "ui-swiper", prev, next, swiperTo })
</script>

<script lang="ts">
export default {
  name: "ui-swiper",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-swiper {
  width: 100%;
  display: block;
  overflow: hidden;
  position: relative;

  &__list {
    width: 100%;
  }

  &__item {
    transition: all 0.3s ease;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__indicator {
    position: absolute;

    &--dot {
      gap: 8rpx;
      display: flex;
      align-items: center;
    }

    &--vertical#{&}--dot {
      flex-direction: column;
    }

    &--number {
      color: #fff;
      padding: 6rpx 20rpx;
      font-size: 22rpx;
      background: rgba(0, 0, 0, 0.4);
      white-space: nowrap;
      border-radius: 16rpx;
    }

    &--left {
      top: 50%;
      left: 24rpx;
      right: auto;
      bottom: auto;
      transform: translateY(-50%);
    }

    &--top-left {
      top: 24rpx;
      left: 24rpx;
      right: auto;
      bottom: auto;
    }

    &--top {
      top: 24rpx;
      left: 50%;
      right: auto;
      bottom: auto;
      transform: translateX(-50%);
    }

    &--top-right {
      top: 24rpx;
      left: auto;
      right: 24rpx;
      bottom: auto;
    }

    &--bottom-left {
      top: auto;
      left: 24rpx;
      right: auto;
      bottom: 24rpx;
    }

    &--bottom {
      top: auto;
      left: 50%;
      right: auto;
      bottom: 24rpx;
      transform: translateX(-50%);
    }

    &--bottom-right {
      top: auto;
      left: auto;
      right: 24rpx;
      bottom: 24rpx;
    }

    &--right {
      top: 50%;
      left: auto;
      right: 24rpx;
      bottom: auto;
      transform: translateY(-50%);
    }

    &__dot {
      width: 12rpx;
      height: 12rpx;
      opacity: 0.3;
      transition: all 0.3s ease;
      border-radius: 50%;
      background-color: #fff;

      &--active {
        opacity: 1;
      }
    }

    &__number {
      color: #fff;
    }
  }
}
</style>
