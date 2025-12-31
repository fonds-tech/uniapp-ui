<template>
  <view class="ui-select" :class="[classs, props.customClass]" :style="[style]">
    <!-- 可点击的展示区域 -->
    <view class="ui-select__trigger" :hover-class="hoverClass" :hover-stay-time="50" @click="handleClick">
      <view class="ui-select__value" :style="[valueStyle]">
        <slot name="display" :text="displayText" :payload="displayPayload" :placeholder="props.placeholder">
          <text v-if="displayText" class="ui-select__text" :style="[textStyle]">{{ displayText }}</text>
          <text v-else class="ui-select__placeholder" :style="[placeholderStyle]">{{ props.placeholder }}</text>
        </slot>
      </view>
      <view v-if="showRightIcon" class="ui-select__icon">
        <slot name="right-icon">
          <ui-icon :name="props.rightIcon" :size="props.rightIconSize" :color="props.rightIconColor" :weight="props.rightIconWeight" />
        </slot>
      </view>
    </view>

    <!-- Picker 弹窗 -->
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
      <template #footer="slotProps">
        <slot name="footer" v-bind="slotProps" />
      </template>
    </ui-picker>
  </view>
</template>

<script setup lang="ts">
import type { SelectValue, SelectDisplayPayload } from "./index"
import type { PickerValue, PickerColumn, PickerInstance, PickerCancelData, PickerChangeData, PickerColumnsType, PickerConfirmData, PickerColumnFields } from "../ui-picker"
import { merge } from "../utils/utils"
import { formItemKey } from "../ui-form-item"
import { selectEmits, selectProps } from "./index"
import { useUnit, useColor, useStyle, useParent } from "../hooks"

defineOptions({ name: "ui-select" })

const props = defineProps(selectProps)
const emits = defineEmits(selectEmits)
const slots = useSlots()

const { parent } = useParent(formItemKey)

const pickerRef = ref<PickerInstance | null>(null)
const currentValue = ref<PickerValue[]>([])
const lastAction = ref<"confirm" | "cancel" | null>(null)
// 内部管理弹窗显示状态
const visible = ref(false)

/**
 * 判断列数据类型（单列/多列/级联）
 */
const columnsType = computed<PickerColumnsType>(() => {
  return getColumnsType(props.columns, resolvedFields.value)
})

/**
 * 是否为单值模式
 * 单值模式条件：单列选择器 + 非多选模式
 */
const isSingleValueMode = computed(() => {
  return columnsType.value === "default" && !props.multiple
})

const resolvedFields = computed(() => {
  return merge({ text: "text", value: "value", children: "children" }, props.columnsFields) as Required<PickerColumnFields>
})

const isInteractive = computed(() => !props.disabled && !props.readonly)

const classs = computed(() => {
  const list: string[] = []
  if (props.disabled) list.push("ui-select--disabled")
  if (props.readonly) list.push("ui-select--readonly")
  return list
})

const hoverClass = computed(() => {
  return isInteractive.value ? "ui-select--active" : ""
})

const style = computed(() => {
  return useStyle(props.customStyle)
})

const valueStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.textAlign) {
    style.justifyContent = props.textAlign === "left" ? "flex-start" : props.textAlign === "right" ? "flex-end" : "center"
  }
  return useStyle(style)
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

const showRightIcon = computed(() => {
  return Boolean(slots["right-icon"] || props.rightIcon)
})

const displayMeta = computed(() => {
  return buildDisplayMeta(currentValue.value, props.columns, resolvedFields.value)
})

const displayPayload = computed<SelectDisplayPayload>(() => {
  return {
    values: currentValue.value,
    indexs: displayMeta.value.indexs,
    columns: displayMeta.value.columns,
    texts: displayMeta.value.texts,
  }
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    const formatted = props.displayFormatter(displayPayload.value)
    return formatted !== undefined && formatted !== null ? String(formatted) : ""
  }
  const texts = displayMeta.value.texts.filter((text) => text !== "" && text !== undefined && text !== null)
  return texts.length ? texts.join(props.displaySeparator) : ""
})

watch(
  () => props.modelValue,
  (val) => {
    currentValue.value = parseValue(val)
  },
  { immediate: true, deep: true },
)

/**
 * 将外部传入的值解析为内部数组格式
 * @param value 外部值
 * @returns 内部数组格式
 */
function parseValue(value: SelectValue | undefined): PickerValue[] {
  // 空值处理
  if (value === undefined || value === null || value === "") {
    return []
  }
  // 已经是数组
  if (Array.isArray(value)) {
    return value
  }
  // 单值包装为数组
  return [value]
}

/**
 * 将内部数组格式转换为外部期望的格式
 * @param values 内部数组值
 * @returns 外部格式值
 */
function formatValue(values: PickerValue[]): SelectValue {
  // 单值模式时返回第一个值或空字符串
  if (isSingleValueMode.value) {
    return values[0] ?? ""
  }
  // 多选/多列/级联模式返回数组
  return values
}

/**
 * 判断列数据类型（单列/多列/级联）
 * @param columns 列数据
 * @param fields 字段映射
 * @returns 列类型
 */
function getColumnsType(columns: PickerColumn[], fields: Required<PickerColumnFields>): PickerColumnsType {
  const firstColumn = columns[0]
  if (firstColumn) {
    if (Array.isArray(firstColumn)) return "multiple"
    if (fields.children in firstColumn) return "cascade"
  }
  return "default"
}

/**
 * 判断值是否为空
 * @param value 待判断值
 * @returns 是否为空
 */
