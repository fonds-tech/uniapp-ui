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
import type { DatePanelOption, DatePanelColumnType } from "./index"
import { isDef } from "../utils/check"
import { padZero } from "../utils/utils"
import { datePanelEmits, datePanelProps } from "./index"
import { ref, toRaw, watch, computed, nextTick } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-date-panel" })

const props = defineProps(datePanelProps)
const emits = defineEmits(datePanelEmits)

// 存储当前选中的年月日时分秒，初始值为系统当前时间
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const currentDay = ref(new Date().getDate())
const currentHour = ref(new Date().getHours())
const currentMinute = ref(new Date().getMinutes())
const currentSecond = ref(new Date().getSeconds())

/** 最小日期边界，默认当前年份前10年 */
const minBound = computed(() => {
  if (props.minDate) {
    return parseDate(props.minDate)
  }
  const y = new Date().getFullYear() - 10
  return { y, m: 1, d: 1, h: 0, mi: 0, s: 0 }
})

/** 最大日期边界，默认当前年份后10年 */
const maxBound = computed(() => {
  if (props.maxDate) {
    return parseDate(props.maxDate)
  }
  const y = new Date().getFullYear() + 10
  return { y, m: 12, d: 31, h: 23, mi: 59, s: 59 }
})

/** 年份列：根据最小/最大年份边界生成 */
const yearColumn = computed(() => {
  return genOptions(minBound.value.y, maxBound.value.y, "year")
})

/** 月份列：根据当前年份是否在边界年份来动态计算可选月份范围 */
const monthColumn = computed(() => {
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  return genOptions(minM, maxM, "month")
})

/** 日期列：根据当前年月计算当月天数，并结合边界限制 */
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

/** 小时列：根据边界日期时间动态计算可选小时范围 */
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

/** 分钟列：根据边界日期时间动态计算可选分钟范围 */
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

/** 秒列：根据边界日期时间动态计算可选秒范围 */
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
    const currentVal = pad(getCurrentValue(type))
    const index = column.findIndex((item) => item?.value === currentVal)
    return index >= 0 ? index : 0
  })
})

/** 容器自定义样式 */
const style = computed(() => useStyle(props.customStyle))

/** picker-view 容器高度 = 单项高度 × 可见项数量 */
const viewStyle = computed(() => {
  const height = useUnitToPx(props.columnHeight) * +props.visibleColumnNum
  return useStyle({ height: `${height}px` }, "string")
})

/** 选中项指示器高度 */
const indicatorStyle = computed(() => {
  return useStyle({ height: useUnit(props.columnHeight) }, "string")
})

/** 选项基础样式：高度和行高 */
const optionBaseStyle = computed(() => {
  return useStyle({
    height: useUnit(props.columnHeight),
    lineHeight: useUnit(props.columnHeight),
  })
})

/** 判断指定位置的选项是否为当前选中项 */
const isActiveColumn = computed(() => {
  return (columnIndex: number, index: number) => pickerIndexes.value[columnIndex] === index
})

/** 选项动态样式：根据是否选中应用不同的字号、颜色、字重 */
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

/**
 * 数字补零
 * @param n 待补零的数字
 * @returns 补零后的字符串，如 1 -> "01"
 */
function pad(n: number): string {
  return padZero(n)
}

/**
 * 获取指定年月的天数
 * @param year 年份
 * @param month 月份（1-12）
 * @returns 该月天数
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * 格式化日期字符串
 * @param y 年
 * @param m 月
 * @param d 日
 * @param h 时
 * @param mi 分
 * @param s 秒
 * @param format 格式化模板，支持 YYYY/MM/DD/HH/mm/ss
 * @returns 格式化后的日期字符串
 */
function formatDate(y: number, m: number, d: number, h: number, mi: number, s: number, format: string): string {
  return format.replace(/YYYY/g, String(y)).replace(/MM/g, pad(m)).replace(/DD/g, pad(d)).replace(/HH/g, pad(h)).replace(/mm/g, pad(mi)).replace(/ss/g, pad(s))
}

