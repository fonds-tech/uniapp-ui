<template>
  <view class="ui-picker-panel" :class="[customClass]" :style="[style]">
    <view v-if="loading" class="ui-picker-panel__loading">
      <ui-loading size="40rpx" />
    </view>
    <picker-view v-if="visible" class="ui-picker-panel__view" :style="[viewStyle]" :indicator-style="indicatorStyle" :value="selectedIndexes" @change="onChange">
      <picker-view-column v-for="(column, columnIndex) in columns" :key="columnIndex" class="ui-picker-panel__columns">
        <view
          v-for="(item, index) in column"
          :key="index"
          class="ui-picker-panel__columns__column"
          :class="{ 'is-active': isActiveColumn(columnIndex, index) }"
          :style="[columnStyle(columnIndex, index)]"
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
import { ref, watch, computed, nextTick } from "vue"
import { pickerPanelEmits, pickerPanelProps } from "./index"
import { useUnit, useColor, useStyle, useUnitToPx } from "../hooks"

defineOptions({ name: "ui-picker-panel" })

const props = defineProps(pickerPanelProps)
const emits = defineEmits(pickerPanelEmits)
// 当前选中的值列表，与列索引一一对应
const selectedValues = ref<(string | number)[]>([])
// 当前选中索引，用于驱动 picker-view
const selectedIndexes = ref<number[]>([])
// 记录上一次索引，用于计算变更列
const prevSelectedIndexes = ref<number[]>([])

// visible 改为计算属性，避免无数据时渲染
const visible = computed(() => selectedIndexes.value.length > 0 && columns.value.length > 0)

// 列类型：单列 / 多列 / 级联
const columnsType = computed<PickerColumnsType>(() => getColumnsType(props.columns, resolvedFields.value))
// 统一字段映射，兼容自定义字段名
const resolvedFields = computed(() => mergeFields(props.columnFields))
const columns = computed<PickerColumn[]>(() => {
  const { columns } = props
  if (columns.length) {
    switch (columnsType.value) {
      case "multiple":
        return columns
      case "cascade":
        // 级联模式下，需要根据已选值动态计算每一列
        return formatCascadeColumns(columns, resolvedFields.value, selectedValues.value)
      default:
        return [columns]
    }
  }
  return []
})

const style = computed(() => useStyle(props.customStyle))

const viewStyle = computed(() => {
  return useStyle(
    {
      // 视图高度 = 单列高度 * 可见列数
      height: `${useUnitToPx(props.columnHeight) * +props.visibleColumnNum}px`,
    },
    "string",
  )
})

const indicatorStyle = computed(() => {
  return useStyle(
    {
      // 指示器高度与单列高度保持一致
      height: useUnit(props.columnHeight),
    },
    "string",
  )
})

// 复用 isActiveColumn 判断逻辑，减少重复计算
const columnStyle = computed(() => {
  return (columnIndex: string | number, index: string | number) => {
    const isActive = isActiveColumn.value(columnIndex, index)
    return useStyle({
      fontSize: useUnit(isActive ? props.activeColumnSize : props.columnSize),
      color: isActive ? useColor(props.activeColumnColor) : useColor(props.columnColor),
      fontWeight: isActive ? props.activeColumnWeight : props.columnWeight,
    })
  }
})

const isActiveColumn = computed(() => {
  return (columnIndex: string | number, index: string | number) => {
    // 通过列索引对比判定是否高亮
    return selectedIndexes.value[Number(columnIndex)] === Number(index)
  }
})

watch(
  () => props.modelValue,
  (val) => {
    selectedValues.value = val
  },
  { immediate: true },
)

watch(
  () => columns.value,
  () => syncSelectedIndexes(),
  { immediate: true },
)

/**
 * 处理选择变更事件
 * @param data - 选择器变更事件
 */
