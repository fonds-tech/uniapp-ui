<template>
  <view class="ui-date-range-select" :class="[classs, props.customClass]" :style="[style]">
    <view class="ui-date-range-select__trigger" :hover-class="hoverClass" :hover-stay-time="+props.hoverStayTime">
      <view class="ui-date-range-select__item ui-date-range-select__start" @click="handleClick('start')">
        <slot name="start" :text="startDisplayText" :value="startValue" :placeholder="props.startPlaceholder">
          <text v-if="startDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ startDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ props.startPlaceholder }}</text>
        </slot>
      </view>

      <view class="ui-date-range-select__separator" @click="handleClick('start')">
        <slot name="separator">
          <text class="ui-date-range-select__separator-text" :style="[separatorStyle]">{{ props.separator }}</text>
        </slot>
      </view>

      <view class="ui-date-range-select__item ui-date-range-select__end" @click="handleClick('end')">
        <slot name="end" :text="endDisplayText" :value="endValue" :placeholder="props.endPlaceholder">
          <text v-if="endDisplayText" class="ui-date-range-select__text" :style="[textStyle]">{{ endDisplayText }}</text>
          <text v-else class="ui-date-range-select__placeholder" :style="[placeholderStyle]">{{ props.endPlaceholder }}</text>
        </slot>
      </view>

      <view v-if="showRightIcon" class="ui-date-range-select__icon" @click="handleClick('start')">
        <slot name="right-icon">
          <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
        </slot>
      </view>
    </view>

    <ui-date-range-picker
      ref="rangePickerRef"
      v-model:show="visible"
      :model-value="props.modelValue"
      :active-type="pickerActiveType"
      :auto-switch-to-end="props.autoSwitchToEnd"
      :columns="props.columns"
      :min-date="props.minDate"
      :max-date="props.maxDate"
      :format="props.format"
      :steps="props.steps"
      :column-filter="props.columnFilter"
      :column-formatter="props.columnFormatter"
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
      :start-placeholder="props.startPlaceholder"
      :end-placeholder="props.endPlaceholder"
      :cancel-text="props.cancelText"
      :confirm-text="props.confirmText"
      :column-height="props.columnHeight"
      :visible-column-num="props.visibleColumnNum"
      :column-size="props.columnSize"
      :column-color="props.columnColor"
      :column-weight="props.columnWeight"
      :active-column-size="props.activeColumnSize"
      :active-column-color="props.activeColumnColor"
      :active-column-weight="props.activeColumnWeight"
      @update:model-value="handleUpdateModelValue"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="handleClose"
      @closed="handleClosed"
      @change="emits('change', $event)"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
      <template v-if="$slots.header" #header>
        <slot name="header" />
      </template>
      <template v-if="$slots.cancel" #cancel>
        <slot name="cancel" />
      </template>
      <template v-if="$slots.confirm" #confirm>
        <slot name="confirm" />
      </template>
      <template v-if="$slots.footer" #footer="slotProps">
        <slot name="footer" :confirm="slotProps.confirm" :cancel="slotProps.cancel" />
      </template>
    </ui-date-range-picker>
  </view>
</template>

<script setup lang="ts">
import type { DateRangePickerValue, DateRangePickerInstance, DateRangePickerCancelData, DateRangePickerConfirmData } from "../ui-date-range-picker"
import type { DateRangeSelectValue, DateRangeSelectActiveType, DateRangeSelectCancelData, DateRangeSelectConfirmData } from "./index"
import UiDateRangePicker from "../ui-date-range-picker/ui-date-range-picker.vue"
import { formItemKey } from "../ui-form-item"
import { ref, watch, computed, useSlots } from "vue"
import { useUnit, useColor, useStyle, useParent } from "../hooks"
import { dateRangeSelectEmits, dateRangeSelectProps } from "./index"

defineOptions({ name: "ui-date-range-select" })

const props = defineProps(dateRangeSelectProps)
const emits = defineEmits(dateRangeSelectEmits)
const slots = useSlots()
const { parent } = useParent(formItemKey)

// 有效 disabled/readonly：合并 form/form-item 级
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(parent?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(props.readonly) || Boolean(parent?.readonly?.value))

const rangePickerRef = ref<DateRangePickerInstance>()
const visible = ref(false)
const pickerActiveType = ref<DateRangeSelectActiveType>("start")
const startValue = ref("")
const endValue = ref("")

