<template>
  <view class="ui-select" :class="[classNames, props.customClass]" :style="rootStyle" role="combobox" :aria-disabled="effectiveDisabled" @click="handleClick">
    <view class="ui-select__trigger" :hover-class="hoverClass" :hover-stay-time="50">
      <view class="ui-select__value" :style="valueStyle">
        <slot name="display" :text="displayText" :payload="displayPayload" :placeholder="props.placeholder">
          <text v-if="displayText" class="ui-select__text" :style="textStyle">{{ displayText }}</text>
          <text v-else class="ui-select__placeholder" :style="placeholderStyle">{{ props.placeholder }}</text>
        </slot>
      </view>
      <view v-if="showClear" class="ui-select__clear" hover-class="ui-select__clear--active" @click.stop="handleClear">
        <ui-icon :name="props.clearIcon" size="32rpx" color="text-tertiary" />
      </view>
      <view v-if="showRightIcon" class="ui-select__icon">
        <slot name="right-icon">
          <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
        </slot>
      </view>
    </view>

    <ui-picker
      ref="pickerRef"
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
      :columns-fields="props.columnsFields"
      :loading="props.loading"
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
    </ui-picker>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { SelectValue, SelectDisplayPayload } from "./index"
import type { PickerValue, PickerColumn, PickerInstance, PickerCancelData, PickerChangeData, PickerColumnsType, PickerConfirmData, PickerColumnFields } from "../ui-picker"
import { formItemKey } from "../ui-form-item"
import { ref, computed, nextTick } from "vue"
import { selectEmits, selectProps } from "./index"
import { useUnit, useColor, useStyle, useParent, useHasSlot } from "../hooks"

defineOptions({ name: "ui-select" })

const props = defineProps(selectProps)
const emits = defineEmits(selectEmits)
const hasRightIconSlot = useHasSlot("right-icon")

const { parent } = useParent(formItemKey)

// flex 对齐 lookup
const FLEX_ALIGN_MAP: Record<string, string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
}
// 默认字段映射
const DEFAULT_FIELDS: Required<PickerColumnFields> = { text: "text", value: "value", children: "children" }

const pickerRef = ref<PickerInstance>()
const lastAction = ref<"confirm" | "cancel" | null>(null)
const visible = ref(false)

// 单 source：内部值 ↔ 外部 modelValue 通过 computed 双向
const currentValue = computed<PickerValue[]>({
  get: () => parseValue(props.modelValue),
  set: (val) => emits("update:modelValue", formatValue(val)),
})

const resolvedFields = computed<Required<PickerColumnFields>>(() => ({ ...DEFAULT_FIELDS, ...(props.columnsFields ?? {}) }))
const columnsType = computed<PickerColumnsType>(() => getColumnsType(props.columns, resolvedFields.value))
const isSingleValueMode = computed(() => columnsType.value === "default" && !props.multiple)
const effectiveDisabled = computed(() => !!props.disabled || !!parent?.disabled?.value)
const effectiveReadonly = computed(() => !!props.readonly || !!parent?.readonly?.value)
const isInteractive = computed(() => !effectiveDisabled.value && !effectiveReadonly.value)
const isInvalid = computed(() => parent?.validateStatus?.value === "failed")
const hoverClass = computed(() => (isInteractive.value ? "ui-select--active" : ""))
const showRightIcon = computed(() => hasRightIconSlot.value || !!props.rightIcon)
const showClear = computed(() => props.clearable && isInteractive.value && !!displayText.value)

const classNames = computed(() => {
  const list: string[] = []
  if (effectiveDisabled.value) list.push("ui-select--disabled")
  if (effectiveReadonly.value) list.push("ui-select--readonly")
  if (isInvalid.value) list.push("ui-select--error")
  return list
})

const rootStyle = computed(() => useStyle(props.customStyle))