function onChange(data: PickerChangeEvent) {
  const { value } = data.detail
  // 找到第一个变更的列索引，用于后续联动处理
  const index = Math.max(
    value.findIndex((val: number, idx: number) => val !== prevSelectedIndexes.value[idx]),
    0,
  )

  // 边界检查：确保访问安全
  const selectedValue = columns.value[index]?.[value[index]]?.[resolvedFields.value.value]
  if (selectedValue !== undefined) {
    setSelectedValue(index, selectedValue)
  }

  if (columnsType.value === "cascade") {
    // 级联模式下：修正后续列的值，保证每列都有有效选中项
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

/**
 * 设置指定列的选中值
 * @param index - 列索引
 * @param value - 需要设置的值
 */
// 只在值发生变化时更新，避免多余触发
function setSelectedValue(index: number, value: string | number) {
  if (selectedValues.value[index] !== value) {
    const newValues = selectedValues.value.slice(0)
    newValues[index] = value
    selectedValues.value = newValues
  }
}

/**
 * 获取当前选中的值数组
 * @returns 选中的值列表
 */
// 获取选中的值数组，包含边界兜底
function getSelectedValues(): (string | number)[] {
  return selectedIndexes.value.map((selectedIdx: number, colIndex: number) => columns.value[colIndex]?.[selectedIdx]?.[resolvedFields.value.value] ?? "")
}

/**
 * 获取当前选中的列项
 * @returns 选中的列数据
 */
// 获取选中的列数据，过滤空项
function getSelectedColumns(): PickerColumn[] {
  return selectedIndexes.value.map((selectedIdx: number, index: number) => columns.value[index]?.[selectedIdx]).filter((col): col is PickerColumn => col !== undefined)
}

/**
 * 根据 selectedValues 同步索引，保证 UI 与值一致
 */
function syncSelectedIndexes() {
  // 根据 selectedValues 反推出索引，保证 UI 与值同步
  selectedIndexes.value = columns.value.map((column, index) => {
    const findIndex = column.findIndex((item: PickerColumn) => item[resolvedFields.value.value] === selectedValues.value[index])
    return Math.max(findIndex, 0)
  })
  prevSelectedIndexes.value = selectedIndexes.value.slice()
}

/**
 * 合并字段映射，生成统一字段结构
 * @param fields - 外部传入的字段映射
 * @returns 统一字段映射
 */
function mergeFields(fields: PickerColumnFields) {
  // 默认字段映射，允许用户覆盖
  return merge({ text: "text", value: "value", children: "children" }, fields)
}

/**
 * 判断列数据类型（单列 / 多列 / 级联）
 * @param columns - 列数据
 * @param fields - 字段映射
 * @returns 列数据类型
 */
function getColumnsType(columns: PickerColumn[], fields: PickerColumnFields): PickerColumnsType {
  const firstColumn = columns[0]
  if (firstColumn) {
    // 二维数组 => 多列；存在 children => 级联
    if (Array.isArray(firstColumn)) return "multiple"
    if (fields.children in firstColumn) return "cascade"
  }
  return "default"
}

/**
 * 在列中按值查找项
 * @param columns - 列数据
 * @param value - 目标值
 * @param fields - 字段映射
 * @returns 匹配的列项
 */
// 添加类型标注，消除 any
function findColumnByValue(columns: PickerColumn[] | undefined, value: string | number, fields: Required<PickerColumnFields>): PickerColumn | undefined {
  return columns?.find((column: PickerColumn) => column[fields.value] === value)
}

/**
 * 生成级联列结构（按选中值逐级展开）
 * @param columns - 级联原始数据
 * @param fields - 字段映射
 * @param selectedValues - 当前选中值
 * @returns 级联列数组
 */
function formatCascadeColumns(columns: PickerColumn[], fields: Required<PickerColumnFields>, selectedValues: (string | number)[]) {
  const formatted: PickerColumn[] = []

  let index = 0
  let column = { [fields.children]: columns }
  while (column && column[fields.children]) {
    const value = selectedValues[index]
    const children = column[fields.children]
    // 优先按选中值定位当前级，找不到则降级到第一项
    column = isNoEmpty(value) ? findColumnByValue(children, value, fields) : undefined
    if (!column && children.length) {
      column = findColumnByValue(children, children[0]?.[fields.value], fields)
    }

    index++
    formatted.push(children)
  }

  return formatted
}

defineExpose({
  name: "ui-picker-panel",
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
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-picker-panel {
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
    align-items: center;
    justify-content: center;
    background-color: rgb(255 255 255 / 60%);
  }

  &__columns {
    &__column {
      display: flex;
      overflow: hidden;
      transition:
        font-size 0.15s ease,
        color 0.15s ease,
        font-weight 0.15s ease;
      align-items: center;
      white-space: nowrap;
      justify-content: center;
    }
  }
}
</style>
