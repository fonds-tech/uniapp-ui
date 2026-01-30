import type DropdownItem from "./ui-dropdown-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const dropdownItemKey = Symbol("ui-dropdown-item")
const defaultProps = buildDefaultProps("dropdown-item", {
  modelValue: undefined,
  mode: "single",
  title: undefined,
  options: () => [],
  disabled: false,
  minHeight: "auto",
  maxHeight: "60vh",
  titleColor: undefined,
  titleSize: undefined,
  titleWeight: undefined,
  activeTitleColor: undefined,
  activeTitleSize: undefined,
  activeTitleWeight: undefined,
  icon: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  activeIconColor: undefined,
  showIcon: true,
  overlay: true,
  duration: undefined,
  direction: undefined,
  background: undefined,
  borderRadius: undefined,
  optionSize: undefined,
  optionColor: undefined,
  optionWeight: undefined,
  activeOptionSize: undefined,
  activeOptionColor: undefined,
  activeOptionWeight: undefined,
  closeOnClickOverlay: true,
  zIndex: undefined,
  labelField: "label",
  valueField: "value",
  customClass: undefined,
  customStyle: undefined,
})

export const dropdownItemProps = {
  /**
   * 绑定值，多选时为数组
   */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] }),
  /**
   * 菜单模式，可选值 single 单选模式 multiple 多选模式
   */
  mode: defaultProps("mode", { type: String as PropType<DropdownItemMode> }),
  /**
   * 菜单项标题
   */
  title: defaultProps("title", { type: [Number, String] }),
  /**
   * 配置项数据
   */
  options: defaultProps("options", { type: Array as PropType<DropdownItemOption[]> }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 菜单最小高度
   */
  minHeight: defaultProps("minHeight", { type: [Number, String] }),
  /**
   * 菜单最大高度
   */
  maxHeight: defaultProps("maxHeight", { type: [Number, String] }),
  /**
   * 标题颜色
   */
  titleColor: defaultProps("titleColor", { type: String }),
  /**
   * 标题大小
   */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /**
   * 标题粗细
   */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /**
   * 激活标题颜色
   */
  activeTitleColor: defaultProps("activeTitleColor", { type: String }),
  /**
   * 激活标题大小
   */
  activeTitleSize: defaultProps("activeTitleSize", { type: [Number, String] }),
  /**
   * 激活标题粗细
   */
  activeTitleWeight: defaultProps("activeTitleWeight", { type: [Number, String] }),
  /**
   * 图标
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 图标颜色
   */
  iconColor: defaultProps("iconColor", { type: String }),
  /**
   * 图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 激活图标颜色
   */
  activeIconColor: defaultProps("activeIconColor", { type: String }),
  /**
   * 是否显示图标
   */
  showIcon: defaultProps("showIcon", { type: Boolean }),
  /**
   * 是否显示遮罩层
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 动画时长，单位毫秒
   */
  duration: defaultProps("duration", { type: [Number, String] }),
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: defaultProps("direction", { type: String as PropType<DropdownItemDirection> }),
  /**
   * 选项菜单背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 选项菜单圆角值
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 选项文字图标大小
   */
  optionSize: defaultProps("optionSize", { type: [Number, String] }),
  /**
   * 选项文字图标颜色
   */
  optionColor: defaultProps("optionColor", { type: String }),
  /**
   * 选项文字图标粗细
   */
  optionWeight: defaultProps("optionWeight", { type: [Number, String] }),
  /**
   * 激活选项文字图标大小
   */
  activeOptionSize: defaultProps("activeOptionSize", { type: [Number, String] }),
  /**
   * 激活选项文字图标颜色
   */
  activeOptionColor: defaultProps("activeOptionColor", { type: String }),
  /**
   * 激活选项文字图标粗细
   */
  activeOptionWeight: defaultProps("activeOptionWeight", { type: [Number, String] }),
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 弹出层 zIndex
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * option 名称字段
   */
  labelField: defaultProps("labelField", { type: String }),
  /**
   * option 内容字段
   */
  valueField: defaultProps("valueField", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
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
