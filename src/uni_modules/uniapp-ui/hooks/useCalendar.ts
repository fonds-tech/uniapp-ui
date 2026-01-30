import type { Ref, ComputedRef } from "vue"
import { ref, isRef, unref, computed } from "vue"
import { addDays, addMonths, parseDate, formatDate, isDateInRange, getDaysInMonth, formatYearMonth, getLastDayOfMonth, getFirstDayOfMonth } from "../utils/date"

/**
 * 日历选择模式
 */
export type CalendarMode = "single" | "multiple" | "range"

/**
 * 日历日期项
 */
export interface CalendarDay {
  /** 日期数字(1-31) */
  date: number
  /** 完整日期字符串 "YYYY-MM-DD" */
  fullDate: string
  /** 是否是当前月的日期 */
  isCurrentMonth: boolean
  /** 是否被选中 */
  selected: boolean
  /** 是否有标记点 */
  hasDot: boolean
  /** 是否是今天 */
  isToday: boolean
  /** 是否禁用 */
  disabled: boolean
  /** ISO 星期几(0-6, 周日为0) */
  weekday: number
  /** 是否是范围选择的起始日期 */
  isRangeStart: boolean
  /** 是否是范围选择的结束日期 */
  isRangeEnd: boolean
  /** 是否在选中的范围内 */
  inRange: boolean
}

/**
 * useCalendar 选项
 */
export interface UseCalendarOptions {
  /** 选择模式,默认 "single" */
  mode?: CalendarMode
  /** 初始选中日期,默认为当前日期 (single 模式) */
  defaultDate?: string | Date
  /** 初始选中的多个日期 (multiple 模式) */
  defaultSelectedDates?: string[]
  /** 初始选中的日期范围 (range 模式) */
  defaultRange?: { start?: string | Date; end?: string | Date }
  /** 需要标记的日期数组,支持响应式 */
  markedDates?: Ref<string[]> | string[]
  /** 日期范围限制 - 最小日期 */
  minDate?: Date
  /** 日期范围限制 - 最大日期 */
  maxDate?: Date
  /** 自定义禁用日期的函数 */
  disabledDate?: (date: Date) => boolean
  /** 一周的第一天,0-6 (0=周日, 1=周一, ..., 6=周六),默认 0 */
  firstDayOfWeek?: number
}

export interface UseCalendarReturn {
  /** 周标题数组 */
  weeks: Ref<string[]>
  /** 当前月的日期数组(含上下月补充) */
  days: ComputedRef<CalendarDay[]>
  /** 当前显示的年月 */
  currentDate: Ref<Date>
  /** 选中的日期 (single 模式) */
  selectedDate: Ref<string>
  /** 选中的多个日期 (multiple 模式) */
  selectedDates: Ref<string[]>
  /** 选中的日期范围 (range 模式) */
  selectedRange: Ref<{ start: string; end: string }>
  /** 格式化的年月文本 "2025年11月" */
  currentYearMonth: ComputedRef<string>
  /** 当前年份 */
  currentYear: ComputedRef<number>
  /** 当前月份(1-12) */
  currentMonth: ComputedRef<number>
  /** 切换到上个月 */
  prevMonth: () => void
  /** 切换到下个月 */
  nextMonth: () => void
  /** 切换到上一年 */
  prevYear: () => void
  /** 切换到下一年 */
  nextYear: () => void
  /** 跳转到今天 */
  goToToday: () => void
  /** 跳转到指定日期 */
  goToDate: (date: string | Date) => void
  /** 跳转到指定年月 */
  goToYearMonth: (year: number, month: number) => void
  /** 选中日期 */
  selectDate: (date: string) => void
  /** 清空选择 */
  clearSelection: () => void
  /** 获取选中的日期范围(仅 range 模式) */
  getSelectedRange: () => { start: string; end: string } | null
  /** 判断日期是否选中 */
  isSelected: (date: string) => boolean
  /** 判断日期是否被标记 */
  isMarked: (date: string) => boolean
  /** 判断是否是今天 */
  isToday: (date: string) => boolean
  /** 判断日期是否禁用 */
  isDisabled: (date: string) => boolean
  /** 更新标记日期 */
  updateMarkedDates: (dates: string[]) => void
}

/** 周标题数组 */
const WEEKS = ["日", "一", "二", "三", "四", "五", "六"]

/**
 * 根据 firstDayOfWeek 调整周标题数组
 */
