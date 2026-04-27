import type CollapseItem from "./ui-collapse-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("collapse-item", {
  name: undefined,
  title: undefined,
  value: undefined,
  label: undefined,
  icon: undefined,
  disabled: false,
  readonly: false,
  isLink: true,
  border: true,
  duration: 300,
  padding: undefined,
  background: undefined,
  titleSize: undefined,
  titleColor: undefined,
  titleWeight: undefined,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  labelGap: undefined,
  valueSize: undefined,
  valueColor: undefined,
  valueWeight: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  iconGap: undefined,
  arrowSize: undefined,
  arrowColor: undefined,
  borderColor: undefined,
  borderWidth: undefined,
  headerClass: undefined,
  headerStyle: undefined,
  bodyClass: undefined,
  bodyStyle: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const collapseItemProps = {
  /** 唯一标识 */
  name: defaultProps("name", { type: [String, Number] }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 右侧内容 */
  value: defaultProps("value", { type: [String, Number] }),
  /** 描述（标题下方） */
  label: defaultProps("label", { type: String }),
  /** 左侧图标 */
  icon: defaultProps("icon", { type: String }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否显示右侧箭头 */
  isLink: defaultProps("isLink", { type: Boolean }),
  /** 是否显示底部分割线 */
  border: defaultProps("border", { type: Boolean }),
  /** 展开/收起动画时长（ms） */
  duration: defaultProps("duration", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 标题字号 */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题字重 */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /** 描述字号 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 描述颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 描述字重 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 描述与标题间距 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 右侧值字号 */
  valueSize: defaultProps("valueSize", { type: [Number, String] }),
  /** 右侧值颜色 */
  valueColor: defaultProps("valueColor", { type: String }),
  /** 右侧值字重 */
  valueWeight: defaultProps("valueWeight", { type: [Number, String] }),
  /** 图标字号 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标字重 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 图标与标题间距 */
  iconGap: defaultProps("iconGap", { type: [Number, String] }),
  /** 箭头字号 */
  arrowSize: defaultProps("arrowSize", { type: [Number, String] }),
  /** 箭头颜色 */
  arrowColor: defaultProps("arrowColor", { type: String }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 头部区域类名 */
  headerClass: defaultProps("headerClass", { type: String }),
  /** 头部区域样式 */
  headerStyle: defaultProps("headerStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 内容区域类名 */
  bodyClass: defaultProps("bodyClass", { type: String }),
  /** 内容区域样式 */
  bodyStyle: defaultProps("bodyStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const collapseItemEmits = {
  /** 点击事件 */
  click: (event: Event) => event ?? true,
}

export type CollapseItemEmits = typeof collapseItemEmits
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export interface CollapseItemExpose {
  /** 唯一标识 */
  name: string | number
  /** 是否展开 */
  expanded: boolean
  /** 切换展开状态 */
  toggle: (expanded?: boolean) => void
}

export type CollapseItemInstance = InstanceType<typeof CollapseItem>
