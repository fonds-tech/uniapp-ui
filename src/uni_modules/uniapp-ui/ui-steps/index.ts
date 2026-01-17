import type Steps from "./ui-steps.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp, makeStringProp, makeNumericProp } from "../utils/props"

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
export const [stepsProps, useStepsProps] = createProps("steps", {
  /**
   * 当前步骤索引（从 0 开始）
   */
  active: makeNumericProp(0),
  /**
   * 步骤条方向
   */
  direction: makeStringProp<StepDirection>("horizontal"),
  /**
   * 简洁模式（只显示图标，不显示标题和描述）
   */
  simple: Boolean,
  /**
   * 点状模式（用小圆点代替数字）
   */
  dot: Boolean,
  /**
   * 垂直模式下图标与内容是否居中对齐
   */
  center: Boolean,
  /**
   * 激活状态颜色
   */
  activeColor: String,
  /**
   * 未激活状态颜色
   */
  inactiveColor: String,
  /**
   * 错误状态颜色
   */
  errorColor: String,
  /**
   * 激活图标
   */
  activeIcon: String,
  /**
   * 未激活图标
   */
  inactiveIcon: String,
  /**
   * 完成图标
   */
  finishIcon: String,
  /**
   * 错误图标
   */
  errorIcon: String,
  /**
   * 图标大小
   */
  iconSize: numericProp,
  /**
   * 是否可点击步骤
   */
  clickable: Boolean,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

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
   * 经过全局配置合并的 props
   */
  useProps: StepsProps
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
