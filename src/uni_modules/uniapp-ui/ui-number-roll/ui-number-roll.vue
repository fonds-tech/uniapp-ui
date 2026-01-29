<template>
  <view class="ui-number-roll" :class="props.customClass" :style="[style]">
    <view v-for="(column, index) in columns" :key="index" class="ui-number-roll__column" :style="[columnStyle(index)]">
      <text v-for="(v, valueIndex) in column" :key="valueIndex" class="ui-number-roll__row" :style="[columnItemStyle]">{{ v }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { isDef } from "../utils/check"
import { formatDigit } from "../utils/format"
import { numberRollProps } from "./index"
import { useRect, useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-number-roll" })

const props = defineProps(numberRollProps)
const instance = getCurrentInstance()
const isInit = ref(false)
const height = ref(0)
const indexs = ref<number[]>([])
const columns = ref<string[][]>([])
const arab = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// 兼容字符串输入，避免 NaN，并在必要时保留原始格式
function formatValue(value: string | number) {
  const options = {
    decimalPlaces: props.decimalPlaces,
    trimZero: props.trimZero,
    thousandsSep: props.thousandsSep,
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "0"
    return String(formatDigit(value, options))
  }

  const rawValue = String(value).trim()
  if (!rawValue) return "0"

  const { thousandsSep } = options
  const escapedSep = thousandsSep ? escapeRegExp(thousandsSep) : ""
  const allowedPattern = new RegExp(`^[0-9\\-\\.,${escapedSep}]+$`)
  if (!allowedPattern.test(rawValue)) return rawValue

  if (/^-?0\d+$/.test(rawValue)) return rawValue

  if (thousandsSep) {
    const parsed = Number(rawValue.split(thousandsSep).join(""))
    if (Number.isFinite(parsed)) return String(formatDigit(parsed, options))
    return rawValue
  }

  if (rawValue.includes(",")) return rawValue

  const parsed = Number(rawValue)
  if (!Number.isFinite(parsed)) return rawValue
  return String(formatDigit(parsed, options))
}

const heightValue = computed(() => {
  if (props.fontSize) return useUnit(props.fontSize)
  return height.value > 0 ? `${height.value}px` : "auto"
})

const style = computed(() => {
  const style: any = {}
  style.height = heightValue.value
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
const columnStyle = computed(() => {
  return (index: number) => {
    const style: any = {}
    const h = heightValue.value
    const translateValue = `calc(${indexs.value[index]} * ${h} * -1)`
    style.transform = `translateY(${translateValue})`
    if (props.timingFunction) style.transitionTimingFunction = props.timingFunction
    if (isDef(props.duration)) style.transitionDuration = `${props.duration}ms`
    return useStyle(style)
  }
})
const columnItemStyle = computed(() => {
  const style: any = {}
  const h = heightValue.value
  style.color = useColor(props.color)
  style.height = h
  style.fontSize = h
  style.lineHeight = h
  style.fontWeight = props.fontWeight
  return useStyle(style)
})

watch(() => [props.value, props.decimalPlaces, props.trimZero, props.thousandsSep, props.fontSize], resize)

async function resize() {
  await nextTick()
  const value = formatValue(isInit.value ? props.value : 0)
  const formatValueArr = String(value).split("")
  columns.value = formatValueArr.map((val) => (~arab.indexOf(val) ? arab : [val]))
  indexs.value = formatValueArr
    .reverse()
    .map((val) => (~arab.indexOf(val) ? Number(val) : 0))
    .reverse()

  initRect()
  if (!isInit.value) {
    isInit.value = true
    resize()
  }
}

function initRect() {
  useRect(".ui-number-roll", instance).then((rect: any) => {
    height.value = rect.height
  })
}

onMounted(() => resize())
defineExpose({ name: "ui-number-roll" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-number-roll {
  display: inline-flex;
  overflow: hidden;

  &__column {
    transition-duration: 1.2s;
    transition-property: transform;
    transition-timing-function: ease-out;
  }

  &__row {
    color: inherit;
    display: flex;
    font-size: inherit;
    transition: all 0.3s ease-out;
    font-weight: inherit;
    justify-content: center;
  }
}
</style>
