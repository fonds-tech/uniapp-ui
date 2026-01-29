import type Calendar from "./ui-calendar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

// ==================== 类型定义 ====================

/**
 * 日历选择模式
 * - single: 单选模式
 * - multiple: 多选模式
 * - range: 范围选择模式
 */
export type CalendarType = "single" | "multiple" | "range"

/**
 * 日历日期项类型
 */
export type CalendarDayType = "normal" | "start" | "middle" | "end" | "selected" | "disabled" | "today"

/**
 * 日历日期项
 */
export interface CalendarDay {
  /** 日期对象 */
  date: Date
  /** 日期类型 */
  type: CalendarDayType
  /** 显示的日期数字 */
  text: string | number
  /** 日期上方的信息 */
  topInfo?: string
  /** 日期下方的信息 */
  bottomInfo?: string
  /** 自定义类名 */
  className?: string
  /** 完整日期字符串 YYYY-MM-DD */
  fullDate: string
  /** 是否是当前月的日期 */
  isCurrentMonth: boolean
  /** 是否禁用 */
  disabled: boolean
  /** 是否选中 */
  selected: boolean
  /** 是否是今天 */
  isToday: boolean
  /** 是否是范围起始 */
  isRangeStart: boolean
  /** 是否是范围结束 */
  isRangeEnd: boolean
  /** 是否在范围内 */
  inRange: boolean
  /** 是否有标记点 */
  hasDot: boolean
}

/**
 * 日期格式化函数
 */
export type CalendarFormatter = (day: CalendarDay) => CalendarDay

/**
 * 月份变化数据
 */
export interface CalendarMonthChangeData {
  year: number
  month: number
  date: Date
}

/**
 * 选择事件数据
 */
export interface CalendarSelectData {
  date: Date | Date[]
  dateStr: string | string[]
}

/**
 * 确认事件数据
 */
export interface CalendarConfirmData {
  date: Date | Date[] | { start: Date; end: Date }
  dateStr: string | string[] | { start: string; end: string }
}

// ==================== Props 定义 ====================

export const calendarProps = {
  /**
   * 是否显示日历（弹层模式）
   */
  show: Boolean,
  /**
   * 选择类型
   * - single: 单选
   * - multiple: 多选
   * - range: 范围选择
   */
  type: makeStringProp<CalendarType>("single"),
  /**
   * 日历标题
   */
  title: makeStringProp("日期选择"),
  /**
   * 最小可选日期（时间戳或 Date 对象）
   */
  minDate: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined,
  },
  /**
   * 最大可选日期（时间戳或 Date 对象）
   */
  maxDate: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined,
  },
  /**
   * 默认选中日期
   * - 单选模式: number | Date
   * - 多选模式: (number | Date)[]
   * - 范围模式: [number | Date, number | Date]
   */
  defaultDate: {
    type: [Number, Date, Array] as PropType<number | Date | (number | Date)[]>,
    default: undefined,
  },
  /**
   * 日期格式化函数
   */
  formatter: {
    type: Function as PropType<CalendarFormatter>,
    default: undefined,
  },
  /**
   * 是否显示确认按钮
   */
  showConfirm: truthProp,
  /**
   * 确认按钮文字
   */
  confirmText: makeStringProp("确定"),
  /**
   * 确认按钮禁用文字
   */
  confirmDisabledText: makeStringProp("请选择日期"),
  /**
   * 是否显示标题
   */
  showTitle: truthProp,
  /**
   * 是否显示副标题（当前年月）
   */
  showSubtitle: truthProp,
  /**
   * 周起始日
   * 0-6，0 代表周日，1 代表周一，以此类推
   */
  firstDayOfWeek: makeNumericProp(0),
  /**
   * 是否只读
   */
  readonly: Boolean,
  /**
   * 是否以弹层形式展示
   */
  poppable: truthProp,
  /**
   * 范围选择模式下的最大可选天数
   */
  maxRange: {
    type: Number,
    default: undefined,
  },
  /**
   * 超过最大可选天数时的提示文案
   */
  rangePrompt: String,
  /**
   * 主题色
   */
  color: String,
  /**
   * 是否显示月份背景水印
   */
  showMark: Boolean,
  /**
   * 点击遮罩是否关闭弹层
   */
  closeOnClickOverlay: truthProp,
  /**
   * 是否显示关闭按钮
   */
  closeable: Boolean,
  /**
   * 弹层圆角
   */
  borderRadius: makeNumericProp("16rpx"),
  /**
   * 弹层层级
   */
  zIndex: numericProp,
  /**
   * 是否开启底部安全区
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 需要标记的日期数组 (YYYY-MM-DD 格式)
   */
  markedDates: makeArrayProp<string>(),
  /**
   * 自定义样式
   */
  customStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: "",
  },
  /**
   * 自定义类名
   */
  customClass: String,
}
// ==================== Emits 定义 ====================

export const calendarEmits = {
  /** 显示状态变化 */
  "update:show": (show: boolean) => true,
  /** 选择日期时触发（未确认） */
  select: (data: CalendarSelectData) => data,
  /** 确认选择时触发 */
  confirm: (data: CalendarConfirmData) => data,
  /** 月份变化时触发 */
  monthChange: (data: CalendarMonthChangeData) => data,
  /** 打开弹层时触发 */
  open: () => true,
  /** 弹层打开完成时触发 */
  opened: () => true,
  /** 关闭弹层时触发 */
  close: () => true,
  /** 弹层关闭完成时触发 */
  closed: () => true,
  /** 点击遮罩时触发 */
  clickOverlay: () => true,
  /** 超过最大可选天数时触发 */
  overRange: () => true,
}

// ==================== 类型导出 ====================

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits
export type CalendarInstance = InstanceType<typeof Calendar>
