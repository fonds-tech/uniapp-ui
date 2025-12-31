import type DropdownItem from "./ui-dropdown-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, buildProps, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

export const dropdownItemKey = Symbol("ui-dropdown-item")
export const dropdownItemProps = buildProps("dropdownItem", {
  /**
   * 绑定值，多选时为数组
   */
  modelValue: { type: [String, Number, Array] },
  /**
   * 菜单模式，可选值 single 单选模式 multiple 多选模式
   */
  mode: makeStringProp<DropdownItemMode>("single"),
  /**
   * 菜单项标题
   */
  title: numericProp,
  /**
   * 配置项数据
   */
  options: makeArrayProp<DropdownItemOption>(),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 菜单最小高度
   */
  minHeight: makeNumericProp("auto"),
  /**
   * 菜单最大高度
   */
  maxHeight: makeNumericProp("60vh"),
  /**
   * 标题颜色
   */
  titleColor: String,
  /**
   * 标题大小
   */
  titleSize: numericProp,
  /**
   * 标题粗细
   */
  titleWeight: numericProp,
  /**
   * 激活标题颜色
   */
  activeTitleColor: String,
  /**
   * 激活标题大小
   */
  activeTitleSize: numericProp,
  /**
   * 激活标题粗细
   */
  activeTitleWeight: numericProp,
  /**
   * 图标
   */
  icon: String,
  /**
   * 图标大小
   */
  iconSize: numericProp,
  /**
   * 图标颜色
   */
  iconColor: String,
  /**
   * 图标粗细
   */
  iconWeight: numericProp,
  /**
   * 激活图标颜色
   */
  activeIconColor: String,
  /**
   * 是否显示图标
   */
  showIcon: truthProp,
  /**
   * 是否显示遮罩层
   */
  overlay: truthProp,
  /**
   * 动画时长，单位毫秒
   */
  duration: numericProp,
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: String as PropType<DropdownItemDirection>,
  /**
   * 选项菜单背景颜色
   */
  background: String,
  /**
   * 选项菜单圆角值
   */
  borderRadius: numericProp,
  /**
   * 选项文字图标大小
   */
  optionSize: numericProp,
  /**
   * 选项文字图标颜色
   */
  optionColor: String,
  /**
   * 选项文字图标粗细
   */
  optionWeight: numericProp,
  /**
   * 激活选项文字图标大小
   */
  activeOptionSize: numericProp,
  /**
   * 激活选项文字图标颜色
   */
  activeOptionColor: String,
  /**
   * 激活选项文字图标粗细
   */
  activeOptionWeight: numericProp,
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: truthProp,
  /**
   * 弹出层 zIndex
   */
  zIndex: numericProp,
  /**
   * option 名称字段
   */
  labelField: makeStringProp("label"),
  /**
   * option 内容字段
   */
  valueField: makeStringProp("value"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const dropdownItemEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  change: (value: DropdownItemValue) => value,
  "update:modelValue": (value: DropdownItemValue) => value,
}

export interface DropdownItemOption {
  label: string | number
  value: string | number
}
export type DropdownItemMode = "single" | "multiple"
export type DropdownItemDirection = "up" | "down"
export type DropdownItemValue = string | number | (string | number)[]
export type DropdownItemEmits = typeof dropdownItemEmits
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps>
export type DropdownItemInstance = InstanceType<typeof DropdownItem>
