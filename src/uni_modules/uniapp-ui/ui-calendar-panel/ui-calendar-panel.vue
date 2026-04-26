<template>
  <view class="ui-calendar" :style="[calendarStyle]" :class="[props.customClass]">
    <view v-if="props.showTitle || props.closeable" class="ui-calendar__header">
      <view v-if="props.closeable" class="ui-calendar__close" @click="emits('close')">
        <ui-icon name="cross" />
      </view>
      <text v-if="props.showTitle" class="ui-calendar__title">{{ props.title }}</text>
      <view v-if="props.closeable" class="ui-calendar__close--placeholder" />
    </view>

    <view v-if="props.showSubtitle" class="ui-calendar__subtitle">
      <view class="ui-calendar__nav" hover-class="ui-calendar__nav--hover" :hover-stay-time="70" @click="onPrevYear">
        <ui-icon name="arrow-left" />
      </view>
      <view class="ui-calendar__nav" hover-class="ui-calendar__nav--hover" :hover-stay-time="70" @click="onPrevMonth">
        <ui-icon name="arrow-left" />
      </view>
      <text class="ui-calendar__subtitle-text">{{ currentYearMonth }}</text>
      <view class="ui-calendar__nav" hover-class="ui-calendar__nav--hover" :hover-stay-time="70" @click="onNextMonth">
        <ui-icon name="arrow" />
      </view>
      <view class="ui-calendar__nav" hover-class="ui-calendar__nav--hover" :hover-stay-time="70" @click="onNextYear">
        <ui-icon name="arrow" />
      </view>
    </view>

    <view class="ui-calendar__weekdays">
      <text v-for="week in weeks" :key="week" class="ui-calendar__weekday">{{ week }}</text>
    </view>

    <view class="ui-calendar__days">
      <text v-if="props.showMark" class="ui-calendar__mark">{{ currentDate.getMonth() + 1 }}</text>
      <view v-for="(day, index) in formattedDays" :key="index" class="ui-calendar__day" :class="[getDayClass(day)]" @click="onClickDay(day)">
        <text class="ui-calendar__day-top">{{ day.topInfo || "" }}</text>
        <text class="ui-calendar__day-text">{{ day.text }}</text>
        <text class="ui-calendar__day-bottom">{{ day.hasDot ? "" : day.bottomInfo || "" }}</text>
        <view v-if="day.hasDot" class="ui-calendar__day-dot" />
      </view>
    </view>

    <view v-if="props.showConfirm" class="ui-calendar__footer">
      <ui-button block :color="props.color" :disabled="!canConfirm" @click="onConfirm">
        {{ canConfirm ? props.confirmText : props.confirmDisabledText }}
      </ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CalendarMode, CalendarDay as UseCalendarDay } from "../hooks/useCalendar"
import type { CalendarPanelDay, CalendarPanelMonthChangeData } from "./index"
import UiIcon from "../ui-icon/ui-icon.vue"
import UiButton from "../ui-button/ui-button.vue"
import { watch, computed } from "vue"
import { useColor, useStyle, useCalendar } from "../hooks"
import { parseDate, formatDate, getDaysDiff } from "../utils/date"
import { calendarPanelEmits, calendarPanelProps } from "./index"

defineOptions({ name: "ui-calendar-panel" })

const props = defineProps(calendarPanelProps)
const emits = defineEmits(calendarPanelEmits)

// 响应式 getter：useCalendar 内部 toValue 实时读取，prop 变化即响应
const calendarMode = (): CalendarMode => props.type as CalendarMode
const minDateRef = (): Date | undefined => (props.minDate instanceof Date ? props.minDate : props.minDate ? new Date(props.minDate) : undefined)
const maxDateRef = (): Date | undefined => (props.maxDate instanceof Date ? props.maxDate : props.maxDate ? new Date(props.maxDate) : undefined)
const firstDayOfWeekRef = () => Number(props.firstDayOfWeek)

