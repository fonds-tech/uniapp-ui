<template>
  <view class="ui-date-picker">
    <ui-popup
      :show="show"
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
          <view v-if="props.showHeader" class="ui-date-picker__header">
            <view class="ui-date-picker__header__cancel" @click="onCancel">
              <slot name="cancel">
                <ui-button text text-color="#969799">
                  {{ props.cancelText }}
                </ui-button>
              </slot>
            </view>
            <view class="ui-date-picker__header__title">
              <slot name="title">{{ props.title }}</slot>
            </view>
            <view class="ui-date-picker__header__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text>{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <view class="ui-date-picker__options">
        <picker-view :style="[viewStyle]" :value="pickerIndexes" :indicator-style="optionStyle" @change="onPickerChange">
          <picker-view-column v-for="(column, colIdx) in pickerColumns" :key="colIdx">
            <view
              v-for="(item, itemIdx) in column"
              :key="itemIdx"
              class="ui-date-picker__options__option"
              :class="{ 'is-active': isActiveColumn(colIdx, itemIdx) }"
              :style="[columnStyle(colIdx, itemIdx)]"
            >
              {{ item?.text ?? "" }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>

      <template #footer>
        <slot name="footer" :confirm="onConfirm" :cancel="onCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { DatePickerOption, DatePickerColumnType } from "./index"
import UiPopup from "../ui-popup/ui-popup.vue"
import { padZero } from "../utils/utils"
import { datePickerEmits, datePickerProps } from "./index"
import { ref, toRaw, watch, computed, nextTick } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-date-picker" })

const props = defineProps(datePickerProps)
const emits = defineEmits(datePickerEmits)

// 当前选中的日期各部分值 (year, month, day, hour, minute, second)
// 使用独立的 ref 避免对象深层响应式导致的问题
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1) // 1-12
const currentDay = ref(new Date().getDate())
const currentHour = ref(new Date().getHours())
const currentMinute = ref(new Date().getMinutes())
const currentSecond = ref(new Date().getSeconds())

/**
 * 补零
 */
function pad(n: number): string {
  return padZero(n)
}

/**
 * 获取指定年月的天数
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * 格式化日期
 */
function formatDate(y: number, m: number, d: number, h: number, mi: number, s: number, format: string): string {
  return format.replace(/YYYY/g, String(y)).replace(/MM/g, pad(m)).replace(/DD/g, pad(d)).replace(/HH/g, pad(h)).replace(/mm/g, pad(mi)).replace(/ss/g, pad(s))
}

/**
 * 解析日期值
 */
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
    // 字符串解析
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

/**
 * 限制值在范围内
 */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * 生成列选项
 * @param start - 起始值
 * @param end - 结束值
 * @param type - 列类型
 */
function genOptions(start: number, end: number, type: DatePickerColumnType): DatePickerOption[] {
  // 边界保护：确保 start <= end
  const safeStart = Math.min(start, end)
  const safeEnd = Math.max(start, end)
  const options: DatePickerOption[] = []

  // 默认 formatter：直接返回 option
  const defaultFormatter = (_type: string, option: DatePickerOption) => option
  const formatter = props.columnFormatter ?? defaultFormatter

  for (let i = safeStart; i <= safeEnd; i++) {
    const text = pad(i)
    const option: DatePickerOption = { text, value: text }
    const formatted = formatter(type, option)
    options.push(formatted ?? option)
  }

  // 过滤器
  const filter = props.columnFilter
  if (typeof filter === "function") {
    return filter(type, options, [])
  }
  return options
}

// 年份列
const yearColumn = computed(() => {
  return genOptions(minBound.value.y, maxBound.value.y, "year")
})

// 月份列 - 根据当前年份动态计算范围
const monthColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  return genOptions(minM, maxM, "month")
})

// 日期列 - 根据当前年月动态计算范围
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

// 小时列
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

// 分钟列
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

// 秒列
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

// 列映射
const columnMap: Record<DatePickerColumnType, typeof yearColumn> = {
  year: yearColumn,
  month: monthColumn,
  day: dayColumn,
  hour: hourColumn,
  minute: minuteColumn,
  second: secondColumn,
}

// 当前值映射
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

// 设置当前值
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

// picker-view 的列数据
const pickerColumns = computed(() => {
  return props.columns.map((type) => {
    const col = columnMap[type]
    return col ? col.value : []
  })
})

// picker-view 的选中索引
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

// 选项样式（区分选中与未选中）
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

function initFromValue() {
  const parsed = parseDate(props.modelValue)

  // 限制在范围内
  currentYear.value = clamp(parsed.y, minBound.value.y, maxBound.value.y)
  currentMonth.value = clamp(parsed.m, 1, 12)
  currentDay.value = clamp(parsed.d, 1, getDaysInMonth(currentYear.value, currentMonth.value))
  currentHour.value = clamp(parsed.h, 0, 23)
  currentMinute.value = clamp(parsed.mi, 0, 59)
  currentSecond.value = clamp(parsed.s, 0, 59)

  // 再次根据边界调整
  adjustToBounds()
}

