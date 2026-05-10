<template>
  <view class="ui-picker">
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
      @update:show="onUpdateShow"
      @open="emits('open')"
      @opened="emits('opened')"
      @close="emits('close', $event)"
      @closed="emits('closed', $event)"
    >
      <template #header>
        <slot name="header">
          <view v-if="props.showHeader" class="ui-picker__header">
            <view class="ui-picker__cancel" @click="onCancel">
              <slot name="cancel">
                <ui-button text color="text-secondary">{{ props.cancelText }}</ui-button>
              </slot>
            </view>
            <view class="ui-picker__title">
              <slot name="title">{{ props.title }}</slot>
            </view>
            <view class="ui-picker__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text type="primary">{{ props.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <ui-picker-panel
        ref="panelRef"
        v-model="internalValue"
        :columns="props.columns"
        :loading="props.loading"
        :column-fields="props.columnFields"
        :column-height="props.columnHeight"
        :visible-column-num="props.visibleColumnNum"
        :column-size="props.columnSize"
        :column-color="props.columnColor"
        :column-weight="props.columnWeight"
        :active-column-size="props.activeColumnSize"
        :active-column-color="props.activeColumnColor"
        :active-column-weight="props.activeColumnWeight"
        :indicator-class="props.indicatorClass"
        :mask-style="props.maskStyle"
        :mask-top-style="props.maskTopStyle"
        :mask-bottom-style="props.maskBottomStyle"
        :mask-class="props.maskClass"
        :immediate-change="props.immediateChange"
        @change="onPanelChange"
        @pickstart="emits('pickstart')"
        @pickend="emits('pickend')"
      />

      <template #footer>
        <slot name="footer" :confirm="onConfirm" :cancel="onCancel" />
      </template>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import type { PickerValue, PickerModelValue } from "./index"
import type { PickerChangeData, PickerColumnsType, PickerColumnFields, PickerPanelInstance } from "../ui-picker-panel"
import UiPopup from "../ui-popup/ui-popup.vue"
import UiPickerPanel from "../ui-picker-panel/ui-picker-panel.vue"
import { merge } from "../utils/utils"
import { ref, watch, computed } from "vue"
import { pickerEmits, pickerProps } from "./index"

defineOptions({ name: "ui-picker" })

const props = defineProps(pickerProps)
const emits = defineEmits(pickerEmits)

const panelRef = ref<PickerPanelInstance | null>(null)
const internalValue = ref<(string | number)[]>([])

// 字段映射
const resolvedFields = computed(() => merge({ text: "text", value: "value", children: "children" }, props.columnFields) as Required<PickerColumnFields>)
// 列数据形态
const columnsType = computed<PickerColumnsType>(() => {
  const first = props.columns[0]
  if (first) {
    if (Array.isArray(first)) return "multiple"
    if (resolvedFields.value.children in first) return "cascade"
  }
  return "default"
})
// 单值模式
const isSingleValueMode = computed(() => columnsType.value === "default")

watch(
  () => props.modelValue,
  (val) => (internalValue.value = parseValue(val)),
  { immediate: true, deep: true },
)

watch(
  () => props.show,
  (val) => {
    if (val) internalValue.value = parseValue(props.modelValue)
  },
)

// 外部值规范化为内部数组
function parseValue(value: PickerModelValue | undefined): PickerValue[] {
  if (value === undefined || value === null || value === "") return []
  if (Array.isArray(value)) return value
  return [value]
}

// 内部数组按形态格式化为外部值
function formatValue(values: PickerValue[]): PickerModelValue {
  if (isSingleValueMode.value) return values[0] ?? ""
  return values
}

function onUpdateShow(show: boolean) {
  emits("update:show", show)
}

function onPanelChange(data: PickerChangeData) {
  emits("change", data)
}

function onCancel() {
  emits("cancel", {
    values: panelRef.value?.getSelectedValues() ?? [],
    indexs: panelRef.value?.getSelectedIndexs() ?? [],
    columns: panelRef.value?.getSelectedColumns() ?? [],
  })
  emits("update:show", false)
}

function onConfirm() {
  const values = panelRef.value?.getSelectedValues() ?? []
  const indexs = panelRef.value?.getSelectedIndexs() ?? []
  const columns = panelRef.value?.getSelectedColumns() ?? []
  emits("confirm", { values, indexs, columns })
  emits("update:modelValue", formatValue(values))
  emits("update:show", false)
}

defineExpose({
  /** 触发确认 */
  confirm: onConfirm,
  /** 触发取消 */
  cancel: onCancel,
  /** 获取选中值数组 */
  getSelectedValues: () => panelRef.value?.getSelectedValues() ?? [],
  /** 获取选中索引数组 */
  getSelectedIndexs: () => panelRef.value?.getSelectedIndexs() ?? [],
  /** 获取选中列项数组 */
  getSelectedColumns: () => panelRef.value?.getSelectedColumns() ?? [],
})
</script>

<script lang="ts">
export default {
  name: "ui-picker",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss">
.ui-picker {
  --ui-picker-title-size: var(--ui-font-size-md);
  --ui-picker-title-color: var(--ui-color-text);
  --ui-picker-border-color: var(--ui-color-border-light);
  --ui-picker-title-weight: bold;
  --ui-picker-header-padding: var(--ui-spacing-md);

  &__header {
    display: flex;
    padding: var(--ui-picker-header-padding);
    align-items: center;
    border-bottom: var(--ui-border-width) solid var(--ui-picker-border-color);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-picker-title-color);
    font-size: var(--ui-picker-title-size);
    font-weight: var(--ui-picker-title-weight);
  }
}
</style>
