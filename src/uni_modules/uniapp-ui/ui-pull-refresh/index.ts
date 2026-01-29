import type PullRefresh from "./ui-pull-refresh.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 下拉刷新状态类型
 * - normal: 正常状态
 * - pulling: 下拉中（未达阈值）
 * - loosing: 下拉中（已达阈值）
 * - loading: 加载中
 * - success: 刷新成功
 */
export type PullRefreshStatus = "normal" | "pulling" | "loosing" | "loading" | "success"

export const pullRefreshProps = {
  /**
   * 是否处于加载中状态（v-model）
   */
  modelValue: Boolean,
  /**
   * 下拉过程中的提示文案
   */
  pullingText: makeStringProp("下拉即可刷新..."),
  /**
   * 释放过程中的提示文案
   */
  loosingText: makeStringProp("释放即可刷新..."),
  /**
   * 加载过程中的提示文案
   */
  loadingText: makeStringProp("加载中..."),
  /**
   * 刷新成功的提示文案
   */
  successText: makeStringProp("刷新成功"),
  /**
   * 刷新成功提示展示时长（毫秒）
   */
  successDuration: makeNumericProp(500),
  /**
   * 顶部内容高度，单位 px
   */
  headHeight: makeNumericProp(50),
  /**
   * 是否禁用下拉刷新
   */
  disabled: Boolean,
  /**
   * 触发刷新的下拉距离阈值，单位 px
   */
  pullDistance: [Number, String] as PropType<number | string>,
  /**
   * 动画持续时间（毫秒）
   */
  animationDuration: makeNumericProp(300),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export const pullRefreshEmits = {
  /** 更新 modelValue */
  "update:modelValue": (value: boolean) => typeof value === "boolean",
  /** 下拉刷新触发时 */
  refresh: () => true,
  /** 状态变化时触发 */
  change: (status: PullRefreshStatus) => true,
}

export type PullRefreshEmits = typeof pullRefreshEmits
export type PullRefreshProps = ExtractPropTypes<typeof pullRefreshProps>
export type PullRefreshInstance = InstanceType<typeof PullRefresh>
