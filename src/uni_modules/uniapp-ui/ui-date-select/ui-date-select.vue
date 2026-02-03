<template>
  <view class="ui-date-select" :class="[classs, props.customClass]" :style="[style]">
    <view class="ui-date-select__trigger" :hover-class="hoverClass" :hover-stay-time="50" @click="handleClick">
      <view class="ui-date-select__value" :style="[valueStyle]">
        <slot name="display" :text="displayText" :value="currentValue" :placeholder="props.placeholder">
          <text v-if="displayText" class="ui-date-select__text" :style="[textStyle]">{{ displayText }}</text>
          <text v-else class="ui-date-select__placeholder" :style="[placeholderStyle]">{{ props.placeholder }}</text>
        </slot>
      </view>
      <view v-if="showRightIcon" class="ui-date-select__icon">
        <slot name="right-icon">
          <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
        </slot>
      </view>
    </view>

    <ui-date-picker
      ref="datePickerRef"
      :show="visible"
      :mode="props.mode"
      :border-radius="props.borderRadius"
      :close-on-click-overlay="props.closeOnClickOverlay"
      :overlay="props.overlay"
      :duration="props.duration"
      :z-index="props.zIndex"
      :background="props.background"
      :safe-area-inset-bottom="props.safeAreaInsetBottom"
      :show-header="props.showHeader"
      :title="props.title"
      :cancel-text="props.cancelText"
      :confirm-text="props.confirmText"
      :columns="props.columns"
      :min-date="props.minDate"
      :max-date="props.maxDate"
      :format="props.format"
      :column-filter="props.columnFilter"
      :column-formatter="props.columnFormatter"
      :column-height="props.columnHeight"
      :visible-column-num="props.visibleColumnNum"
      :column-size="props.columnSize"
      :column-color="props.columnColor"
      :column-weight="props.columnWeight"
      :active-column-size="props.activeColumnSize"
      :active-column-color="props.activeColumnColor"
      :active-column-weight="props.activeColumnWeight"
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
      <template #footer>
        <slot name="footer" />
      </template>
    </ui-date-picker>
  </view>
</template>

<script setup lang="ts">
import type { DatePickerInstance, DatePickerCancelData, DatePickerChangeData, DatePickerConfirmData } from "../ui-date-picker"
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed, useSlots } from "vue"
import { dateSelectEmits, dateSelectProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-date-select" })

const props = defineProps(dateSelectProps)
const emits = defineEmits(dateSelectEmits)
const slots = useSlots()

const { parent } = useParent(formItemKey)

// date-picker 组件引用
const datePickerRef = ref<DatePickerInstance | null>(null)
// 当前选中的日期值
const currentValue = ref<string>("")
// 最后操作类型（用于处理弹窗关闭逻辑）
const lastAction = ref<"confirm" | "cancel" | null>(null)
// 弹窗显示状态
const visible = ref(false)

// 是否可交互（非禁用且非只读）
const isInteractive = computed(() => !props.disabled && !props.readonly)

// 根节点类名数组
const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-date-select--disabled")
  if (props.readonly) list.push("ui-date-select--readonly")
  return list
})

// 点击态类名
const hoverClass = computed(() => {
  return isInteractive.value ? "ui-date-select--active" : ""
})

// 根节点样式
const style = computed(() => {
  return useStyle(props.customStyle)
})

// 值容器样式，处理文本对齐
const valueStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.textAlign) {
    style.justifyContent = props.textAlign === "left" ? "flex-start" : props.textAlign === "right" ? "flex-end" : "center"
  }
  return useStyle(style)
})

// 文本样式
const textStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

// 占位符样式
const placeholderStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.placeholderColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

// 是否显示右侧图标
const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || props.rightIcon)
})

/**
 * 展示文案
 */
const displayText = computed(() => {
  if (!currentValue.value) return ""

  // 如果有自定义格式化函数，使用它
  if (props.displayFormatter) {
    return props.displayFormatter(currentValue.value)
  }

  // 根据 columns 配置生成默认展示格式
  return formatDisplayText(currentValue.value)
})

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = parseValue(val)
  },
  { immediate: true },
)

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

  const columns = props.columns
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
  return props.format.replace(/YYYY/g, String(year)).replace(/MM/g, month).replace(/DD/g, day).replace(/HH/g, hour).replace(/mm/g, minute).replace(/ss/g, second)
}

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
    margin-left: var(--ui-spacing-md);
  }
}
</style>
