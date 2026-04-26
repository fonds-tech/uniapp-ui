import type CalendarPanel from "./ui-calendar-panel.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 日历选择模式 */
export type CalendarPanelType = "single" | "multiple" | "range"

/** 日历日期项类型 */
export type CalendarPanelDayType = "normal" | "start" | "middle" | "end" | "selected" | "disabled" | "today" | "multiple-middle" | "multiple-selected"

/** 日历日期项 */
export interface CalendarPanelDay {
  /** 日期对象 */
  date: Date
  /** 日期类型 */
  type: CalendarPanelDayType
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

/** 日期格式化函数 */
export type CalendarPanelFormatter = (day: CalendarPanelDay) => CalendarPanelDay

/** 月份变化数据 */
export interface CalendarPanelMonthChangeData {
  year: number
  month: number
  date: Date
}

/** 选择事件数据 */
export interface CalendarPanelSelectData {
  date: Date | Date[]
  dateStr: string | string[]
}

/** 确认事件数据 */
export interface CalendarPanelConfirmData {
  date: Date | Date[] | { start: Date; end: Date }
  dateStr: string | string[] | { start: string; end: string }
}

const defaultProps = buildDefaultProps("calendar-panel", {
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
  firstDayOfWeek: 1,
  readonly: false,
  maxRange: undefined,
  rangePrompt: undefined,
  color: undefined,
  showMark: false,
  closeable: false,
  markedDates: () => [],
  customStyle: "",
  customClass: undefined,
})

export const calendarPanelProps = {
  /** 选择类型：single 单选、multiple 多选、range 范围选择 */
  type: defaultProps("type", { type: String as PropType<CalendarPanelType> }),
  /** 日历标题 */
  title: defaultProps("title", { type: String }),
  /** 最小可选日期（时间戳或 Date 对象） */
  minDate: defaultProps("minDate", { type: [Number, Date] as PropType<number | Date> }),
  /** 最大可选日期（时间戳或 Date 对象） */
  maxDate: defaultProps("maxDate", { type: [Number, Date] as PropType<number | Date> }),
  /** 默认选中日期 */
  defaultDate: defaultProps("defaultDate", { type: [Number, Date, Array] as PropType<number | Date | (number | Date)[]> }),
  /** 日期格式化函数 */
  formatter: defaultProps("formatter", { type: Function as PropType<CalendarPanelFormatter> }),
  /** 是否显示确认按钮 */
  showConfirm: defaultProps("showConfirm", { type: Boolean }),
  /** 确认按钮文字 */
  confirmText: defaultProps("confirmText", { type: String }),
  /** 确认按钮禁用文字 */
  confirmDisabledText: defaultProps("confirmDisabledText", { type: String }),
  /** 是否显示标题 */
  showTitle: defaultProps("showTitle", { type: Boolean }),
  /** 是否显示副标题（当前年月） */
  showSubtitle: defaultProps("showSubtitle", { type: Boolean }),
  /** 周起始日，0-6，0 代表周日 */
  firstDayOfWeek: defaultProps("firstDayOfWeek", { type: Number }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 范围选择模式下的最大可选天数 */
  maxRange: defaultProps("maxRange", { type: Number }),
  /** 超过最大可选天数时的提示文案 */
  rangePrompt: defaultProps("rangePrompt", { type: String }),
  /** 主题色 */
  color: defaultProps("color", { type: String }),
  /** 是否显示月份背景水印 */
  showMark: defaultProps("showMark", { type: Boolean }),
  /** 是否显示关闭按钮（与 close 事件配合，由外层 popup 使用） */
  closeable: defaultProps("closeable", { type: Boolean }),
  /** 需要标记的日期数组 (YYYY-MM-DD 格式) */
  markedDates: defaultProps("markedDates", { type: Array as PropType<string[]> }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
}

export const calendarPanelEmits = {
  /** 选择日期时触发（未确认） */
  select: (data: CalendarPanelSelectData) => data,
  /** 确认选择时触发 */
  confirm: (data: CalendarPanelConfirmData) => data,
  /** 月份变化时触发 */
  monthChange: (data: CalendarPanelMonthChangeData) => data,
  /** 超过最大可选天数时触发 */
  overRange: () => true,
  /** 点击关闭按钮时触发 */
  close: () => true,
}

export type CalendarPanelProps = ExtractPropTypes<typeof calendarPanelProps>
export type CalendarPanelEmits = typeof calendarPanelEmits
export type CalendarPanelInstance = InstanceType<typeof CalendarPanel>
