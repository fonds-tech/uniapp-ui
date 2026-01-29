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
const timer = ref<ReturnType<typeof setTimeout> | null>(null)
const runing = ref(false)
const startTime = ref<number>(0)
const endTime = ref<number>(0)
const totalTime = ref<number>(0)
const remainTime = ref<number>(0)
const rafLastTime = ref<number>(0)
const timeData = ref<CountDownTimeData>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  total: 0,
  current: 0,
})
const formatTimeText = ref("")

const isCountUp = computed(() => props.mode === "countup")

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(() => props.time, reset, { immediate: true })
watch(() => props.targetTime, reset)
watch(
  () => props.format,
  () => {
    formatTimeText.value = parseTimeFormat(timeData.value, props.format)
  },
)

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

function reset() {
  pause()
  const target = +props.targetTime
  const time = +props.time

  if (target > 0) {
    const now = Date.now()
    if (isCountUp.value) {
      totalTime.value = target - now
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

function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

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

function getFrameInterval() {
  return props.millisecond ? 16 : 1000
}

function useRequestAnimationFrame(callback: () => void) {
  const interval = getFrameInterval()
  const currTime = Date.now()
  const timeToCall = Math.max(0, interval - (currTime - rafLastTime.value))
  const id = setTimeout(callback, timeToCall)
  rafLastTime.value = currTime + timeToCall
  return id
}

function useCancelRequestAnimationFrame(id: ReturnType<typeof setTimeout> | null) {
  if (id !== null) clearTimeout(id)
}

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
