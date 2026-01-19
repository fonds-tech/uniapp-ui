<template>
  <view class="ui-picker">
    <ui-popup
      :show="show"
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
      <!-- Header 插槽 -->
      <template #header>
        <slot name="header">
          <view v-if="useProps.showHeader" class="ui-picker__header">
            <view class="ui-picker__header__cancel" @click="onCancel">
              <slot name="cancel">
                <ui-button text text-color="#969799">
                  {{ useProps.cancelText }}
                </ui-button>
              </slot>
            </view>
            <view class="ui-picker__header__title">
              <slot name="title">{{ useProps.title }}</slot>
            </view>
            <view class="ui-picker__header__confirm" @click="onConfirm">
              <slot name="confirm">
                <ui-button text>{{ useProps.confirmText }}</ui-button>
              </slot>
            </view>
          </view>
        </slot>
      </template>

      <!-- Panel 内容 -->
      <ui-picker-panel
        ref="panelRef"
        v-model="internalValue"
        :columns="useProps.columns"
        :loading="useProps.loading"
        :column-fields="useProps.columnFields"
        :column-height="useProps.columnHeight"
        :visible-column-num="useProps.visibleColumnNum"
        :column-size="useProps.columnSize"
        :column-color="useProps.columnColor"
        :column-weight="useProps.columnWeight"
        :active-column-size="useProps.activeColumnSize"
        :active-column-color="useProps.activeColumnColor"
        :active-column-weight="useProps.activeColumnWeight"
        @change="handlePanelChange"
      />

      <!-- Footer 底部插槽 -->
      <template #footer>
        <slot name="footer" :confirm="onConfirm" :cancel="onCancel">
          <!-- 默认无底部内容,用户可以自定义底部按钮 -->
        </slot>
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
import { pickerEmits, pickerProps, usePickerProps } from "./index"

defineOptions({ name: "ui-picker" })

const props = defineProps(pickerProps)
const emits = defineEmits(pickerEmits)
const useProps = usePickerProps(props)
// picker-panel 组件引用
const panelRef = ref<PickerPanelInstance | null>(null)
// 内部值,用于双向绑定
const internalValue = ref<(string | number)[]>([])

/**
 * 统一字段映射
 */
const resolvedFields = computed(() => {
  return merge({ text: "text", value: "value", children: "children" }, useProps.columnFields) as Required<PickerColumnFields>
})

/**
 * 判断列数据类型（单列/多列/级联）
 */
const columnsType = computed<PickerColumnsType>(() => {
  const firstColumn = useProps.columns[0]
  if (firstColumn) {
    if (Array.isArray(firstColumn)) return "multiple"
    if (resolvedFields.value.children in firstColumn) return "cascade"
  }
  return "default"
})

const isSingleValueMode = computed(() => {
  return columnsType.value === "default"
})

/**
 * 将外部传入的值解析为内部数组格式
 */
function parseValue(value: PickerModelValue | undefined): PickerValue[] {
  if (value === undefined || value === null || value === "") {
    return []
  }
  if (Array.isArray(value)) {
    return value
  }
  return [value]
}

/**
 * 将内部数组格式转换为外部期望的格式
 */
function formatValue(values: PickerValue[]): PickerModelValue {
  if (isSingleValueMode.value) {
    return values[0] ?? ""
  }
  return values
}

// 监听外部 modelValue 变化,使用 immediate 确保初始值同步
watch(
  () => useProps.modelValue,
  (val) => {
    internalValue.value = parseValue(val)
  },
  { immediate: true, deep: true },
)

// 监听 show 变化,弹窗打开时同步最新值
watch(
  () => useProps.show,
  (val) => {
    if (val) {
      // 弹窗打开时,确保内部值与外部同步
      internalValue.value = parseValue(useProps.modelValue)
    }
  },
)

/**
 * 处理弹窗显示状态变化
 */
function handleUpdateShow(show: boolean) {
  emits("update:show", show)
}

/**
 * 处理面板选择变化
 */
function handlePanelChange(data: PickerChangeData) {
  emits("change", data)
}

/**
 * 取消按钮点击
 */
function onCancel() {
  emits("cancel", {
    values: panelRef.value?.getSelectedValues() ?? [],
    indexs: panelRef.value?.getSelectedIndexs() ?? [],
    columns: panelRef.value?.getSelectedColumns() ?? [],
  })
  emits("update:show", false)
}

/**
 * 确认按钮点击
 */
function onConfirm() {
  const values = panelRef.value?.getSelectedValues() ?? []
  const indexs = panelRef.value?.getSelectedIndexs() ?? []
  const columns = panelRef.value?.getSelectedColumns() ?? []

  emits("confirm", { values, indexs, columns })
  emits("update:modelValue", formatValue(values))
  emits("update:show", false)
}

defineExpose({
  name: "ui-picker",
  // 暴露 popup 方法
  open: () => emits("update:show", true),
  close: () => emits("update:show", false),
  // 暴露 panel 方法
  getSelectedValues: () => panelRef.value?.getSelectedValues(),
  getSelectedIndexs: () => panelRef.value?.getSelectedIndexs(),
  getSelectedColumns: () => panelRef.value?.getSelectedColumns(),
  // 暴露操作方法
  confirm: onConfirm,
  cancel: onCancel,
})
</script>

<script lang="ts">
export default {
  name: "ui-picker",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-picker {
  &__header {
    display: flex;
    padding: var(--ui-spacing-lg);
    align-items: center;
    border-bottom: var(--ui-border-width) solid var(--ui-color-border-light);
    justify-content: space-between;

    &__title {
      color: var(--ui-color-text-primary);
      font-size: var(--ui-font-size-lg);
      font-weight: var(--ui-font-weight-bold);
    }
  }
}
</style>