function getAdjustedWeeks(firstDayOfWeek: number): string[] {
  const weeks = [...WEEKS]
  if (firstDayOfWeek > 0 && firstDayOfWeek < 7) {
    const before = weeks.splice(0, firstDayOfWeek)
    return [...weeks, ...before]
  }
  return weeks
}

/**
 * 日历组合式函数
 */
export function useCalendar(options: UseCalendarOptions = {}): UseCalendarReturn {
  const { mode = "single", defaultDate, defaultSelectedDates = [], defaultRange, markedDates = [], minDate, maxDate, disabledDate, firstDayOfWeek = 0 } = options

  const weeks = ref<string[]>(getAdjustedWeeks(firstDayOfWeek))
  const currentDate = ref<Date>(parseDate(defaultDate))

  // 单选模式
  const selectedDate = ref<string>(formatDate(parseDate(defaultDate)))

  // 多选模式
  const selectedDates = ref<string[]>(defaultSelectedDates)

  // 范围选择模式
  const selectedRange = ref<{ start: string; end: string }>({
    start: defaultRange?.start ? formatDate(parseDate(defaultRange.start)) : "",
    end: defaultRange?.end ? formatDate(parseDate(defaultRange.end)) : "",
  })

  // 标记日期 - 改为响应式状态以支持动态更新
  const markedDatesValue = ref<string[]>(isRef(markedDates) ? unref(markedDates) : markedDates)

  const today = computed(() => formatDate(new Date()))

  const currentYearMonth = computed(() => formatYearMonth(currentDate.value))
  const currentYear = computed(() => currentDate.value.getFullYear())
  const currentMonth = computed(() => currentDate.value.getMonth() + 1)

  /**
   * 检查日期是否被禁用
   */
  function checkDisabled(dateObj: Date): boolean {
    // 首先检查范围限制
    if (!isDateInRange(dateObj, minDate, maxDate)) {
      return true
    }
    // 然后检查自定义禁用函数
    if (disabledDate && disabledDate(dateObj)) {
      return true
    }
    return false
  }

  /**
   * 检查日期是否在范围选择的区间内
   */
  function checkInRange(dateStr: string): boolean {
    if (mode !== "range" || !selectedRange.value.start || !selectedRange.value.end) {
      return false
    }
    const { start, end } = selectedRange.value
    return dateStr > start && dateStr < end
  }

  /**
   * 生成日历日期数组
   */
  const days = computed<CalendarDay[]>(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()
    const firstDay = getFirstDayOfMonth(currentDate.value)
    const lastDay = getLastDayOfMonth(currentDate.value)
    const daysInMonth = getDaysInMonth(currentDate.value)

    // 计算该月第一天是星期几,并根据 firstDayOfWeek 调整
    const startWeekday = (firstDay.getDay() - firstDayOfWeek + 7) % 7

    const result: CalendarDay[] = []

    // 上个月的日期
    const prevMonthLastDay = addDays(firstDay, -1)
    const prevMonthDays = prevMonthLastDay.getDate()

    for (let i = startWeekday - 1; i >= 0; i--) {
      const date = prevMonthDays - i
      const dateObj = addDays(firstDay, -(i + 1))
      const fullDate = formatDate(dateObj)

      result.push({
        date,
        fullDate,
        isCurrentMonth: false,
        selected: mode === "single" ? fullDate === selectedDate.value : selectedDates.value.includes(fullDate),
        hasDot: markedDatesValue.value.includes(fullDate),
        isToday: fullDate === today.value,
        disabled: checkDisabled(dateObj),
        weekday: dateObj.getDay(),
        isRangeStart: mode === "range" && fullDate === selectedRange.value.start,
        isRangeEnd: mode === "range" && fullDate === selectedRange.value.end,
        inRange: checkInRange(fullDate),
      })
    }

    // 本月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month, i)
      const fullDate = formatDate(dateObj)

      result.push({
        date: i,
        fullDate,
        isCurrentMonth: true,
        selected: mode === "single" ? fullDate === selectedDate.value : selectedDates.value.includes(fullDate),
        hasDot: markedDatesValue.value.includes(fullDate),
        isToday: fullDate === today.value,
        disabled: checkDisabled(dateObj),
        weekday: dateObj.getDay(),
        isRangeStart: mode === "range" && fullDate === selectedRange.value.start,
        isRangeEnd: mode === "range" && fullDate === selectedRange.value.end,
        inRange: checkInRange(fullDate),
      })
    }

    // 下个月的日期 - 动态计算需要补充多少天
    // 确保总天数是7的倍数,且至少为35天(5行),最多42天(6行)
    const currentTotal = result.length
    let targetDays = Math.ceil(currentTotal / 7) * 7 // 补充到完整的行
    if (targetDays < 35) {
      targetDays = 35 // 至少5行
    }
    const remainingDays = targetDays - currentTotal

    for (let i = 1; i <= remainingDays; i++) {
      const dateObj = addDays(lastDay, i)
      const fullDate = formatDate(dateObj)

      result.push({
        date: i,
        fullDate,
        isCurrentMonth: false,
        selected: mode === "single" ? fullDate === selectedDate.value : selectedDates.value.includes(fullDate),
        hasDot: markedDatesValue.value.includes(fullDate),
        isToday: fullDate === today.value,
        disabled: checkDisabled(dateObj),
        weekday: dateObj.getDay(),
        isRangeStart: mode === "range" && fullDate === selectedRange.value.start,
        isRangeEnd: mode === "range" && fullDate === selectedRange.value.end,
        inRange: checkInRange(fullDate),
      })
    }

    return result
  })

  function prevMonth() {
    currentDate.value = addMonths(currentDate.value, -1)
  }

  function nextMonth() {
    currentDate.value = addMonths(currentDate.value, 1)
  }

  function prevYear() {
    currentDate.value = addMonths(currentDate.value, -12)
  }

  function nextYear() {
    currentDate.value = addMonths(currentDate.value, 12)
  }

  function goToToday() {
    currentDate.value = new Date()
    if (mode === "single") {
      selectedDate.value = today.value
    }
  }

  function goToDate(date: string | Date) {
    currentDate.value = parseDate(date)
  }

  function goToYearMonth(year: number, month: number) {
    currentDate.value = new Date(year, month - 1, 1)
  }

  function selectDate(date: string) {
    const dateObj = parseDate(date)

    // 验证日期是否可选
    if (checkDisabled(dateObj)) {
      return
    }

    if (mode === "single") {
      selectedDate.value = date
    } else if (mode === "multiple") {
      const index = selectedDates.value.indexOf(date)
      if (index > -1) {
        selectedDates.value.splice(index, 1)
      } else {
        selectedDates.value.push(date)
      }
    } else if (mode === "range") {
      if (!selectedRange.value.start || (selectedRange.value.start && selectedRange.value.end)) {
        // 如果没有起始日期,或者已经完成一次选择,则重新开始
        selectedRange.value = { start: date, end: "" }
      } else {
        // 如果已有起始日期,设置结束日期
        if (date < selectedRange.value.start) {
          // 如果选择的日期早于起始日期,交换位置
          selectedRange.value = { start: date, end: selectedRange.value.start }
        } else {
          selectedRange.value.end = date
        }
      }
    }
  }

  function clearSelection() {
    if (mode === "single") {
      selectedDate.value = ""
    } else if (mode === "multiple") {
      selectedDates.value = []
    } else if (mode === "range") {
      selectedRange.value = { start: "", end: "" }
    }
  }

  function getSelectedRange(): { start: string; end: string } | null {
    if (mode !== "range") {
      return null
    }
    if (selectedRange.value.start && selectedRange.value.end) {
      return { ...selectedRange.value }
    }
    return null
  }

  function isSelected(date: string): boolean {
    if (mode === "single") {
      return selectedDate.value === date
    } else if (mode === "multiple") {
      return selectedDates.value.includes(date)
    } else if (mode === "range") {
      return date === selectedRange.value.start || date === selectedRange.value.end
    }
    return false
  }

  function isMarked(date: string): boolean {
    return markedDatesValue.value.includes(date)
  }

  function isToday(date: string): boolean {
    return date === today.value
  }

  function isDisabled(date: string): boolean {
    return checkDisabled(parseDate(date))
  }

  /**
   * 更新标记日期
   * @param dates - 新的标记日期数组
   */
  function updateMarkedDates(dates: string[]) {
    markedDatesValue.value = dates
  }

  return {
    weeks,
    days,
    currentDate,
    selectedDate,
    selectedDates,
    selectedRange,
    currentYearMonth,
    currentYear,
    currentMonth,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    goToToday,
    goToDate,
    goToYearMonth,
    selectDate,
    clearSelection,
    getSelectedRange,
    isSelected,
    isMarked,
    isToday,
    isDisabled,
    updateMarkedDates,
  }
}