const isInteractive = computed(() => !effectiveDisabled.value && !effectiveReadonly.value)

const classs = computed(() => {
  const list: string[] = []
  if (effectiveDisabled.value) list.push("ui-date-range-select--disabled")
  if (effectiveReadonly.value) list.push("ui-date-range-select--readonly")
  return list
})

const hoverClass = computed(() => {
  return isInteractive.value ? "ui-date-range-select--active" : ""
})

const style = computed(() => {
  return useStyle(props.customStyle)
})

const textStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.textColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

const placeholderStyle = computed(() => {
  const style: Record<string, string | number> = {}
  style.color = useColor(props.placeholderColor)
  style.fontSize = useUnit(props.textSize)
  if (props.textWeight) style.fontWeight = props.textWeight
  return useStyle(style)
})

const separatorStyle = computed(() => {
  const style: Record<string, string | number> = {}
  if (props.separatorColor) {
    style.color = useColor(props.separatorColor)
  }
  return useStyle(style)
})

const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || props.rightIcon)
})

const startDisplayText = computed(() => {
  if (!startValue.value) return ""
  if (props.displayFormatter) {
    return props.displayFormatter(startValue.value, "start")
  }
  return formatDisplayText(startValue.value)
})

const endDisplayText = computed(() => {
  if (!endValue.value) return ""
  if (props.displayFormatter) {
    return props.displayFormatter(endValue.value, "end")
  }
  return formatDisplayText(endValue.value)
})

watch(
  () => props.modelValue,
  (value) => {
    const { start, end } = parseRangeValue(value)
    startValue.value = start
    endValue.value = end
  },
  { immediate: true, deep: true },
)

function parseRangeValue(value: DateRangeSelectValue | undefined) {
  if (!value || !Array.isArray(value) || value.length < 2) {
    return { start: "", end: "" }
  }
  return {
    start: value[0] || "",
    end: value[1] || "",
  }
}

function buildRange(start: string, end: string): DateRangeSelectValue {
  if (!start || !end) return []
  return [start, end]
}

function getSelectedRange(): DateRangeSelectValue {
  const { start, end } = parseRangeValue(props.modelValue)
  return buildRange(start, end)
}

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

  const columns = props.columns
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

function handleClick(type: DateRangeSelectActiveType) {
  if (!isInteractive.value) return
  emits("click", type)
  open(type)
}

function handleUpdateModelValue(value: DateRangePickerValue) {
  emits("update:modelValue", value)
}

function handleClose(action: string) {
  emits("close", action)
}

function handleClosed(action: string) {
  emits("closed", action)
  parent?.onBlur(getSelectedRange())
}

function handleCancel(data: DateRangePickerCancelData) {
  const cancelData: DateRangeSelectCancelData = {
    range: data.range,
  }
  emits("cancel", cancelData)
  parent?.onBlur(getSelectedRange())
}

function handleConfirm(data: DateRangePickerConfirmData) {
  const confirmData: DateRangeSelectConfirmData = {
    range: data.range,
    startValue: data.startValue,
    endValue: data.endValue,
  }
  emits("confirm", confirmData)
  parent?.onChange(confirmData.range)
}

function open(type: DateRangeSelectActiveType = "start") {
  if (!isInteractive.value) return
  pickerActiveType.value = type
  rangePickerRef.value?.open(type)
}

defineExpose({
  open,
  close: () => rangePickerRef.value?.close(),
  confirm: () => rangePickerRef.value?.confirm(),
  cancel: () => rangePickerRef.value?.cancel(),
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
    padding: var(--ui-spacing-xs) 0;
    overflow: hidden;
    transition: background-color var(--ui-transition-fast);
    align-items: center;
    border-radius: var(--ui-radius-sm);
    justify-content: center;
  }

  &__separator {
    display: flex;
    padding: 0 var(--ui-spacing-sm);
    align-items: center;
    flex-shrink: 0;

    &-text {
      color: var(--ui-color-text-secondary);
      font-size: var(--ui-font-size-md);
    }
  }

  &__text {
    color: var(--ui-color-text);
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
    flex-shrink: 0;
    margin-left: var(--ui-spacing-md);
  }
}
</style>