// 单选模式的默认日期（仅 Date / 时间戳，数组在多选/范围模式处理）
const defaultDateValue = computed(() => {
  if (!props.defaultDate) return undefined
  if (props.defaultDate instanceof Date) return props.defaultDate
  if (typeof props.defaultDate === "number") return new Date(props.defaultDate)
  return undefined
})
// 多选模式默认数组
const defaultSelectedDates = computed<string[]>(() => {
  if (props.type !== "multiple" || !Array.isArray(props.defaultDate)) return []
  return (props.defaultDate as (number | Date)[]).map((d) => formatDate(d instanceof Date ? d : new Date(d)))
})
// 范围模式默认 [start, end]
const defaultRange = computed(() => {
  if (props.type !== "range" || !Array.isArray(props.defaultDate)) return undefined
  const arr = props.defaultDate as (number | Date)[]
  if (arr.length < 2) return undefined
  return {
    start: arr[0] instanceof Date ? arr[0] : new Date(arr[0]),
    end: arr[1] instanceof Date ? arr[1] : new Date(arr[1]),
  }
})

const {
  weeks,
  days,
  currentDate,
  selectedDate,
  selectedDates,
  selectedRange,
  currentYearMonth,
  prevMonth,
  nextMonth,
  prevYear,
  nextYear,
  selectDate,
  clearSelection,
  updateMarkedDates,
} = useCalendar({
  mode: calendarMode,
  defaultDate: defaultDateValue.value,
  defaultSelectedDates: defaultSelectedDates.value,
  defaultRange: defaultRange.value,
  markedDates: props.markedDates,
  minDate: minDateRef,
  maxDate: maxDateRef,
  firstDayOfWeek: firstDayOfWeekRef,
})

// 是否可点击确认（依赖选择状态）
const canConfirm = computed(() => {
  if (props.type === "single") return !!selectedDate.value
  if (props.type === "multiple") return selectedDates.value.length > 0
  if (props.type === "range") return !!selectedRange.value.start && !!selectedRange.value.end
  return false
})

// 根节点样式：主题色注入 CSS var
const calendarStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {}
  if (props.color) styles["--ui-calendar-color"] = useColor(props.color)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})

const formattedDays = computed<CalendarPanelDay[]>(() => {
  return days.value.map((day: UseCalendarDay) => {
    const calendarDay: CalendarPanelDay = {
      date: parseDate(day.fullDate),
      type: getDayType(day),
      text: day.date,
      topInfo: undefined,
      bottomInfo: undefined,
      className: undefined,
      fullDate: day.fullDate,
      isCurrentMonth: day.isCurrentMonth,
      disabled: day.disabled,
      selected: day.selected,
      isToday: day.isToday,
      isRangeStart: day.isRangeStart,
      isRangeEnd: day.isRangeEnd,
      inRange: day.inRange,
      hasDot: day.hasDot,
    }

    if (props.formatter) {
      return props.formatter(calendarDay)
    }

    return calendarDay
  })
})
watch(
  () => props.markedDates,
  (dates) => {
    updateMarkedDates(dates)
  },
)

function getDayType(day: UseCalendarDay): CalendarPanelDay["type"] {
  if (day.disabled) return "disabled"
  if (day.isRangeStart) return "start"
  if (day.isRangeEnd) return "end"
  if (day.inRange) return "middle"
  if (day.selected) return "selected"
  if (day.isToday) return "today"
  return "normal"
}

function getDayClass(day: CalendarPanelDay): string[] {
  const classes: string[] = []

  if (!day.isCurrentMonth) {
    classes.push("ui-calendar__day--other-month")
  }

  if (day.disabled) {
    classes.push("ui-calendar__day--disabled")
  }

  if (day.selected || day.type === "selected") {
    classes.push("ui-calendar__day--selected")
  }

  if (day.isToday && !day.selected && day.type !== "start" && day.type !== "end") {
    classes.push("ui-calendar__day--today")
  }

  if (day.isRangeStart || day.type === "start") {
    classes.push("ui-calendar__day--start")
  }

  if (day.isRangeEnd || day.type === "end") {
    classes.push("ui-calendar__day--end")
  }

  if (day.inRange || day.type === "middle") {
    classes.push("ui-calendar__day--middle")
  }

  if (day.className) {
    classes.push(day.className)
  }

  return classes
}

