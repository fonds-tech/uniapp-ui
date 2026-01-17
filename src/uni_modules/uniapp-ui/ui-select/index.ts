import type Select from "./ui-select.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import type { PopupMode, PickerValue, PickerColumn, PickerCancelData, PickerChangeData, PickerConfirmData, PickerColumnFields } from "../ui-picker"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

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

export const [selectProps, useSelectProps] = createProps("select", {
  /**
   * 绑定值
   * - 单选模式：string | number
   * - 多选/级联/多列模式：(string | number)[]
   */
  modelValue: {
    type: [String, Number, Array] as PropType<SelectValue>,
    default: undefined,
  },
  /**
   * 是否多选模式
   * 注意：级联和多列选择器不受此属性影响，始终使用数组格式
   */
  multiple: Boolean,
  /**
   * 列数据
   */
  columns: makeArrayProp<PickerColumn>(),
  /**
   * 字段映射
   */
  columnsFields: {
    type: Object as PropType<Partial<PickerColumnFields>>,
    default: () => ({ text: "text", value: "value", children: "children" }),
  },
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
   * 是否加载中
   */
  loading: Boolean,
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
   * 占位文案
   */
  placeholder: makeStringProp("请选择"),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否只读
   */
  readonly: Boolean,
  /**
   * 展示文案分隔符
   */
  displaySeparator: makeStringProp("/"),
  /**
   * 展示文案格式化
   */
  displayFormatter: Function as PropType<(payload: SelectDisplayPayload) => string>,
  /**
   * 右侧图标
   */
  rightIcon: makeStringProp("arrow"),
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
   * 文案对齐方向
   */
  textAlign: makeStringProp<"left" | "center" | "right">("left"),
  /**
   * 文案字重
   */
  textWeight: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

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
