import type Cell from "./ui-cell.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 跳转类型，对应 uni 路由 API */
export type CellLinkType = "navigateTo" | "redirectTo" | "reLaunch" | "switchTab"

/** 主轴对齐：center 居中 / top 顶对齐（多行 label 时让 icon 与 title 顶对齐） */
export type CellAlign = "center" | "top"

const defaultProps = buildDefaultProps("cell", {
  icon: undefined,
  title: undefined,
  titleWidth: undefined,
  titleLines: undefined,
  label: undefined,
  labelLines: undefined,
  value: undefined,
  valueLines: undefined,
  height: undefined,
  minHeight: undefined,
  padding: undefined,
  background: undefined,
  align: "center" as CellAlign,
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
  rightIcon: "arrow",
  rightIconGap: undefined,
  rightIconSize: undefined,
  rightIconColor: undefined,
  rightIconWeight: undefined,
  showRightIcon: undefined as boolean | undefined,
  url: undefined,
  linkType: "navigateTo" as CellLinkType,
  border: true,
  borderColor: undefined,
  borderLeft: undefined,
  borderRight: undefined,
  borderWidth: undefined,
  clickable: false,
  isLink: false,
  disabled: false,
  hoverStayTime: 70,
  activeOpacity: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const cellProps = {
  /** 图标 */
  icon: defaultProps("icon", { type: String }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 标题宽度，不设置则根据内容自适应；设置后 body 不再收缩 */
  titleWidth: defaultProps("titleWidth", { type: [Number, String] }),
  /** 标题行数：1=单行省略（默认），N=N 行省略，0=不省略多行 */
  titleLines: defaultProps("titleLines", { type: [Number, String] }),
  /** 描述 */
  label: defaultProps("label", { type: String }),
  /** 描述行数：1=单行省略（默认），N=N 行省略，0=不省略多行 */
  labelLines: defaultProps("labelLines", { type: [Number, String] }),
  /** 内容（值），支持字符串/数字 */
  value: defaultProps("value", { type: [String, Number] }),
  /** 值行数：1=单行省略（默认），N=N 行省略，0=不省略多行 */
  valueLines: defaultProps("valueLines", { type: [Number, String] }),
  /** 高度（固定值） */
  height: defaultProps("height", { type: [Number, String] }),
  /** 最小高度（保证移动端可点目标） */
  minHeight: defaultProps("minHeight", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 主轴对齐方式 */
  align: defaultProps("align", { type: String as PropType<CellAlign> }),
  /** 图标和右侧内容间隔 */
  iconGap: defaultProps("iconGap", { type: [Number, String] }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 标题大小 */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题粗细 */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /** 描述信息顶部间隔 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 描述信息大小 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 描述信息颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 描述信息粗细 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 右侧值大小 */
  valueSize: defaultProps("valueSize", { type: [Number, String] }),
  /** 右侧值颜色 */
  valueColor: defaultProps("valueColor", { type: String }),
  /** 右侧值粗细 */
  valueWeight: defaultProps("valueWeight", { type: [Number, String] }),
  /** 右侧图标 */
  rightIcon: defaultProps("rightIcon", { type: String }),
  /** 右侧图标距离左边间隔 */
  rightIconGap: defaultProps("rightIconGap", { type: [Number, String] }),
  /** 右侧图标大小 */
  rightIconSize: defaultProps("rightIconSize", { type: [Number, String] }),
  /** 右侧图标颜色 */
  rightIconColor: defaultProps("rightIconColor", { type: String }),
  /** 右侧图标粗细 */
  rightIconWeight: defaultProps("rightIconWeight", { type: [Number, String] }),
  /** 是否显示右侧图标，未传则跟随 isLink */
  showRightIcon: defaultProps("showRightIcon", { type: Boolean }),
  /** 跳转链接 */
  url: defaultProps("url", { type: String }),
  /** 跳转类型 */
  linkType: defaultProps("linkType", { type: String as PropType<CellLinkType> }),
  /** 是否显示边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 边框左侧位置 */
  borderLeft: defaultProps("borderLeft", { type: [Number, String] }),
  /** 边框右侧位置 */
  borderRight: defaultProps("borderRight", { type: [Number, String] }),
  /** 边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 是否启用点击态（仅控制 hover 反馈） */
  clickable: defaultProps("clickable", { type: Boolean }),
  /** 是否为链接（启用点击态 + 显示右侧箭头） */
  isLink: defaultProps("isLink", { type: Boolean }),
  /** 是否禁用（屏蔽点击 + 透明降级） */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 点击态停留时长（ms） */
  hoverStayTime: defaultProps("hoverStayTime", { type: [Number, String] }),
  /** 点击反馈遮罩透明度（0-1） */
  activeOpacity: defaultProps("activeOpacity", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const cellEmits = {
  /** 点击事件，event 透传 uni 事件对象 */
  click: (event: Event) => event ?? true,
  /** url 跳转失败回调 */
  linkFail: (err: Error) => err ?? true,
}

export type CellEmits = typeof cellEmits
export type CellProps = ExtractPropTypes<typeof cellProps>
export type CellInstance = InstanceType<typeof Cell>
