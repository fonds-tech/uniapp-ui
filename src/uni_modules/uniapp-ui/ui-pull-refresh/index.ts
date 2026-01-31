import type PullRefresh from "./ui-pull-refresh.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 下拉刷新状态类型：normal/pulling/loosing/loading/success */
export type PullRefreshStatus = "normal" | "pulling" | "loosing" | "loading" | "success"

const defaultProps = buildDefaultProps("pull-refresh", {
  modelValue: false,
  pullingText: "下拉即可刷新...",
  loosingText: "释放即可刷新...",
  loadingText: "加载中...",
  successText: "刷新成功",
  successDuration: 500,
  headHeight: 50,
  disabled: false,
  pullDistance: undefined,
  animationDuration: 300,
  customClass: undefined,
  customStyle: undefined,
})

export const pullRefreshProps = {
  /** 是否处于加载中状态（v-model） */
  modelValue: defaultProps("modelValue", { type: Boolean }),
  /** 下拉过程中的提示文案 */
  pullingText: defaultProps("pullingText", { type: String }),
  /** 释放过程中的提示文案 */
  loosingText: defaultProps("loosingText", { type: String }),
  /** 加载过程中的提示文案 */
  loadingText: defaultProps("loadingText", { type: String }),
  /** 刷新成功的提示文案 */
  successText: defaultProps("successText", { type: String }),
  /** 刷新成功提示展示时长（毫秒） */
  successDuration: defaultProps("successDuration", { type: Number }),
  /** 顶部内容高度，单位 px */
  headHeight: defaultProps("headHeight", { type: Number }),
  /** 是否禁用下拉刷新 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 触发刷新的下拉距离阈值，单位 px */
  pullDistance: defaultProps("pullDistance", { type: [Number, String] as PropType<number | string> }),
  /** 动画持续时间（毫秒） */
  animationDuration: defaultProps("animationDuration", { type: Number }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
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