/**
 * 调整值到边界范围内
 */
function adjustToBounds() {
  // 年份
  currentYear.value = clamp(currentYear.value, minBound.value.y, maxBound.value.y)

  // 月份
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  currentMonth.value = clamp(currentMonth.value, minM, maxM)

  // 天
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const minD = isMinYear && isMinMonth ? minBound.value.d : 1
  const maxDays = getDaysInMonth(currentYear.value, currentMonth.value)
  const maxD = isMaxYear && isMaxMonth ? Math.min(maxBound.value.d, maxDays) : maxDays
  currentDay.value = clamp(currentDay.value, minD, maxD)

  // 小时
  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const minH = isMinYear && isMinMonth && isMinDay ? minBound.value.h : 0
  const maxH = isMaxYear && isMaxMonth && isMaxDay ? maxBound.value.h : 23
  currentHour.value = clamp(currentHour.value, minH, maxH)

  // 分钟
  const isMinHour = currentHour.value === minBound.value.h
  const isMaxHour = currentHour.value === maxBound.value.h
  const minMi = isMinYear && isMinMonth && isMinDay && isMinHour ? minBound.value.mi : 0
  const maxMi = isMaxYear && isMaxMonth && isMaxDay && isMaxHour ? maxBound.value.mi : 59
  currentMinute.value = clamp(currentMinute.value, minMi, maxMi)

  // 秒
  const isMinMinute = currentMinute.value === minBound.value.mi
  const isMaxMinute = currentMinute.value === maxBound.value.mi
  const minS = isMinYear && isMinMonth && isMinDay && isMinHour && isMinMinute ? minBound.value.s : 0
  const maxS = isMaxYear && isMaxMonth && isMaxDay && isMaxHour && isMaxMinute ? maxBound.value.s : 59
  currentSecond.value = clamp(currentSecond.value, minS, maxS)
}

function handleUpdateShow(show: boolean) {
  emits("update:show", show)
}

/**
 * picker-view 变化处理
 */
interface PickerViewChangeEvent {
  detail: { value: number[] }
}

function onPickerChange(e: PickerViewChangeEvent) {
  const indexes = e.detail.value

  // 根据新索引更新值
  props.columns.forEach((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    const selectedIdx = indexes[colIdx] ?? 0
    const selectedOption = column[selectedIdx]
    if (selectedOption) {
      setCurrentValue(type, Number.parseInt(selectedOption.value))
    }
  })

  // 使用 nextTick 延迟调整边界，避免同步更新冲突
  nextTick(() => {
    adjustToBounds()
    emitChange()
  })
}

/**
 * 获取当前选中的值数组
 */
function getSelectedValues(): string[] {
  return props.columns.map((type) => pad(getCurrentValue(type)))
}

/**
 * 获取格式化后的值
 */
function getFormattedValue(): string {
  return formatDate(currentYear.value, currentMonth.value, currentDay.value, currentHour.value, currentMinute.value, currentSecond.value, props.format)
}

/**
 * 发送 change 事件
 */
function emitChange() {
  emits("change", {
    value: getFormattedValue(),
    selectedValues: getSelectedValues(),
    selectedIndexes: toRaw(pickerIndexes.value),
  })
  emits("update:modelValue", getFormattedValue())
}

function onCancel() {
  emits("cancel", {
    value: getFormattedValue(),
    selectedValues: getSelectedValues(),
    selectedIndexes: toRaw(pickerIndexes.value),
  })
  emits("update:show", false)
}

function onConfirm() {
  emits("confirm", {
    value: getFormattedValue(),
    selectedValues: getSelectedValues(),
    selectedIndexes: toRaw(pickerIndexes.value),
  })
  emits("update:modelValue", getFormattedValue())
  emits("update:show", false)
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  () => {
    initFromValue()
  },
  { immediate: true },
)

// 监听 show 变化，弹窗打开时重新初始化
watch(
  () => props.show,
  (val) => {
    if (val) {
      initFromValue()
    }
  },
)

defineExpose({
  name: "ui-date-picker",
  open: () => emits("update:show", true),
  close: () => emits("update:show", false),
  getSelectedValue: getFormattedValue,
  getSelectedValues,
  getSelectedIndexes: () => toRaw(pickerIndexes.value),
  confirm: onConfirm,
  cancel: onCancel,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-date-picker {
  &__header {
    display: flex;
    padding: 24rpx;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
    justify-content: space-between;

    &__title {
      color: #323233;
      font-size: 32rpx;
      font-weight: bold;
    }
  }

  &__options {
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
