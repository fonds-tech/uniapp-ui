import type DateRangePicker from "./ui-date-range-picker.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import type { PopupMode, DatePickerColumnType, DatePickerColumnFilter, DatePickerColumnFormatter } from "../ui-date-picker"
import { buildDefaultProps } from "../utils/props"

/** 日期区间选择器值类型 */
export type DateRangePickerValue = [string, string] | []

/** 当前选择的类型（开始/结束） */
export type DateRangePickerActiveType = "start" | "end"

/** 区间变化事件数据 */
export interface DateRangePickerChangeData {
  type: DateRangePickerActiveType
  value: string
  range: DateRangePickerValue
  selectedValues: string[]
  selectedIndexes: number[]
}

/** 区间确认事件数据 */
export interface DateRangePickerConfirmData {
  range: DateRangePickerValue
  startValue: string
  endValue: string
}

/** 区间取消事件数据 */
export interface DateRangePickerCancelData {
  range: DateRangePickerValue
}

const defaultProps = buildDefaultProps("date-range-picker", {
  show: false,
  activeType: "start",
  modelValue: () => [],
  autoSwitchToEnd: true,
  columns: () => ["year", "month", "day"],
  minDate: undefined,
  maxDate: undefined,
  format: "YYYY-MM-DD",
  columnFilter: undefined,
  columnFormatter: undefined,
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
  columnHeight: "88rpx",
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  startPlaceholder: "开始日期",
  endPlaceholder: "结束日期",
  customClass: undefined,
  customStyle: undefined,
})

export const dateRangePickerProps = {
  /** 是否显示弹窗 */
  show: defaultProps("show", { type: Boolean }),
  /** 当前激活类型 */
  activeType: defaultProps("activeType", { type: String as PropType<DateRangePickerActiveType> }),
  /** 绑定日期区间值 [开始日期, 结束日期] */
  modelValue: defaultProps("modelValue", { type: Array as unknown as PropType<DateRangePickerValue> }),
  /** 选择开始日期后自动切换到结束日期 */
  autoSwitchToEnd: defaultProps("autoSwitchToEnd", { type: Boolean }),
  /** 列类型 */
  columns: defaultProps("columns", { type: Array as PropType<DatePickerColumnType[]> }),
  /** 最小日期 */
  minDate: defaultProps("minDate", { type: [String, Date, Number] as PropType<string | Date | number> }),
  /** 最大日期 */
  maxDate: defaultProps("maxDate", { type: [String, Date, Number] as PropType<string | Date | number> }),
  /** 日期格式 */
  format: defaultProps("format", { type: String }),
  /** 选项过滤函数 */
  columnFilter: defaultProps("columnFilter", { type: Function as PropType<DatePickerColumnFilter> }),
  /** 选项格式化函数 */
  columnFormatter: defaultProps("columnFormatter", { type: Function as PropType<DatePickerColumnFormatter> }),
  /** 弹窗位置 */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /** 圆角大小 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 点击遮罩是否关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 是否显示遮罩 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 动画时长 */
  duration: defaultProps("duration", { type: Number }),
  /** 弹窗层级 */
  zIndex: defaultProps("zIndex", { type: Number }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 底部安全区 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 是否显示头部 */
  showHeader: defaultProps("showHeader", { type: Boolean }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 开始日期占位文案（用于头部标签空值展示） */
  startPlaceholder: defaultProps("startPlaceholder", { type: String }),
  /** 结束日期占位文案（用于头部标签空值展示） */
  endPlaceholder: defaultProps("endPlaceholder", { type: String }),
  /** 取消按钮文字 */
  cancelText: defaultProps("cancelText", { type: String }),
  /** 确认按钮文字 */
  confirmText: defaultProps("confirmText", { type: String }),
  /** 选项高度 */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /** 可见选项数 */
  visibleColumnNum: defaultProps("visibleColumnNum", { type: [Number, String] }),
  /** 选项文字大小 */
  columnSize: defaultProps("columnSize", { type: [Number, String] }),
  /** 选项文字颜色 */
  columnColor: defaultProps("columnColor", { type: String }),
  /** 选项文字字重 */
  columnWeight: defaultProps("columnWeight", { type: [Number, String] }),
  /** 激活选项文字大小 */
  activeColumnSize: defaultProps("activeColumnSize", { type: [Number, String] }),
  /** 激活选项文字颜色 */
  activeColumnColor: defaultProps("activeColumnColor", { type: String }),
  /** 激活选项文字字重 */
  activeColumnWeight: defaultProps("activeColumnWeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const dateRangePickerEmits = {
  /** 更新显示状态事件 */
  "update:show": (show: boolean) => show,
  /** 更新绑定值事件 */
  "update:modelValue": (value: DateRangePickerValue) => value,
  /** 打开事件 */
  open: () => true,
  /** 打开动画结束事件 */
  opened: () => true,
  /** 关闭事件 */
  close: (action: string) => action,
  /** 关闭动画结束事件 */
  closed: (action: string) => action,
  /** 值变化事件 */
  change: (data: DateRangePickerChangeData) => data,
  /** 取消事件 */
  cancel: (data: DateRangePickerCancelData) => data,
  /** 确认事件 */
  confirm: (data: DateRangePickerConfirmData) => data,
}

export type DateRangePickerEmits = typeof dateRangePickerEmits
export type DateRangePickerProps = ExtractPropTypes<typeof dateRangePickerProps>
export type DateRangePickerInstance = InstanceType<typeof DateRangePicker>
