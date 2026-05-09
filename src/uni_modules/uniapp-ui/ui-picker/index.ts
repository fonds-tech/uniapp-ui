import type Picker from "./ui-picker.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { PickerValue, PickerColumn, PickerChangeData, PickerColumnsType, PickerColumnFields } from "../ui-picker-panel"
import { buildDefaultProps } from "../utils/props"

// 重新导出供消费方使用
export type { PickerChangeData, PickerColumn, PickerColumnFields, PickerColumnsType, PickerValue }

/** 选择器绑定值类型：单列单值，多列/级联数组 */
export type PickerModelValue = PickerValue | PickerValue[]

/** Popup 模式 */
export type PopupMode = "top" | "bottom" | "left" | "right" | "center"

const defaultProps = buildDefaultProps("picker", {
  show: false,
  mode: "bottom",
  borderRadius: undefined,
  closeOnClickOverlay: true,
  overlay: true,
  duration: 300,
  zIndex: undefined,
  background: undefined,
  safeAreaInsetBottom: true,
  showHeader: true,
  title: undefined,
  cancelText: "取消",
  confirmText: "确定",
  modelValue: undefined,
  columns: () => [],
  loading: false,
  columnFields: () => ({ text: "text", value: "value", children: "children" }),
  columnHeight: undefined,
  visibleColumnNum: 5,
  columnSize: undefined,
  columnColor: undefined,
  columnWeight: undefined,
  activeColumnSize: undefined,
  activeColumnColor: undefined,
  activeColumnWeight: undefined,
  // picker-view 原生属性透传
  indicatorClass: undefined,
  maskStyle: undefined,
  maskTopStyle: undefined,
  maskBottomStyle: undefined,
  maskClass: undefined,
  immediateChange: true,
  customClass: "",
  customStyle: "",
})

export const pickerProps = {
  /** 是否显示弹窗 */
  show: defaultProps("show", { type: Boolean }),
  /** 弹窗位置 */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /** 圆角 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 点击遮罩关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 显示遮罩 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 动画时长 */
  duration: defaultProps("duration", { type: Number }),
  /** 弹窗层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 底部安全区 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 显示头部 */
  showHeader: defaultProps("showHeader", { type: Boolean }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 取消按钮文案 */
  cancelText: defaultProps("cancelText", { type: String }),
  /** 确认按钮文案 */
  confirmText: defaultProps("confirmText", { type: String }),
  /** 绑定值，单列为 string|number，多列/级联为数组 */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] as PropType<PickerModelValue> }),
  /** 列数据 */
  columns: defaultProps("columns", { type: Array as PropType<PickerColumn[]> }),
  /** 加载中 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 字段映射 */
  columnFields: defaultProps("columnFields", { type: Object as PropType<Partial<PickerColumnFields>> }),
  /** 选项高度 */
  columnHeight: defaultProps("columnHeight", { type: [Number, String] }),
  /** 可见选项数 */
  visibleColumnNum: defaultProps("visibleColumnNum", { type: [Number, String] }),
  /** 选项字号 */
  columnSize: defaultProps("columnSize", { type: [Number, String] }),
  /** 选项颜色 */
  columnColor: defaultProps("columnColor", { type: String }),
  /** 选项字重 */
  columnWeight: defaultProps("columnWeight", { type: [Number, String] }),
  /** 激活选项字号 */
  activeColumnSize: defaultProps("activeColumnSize", { type: [Number, String] }),
  /** 激活选项颜色 */
  activeColumnColor: defaultProps("activeColumnColor", { type: String }),
  /** 激活选项字重 */
  activeColumnWeight: defaultProps("activeColumnWeight", { type: [Number, String] }),
  /** picker-view 选中框类名 */
  indicatorClass: defaultProps("indicatorClass", { type: String }),
  /** 蒙层样式 */
  maskStyle: defaultProps("maskStyle", { type: String }),
  /** 蒙层上半样式 (仅 app-nvue) */
  maskTopStyle: defaultProps("maskTopStyle", { type: String }),
  /** 蒙层下半样式 (仅 app-nvue) */
  maskBottomStyle: defaultProps("maskBottomStyle", { type: String }),
  /** 蒙层类名 */
  maskClass: defaultProps("maskClass", { type: String }),
  /** 手指松开立即触发 change */
  immediateChange: defaultProps("immediateChange", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] }),
}

/** 取消事件数据 */
export interface PickerCancelData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

/** 确认事件数据 */
export interface PickerConfirmData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

export const pickerEmits = {
  /** 显示状态双向绑定 */
  "update:show": (show: boolean) => typeof show === "boolean",
  /** 弹层打开 */
  open: () => true,
  /** 打开动画结束 */
  opened: () => true,
  /** 弹层关闭 */
  close: (action: string) => typeof action === "string",
  /** 关闭动画结束 */
  closed: (action: string) => typeof action === "string",
  /** 选择变化 */
  change: (data: PickerChangeData) => !!data,
  /** 绑定值更新 */
  "update:modelValue": (value: PickerModelValue) => value !== undefined,
  /** 取消 */
  cancel: (data: PickerCancelData) => !!data,
  /** 确认 */
  confirm: (data: PickerConfirmData) => !!data,
  /** 滚动开始 */
  pickstart: () => true,
  /** 滚动结束 */
  pickend: () => true,
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmits = typeof pickerEmits
export type PickerInstance = InstanceType<typeof Picker>