function onClickDay(day: CalendarPanelDay) {
  if (props.readonly || day.disabled) return

  if (props.type === "range" && props.maxRange) {
    const range = selectedRange.value
    if (range.start && !range.end) {
      const startDate = parseDate(range.start)
      const diff = Math.abs(getDaysDiff(startDate, day.date))
      if (diff >= props.maxRange) {
        emits("overRange")
        if (props.rangePrompt) {
          uni.showToast({
            title: props.rangePrompt,
            icon: "none",
          })
        }
        return
      }
    }
  }

  selectDate(day.fullDate)

  emitSelect()
}

function emitSelect() {
  if (props.type === "single") {
    if (selectedDate.value) {
      emits("select", {
        date: parseDate(selectedDate.value),
        dateStr: selectedDate.value,
      })
    }
  } else if (props.type === "multiple") {
    emits("select", {
      date: selectedDates.value.map((d) => parseDate(d)),
      dateStr: [...selectedDates.value],
    })
  } else if (props.type === "range") {
    const range = selectedRange.value
    if (range.start) {
      emits("select", {
        date: range.end ? [parseDate(range.start), parseDate(range.end)] : [parseDate(range.start)],
        dateStr: range.end ? [range.start, range.end] : [range.start],
      })
    }
  }
}

function onConfirm() {
  if (!canConfirm.value) return

  if (props.type === "single") {
    emits("confirm", {
      date: parseDate(selectedDate.value),
      dateStr: selectedDate.value,
    })
  } else if (props.type === "multiple") {
    emits("confirm", {
      date: selectedDates.value.map((d) => parseDate(d)),
      dateStr: [...selectedDates.value],
    })
  } else if (props.type === "range") {
    const range = selectedRange.value
    emits("confirm", {
      date: {
        start: parseDate(range.start),
        end: parseDate(range.end),
      },
      dateStr: {
        start: range.start,
        end: range.end,
      },
    })
  }
}

function onPrevMonth() {
  prevMonth()
  emitMonthChange()
}

function onNextMonth() {
  nextMonth()
  emitMonthChange()
}

function onPrevYear() {
  prevYear()
  emitMonthChange()
}

function onNextYear() {
  nextYear()
  emitMonthChange()
}

function emitMonthChange() {
  const data: CalendarPanelMonthChangeData = {
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
    date: new Date(currentDate.value),
  }
  emits("monthChange", data)
}

function reset() {
  clearSelection()
}

function goToToday() {
  const today = formatDate(new Date())
  currentDate.value = new Date()
  if (props.type === "single") {
    selectDate(today)
  }
}

function goToDate(date: Date | string) {
  const targetDate = typeof date === "string" ? parseDate(date) : date
  currentDate.value = targetDate
}

defineExpose({
  reset,
  goToToday,
  goToDate,
  selectDate,
  clearSelection,
})
</script>

