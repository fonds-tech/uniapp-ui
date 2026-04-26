<template>
  <view class="ui-date-picker">
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
          <view v-if="props.showHeader" class="ui-date-picker__header">
            <view class="ui-date-picker__header__cancel" @click="onCancel">
              <slot name="cancel">
                <ui-button text text-color="text-tertiary">
                  {{ props.cancelText }}
                </ui-button>
              </slot>
            </view>
            <view class="ui-date-picker__header__title">
              <slot name="title">{{ props.title }}</slot>
            </view>
            <view class="ui-date-picker__header__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text>{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <view class="ui-date-picker__options">
        <ui-date-panel
          ref="datePanelRef"
          :model-value="props.modelValue"
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
          @change="onPanelChange"
        />
      </view>

      <template #footer>
        <slot name="footer" :confirm="onConfirm" :cancel="onCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { DatePanelChangeData } from "../ui-date-panel/index"
import type { DatePickerChangeData } from "./index"
import UiPopup from "../ui-popup/ui-popup.vue"
import UiDatePanel from "../ui-date-panel/ui-date-panel.vue"
import { isDef } from "../utils/check"
import { ref, watch, nextTick } from "vue"
import { datePickerEmits, datePickerProps } from "./index"

defineOptions({ name: "ui-date-picker" })

const props = defineProps(datePickerProps)
const emits = defineEmits(datePickerEmits)
const datePanelRef = ref<InstanceType<typeof UiDatePanel>>()
const latestSelectedData = ref<DatePickerChangeData | null>(null)

watch(
  () => props.show,
  (show) => {
    if (show) {
      nextTick(() => {
        datePanelRef.value?.setValue(props.modelValue)
        latestSelectedData.value = buildSelectedData()
      })
    }
  },
)

// 更新显示状态
function handleUpdateShow(show: boolean) {
  emits("update:show", show)
}

function onPanelChange(data: DatePanelChangeData) {
  const mappedData: DatePickerChangeData = {
    value: data.value,
    selectedValues: data.selectedValues,
    selectedIndexes: data.selectedIndexes,
  }
  latestSelectedData.value = mappedData
  emits("change", mappedData)
  emits("update:modelValue", mappedData.value)
}

function formatModelValueFallback() {
  if (!isDef(props.modelValue)) return ""
  if (typeof props.modelValue === "string") return props.modelValue
  if (props.modelValue instanceof Date) return Number.isNaN(props.modelValue.getTime()) ? "" : props.modelValue.toISOString()
  if (typeof props.modelValue === "number") {
    const date = new Date(props.modelValue)
    return Number.isNaN(date.getTime()) ? "" : date.toISOString()
  }
  return ""
}

function buildSelectedData(): DatePickerChangeData {
  const value = datePanelRef.value?.getSelectedValue?.() ?? latestSelectedData.value?.value ?? formatModelValueFallback()
  const selectedValues = datePanelRef.value?.getSelectedValues?.() ?? latestSelectedData.value?.selectedValues ?? []
  const selectedIndexes = datePanelRef.value?.getSelectedIndexes?.() ?? latestSelectedData.value?.selectedIndexes ?? []
  return { value, selectedValues, selectedIndexes }
}

function onCancel() {
  const data = buildSelectedData()
  emits("cancel", data)
  emits("update:show", false)
}

function onConfirm() {
  const data = buildSelectedData()
  emits("confirm", data)
  emits("update:modelValue", data.value)
  emits("update:show", false)
}

function open() {
  emits("update:show", true)
}

function close() {
  emits("update:show", false)
}

function getSelectedValue() {
  return buildSelectedData().value
}

function getSelectedValues() {
  return buildSelectedData().selectedValues
}

function getSelectedIndexes() {
  return buildSelectedData().selectedIndexes
}

function confirm() {
  onConfirm()
}

function cancel() {
  onCancel()
}

defineExpose({
  name: "ui-date-picker",
  open,
  close,
  getSelectedValue,
  getSelectedValues,
  getSelectedIndexes,
  confirm,
  cancel,
})
</script>

<script lang="ts">
export default {
  name: "ui-date-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-date-picker {
  &__header {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border);
    justify-content: space-between;

    &__title {
      color: var(--ui-color-text);
      font-size: var(--ui-font-size-md);
      font-weight: var(--ui-font-weight-bold);
    }
  }

  &__options {
    z-index: 1;
    position: relative;
  }
}
</style>
