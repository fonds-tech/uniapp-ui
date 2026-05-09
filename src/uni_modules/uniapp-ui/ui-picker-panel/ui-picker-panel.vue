<template>
  <view class="ui-picker-panel" :class="[props.customClass]" :style="[props.customStyle]">
    <view v-if="props.loading" class="ui-picker-panel__loading">
      <ui-loading size="40rpx" />
    </view>
    <picker-view
      v-if="visible"
      class="ui-picker-panel__view"
      :style="[viewStyle]"
      :indicator-style="indicatorStyle"
      :indicator-class="props.indicatorClass"
      :mask-style="props.maskStyle"
      :mask-top-style="props.maskTopStyle"
      :mask-bottom-style="props.maskBottomStyle"
      :mask-class="props.maskClass"
      :immediate-change="props.immediateChange"
      :value="selectedIndexes"
      @change="onChange"
      @pickstart="onPickstart"
      @pickend="onPickend"
    >
      <picker-view-column v-for="(column, columnIndex) in columns" :key="columnIndex" class="ui-picker-panel__columns">
        <view
          v-for="(item, index) in column"
          :key="index"
          class="ui-picker-panel__column"
          :class="{ 'ui-picker-panel__column--active': isActiveColumn(columnIndex, index) }"
          :style="[optionBaseStyle, columnStyle(columnIndex, index)]"
        >
          {{ item[resolvedFields.text] }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import type { PickerColumn, PickerChangeEvent, PickerColumnsType, PickerColumnFields } from "./index"
import { merge } from "../utils/utils"
import { isNoEmpty } from "../utils/check"
import { pickerPanelEmits, pickerPanelProps } from "./index"
import { ref, toRaw, watch, computed, nextTick } from "vue"
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-picker-panel" })

const props = defineProps(pickerPanelProps)
const emits = defineEmits(pickerPanelEmits)

const selectedValues = ref<(string | number)[]>([])
const selectedIndexes = ref<number[]>([])
const prevSelectedIndexes = ref<number[]>([])

// 无数据时不渲染 picker-view
const visible = computed(() => selectedIndexes.value.length > 0 && columns.value.length > 0)
// 字段映射
const resolvedFields = computed(() => mergeFields(props.columnFields))
// 列类型 (单/多/级联)
const columnsType = computed<PickerColumnsType>(() => getColumnsType(props.columns, resolvedFields.value))
// 标准化列数据
const columns = computed<PickerColumn[]>(() => {
  const list = props.columns
  if (!list.length) return []
  switch (columnsType.value) {
    case "multiple":
      return list
    case "cascade":
      return formatCascadeColumns(list, resolvedFields.value, selectedValues.value)
    default:
      return [list]
  }
})
// 单项高度像素 (统一 px 避免 rpx 转换误差;未传时回落到 88rpx)
const itemHeightPx = computed(() => {
  const h = props.columnHeight
  if (h === undefined || h === "") return useUnitToPx("88rpx") ?? 0
  return useUnitToPx(h) ?? 0
})
// picker-view 总高
const viewStyle = computed(() => useStyle({ height: `${itemHeightPx.value * +props.visibleColumnNum}px` }, "string"))
// indicator 高度
const indicatorStyle = computed(() => useStyle({ height: `${itemHeightPx.value}px` }, "string"))
// 行高与 indicator 像素对齐
const optionBaseStyle = computed(() => useStyle({ height: `${itemHeightPx.value}px`, lineHeight: `${itemHeightPx.value}px` }))
// 单项动态样式 (active 与否)
const columnStyle = computed(() => (columnIndex: string | number, index: string | number) => {
  const active = isActiveColumn.value(columnIndex, index)
  return useStyle({
    fontSize: useUnit(active ? props.activeColumnSize : props.columnSize),
    color: active ? useColor(props.activeColumnColor) : useColor(props.columnColor),
    fontWeight: active ? props.activeColumnWeight : props.columnWeight,
  })
})
// 是否激活列
const isActiveColumn = computed(() => (columnIndex: string | number, index: string | number) => selectedIndexes.value[Number(columnIndex)] === Number(index))

watch(
  () => props.modelValue,
  (val) => (selectedValues.value = val),
  { immediate: true },
)
watch(
  () => columns.value,
  () => syncSelectedIndexes(),
  { immediate: true },
)

function onChange(data: PickerChangeEvent) {
  const { value } = data.detail
  // 第一个变更列索引
  const index = Math.max(
    value.findIndex((v: number, i: number) => v !== prevSelectedIndexes.value[i]),
    0,
  )

  const selected = columns.value[index]?.[value[index]]?.[resolvedFields.value.value]
  if (selected !== undefined) setSelectedValue(index, selected)

  if (columnsType.value === "cascade") {
    // 级联:修正后续列保证有效
    const len = selectedValues.value.length
    for (let i = 0; i < len; i++) {
      const column = columns.value[i] as PickerColumn[]
      if (!findColumnByValue(column, selectedValues.value[i], resolvedFields.value)) {
        setSelectedValue(i, column?.[0]?.[resolvedFields.value.value] ?? "")
      }
    }
  }

  syncSelectedIndexes()

  emits("change", {
    values: getSelectedValues(),
    value: columns.value[index]?.[value[index]]?.[resolvedFields.value.value] ?? "",
    indexs: toRaw(selectedIndexes.value),
    index,
    columns: getSelectedColumns(),
  })
  nextTick(() => emits("update:modelValue", getSelectedValues()))
}

function onPickstart() {
  emits("pickstart")
}

function onPickend() {
  emits("pickend")
}

// 仅在值变化时更新
function setSelectedValue(index: number, value: string | number) {
  if (selectedValues.value[index] !== value) {
    const next = selectedValues.value.slice(0)
    next[index] = value
    selectedValues.value = next
  }
}

function getSelectedValues(): (string | number)[] {
  return selectedIndexes.value.map((idx, col) => columns.value[col]?.[idx]?.[resolvedFields.value.value] ?? "")
}

function getSelectedColumns(): PickerColumn[] {
  return selectedIndexes.value.map((idx, i) => columns.value[i]?.[idx]).filter((c): c is PickerColumn => c !== undefined)
}

// 由 selectedValues 反推 indexes
function syncSelectedIndexes() {
  selectedIndexes.value = columns.value.map((column, i) => {
    const idx = column.findIndex((item: PickerColumn) => item[resolvedFields.value.value] === selectedValues.value[i])
    return Math.max(idx, 0)
  })
  prevSelectedIndexes.value = selectedIndexes.value.slice()
}

function mergeFields(fields: PickerColumnFields) {
  return merge({ text: "text", value: "value", children: "children" }, fields)
}

function getColumnsType(columns: PickerColumn[], fields: PickerColumnFields): PickerColumnsType {
  const first = columns[0]
  if (first) {
    if (Array.isArray(first)) return "multiple"
    if (fields.children in first) return "cascade"
  }
  return "default"
}

function findColumnByValue(columns: PickerColumn[] | undefined, value: string | number, fields: Required<PickerColumnFields>): PickerColumn | undefined {
  return columns?.find((c) => c[fields.value] === value)
}

// 按选中值逐级展开级联列
function formatCascadeColumns(columns: PickerColumn[], fields: Required<PickerColumnFields>, selectedValues: (string | number)[]) {
  const list: PickerColumn[] = []
  let i = 0
  let column = { [fields.children]: columns }
  while (column && column[fields.children]) {
    const value = selectedValues[i]
    const children = column[fields.children]
    column = isNoEmpty(value) ? findColumnByValue(children, value, fields) : undefined
    if (!column && children.length) column = findColumnByValue(children, children[0]?.[fields.value], fields)
    i++
    list.push(children)
  }
  return list
}

defineExpose({
  getSelectedValues,
  getSelectedIndexs: () => selectedIndexes.value,
  getSelectedColumns,
  getColumns: () => columns.value,
  setColumnValue: setSelectedValue,
})
</script>

<script lang="ts">
export default {
  name: "ui-picker-panel",
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
.ui-picker-panel {
  --ui-picker-panel-loading-bg: rgba(255, 255, 255, 0.6);
  --ui-picker-panel-transition-duration: 0.15s;

  display: flex;
  position: relative;
  flex-direction: column;

  &__loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    position: absolute;
    background: var(--ui-picker-panel-loading-bg);
    align-items: center;
    justify-content: center;
  }

  &__column {
    display: flex;
    overflow: hidden;
    transition:
      font-size var(--ui-picker-panel-transition-duration) ease,
      color var(--ui-picker-panel-transition-duration) ease,
      font-weight var(--ui-picker-panel-transition-duration) ease;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
  }
}
</style>
