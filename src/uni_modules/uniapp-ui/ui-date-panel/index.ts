import type DatePanel from "./ui-date-panel.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** DatePanel 列类型 */
export type DatePanelColumnType = "year" | "month" | "day" | "hour" | "minute" | "second"

/** DatePanel 选项 */
export interface DatePanelOption {
  text: string
  value: string
}

/** 列过滤函数 */
export type DatePanelColumnFilter = (type: string, options: DatePanelOption[], values?: string[]) => DatePanelOption[]

/** 列格式化函数 */
export type DatePanelColumnFormatter = (type: string, option: DatePanelOption) => DatePanelOption

/** 步进配置 */
export type DatePanelSteps = Partial<Record<DatePanelColumnType, number>>

/** 选中值拆解结构 */
export interface DatePanelSelectedDateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

/** 日期变化事件数据 */
export interface DatePanelChangeData {
  value: string
  selectedValues: string[]
  selectedIndexes: number[]
  selectedDateParts: DatePanelSelectedDateParts
}

const defaultProps = buildDefaultProps("date-panel", {
  modelValue: "",
  columns: () => ["year", "month", "day"],
  minDate: undefined,
  maxDate: undefined,
  format: "YYYY-MM-DD HH:mm:ss",
  steps: undefined,
  columnFilter: undefined,
  columnFormatter: (type: string, option: DatePanelOption) => option,
  columnHeight: "88rpx",
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  indicatorClass: undefined,
  maskStyle: undefined,
  maskTopStyle: undefined,
  maskBottomStyle: undefined,
  maskClass: undefined,
  immediateChange: true,
  customClass: undefined,
  customStyle: undefined,
})

export const datePanelProps = {
  /** 绑定日期 */
  modelValue: defaultProps("modelValue", { type: [String, Date, Number] }),
  /** 列类型 */
  columns: defaultProps("columns", { type: Array as PropType<DatePanelColumnType[]> }),
  /** 最小时间 */
  minDate: defaultProps("minDate", { type: [String, Date, Number] }),
  /** 最大时间 */
  maxDate: defaultProps("maxDate", { type: [String, Date, Number] }),
  /** 时间格式 */
  format: defaultProps("format", { type: String }),
  /**
   * 列步进配置
   * @example { minute: 15 } // 15分钟间隔
   * @example { hour: 2, minute: 30 } // 2小时间隔 + 30分钟间隔
   * @example { month: 3 } // 季度选择
   */
  steps: defaultProps("steps", { type: Object as PropType<DatePanelSteps> }),
  /** 选项过滤函数 */
  columnFilter: defaultProps("columnFilter", { type: Function as PropType<DatePanelColumnFilter> }),
  /** 选项格式化函数 */
  columnFormatter: defaultProps("columnFormatter", { type: Function as PropType<DatePanelColumnFormatter> }),
  /** 选项高度 */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /** 可见的选项个数 */
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
  /** 设置选择器中间选中框的类名 */
  indicatorClass: defaultProps("indicatorClass", { type: String }),
  /** 设置蒙层的样式 */
  maskStyle: defaultProps("maskStyle", { type: String }),
  /** 设置蒙层上半部分的样式（仅 app-nvue 支持） */
  maskTopStyle: defaultProps("maskTopStyle", { type: String }),
  /** 设置蒙层下半部分的样式（仅 app-nvue 支持） */
  maskBottomStyle: defaultProps("maskBottomStyle", { type: String }),
  /** 设置蒙层的类名 */
  maskClass: defaultProps("maskClass", { type: String }),
  /** 是否在手指松开时立即触发 change 事件 */
  immediateChange: defaultProps("immediateChange", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const datePanelEmits = {
  /** 值变化事件 */
  change: (data: DatePanelChangeData) => data,
  /** 更新绑定值事件 */
  "update:modelValue": (value: string) => value,
  /** 滚动选择开始事件 */
  pickstart: () => true,
  /** 滚动选择结束事件 */
  pickend: () => true,
}

export type DatePanelProps = ExtractPropTypes<typeof datePanelProps>
export type DatePanelEmits = typeof datePanelEmits
export type DatePanelInstance = InstanceType<typeof DatePanel>
