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
          :style="[optionBaseStyle, columnStyle(colIdx, itemIdx)]"
        >
          {{ item?.text ?? "" }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
/**
 * @ui-date-panel 日期时间选择面板组件
 * @description 基于 picker-view 实现的日期时间选择器，支持年月日时分秒的自由组合选择
 * @features
 * - 支持自定义列组合（年/月/日/时/分/秒）
 * - 支持日期范围限制（minDate/maxDate）
 * - 支持步进间隔（如15分钟、季度选择）
 * - 支持自定义选项格式化和过滤
 * - 支持自定义样式（颜色、字号、字重）
 */
import type { Ref } from "vue"
import type { DatePanelOption, DatePanelColumnType } from "./index"
import { isDef } from "../utils/check"
import { padZero } from "../utils/utils"
import { datePanelEmits, datePanelProps } from "./index"
import { ref, toRaw, watch, computed, nextTick } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-date-panel" })

const props = defineProps(datePanelProps)
const emits = defineEmits(datePanelEmits)

// 当前选中的年月日时分秒（初始值取系统当前时间）
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const currentDay = ref(new Date().getDate())
const currentHour = ref(new Date().getHours())
const currentMinute = ref(new Date().getMinutes())
const currentSecond = ref(new Date().getSeconds())

// 列类型 → 当前值 ref 表，统一索引取/设替代 switch
const currentRefs: Record<DatePanelColumnType, Ref<number>> = {
  year: currentYear,
  month: currentMonth,
  day: currentDay,
  hour: currentHour,
  minute: currentMinute,
  second: currentSecond,
}

/** 最小日期边界，默认当前年份前 10 年 */
const minBound = computed(() => {
  if (props.minDate) {
    return parseDate(props.minDate)
  }
  const y = new Date().getFullYear() - 10
  return { y, m: 1, d: 1, h: 0, mi: 0, s: 0 }
})

/** 最大日期边界，默认当前年份后 10 年 */
const maxBound = computed(() => {
  if (props.maxDate) {
    return parseDate(props.maxDate)
  }
  const y = new Date().getFullYear() + 10
  return { y, m: 12, d: 31, h: 23, mi: 59, s: 59 }
})

/**
 * 计算指定列的 min/max 边界
 * 链式依赖：低位列的边界仅在高位列均处于边界时才收紧（如 day 仅在 year+month 同时位于边界时才取 minBound.d/maxBound.d）
 */
function getColumnBounds(type: DatePanelColumnType): { min: number; max: number } {
  const lo = minBound.value
  const hi = maxBound.value

  if (type === "year") return { min: lo.y, max: hi.y }

  const isMinY = currentYear.value === lo.y
  const isMaxY = currentYear.value === hi.y

  if (type === "month") {
    return { min: isMinY ? lo.m : 1, max: isMaxY ? hi.m : 12 }
  }

  const isMinM = currentMonth.value === lo.m
  const isMaxM = currentMonth.value === hi.m

  if (type === "day") {
    const maxDays = getDaysInMonth(currentYear.value, currentMonth.value)
    return {
      min: isMinY && isMinM ? lo.d : 1,
      max: isMaxY && isMaxM ? Math.min(hi.d, maxDays) : maxDays,
    }
  }

  const isMinD = currentDay.value === lo.d
  const isMaxD = currentDay.value === hi.d

  if (type === "hour") {
    return {
      min: isMinY && isMinM && isMinD ? lo.h : 0,
      max: isMaxY && isMaxM && isMaxD ? hi.h : 23,
    }
  }

  const isMinH = currentHour.value === lo.h
  const isMaxH = currentHour.value === hi.h

  if (type === "minute") {
    return {
      min: isMinY && isMinM && isMinD && isMinH ? lo.mi : 0,
      max: isMaxY && isMaxM && isMaxD && isMaxH ? hi.mi : 59,
    }
  }

  const isMinMi = currentMinute.value === lo.mi
  const isMaxMi = currentMinute.value === hi.mi

  return {
    min: isMinY && isMinM && isMinD && isMinH && isMinMi ? lo.s : 0,
    max: isMaxY && isMaxM && isMaxD && isMaxH && isMaxMi ? hi.s : 59,
  }
}

/** 各列选项 */
const yearColumn = computed(() => {
  const { min, max } = getColumnBounds("year")
  return genOptions(min, max, "year")
})
const monthColumn = computed(() => {
  const { min, max } = getColumnBounds("month")
  return genOptions(min, max, "month")
})
const dayColumn = computed(() => {
  const { min, max } = getColumnBounds("day")
  return genOptions(min, max, "day")
})
const hourColumn = computed(() => {
  const { min, max } = getColumnBounds("hour")
  return genOptions(min, max, "hour")
})
const minuteColumn = computed(() => {
  const { min, max } = getColumnBounds("minute")
  return genOptions(min, max, "minute")
})
const secondColumn = computed(() => {
  const { min, max } = getColumnBounds("second")
  return genOptions(min, max, "second")
})

/** 列类型到列数据的映射表 */
const columnMap: Record<DatePanelColumnType, typeof yearColumn> = {
  year: yearColumn,
  month: monthColumn,
  day: dayColumn,
  hour: hourColumn,
  minute: minuteColumn,
  second: secondColumn,
}

/** 根据 columns 配置获取对应的列数据 */
const pickerColumns = computed(() => {
  return props.columns.map((type) => {
    const column = columnMap[type]
    return column ? column.value : []
  })
})

/** 计算每列当前选中项的索引 */
const pickerIndexes = computed(() => {
  return props.columns.map((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    if (!column || column.length === 0) return 0
    const currentVal = pad(currentRefs[type].value)
    const index = column.findIndex((item) => item?.value === currentVal)
    return index >= 0 ? index : 0
  })
})

/** 容器自定义样式 */
const style = computed(() => useStyle(props.customStyle))

/** 单项高度（px），全组件用同一单位避免 rpx/px 转换误差导致行不对齐 */
const itemHeightPx = computed(() => useUnitToPx(props.columnHeight))

/** picker-view 容器高度 = 单项高度 × 可见项数量 */
const viewStyle = computed(() => {
  return useStyle({ height: `${itemHeightPx.value * +props.visibleColumnNum}px` }, "string")
})

/** 选中项指示器高度（picker-view indicator-style 要求字符串） */
const indicatorStyle = computed(() => {
  return useStyle({ height: `${itemHeightPx.value}px` }, "string")
})

/** 选项基础样式：高度和行高（与 indicator 同 px 值，确保选中项与指示框严格对齐） */
const optionBaseStyle = computed(() => {
  return useStyle({
    height: `${itemHeightPx.value}px`,
    lineHeight: `${itemHeightPx.value}px`,
  })
})

/** 判断指定位置的选项是否为当前选中项 */
function isActiveColumn(columnIndex: number, index: number): boolean {
  return pickerIndexes.value[columnIndex] === index
}

/** 选项动态样式：根据是否选中应用不同的字号、颜色、字重 */
function columnStyle(columnIndex: number, index: number) {
  const isActive = isActiveColumn(columnIndex, index)
  return useStyle({
    fontSize: useUnit(isActive ? props.activeColumnSize : props.columnSize),
    color: isActive ? useColor(props.activeColumnColor) : useColor(props.columnColor),
    fontWeight: isActive ? props.activeColumnWeight : props.columnWeight,
  })
}

/** 监听 modelValue 变化，初始化或更新内部状态 */
watch(
  () => props.modelValue,
  () => {
    initFromValue()
  },
  { immediate: true },
)

/** 监听边界和配置变化，重新调整选中值 */
watch(
  () => [props.minDate, props.maxDate, props.columns, props.steps],
  () => {
    adjustToBounds()
  },
  { deep: true },
)

/** 数字补零 */
function pad(n: number): string {
  return padZero(n)
}

/** 获取指定年月的天数 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/** 格式化日期字符串 */
function formatDate(y: number, m: number, d: number, h: number, mi: number, s: number, format: string): string {
  return format.replace(/YYYY/g, String(y)).replace(/MM/g, pad(m)).replace(/DD/g, pad(d)).replace(/HH/g, pad(h)).replace(/mm/g, pad(mi)).replace(/ss/g, pad(s))
}

/** 解析日期值为各部分 */
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

    // 纯时间格式（如 "14:30" 或 "14:30:00"）
    if (parts.length === 2 || parts.length === 3) {
      const firstNum = Number.parseInt(parts[0], 10)
      if (firstNum >= 0 && firstNum <= 23) {
        const h = firstNum
        const mi = Number.parseInt(parts[1], 10) || 0
        const s = parts.length === 3 ? Number.parseInt(parts[2], 10) || 0 : 0
        return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate(), h, mi, s }
      }
    }

    // 完整日期格式（如 "2024-01-15 10:30:00"）
    if (parts.length >= 3) {
      const y = Number.parseInt(parts[0], 10) || now.getFullYear()
      const m = Number.parseInt(parts[1], 10) || 1
      const d = Number.parseInt(parts[2], 10) || 1
      const h = Number.parseInt(parts[3], 10) || 0
      const mi = Number.parseInt(parts[4], 10) || 0
      const s = Number.parseInt(parts[5], 10) || 0
      return { y, m, d, h, mi, s }
    }
    date = new Date(value)
    if (Number.isNaN(date.getTime())) date = now
  }

  return { y: date.getFullYear(), m: date.getMonth() + 1, d: date.getDate(), h: date.getHours(), mi: date.getMinutes(), s: date.getSeconds() }
}

