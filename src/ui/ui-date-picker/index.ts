import type DatePicker from "./ui-date-picker.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { truthProp, buildProps, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

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
export const datePickerProps = buildProps("datePicker", {
  // ===== Popup 相关 props =====
  /**
   * 是否显示弹窗
   */
  show: Boolean,
  /**
   * 弹窗位置
   */
  mode: makeStringProp<PopupMode>("bottom"),
  /**
   * 圆角大小
   */
  borderRadius: makeNumericProp("16rpx"),
  /**
   * 点击遮罩是否关闭
   */
  closeOnClickOverlay: truthProp,
  /**
   * 是否显示遮罩
   */
  overlay: truthProp,
  /**
   * 动画时长
   */
  duration: makeNumericProp(300),
  /**
   * 弹窗层级
   */
  zIndex: Number,
  /**
   * 背景色
   */
  background: String,
  /**
   * 底部安全区
   */
  safeAreaInsetBottom: truthProp,

  // ===== Header 相关 props =====
  /**
   * 是否显示头部
   */
  showHeader: truthProp,
  /**
   * 标题
   */
  title: String,
  /**
   * 取消按钮文字
   */
  cancelText: makeStringProp("取消"),
  /**
   * 确认按钮文字
   */
  confirmText: makeStringProp("确认"),

  // ===== Picker 相关 props =====
  /**
   * 绑定日期
   */
  modelValue: { type: [String, Date, Number], default: "" },
  /**
   * 列类型
   */
  columns: { type: Array as PropType<DatePickerColumnType[]>, default: () => ["year", "month", "day"] },
  /**
   * 最小时间
   */
  minDate: { type: [String, Date, Number], default: undefined },
  /**
   * 最大时间
   */
  maxDate: { type: [String, Date, Number], default: undefined },
  /**
   * 时间格式
   */
  format: makeStringProp("YYYY-MM-DD HH:mm:ss"),
  /**
   * 选项过滤函数
   */
  columnFilter: { type: Function as PropType<DatePickerColumnFilter> },
  /**
   * 选项格式化函数
   */
  columnFormatter: {
    type: Function as PropType<DatePickerColumnFormatter>,
    default: (type: string, option: DatePickerOption) => option,
  },
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
})

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
