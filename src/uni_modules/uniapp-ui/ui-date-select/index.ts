import type DateSelect from "./ui-date-select.vue"
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
import { buildDefaultProps } from "../utils/props"

/** 日期选择器值类型 */
export type DateSelectValue = string | Date | number

/** 展示文案格式化函数 */
export type DateSelectDisplayFormatter = (value: string) => string

const defaultProps = buildDefaultProps("date-select", {
  modelValue: "",
  placeholder: "请选择日期",
  disabled: false,
  readonly: false,
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
  displayFormatter: undefined,
  rightIcon: "right",
  rightIconSize: undefined,
  rightIconColor: undefined,
  rightIconWeight: undefined,
  textColor: undefined,
  placeholderColor: undefined,
  textSize: undefined,
  textAlign: "left",
  textWeight: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const dateSelectProps = {
  /** 绑定日期值 */
  modelValue: defaultProps("modelValue", { type: [String, Date, Number] as PropType<DateSelectValue> }),
  /** 占位文案 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 列类型 */
  columns: defaultProps("columns", { type: Array as PropType<DatePickerColumnType[]> }),
  /** 最小日期 */
  minDate: defaultProps("minDate", { type: [String, Date, Number] as PropType<DateSelectValue> }),
  /** 最大日期 */
  maxDate: defaultProps("maxDate", { type: [String, Date, Number] as PropType<DateSelectValue> }),
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
  /** 展示文案格式化 */
  displayFormatter: defaultProps("displayFormatter", { type: Function as PropType<DateSelectDisplayFormatter> }),
  /** 右侧图标 */
  rightIcon: defaultProps("rightIcon", { type: String }),
  /** 右侧图标大小 */
  rightIconSize: defaultProps("rightIconSize", { type: [Number, String] }),
  /** 右侧图标颜色 */
  rightIconColor: defaultProps("rightIconColor", { type: String }),
  /** 右侧图标粗细 */
  rightIconWeight: defaultProps("rightIconWeight", { type: [Number, String] }),
  /** 文案颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 占位文案颜色 */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /** 文案大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文案对齐方向 */
  textAlign: defaultProps("textAlign", { type: String as PropType<"left" | "center" | "right"> }),
  /** 文案字重 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const dateSelectEmits = {
  /** 更新绑定值事件 */
  "update:modelValue": (value: string) => value,
  /** 打开事件 */
  open: () => true,
  /** 打开动画结束事件 */
  opened: () => true,
  /** 关闭事件 */
  close: (action: string) => action,
  /** 关闭动画结束事件 */
  closed: (action: string) => action,
  /** 值变化事件 */
  change: (data: DatePickerChangeData) => data,
  /** 取消事件 */
  cancel: (data: DatePickerCancelData) => data,
  /** 确认事件 */
  confirm: (data: DatePickerConfirmData) => data,
  /** 点击事件 */
  click: () => true,
}

export type DateSelectEmits = typeof dateSelectEmits
export type DateSelectProps = ExtractPropTypes<typeof dateSelectProps>
export type DateSelectInstance = InstanceType<typeof DateSelect>

// 重新导出 DatePicker 类型，方便外部使用
export type { DatePickerCancelData, DatePickerChangeData, DatePickerColumnType, DatePickerConfirmData }
