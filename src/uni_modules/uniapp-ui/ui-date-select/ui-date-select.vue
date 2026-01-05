<template>
  <view class="ui-date-select" :class="[classs, useProps.customClass]" :style="[style]">
    <!-- 可点击的展示区域 -->
    <view class="ui-date-select__trigger" :hover-class="hoverClass" :hover-stay-time="50" @click="handleClick">
      <view class="ui-date-select__value" :style="[valueStyle]">
        <slot name="display" :text="displayText" :value="currentValue" :placeholder="useProps.placeholder">
          <text v-if="displayText" class="ui-date-select__text" :style="[textStyle]">{{ displayText }}</text>
          <text v-else class="ui-date-select__placeholder" :style="[placeholderStyle]">{{ useProps.placeholder }}</text>
        </slot>
      </view>
      <view v-if="showRightIcon" class="ui-date-select__icon">
        <slot name="right-icon">
          <ui-icon :name="useProps.rightIcon" :size="useProps.rightIconSize" :color="useProps.rightIconColor" :weight="useProps.rightIconWeight" />
        </slot>
      </view>
    </view>

    <!-- DatePicker 弹窗 -->
    <ui-date-picker
      ref="datePickerRef"
      :show="visible"
      :mode="useProps.mode"
      :border-radius="useProps.borderRadius"
      :close-on-click-overlay="useProps.closeOnClickOverlay"
      :overlay="useProps.overlay"
      :duration="useProps.duration"
      :z-index="useProps.zIndex"
      :background="useProps.background"
      :safe-area-inset-bottom="useProps.safeAreaInsetBottom"
      :show-header="useProps.showHeader"
      :title="useProps.title"
      :cancel-text="useProps.cancelText"
      :confirm-text="useProps.confirmText"
      :columns="useProps.columns"
      :min-date="useProps.minDate"
      :max-date="useProps.maxDate"
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
      :model-value="currentValue"
      @update:model-value="handleUpdateValue"
      @update:show="handleUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close', $event)"
      @closed="emits('closed', $event)"
      @change="handleChange"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <template #header>
        <slot name="header" />
      </template>
      <template #title>
        <slot name="title" />
      </template>
      <template #cancel>
        <slot name="cancel" />
      </template>
      <template #confirm>
        <slot name="confirm" />
      </template>
      <template #footer="slotProps">
        <slot name="footer" v-bind="slotProps" />
      </template>
    </ui-date-picker>
  </view>
</template>

<script setup lang="ts">
import type { DatePickerInstance, DatePickerChangeData, DatePickerCancelData, DatePickerConfirmData } from "../ui-date-picker"
import { ref, computed, watch, useSlots } from "vue"
import { formItemKey } from "../ui-form-item"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { dateSelectEmits, dateSelectProps, useDateSelectProps } from "./index"

defineOptions({ name: "ui-date-select" })

const props = defineProps(dateSelectProps)
const emits = defineEmits(dateSelectEmits)
const useProps = useDateSelectProps(props)
const slots = useSlots()

const { parent } = useParent(formItemKey)

const datePickerRef = ref<DatePickerInstance | null>(null)
const currentValue = ref<string>("")
const lastAction = ref<"confirm" | "cancel" | null>(null)
// 内部管理弹窗显示状态
const visible = ref(false)

const isInteractive = computed(() => !useProps.disabled && !useProps.readonly)

const classs = computed(() => {
  const list: string[] = []
  if (useProps.disabled) list.push("ui-date-select--disabled")
  if (useProps.readonly) list.push("ui-date-select--readonly")
  return list
})

const hoverClass = computed(() => {
  return isInteractive.value ? "ui-date-select--active" : ""
})

const style = computed(() => {
  return useStyle(useProps.customStyle)
})

const valueStyle = computed(() => {
  const style: Record<string, string> = {}
  if (useProps.textAlign) {
    style.justifyContent = useProps.textAlign === "left" ? "flex-start" : useProps.textAlign === "right" ? "flex-end" : "center"
  }
  return useStyle(style)
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

const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || useProps.rightIcon)
})

/**
 * 展示文案
 */
