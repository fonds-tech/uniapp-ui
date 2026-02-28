<template>
  <view class="ui-date-panel" :class="[props.customClass]" :style="[style]">
    <picker-view
      class="ui-date-panel__view"
      :style="[viewStyle]"
      :value="pickerIndexes"
      :indicator-style="indicatorStyle"
      :indicator-class="props.indicatorClass"
      :mask-style="props.maskStyle"
      :mask-top-style="props.maskTopStyle"
      :mask-bottom-style="props.maskBottomStyle"
      :mask-class="props.maskClass"
      :immediate-change="props.immediateChange"
      @change="onPickerChange"
      @pickstart="emits('pickstart')"
      @pickend="emits('pickend')"
    >
      <picker-view-column v-for="(column, colIdx) in pickerColumns" :key="colIdx">
        <view
          v-for="(item, itemIdx) in column"
          :key="itemIdx"
          class="ui-date-panel__option"
          :class="{ 'is-active': isActiveColumn(colIdx, itemIdx) }"
          :style="[columnStyle(colIdx, itemIdx)]"
        >
          {{ item?.text ?? "" }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import type { DatePanelColumnType, DatePanelOption } from "./index"
import { isDef } from "../utils/check"
import { padZero } from "../utils/utils"
import { datePanelEmits, datePanelProps } from "./index"
import { computed, nextTick, ref, toRaw, watch } from "vue"
import { useColor, useStyle, useUnit, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-date-panel" })

const props = defineProps(datePanelProps)
const emits = defineEmits(datePanelEmits)

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const currentDay = ref(new Date().getDate())
const currentHour = ref(new Date().getHours())
const currentMinute = ref(new Date().getMinutes())
const currentSecond = ref(new Date().getSeconds())

const minBound = computed(() => {
  if (props.minDate) {
    return parseDate(props.minDate)
  }
  const y = new Date().getFullYear() - 10
  return { y, m: 1, d: 1, h: 0, mi: 0, s: 0 }
})

const maxBound = computed(() => {
  if (props.maxDate) {
    return parseDate(props.maxDate)
  }
  const y = new Date().getFullYear() + 10
  return { y, m: 12, d: 31, h: 23, mi: 59, s: 59 }
})

const yearColumn = computed(() => {
  return genOptions(minBound.value.y, maxBound.value.y, "year")
})

const monthColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  return genOptions(minM, maxM, "month")
})

const dayColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const minD = isMinYear && isMinMonth ? minBound.value.d : 1
  const maxDays = getDaysInMonth(currentYear.value, currentMonth.value)
  const maxD = isMaxYear && isMaxMonth ? Math.min(maxBound.value.d, maxDays) : maxDays
  return genOptions(minD, maxD, "day")
})

const hourColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const minH = isMinYear && isMinMonth && isMinDay ? minBound.value.h : 0
  const maxH = isMaxYear && isMaxMonth && isMaxDay ? maxBound.value.h : 23
  return genOptions(minH, maxH, "hour")
})

const minuteColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const isMinHour = currentHour.value === minBound.value.h
  const isMaxHour = currentHour.value === maxBound.value.h
  const minMi = isMinYear && isMinMonth && isMinDay && isMinHour ? minBound.value.mi : 0
  const maxMi = isMaxYear && isMaxMonth && isMaxDay && isMaxHour ? maxBound.value.mi : 59
  return genOptions(minMi, maxMi, "minute")
})

const secondColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const isMinHour = currentHour.value === minBound.value.h
  const isMaxHour = currentHour.value === maxBound.value.h
  const isMinMinute = currentMinute.value === minBound.value.mi
  const isMaxMinute = currentMinute.value === maxBound.value.mi
  const minS = isMinYear && isMinMonth && isMinDay && isMinHour && isMinMinute ? minBound.value.s : 0
  const maxS = isMaxYear && isMaxMonth && isMaxDay && isMaxHour && isMaxMinute ? maxBound.value.s : 59
  return genOptions(minS, maxS, "second")
})

const columnMap: Record<DatePanelColumnType, typeof yearColumn> = {
  year: yearColumn,
  month: monthColumn,
  day: dayColumn,
  hour: hourColumn,
  minute: minuteColumn,
  second: secondColumn,
}

const pickerColumns = computed(() => {
  return props.columns.map((type) => {
    const column = columnMap[type]
    return column ? column.value : []
  })
})

