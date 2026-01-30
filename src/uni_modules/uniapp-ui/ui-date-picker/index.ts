import type DatePicker from "./ui-date-picker.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

// ==================== 通用类型定义 ====================

/**
 * DatePicker 列类型
 */
export type DatePickerColumnType = "year" | "month" | "day" | "hour" | "minute" | "second"

/**
 * DatePicker 选项
 */
export interface DatePickerOption {
  text: string
  value: string
}

/**
 * 列过滤函数
 */
export type DatePickerColumnFilter = (type: string, options: DatePickerOption[], values?: string[]) => DatePickerOption[]

/**
 * 列格式化函数
 */
export type DatePickerColumnFormatter = (type: string, option: DatePickerOption) => DatePickerOption

/**
 * 日期变化事件数据
 */
export interface DatePickerChangeData {
  value: string
  selectedValues: string[]
  selectedIndexes: number[]
}

// ==================== 组件定义 (ui-date-picker) ====================

// Popup 模式类型
export type PopupMode = "top" | "bottom" | "left" | "right" | "center"

/**
 * UI-Date-Picker Props
 * 完整的日期选择器,集成 ui-popup 和 picker-view
 */
const defaultProps = buildDefaultProps("date-picker", {
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
  modelValue: "",
  columns: () => ["year", "month", "day"],
  minDate: undefined,
  maxDate: undefined,
  format: "YYYY-MM-DD HH:mm:ss",
  columnFilter: undefined,
  columnFormatter: (type: string, option: DatePickerOption) => option,
  columnHeight: "88rpx",
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
})

/**
 * UI-Date-Picker Props
 * 完整的日期选择器,集成 ui-popup 和 picker-view
 */
export const datePickerProps = {
  // ===== Popup 相关 props =====
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
  zIndex: defaultProps("zIndex", { type: Number }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 底部安全区
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),

  // ===== Header 相关 props =====
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

  // ===== Picker 相关 props =====
  /**
   * 绑定日期
   */
  modelValue: defaultProps("modelValue", { type: [String, Date, Number] }),
  /**
   * 列类型
   */
  columns: defaultProps("columns", { type: Array as PropType<DatePickerColumnType[]> }),
  /**
   * 最小时间
   */
  minDate: defaultProps("minDate", { type: [String, Date, Number] }),
  /**
   * 最大时间
   */
  maxDate: defaultProps("maxDate", { type: [String, Date, Number] }),
  /**
   * 时间格式
   */
  format: defaultProps("format", { type: String }),
  /**
   * 选项过滤函数
   */
  columnFilter: defaultProps("columnFilter", { type: Function as PropType<DatePickerColumnFilter> }),
  /**
   * 选项格式化函数
   */
  columnFormatter: defaultProps("columnFormatter", { type: Function as PropType<DatePickerColumnFormatter> }),
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
}
/**
 * 取消/确认事件数据
 */
export interface DatePickerCancelData {
  value: string
  selectedValues: string[]
  selectedIndexes: number[]
}

export interface DatePickerConfirmData {
  value: string
  selectedValues: string[]
  selectedIndexes: number[]
}

/**
 * UI-Date-Picker Emits
 */
export const datePickerEmits = {
  // Popup 事件
  "update:show": (show: boolean) => true,
  open: () => true,
  opened: () => true,
  close: (action: string) => true,
  closed: (action: string) => true,

  // Picker 事件
  change: (data: DatePickerChangeData) => data,
  "update:modelValue": (value: string) => value,

  // 交互事件
  cancel: (data: DatePickerCancelData) => data,
  confirm: (data: DatePickerConfirmData) => data,
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerEmits = typeof datePickerEmits
export type DatePickerInstance = InstanceType<typeof DatePicker>
