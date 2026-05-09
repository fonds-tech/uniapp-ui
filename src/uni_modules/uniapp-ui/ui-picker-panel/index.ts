import type PickerPanel from "./ui-picker-panel.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("picker-panel", {
  modelValue: () => [],
  columns: () => [],
  loading: false,
  columnFields: () => ({ text: "text", value: "value", children: "children" }),
  columnHeight: undefined,
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  // picker-view 原生属性透传
  indicatorClass: undefined,
  maskStyle: undefined,
  maskTopStyle: undefined,
  maskBottomStyle: undefined,
  maskClass: undefined,
  immediateChange: true,
  customClass: "",
  customStyle: "",
})

export const pickerPanelProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: Array as PropType<PickerValue[]> }),
  /** 列数据 */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /** 加载中 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 字段映射 */
  columnFields: defaultProps("columnFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
  /** 选项高度 */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /** 可见选项数 */
  visibleColumnNum: defaultProps("visibleColumnNum", { type: [Number, String] }),
  /** 选项字号 */
  columnSize: defaultProps("columnSize", { type: [Number, String] }),
  /** 选项颜色 */
  columnColor: defaultProps("columnColor", { type: String }),
  /** 选项字重 */
  columnWeight: defaultProps("columnWeight", { type: [Number, String] }),
  /** 激活选项字号 */
  activeColumnSize: defaultProps("activeColumnSize", { type: [Number, String] }),
  /** 激活选项颜色 */
  activeColumnColor: defaultProps("activeColumnColor", { type: String }),
  /** 激活选项字重 */
  activeColumnWeight: defaultProps("activeColumnWeight", { type: [Number, String] }),
  /** picker-view 选中框类名 */
  indicatorClass: defaultProps("indicatorClass", { type: String }),
  /** 蒙层样式 */
  maskStyle: defaultProps("maskStyle", { type: String }),
  /** 蒙层上半样式 (仅 app-nvue) */
  maskTopStyle: defaultProps("maskTopStyle", { type: String }),
  /** 蒙层下半样式 (仅 app-nvue) */
  maskBottomStyle: defaultProps("maskBottomStyle", { type: String }),
  /** 蒙层类名 */
  maskClass: defaultProps("maskClass", { type: String }),
  /** 手指松开立即触发 change */
  immediateChange: defaultProps("immediateChange", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] }),
}

export const pickerPanelEmits = {
  /** 值变化 */
  change: (data: PickerChangeData) => !!data,
  /** 绑定值更新 */
  "update:modelValue": (value: PickerValue[]) => Array.isArray(value),
  /** 滚动开始 */
  pickstart: () => true,
  /** 滚动结束 */
  pickend: () => true,
}

/** 选项值类型 */
export type PickerValue = string | number

/** 列形态 */
export type PickerColumnsType = "default" | "multiple" | "cascade"

/** change 事件数据 */
export interface PickerChangeData {
  values: PickerValue[]
  value: PickerValue
  indexs: number[]
  index: number
  columns: PickerColumn[]
}

/** picker-view change 事件 */
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
