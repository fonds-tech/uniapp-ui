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
  customClass: undefined,
  customStyle: undefined,
})

export const pickerPanelProps = {
  /**
   * 绑定值
   */
  modelValue: defaultProps("modelValue", { type: Array as PropType<PickerValue[]> }),
  /**
   * 列数据
   */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /**
   * 是否显示加载中
   */
  loading: defaultProps("loading", { type: Boolean }),
  /**
   * 自定义columns结构中的字段
   */
  columnFields: defaultProps("columnFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
  /**
   * 选项高度
   */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /**
   * 可见的选项个数
   */
  visibleColumnNum: defaultProps("visibleColumnNum", { type: [Number, String] }),
  /**
   * 选项文字大小
   */
  columnSize: defaultProps("columnSize", { type: [Number, String] }),
  /**
   * 选项文字颜色
   */
  columnColor: defaultProps("columnColor", { type: String }),
  /**
   * 选项文字字重
   */
  columnWeight: defaultProps("columnWeight", { type: [Number, String] }),
  /**
   * 激活选项文字大小
   */
  activeColumnSize: defaultProps("activeColumnSize", { type: [Number, String] }),
  /**
   * 激活选项文字颜色
   */
  activeColumnColor: defaultProps("activeColumnColor", { type: String }),
  /**
   * 激活选项文字字重
   */
  activeColumnWeight: defaultProps("activeColumnWeight", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] }),
}
export const pickerPanelEmits = {
  change: (data: PickerChangeData) => data,
  "update:modelValue": (value: PickerValue[]) => value,
}

/**
 * 选项值类型
 */
export type PickerValue = string | number

/**
 * 列类型
 */
export type PickerColumnsType = "default" | "multiple" | "cascade"

/**
 * change 事件数据接口
 */
export interface PickerChangeData {
  values: PickerValue[]
  value: PickerValue
  indexs: number[]
  index: number
  columns: PickerColumn[]
}

/**
 * picker-view change 事件类型定义
 */
export interface PickerChangeEvent {
  detail: {
    value: number[]
  }
}

export interface PickerColumn {
  text?: string | number
  value?: string | number
  children?: PickerColumn[]
  // 使用更宽松的索引签名以支持动态字段
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
