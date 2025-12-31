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

defineOptions({ name: "ui-count-down" })

const props = defineProps(countDownProps)
const emits = defineEmits(countDownEmits)
const timer = ref(null)
const runing = ref(false)
const endTime = ref(null)
const remainTime = ref(0)
const rafLastTime = ref(null)
const timeData = ref<CountDownTimeData>({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
const formatTimeText = ref("")

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

watch(() => props.time, reset, { immediate: true })

function tick() {
  const next = () => {
    timer.value = useRequestAnimationFrame(() => {
      const remain = Math.max(endTime.value - Date.now(), 0)
      timeData.value = parseTimeData(remain)
      formatTimeText.value = parseTimeFormat(timeData.value, props.format)
      if (props.millisecond) {
        emits("change", parseTimeData(remain))
      } else if (!isSameSecond(remain, remainTime.value)) {
        emits("change", parseTimeData(remain))
      }
      remainTime.value = remain
      if (remain === 0) {
        emits("finish")
        pause()
      } else {
        next()
      }
    })
  }
  next()
}

function start() {
  if (runing.value) return
  runing.value = true
  endTime.value = Date.now() + remainTime.value
  tick()
}

function reset() {
  pause()
  remainTime.value = +props.time
  if (props.autoStart) start()
}

function pause() {
  runing.value = false
  useCancelRequestAnimationFrame(timer.value)
}

function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

function parseTimeFormat(time: any, format: string) {
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

function parseTimeData(time: number) {
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE
  const DAY = 24 * HOUR
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)
  return { days, hours, minutes, seconds, milliseconds }
}

function useRequestAnimationFrame(callback = () => {}) {
  const currTime = new Date().getTime()
  const timeToCall = Math.max(0, 16 - (currTime - rafLastTime.value))
  const id = setTimeout(() => {
    callback()
  }, timeToCall)
  rafLastTime.value = currTime + timeToCall
  return id
}

function useCancelRequestAnimationFrame(id: number) {
  clearTimeout(id)
}

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
