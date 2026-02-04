import type PickerPanel from "./ui-picker-panel.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("picker-panel", {
  modelValue: () => [],
  columns: () => [],
  loading: false,
  columnFields: () => ({ text: "text", value: "value", children: "children" }),
  columnHeight: "88rpx",
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  // picker-view 原生属性
  indicatorClass: undefined,
  maskStyle: undefined,
  maskTopStyle: undefined,
  maskBottomStyle: undefined,
  maskClass: undefined,
  immediateChange: true,
  customClass: undefined,
  customStyle: undefined,
})

export const pickerPanelProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: Array as PropType<PickerValue[]> }),
  /** 列数据 */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /** 是否显示加载中 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 自定义columns结构中的字段 */
  columnFields: defaultProps("columnFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
  /** 选项高度 */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /** 可见的选项个数 */
  visibleColumnNum: defaultProps("visibleColumnNum", { type: [Number, String] }),
  /** 选项文字大小 */
  columnSize: defaultProps("columnSize", { type: [Number, String] }),
  /** 选项文字颜色 */
  columnColor: defaultProps("columnColor", { type: String }),
  /** 选项文字字重 */
  columnWeight: defaultProps("columnWeight", { type: [Number, String] }),
  /** 激活选项文字大小 */
  activeColumnSize: defaultProps("activeColumnSize", { type: [Number, String] }),
  /** 激活选项文字颜色 */
  activeColumnColor: defaultProps("activeColumnColor", { type: String }),
  /** 激活选项文字字重 */
  activeColumnWeight: defaultProps("activeColumnWeight", { type: [Number, String] }),
  /** 设置选择器中间选中框的类名 */
  indicatorClass: defaultProps("indicatorClass", { type: String }),
  /** 设置蒙层的样式 */
  maskStyle: defaultProps("maskStyle", { type: String }),
  /** 设置蒙层上半部分的样式（仅 app-nvue 支持） */
  maskTopStyle: defaultProps("maskTopStyle", { type: String }),
  /** 设置蒙层下半部分的样式（仅 app-nvue 支持） */
  maskBottomStyle: defaultProps("maskBottomStyle", { type: String }),
  /** 设置蒙层的类名 */
  maskClass: defaultProps("maskClass", { type: String }),
  /** 是否在手指松开时立即触发 change 事件 */
  immediateChange: defaultProps("immediateChange", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] }),
}

export const pickerPanelEmits = {
  /** 值变化事件 */
  change: (data: PickerChangeData) => data,
  /** 更新绑定值事件 */
  "update:modelValue": (value: PickerValue[]) => value,
  /** 滚动选择开始事件 */
  pickstart: () => true,
  /** 滚动选择结束事件 */
  pickend: () => true,
}

/** 选项值类型 */
export type PickerValue = string | number

/** 列类型 */
export type PickerColumnsType = "default" | "multiple" | "cascade"

/** change 事件数据接口 */
export interface PickerChangeData {
  values: PickerValue[]
  value: PickerValue
  indexs: number[]
  index: number
  columns: PickerColumn[]
}

/** picker-view change 事件类型定义 */
export interface PickerChangeEvent {
  detail: {
    value: number[]
  }
}

export interface PickerColumn {
  text?: string | number
  value?: string | number
  children?: PickerColumn[]
  [key: string]: any
}

export interface PickerColumnFields {
  text?: string
  value?: string
  children?: string
}

export type PickerPanelEmits = typeof pickerPanelEmits
export type PickerPanelProps = ExtractPropTypes<typeof pickerPanelProps>
export type PickerPanelInstance = InstanceType<typeof PickerPanel>
