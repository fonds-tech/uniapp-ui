import type Steps from "./ui-steps.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 步骤条状态类型
 */
export type StepStatus = "wait" | "process" | "finish" | "error"

/**
 * 步骤条方向类型
 */
export type StepDirection = "horizontal" | "vertical"

/**
 * 步骤条注入键
 */
export const stepsKey: InjectionKey<StepsProvide> = Symbol("ui-steps")

/**
 * 步骤条 Props 定义
 */
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

export const stepsProps = {
  /**
   * 当前步骤索引（从 0 开始）
   */
  active: defaultProps("active", { type: Number }),
  /**
   * 步骤条方向
   */
  direction: defaultProps("direction", { type: String as PropType<StepDirection> }),
  /**
   * 简洁模式（只显示图标，不显示标题和描述）
   */
  simple: defaultProps("simple", { type: Boolean }),
  /**
   * 点状模式（用小圆点代替数字）
   */
  dot: defaultProps("dot", { type: Boolean }),
  /**
   * 垂直模式下图标与内容是否居中对齐
   */
  center: defaultProps("center", { type: Boolean }),
  /**
   * 激活状态颜色
   */
  activeColor: defaultProps("activeColor", { type: String }),
  /**
   * 未激活状态颜色
   */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /**
   * 错误状态颜色
   */
  errorColor: defaultProps("errorColor", { type: String }),
  /**
   * 激活图标
   */
  activeIcon: defaultProps("activeIcon", { type: String }),
  /**
   * 未激活图标
   */
  inactiveIcon: defaultProps("inactiveIcon", { type: String }),
  /**
   * 完成图标
   */
  finishIcon: defaultProps("finishIcon", { type: String }),
  /**
   * 错误图标
   */
  errorIcon: defaultProps("errorIcon", { type: String }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 是否可点击步骤
   */
  clickable: defaultProps("clickable", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
/**
 * 步骤条事件定义
 */
export const stepsEmits = {
  /**
   * 点击步骤时触发
   */
  clickStep: (index: number) => true,
}

export type StepsEmits = typeof stepsEmits
export type StepsProps = ExtractPropTypes<typeof stepsProps>

/**
 * 步骤条父组件提供给子组件的数据
 */
export interface StepsProvide {
  /**
   * 原始 props
   */
  props: StepsProps
  /**
   * 当前激活的步骤索引
   */
  active: Ref<number>
  /**
   * 子组件总数
   */
  count: Ref<number>
  /**
   * 点击步骤回调
   */
  onClickStep: (index: number) => void
}

export type StepsInstance = InstanceType<typeof Steps>
