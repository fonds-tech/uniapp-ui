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

// 定时器
const timer = ref<ReturnType<typeof setTimeout> | null>(null)
// 是否运行中
const runing = ref(false)
// 开始时间
const startTime = ref<number>(0)
// 结束时间
const endTime = ref<number>(0)
// 总时间
const totalTime = ref<number>(0)
// 剩余时间
const remainTime = ref<number>(0)
// RAF 上次执行时间
const rafLastTime = ref<number>(0)
// 时间数据
const timeData = ref<CountDownTimeData>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  total: 0,
  current: 0,
})
// 格式化后的时间文本
const formatTimeText = ref("")

// 是否为正计时模式
const isCountUp = computed(() => props.mode === "countup")
// 根节点样式
const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

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
  if (!runing.value) return
  const now = Date.now()
  let current: number

  if (isCountUp.value) {
    current = Math.min(now - startTime.value, totalTime.value)
  } else {
    current = Math.max(endTime.value - now, 0)
  }

  const parsed = parseTimeData(current, totalTime.value)
  timeData.value = parsed
  formatTimeText.value = parseTimeFormat(parsed, props.format)

  if (props.millisecond) {
    emits("change", parsed)
  } else if (!isSameSecond(current, remainTime.value)) {
    emits("change", parsed)
  }
  remainTime.value = current

  const finished = isCountUp.value ? current >= totalTime.value : current === 0
  if (finished) {
    emits("finish")
    pause()
  } else {
    timer.value = useRequestAnimationFrame(tick)
  }
}

// 开始计时
function start() {
  if (runing.value) return
  runing.value = true
  const now = Date.now()
  if (isCountUp.value) {
    startTime.value = now - remainTime.value
  } else {
    endTime.value = now + remainTime.value
  }
  rafLastTime.value = now
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
      totalTime.value = Math.max(target - now, 0)
      remainTime.value = 0
    } else {
      totalTime.value = Math.max(target - now, 0)
      remainTime.value = totalTime.value
    }
  } else {
    const validTime = Number.isFinite(time) && time > 0 ? time : 0
    totalTime.value = validTime
    remainTime.value = isCountUp.value ? 0 : validTime
  }

  timeData.value = parseTimeData(remainTime.value, totalTime.value)
  formatTimeText.value = parseTimeFormat(timeData.value, props.format)
  if (props.autoStart) start()
}

// 暂停计时
function pause() {
  if (runing.value) {
    const now = Date.now()
    if (isCountUp.value) {
      remainTime.value = Math.min(now - startTime.value, totalTime.value)
    } else {
      remainTime.value = Math.max(endTime.value - now, 0)
    }
  }
  runing.value = false
  useCancelRequestAnimationFrame(timer.value)
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

// 获取帧间隔
function getFrameInterval() {
  return props.millisecond ? 16 : 1000
}

// 模拟 requestAnimationFrame
function useRequestAnimationFrame(callback: () => void) {
  const interval = getFrameInterval()
  const currTime = Date.now()
  const timeToCall = Math.max(0, interval - (currTime - rafLastTime.value))
  const id = setTimeout(callback, timeToCall)
  rafLastTime.value = currTime + timeToCall
  return id
}

// 取消 requestAnimationFrame
function useCancelRequestAnimationFrame(id: ReturnType<typeof setTimeout> | null) {
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
