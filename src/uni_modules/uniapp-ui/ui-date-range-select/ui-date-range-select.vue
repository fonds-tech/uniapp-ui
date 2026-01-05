<template>
  <view class="ui-date-range-select" :class="[classs, useProps.customClass]" :style="[style]">
    <!-- 触发区域 -->
    <view class="ui-date-range-select__trigger" :hover-class="hoverClass" :hover-stay-time="50">
      <!-- 开始日期 -->
      <view class="ui-date-range-select__item ui-date-range-select__start" :class="{ 'is-active': activeType === 'start' && visible }" @click="handleClick('start')">
        <slot name="start" :text="startDisplayText" :value="startValue" :placeholder="useProps.startPlaceholder">
          <text v-if="startDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ startDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ useProps.startPlaceholder }}</text>
        </slot>
      </view>

      <!-- 分隔符 -->
      <view class="ui-date-range-select__separator">
        <slot name="separator">
          <text class="ui-date-range-select__separator-text" :style="[separatorStyle]">{{ useProps.separator }}</text>
        </slot>
      </view>

      <!-- 结束日期 -->
      <view class="ui-date-range-select__item ui-date-range-select__end" :class="{ 'is-active': activeType === 'end' && visible }" @click="handleClick('end')">
        <slot name="end" :text="endDisplayText" :value="endValue" :placeholder="useProps.endPlaceholder">
          <text v-if="endDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ endDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ useProps.endPlaceholder }}</text>
        </slot>
      </view>

      <!-- 右侧图标 -->
      <view v-if="showRightIcon" class="ui-date-range-select__icon">
        <slot name="right-icon">
          <ui-icon :name="useProps.rightIcon" :size="useProps.rightIconSize" :color="useProps.rightIconColor" :weight="useProps.rightIconWeight" />
        </slot>
      </view>
    </view>

    <!-- DatePicker 弹窗 -->
    <ui-popup
      :show="visible"
      :mode="useProps.mode"
      :border-radius="useProps.borderRadius"
      :close-on-click-overlay="useProps.closeOnClickOverlay"
      :overlay="useProps.overlay"
      :duration="useProps.duration"
      :z-index="useProps.zIndex"
      :background="useProps.background"
      :safe-area-inset-bottom="useProps.safeAreaInsetBottom"
      @update:show="handleUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close', $event)"
      @closed="emits('closed', $event)"
    >
      <template #header>
        <slot name="header">
          <view v-if="useProps.showHeader" class="ui-date-range-select__header">
            <view class="ui-date-range-select__header__cancel" @click="handleCancel">
              <slot name="cancel">
                <ui-button text text-color="#969799">{{ useProps.cancelText }}</ui-button>
              </slot>
            </view>

            <!-- Tab 切换 -->
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
                <ui-button text>{{ useProps.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <!-- DatePicker 内容 -->
      <ui-date-picker
        ref="datePickerRef"
        :show="true"
        :show-header="false"
        :columns="useProps.columns"
        :min-date="currentMinDate"
        :max-date="currentMaxDate"
        :format="useProps.format"
        :column-filter="useProps.columnFilter"
        :column-formatter="useProps.columnFormatter"
        :column-height="useProps.columnHeight"
        :visible-column-num="useProps.visibleColumnNum"
        :column-size="useProps.columnSize"
        :column-color="useProps.columnColor"
        :column-weight="useProps.columnWeight"
        :active-column-size="useProps.activeColumnSize"
        :active-column-color="useProps.activeColumnColor"
        :active-column-weight="useProps.activeColumnWeight"
        :model-value="currentPickerValue"
        @change="handlePickerChange"
      />

      <template #footer>
        <slot name="footer" :confirm="handleConfirm" :cancel="handleCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { DatePickerInstance, DatePickerChangeData } from "../ui-date-picker"
import type { DateRangeSelectValue, DateRangeSelectActiveType, DateRangeSelectChangeData, DateRangeSelectConfirmData, DateRangeSelectCancelData } from "./index"
import { ref, computed, watch, useSlots } from "vue"
import { formItemKey } from "../ui-form-item"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { dateRangeSelectEmits, dateRangeSelectProps, useDateRangeSelectProps } from "./index"

defineOptions({ name: "ui-date-range-select" })

const props = defineProps(dateRangeSelectProps)
const emits = defineEmits(dateRangeSelectEmits)
const useProps = useDateRangeSelectProps(props)
const slots = useSlots()

const { parent } = useParent(formItemKey)

const datePickerRef = ref<DatePickerInstance | null>(null)
// 内部状态
const startValue = ref<string>("")
const endValue = ref<string>("")
const activeType = ref<DateRangeSelectActiveType>("start")
const visible = ref(false)
// 临时值（弹窗内编辑时使用）
const tempStartValue = ref<string>("")
const tempEndValue = ref<string>("")

const isInteractive = computed(() => !useProps.disabled && !useProps.readonly)

const classs = computed(() => {
  const list: string[] = []
  if (useProps.disabled) list.push("ui-date-range-select--disabled")
  if (useProps.readonly) list.push("ui-date-range-select--readonly")
  return list
})

const hoverClass = computed(() => {
  return isInteractive.value ? "ui-date-range-select--active" : ""
})

const style = computed(() => {
  return useStyle(useProps.customStyle)
})

const textStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(useProps.textColor)
  style.fontSize = useUnit(useProps.textSize)
  if (useProps.textWeight) style.fontWeight = useProps.textWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(useProps.placeholderColor)
  style.fontSize = useUnit(useProps.textSize)
  if (useProps.textWeight) style.fontWeight = useProps.textWeight
  return useStyle(style)
})

const separatorStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (useProps.separatorColor) {
    style.color = useColor(useProps.separatorColor)
  }
  return useStyle(style)
})

const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || useProps.rightIcon)
})

/**
 * 开始日期展示文案
 */
const startDisplayText = computed(() => {
  if (!startValue.value) return ""
  if (useProps.displayFormatter) {
    return useProps.displayFormatter(startValue.value, "start")
  }
  return formatDisplayText(startValue.value)
})

/**
 * 结束日期展示文案
 */
const endDisplayText = computed(() => {
  if (!endValue.value) return ""
  if (useProps.displayFormatter) {
    return useProps.displayFormatter(endValue.value, "end")
  }
  return formatDisplayText(endValue.value)
})

/**
 * Tab 文案
 */
const startTabText = computed(() => {
  return tempStartValue.value || useProps.startPlaceholder
})

const endTabText = computed(() => {
  return tempEndValue.value || useProps.endPlaceholder
})

/**
 * 当前 Picker 的值
 */
const currentPickerValue = computed(() => {
  return activeType.value === "start" ? tempStartValue.value : tempEndValue.value
})

/**
 * 当前最小日期限制
 * 选择结束日期时，最小日期不能早于开始日期
 */
const currentMinDate = computed(() => {
  if (activeType.value === "end" && tempStartValue.value) {
    // 结束日期不能早于开始日期
    if (useProps.minDate) {
      const minDateStr = parseDateToString(useProps.minDate)
      return tempStartValue.value > minDateStr ? tempStartValue.value : minDateStr
    }
    return tempStartValue.value
  }
  return useProps.minDate
})

/**
 * 当前最大日期限制
 * 选择开始日期时，最大日期不能晚于结束日期
 */
const currentMaxDate = computed(() => {
  if (activeType.value === "start" && tempEndValue.value) {
    // 开始日期不能晚于结束日期
    if (useProps.maxDate) {
      const maxDateStr = parseDateToString(useProps.maxDate)
      return tempEndValue.value < maxDateStr ? tempEndValue.value : maxDateStr
    }
    return tempEndValue.value
  }
  return useProps.maxDate
})

/**
 * 解析日期为字符串格式
 */
function parseDateToString(value: string | Date | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return ""
  }

  if (typeof value === "string") {
    return value
  }

  if (value instanceof Date) {
    return formatDate(value)
  }

  if (typeof value === "number") {
    return formatDate(new Date(value))
  }

  return ""
}

