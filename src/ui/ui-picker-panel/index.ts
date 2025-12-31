import type PickerPanel from "./ui-picker-panel.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { buildProps, numericProp, makeArrayProp, makeNumericProp } from "../utils/props"

export const pickerPanelProps = buildProps("pickerPanel", {
  /**
   * 绑定值
   */
  modelValue: makeArrayProp<string | number>(),
  /**
   * 列数据
   */
  columns: makeArrayProp<PickerColumn>(),
  /**
   * 是否显示加载中
   */
  loading: Boolean,
  /**
   * 自定义columns结构中的字段
   */
  columnFields: { type: Object as PropType<Partial<PickerColumnFields>>, default: () => ({ text: "text", value: "value", children: "children" }) },
  /**
   * 选项高度
   */
  columnHeight: makeNumericProp("88rpx"),
  /**
   * 可见的选项个数
   */
  visibleColumnNum: makeNumericProp(5),
  /**
   * 选项文字大小
   */
  columnSize: numericProp,
  /**
   * 选项文字颜色
   */
  columnColor: String,
  /**
   * 选项文字字重
   */
  columnWeight: numericProp,
  /**
   * 激活选项文字大小
   */
  activeColumnSize: numericProp,
  /**
   * 激活选项文字颜色
   */
  activeColumnColor: String,
  /**
   * 激活选项文字字重
   */
  activeColumnWeight: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object],
})

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
