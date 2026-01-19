import type Step from "./ui-step.vue"
import type { StepStatus } from "../ui-steps"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp } from "../utils/props"

/** 可从父组件继承的属性键 */
export type InheritableStepPropKeys = "activeColor" | "inactiveColor" | "errorColor" | "activeIcon" | "inactiveIcon" | "finishIcon" | "errorIcon" | "iconSize"

/**
 * 步骤项 Props 定义
 */
export const [stepProps, useStepProps] = createProps("step", {
  /**
   * 步骤标题
   */
  title: String,
  /**
   * 步骤描述
   */
  description: String,
  /**
   * 自定义图标
   */
  icon: String,
  /**
   * 步骤状态（如果不设置则根据 active 自动判断）
   * - wait: 等待中
   * - process: 进行中
   * - finish: 已完成
   * - error: 错误
   */
  status: String as PropType<StepStatus>,
  /**
   * 图标大小
   */
  iconSize: numericProp,
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
 * 步骤项事件定义
 */
export const stepEmits = {
  /**
   * 点击步骤时触发
   */
  click: (index: number) => true,
}

export type StepEmits = typeof stepEmits
export type StepProps = ExtractPropTypes<typeof stepProps>
export type StepInstance = InstanceType<typeof Step>
