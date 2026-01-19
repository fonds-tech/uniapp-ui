<template>
  <view class="ui-notice-bar" :class="[useProps.customClass]" :style="[style]">
    <view v-if="useProps.icon || slots.left" class="ui-notice-bar__left">
      <slot name="left">
        <ui-icon v-if="useProps.icon" :name="useProps.icon" :size="useProps.iconSize" :color="useProps.iconColor" :weight="useProps.iconWeight" />
      </slot>
    </view>

    <swiper v-if="useProps.mode === 'vertical'" class="ui-notice-bar__vertical" circular vertical :autoplay="useProps.scrollable" :interval="useProps.interval" :duration="useProps.duration">
      <swiper-item v-for="(text, index) in list" :key="index" style="display: flex" @click="onClick(index)">
        <text class="ui-notice-bar__vertical__text" :style="[textStyle]">{{ text }}</text>
      </swiper-item>
    </swiper>

    <view v-if="useProps.mode === 'horizontal'" class="ui-notice-bar__horizontal">
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

    <view v-if="useProps.rightIcon || slots.right" class="ui-notice-bar__right">
      <slot name="right">
        <ui-icon
          v-if="useProps.rightIcon"
          :name="useProps.rightIcon"
          :size="useProps.rightIconSize"
          :color="useProps.rightIconColor"
          :weight="useProps.rightIconWeight"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { delay } from "../utils/utils"
import { isArray, isString } from "../utils/check"
import { useRect, useUnit, useColor, useStyle } from "../hooks"
import { noticeBarEmits, noticeBarProps, useNoticeBarProps } from "./index"
import { ref, watch, computed, nextTick, useSlots, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-notice-bar" })

const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)
const useProps = useNoticeBarProps(props)
const slots = useSlots()
const pause = ref(false)
const duration = ref(0)
const horizontalPaddingLeft = ref("0")
const horizontalPaddingRight = ref("100%")
const instance = getCurrentInstance()
let animationToken = 0

const list = computed(() => {
  if (isString(useProps.text)) return [useProps.text]
  if (isArray(useProps.text) && useProps.mode === "horizontal") {
    return [useProps.text[0]]
  }
  return useProps.text
})

const style = computed(() => {
  const style: any = {}
  style.background = useColor(useProps.background)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.fontSize = useUnit(useProps.fontSize)
  style.fontWeight = useProps.fontWeight
  style.minHeight = useUnit(useProps.minHeight)
  style.lineHeight = useUnit(useProps.minHeight)
  return useStyle(style)
})

const horizontalTextStyle = computed(() => {
  const style: any = {}
  style.animationDuration = `${duration.value}s`
  if (useProps.scrollable) {
    style.paddingLeft = horizontalPaddingLeft.value
    style.paddingRight = horizontalPaddingRight.value
    style.opacity = pause.value ? 0 : 1
    style.animationPlayState = pause.value ? "paused" : "running"
  }
  return useStyle(style)
})

const horizontalTextClass = computed(() => {
  const list: string[] = []
  if (useProps.scrollable) list.push("ui-notice-bar__horizontal__text--scrollable")
  if (!pause.value && useProps.scrollable) list.push("ui-notice-bar__horizontal__text--animation")
  return list
})

function resize() {
  if (useProps.mode !== "horizontal" || !useProps.scrollable) {
    animationToken += 1
    duration.value = 0
    return
  }
  void horizontalAnimation()
}

async function horizontalAnimation() {
  const token = (animationToken += 1)
  if (!instance) return
  const speed = Number(useProps.speed)
  if (!speed || speed <= 0) {
    duration.value = 0
    return
  }
  pause.value = false
  horizontalPaddingLeft.value = "0"
  horizontalPaddingRight.value = "100%"
  await nextTick()
  if (token !== animationToken) return
  const textRect = await useRect(".ui-notice-bar__horizontal__text", instance)
  const horizontalRect = await useRect(".ui-notice-bar__horizontal", instance)
  if (token !== animationToken) return
  const textWidth = textRect?.width ?? 0
  const horizontalWidth = horizontalRect?.width ?? 0
  if (!textWidth || !horizontalWidth) {
    duration.value = 0
    return
  }
  const textDuration = textWidth / speed
  const horizontalDuration = horizontalWidth / speed
  duration.value = textDuration
  const waitMs = Math.max(0, (textDuration - horizontalDuration) * 1000)
  if (waitMs > 0) {
    await delay(waitMs)
    if (token !== animationToken) return
  }
  pause.value = true
  await delay(10)
  if (token !== animationToken) return
  duration.value = 0
  horizontalPaddingLeft.value = "100%"
  horizontalPaddingRight.value = "0"
  duration.value = textDuration
  await delay(10)
  if (token !== animationToken) return
  pause.value = false
}

function onClick(index: number) {
  emits("click", index)
}

watch(() => useProps.mode, resize)
watch(() => useProps.scrollable, resize)
watch(() => useProps.speed, resize)
watch(
  () => useProps.text,
  () => resize(),
  { deep: true },
)
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
  width: 100%;
  display: flex;
  padding: 0 24rpx;
  position: relative;
  box-sizing: border-box;
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
