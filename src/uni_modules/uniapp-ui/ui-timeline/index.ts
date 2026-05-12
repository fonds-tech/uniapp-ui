import type Timeline from "./ui-timeline.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TimelineMode = "left" | "right" | "alternate"
export type TimelineLineStyle = "solid" | "dashed" | "dotted"

export const timelineKey: InjectionKey<TimelineProvide> = Symbol("ui-timeline")

const defaultProps = buildDefaultProps("timeline", {
  mode: "left",
  reverse: false,
  lineColor: undefined,
  lineStyle: "solid",
  lineWidth: undefined,
  dotSize: undefined,
  iconSize: undefined,
  axisWidth: undefined,
  itemGap: undefined,
  contentGap: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const timelineProps = {
  /** 轴位置：left（轴左）/ right（轴右）/ alternate（交替） */
  mode: defaultProps("mode", { type: String as PropType<TimelineMode> }),
  /** 倒序排列 */
  reverse: defaultProps("reverse", { type: Boolean }),
  /** 连接线颜色 */
  lineColor: defaultProps("lineColor", { type: String }),
  /** 连接线样式 */
  lineStyle: defaultProps("lineStyle", { type: String as PropType<TimelineLineStyle> }),
  /** 连接线宽度 */
  lineWidth: defaultProps("lineWidth", { type: [Number, String] }),
  /** 节点尺寸 */
  dotSize: defaultProps("dotSize", { type: [Number, String] }),
  /** 图标尺寸 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 轴列宽度 */
  axisWidth: defaultProps("axisWidth", { type: [Number, String] }),
  /** 项目间距（item 之间垂直间距） */
  itemGap: defaultProps("itemGap", { type: [Number, String] }),
  /** 轴到内容横向间距 */
  contentGap: defaultProps("contentGap", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const timelineEmits = {
  clickItem: (_index: number) => true,
}

export type TimelineEmits = typeof timelineEmits
export type TimelineProps = ExtractPropTypes<typeof timelineProps>

export interface TimelineProvide {
  props: TimelineProps
  count: Ref<number>
  onClickItem: (index: number) => void
}

export type TimelineInstance = InstanceType<typeof Timeline>
