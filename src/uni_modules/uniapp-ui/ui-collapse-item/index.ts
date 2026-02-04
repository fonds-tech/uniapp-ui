import type CollapseItem from "./ui-collapse-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("collapse-item", {
  // 基础属性
  name: "",
  title: "",
  value: "",
  label: "",
  icon: "",
  disabled: false,
  readonly: false,
  isLink: true,
  border: true,
  duration: 300,
  padding: "",
  background: "",
  // 标题样式
  titleSize: "",
  titleColor: "",
  titleWeight: "",
  // 描述样式
  labelSize: "",
  labelColor: "",
  labelWeight: "",
  labelGap: "",
  // 右侧值样式
  valueSize: "",
  valueColor: "",
  valueWeight: "",
  // 图标样式
  iconSize: "",
  iconColor: "",
  iconWeight: "",
  iconGap: "",
  // 箭头样式
  arrowSize: "",
  arrowColor: "",
  // 边框样式
  borderColor: "",
  borderWidth: "",
  // 区域样式
  headerClass: "",
  headerStyle: "",
  bodyClass: "",
  bodyStyle: "",
  // 通用
  customClass: "",
  customStyle: "",
})

export const collapseItemProps = {
  /** 唯一标识符（必填） */
  name: defaultProps("name", { type: [String, Number], required: true as const }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 右侧内容 */
  value: defaultProps("value", { type: [String, Number] }),
  /** 标题下方描述 */
  label: defaultProps("label", { type: String }),
  /** 左侧图标 */
  icon: defaultProps("icon", { type: String }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否显示箭头 */
  isLink: defaultProps("isLink", { type: Boolean }),
  /** 是否显示下边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 动画时长（毫秒） */
  duration: defaultProps("duration", { type: Number }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [String, Number] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),

  /** 标题字体大小 */
  titleSize: defaultProps("titleSize", { type: [String, Number] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题字重 */
  titleWeight: defaultProps("titleWeight", { type: [String, Number] }),

  /** 描述字体大小 */
  labelSize: defaultProps("labelSize", { type: [String, Number] }),
  /** 描述颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 描述字重 */
  labelWeight: defaultProps("labelWeight", { type: [String, Number] }),
  /** 描述与标题间距 */
  labelGap: defaultProps("labelGap", { type: [String, Number] }),

  /** 右侧值字体大小 */
  valueSize: defaultProps("valueSize", { type: [String, Number] }),
  /** 右侧值颜色 */
  valueColor: defaultProps("valueColor", { type: String }),
  /** 右侧值字重 */
  valueWeight: defaultProps("valueWeight", { type: [String, Number] }),

  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [String, Number] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标字重 */
  iconWeight: defaultProps("iconWeight", { type: [String, Number] }),
  /** 图标与标题间距 */
  iconGap: defaultProps("iconGap", { type: [String, Number] }),

  /** 箭头大小 */
  arrowSize: defaultProps("arrowSize", { type: [String, Number] }),
  /** 箭头颜色 */
  arrowColor: defaultProps("arrowColor", { type: String }),

  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [String, Number] }),

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
  click: (event: any) => true,
}

export type CollapseItemEmits = typeof collapseItemEmits
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export interface CollapseItemExpose {
  /** 组件名称 */
  name: string | number
  /** 是否展开 */
  expanded: boolean
  /** 切换展开状态 */
  toggle: (expanded?: boolean) => void
}

export type CollapseItemInstance = InstanceType<typeof CollapseItem>