const pickerIndexes = computed(() => {
  return props.columns.map((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    if (!column || column.length === 0) return 0
    const currentVal = pad(getCurrentValue(type))
    const index = column.findIndex((item) => item?.value === currentVal)
    return index >= 0 ? index : 0
  })
})

const style = computed(() => useStyle(props.customStyle))

const viewStyle = computed(() => {
  const height = useUnitToPx(props.columnHeight) * +props.visibleColumnNum
  return useStyle({ height: `${height}px` }, "string")
})

const indicatorStyle = computed(() => {
  return useStyle({ height: useUnit(props.columnHeight) }, "string")
})

const isActiveColumn = computed(() => {
  return (columnIndex: number, index: number) => pickerIndexes.value[columnIndex] === index
})

const columnStyle = computed(() => {
  return (columnIndex: number, index: number) => {
    const isActive = isActiveColumn.value(columnIndex, index)
    return useStyle({
      fontSize: useUnit(isActive ? props.activeColumnSize : props.columnSize),
      color: isActive ? useColor(props.activeColumnColor) : useColor(props.columnColor),
      fontWeight: isActive ? props.activeColumnWeight : props.columnWeight,
    })
  }
})

watch(
  () => props.modelValue,
  () => {
    initFromValue()
  },
  { immediate: true },
)

watch(
  () => [props.minDate, props.maxDate, props.columns],
  () => {
    adjustToBounds()
  },
  { deep: true },
)

function pad(n: number): string {
  return padZero(n)
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

function formatDate(y: number, m: number, d: number, h: number, mi: number, s: number, format: string): string {
  return format.replace(/YYYY/g, String(y)).replace(/MM/g, pad(m)).replace(/DD/g, pad(d)).replace(/HH/g, pad(h)).replace(/mm/g, pad(mi)).replace(/ss/g, pad(s))
}

function parseDate(value: string | number | Date | null | undefined): { y: number; m: number; d: number; h: number; mi: number; s: number } {
  const now = new Date()
  if (!isDef(value)) {
    return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate(), h: now.getHours(), mi: now.getMinutes(), s: now.getSeconds() }
  }

  let date: Date
  if (value instanceof Date) {
    date = value
  } else if (typeof value === "number") {
    date = new Date(value)
  } else {
    const normalized = value.replace("T", " ").replace("Z", "")
    const parts = normalized.split(/[\s/:-]/)
    if (parts.length >= 3) {
      const y = Number.parseInt(parts[0]) || now.getFullYear()
      const m = Number.parseInt(parts[1]) || 1
      const d = Number.parseInt(parts[2]) || 1
      const h = Number.parseInt(parts[3]) || 0
      const mi = Number.parseInt(parts[4]) || 0
      const s = Number.parseInt(parts[5]) || 0
      return { y, m, d, h, mi, s }
    }
    date = new Date(value)
    if (Number.isNaN(date.getTime())) date = now
  }

  return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate(), h: date.getHours(), mi: date.getMinutes(), s: date.getSeconds() }
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

function genOptions(start: number, end: number, type: DatePanelColumnType): DatePanelOption[] {
  const safeStart = Math.min(start, end)
  const safeEnd = Math.max(start, end)
  const options: DatePanelOption[] = []

  const defaultFormatter = (_type: string, option: DatePanelOption) => option
  const formatter = props.columnFormatter ?? defaultFormatter
  const selectedValues = getSelectedValues()

  for (let i = safeStart; i <= safeEnd; i++) {
    const text = pad(i)
    const option: DatePanelOption = { text, value: text }
    const formatted = formatter(type, option)
    options.push(formatted ?? option)
  }

  if (typeof props.columnFilter === "function") {
    return props.columnFilter(type, options, selectedValues)
  }
  return options
}

function getCurrentValue(type: DatePanelColumnType): number {
  switch (type) {
    case "year":
      return currentYear.value
    case "month":
      return currentMonth.value
    case "day":
      return currentDay.value
    case "hour":
      return currentHour.value
    case "minute":
      return currentMinute.value
    case "second":
      return currentSecond.value
  }
}

function setCurrentValue(type: DatePanelColumnType, val: number) {
  switch (type) {
    case "year":
      currentYear.value = val
      break
    case "month":
      currentMonth.value = val
      break
    case "day":
      currentDay.value = val
      break
    case "hour":
      currentHour.value = val
      break
    case "minute":
      currentMinute.value = val
      break
    case "second":
      currentSecond.value = val
      break
  }
}

