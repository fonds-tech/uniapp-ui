<template>
  <view class="ui-date-range-select" :class="[classs, props.customClass]" :style="[style]">
    <view class="ui-date-range-select__trigger" :hover-class="hoverClass" :hover-stay-time="50">
      <view class="ui-date-range-select__item ui-date-range-select__start" :class="{ 'is-active': activeType === 'start' && visible }" @click="handleClick('start')">
        <slot name="start" :text="startDisplayText" :value="startValue" :placeholder="props.startPlaceholder">
          <text v-if="startDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ startDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ props.startPlaceholder }}</text>
        </slot>
      </view>

      <view class="ui-date-range-select__separator" @click="handleClick('start')">
        <slot name="separator">
          <text class="ui-date-range-select__separator-text" :style="[separatorStyle]">{{ props.separator }}</text>
        </slot>
      </view>

      <view class="ui-date-range-select__item ui-date-range-select__end" :class="{ 'is-active': activeType === 'end' && visible }" @click="handleClick('end')">
        <slot name="end" :text="endDisplayText" :value="endValue" :placeholder="props.endPlaceholder">
          <text v-if="endDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ endDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ props.endPlaceholder }}</text>
        </slot>
      </view>

      <view v-if="showRightIcon" class="ui-date-range-select__icon" @click="handleClick('start')">
        <slot name="right-icon">
          <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
        </slot>
      </view>
    </view>

    <ui-popup
      :show="visible"
      :mode="props.mode"
      :border-radius="props.borderRadius"
      :close-on-click-overlay="props.closeOnClickOverlay"
      :overlay="props.overlay"
      :duration="props.duration"
      :z-index="props.zIndex"
      :background="props.background"
      :safe-area-inset-bottom="props.safeAreaInsetBottom"
      @update:show="handleUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close', $event)"
      @closed="emits('closed', $event)"
    >
      <template #header>
        <slot name="header">
          <view v-if="props.showHeader" class="ui-date-range-select__header">
            <view class="ui-date-range-select__header__cancel" @click="handleCancel">
              <slot name="cancel">
                <ui-button text text-color="#969799">{{ props.cancelText }}</ui-button>
              </slot>
            </view>

            <view class="ui-date-range-select__tabs">
              <view class="ui-date-range-select__tab" :class="{ 'is-active': activeType === 'start' }" @click="switchTab('start')">
                <text class="ui-date-range-select__tab-text">{{ startTabText }}</text>
              </view>
              <view class="ui-date-range-select__tab" :class="{ 'is-active': activeType === 'end' }" @click="switchTab('end')">
                <text class="ui-date-range-select__tab-text">{{ endTabText }}</text>
              </view>
            </view>

            <view class="ui-date-range-select__header__confirm" @click="handleConfirm">
              <slot name="confirm">
                <ui-button text>{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <view class="ui-date-range-select__picker">
        <picker-view :style="[viewStyle]" :value="pickerIndexes" :indicator-style="optionStyle" @change="onPickerChange">
          <picker-view-column v-for="(column, colIdx) in pickerColumns" :key="colIdx">
            <view
              v-for="(item, itemIdx) in column"
              :key="itemIdx"
              class="ui-date-range-select__picker__option"
              :class="{ 'is-active': isActiveColumn(colIdx, itemIdx) }"
              :style="[columnStyle(colIdx, itemIdx)]"
            >
              {{ item?.text ?? "" }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>

      <template #footer>
        <slot name="footer" :confirm="handleConfirm" :cancel="handleCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { DatePickerOption, DatePickerColumnType } from "../ui-date-picker"
import type { DateRangeSelectValue, DateRangeSelectActiveType, DateRangeSelectCancelData, DateRangeSelectChangeData, DateRangeSelectConfirmData } from "./index"
import { padZero } from "../utils/utils"
import { formItemKey } from "../ui-form-item"
import { dateRangeSelectEmits, dateRangeSelectProps } from "./index"
import { ref, toRaw, watch, computed, nextTick, useSlots } from "vue"
import { useUnit, useColor, useStyle, useParent, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-date-range-select" })

const props = defineProps(dateRangeSelectProps)
const emits = defineEmits(dateRangeSelectEmits)
const slots = useSlots()

const { parent } = useParent(formItemKey)

// 内部状态
const startValue = ref<string>("")
const endValue = ref<string>("")
const activeType = ref<DateRangeSelectActiveType>("start")
const visible = ref(false)
// 临时值（弹窗内编辑时使用）
const tempStartValue = ref<string>("")
const tempEndValue = ref<string>("")

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const currentDay = ref(new Date().getDate())
const currentHour = ref(new Date().getHours())
const currentMinute = ref(new Date().getMinutes())
const currentSecond = ref(new Date().getSeconds())

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
  if (!value) {
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

const minBound = computed(() => {
  // 选择结束日期时，最小日期不能早于开始日期
  if (activeType.value === "end" && tempStartValue.value) {
    const startParsed = parseDate(tempStartValue.value)
    if (props.minDate) {
      const minParsed = parseDate(props.minDate)
      // 取较大者
      if (
        startParsed.y > minParsed.y ||
        (startParsed.y === minParsed.y && startParsed.m > minParsed.m) ||
        (startParsed.y === minParsed.y && startParsed.m === minParsed.m && startParsed.d > minParsed.d)
      ) {
        return startParsed
      }
      return minParsed
    }
    return startParsed
  }

  if (props.minDate) {
    return parseDate(props.minDate)
  }
  const y = new Date().getFullYear() - 10
  return { y, m: 1, d: 1, h: 0, mi: 0, s: 0 }
})

const maxBound = computed(() => {
  // 选择开始日期时，最大日期不能晚于结束日期
  if (activeType.value === "start" && tempEndValue.value) {
    const endParsed = parseDate(tempEndValue.value)
    if (props.maxDate) {
      const maxParsed = parseDate(props.maxDate)
      // 取较小者
      if (
        endParsed.y < maxParsed.y ||
        (endParsed.y === maxParsed.y && endParsed.m < maxParsed.m) ||
        (endParsed.y === maxParsed.y && endParsed.m === maxParsed.m && endParsed.d < maxParsed.d)
      ) {
        return endParsed
      }
      return maxParsed
    }
    return endParsed
  }

  if (props.maxDate) {
    return parseDate(props.maxDate)
  }
  const y = new Date().getFullYear() + 10
  return { y, m: 12, d: 31, h: 23, mi: 59, s: 59 }
})

function genOptions(start: number, end: number, type: DatePickerColumnType): DatePickerOption[] {
  const safeStart = Math.min(start, end)
  const safeEnd = Math.max(start, end)
  const options: DatePickerOption[] = []

  const defaultFormatter = (_type: string, option: DatePickerOption) => option
  const formatter = props.columnFormatter ?? defaultFormatter

  for (let i = safeStart; i <= safeEnd; i++) {
    const text = pad(i)
    const option: DatePickerOption = { text, value: text }
    const formatted = formatter(type, option)
    options.push(formatted ?? option)
  }

  const filter = props.columnFilter
  if (typeof filter === "function") {
    return filter(type, options, [])
  }
  return options
}

const yearColumn = computed(() => genOptions(minBound.value.y, maxBound.value.y, "year"))

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

const columnMap: Record<DatePickerColumnType, typeof yearColumn> = {
  year: yearColumn,
  month: monthColumn,
  day: dayColumn,
  hour: hourColumn,
  minute: minuteColumn,
  second: secondColumn,
}

function getCurrentValue(type: DatePickerColumnType): number {
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

function setCurrentValue(type: DatePickerColumnType, val: number) {
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

const pickerColumns = computed(() => {
  return props.columns.map((type) => {
    const col = columnMap[type]
    return col ? col.value : []
  })
})

const pickerIndexes = computed(() => {
  return props.columns.map((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    if (!column || column.length === 0) return 0
    const currentVal = pad(getCurrentValue(type))
    const idx = column.findIndex((item) => item?.value === currentVal)
    return idx >= 0 ? idx : 0
  })
})

const viewStyle = computed(() => {
  const height = useUnitToPx(props.columnHeight) * +props.visibleColumnNum
  return useStyle({ height: `${height}px` })
})

const optionStyle = computed(() => {
  return useStyle({ height: useUnit(props.columnHeight) }, "string")
})

const isActiveColumn = computed(() => {
  return (columnIndex: number, index: number) => {
    return pickerIndexes.value[columnIndex] === index
  }
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

function initFromValue(value: string) {
  const parsed = parseDate(value)
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

function getFormattedValue(): string {
  return formatDate(currentYear.value, currentMonth.value, currentDay.value, currentHour.value, currentMinute.value, currentSecond.value, props.format)
}

function getSelectedValues(): string[] {
  return props.columns.map((type) => pad(getCurrentValue(type)))
}

interface PickerViewChangeEvent {
  detail: { value: number[] }
}

function onPickerChange(e: PickerViewChangeEvent) {
  const indexes = e.detail.value

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
    emitPickerChange()
  })
}

function emitPickerChange() {
  const value = getFormattedValue()

  // 更新临时值
  if (activeType.value === "start") {
    tempStartValue.value = value
  } else {
    tempEndValue.value = value
  }

  const range: DateRangeSelectValue = tempStartValue.value && tempEndValue.value ? [tempStartValue.value, tempEndValue.value] : []

  const changeData: DateRangeSelectChangeData = {
    type: activeType.value,
    value,
    range,
    selectedValues: getSelectedValues(),
    selectedIndexes: toRaw(pickerIndexes.value),
  }
  emits("change", changeData)
}

const isInteractive = computed(() => !props.disabled && !props.readonly)

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-date-range-select--disabled")
  if (props.readonly) list.push("ui-date-range-select--readonly")
  return list
})

const hoverClass = computed(() => {
  return isInteractive.value ? "ui-date-range-select--active" : ""
})

const style = computed(() => {
  return useStyle(props.customStyle)
})

const textStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.placeholderColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

const separatorStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.separatorColor) {
    style.color = useColor(props.separatorColor)
  }
  return useStyle(style)
})

const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || props.rightIcon)
})

