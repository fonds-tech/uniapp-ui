import type Rate from "./ui-rate.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("rate", {
  modelValue: 0,
  icon: "star",
  voidIcon: "star-o",
  count: 5,
  size: "40rpx",
  color: "primary",
  voidColor: "border",
  gutter: "8rpx",
  readonly: false,
  touchable: true,
  disabled: false,
  disabledColor: "border",
  allowHalf: false,
  iconWeight: undefined,
  customClass: "",
  customStyle: "",
})

export const rateProps = {
  /** 当前分值 (v-model) */
  modelValue: defaultProps("modelValue", { type: Number }),
  /** 选中态图标名 */
  icon: defaultProps("icon", { type: String }),
  /** 未选态图标名 */
  voidIcon: defaultProps("voidIcon", { type: String }),
  /** 总数量 */
  count: defaultProps("count", { type: Number }),
  /** 图标大小 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 选中态颜色 */
  color: defaultProps("color", { type: String }),
  /** 未选态颜色 */
  voidColor: defaultProps("voidColor", { type: String }),
  /** 图标间距 */
  gutter: defaultProps("gutter", { type: [Number, String] }),
  /** 只读 (允许半星显示，禁止交互) */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 滑动手势可改分 */
  touchable: defaultProps("touchable", { type: Boolean }),
  /** 禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 禁用态颜色 */
  disabledColor: defaultProps("disabledColor", { type: String }),
  /** 允许半星 */
  allowHalf: defaultProps("allowHalf", { type: Boolean }),
  /** 图标字重 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const rateEmits = {
  /** 评分变化 */
  change: (value: number) => typeof value === "number",
  /** v-model 更新 */
  "update:modelValue": (value: number) => typeof value === "number",
}

export interface RateRangeItem {
  score: number
  left: number
  right: number
}

export interface RateItem {
  status: "full" | "half" | "void"
  value: number
}

export type RateEmits = typeof rateEmits
export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateInstance = InstanceType<typeof Rate>