/** 将值限制在指定范围内 */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/** 生成选项列表 */
function genOptions(start: number, end: number, type: DatePanelColumnType): DatePanelOption[] {
  const safeStart = Math.min(start, end)
  const safeEnd = Math.max(start, end)
  const options: DatePanelOption[] = []
  const formatter = props.columnFormatter
  const step = props.steps?.[type]

  // 生成值序列（含步进配置）
  const values: number[] = []
  if (step && step > 1) {
    const firstValue = Math.ceil(safeStart / step) * step
    for (let i = firstValue; i <= safeEnd; i += step) {
      if (i >= safeStart) values.push(i)
    }
  } else {
    for (let i = safeStart; i <= safeEnd; i++) values.push(i)
  }

  // 生成 option 对象并应用格式化器
  for (const i of values) {
    const text = pad(i)
    const option: DatePanelOption = { text, value: text }
    const formatted = formatter(type, option)
    options.push(formatted ?? option)
  }

  // 仅在 columnFilter 存在时调用 getSelectedValues（避免无谓计算）
  if (typeof props.columnFilter === "function") {
    return props.columnFilter(type, options, getSelectedValues())
  }
  return options
}

/** 从 modelValue 初始化内部状态（含步进调整） */
function initFromValue() {
  const parsed = parseDate(props.modelValue)
  currentYear.value = adjustToStep(parsed.y, "year", minBound.value.y, maxBound.value.y)
  currentMonth.value = adjustToStep(parsed.m, "month", 1, 12)
  currentDay.value = adjustToStep(parsed.d, "day", 1, getDaysInMonth(currentYear.value, currentMonth.value))
  currentHour.value = adjustToStep(parsed.h, "hour", 0, 23)
  currentMinute.value = adjustToStep(parsed.mi, "minute", 0, 59)
  currentSecond.value = adjustToStep(parsed.s, "second", 0, 59)
  adjustToBounds()
}