function isEmptyValue(value: PickerValue | undefined) {
  return value === undefined || value === null || value === ""
}

/**
 * 按值查找列项
 * @param columns 列数据
 * @param value 目标值
 * @param fields 字段映射
 * @returns 匹配列项
 */
function findColumnByValue(columns: PickerColumn[] | undefined, value: PickerValue, fields: Required<PickerColumnFields>) {
  return columns?.find((column: PickerColumn) => column[fields.value] === value)
}

/**
 * 构建展示文案所需的元数据
 * @param values 当前值数组
 * @param columns 列数据
 * @param fields 字段映射
 * @returns 文案元数据
 */
function buildDisplayMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  if (!columns.length || !values.length) {
    return { texts: [], columns: [], indexs: [] }
  }

  const type = getColumnsType(columns, fields)
  if (type === "multiple") {
    return resolveMultipleMeta(values, columns, fields)
  }
  if (type === "cascade") {
    return resolveCascadeMeta(values, columns, fields)
  }
  return resolveDefaultMeta(values, columns, fields)
}

/**
 * 解析单列展示数据
 * @param values 当前值数组
 * @param columns 列数据
 * @param fields 字段映射
 * @returns 展示元数据
 */
function resolveDefaultMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  if (isEmptyValue(values[0])) {
    return { texts: [], columns: [], indexs: [] }
  }
  const list = columns as PickerColumn[]
  const index = list.findIndex((item: PickerColumn) => item[fields.value] === values[0])
  const safeIndex = Math.max(index, 0)
  const selected = list[safeIndex]
  return {
    texts: selected?.[fields.text] ? [selected[fields.text]] : [],
    columns: selected ? [selected] : [],
    indexs: [safeIndex],
  }
}

/**
 * 解析多列展示数据
 * @param values 当前值数组
 * @param columns 列数据
 * @param fields 字段映射
 * @returns 展示元数据
 */
function resolveMultipleMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  const texts: Array<string | number> = []
  const selectedColumns: PickerColumn[] = []
  const indexs: number[] = []

  const columnList = columns as PickerColumn[][]
  columnList.forEach((column: PickerColumn[], colIndex: number) => {
    const value = values[colIndex]
    if (isEmptyValue(value)) return
    const index = column.findIndex((item: PickerColumn) => item[fields.value] === value)
    const safeIndex = Math.max(index, 0)
    const selected = column[safeIndex]
    if (selected) {
      texts.push(selected[fields.text])
      selectedColumns.push(selected)
      indexs.push(safeIndex)
    }
  })

  return { texts, columns: selectedColumns, indexs }
}

/**
 * 解析级联展示数据
 * @param values 当前值数组
 * @param columns 列数据
 * @param fields 字段映射
 * @returns 展示元数据
 */
function resolveCascadeMeta(values: PickerValue[], columns: PickerColumn[], fields: Required<PickerColumnFields>) {
  const texts: Array<string | number> = []
  const selectedColumns: PickerColumn[] = []
  const indexs: number[] = []

  let cursor: PickerColumn[] | undefined = columns
  values.forEach((value) => {
    if (!cursor?.length || isEmptyValue(value)) return
    const matched = findColumnByValue(cursor, value, fields)
    const selected = matched ?? cursor[0]
    const index = cursor.findIndex((item: PickerColumn) => item[fields.value] === selected?.[fields.value])
    const safeIndex = Math.max(index, 0)
    if (selected) {
      texts.push(selected[fields.text])
      selectedColumns.push(selected)
      indexs.push(safeIndex)
      cursor = selected[fields.children] as PickerColumn[]
    }
  })

  return { texts, columns: selectedColumns, indexs }
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
    // 使用格式化后的值触发表单验证
    parent?.onBlur(formatValue(currentValue.value))
    lastAction.value = null
  }
}

/**
 * 同步内部值
 * @param value 选中值
 */
function handleUpdateValue(value: PickerValue[]) {
  currentValue.value = value
  emits("update:modelValue", formatValue(value))
}

/**
 * 透传 change 事件
 * @param data 变更数据
 */
function handleChange(data: PickerChangeData) {
  emits("change", data)
}

/**
 * 取消选择
 * @param data 取消数据
 */
function handleCancel(data: PickerCancelData) {
  lastAction.value = "cancel"
  emits("cancel", data)
  // 使用格式化后的值触发表单验证
  parent?.onBlur(formatValue(currentValue.value))
}

/**
 * 确认选择
 * @param data 确认数据
 */
function handleConfirm(data: PickerConfirmData) {
  lastAction.value = "confirm"
  emits("confirm", data)
  // 使用格式化后的值触发表单验证
  parent?.onChange(formatValue(data.values))
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
  pickerRef.value?.confirm()
}

/**
 * 取消选择
 */
function cancel() {
  pickerRef.value?.cancel()
}

/**
 * 获取选中值
 */
function getSelectedValues() {
  return pickerRef.value?.getSelectedValues() ?? []
}

/**
 * 获取选中索引
 */
function getSelectedIndexs() {
  return pickerRef.value?.getSelectedIndexs() ?? []
}

/**
 * 获取选中列数据
 */
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
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-select {
  flex: 1;
  display: flex;
  flex-direction: column;

  &--disabled {
    opacity: 0.6;
  }

  &__trigger {
    flex: 1;
    display: flex;
    align-items: center;

    &.ui-select--active {
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
    color: #323233;
    overflow: hidden;
    font-size: 28rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__placeholder {
    color: #999999;
    font-size: 28rpx;
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-left: 12rpx;
  }
}
</style>
