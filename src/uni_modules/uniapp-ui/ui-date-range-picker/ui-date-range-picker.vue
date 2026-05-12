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
            <!-- 第 1 行：取消 + 标题 + 确定（与其他 popup 一致） -->
            <view class="ui-date-range-picker__header__top">
              <view class="ui-date-range-picker__header__cancel" @click="handleCancel">
                <slot name="cancel">
                  <ui-button text color="text-secondary">{{ props.cancelText }}</ui-button>
                </slot>
              </view>
              <view class="ui-date-range-picker__header__title">
                <slot name="title">{{ props.title }}</slot>
              </view>
              <view class="ui-date-range-picker__header__confirm" @click="handleConfirm">
                <slot name="confirm">
                  <ui-button text type="primary">{{ props.confirmText }}</ui-button>
                </slot>
              </view>
            </view>

            <!-- 第 2 行：开始 / 结束 segmented 切换 -->
            <view class="ui-date-range-picker__tabs">
              <view class="ui-date-range-picker__tab" :class="{ 'is-active': activeType === 'start' }" @click="switchTab('start')">
                <text class="ui-date-range-picker__tab-text">{{ startTabText }}</text>
              </view>
              <view class="ui-date-range-picker__tab" :class="{ 'is-active': activeType === 'end' }" @click="switchTab('end')">
                <text class="ui-date-range-picker__tab-text">{{ endTabText }}</text>
              </view>
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
          :steps="props.steps"
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
    const firstNum = Number.parseInt(parts[0], 10)
    if (firstNum >= 0 && firstNum <= 23) {
      return {
        y: now.getFullYear(),
        m: now.getMonth() + 1,
        d: now.getDate(),
        h: firstNum,
        mi: Number.parseInt(parts[1], 10) || 0,
        s: parts.length === 3 ? Number.parseInt(parts[2], 10) || 0 : 0,
      }
    }
  }

  if (parts.length >= 3) {
    return {
      y: Number.parseInt(parts[0], 10) || now.getFullYear(),
      m: Number.parseInt(parts[1], 10) || 1,
      d: Number.parseInt(parts[2], 10) || 1,
      h: Number.parseInt(parts[3], 10) || 0,
      mi: Number.parseInt(parts[4], 10) || 0,
      s: Number.parseInt(parts[5], 10) || 0,
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
  open,
  close: () => emits("update:show", false),
  confirm: handleConfirm,
  cancel: handleCancel,
  getRange: () => buildRange(startValue.value, endValue.value),
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
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    flex-direction: column;

    // 第 1 行：标准 popup 头部（取消 / 标题 / 确定）
    &__top {
      display: flex;
      padding: var(--ui-spacing-md);
      align-items: center;
      justify-content: space-between;
    }

    &__cancel,
    &__confirm {
      flex-shrink: 0;
    }

    &__title {
      flex: 1;
      color: var(--ui-color-text);
      font-size: var(--ui-font-size-md);
      text-align: center;
      font-weight: var(--ui-font-weight-bold);
    }
  }

  // 第 2 行：开始 / 结束 segmented 切换
  &__tabs {
    margin: 0 var(--ui-spacing-md) var(--ui-spacing-md);
    display: flex;
    padding: 4rpx;
    border-radius: var(--ui-radius-sm);
    background-color: var(--ui-color-background-section);
  }

  &__tab {
    flex: 1;
    padding: var(--ui-spacing-xs) var(--ui-spacing-sm);
    overflow: hidden;
    text-align: center;
    transition: background-color var(--ui-transition-fast);
    border-radius: var(--ui-radius-xs);

    &.is-active {
      box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.08);
      background-color: var(--ui-color-background);

      .ui-date-range-picker__tab-text {
        color: var(--ui-color-primary);
        font-weight: var(--ui-font-weight-normal);
      }
    }

    &-text {
      color: var(--ui-color-text);
      overflow: hidden;
      font-size: var(--ui-font-size-sm);
      transition: color var(--ui-transition-fast);
      line-height: 1.4;
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