<script lang="ts">
export default {
  name: "ui-calendar-panel",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-calendar {
  --ui-calendar-color: var(--ui-color-primary);
  --ui-calendar-day-cell: 56rpx;
  --ui-calendar-day-size: 100rpx;
  --ui-calendar-nav-size: 56rpx;
  --ui-calendar-mark-size: 320rpx;
  --ui-calendar-close-size: 36rpx;
  --ui-calendar-mark-color: rgba(0, 0, 0, 0.03);
  --ui-calendar-color-light: var(--ui-color-primary-light);
  --ui-calendar-day-font-size: var(--ui-font-size-sm);
  --ui-calendar-info-font-size: 20rpx;

  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  background-color: var(--ui-color-background);

  &__header {
    display: flex;
    padding: var(--ui-spacing-md) var(--ui-spacing-lg);
    position: relative;
    align-items: center;
    justify-content: center;
  }

  &__close {
    left: var(--ui-spacing-lg);
    color: var(--ui-color-text-secondary);
    padding: var(--ui-spacing-xs);
    position: absolute;
    font-size: var(--ui-calendar-close-size);

    &--placeholder {
      width: var(--ui-calendar-close-size);
    }
  }

  &__title {
    font-size: var(--ui-font-size-md);
    text-align: center;
    font-weight: var(--ui-font-weight-medium);
  }

  &__subtitle {
    gap: var(--ui-spacing-sm);
    display: flex;
    padding: var(--ui-spacing-sm) var(--ui-spacing-lg);
    align-items: center;
    justify-content: center;
  }

  &__subtitle-text {
    font-size: var(--ui-font-size-sm);
    min-width: 160rpx;
    text-align: center;
    font-weight: var(--ui-font-weight-medium);
  }

  &__nav {
    color: var(--ui-calendar-color);
    width: var(--ui-calendar-nav-size);
    height: var(--ui-calendar-nav-size);
    display: flex;
    font-size: var(--ui-font-size-md);
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    border-radius: 50%;
    justify-content: center;

    &--hover {
      background-color: var(--ui-color-background-hover);
    }
  }

  &__weekdays {
    display: flex;
    padding: var(--ui-spacing-sm) var(--ui-spacing-sm) var(--ui-spacing-xs);
  }

  &__weekday {
    flex: 1;
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    text-align: center;
  }

  &__days {
    display: flex;
    padding: var(--ui-spacing-xs) var(--ui-spacing-sm) var(--ui-spacing-sm);
    position: relative;
    flex-wrap: wrap;
  }

  &__day {
    gap: 2rpx;
    width: calc(100% / 7);
    height: var(--ui-calendar-day-size);
    display: flex;
    position: relative;
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &--other-month {
      opacity: var(--ui-opacity-medium);
    }

    &--disabled {
      opacity: var(--ui-opacity-medium);
    }

    &--today {
      .ui-calendar__day-text {
        color: var(--ui-calendar-color);
        font-weight: var(--ui-font-weight-medium);
      }
    }

    // 选中态 / 范围两端 共享圆形背景（圆形覆盖在 cell 之上）
    &--selected,
    &--start,
    &--end {
      .ui-calendar__day-text {
        color: var(--ui-color-text-inverse);
        width: var(--ui-calendar-day-cell);
        height: var(--ui-calendar-day-cell);
        display: flex;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: var(--ui-calendar-color);
      }
      // bottom-info 在主题色圆形上需反色（避免蓝字蓝底不可见）
      .ui-calendar__day-bottom {
        color: var(--ui-color-text-inverse);
      }
    }

    // range 端点：整 cell 浅底 + 中心圆形深主题色（与 middle 拼成连续 L 型 light 区）
    &--start,
    &--end {
      background-color: var(--ui-calendar-color-light);
    }
    // start 外侧（左）圆角：柔化 L 型起点
    &--start {
      border-top-left-radius: var(--ui-radius-md);
      border-bottom-left-radius: var(--ui-radius-md);
    }
    // end 外侧（右）圆角：柔化 L 型终点
    &--end {
      border-top-right-radius: var(--ui-radius-md);
      border-bottom-right-radius: var(--ui-radius-md);
    }

    // 单天范围（start 与 end 同一天）：仅圆形，不填 cell 浅底
    &--start#{&}--end {
      background-color: transparent;
    }

    &--middle {
      background-color: var(--ui-calendar-color-light);
    }
  }

  &__day-text {
    color: var(--ui-color-text);
    font-size: var(--ui-calendar-day-font-size);
    line-height: 1;
  }

  // 顶部信息（节日/农历）：永远占位，避免 day-text 圆形位置抖动
  &__day-top {
    color: var(--ui-color-text-secondary);
    height: var(--ui-calendar-info-font-size);
    font-size: var(--ui-calendar-info-font-size);
    line-height: 1;
  }

  // 底部信息（开始/结束/自定义）：永远占位
  &__day-bottom {
    color: var(--ui-calendar-color);
    height: var(--ui-calendar-info-font-size);
    font-size: var(--ui-calendar-info-font-size);
    line-height: 1;
  }

  // 标记点（数字下方居中，与 bottom-info 占位区重合）
  &__day-dot {
    left: 50%;
    width: 8rpx;
    bottom: 6rpx;
    height: 8rpx;
    position: absolute;
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: var(--ui-calendar-color);
  }

  // 月份水印（days 容器中央绝对定位；line-height 1 防字符偏上导致视觉偏下）
  &__mark {
    top: 50%;
    left: 50%;
    color: var(--ui-calendar-mark-color);
    z-index: 0;
    position: absolute;
    font-size: var(--ui-calendar-mark-size);
    transform: translate(-50%, -50%);
    font-weight: var(--ui-font-weight-bold);
    line-height: 1;
    pointer-events: none;
  }

  &__footer {
    padding: var(--ui-spacing-sm) var(--ui-spacing-lg) var(--ui-spacing-md);
  }
}
</style>
