import type Picker from "./ui-picker.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { PickerValue, PickerColumn, PickerChangeData, PickerColumnsType, PickerColumnFields } from "../ui-picker-panel"
import { truthProp, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

// 重新导出这些类型供其他文件使用
export type { PickerChangeData, PickerColumn, PickerColumnFields, PickerColumnsType, PickerValue }

/**
 * 选择器绑定值类型：单列为单值，多列/级联为数组
 */
export type PickerModelValue = PickerValue | PickerValue[]

// Popup 模式类型
export type PopupMode = "top" | "bottom" | "left" | "right" | "center"

/**
 * ui-picker Props 定义
 * 使用 buildProps 工具函数,与 ui-picker-panel 保持一致
 */
export const pickerProps = {
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
  zIndex: numericProp,
  /**
   * 背景色
   */
  background: String,
  /**
   * 底部安全区
   */
  safeAreaInsetBottom: truthProp,
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
  /**
   * 绑定值
   * - 单列模式：string | number
   * - 多列/级联模式：(string | number)[]
   */
  modelValue: {
    type: [String, Number, Array] as PropType<PickerModelValue>,
    default: undefined,
  },
  /**
   * 列数据
   */
  columns: makeArrayProp<PickerColumn>(),
  /**
   * 是否加载中
   */
  loading: Boolean,
  /**
   * 字段映射
   */
  columnFields: {
    type: Object as PropType<Partial<PickerColumnFields>>,
    default: () => ({ text: "text", value: "value", children: "children" }),
  },
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
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object],
}
/**
 * 取消事件数据
 */
export interface PickerCancelData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

/**
 * 确认事件数据
 */
export interface PickerConfirmData {
  values: PickerValue[]
  indexs: number[]
  columns: PickerColumn[]
}

export const pickerEmits = {
  // Popup 事件
  "update:show": (show: boolean) => true,
  open: () => true,
  opened: () => true,
  close: (action: string) => true,
  closed: (action: string) => true,

  // Panel 事件
  change: (data: PickerChangeData) => data,
  "update:modelValue": (value: PickerModelValue) => value,

  // Picker 特有事件
  cancel: (data: PickerCancelData) => data,
  confirm: (data: PickerConfirmData) => data,
}

export type PickerProps = ExtractPropTypes<typeof pickerProps>
export type PickerEmits = typeof pickerEmits
export type PickerInstance = InstanceType<typeof Picker>