/**
 * 将值调整到最近的合法步进值
 * @example step=15, value=17 → 15；value=23 → 30
 */
function adjustToStep(value: number, type: DatePanelColumnType, min: number, max: number): number {
  const step = props.steps?.[type]
  if (!step || step <= 1) return clamp(value, min, max)
  const rounded = Math.round(value / step) * step
  return clamp(rounded, min, max)
}

/**
 * 调整当前选中值到边界范围内（确保位于 min/max 之间且符合步进）
 * 顺序：year → month → day → hour → minute → second，每步依赖上一步的结果
 */
function adjustToBounds() {
  const types: DatePanelColumnType[] = ["year", "month", "day", "hour", "minute", "second"]
  for (const type of types) {
    const { min, max } = getColumnBounds(type)
    currentRefs[type].value = adjustToStep(currentRefs[type].value, type, min, max)
  }
}

/** picker-view change 事件结构 */
interface PickerViewChangeEvent {
  detail: { value: number[] }
}

/** 处理 picker 滚动选择变化 */
function onPickerChange(event: PickerViewChangeEvent) {
  const indexes = event.detail.value

  props.columns.forEach((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    const selectedIdx = indexes[colIdx] ?? 0
    const selectedOption = column[selectedIdx]
    if (selectedOption) {
      currentRefs[type].value = Number.parseInt(selectedOption.value, 10)
    }
  })

  nextTick(() => {
    adjustToBounds()
    emitChange()
  })
}

/** 获取所有列的选中值数组 */
function getSelectedValues(): string[] {
  return props.columns.map((type) => pad(currentRefs[type].value))
}

/** 获取格式化后的选中值字符串 */
function getFormattedValue(): string {
  return formatDate(currentYear.value, currentMonth.value, currentDay.value, currentHour.value, currentMinute.value, currentSecond.value, props.format)
}

/** 获取选中日期的各部分数值 */
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

/** 触发 change 事件 */
function emitChange() {
  const value = getFormattedValue()
  const selectedValues = getSelectedValues()
  const selectedIndexes = toRaw(pickerIndexes.value)
  const selectedDateParts = getSelectedDateParts()

  emits("change", { value, selectedValues, selectedIndexes, selectedDateParts })
  emits("update:modelValue", value)
}

/** 手动设置组件值 */
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
  /** 获取格式化后的选中值 */
  getSelectedValue: getFormattedValue,
  /** 获取所有列的选中值数组 */
  getSelectedValues,
  /** 获取所有列的选中索引数组 */
  getSelectedIndexes: () => toRaw(pickerIndexes.value),
  /** 获取选中日期的各部分数值 */
  getSelectedDateParts,
  /** 手动设置组件值 */
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
    overflow: hidden;
    font-size: var(--ui-font-size-sm);
    box-sizing: border-box;
    transition:
      font-size 0.15s ease,
      color 0.15s ease,
      font-weight 0.15s ease;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
  }
}
</style>
