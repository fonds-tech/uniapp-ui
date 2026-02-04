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

// 当前活动项的索引，控制轮播图显示的位置
const current = ref(0)
// 字段键名映射，用于解析不同格式的数据源字段
const fieldKeys = ref({ type: "type", url: "url", poster: "poster", title: "title" })

// 处理后的轮播图列表数据，支持字符串、数组、对象等多种格式
const list = computed(() => {
  let data: any = []
  // 如果list是字符串，按逗号分割并转换为对象数组
  if (isString(props.list)) {
    data = props.list.split(",").map((url: string) => {
      return { url, type: getFileType(url) }
    })
  }
  // 如果list是数组，处理每一项
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

// 组件外层容器的样式，包含宽度、高度、圆角等
const style = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.borderRadius = useUnit(props.radius)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 轮播图列表容器的样式
const listStyle = computed(() => {
  const style: CSSProperties = {}
  style.width = useUnit(props.width)
  style.height = useUnit(props.height)
  style.borderRadius = useUnit(props.radius)
  return useStyle(style)
})

// 每个轮播项的样式，根据索引返回对应的padding样式
const itemStyle = computed(() => (index: string | number) => {
  const style: CSSProperties = {}
  style.paddingLeft = useUnit(props.prevGap)
  style.paddingRight = useUnit(props.nextGap)
  return useStyle(style)
})

// 每个轮播项的类名，根据索引判断是前一项、当前项还是后一项
const itemClass = computed(() => (index: string | number) => {
  const list: string[] = []
  const idx = +index
  if (idx < current.value) list.push("ui-swiper__item--prev")
  if (idx > current.value) list.push("ui-swiper__item--next")
  if (idx === current.value) list.push("ui-swiper__item--current")
  return list
})

// 指示器的类名，根据类型、位置和方向生成对应的样式类
const indicatorClass = computed(() => {
  const list: string[] = []
  list.push(`ui-swiper__indicator--${props.indicatorType}`)
  list.push(`ui-swiper__indicator--${props.indicatorPosition}`)
  if (props.vertical) list.push("ui-swiper__indicator--vertical")
  return list
})

// 监听props.current变化，同步更新当前索引
watch(
  () => props.current,
  (val) => {
    current.value = val
  },
  { immediate: true },
)

// 监听current变化，触发update:current事件实现双向绑定
watch(
  () => current.value,
  (val) => {
    emits("update:current", val)
  },
  { immediate: true },
)

// 监听props.fieldKeys变化，合并自定义字段映射
watch(
  () => props.fieldKeys,
  (field) => {
    Object.assign(fieldKeys.value, field)
  },
  { immediate: true },
)

// 切换到上一项，如果开启循环则在第一项时跳转到最后一项
function prev() {
  if (current.value > 0) {
    current.value = current.value - 1
    emits("change", current.value)
  } else if (props.circular) {
    current.value = list.value.length - 1
    emits("change", current.value)
  }
}

// 切换到下一项，如果开启循环则在最后一项时跳转到第一项
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

// 点击轮播项的事件处理，触发click事件并传递索引
function onClick(index: string | number) {
  emits("click", +index)
}

// 轮播图滑动改变时触发，通知父组件当前索引变化
function onChange(event: any) {
  emits("change", event.detail.current)
}

// 轮播图滑动过渡时触发，传递滑动偏移量
function onTransition(event: any) {
  emits("transition", { x: event.detail.dx, y: event.detail.dy })
}

// 轮播图动画完成时触发，同步当前索引并通知父组件
function onAnimationFinish(event: any) {
  current.value = event.detail.current
  emits("animationfinish", event.detail.current)
}

// 根据文件链接获取文件类型，支持图片和视频格式识别
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

// 暴露组件方法供父组件调用
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
      color: var(--ui-color-text-inverse);
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
      background-color: var(--ui-color-text-inverse);

      &--active {
        opacity: 1;
      }
    }

    &__number {
      color: var(--ui-color-text-inverse);
    }
  }
}
</style>
