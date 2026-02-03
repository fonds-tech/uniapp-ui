import type TimelineItem from "./ui-timeline-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("timelineItem", {
  time: undefined,
  title: undefined,
  description: undefined,
  icon: undefined,
  iconColor: undefined,
  dotColor: undefined,
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
  /** 自定义图标 */
  icon: defaultProps("icon", { type: String }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 节点颜色 */
  dotColor: defaultProps("dotColor", { type: String }),
  /** 在 alternate 模式下的位置：left / right */
  position: defaultProps("position", { type: String as PropType<"left" | "right"> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const timelineItemEmits = {
  /** 点击时触发 */
  click: (index: number) => true,
}

export type TimelineItemEmits = typeof timelineItemEmits
export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
export type TimelineItemInstance = InstanceType<typeof TimelineItem>
