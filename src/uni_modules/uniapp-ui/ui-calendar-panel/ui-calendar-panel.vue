<template>
  <view class="ui-calendar" :style="[calendarStyle]" :class="[props.customClass]">
    <view v-if="props.showTitle || props.closeable" class="ui-calendar__header">
      <view v-if="props.closeable" class="ui-calendar__close" @click="onClose">
        <ui-icon name="cross" size="36rpx" color="#666666" />
      </view>
      <text v-if="props.showTitle" class="ui-calendar__title">{{ props.title }}</text>
      <view v-if="props.closeable" class="ui-calendar__close--placeholder" />
    </view>

    <view v-if="props.showSubtitle" class="ui-calendar__subtitle">
      <view class="ui-calendar__nav" @click="onPrevYear">
        <ui-icon name="arrow-left" size="32rpx" :color="colorValue" />
      </view>
      <view class="ui-calendar__nav" @click="onPrevMonth">
        <ui-icon name="arrow-left" size="32rpx" :color="colorValue" />
      </view>
      <text class="ui-calendar__subtitle-text">{{ currentYearMonth }}</text>
      <view class="ui-calendar__nav" @click="onNextMonth">
        <ui-icon name="arrow" size="32rpx" :color="colorValue" />
      </view>
      <view class="ui-calendar__nav" @click="onNextYear">
        <ui-icon name="arrow" size="32rpx" :color="colorValue" />
      </view>
    </view>

    <view class="ui-calendar__weekdays">
      <text v-for="week in weeks" :key="week" class="ui-calendar__weekday">{{ week }}</text>
    </view>

    <view class="ui-calendar__days">
      <view v-for="(day, index) in formattedDays" :key="index" class="ui-calendar__day" :class="[getDayClass(day)]" :style="[getDayStyle(day)]" @click="onClickDay(day)">
        <text v-if="props.showMark && day.isCurrentMonth && day.date.getDate() === 15" class="ui-calendar__mark">
          {{ day.date.getMonth() + 1 }}
        </text>

        <text v-if="day.topInfo" class="ui-calendar__day-top">{{ day.topInfo }}</text>

        <text class="ui-calendar__day-text">{{ day.text }}</text>

        <text v-if="day.bottomInfo" class="ui-calendar__day-bottom">{{ day.bottomInfo }}</text>

        <view v-if="day.hasDot" class="ui-calendar__day-dot" :style="{ backgroundColor: colorValue }" />
      </view>
    </view>

    <view v-if="props.showConfirm" class="ui-calendar__footer">
      <ui-button block :color="colorValue" :disabled="!canConfirm" @click="onConfirm">
        {{ canConfirm ? props.confirmText : props.confirmDisabledText }}
      </ui-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
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

const minDate = computed(() => {
  if (!props.minDate) return undefined
  if (props.minDate instanceof Date) return props.minDate
  return new Date(props.minDate)
})
const maxDate = computed(() => {
  if (!props.maxDate) return undefined
  if (props.maxDate instanceof Date) return props.maxDate
  return new Date(props.maxDate)
})
const defaultDateValue = computed(() => {
  if (!props.defaultDate) return undefined
  if (props.defaultDate instanceof Date) return props.defaultDate
  if (typeof props.defaultDate === "number") return new Date(props.defaultDate)
  return undefined
})
const defaultSelectedDates = computed<string[]>(() => {
  if (props.type !== "multiple" || !Array.isArray(props.defaultDate)) return []
  return (props.defaultDate as (number | Date)[]).map((d) => {
    if (d instanceof Date) return formatDate(d)
    return formatDate(new Date(d))
  })
})
const defaultRange = computed(() => {
  if (props.type !== "range" || !Array.isArray(props.defaultDate)) return undefined
  const arr = props.defaultDate as (number | Date)[]
  if (arr.length < 2) return undefined
  return {
    start: arr[0] instanceof Date ? arr[0] : new Date(arr[0]),
    end: arr[1] instanceof Date ? arr[1] : new Date(arr[1]),
  }
})
const calendarMode = computed<CalendarMode>(() => {
  return props.type as CalendarMode
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
  mode: calendarMode.value,
  defaultDate: defaultDateValue.value,
  defaultSelectedDates: defaultSelectedDates.value,
  defaultRange: defaultRange.value,
  markedDates: props.markedDates,
  minDate: minDate.value,
  maxDate: maxDate.value,
  firstDayOfWeek: Number(props.firstDayOfWeek),
})

