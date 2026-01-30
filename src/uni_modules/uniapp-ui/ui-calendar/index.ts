import type Calendar from "./ui-calendar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

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

const defaultProps = buildDefaultProps("calendar", {
  show: false,
  type: "single",
  title: "日期选择",
  minDate: undefined,
  maxDate: undefined,
  defaultDate: undefined,
  formatter: undefined,
  showConfirm: true,
  confirmText: "确定",
  confirmDisabledText: "请选择日期",
  showTitle: true,
  showSubtitle: true,
  firstDayOfWeek: 0,
  readonly: false,
  poppable: true,
  maxRange: undefined,
  rangePrompt: undefined,
  color: undefined,
  showMark: false,
  closeOnClickOverlay: true,
  closeable: false,
  borderRadius: "16rpx",
  zIndex: undefined,
  safeAreaInsetBottom: true,
  markedDates: () => [],
  customStyle: "",
  customClass: undefined,
})

export const calendarProps = {
  /**
   * 是否显示日历（弹层模式）
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 选择类型
   * - single: 单选
   * - multiple: 多选
   * - range: 范围选择
   */
  type: defaultProps("type", { type: String as PropType<CalendarType> }),
  /**
   * 日历标题
   */
  title: defaultProps("title", { type: String }),
  /**
   * 最小可选日期（时间戳或 Date 对象）
   */
  minDate: defaultProps("minDate", { type: [Number, Date] as PropType<number | Date> }),
  /**
   * 最大可选日期（时间戳或 Date 对象）
   */
  maxDate: defaultProps("maxDate", { type: [Number, Date] as PropType<number | Date> }),
  /**
   * 默认选中日期
   * - 单选模式: number | Date
   * - 多选模式: (number | Date)[]
   * - 范围模式: [number | Date, number | Date]
   */
  defaultDate: defaultProps("defaultDate", { type: [Number, Date, Array] as PropType<number | Date | (number | Date)[]> }),
  /**
   * 日期格式化函数
   */
  formatter: defaultProps("formatter", { type: Function as PropType<CalendarFormatter> }),
  /**
   * 是否显示确认按钮
   */
  showConfirm: defaultProps("showConfirm", { type: Boolean }),
  /**
   * 确认按钮文字
   */
  confirmText: defaultProps("confirmText", { type: String }),
  /**
   * 确认按钮禁用文字
   */
  confirmDisabledText: defaultProps("confirmDisabledText", { type: String }),
  /**
   * 是否显示标题
   */
  showTitle: defaultProps("showTitle", { type: Boolean }),
  /**
   * 是否显示副标题（当前年月）
   */
  showSubtitle: defaultProps("showSubtitle", { type: Boolean }),
  /**
   * 周起始日
   * 0-6，0 代表周日，1 代表周一，以此类推
   */
  firstDayOfWeek: defaultProps("firstDayOfWeek", { type: Number }),
  /**
   * 是否只读
   */
  readonly: defaultProps("readonly", { type: Boolean }),
  /**
   * 是否以弹层形式展示
   */
  poppable: defaultProps("poppable", { type: Boolean }),
  /**
   * 范围选择模式下的最大可选天数
   */
  maxRange: defaultProps("maxRange", { type: Number }),
  /**
   * 超过最大可选天数时的提示文案
   */
  rangePrompt: defaultProps("rangePrompt", { type: String }),
  /**
   * 主题色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 是否显示月份背景水印
   */
  showMark: defaultProps("showMark", { type: Boolean }),
  /**
   * 点击遮罩是否关闭弹层
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 是否显示关闭按钮
   */
  closeable: defaultProps("closeable", { type: Boolean }),
  /**
   * 弹层圆角
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 弹层层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 是否开启底部安全区
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /**
   * 需要标记的日期数组 (YYYY-MM-DD 格式)
   */
  markedDates: defaultProps("markedDates", { type: Array as PropType<string[]> }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
}

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

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits
export type CalendarInstance = InstanceType<typeof Calendar>
