<template>
  <view>
    <!-- 弹层模式 -->
    <ui-popup
      v-if="props.poppable"
      :show="props.show"
      mode="bottom"
      :border-radius="props.borderRadius"
      :close-on-click-overlay="props.closeOnClickOverlay"
      :z-index="props.zIndex"
      :safe-area-inset-bottom="props.safeAreaInsetBottom"
      @update:show="onUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close')"
      @closed="emits('closed')"
      @click-overlay="emits('clickOverlay')"
    >
      <view class="ui-calendar" :style="[calendarStyle]" :class="[props.customClass]">
        <!-- 头部 -->
        <view v-if="props.showTitle || props.closeable" class="ui-calendar__header">
          <view v-if="props.closeable" class="ui-calendar__close" @click="onClose">
            <ui-icon name="cross" size="36rpx" color="#666666" />
          </view>
          <text v-if="props.showTitle" class="ui-calendar__title">{{ props.title }}</text>
          <view v-if="props.closeable" class="ui-calendar__close--placeholder" />
        </view>

        <!-- 副标题（年月切换） -->
        <view v-if="props.showSubtitle" class="ui-calendar__subtitle">
          <view class="ui-calendar__nav" @click="onPrevYear">
            <ui-icon name="arrow-double-left" size="32rpx" :color="colorValue" />
          </view>
          <view class="ui-calendar__nav" @click="onPrevMonth">
            <ui-icon name="arrow-left" size="32rpx" :color="colorValue" />
          </view>
          <text class="ui-calendar__subtitle-text">{{ currentYearMonth }}</text>
          <view class="ui-calendar__nav" @click="onNextMonth">
            <ui-icon name="arrow-right" size="32rpx" :color="colorValue" />
          </view>
          <view class="ui-calendar__nav" @click="onNextYear">
            <ui-icon name="arrow-double-right" size="32rpx" :color="colorValue" />
          </view>
        </view>

        <!-- 星期标题 -->
        <view class="ui-calendar__weekdays">
          <text v-for="week in weeks" :key="week" class="ui-calendar__weekday">{{ week }}</text>
        </view>

        <!-- 日期网格 -->
        <view class="ui-calendar__days">
          <view v-for="(day, index) in formattedDays" :key="index" class="ui-calendar__day" :class="[getDayClass(day)]" :style="[getDayStyle(day)]" @click="onClickDay(day)">
            <!-- 月份背景水印 -->
            <text v-if="props.showMark && day.isCurrentMonth && day.date.getDate() === 15" class="ui-calendar__mark">
              {{ day.date.getMonth() + 1 }}
            </text>

            <!-- 上方信息 -->
            <text v-if="day.topInfo" class="ui-calendar__day-top">{{ day.topInfo }}</text>

            <!-- 日期文字 -->
            <text class="ui-calendar__day-text">{{ day.text }}</text>

            <!-- 下方信息 -->
            <text v-if="day.bottomInfo" class="ui-calendar__day-bottom">{{ day.bottomInfo }}</text>

            <!-- 标记点 -->
            <view v-if="day.hasDot" class="ui-calendar__day-dot" :style="{ backgroundColor: colorValue }" />
          </view>
        </view>

        <!-- 底部操作区 -->
        <view v-if="props.showConfirm" class="ui-calendar__footer">
          <ui-button block :color="colorValue" :disabled="!canConfirm" @click="onConfirm">
            {{ canConfirm ? props.confirmText : props.confirmDisabledText }}
          </ui-button>
        </view>
      </view>
    </ui-popup>

    <!-- 内嵌模式 -->
    <view v-else class="ui-calendar" :style="[calendarStyle]" :class="[props.customClass]">
      <!-- 头部 -->
      <view v-if="props.showTitle" class="ui-calendar__header">
        <text class="ui-calendar__title">{{ props.title }}</text>
      </view>

      <!-- 副标题（年月切换） -->
      <view v-if="props.showSubtitle" class="ui-calendar__subtitle">
        <view class="ui-calendar__nav" @click="onPrevYear">
          <ui-icon name="arrow-double-left" size="32rpx" :color="colorValue" />
        </view>
        <view class="ui-calendar__nav" @click="onPrevMonth">
          <ui-icon name="arrow-left" size="32rpx" :color="colorValue" />
        </view>
        <text class="ui-calendar__subtitle-text">{{ currentYearMonth }}</text>
        <view class="ui-calendar__nav" @click="onNextMonth">
          <ui-icon name="arrow-right" size="32rpx" :color="colorValue" />
        </view>
        <view class="ui-calendar__nav" @click="onNextYear">
          <ui-icon name="arrow-double-right" size="32rpx" :color="colorValue" />
        </view>
      </view>

      <!-- 星期标题 -->
      <view class="ui-calendar__weekdays">
        <text v-for="week in weeks" :key="week" class="ui-calendar__weekday">{{ week }}</text>
      </view>

      <!-- 日期网格 -->
      <view class="ui-calendar__days">
        <view v-for="(day, index) in formattedDays" :key="index" class="ui-calendar__day" :class="[getDayClass(day)]" :style="[getDayStyle(day)]" @click="onClickDay(day)">
          <!-- 月份背景水印 -->
          <text v-if="props.showMark && day.isCurrentMonth && day.date.getDate() === 15" class="ui-calendar__mark">
            {{ day.date.getMonth() + 1 }}
          </text>

          <!-- 上方信息 -->
          <text v-if="day.topInfo" class="ui-calendar__day-top">{{ day.topInfo }}</text>

          <!-- 日期文字 -->
          <text class="ui-calendar__day-text">{{ day.text }}</text>

          <!-- 下方信息 -->
          <text v-if="day.bottomInfo" class="ui-calendar__day-bottom">{{ day.bottomInfo }}</text>

          <!-- 标记点 -->
          <view v-if="day.hasDot" class="ui-calendar__day-dot" :style="{ backgroundColor: colorValue }" />
        </view>
      </view>

      <!-- 底部操作区 -->
      <view v-if="props.showConfirm" class="ui-calendar__footer">
        <ui-button block :color="colorValue" :disabled="!canConfirm" @click="onConfirm">
          {{ canConfirm ? props.confirmText : props.confirmDisabledText }}
        </ui-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { CalendarDay, CalendarMonthChangeData } from "./index"