/**
 * 格式化 Date 对象为字符串
 */
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")

  return useProps.format.replace(/YYYY/g, String(year)).replace(/MM/g, month).replace(/DD/g, day).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second)
}

/**
 * 根据列配置格式化展示文案
 */
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

  const columns = useProps.columns
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

/**
 * 解析外部传入的区间值
 */
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
  () => useProps.modelValue,
  (val) => {
    const { start, end } = parseRangeValue(val)
    startValue.value = start
    endValue.value = end
  },
  { immediate: true, deep: true },
)

/**
 * 点击触发区域
 */
function handleClick(type: DateRangeSelectActiveType) {
  if (!isInteractive.value) return
  emits("click", type)
  activeType.value = type
  // 初始化临时值
  tempStartValue.value = startValue.value
  tempEndValue.value = endValue.value
  visible.value = true
}

/**
 * 切换 Tab
 */
function switchTab(type: DateRangeSelectActiveType) {
  activeType.value = type
}

/**
 * 弹窗显示状态变化
 */
function handleUpdateShow(show: boolean) {
  visible.value = show
  if (!show) {
    // 触发表单验证
    const range: DateRangeSelectValue = startValue.value && endValue.value ? [startValue.value, endValue.value] : []
    parent?.onBlur(range)
  }
}

/**
 * Picker 值变化
 */
function handlePickerChange(data: DatePickerChangeData) {
  if (activeType.value === "start") {
    tempStartValue.value = data.value
  } else {
    tempEndValue.value = data.value
  }

  const range: DateRangeSelectValue = tempStartValue.value && tempEndValue.value ? [tempStartValue.value, tempEndValue.value] : []

  const changeData: DateRangeSelectChangeData = {
    type: activeType.value,
    value: data.value,
    range,
    selectedValues: data.selectedValues,
    selectedIndexes: data.selectedIndexes,
  }
  emits("change", changeData)
}

/**
 * 取消选择
 */
function handleCancel() {
  const range: DateRangeSelectValue = startValue.value && endValue.value ? [startValue.value, endValue.value] : []
  const cancelData: DateRangeSelectCancelData = { range }
  emits("cancel", cancelData)
  visible.value = false
  parent?.onBlur(range)
}

/**
 * 确认选择
 */
function handleConfirm() {
  // 保存临时值到正式值
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

  // 触发表单验证
  parent?.onChange(range)
}

/**
 * 打开弹窗
 */
function open(type: DateRangeSelectActiveType = "start") {
  if (!isInteractive.value) return
  activeType.value = type
  tempStartValue.value = startValue.value
  tempEndValue.value = endValue.value
  visible.value = true
}

/**
 * 关闭弹窗
 */
function close() {
  visible.value = false
}

/**
 * 确认选择
 */
function confirm() {
  handleConfirm()
}

/**
 * 取消选择
 */
function cancel() {
  handleCancel()
}

/**
 * 获取当前区间值
 */
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
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 8rpx 0;
    border-radius: 8rpx;
    transition: background-color 0.2s;

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
    color: var(--ui-color-text-main);
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
    margin-left: var(--ui-spacing-md);
    flex-shrink: 0;
  }

  // Header 样式
  &__header {
    display: flex;
    padding: 24rpx;
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
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 32rpx;
  }

  &__tab {
    position: relative;
    padding: 8rpx 24rpx;
    border-radius: 8rpx;
    transition: all 0.2s;

    &.is-active {
      background-color: var(--ui-color-primary-light, rgba(25, 137, 250, 0.1));

      .ui-date-range-select__tab-text {
        color: var(--ui-color-primary);
        font-weight: 600;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 40rpx;
        height: 4rpx;
        background: var(--ui-color-primary);
        border-radius: 2rpx;
        transform: translateX(-50%);
      }
    }

    &-text {
      color: var(--ui-color-text-main);
      font-size: 28rpx;
      transition: color 0.2s;
    }
  }
}
</style>