const startDisplayText = computed(() => {
  if (!startValue.value) return ""
  if (props.displayFormatter) {
    return props.displayFormatter(startValue.value, "start")
  }
  return formatDisplayText(startValue.value)
})

const endDisplayText = computed(() => {
  if (!endValue.value) return ""
  if (props.displayFormatter) {
    return props.displayFormatter(endValue.value, "end")
  }
  return formatDisplayText(endValue.value)
})

const startTabText = computed(() => {
  return tempStartValue.value || props.startPlaceholder
})

const endTabText = computed(() => {
  return tempEndValue.value || props.endPlaceholder
})

function formatDisplayText(value: string): string {
  if (!value) return ""

  const parts = value
    .replace("T", " ")
    .replace("Z", "")
    .split(/[\s/:-]/)
  if (parts.length < 3) return value

  const year = parts[0]
  const month = parts[1]
  const day = parts[2]
  const hour = parts[3] || "00"
  const minute = parts[4] || "00"
  const second = parts[5] || "00"

  const columns = props.columns
  const textParts: string[] = []

  const hasYear = columns.includes("year")
  const hasMonth = columns.includes("month")
  const hasDay = columns.includes("day")
  const hasHour = columns.includes("hour")
  const hasMinute = columns.includes("minute")
  const hasSecond = columns.includes("second")

  if (hasYear || hasMonth || hasDay) {
    const dateParts: string[] = []
    if (hasYear) dateParts.push(year)
    if (hasMonth) dateParts.push(month)
    if (hasDay) dateParts.push(day)
    textParts.push(dateParts.join("-"))
  }

  if (hasHour || hasMinute || hasSecond) {
    const timeParts: string[] = []
    if (hasHour) timeParts.push(hour)
    if (hasMinute) timeParts.push(minute)
    if (hasSecond) timeParts.push(second)
    textParts.push(timeParts.join(":"))
  }

  return textParts.join(" ")
}