const displayText = computed(() => {
  if (!currentValue.value) return ""

  // 如果有自定义格式化函数，使用它
  if (useProps.displayFormatter) {
    return useProps.displayFormatter(currentValue.value)
  }

  // 根据 columns 配置生成默认展示格式
  return formatDisplayText(currentValue.value)
})

/**
 * 根据列配置格式化展示文案
 * @param value 日期值
 * @returns 格式化后的文案
 */
function formatDisplayText(value: string): string {
  if (!value) return ""

  // 解析日期值
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

  // 根据列配置决定显示哪些部分
  const hasYear = columns.includes("year")
  const hasMonth = columns.includes("month")
  const hasDay = columns.includes("day")
  const hasHour = columns.includes("hour")
  const hasMinute = columns.includes("minute")
  const hasSecond = columns.includes("second")

  // 日期部分
  if (hasYear || hasMonth || hasDay) {
    const dateParts: string[] = []
    if (hasYear) dateParts.push(year)
    if (hasMonth) dateParts.push(month)
    if (hasDay) dateParts.push(day)
    textParts.push(dateParts.join("-"))
  }

  // 时间部分
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
 * 解析外部传入的值为字符串格式
 * @param value 外部值
 * @returns 字符串格式日期
 */
function parseValue(value: string | Date | number | undefined): string {
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
 * @param date Date 对象
 * @returns 格式化后的字符串
 */
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")

  // 根据 format 配置返回
  return useProps.format.replace(/YYYY/g, String(year)).replace(/MM/g, month).replace(/DD/g, day).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second)
}

watch(
  () => useProps.modelValue,
  (val) => {
    currentValue.value = parseValue(val)
  },
  { immediate: true },
)

/**
 * 点击展示区
 */
function handleClick() {
  if (!isInteractive.value) return
  emits("click")
  visible.value = true
}

/**
 * 弹窗显示状态变化
 * @param show 是否显示
 */
function handleUpdateShow(show: boolean) {
  visible.value = show
  if (!show) {
    if (lastAction.value === "confirm") {
      lastAction.value = null
      return
    }
    if (lastAction.value === "cancel") {
      lastAction.value = null
      return
    }
    // 触发表单验证
    parent?.onBlur(currentValue.value)
    lastAction.value = null
  }
}

/**
 * 同步内部值
 * @param value 选中日期值
 */
function handleUpdateValue(value: string) {
  currentValue.value = value
  emits("update:modelValue", value)
}

/**
 * 透传 change 事件
 * @param data 变更数据
 */
function handleChange(data: DatePickerChangeData) {
  emits("change", data)
}

/**
 * 取消选择
 * @param data 取消数据
 */
function handleCancel(data: DatePickerCancelData) {
  lastAction.value = "cancel"
  emits("cancel", data)
  // 触发表单验证
  parent?.onBlur(currentValue.value)
}

/**
 * 确认选择
 * @param data 确认数据
 */
function handleConfirm(data: DatePickerConfirmData) {
  lastAction.value = "confirm"
  emits("confirm", data)
  // 触发表单验证
  parent?.onChange(data.value)
}

/**
 * 打开弹窗
 */
function open() {
  if (!isInteractive.value) return
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
  datePickerRef.value?.confirm()
}

/**
 * 取消选择
 */
function cancel() {
  datePickerRef.value?.cancel()
}

/**
 * 获取格式化后的选中值
 */
function getSelectedValue() {
  return datePickerRef.value?.getSelectedValue?.() ?? currentValue.value
}

/**
 * 获取选中值数组
 */
function getSelectedValues() {
  return datePickerRef.value?.getSelectedValues?.() ?? []
}

/**
 * 获取选中索引数组
 */
function getSelectedIndexes() {
  return datePickerRef.value?.getSelectedIndexes?.() ?? []
}

defineExpose({
  name: "ui-date-select",
  open,
  close,
  confirm,
  cancel,
  getSelectedValue,
  getSelectedValues,
  getSelectedIndexes,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-select",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-date-select {
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

    &.ui-date-select--active {
      opacity: 0.85;
    }
  }

  &__value {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;
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
  }
}
</style>
