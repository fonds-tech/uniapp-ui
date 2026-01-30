import type Select from "./ui-select.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import type { PopupMode, PickerValue, PickerColumn, PickerCancelData, PickerChangeData, PickerConfirmData, PickerColumnFields } from "../ui-picker"
import { buildDefaultProps } from "../utils/props"

/**
 * 选择器值类型：单选为单值，多选/级联/多列为数组
 */
export type SelectValue = PickerValue | PickerValue[]

/**
 * 展示文案格式化入参
 */
export interface SelectDisplayPayload {
  /**
   * 当前选中值数组
   */
  values: PickerValue[]
  /**
   * 当前选中索引数组
   */
  indexs: number[]
  /**
   * 当前选中列项
   */
  columns: PickerColumn[]
  /**
   * 选中项文本数组
   */
  texts: Array<string | number>
}

const defaultProps = buildDefaultProps("select", {
  modelValue: undefined,
  multiple: false,
  columns: () => [],
  columnsFields: () => ({ text: "text", value: "value", children: "children" }),
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
  loading: false,
  columnHeight: "88rpx",
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  placeholder: "请选择",
  disabled: false,
  readonly: false,
  displaySeparator: "/",
  displayFormatter: undefined,
  rightIcon: "arrow",
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

export const selectProps = {
  /**
   * 绑定值
   * - 单选模式：string | number
   * - 多选/级联/多列模式：(string | number)[]
   */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] as PropType<SelectValue> }),
  /**
   * 是否多选模式
   * 注意：级联和多列选择器不受此属性影响，始终使用数组格式
   */
  multiple: defaultProps("multiple", { type: Boolean }),
  /**
   * 列数据
   */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /**
   * 字段映射
   */
  columnsFields: defaultProps("columnsFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
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
   * 是否加载中
   */
  loading: defaultProps("loading", { type: Boolean }),
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
   * 占位文案
   */
  placeholder: defaultProps("placeholder", { type: String }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 是否只读
   */
  readonly: defaultProps("readonly", { type: Boolean }),
  /**
   * 展示文案分隔符
   */
  displaySeparator: defaultProps("displaySeparator", { type: String }),
  /**
   * 展示文案格式化
   */
  displayFormatter: defaultProps("displayFormatter", { type: Function as PropType<(payload: SelectDisplayPayload) => string> }),
  /**
   * 右侧图标
   */
  rightIcon: defaultProps("rightIcon", { type: String }),
  /**
   * 右侧图标大小
   */
  rightIconSize: defaultProps("rightIconSize", { type: [Number, String] }),
  /**
   * 右侧图标颜色
   */
  rightIconColor: defaultProps("rightIconColor", { type: String }),
  /**
   * 右侧图标粗细
   */
  rightIconWeight: defaultProps("rightIconWeight", { type: [Number, String] }),
  /**
   * 文案颜色
   */
  textColor: defaultProps("textColor", { type: String }),
  /**
   * 占位文案颜色
   */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /**
   * 文案大小
   */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /**
   * 文案对齐方向
   */
  textAlign: defaultProps("textAlign", { type: String as PropType<"left" | "center" | "right"> }),
  /**
   * 文案字重
   */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const selectEmits = {
  "update:modelValue": (value: SelectValue) => value,
  open: () => true,
  opened: () => true,
  close: (action: string) => action,
  closed: (action: string) => action,
  change: (data: PickerChangeData) => data,
  cancel: (data: PickerCancelData) => data,
  confirm: (data: PickerConfirmData) => data,
  click: () => true,
}

export type SelectEmits = typeof selectEmits
export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectInstance = InstanceType<typeof Select>
