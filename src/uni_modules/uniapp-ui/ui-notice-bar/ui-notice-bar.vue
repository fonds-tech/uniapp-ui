<template>
  <view class="ui-notice-bar" :class="[props.customClass]" :style="[style]">
    <view v-if="props.icon || slots.left" class="ui-notice-bar__left">
      <slot name="left">
        <ui-icon v-if="props.icon" :name="props.icon" :size="props.iconSize" :color="props.iconColor" :weight="props.iconWeight" />
      </slot>
    </view>

    <swiper v-if="props.mode === 'vertical'" class="ui-notice-bar__vertical" circular vertical :autoplay="props.scrollable" :interval="props.interval" :duration="props.duration">
      <swiper-item v-for="(text, index) in list" :key="index" style="display: flex" @click="onClick(index)">
        <text class="ui-notice-bar__vertical__text" :style="[textStyle]">{{ text }}</text>
      </swiper-item>
    </swiper>

    <view v-if="props.mode === 'horizontal'" class="ui-notice-bar__horizontal">
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

    <view v-if="props.rightIcon || slots.right" class="ui-notice-bar__right">
      <slot name="right">
        <ui-icon v-if="props.rightIcon" :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { delay } from "../utils/utils"
import { isArray, isString } from "../utils/check"
import { noticeBarEmits, noticeBarProps } from "./index"
import { useRect, useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, useSlots, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-notice-bar" })

const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)
const slots = useSlots()

// 是否暂停动画
const pause = ref(false)
// 动画持续时间
const duration = ref(0)
// 水平模式左边距
const horizontalPaddingLeft = ref("0")
// 水平模式右边距
const horizontalPaddingRight = ref("100%")
// 组件实例
const instance = getCurrentInstance()
// 动画令牌（用于取消旧动画）
let animationToken = 0

// 通知文本列表
const list = computed(() => {
  if (isString(props.text)) return [props.text]
  if (isArray(props.text) && props.mode === "horizontal") {
    return [props.text[0]]
  }
  return props.text
})
// 根节点样式
const style = computed(() => {
  const style: any = {}
  style.background = useColor(props.background)
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
// 文字样式
const textStyle = computed(() => {
  const style: any = {}
  style.color = useColor(props.color)
  style.fontSize = useUnit(props.fontSize)
  style.fontWeight = props.fontWeight
  style.minHeight = useUnit(props.minHeight)
  style.lineHeight = useUnit(props.minHeight)
  return useStyle(style)
})
// 水平模式文字样式
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
// 水平模式文字类名
const horizontalTextClass = computed(() => {
  const list: string[] = []
  if (props.scrollable) list.push("ui-notice-bar__horizontal__text--scrollable")
  if (!pause.value && props.scrollable) list.push("ui-notice-bar__horizontal__text--animation")
  return list
})

// 监听模式变化
watch(() => props.mode, resize)
// 监听滚动变化
watch(() => props.scrollable, resize)
// 监听速度变化
watch(() => props.speed, resize)
// 监听文本变化
watch(
  () => props.text,
  () => resize(),
  { deep: true },
)

// 组件挂载时初始化
onMounted(() => resize())

// 重新计算尺寸
function resize() {
  if (props.mode !== "horizontal" || !props.scrollable) {
    animationToken += 1
    duration.value = 0
    return
  }
  void horizontalAnimation()
}

// 水平滚动动画
async function horizontalAnimation() {
  const token = (animationToken += 1)
  if (!instance) return
  const speed = Number(props.speed)
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

// 点击事件
function onClick(index: number) {
  emits("click", index)
}

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
  padding: 0 var(--ui-spacing-md);
  position: relative;
  box-sizing: border-box;
  align-items: center;
  background-color: var(--ui-notice-bar-background, #fdf6ec);

  &__left {
    display: flex;
    align-items: center;
    margin-right: var(--ui-spacing-sm);
  }

  &__right {
    margin-left: var(--ui-spacing-sm);
  }

  &__vertical {
    flex: 1;
    height: var(--ui-notice-bar-height, var(--ui-size-small));
    display: flex;

    &__text {
      color: var(--ui-notice-bar-color, #ed6a0c);
      display: -webkit-box;
      overflow: hidden;
      font-size: var(--ui-notice-bar-font-size, var(--ui-font-size-sm));
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
      color: var(--ui-notice-bar-color, #ed6a0c);
      overflow: hidden;
      font-size: var(--ui-notice-bar-font-size, var(--ui-font-size-sm));
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
