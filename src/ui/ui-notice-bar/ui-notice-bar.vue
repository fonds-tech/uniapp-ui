<template>
  <view class="ui-notice-bar" :class="[customClass]" :style="[style]">
    <view v-if="icon || slots.left" class="ui-notice-bar__left">
      <slot name="left">
        <ui-icon v-if="icon" :name="icon" :size="iconSize" :color="iconColor" :weight="iconWeight" />
      </slot>
    </view>

    <swiper v-if="mode === 'vertical'" class="ui-notice-bar__vertical" circular vertical :autoplay="scrollable" :interval="interval" :duration="props.duration">
      <swiper-item v-for="(text, index) in list" :key="index" style="display: flex" @click="onClick(index)">
        <text class="ui-notice-bar__vertical__text" :style="[textStyle]">{{ text }}12312123</text>
      </swiper-item>
    </swiper>

    <view v-if="mode === 'horizontal'" class="ui-notice-bar__horizontal">
      <text
        v-for="(text, index) in list"
        :key="index"
        class="ui-notice-bar__horizontal__text"
        :class="[horizontalTextClass]"
        :style="[textStyle, horizontalTextStyle]"
        @click="onClick(index)"
      >
        {{ text }}
      </text>
    </view>

    <view v-if="rightIcon || slots.right" class="ui-notice-bar__right">
      <slot name="right">
        <ui-icon v-if="rightIcon" :name="rightIcon" :size="rightIconSize" :color="rightIconColor" :weight="rightIconWeight" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { delay } from "../utils/utils"
import { isArray, isString } from "../utils/check"
import { noticeBarEmits, noticeBarProps } from "./index"
import { useRect, useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-notice-bar" })

const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)

const slots = useSlots()
const pause = ref(false)
const duration = ref(0)
const horizontalPaddingLeft = ref("0")
const horizontalPaddingRight = ref("100%")
const instance = getCurrentInstance()

const list = computed(() => {
  if (isString(props.text)) return [props.text]
  if (isArray(props.text) && props.mode === "horizontal") {
    return [props.text[0]]
  }
  return props.text
})

const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.minHeight = useUnit(props.minHeight)
  style.lineHeight = useUnit(props.minHeight)
  return useStyle(style)
})

const horizontalTextStyle = computed(() => {
  const style: any = {}
  style.animationDuration = `${duration.value}s`
  if (props.scrollable) {
    style.paddingLeft = horizontalPaddingLeft.value
    style.paddingRight = horizontalPaddingRight.value
    style.opacity = pause.value ? 0 : 1
    style.animationPlayState = pause.value ? "paused" : "running"
  }
  return useStyle(style)
})

const horizontalTextClass = computed(() => {
  const list: string[] = []
  if (props.scrollable) list.push("ui-notice-bar__horizontal__text--scrollable")
  if (!pause.value && props.scrollable) list.push("ui-notice-bar__horizontal__text--animation")
  return list
})

async function resize() {
  if (props.mode === "horizontal") horizontalAnimation()
}

async function horizontalAnimation() {
  pause.value = false
  const textRect = await useRect(".ui-notice-bar__horizontal__text", instance)
  const horizontalRect = await useRect(".ui-notice-bar__horizontal", instance)
  const horizontalDduration = horizontalRect.width / props.speed
  duration.value = textRect.width / props.speed
  await delay((duration.value - horizontalDduration) * 1000)
  pause.value = true
  await delay(10)
  duration.value = 0
  horizontalPaddingLeft.value = "100%"
  horizontalPaddingRight.value = "0"
  duration.value = textRect.width / props.speed
  await delay(10)
  pause.value = false
}

function onClick(index: number) {
  emits("click", index)
}

onMounted(() => resize())
defineExpose({ name: "ui-notice-bar" })
</script>

<script lang="ts">
export default {
  name: "ui-notice-bar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-notice-bar {
  display: flex;
  padding: 0 24rpx;
  position: relative;
  align-items: center;
  background-color: #fdf6ec;

  &__left {
    display: flex;
    align-items: center;
    margin-right: 16rpx;
  }

  &__right {
    margin-left: 16rpx;
  }

  &__vertical {
    flex: 1;
    height: 80rpx;
    display: flex;

    &__text {
      color: var(--ui-color-primary);
      display: -webkit-box;
      overflow: hidden;
      box-sizing: border-box;
      line-clamp: 1;
      white-space: normal;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }

  &__horizontal {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;

    &__text {
      color: var(--ui-color-primary);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &--animation {
        animation: loop-animation 10s linear infinite both;

        @keyframes loop-animation {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
      }

      &--scrollable {
        overflow: visible;
        white-space: nowrap;
        text-overflow: clip;
      }
    }
  }
}
</style>
