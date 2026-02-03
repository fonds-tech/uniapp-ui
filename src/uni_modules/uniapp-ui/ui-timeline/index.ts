import type Timeline from "./ui-timeline.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 时间轴方向类型 */
export type TimelineMode = "left" | "right" | "alternate"

/** 时间轴注入键 */
export const timelineKey: InjectionKey<TimelineProvide> = Symbol("ui-timeline")

const defaultProps = buildDefaultProps("timeline", {
  mode: "left",
  reverse: false,
  pending: false,
  lineColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const timelineProps = {
  /** 时间轴方向：left（左侧）/ right（右侧）/ alternate（交替） */
  mode: defaultProps("mode", { type: String as PropType<TimelineMode> }),
  /** 是否倒序排列 */
  reverse: defaultProps("reverse", { type: Boolean }),
  /** 是否显示加载中状态 */
  pending: defaultProps("pending", { type: Boolean }),
  /** 时间线颜色 */
  lineColor: defaultProps("lineColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const timelineEmits = {
  /** 点击时间轴项时触发 */
  clickItem: (index: number) => true,
}

export type TimelineEmits = typeof timelineEmits
export type TimelineProps = ExtractPropTypes<typeof timelineProps>

/** 时间轴父组件提供给子组件的数据 */
export interface TimelineProvide {
  /** 原始 props */
  props: TimelineProps
  /** 子组件总数 */
  count: Ref<number>
  /** 点击项回调 */
  onClickItem: (index: number) => void
}

export type TimelineInstance = InstanceType<typeof Timeline>
