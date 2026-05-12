import type TimelineItem from "./ui-timeline-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TimelineItemType = "primary" | "success" | "warning" | "danger" | "info"
export type TimelineItemPosition = "left" | "right"

const defaultProps = buildDefaultProps("timelineItem", {
  time: undefined,
  title: undefined,
  description: undefined,
  icon: undefined,
  iconColor: undefined,
  dotColor: undefined,
  dotSize: undefined,
  type: undefined,
  hollow: false,
  position: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const timelineItemProps = {
  /** 时间标签 */
  time: defaultProps("time", { type: String }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 描述 */
  description: defaultProps("description", { type: String }),
  /** 图标 */
  icon: defaultProps("icon", { type: String }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 节点颜色 */
  dotColor: defaultProps("dotColor", { type: String }),
  /** 节点尺寸（覆盖父级） */
  dotSize: defaultProps("dotSize", { type: [Number, String] }),
  /** 节点状态类型（自动着色） */
  type: defaultProps("type", { type: String as PropType<TimelineItemType> }),
  /** 空心节点 */
  hollow: defaultProps("hollow", { type: Boolean }),
  /** alternate 模式下手动指定轴所在位置 */
  position: defaultProps("position", { type: String as PropType<TimelineItemPosition> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const timelineItemEmits = {
  click: (_index: number) => true,
}

export type TimelineItemEmits = typeof timelineItemEmits
export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
export type TimelineItemInstance = InstanceType<typeof TimelineItem>