/**
 * 解析日期值为各部分
 * @param value 日期值，支持 Date 对象、时间戳、字符串格式
 * @returns 包含年月日时分秒的对象
 */
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

    // 支持纯时间格式（如 "14:30" 或 "14:30:00"）
    if (parts.length === 2 || parts.length === 3) {
      // 检查是否是纯时间格式（第一个部分是 0-23 的小时数）
      const firstNum = Number.parseInt(parts[0])
      if (firstNum >= 0 && firstNum <= 23) {
        const h = firstNum
        const mi = Number.parseInt(parts[1]) || 0
        const s = parts.length === 3 ? Number.parseInt(parts[2]) || 0 : 0
        return { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate(), h, mi, s }
      }
    }

    // 解析完整日期格式（如 "2024-01-15 10:30:00"）
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

/**
 * 将值限制在指定范围内
 * @param val 待限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的值
 */
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * 生成选项列表
 * @param start 起始值
 * @param end 结束值
 * @param type 列类型
 * @returns 选项数组
 */
function genOptions(start: number, end: number, type: DatePanelColumnType): DatePanelOption[] {
  const safeStart = Math.min(start, end)
  const safeEnd = Math.max(start, end)
  const options: DatePanelOption[] = []

  const defaultFormatter = (_type: string, option: DatePanelOption) => option
  const formatter = props.columnFormatter ?? defaultFormatter
  const selectedValues = getSelectedValues()

  // 获取步进配置
  const step = props.steps?.[type]

  // 根据步进生成值序列
  const values: number[] = []
  if (step && step > 1) {
    // 找到第一个 >= safeStart 且满足步进的值
    const firstValue = Math.ceil(safeStart / step) * step
    for (let i = firstValue; i <= safeEnd; i += step) {
      if (i >= safeStart) {
        values.push(i)
      }
    }
  } else {
    // 无步进配置，生成连续序列
    for (let i = safeStart; i <= safeEnd; i++) {
      values.push(i)
    }
  }

  // 生成选项对象并应用格式化器
  for (const i of values) {
    const text = pad(i)
    const option: DatePanelOption = { text, value: text }
    const formatted = formatter(type, option)
    options.push(formatted ?? option)
  }

  // 应用过滤器
  if (typeof props.columnFilter === "function") {
    return props.columnFilter(type, options, selectedValues)
  }
  return options
}

/**
 * 获取指定类型的当前选中值
 * @param type 列类型
 * @returns 当前选中值
 */
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

/**
 * 设置指定类型的当前选中值
 * @param type 列类型
 * @param val 新值
 */
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

/**
 * 从 modelValue 初始化内部状态
 * 会自动应用步进调整
 */
