import type Cell from "./ui-cell.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("cell", {
  icon: undefined,
  title: undefined,
  titleWidth: undefined,
  label: undefined,
  value: undefined,
  height: undefined,
  padding: undefined,
  background: undefined,
  iconGap: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  titleSize: undefined,
  titleColor: undefined,
  titleWeight: undefined,
  labelGap: undefined,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  valueSize: undefined,
  valueColor: undefined,
  valueWeight: undefined,
  rightIcon: "right",
  rightIconGap: undefined,
  rightIconSize: undefined,
  rightIconColor: undefined,
  rightIconWeight: undefined,
  url: undefined,
  linkType: undefined,
  border: true,
  borderColor: undefined,
  borderLeft: undefined,
  borderRight: undefined,
  borderWidth: undefined,
  clickable: false,
  isLink: false,
  customClass: undefined,
  customStyle: undefined,
})

export const cellProps = {
  /**
   * 图标
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 标题
   */
  title: defaultProps("title", { type: String }),
  /**
   * 标题宽度，不设置则根据内容自适应
   */
  titleWidth: defaultProps("titleWidth", { type: [Number, String] }),
  /**
   * 描述
   */
  label: defaultProps("label", { type: String }),
  /**
   * 内容
   */
  value: defaultProps("value", { type: String }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 内边距
   */
  padding: defaultProps("padding", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 图标和右侧内容间隔
   */
  iconGap: defaultProps("iconGap", { type: [Number, String] }),
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
   * 标题大小
   */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /**
   * 标题颜色
   */
  titleColor: defaultProps("titleColor", { type: String }),
  /**
   * 标题粗细
   */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /**
   * 描述信息顶部间隔
   */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /**
   * 描述信息大小
   */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /**
   * 描述信息颜色
   */
  labelColor: defaultProps("labelColor", { type: String }),
  /**
   * 描述信息粗细
   */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /**
   * 右侧值大小
   */
  valueSize: defaultProps("valueSize", { type: [Number, String] }),
  /**
   * 右侧值颜色
   */
  valueColor: defaultProps("valueColor", { type: String }),
  /**
   * 右侧值粗细
   */
  valueWeight: defaultProps("valueWeight", { type: [Number, String] }),
  /**
   * 右侧图标
   */
  rightIcon: defaultProps("rightIcon", { type: String }),
  /**
   * 右侧图标距离左边间隔
   */
  rightIconGap: defaultProps("rightIconGap", { type: [Number, String] }),
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
   * 跳转链接
   */
  url: defaultProps("url", { type: String }),
  /**
   * 跳转类型
   */
  linkType: defaultProps("linkType", { type: String as PropType<"navigateTo" | "redirectTo" | "reLaunch" | "switchTab"> }),
  /**
   * 是否显示边框
   */
  border: defaultProps("border", { type: Boolean }),
  /**
   * 边框颜色
   */
  borderColor: defaultProps("borderColor", { type: String }),
  /**
   * 边框左侧位置
   */
  borderLeft: defaultProps("borderLeft", { type: [Number, String] }),
  /**
   * 边框右侧位置
   */
  borderRight: defaultProps("borderRight", { type: [Number, String] }),
  /**
   * 边框宽度
   */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /**
   * 是否可点击的
   */
  clickable: defaultProps("clickable", { type: Boolean }),
  /**
   * 是否为链接
   */
  isLink: defaultProps("isLink", { type: Boolean }),

  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const cellEmits = {
  click: () => true,
}

export type CellEmits = typeof cellEmits
export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellInstance = InstanceType<typeof Cell>
