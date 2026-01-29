import type DropdownMenu from "./ui-dropdown-menu.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const dropdownMenuKey: InjectionKey<DropdownMenuProvide> = Symbol("ui-dropdown-menu")
export const dropdownMenuProps = {
  /**
   * 菜单高度
   */
  height: numericProp,
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
  icon: makeStringProp("arrow-down"),
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
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 是否显示遮罩层
   */
  overlay: truthProp,
  /**
   * 动画时长，单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: makeStringProp<DropdownMenuDirection>("down"),
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
   * 背景颜色
   */
  background: String,
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: truthProp,
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
}
export const dropdownMenuEmits = {}

export type DropdownMenuDirection = "up" | "down"
export type DropdownMenuEmits = typeof dropdownMenuEmits
export type DropdownMenuProps = ExtractPropTypes<typeof dropdownMenuProps>
export interface DropdownMenuProvide {
  props: DropdownMenuProps
  rect: Ref<UniApp.NodeInfo>
  close: () => void
  resize: () => Promise<void>
}
export type DropdownMenuInstance = InstanceType<typeof DropdownMenu>