function parseRangeValue(value: DateRangeSelectValue | undefined) {
  if (!value || !Array.isArray(value) || value.length < 2) {
    return { start: "", end: "" }
  }
  return {
    start: value[0] || "",
    end: value[1] || "",
  }
}

watch(
  () => props.modelValue,
  (val) => {
    const { start, end } = parseRangeValue(val)
    startValue.value = start
    endValue.value = end
  },
  { immediate: true, deep: true },
)

function handleClick(type: DateRangeSelectActiveType) {
  if (!isInteractive.value) return
  emits("click", type)
  activeType.value = type
  // 初始化临时值
  tempStartValue.value = startValue.value
  tempEndValue.value = endValue.value
  // 初始化 picker 值
  const currentValue = type === "start" ? tempStartValue.value : tempEndValue.value
  initFromValue(currentValue)
  // 自动回填：用 picker 当前显示值更新临时值（即使用户不滑动也能确认）
  if (type === "start") {
    tempStartValue.value = getFormattedValue()
  } else {
    tempEndValue.value = getFormattedValue()
  }
  visible.value = true
}

function switchTab(type: DateRangeSelectActiveType) {
  activeType.value = type
  // 切换 Tab 时重新初始化 picker
  const currentValue = type === "start" ? tempStartValue.value : tempEndValue.value
  initFromValue(currentValue)
  // 自动回填：用 picker 当前显示值更新临时值
  if (type === "start") {
    tempStartValue.value = getFormattedValue()
  } else {
    tempEndValue.value = getFormattedValue()
  }
}

