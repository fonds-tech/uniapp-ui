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
                <ui-button text color="text-secondary">{{ props.cancelText }}</ui-button>
              </slot>
            </view>
            <view class="ui-date-picker__header__title">
              <slot name="title">{{ props.title }}</slot>
            </view>
            <view class="ui-date-picker__header__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text type="primary">{{ props.confirmText }}</ui-button>
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
import { ref, watch, nextTick } from "vue"
import { datePickerEmits, datePickerProps } from "./index"

defineOptions({ name: "ui-date-picker" })

const props = defineProps(datePickerProps)
const emits = defineEmits(datePickerEmits)
const datePanelRef = ref<InstanceType<typeof UiDatePanel>>()
// 最近一次 panel 内的选中数据快照（panel 未挂载时（关闭态）兜底用）
const latestSelectedData = ref<DatePickerChangeData>({ value: "", selectedValues: [], selectedIndexes: [] })

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

// panel 未挂载（关闭态）时的兜底值：优先 panel 实时值，其次 latestSelectedData 缓存，最后空数据
// 不再用 toISOString 兜底（与用户 format 期望格式错位）；空字符串交给 panel 在挂载后按 format 格式化
function buildSelectedData(): DatePickerChangeData {
  const value = datePanelRef.value?.getSelectedValue?.() ?? latestSelectedData.value.value
  const selectedValues = datePanelRef.value?.getSelectedValues?.() ?? latestSelectedData.value.selectedValues
  const selectedIndexes = datePanelRef.value?.getSelectedIndexes?.() ?? latestSelectedData.value.selectedIndexes
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

defineExpose({
  open: () => emits("update:show", true),
  close: () => emits("update:show", false),
  getSelectedValue: () => buildSelectedData().value,
  getSelectedValues: () => buildSelectedData().selectedValues,
  getSelectedIndexes: () => buildSelectedData().selectedIndexes,
  confirm: onConfirm,
  cancel: onCancel,
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
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
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
