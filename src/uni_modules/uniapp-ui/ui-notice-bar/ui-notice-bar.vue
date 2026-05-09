<template>
  <view class="ui-notice-bar" :class="[props.customClass]" :style="[rootStyle]">
    <view v-if="props.icon || hasLeftSlot" class="ui-notice-bar__left">
      <slot name="left">
        <ui-icon v-if="props.icon" :name="props.icon" :size="props.iconSize" :color="props.iconColor || 'var(--ui-notice-bar-icon-color)'" :weight="props.iconWeight" />
      </slot>
    </view>

    <swiper v-if="props.mode === 'vertical'" class="ui-notice-bar__vertical" circular vertical :autoplay="props.scrollable" :interval="props.interval" :duration="props.duration">
      <swiper-item v-for="(item, index) in list" :key="index" class="ui-notice-bar__vertical__item" @click="onClick(index)">
        <text class="ui-notice-bar__vertical__text">{{ item }}</text>
      </swiper-item>
    </swiper>

    <view v-if="props.mode === 'horizontal'" class="ui-notice-bar__horizontal">
      <text v-for="(item, index) in list" :key="index" class="ui-notice-bar__horizontal__text" :class="[horizontalClass]" :style="[horizontalStyle]" @click="onClick(index)">
        {{ item }}
      </text>
    </view>

    <view v-if="props.rightIcon || hasRightSlot" class="ui-notice-bar__right">
      <slot name="right">
        <ui-icon
          v-if="props.rightIcon"
          :name="props.rightIcon"
          :size="props.rightIconSize"
          :color="props.rightIconColor || 'var(--ui-notice-bar-icon-color)'"
          :weight="props.rightIconWeight"
        />
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { delay } from "../utils/utils"
import { isArray, isString } from "../utils/check"
import { noticeBarEmits, noticeBarProps } from "./index"
import { useRect, useUnit, useColor, useStyle, useHasSlot } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-notice-bar" })

const props = defineProps(noticeBarProps)
const emits = defineEmits(noticeBarEmits)

const hasLeftSlot = useHasSlot("left")
const hasRightSlot = useHasSlot("right")

const instance = getCurrentInstance()

const pause = ref(false)
const duration = ref(0)
const paddingLeft = ref("0")
const paddingRight = ref("100%")
// 动画令牌，旧动画失效
let token = 0

// 通知列表，水平模式取首条
const list = computed<string[]>(() => {
  if (isString(props.text)) return [props.text]
  if (isArray(props.text)) return props.mode === "horizontal" ? props.text.slice(0, 1) : props.text
  return []
})
// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.color) vars["--ui-notice-bar-color"] = useColor(props.color)
  if (props.background) vars["--ui-notice-bar-background"] = useColor(props.background)
  if (props.fontSize !== undefined) vars["--ui-notice-bar-font-size"] = useUnit(props.fontSize)
  if (props.fontWeight !== undefined) vars["--ui-notice-bar-font-weight"] = String(props.fontWeight)
  if (props.minHeight !== undefined) vars["--ui-notice-bar-min-height"] = useUnit(props.minHeight)
  if (props.radius !== undefined) vars["--ui-notice-bar-radius"] = useUnit(props.radius)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})
// 水平模式动画样式
const horizontalStyle = computed(() => {
  if (!props.scrollable) return {}
  return useStyle({
    paddingLeft: paddingLeft.value,
    paddingRight: paddingRight.value,
    opacity: pause.value ? 0 : 1,
    animationDuration: `${duration.value}s`,
    animationPlayState: pause.value ? "paused" : "running",
  })
})
// 水平模式类名
const horizontalClass = computed(() => {
  if (!props.scrollable) return ""
  return pause.value ? "ui-notice-bar__horizontal__text--scrollable" : "ui-notice-bar__horizontal__text--scrollable ui-notice-bar__horizontal__text--animation"
})

// 响应模式/滚动/速度/文本变化
watch([() => props.mode, () => props.scrollable, () => props.speed, () => props.text], () => resize(), { deep: true })

onMounted(() => resize())

// 重新计算并启动水平动画
function resize() {
  if (props.mode !== "horizontal" || !props.scrollable) {
    token += 1
    duration.value = 0
    return
  }
  void run()
}

// 水平滚动循环
async function run() {
  const current = (token += 1)
  if (!instance) return
  const speed = Number(props.speed)
  if (!speed || speed <= 0) {
    duration.value = 0
    return
  }
  pause.value = false
  paddingLeft.value = "0"
  paddingRight.value = "100%"
  await nextTick()
  if (current !== token) return
  const textRect = await useRect(".ui-notice-bar__horizontal__text", instance)
  const wrapRect = await useRect(".ui-notice-bar__horizontal", instance)
  if (current !== token) return
  const textWidth = textRect?.width ?? 0
  const wrapWidth = wrapRect?.width ?? 0
  if (!textWidth || !wrapWidth) {
    duration.value = 0
    return
  }
  const total = textWidth / speed
  const wait = Math.max(0, ((textWidth - wrapWidth) / speed) * 1000)
  duration.value = total
  if (wait > 0) {
    await delay(wait)
    if (current !== token) return
  }
  // 暂停后翻转 padding 重置位置，再恢复运行形成循环
  pause.value = true
  await delay(10)
  if (current !== token) return
  duration.value = 0
  paddingLeft.value = "100%"
  paddingRight.value = "0"
  duration.value = total
  await delay(10)
  if (current !== token) return
  pause.value = false
}

function onClick(index: number) {
  emits("click", index)
}
</script>

<script lang="ts">
export default {
  name: "ui-notice-bar",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-notice-bar {
  --ui-notice-bar-color: var(--ui-color-warning);
  --ui-notice-bar-radius: 0;
  --ui-notice-bar-font-size: var(--ui-font-size-sm);
  --ui-notice-bar-background: var(--ui-color-warning-bg);
  --ui-notice-bar-icon-color: var(--ui-color-warning);
  --ui-notice-bar-min-height: 72rpx;
  --ui-notice-bar-font-weight: inherit;

  width: 100%;
  display: flex;
  padding: 0 var(--ui-spacing-md);
  position: relative;
  background: var(--ui-notice-bar-background);
  box-sizing: border-box;
  align-items: center;
  border-radius: var(--ui-notice-bar-radius);

  &__left {
    display: flex;
    align-items: center;
    margin-right: var(--ui-spacing-sm);
  }

  &__right {
    display: flex;
    align-items: center;
    margin-left: var(--ui-spacing-sm);
  }

  &__vertical {
    flex: 1;
    height: var(--ui-notice-bar-min-height);

    &__item {
      display: flex;
      align-items: center;
    }

    &__text {
      color: var(--ui-notice-bar-color);
      display: -webkit-box;
      overflow: hidden;
      font-size: var(--ui-notice-bar-font-size);
      line-clamp: 1;
      font-weight: var(--ui-notice-bar-font-weight);
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }

  &__horizontal {
    flex: 1;
    display: flex;
    overflow: hidden;
    min-height: var(--ui-notice-bar-min-height);
    align-items: center;

    &__text {
      color: var(--ui-notice-bar-color);
      overflow: hidden;
      font-size: var(--ui-notice-bar-font-size);
      font-weight: var(--ui-notice-bar-font-weight);
      white-space: nowrap;
      text-overflow: ellipsis;

      &--scrollable {
        overflow: visible;
        white-space: nowrap;
        text-overflow: clip;
      }

      &--animation {
        animation: ui-notice-bar-loop linear infinite both;

        @keyframes ui-notice-bar-loop {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
      }
    }
  }
}
</style>
