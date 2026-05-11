import type TextEllipsis from "./ui-text-ellipsis.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("text-ellipsis", {
  content: undefined,
  rows: 3,
  expandText: "展开",
  collapseText: "收起",
  dots: "...",
  color: undefined,
  fontSize: undefined,
  lineHeight: undefined,
  actionColor: undefined,
  gradientColor: undefined,
  showAction: true,
  customClass: undefined,
  customStyle: undefined,
})

export const textEllipsisProps = {
  /** 文本内容 */
  content: defaultProps("content", { type: String }),
  /** 折叠时展示行数 */
  rows: defaultProps("rows", { type: [Number, String] }),
  /** 展开按钮文案 */
  expandText: defaultProps("expandText", { type: String }),
  /** 收起按钮文案 */
  collapseText: defaultProps("collapseText", { type: String }),
  /** 省略号文本（仅占位标识；实际由 line-clamp 截断） */
  dots: defaultProps("dots", { type: String }),
  /** 文本颜色 */
  color: defaultProps("color", { type: String }),
  /** 字号 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 行高 */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /** 操作按钮颜色 */
  actionColor: defaultProps("actionColor", { type: String }),
  /** 渐变遮罩颜色（一般与父级背景一致） */
  gradientColor: defaultProps("gradientColor", { type: String }),
  /** 显示展开/收起按钮 */
  showAction: defaultProps("showAction", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const textEllipsisEmits = {
  change: (_expanded: boolean) => true,
  click: (_event: Event) => true,
}

export type TextEllipsisEmits = typeof textEllipsisEmits
export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>
export type TextEllipsisInstance = InstanceType<typeof TextEllipsis>