function initFromValue() {
  const parsed = parseDate(props.modelValue)

  currentYear.value = clamp(parsed.y, minBound.value.y, maxBound.value.y)
  currentMonth.value = clamp(parsed.m, 1, 12)
  currentDay.value = clamp(parsed.d, 1, getDaysInMonth(currentYear.value, currentMonth.value))
  currentHour.value = clamp(parsed.h, 0, 23)
  currentMinute.value = clamp(parsed.mi, 0, 59)
  currentSecond.value = clamp(parsed.s, 0, 59)

  adjustToBounds()
}

function adjustToBounds() {
  currentYear.value = clamp(currentYear.value, minBound.value.y, maxBound.value.y)

  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  currentMonth.value = clamp(currentMonth.value, minM, maxM)

  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const minD = isMinYear && isMinMonth ? minBound.value.d : 1
  const maxDays = getDaysInMonth(currentYear.value, currentMonth.value)
  const maxD = isMaxYear && isMaxMonth ? Math.min(maxBound.value.d, maxDays) : maxDays
  currentDay.value = clamp(currentDay.value, minD, maxD)

  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const minH = isMinYear && isMinMonth && isMinDay ? minBound.value.h : 0
  const maxH = isMaxYear && isMaxMonth && isMaxDay ? maxBound.value.h : 23
  currentHour.value = clamp(currentHour.value, minH, maxH)

  const isMinHour = currentHour.value === minBound.value.h
  const isMaxHour = currentHour.value === maxBound.value.h
  const minMi = isMinYear && isMinMonth && isMinDay && isMinHour ? minBound.value.mi : 0
  const maxMi = isMaxYear && isMaxMonth && isMaxDay && isMaxHour ? maxBound.value.mi : 59
  currentMinute.value = clamp(currentMinute.value, minMi, maxMi)

  const isMinMinute = currentMinute.value === minBound.value.mi
  const isMaxMinute = currentMinute.value === maxBound.value.mi
  const minS = isMinYear && isMinMonth && isMinDay && isMinHour && isMinMinute ? minBound.value.s : 0
  const maxS = isMaxYear && isMaxMonth && isMaxDay && isMaxHour && isMaxMinute ? maxBound.value.s : 59
  currentSecond.value = clamp(currentSecond.value, minS, maxS)
}

interface PickerViewChangeEvent {
  detail: { value: number[] }
}

function onPickerChange(event: PickerViewChangeEvent) {
  const indexes = event.detail.value

  props.columns.forEach((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    const selectedIdx = indexes[colIdx] ?? 0
    const selectedOption = column[selectedIdx]
    if (selectedOption) {
      setCurrentValue(type, Number.parseInt(selectedOption.value))
    }
  })

  nextTick(() => {
    adjustToBounds()
    emitChange()
  })
}

function getSelectedValues(): string[] {
  return props.columns.map((type) => pad(getCurrentValue(type)))
}

function getFormattedValue(): string {
  return formatDate(currentYear.value, currentMonth.value, currentDay.value, currentHour.value, currentMinute.value, currentSecond.value, props.format)
}

function getSelectedDateParts() {
  return {
    year: currentYear.value,
    month: currentMonth.value,
    day: currentDay.value,
    hour: currentHour.value,
    minute: currentMinute.value,
    second: currentSecond.value,
  }
}

function emitChange() {
  const value = getFormattedValue()
  const selectedValues = getSelectedValues()
  const selectedIndexes = toRaw(pickerIndexes.value)
  const selectedDateParts = getSelectedDateParts()

  emits("change", { value, selectedValues, selectedIndexes, selectedDateParts })
  emits("update:modelValue", value)
}

function setValue(value: string | number | Date | null | undefined) {
  const parsed = parseDate(value)
  currentYear.value = parsed.y
  currentMonth.value = parsed.m
  currentDay.value = parsed.d
  currentHour.value = parsed.h
  currentMinute.value = parsed.mi
  currentSecond.value = parsed.s
  adjustToBounds()
}

defineExpose({
  name: "ui-date-panel",
  getSelectedValue: getFormattedValue,
  getSelectedValues,
  getSelectedIndexes: () => toRaw(pickerIndexes.value),
  getSelectedDateParts,
  setValue,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-panel",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-date-panel {
  &__view {
    z-index: 1;
    position: relative;
  }

  &__option {
    display: flex;
    font-size: 28rpx;
    overflow: hidden;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    transition:
      font-size 0.15s ease,
      color 0.15s ease,
      font-weight 0.15s ease;
  }
}
</style>
