<template>
  <view class="ui-count-down" :class="[customClass]" :style="[style]">
    <slot :time="timeData">
      <text class="ui-count-down__text">{{ formatTimeText }}</text>
    </slot>
  </view>
</template>

<script setup lang="ts">
import type { CountDownTimeData } from "./index"
import { padZero } from "../utils/utils"
import { useStyle } from "../hooks"
import { countDownEmits, countDownProps } from "./index"
import { ref, watch, computed, onBeforeUnmount } from "vue"

defineOptions({ name: "ui-count-down" })

const props = defineProps(countDownProps)
const emits = defineEmits(countDownEmits)

// 内部计时状态（仅内部计算用，不驱动模板，无需响应式）
let timer: ReturnType<typeof setTimeout> | null = null
let running = false
let startTime = 0
let endTime = 0
let totalTime = 0
let remainTime = 0
let rafLastTime = 0

// 时间数据（驱动 slot）
const timeData = ref<CountDownTimeData>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  total: 0,
  current: 0,
})
// 格式化后的时间文本（驱动默认插槽）
const formatTimeText = ref("")

// 是否为正计时模式
const isCountUp = computed(() => props.mode === "countup")
// 根节点样式
const style = computed(() => useStyle(props.customStyle))

// 监听时间变化
watch(() => props.time, reset, { immediate: true })
// 监听目标时间变化
watch(() => props.targetTime, reset)
// 监听格式变化
watch(
  () => props.format,
  () => {
    formatTimeText.value = parseTimeFormat(timeData.value, props.format)
  },
)

// 计时
function tick() {
  if (!running) return
  const now = Date.now()
  let current: number

  if (isCountUp.value) {
    current = Math.min(now - startTime, totalTime)
  } else {
    current = Math.max(endTime - now, 0)
  }

  const parsed = parseTimeData(current, totalTime)
  timeData.value = parsed
  formatTimeText.value = parseTimeFormat(parsed, props.format)

  if (props.millisecond) {
    emits("change", parsed)
  } else if (!isSameSecond(current, remainTime)) {
    emits("change", parsed)
  }
  remainTime = current

  const finished = isCountUp.value ? current >= totalTime : current === 0
  if (finished) {
    emits("finish")
    pause()
  } else {
    timer = scheduleNextTick(tick)
  }
}

// 开始计时
function start() {
  if (running) return
  running = true
  const now = Date.now()
  if (isCountUp.value) {
    startTime = now - remainTime
  } else {
    endTime = now + remainTime
  }
  rafLastTime = now
  tick()
}

// 重置计时
function reset() {
  pause()
  const target = +props.targetTime
  const time = +props.time

  if (target > 0) {
    const now = Date.now()
    if (isCountUp.value) {
      totalTime = Math.max(target - now, 0)
      remainTime = 0
    } else {
      totalTime = Math.max(target - now, 0)
      remainTime = totalTime
    }
  } else {
    const validTime = Number.isFinite(time) && time > 0 ? time : 0
    totalTime = validTime
    remainTime = isCountUp.value ? 0 : validTime
  }

  timeData.value = parseTimeData(remainTime, totalTime)
  formatTimeText.value = parseTimeFormat(timeData.value, props.format)
  if (props.autoStart) start()
}

// 暂停计时
function pause() {
  if (running) {
    const now = Date.now()
    if (isCountUp.value) {
      remainTime = Math.min(now - startTime, totalTime)
    } else {
      remainTime = Math.max(endTime - now, 0)
    }
  }
  running = false
  cancelScheduledTick(timer)
}

// 判断是否为同一秒
function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

// 格式化时间
function parseTimeFormat(time: CountDownTimeData, format: string) {
  let { days, hours, minutes, seconds, milliseconds } = time
  if (!format.includes("DD")) {
    hours += days * 24
  } else {
    format = format.replace("DD", padZero(days))
  }
  if (!format.includes("HH")) {
    minutes += hours * 60
  } else {
    format = format.replace("HH", padZero(hours))
  }
  if (!format.includes("mm")) {
    seconds += minutes * 60
  } else {
    format = format.replace("mm", padZero(minutes))
  }
  if (!format.includes("ss")) {
    milliseconds += seconds * 1000
  } else {
    format = format.replace("ss", padZero(seconds))
  }
  return format.replace("SSS", padZero(milliseconds, 3))
}

// 解析时间数据
function parseTimeData(time: number, total: number): CountDownTimeData {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)
  return { days, hours, minutes, seconds, milliseconds, total, current: time }
}

// 获取帧间隔（millisecond 模式 ~60fps，否则 1s）
function getFrameInterval() {
  return props.millisecond ? 16 : 1000
}

// 用 setTimeout 模拟下一帧调度，跨端兼容（小程序无 requestAnimationFrame）
function scheduleNextTick(callback: () => void) {
  const interval = getFrameInterval()
  const currTime = Date.now()
  const timeToCall = Math.max(0, interval - (currTime - rafLastTime))
  const id = setTimeout(callback, timeToCall)
  rafLastTime = currTime + timeToCall
  return id
}

// 取消调度
function cancelScheduledTick(id: ReturnType<typeof setTimeout> | null) {
  if (id !== null) clearTimeout(id)
}

// 组件销毁前暂停
onBeforeUnmount(() => {
  pause()
})

defineExpose({ start, reset, pause })
</script>

<script lang="ts">
export default {
  name: "ui-count-down",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-count-down {
  display: flex;
  white-space: nowrap;
}
</style>