const valueStyle = computed(() => {
  const s: CSSProperties = {}
  if (props.textAlign) s.justifyContent = FLEX_ALIGN_MAP[props.textAlign] ?? "flex-start"
  return useStyle(s)
})

const textStyle = computed(() => {
  const s: CSSProperties = {}
  if (props.textColor) s.color = useColor(props.textColor)
  if (props.textSize !== undefined) s.fontSize = useUnit(props.textSize)
  if (props.textWeight !== undefined) s.fontWeight = props.textWeight as CSSProperties["fontWeight"]
  return useStyle(s)
})

const placeholderStyle = computed(() => {
  const s: CSSProperties = {}
  if (props.placeholderColor) s.color = useColor(props.placeholderColor)
  if (props.textSize !== undefined) s.fontSize = useUnit(props.textSize)
  if (props.textWeight !== undefined) s.fontWeight = props.textWeight as CSSProperties["fontWeight"]
  return useStyle(s, "string")
})

// 展示元数据 (复用 columnsType 不重复算)
const displayMeta = computed(() => buildDisplayMeta(currentValue.value, props.columns, resolvedFields.value, columnsType.value))

const displayPayload = computed<SelectDisplayPayload>(() => ({
  values: currentValue.value,
  indexs: displayMeta.value.indexs,
  columns: displayMeta.value.columns,
  texts: displayMeta.value.texts,
}))

const displayText = computed(() => {
  if (props.displayFormatter) {
    const formatted = props.displayFormatter(displayPayload.value)
    return formatted !== undefined && formatted !== null ? String(formatted) : ""
  }
  const texts = displayMeta.value.texts.filter((t) => t !== "" && t !== undefined && t !== null)
  return texts.length ? texts.join(props.displaySeparator) : ""
})

// 外部值 → 内部数组
function parseValue(value: SelectValue | undefined): PickerValue[] {
  if (value === undefined || value === null || value === "") return []
  if (Array.isArray(value)) return value
  return [value]
}

// 内部数组 → 外部值
function formatValue(values: PickerValue[]): SelectValue {
  if (isSingleValueMode.value) return values[0] ?? ""
  return values
}

// 列数据形态识别 (单列/多列/级联)
function getColumnsType(columns: PickerColumn[], fields: Required<PickerColumnFields>): PickerColumnsType {
  const first = columns[0]
  if (first) {
    if (Array.isArray(first)) return "multiple"
    if (fields.children in first) return "cascade"
  }
  return "default"
}

function isEmptyValue(value: PickerValue | undefined) {
  return value === undefined || value === null || value === ""
}

// 找索引：未匹配返回 -1，让上层决定如何处理
function findIndexByValue(list: PickerColumn[], value: PickerValue, fields: Required<PickerColumnFields>) {
  return list.findIndex((item) => item[fields.value] === value)
}

function buildDisplayMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>, type: PickerColumnsType) {
  if (!columns.length || !values.length) return { texts: [], columns: [], indexs: [] }
  if (type === "multiple") return resolveMultipleMeta(values, columns, fields)
  if (type === "cascade") return resolveCascadeMeta(values, columns, fields)
  return resolveDefaultMeta(values, columns, fields)
}

function resolveDefaultMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  if (isEmptyValue(values[0])) return { texts: [], columns: [], indexs: [] }
  const list = columns as PickerColumn[]
  const index = findIndexByValue(list, values[0], fields)
  if (index < 0) return { texts: [], columns: [], indexs: [] }
  const selected = list[index]
  return {
    texts: selected?.[fields.text] ? [selected[fields.text]] : [],
    columns: selected ? [selected] : [],
    indexs: [index],
  }
}

function resolveMultipleMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  const texts: Array<string | number> = []
  const selectedColumns: PickerColumn[] = []
  const indexs: number[] = []
  const columnList = columns as PickerColumn[][]
  columnList.forEach((column, colIndex) => {
    const value = values[colIndex]
    if (isEmptyValue(value)) return
    const index = findIndexByValue(column, value, fields)
    if (index < 0) return
    const selected = column[index]
    texts.push(selected[fields.text])
    selectedColumns.push(selected)
    indexs.push(index)
  })
  return { texts, columns: selectedColumns, indexs }
}

function resolveCascadeMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  const texts: Array<string | number> = []
  const selectedColumns: PickerColumn[] = []
  const indexs: number[] = []
  let cursor: PickerColumn[] | undefined = columns
  for (const value of values) {
    if (!cursor?.length || isEmptyValue(value)) break
    const index = findIndexByValue(cursor, value, fields)
    if (index < 0) break
    const selected = cursor[index]
    texts.push(selected[fields.text])
    selectedColumns.push(selected)
    indexs.push(index)
    cursor = selected[fields.children] as PickerColumn[]
  }
  return { texts, columns: selectedColumns, indexs }
}

async function handleClick() {
  if (!isInteractive.value) return
  emits("click")
  // 规避 popup 内部 transition 状态机可能残留 visible，强制 false → nextTick → true 触发响应
  if (visible.value) {
    visible.value = false
    await nextTick()
  }
  visible.value = true
}

// 清除按钮：清空值并触发 form-item 校验
function handleClear() {
  if (!isInteractive.value) return
  const empty = isSingleValueMode.value ? "" : []
  emits("update:modelValue", empty)
  emits("clear")
  parent?.onChange(empty)
}

function handleUpdateShow(show: boolean) {
  visible.value = show
  if (!show) {
    if (lastAction.value !== null) {
      lastAction.value = null
      return
    }
    parent?.onBlur(formatValue(currentValue.value))
  }
}

function handleUpdateValue(value: SelectValue) {
  // picker 已按单/多模式 format 过，select 直接透传，无需再 format
  emits("update:modelValue", value)
}

function handleChange(data: PickerChangeData) {
  emits("change", data)
}

function handleCancel(data: PickerCancelData) {
  lastAction.value = "cancel"
  emits("cancel", data)
  parent?.onBlur(formatValue(currentValue.value))
}

function handleConfirm(data: PickerConfirmData) {
  lastAction.value = "confirm"
  emits("confirm", data)
  parent?.onChange(formatValue(data.values))
}

function open() {
  if (!isInteractive.value) return
  visible.value = true
}
function close() {
  visible.value = false
}
function confirm() {
  pickerRef.value?.confirm()
}
function cancel() {
  pickerRef.value?.cancel()
}
function getSelectedValues() {
  return pickerRef.value?.getSelectedValues() ?? []
}
function getSelectedIndexs() {
  return pickerRef.value?.getSelectedIndexs() ?? []
}
function getSelectedColumns() {
  return pickerRef.value?.getSelectedColumns() ?? []
}

defineExpose({
  name: "ui-select",
  open,
  close,
  confirm,
  cancel,
  getSelectedValues,
  getSelectedIndexs,
  getSelectedColumns,
})
</script>

<script lang="ts">
export default {
  name: "ui-select",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-select {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  &--disabled {
    opacity: var(--ui-opacity-disabled);
  }

  // 校验失败：仅已选值文字标红 (placeholder 保持灰，由 form-item 底部红字提示)
  &--error {
    .ui-select__text {
      color: var(--ui-color-danger);
    }
  }

  &__trigger {
    gap: var(--ui-spacing-sm);
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;

    &.ui-select--active {
      opacity: var(--ui-opacity-active);
    }
  }

  &__value {
    flex: 1;
    display: flex;
    overflow: hidden;
    align-items: center;
  }

  &__text {
    color: var(--ui-color-text);
    overflow: hidden;
    font-size: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__placeholder {
    color: var(--ui-color-text-secondary);
    font-size: inherit;
  }

  &__icon {
    display: flex;
    align-items: center;
  }

  &__clear {
    display: flex;
    transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);
    align-items: center;

    &--active {
      opacity: var(--ui-opacity-active);
    }
  }
}
</style>