function handleUpdateShow(show: boolean) {
  visible.value = show
  if (!show) {
    const range: DateRangeSelectValue = startValue.value && endValue.value ? [startValue.value, endValue.value] : []
    parent?.onBlur(range)
  }
}

function handleCancel() {
  const range: DateRangeSelectValue = startValue.value && endValue.value ? [startValue.value, endValue.value] : []
  const cancelData: DateRangeSelectCancelData = { range }
  emits("cancel", cancelData)
  visible.value = false
  parent?.onBlur(range)
}

function handleConfirm() {
  // 自动切换：当前是开始日期且开启了自动切换，则切换到结束日期而非关闭
  if (props.autoSwitchToEnd && activeType.value === "start") {
    switchTab("end")
    return
  }

  startValue.value = tempStartValue.value
  endValue.value = tempEndValue.value

  const range: DateRangeSelectValue = startValue.value && endValue.value ? [startValue.value, endValue.value] : []

  const confirmData: DateRangeSelectConfirmData = {
    range,
    startValue: startValue.value,
    endValue: endValue.value,
  }

  emits("confirm", confirmData)
  emits("update:modelValue", range)
  visible.value = false

  parent?.onChange(range)
}

function open(type: DateRangeSelectActiveType = "start") {
  if (!isInteractive.value) return
  activeType.value = type
  tempStartValue.value = startValue.value
  tempEndValue.value = endValue.value
  const currentValue = type === "start" ? tempStartValue.value : tempEndValue.value
  initFromValue(currentValue)
  // 自动回填：用 picker 当前显示值更新临时值
  if (type === "start") {
    tempStartValue.value = getFormattedValue()
  } else {
    tempEndValue.value = getFormattedValue()
  }
  visible.value = true
}

function close() {
  visible.value = false
}

function confirm() {
  handleConfirm()
}

function cancel() {
  handleCancel()
}

function getSelectedRange(): DateRangeSelectValue {
  if (startValue.value && endValue.value) {
    return [startValue.value, endValue.value]
  }
  return []
}

defineExpose({
  name: "ui-date-range-select",
  open,
  close,
  confirm,
  cancel,
  getSelectedRange,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-range-select",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-date-range-select {
  flex: 1;
  display: flex;
  flex-direction: column;

  &--disabled {
    opacity: var(--ui-opacity-disabled);
  }

  &__trigger {
    flex: 1;
    display: flex;
    align-items: center;

    &.ui-date-range-select--active {
      opacity: 0.85;
    }
  }

  &__item {
    flex: 1;
    display: flex;
    padding: 8rpx 0;
    overflow: hidden;
    transition: background-color 0.2s;
    align-items: center;
    border-radius: 8rpx;
    justify-content: center;

    &.is-active {
      background-color: var(--ui-color-primary-light, rgba(25, 137, 250, 0.1));
    }
  }

  &__separator {
    display: flex;
    padding: 0 16rpx;
    align-items: center;
    flex-shrink: 0;

    &-text {
      color: var(--ui-color-text-secondary);
      font-size: var(--ui-font-size-md);
    }
  }

  &__text {
    color: var(--ui-color-text-primary);
    overflow: hidden;
    font-size: var(--ui-font-size-md);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__placeholder {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-md);
  }

  &__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: var(--ui-spacing-md);
  }

  // Header 样式
  &__header {
    height: 96rpx;
    display: flex;
    padding: 0 24rpx;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
    justify-content: space-between;

    &__cancel,
    &__confirm {
      flex-shrink: 0;
    }
  }

  // Tabs 样式
  &__tabs {
    gap: 32rpx;
    flex: 1;
    display: flex;
    justify-content: center;
  }

  &__tab {
    padding: 8rpx 24rpx;
    position: relative;
    min-width: 160rpx;
    text-align: center;
    transition: all 0.2s;
    border-radius: 8rpx;

    &.is-active {
      background-color: var(--ui-color-primary-light, rgba(25, 137, 250, 0.1));

      .ui-date-range-select__tab-text {
        color: var(--ui-color-primary);
        font-weight: 600;
      }
    }

    &-text {
      color: var(--ui-color-text-primary);
      font-size: 28rpx;
      transition: color 0.2s;
    }
  }

  // Picker 样式
  &__picker {
    z-index: 1;
    position: relative;

    &__option {
      display: flex;
      font-size: 28rpx;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