const colorValue = computed(() => {
  return useColor(props.color) || "var(--ui-color-primary)"
})
const calendarStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style["--ui-calendar-color"] = colorValue.value
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})
const formattedDays = computed<CalendarPanelDay[]>(() => {
  return days.value.map((day: UseCalendarDay) => {
    const calendarDay: CalendarPanelDay = {
      date: parseDate(day.fullDate),
      type: getDayType(day),
      text: day.date,
      topInfo: undefined,
      bottomInfo: getDefaultBottomInfo(day),
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
const canConfirm = computed(() => {
  if (props.type === "single") {
    return !!selectedDate.value
  } else if (props.type === "multiple") {
    return selectedDates.value.length > 0
  } else if (props.type === "range") {
    return !!selectedRange.value.start && !!selectedRange.value.end
  }
  return false
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

function getDefaultBottomInfo(day: UseCalendarDay): string | undefined {
  if (day.isToday) return "今天"
  if (day.isRangeStart) return "开始"
  if (day.isRangeEnd) return "结束"
  return undefined
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

function getDayStyle(day: CalendarPanelDay): CSSProperties {
  const style: CSSProperties = {}

  if ((day.selected || day.isRangeStart || day.isRangeEnd) && colorValue.value) {
    style.backgroundColor = colorValue.value
    style.color = "var(--ui-color-text-inverse)"
  }

  if (day.inRange && colorValue.value) {
    style.backgroundColor = `color-mix(in srgb, ${colorValue.value} 15%, transparent)`
  }

  return style
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

function onClose() {
  emits("close")
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
  --ui-calendar-day-size: 80rpx;
  --ui-calendar-day-font-size: 28rpx;

  display: flex;
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
    left: 32rpx;
    padding: var(--ui-spacing-xs);
    position: absolute;

    &--placeholder {
      width: 52rpx;
    }
  }

  &__title {
    font-size: var(--ui-font-size-md);
    text-align: center;
    font-weight: 600;
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
    width: 56rpx;
    height: 56rpx;
    display: flex;
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    border-radius: 50%;
    justify-content: center;

    &:active {
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
    width: calc(100% / 7);
    cursor: pointer;
    height: var(--ui-calendar-day-size);
    display: flex;
    position: relative;
    transition: all var(--ui-transition-fast);
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &--other-month {
      opacity: var(--ui-opacity-medium);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: var(--ui-opacity-medium);
    }

    &--today {
      .ui-calendar__day-text {
        color: var(--ui-calendar-color);
        font-weight: 600;
      }
    }

    &--selected {
      .ui-calendar__day-text {
        color: var(--ui-color-text-inverse);
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: var(--ui-calendar-color);
      }
    }

    &--start {
      border-top-left-radius: var(--ui-radius-sm);
      border-bottom-left-radius: var(--ui-radius-sm);

      .ui-calendar__day-text {
        color: var(--ui-color-text-inverse);
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: var(--ui-calendar-color);
      }
    }

    &--end {
      border-top-right-radius: var(--ui-radius-sm);
      border-bottom-right-radius: var(--ui-radius-sm);

      .ui-calendar__day-text {
        color: var(--ui-color-text-inverse);
        width: 64rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: var(--ui-calendar-color);
      }
    }

    &--middle {
      background-color: rgba(var(--ui-color-primary-rgb), 0.1);
    }

    &:active:not(&--disabled) {
      opacity: var(--ui-opacity-heavy);
    }
  }

  &__day-text {
    color: var(--ui-color-text);
    font-size: var(--ui-calendar-day-font-size);
    line-height: 1;
  }

  &__day-top {
    top: 4rpx;
    color: var(--ui-color-text-secondary);
    position: absolute;
    font-size: 20rpx;
    line-height: 1;
  }

  &__day-bottom {
    color: var(--ui-calendar-color);
    bottom: 4rpx;
    position: absolute;
    font-size: 20rpx;
    line-height: 1;
  }

  &__day-dot {
    width: 8rpx;
    bottom: 8rpx;
    height: 8rpx;
    position: absolute;
    border-radius: 50%;
  }

  &__mark {
    color: rgba(0, 0, 0, 0.03);
    z-index: 0;
    position: absolute;
    font-size: 320rpx;
    font-weight: var(--ui-font-weight-bold);
    pointer-events: none;
  }

  &__footer {
    padding: var(--ui-spacing-sm) var(--ui-spacing-lg) var(--ui-spacing-md);
  }
}
</style>
