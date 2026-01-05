import type DateRangeSelect from "./ui-date-range-select.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import type {
  PopupMode,
  DatePickerCancelData,
  DatePickerChangeData,
  DatePickerColumnType,
  DatePickerConfirmData,
  DatePickerColumnFilter,
  DatePickerColumnFormatter,
} from "../ui-date-picker"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 日期区间选择器值类型
 */
export type DateRangeSelectValue = [string, string] | []

/**
 * 当前选择的类型（开始/结束）
 */
export type DateRangeSelectActiveType = "start" | "end"

/**
 * 展示文案格式化函数
 */
export type DateRangeSelectDisplayFormatter = (value: string, type: DateRangeSelectActiveType) => string

/**
 * 区间变化事件数据
 */
export interface DateRangeSelectChangeData {
  type: DateRangeSelectActiveType
  value: string
  range: DateRangeSelectValue
  selectedValues: string[]
  selectedIndexes: number[]
}

/**
 * 区间确认事件数据
 */
export interface DateRangeSelectConfirmData {
  range: DateRangeSelectValue
  startValue: string
  endValue: string
}

/**
 * 区间取消事件数据
 */
export interface DateRangeSelectCancelData {
  range: DateRangeSelectValue
}

export const [dateRangeSelectProps, useDateRangeSelectProps] = createProps("dateRangeSelect", {
  // ===== 基础 Props =====
  /**
   * 绑定日期区间值 [开始日期, 结束日期]
   */
  modelValue: {
    type: Array as unknown as PropType<DateRangeSelectValue>,
    default: () => [],
  },
  /**
   * 开始日期占位文案
   */
  startPlaceholder: makeStringProp("开始日期"),
  /**
   * 结束日期占位文案
   */
  endPlaceholder: makeStringProp("结束日期"),
  /**
   * 分隔符
   */
  separator: makeStringProp("至"),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否只读
   */
  readonly: Boolean,

  // ===== 日期配置 Props（透传 ui-date-picker）=====
  /**
   * 列类型
   */
  columns: {
    type: Array as PropType<DatePickerColumnType[]>,
    default: () => ["year", "month", "day"],
  },
  /**
   * 最小日期
   */
  minDate: {
    type: [String, Date, Number] as PropType<string | Date | number>,
    default: undefined,
  },
  /**
   * 最大日期
   */
  maxDate: {
    type: [String, Date, Number] as PropType<string | Date | number>,
    default: undefined,
  },
  /**
   * 日期格式
   */
  format: makeStringProp("YYYY-MM-DD"),
  /**
   * 选项过滤函数
   */
  columnFilter: {
    type: Function as PropType<DatePickerColumnFilter>,
  },
  /**
   * 选项格式化函数
   */
  columnFormatter: {
    type: Function as PropType<DatePickerColumnFormatter>,
  },

  // ===== 弹窗配置 Props =====
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

  // ===== Header 配置 Props =====
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

  // ===== Picker 样式 Props =====
  /**
   * 选项高度
   */
  columnHeight: makeNumericProp("88rpx"),
  /**
   * 可见选项数
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

  // ===== 触发区样式 Props =====
  /**
   * 展示文案格式化
   */
  displayFormatter: Function as PropType<DateRangeSelectDisplayFormatter>,
  /**
   * 右侧图标
   */
  rightIcon: makeStringProp("right"),
  /**
   * 右侧图标大小
   */
  rightIconSize: numericProp,
  /**
   * 右侧图标颜色
   */
  rightIconColor: String,
  /**
   * 右侧图标粗细
   */
  rightIconWeight: numericProp,
  /**
   * 文案颜色
   */
  textColor: String,
  /**
   * 占位文案颜色
   */
  placeholderColor: String,
  /**
   * 文案大小
   */
  textSize: numericProp,
  /**
   * 文案字重
   */
  textWeight: numericProp,
  /**
   * 分隔符颜色
   */
  separatorColor: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const dateRangeSelectEmits = {
  "update:modelValue": (value: DateRangeSelectValue) => value,
  open: () => true,
  opened: () => true,
  close: (action: string) => action,
  closed: (action: string) => action,
  change: (data: DateRangeSelectChangeData) => data,
  cancel: (data: DateRangeSelectCancelData) => data,
  confirm: (data: DateRangeSelectConfirmData) => data,
  click: (type: DateRangeSelectActiveType) => type,
}

export type DateRangeSelectEmits = typeof dateRangeSelectEmits
export type DateRangeSelectProps = ExtractPropTypes<typeof dateRangeSelectProps>
export type DateRangeSelectInstance = InstanceType<typeof DateRangeSelect>

// 重新导出类型
export type { DatePickerCancelData, DatePickerChangeData, DatePickerColumnType, DatePickerConfirmData }
