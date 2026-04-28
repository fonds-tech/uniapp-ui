<template>
  <view class="ui-date-range-picker" :class="[props.customClass]" :style="[style]">
    <ui-popup
      :show="props.show"
      :mode="props.mode"
      :border-radius="props.borderRadius"
      :close-on-click-overlay="props.closeOnClickOverlay"
      :overlay="props.overlay"
      :duration="props.duration"
      :z-index="props.zIndex"
      :background="props.background"
      :safe-area-inset-bottom="props.safeAreaInsetBottom"
      @update:show="handleUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close', $event)"
      @closed="emits('closed', $event)"
    >
      <template #header>
        <slot name="header">
          <view v-if="props.showHeader" class="ui-date-range-picker__header">
            <view class="ui-date-range-picker__header__cancel" @click="handleCancel">
              <slot name="cancel">
                <ui-button text text-color="text-tertiary">{{ props.cancelText }}</ui-button>
              </slot>
            </view>

            <view class="ui-date-range-picker__tabs">
              <view class="ui-date-range-picker__tab" :class="{ 'is-active': activeType === 'start' }" @click="switchTab('start')">
                <text class="ui-date-range-picker__tab-text">{{ startTabText }}</text>
              </view>
              <view class="ui-date-range-picker__tab" :class="{ 'is-active': activeType === 'end' }" @click="switchTab('end')">
                <text class="ui-date-range-picker__tab-text">{{ endTabText }}</text>
              </view>
            </view>

            <view class="ui-date-range-picker__header__confirm" @click="handleConfirm">
              <slot name="confirm">
                <ui-button text>{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <view class="ui-date-range-picker__picker">
        <ui-date-panel
          ref="datePanelRef"
          :model-value="activePanelValue"
          :columns="props.columns"
          :min-date="panelMinDate"
          :max-date="panelMaxDate"
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
          @change="onPanelChange"
        />
      </view>

      <template #footer>
        <slot name="footer" :confirm="handleConfirm" :cancel="handleCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { DatePanelChangeData } from "../ui-date-panel"
import type { DateRangePickerValue, DateRangePickerActiveType } from "./index"
import UiDatePanel from "../ui-date-panel/ui-date-panel.vue"
import { isDef } from "../utils/check"
import { useStyle } from "../hooks"
import { ref, watch, computed, nextTick } from "vue"
import { dateRangePickerEmits, dateRangePickerProps } from "./index"

defineOptions({ name: "ui-date-range-picker" })

const props = defineProps(dateRangePickerProps)
const emits = defineEmits(dateRangePickerEmits)
const datePanelRef = ref<InstanceType<typeof UiDatePanel>>()

const activeType = ref<DateRangePickerActiveType>(props.activeType)
const startValue = ref("")
const endValue = ref("")
const tempStartValue = ref("")
const tempEndValue = ref("")
const pendingOpenType = ref<DateRangePickerActiveType | null>(null)

const style = computed(() => useStyle(props.customStyle))

const activePanelValue = computed(() => {
  return activeType.value === "start" ? tempStartValue.value : tempEndValue.value
})

const startTabText = computed(() => {
  return tempStartValue.value || props.startPlaceholder
})

const endTabText = computed(() => {
  return tempEndValue.value || props.endPlaceholder
})

const panelMinDate = computed(() => {
  const minFromProps = parseDateInput(props.minDate)
  if (activeType.value !== "end") {
    return parsedToDate(minFromProps)
  }

  const startDate = parseDateInput(tempStartValue.value)
  if (!startDate) {
    return parsedToDate(minFromProps)
  }

  const merged = maxDateParts(minFromProps, startDate)
  return parsedToDate(merged)
})

const panelMaxDate = computed(() => {
  const maxFromProps = parseDateInput(props.maxDate)
  if (activeType.value !== "start") {
    return parsedToDate(maxFromProps)
  }

  const endDate = parseDateInput(tempEndValue.value)
  if (!endDate) {
    return parsedToDate(maxFromProps)
  }

  const merged = minDateParts(maxFromProps, endDate)
  return parsedToDate(merged)
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

watch(
  () => props.show,
  (show) => {
    if (!show) return

    const openType = pendingOpenType.value ?? props.activeType
    pendingOpenType.value = null

    prepareOpenState(openType)
    syncPanelToActiveValue()
  },
)

function prepareOpenState(type: DateRangePickerActiveType) {
  activeType.value = type
  tempStartValue.value = startValue.value
  tempEndValue.value = endValue.value
}

function syncPanelToActiveValue() {
  nextTick(() => {
    datePanelRef.value?.setValue(activePanelValue.value)
    const value = datePanelRef.value?.getSelectedValue?.() ?? activePanelValue.value
    if (!value) return

    if (activeType.value === "start") {
      tempStartValue.value = value
      return
    }
    tempEndValue.value = value
  })
}

function parseRangeValue(value: DateRangePickerValue | undefined) {
  if (!value || !Array.isArray(value) || value.length < 2) {
    return { start: "", end: "" }
  }
  return {
    start: value[0] || "",
    end: value[1] || "",
  }
}

function buildRange(start: string, end: string): DateRangePickerValue {
  if (!start || !end) return []
  return [start, end]
}

function onPanelChange(data: DatePanelChangeData) {
  if (activeType.value === "start") {
    tempStartValue.value = data.value
  } else {
    tempEndValue.value = data.value
  }

  emits("change", {
    type: activeType.value,
    value: data.value,
    range: buildRange(tempStartValue.value, tempEndValue.value),
    selectedValues: data.selectedValues,
    selectedIndexes: data.selectedIndexes,
  })
}

function switchTab(type: DateRangePickerActiveType) {
  activeType.value = type
  syncPanelToActiveValue()
}

function handleUpdateShow(show: boolean) {
  emits("update:show", show)
}

function handleCancel() {
  emits("cancel", {
    range: buildRange(startValue.value, endValue.value),
  })
  emits("update:show", false)
}

function handleConfirm() {
  if (props.autoSwitchToEnd && activeType.value === "start") {
    switchTab("end")
    return
  }

  startValue.value = tempStartValue.value
  endValue.value = tempEndValue.value

  const range = buildRange(startValue.value, endValue.value)

  emits("confirm", {
    range,
    startValue: startValue.value,
    endValue: endValue.value,
  })
  emits("update:modelValue", range)
  emits("update:show", false)
}

function open(type: DateRangePickerActiveType = props.activeType) {
  pendingOpenType.value = type
  emits("update:show", true)
}

function close() {
  emits("update:show", false)
}

function confirm() {
  handleConfirm()
}

function cancel() {
  handleCancel()
}

function getRange() {
  return buildRange(startValue.value, endValue.value)
}

interface DateParts {
  y: number
  m: number
  d: number
  h: number
  mi: number
  s: number
}

function parseDateInput(value: string | number | Date | null | undefined): DateParts | null {
  if (!isDef(value) || value === "") return null

  const now = new Date()

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null
    return {
      y: value.getFullYear(),
      m: value.getMonth() + 1,
      d: value.getDate(),
      h: value.getHours(),
      mi: value.getMinutes(),
      s: value.getSeconds(),
    }
  }

  if (typeof value === "number") {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return null
    return {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      mi: date.getMinutes(),
      s: date.getSeconds(),
    }
  }

  const normalized = value.replace("T", " ").replace("Z", "")
  const parts = normalized.split(/[\s/:-]/)

  if (parts.length === 2 || parts.length === 3) {
    const firstNum = Number.parseInt(parts[0])
    if (firstNum >= 0 && firstNum <= 23) {
      return {
        y: now.getFullYear(),
        m: now.getMonth() + 1,
        d: now.getDate(),
        h: firstNum,
        mi: Number.parseInt(parts[1]) || 0,
        s: parts.length === 3 ? Number.parseInt(parts[2]) || 0 : 0,
      }
    }
  }

  if (parts.length >= 3) {
    return {
      y: Number.parseInt(parts[0]) || now.getFullYear(),
      m: Number.parseInt(parts[1]) || 1,
      d: Number.parseInt(parts[2]) || 1,
      h: Number.parseInt(parts[3]) || 0,
      mi: Number.parseInt(parts[4]) || 0,
      s: Number.parseInt(parts[5]) || 0,
    }
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    mi: date.getMinutes(),
    s: date.getSeconds(),
  }
}

function toTime(parts: DateParts): number {
  return new Date(parts.y, parts.m - 1, parts.d, parts.h, parts.mi, parts.s).getTime()
}

function maxDateParts(first: DateParts | null, second: DateParts | null): DateParts | null {
  if (!first) return second
  if (!second) return first
  return toTime(first) >= toTime(second) ? first : second
}

function minDateParts(first: DateParts | null, second: DateParts | null): DateParts | null {
  if (!first) return second
  if (!second) return first
  return toTime(first) <= toTime(second) ? first : second
}

function parsedToDate(parts: DateParts | null): Date | undefined {
  if (!parts) return undefined
  return new Date(parts.y, parts.m - 1, parts.d, parts.h, parts.mi, parts.s)
}

defineExpose({
  name: "ui-date-range-picker",
  open,
  close,
  confirm,
  cancel,
  getRange,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-range-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-date-range-picker {
  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    justify-content: space-between;

    &__cancel,
    &__confirm {
      flex-shrink: 0;
    }
  }

  &__tabs {
    gap: var(--ui-spacing-lg);
    flex: 1;
    display: flex;
    justify-content: center;
  }

  &__tab {
    padding: var(--ui-spacing-xs) var(--ui-spacing-md);
    position: relative;
    min-width: 160rpx;
    text-align: center;
    transition: all var(--ui-transition-fast);
    border-radius: var(--ui-radius-sm);

    &.is-active {
      background-color: var(--ui-color-primary-light, rgba(25, 137, 250, 0.1));

      .ui-date-range-picker__tab-text {
        color: var(--ui-color-primary);
      }
    }

    &-text {
      color: var(--ui-color-text);
      overflow: hidden;
      font-size: var(--ui-font-size-sm);
      transition: color var(--ui-transition-fast);
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &__picker {
    z-index: 1;
    position: relative;
  }
}
</style>