function initFromValue() {
  const parsed = parseDate(props.modelValue)

  // 使用 adjustToStep 确保初始值符合步进配置
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
 * @param value 原始值
 * @param type 列类型
 * @param min 最小边界
 * @param max 最大边界
 * @returns 调整后的值
 * @example
 * // 步进为 15，值为 17 -> 调整为 15
 * // 步进为 15，值为 23 -> 调整为 30
 */
function adjustToStep(value: number, type: DatePanelColumnType, min: number, max: number): number {
  const step = props.steps?.[type]
  if (!step || step <= 1) return clamp(value, min, max)

  // 找到最近的步进值
  const rounded = Math.round(value / step) * step
  return clamp(rounded, min, max)
}

/**
 * 调整当前选中值到边界范围内
 * 确保选中值始终在 minDate 和 maxDate 之间
 * 同时确保符合步进配置
 */
function adjustToBounds() {
  // 调整年份
  currentYear.value = adjustToStep(currentYear.value, "year", minBound.value.y, maxBound.value.y)

  // 调整月份：根据当前年份确定月份边界
  const isMinYear = currentYear.value === minBound.value.y
  const isMaxYear = currentYear.value === maxBound.value.y
  const minM = isMinYear ? minBound.value.m : 1
  const maxM = isMaxYear ? maxBound.value.m : 12
  currentMonth.value = adjustToStep(currentMonth.value, "month", minM, maxM)

  // 调整日期：根据当前年月确定日期边界
  const isMinMonth = currentMonth.value === minBound.value.m
  const isMaxMonth = currentMonth.value === maxBound.value.m
  const minD = isMinYear && isMinMonth ? minBound.value.d : 1
  const maxDays = getDaysInMonth(currentYear.value, currentMonth.value)
  const maxD = isMaxYear && isMaxMonth ? Math.min(maxBound.value.d, maxDays) : maxDays
  currentDay.value = adjustToStep(currentDay.value, "day", minD, maxD)

  // 调整小时：根据当前日期确定小时边界
  const isMinDay = currentDay.value === minBound.value.d
  const isMaxDay = currentDay.value === maxBound.value.d
  const minH = isMinYear && isMinMonth && isMinDay ? minBound.value.h : 0
  const maxH = isMaxYear && isMaxMonth && isMaxDay ? maxBound.value.h : 23
  currentHour.value = adjustToStep(currentHour.value, "hour", minH, maxH)

  // 调整分钟：根据当前小时确定分钟边界
  const isMinHour = currentHour.value === minBound.value.h
  const isMaxHour = currentHour.value === maxBound.value.h
  const minMi = isMinYear && isMinMonth && isMinDay && isMinHour ? minBound.value.mi : 0
  const maxMi = isMaxYear && isMaxMonth && isMaxDay && isMaxHour ? maxBound.value.mi : 59
  currentMinute.value = adjustToStep(currentMinute.value, "minute", minMi, maxMi)

  // 调整秒：根据当前分钟确定秒边界
  const isMinMinute = currentMinute.value === minBound.value.mi
  const isMaxMinute = currentMinute.value === maxBound.value.mi
  const minS = isMinYear && isMinMonth && isMinDay && isMinHour && isMinMinute ? minBound.value.s : 0
  const maxS = isMaxYear && isMaxMonth && isMaxDay && isMaxHour && isMaxMinute ? maxBound.value.s : 59
  currentSecond.value = adjustToStep(currentSecond.value, "second", minS, maxS)
}

/** picker-view change 事件结构 */
interface PickerViewChangeEvent {
  detail: { value: number[] }
}

/**
 * 处理 picker 滚动选择变化
 * @param event picker-view change 事件对象
 */
function onPickerChange(event: PickerViewChangeEvent) {
  const indexes = event.detail.value

  // 根据选中索引更新各列的当前值
  props.columns.forEach((type, colIdx) => {
    const column = pickerColumns.value[colIdx]
    const selectedIdx = indexes[colIdx] ?? 0
    const selectedOption = column[selectedIdx]
    if (selectedOption) {
      setCurrentValue(type, Number.parseInt(selectedOption.value))
    }
  })

  // 在下一个 tick 中调整边界并触发 change 事件
  nextTick(() => {
    adjustToBounds()
    emitChange()
  })
}

/**
 * 获取所有列的选中值数组
 * @returns 选中值数组，如 ["2024", "06", "15"]
 */
function getSelectedValues(): string[] {
  return props.columns.map((type) => pad(getCurrentValue(type)))
}

/**
 * 获取格式化后的选中值字符串
 * @returns 格式化后的日期字符串
 */
function getFormattedValue(): string {
  return formatDate(currentYear.value, currentMonth.value, currentDay.value, currentHour.value, currentMinute.value, currentSecond.value, props.format)
}

/**
 * 获取选中日期的各部分数值
 * @returns 包含 year/month/day/hour/minute/second 的对象
 */
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

/**
 * 触发 change 事件
 * 向父组件传递完整的选中数据
 */
function emitChange() {
  const value = getFormattedValue()
  const selectedValues = getSelectedValues()
  const selectedIndexes = toRaw(pickerIndexes.value)
  const selectedDateParts = getSelectedDateParts()

  emits("change", { value, selectedValues, selectedIndexes, selectedDateParts })
  emits("update:modelValue", value)
}

/**
 * 手动设置组件值
 * @param value 日期值
 */
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

/** 暴露组件实例方法供外部调用 */
defineExpose({
  name: "ui-date-panel",
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
