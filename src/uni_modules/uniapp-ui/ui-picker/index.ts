import type Picker from "./ui-picker.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { PickerValue, PickerColumn, PickerChangeData, PickerColumnsType, PickerColumnFields } from "../ui-picker-panel"
import { buildDefaultProps } from "../utils/props"

// 重新导出这些类型供其他文件使用
export type { PickerChangeData, PickerColumn, PickerColumnFields, PickerColumnsType, PickerValue }

/**
 * 选择器绑定值类型：单列为单值，多列/级联为数组
 */
export type PickerModelValue = PickerValue | PickerValue[]

// Popup 模式类型
export type PopupMode = "top" | "bottom" | "left" | "right" | "center"

/**
 * ui-picker Props 定义
 * 使用 buildProps 工具函数,与 ui-picker-panel 保持一致
 */
const defaultProps = buildDefaultProps("picker", {
  show: false,
  mode: "bottom",
  borderRadius: "16rpx",
  closeOnClickOverlay: true,
  overlay: true,
  duration: 300,
  zIndex: undefined,
  background: undefined,
  safeAreaInsetBottom: true,
  showHeader: true,
  title: undefined,
  cancelText: "取消",
  confirmText: "确认",
  modelValue: undefined,
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

export const pickerProps = {
  /**
   * 是否显示弹窗
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 弹窗位置
   */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /**
   * 圆角大小
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 是否显示遮罩
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 动画时长
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 弹窗层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 底部安全区
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /**
   * 是否显示头部
   */
  showHeader: defaultProps("showHeader", { type: Boolean }),
  /**
   * 标题
   */
  title: defaultProps("title", { type: String }),
  /**
   * 取消按钮文字
   */
  cancelText: defaultProps("cancelText", { type: String }),
  /**
   * 确认按钮文字
   */
  confirmText: defaultProps("confirmText", { type: String }),
  /**
   * 绑定值
   * - 单列模式：string | number
   * - 多列/级联模式：(string | number)[]
   */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] as PropType<PickerModelValue> }),
  /**
   * 列数据
   */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /**
   * 是否加载中
   */
  loading: defaultProps("loading", { type: Boolean }),
  /**
   * 字段映射
   */
  columnFields: defaultProps("columnFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
  /**
   * 选项高度
   */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /**
   * 可见选项数
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
/**
 * 取消事件数据
 */
export interface PickerCancelData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

/**
 * 确认事件数据
 */
export interface PickerConfirmData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

export const pickerEmits = {
  // Popup 事件
  "update:show": (show: boolean) => true,
  open: () => true,
  opened: () => true,
  close: (action: string) => true,
  closed: (action: string) => true,

  // Panel 事件
  change: (data: PickerChangeData) => data,
  "update:modelValue": (value: PickerModelValue) => value,

  // Picker 特有事件
  cancel: (data: PickerCancelData) => data,
  confirm: (data: PickerConfirmData) => data,
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmits = typeof pickerEmits
export type PickerInstance = InstanceType<typeof Picker>
