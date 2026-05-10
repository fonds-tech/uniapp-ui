import type PullRefresh from "./ui-pull-refresh.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 下拉刷新状态 */
export type PullRefreshStatus = "normal" | "pulling" | "loosing" | "loading" | "success"

const defaultProps = buildDefaultProps("pull-refresh", {
  modelValue: false,
  pullingText: "下拉即可刷新...",
  loosingText: "释放即可刷新...",
  loadingText: "加载中...",
  successText: "刷新成功",
  successDuration: 500,
  headHeight: undefined,
  disabled: false,
  pullDistance: undefined,
  animationDuration: 300,
  customClass: undefined,
  customStyle: undefined,
})

export const pullRefreshProps = {
  /** 加载中状态 (v-model) */
  modelValue: defaultProps("modelValue", { type: Boolean }),
  /** 下拉中提示文案 */
  pullingText: defaultProps("pullingText", { type: String }),
  /** 释放可刷新提示文案 */
  loosingText: defaultProps("loosingText", { type: String }),
  /** 加载中提示文案 */
  loadingText: defaultProps("loadingText", { type: String }),
  /** 刷新成功提示文案 (空字符串关闭成功提示) */
  successText: defaultProps("successText", { type: String }),
  /** 成功提示展示时长 (ms) */
  successDuration: defaultProps("successDuration", { type: Number }),
  /** 头部高度 (px)，未传走 SCSS 默认 50px */
  headHeight: defaultProps("headHeight", { type: [Number, String] }),
  /** 禁用下拉刷新 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 触发刷新阈值 (px)，未传等于 headHeight */
  pullDistance: defaultProps("pullDistance", { type: [Number, String] as PropType<number | string> }),
  /** 头部展开/收起动画时长 (ms) */
  animationDuration: defaultProps("animationDuration", { type: Number }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const pullRefreshEmits = {
  /** modelValue 双向绑定 */
  "update:modelValue": (value: boolean) => typeof value === "boolean",
  /** 触发刷新 (达到阈值释放后) */
  refresh: () => true,
  /** 状态变化 (normal | pulling | loosing | loading | success) */
  change: (status: PullRefreshStatus) => typeof status === "string",
}

export type PullRefreshEmits = typeof pullRefreshEmits
export type PullRefreshProps = ExtractPropTypes<typeof pullRefreshProps>
export type PullRefreshInstance = InstanceType<typeof PullRefresh>