import type { CalendarMode, CalendarDay as UseCalendarDay } from "../hooks/useCalendar"
import { watch, computed } from "vue"
import { calendarEmits, calendarProps } from "./index"
import { useColor, useStyle, useCalendar } from "../hooks"
import { parseDate, formatDate, getDaysDiff } from "../utils/date"

// 定义组件名称
defineOptions({ name: "ui-calendar" })

// 定义 props 和 emits
const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)
// 解析最小/最大日期
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

// 解析默认日期
const defaultDateValue = computed(() => {
  if (!props.defaultDate) return undefined
  if (props.defaultDate instanceof Date) return props.defaultDate
  if (typeof props.defaultDate === "number") return new Date(props.defaultDate)
  return undefined
})

// 解析多选默认日期
const defaultSelectedDates = computed<string[]>(() => {
  if (props.type !== "multiple" || !Array.isArray(props.defaultDate)) return []
  return (props.defaultDate as (number | Date)[]).map((d) => {
    if (d instanceof Date) return formatDate(d)
    return formatDate(new Date(d))
  })
})

// 解析范围默认日期
const defaultRange = computed(() => {
  if (props.type !== "range" || !Array.isArray(props.defaultDate)) return undefined
  const arr = props.defaultDate as (number | Date)[]
  if (arr.length < 2) return undefined
  return {
    start: arr[0] instanceof Date ? arr[0] : new Date(arr[0]),
    end: arr[1] instanceof Date ? arr[1] : new Date(arr[1]),
  }
})

// 转换选择模式
const calendarMode = computed<CalendarMode>(() => {
  return props.type as CalendarMode
})

// 初始化日历 hook
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

// 监听标记日期变化
watch(
  () => props.markedDates,
  (dates) => {
    updateMarkedDates(dates)
  },
)

// 主题色
const colorValue = computed(() => {
  return useColor(props.color) || "var(--ui-color-primary)"
})

// 日历样式
const calendarStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.color) {
    style["--ui-calendar-color"] = colorValue.value
  }
  return useStyle({ ...style, ...useStyle(props.customStyle) })
})

