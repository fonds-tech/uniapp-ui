import type DropdownMenu from "./ui-dropdown-menu.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const dropdownMenuKey: InjectionKey<DropdownMenuProvide> = Symbol("ui-dropdown-menu")
const defaultProps = buildDefaultProps("dropdown-menu", {
  height: undefined,
  titleColor: undefined,
  titleSize: undefined,
  titleWeight: undefined,
  activeTitleColor: undefined,
  activeTitleSize: undefined,
  activeTitleWeight: undefined,
  icon: "arrow-down",
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  activeIconColor: undefined,
  showIcon: true,
  zIndex: undefined,
  overlay: true,
  duration: 300,
  direction: "down",
  borderRadius: undefined,
  optionSize: undefined,
  optionColor: undefined,
  optionWeight: undefined,
  activeOptionSize: undefined,
  activeOptionColor: undefined,
  activeOptionWeight: undefined,
  background: undefined,
  closeOnClickOverlay: true,
  labelField: "label",
  valueField: "value",
  customClass: undefined,
  customStyle: undefined,
})

export const dropdownMenuProps = {
  /**
   * 菜单高度
   */
  height: defaultProps("height", { type: [Number, String] }),
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
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 是否显示遮罩层
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 动画时长，单位毫秒
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 菜单展开方向，可选值up、down
   */
  direction: defaultProps("direction", { type: String as PropType<DropdownMenuDirection> }),
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
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 是否在点击遮罩层后关闭菜单
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
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
