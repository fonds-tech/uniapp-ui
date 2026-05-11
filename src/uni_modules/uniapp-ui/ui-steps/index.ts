import type Steps from "./ui-steps.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type StepStatus = "wait" | "process" | "finish" | "error"

export type StepDirection = "horizontal" | "vertical"

export const stepsKey: InjectionKey<StepsProvide> = Symbol("ui-steps")

const defaultProps = buildDefaultProps("steps", {
  active: 0,
  direction: "horizontal",
  simple: false,
  dot: false,
  center: false,
  activeColor: undefined,
  inactiveColor: undefined,
  errorColor: undefined,
  activeIcon: undefined,
  inactiveIcon: undefined,
  finishIcon: undefined,
  errorIcon: undefined,
  iconSize: undefined,
  clickable: false,
  customClass: undefined,
  customStyle: undefined,
})

export const sharedStepInheritKeys = ["activeColor", "inactiveColor", "errorColor", "activeIcon", "inactiveIcon", "finishIcon", "errorIcon", "iconSize"] as const
export type StepInheritKey = (typeof sharedStepInheritKeys)[number]

export const stepsProps = {
  /** 当前步骤索引（从 0 开始） */
  active: defaultProps("active", { type: [Number, String] }),
  /** 排列方向 */
  direction: defaultProps("direction", { type: String as PropType<StepDirection> }),
  /** 简洁模式：隐藏标题/描述 */
  simple: defaultProps("simple", { type: Boolean }),
  /** 点状模式：圆点替代序号 */
  dot: defaultProps("dot", { type: Boolean }),
  /** 垂直模式下图标与内容居中对齐 */
  center: defaultProps("center", { type: Boolean }),
  /** 激活/完成状态颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 未激活状态颜色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 错误状态颜色 */
  errorColor: defaultProps("errorColor", { type: String }),
  /** 激活状态图标 */
  activeIcon: defaultProps("activeIcon", { type: String }),
  /** 未激活状态图标 */
  inactiveIcon: defaultProps("inactiveIcon", { type: String }),
  /** 完成状态图标 */
  finishIcon: defaultProps("finishIcon", { type: String }),
  /** 错误状态图标 */
  errorIcon: defaultProps("errorIcon", { type: String }),
  /** 状态图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 步骤是否可点击 */
  clickable: defaultProps("clickable", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const stepsEmits = {
  clickStep: (_index: number) => true,
}

export type StepsEmits = typeof stepsEmits
export type StepsProps = ExtractPropTypes<typeof stepsProps>

export interface StepsProvide {
  props: StepsProps
  active: Ref<number>
  count: Ref<number>
  onClickStep: (index: number) => void
}

export type StepsInstance = InstanceType<typeof Steps>