// 格式化日期数据，应用自定义 formatter
const formattedDays = computed<CalendarDay[]>(() => {
  return days.value.map((day: UseCalendarDay) => {
    // 构建基础日期对象
    const calendarDay: CalendarDay = {
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

    // 应用自定义格式化函数
    if (props.formatter) {
      return props.formatter(calendarDay)
    }

    return calendarDay
  })
})

// 获取日期类型
function getDayType(day: UseCalendarDay): CalendarDay["type"] {
  if (day.disabled) return "disabled"
  if (day.isRangeStart) return "start"
  if (day.isRangeEnd) return "end"
  if (day.inRange) return "middle"
  if (day.selected) return "selected"
  if (day.isToday) return "today"
  return "normal"
}

// 获取默认底部信息
function getDefaultBottomInfo(day: UseCalendarDay): string | undefined {
  if (day.isToday) return "今天"
  if (day.isRangeStart) return "开始"
  if (day.isRangeEnd) return "结束"
  return undefined
}

// 是否可以确认
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

// 获取日期样式类
function getDayClass(day: CalendarDay): string[] {
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

// 获取日期样式
function getDayStyle(day: CalendarDay): CSSProperties {
  const style: CSSProperties = {}

  if ((day.selected || day.isRangeStart || day.isRangeEnd) && colorValue.value) {
    style.backgroundColor = colorValue.value
    style.color = "#ffffff"
  }

  if (day.inRange && colorValue.value) {
    // 使用半透明的主题色作为范围背景
    style.backgroundColor = `color-mix(in srgb, ${colorValue.value} 15%, transparent)`
  }

  return style
}

// 点击日期
function onClickDay(day: CalendarDay) {
  if (props.readonly || day.disabled) return

  // 范围选择模式下检查最大可选天数
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

  // 触发选择事件
  emitSelect()
}

// 触发选择事件
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

// 确认选择
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

  // 弹层模式下关闭弹层
  if (props.poppable) {
    emits("update:show", false)
  }
}

// 上一个月
function onPrevMonth() {
  prevMonth()
  emitMonthChange()
}

// 下一个月
function onNextMonth() {
  nextMonth()
  emitMonthChange()
}

// 上一年
function onPrevYear() {
  prevYear()
  emitMonthChange()
}

// 下一年
function onNextYear() {
  nextYear()
  emitMonthChange()
}

// 触发月份变化事件
function emitMonthChange() {
  const data: CalendarMonthChangeData = {
    year: currentDate.value.getFullYear(),
    month: currentDate.value.getMonth() + 1,
    date: new Date(currentDate.value),
  }
  emits("monthChange", data)
}

// 关闭弹层
function onClose() {
  emits("update:show", false)
}

// 更新显示状态
function onUpdateShow(show: boolean) {
  emits("update:show", show)
}

// 重置选择
function reset() {
  clearSelection()
}

// 跳转到今天
function goToToday() {
  const today = formatDate(new Date())
  currentDate.value = new Date()
  if (props.type === "single") {
    selectDate(today)
  }
}

// 跳转到指定日期
function goToDate(date: Date | string) {
  const targetDate = typeof date === "string" ? parseDate(date) : date
  currentDate.value = targetDate
}

// 暴露方法
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
  name: "ui-calendar",
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
    padding: 24rpx 32rpx;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  &__close {
    left: 32rpx;
    padding: 8rpx;
    position: absolute;

    &--placeholder {
      width: 52rpx;
    }
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 32rpx;
    text-align: center;
    font-weight: 600;
  }

  &__subtitle {
    gap: 16rpx;
    display: flex;
    padding: 16rpx 32rpx;
    align-items: center;
    justify-content: center;
  }

  &__subtitle-text {
    color: var(--ui-color-text);
    font-size: 28rpx;
    min-width: 160rpx;
    text-align: center;
    font-weight: 500;
  }

  &__nav {
    width: 56rpx;
    height: 56rpx;
    display: flex;
    transition: background-color 0.2s;
    align-items: center;
    border-radius: 50%;
    justify-content: center;

    &:active {
      background-color: var(--ui-color-background-secondary);
    }
  }

  &__weekdays {
    display: flex;
    padding: 16rpx 16rpx 8rpx;
  }

  &__weekday {
    flex: 1;
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    text-align: center;
  }

  &__days {
    display: flex;
    padding: 8rpx 16rpx 16rpx;
    position: relative;
    flex-wrap: wrap;
  }

  &__day {
    width: calc(100% / 7);
    cursor: pointer;
    height: var(--ui-calendar-day-size);
    display: flex;
    position: relative;
    transition: all 0.2s;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &--other-month {
      opacity: 0.3;
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    &--today {
      .ui-calendar__day-text {
        color: var(--ui-calendar-color);
        font-weight: 600;
      }
    }

    &--selected {
      .ui-calendar__day-text {
        color: #ffffff;
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
      border-top-left-radius: 8rpx;
      border-bottom-left-radius: 8rpx;

      .ui-calendar__day-text {
        color: #ffffff;
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
      border-top-right-radius: 8rpx;
      border-bottom-right-radius: 8rpx;

      .ui-calendar__day-text {
        color: #ffffff;
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
      opacity: 0.7;
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
    font-weight: bold;
    pointer-events: none;
  }

  &__footer {
    padding: 16rpx 32rpx 24rpx;
  }
}
</style>
