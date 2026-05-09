<template>
  <view class="ui-number-roll" :class="[props.customClass]" :style="[rootStyle]">
    <view v-for="(column, index) in columns" :key="index" class="ui-number-roll__column" :style="[columnStyle(index)]">
      <text v-for="(v, valueIndex) in column" :key="valueIndex" class="ui-number-roll__row">{{ v }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatDigit } from "../utils/format"
import { isDef, isNumber } from "../utils/check"
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
// 0-9 数字字符表，遇到非数字字符时单列只放该字符
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

// 行高字符串：fontSize > 测量值 > "auto"（首次未测前）
const heightValue = computed(() => {
  if (props.fontSize) return useUnit(props.fontSize)
  return height.value > 0 ? `${height.value}px` : "auto"
})
// 根节点 CSS var 注入
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  vars["--ui-number-roll-height"] = heightValue.value
  if (props.color) vars["--ui-number-roll-color"] = useColor(props.color)
  if (props.fontWeight !== undefined) vars["--ui-number-roll-font-weight"] = String(props.fontWeight)
  if (isDef(props.duration)) vars["--ui-number-roll-duration"] = isNumber(props.duration) ? `${props.duration}ms` : props.duration
  if (props.timingFunction) vars["--ui-number-roll-timing"] = props.timingFunction
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})
// 单列 transform：根据当前索引平移 N 行高
const columnStyle = computed(() => (index: number) => {
  return useStyle({ transform: `translateY(calc(${indexs.value[index] || 0} * var(--ui-number-roll-height) * -1))` })
})

watch(() => [props.value, props.decimalPlaces, props.trimZero, props.thousandsSep, props.fontSize], () => resize())

onMounted(() => resize())

// 重新计算列与索引
async function resize() {
  await nextTick()
  const value = formatValue(isInit.value ? props.value : 0)
  const chars = String(value).split("")
  columns.value = chars.map((c) => (~DIGITS.indexOf(c) ? DIGITS : [c]))
  indexs.value = chars.map((c) => (~DIGITS.indexOf(c) ? Number(c) : 0))
  initRect()
  // 首次先按 0 占位测量行高，再用真实 value 重算
  if (!isInit.value) {
    isInit.value = true
    resize()
  }
}

// 测量首列行高
function initRect() {
  useRect(".ui-number-roll", instance).then((rect: any) => {
    height.value = rect.height
  })
}

// 转义正则元字符
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// 把 value 标准化为可拆列的字符串
function formatValue(value: string | number) {
  const options = { decimalPlaces: props.decimalPlaces, trimZero: props.trimZero, thousandsSep: props.thousandsSep }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "0"
    return String(formatDigit(value, options))
  }
  const raw = String(value).trim()
  if (!raw) return "0"
  const { thousandsSep } = options
  const escaped = thousandsSep ? escapeRegExp(thousandsSep) : ""
  const allowed = new RegExp(`^[0-9\\-\\.,${escaped}]+$`)
  if (!allowed.test(raw)) return raw
  if (/^-?0\d+$/.test(raw)) return raw
  if (thousandsSep) {
    const parsed = Number(raw.split(thousandsSep).join(""))
    if (Number.isFinite(parsed)) return String(formatDigit(parsed, options))
    return raw
  }
  if (raw.includes(",")) return raw
  const parsed = Number(raw)
  if (!Number.isFinite(parsed)) return raw
  return String(formatDigit(parsed, options))
}
</script>

<script lang="ts">
export default {
  name: "ui-number-roll",
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
.ui-number-roll {
  --ui-number-roll-color: var(--ui-color-text);
  --ui-number-roll-height: var(--ui-font-size-md);
  --ui-number-roll-timing: ease-out;
  --ui-number-roll-duration: 1.2s;
  --ui-number-roll-font-weight: inherit;
  height: var(--ui-number-roll-height);

  display: inline-flex;
  overflow: hidden;

  &__column {
    transition: transform var(--ui-number-roll-duration) var(--ui-number-roll-timing);
  }

  &__row {
    color: var(--ui-number-roll-color);
    width: 100%;
    height: var(--ui-number-roll-height);
    display: flex;
    font-size: var(--ui-number-roll-height);
    font-weight: var(--ui-number-roll-font-weight);
    line-height: var(--ui-number-roll-height);
    justify-content: center;
  }
}
</style>
