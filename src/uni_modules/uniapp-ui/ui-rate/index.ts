import type Rate from "./ui-rate.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("rate", {
  modelValue: 0,
  icon: "star-fill",
  voidIcon: "star",
  count: 5,
  size: "40rpx",
  color: "primary",
  voidColor: "#c8c9cc",
  gutter: "8rpx",
  readonly: false,
  touchable: true,
  disabled: false,
  disabledColor: "#c8c9cc",
  allowHalf: false,
  iconWeight: "",
  customClass: "",
  customStyle: "",
})

export const rateProps = {
  /**
   * 当前分值
   */
  modelValue: defaultProps("modelValue", { type: Number }),
  /**
   * 图标选中时的名称
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 图标未选中时的名称
   */
  voidIcon: defaultProps("voidIcon", { type: String }),
  /**
   * 最多可选数量
   */
  count: defaultProps("count", { type: Number }),
  /**
   * 图标大小
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 图标选中时的颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 图标未选中时的颜色
   */
  voidColor: defaultProps("voidColor", { type: String }),
  /**
   * 图标间距
   */
  gutter: defaultProps("gutter", { type: [Number, String] }),
  /**
   * 是否为只读
   */
  readonly: defaultProps("readonly", { type: Boolean }),
  /**
   * 是否可以通过滑动手势选择评分
   */
  touchable: defaultProps("touchable", { type: Boolean }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 图标禁用时的颜色
   */
  disabledColor: defaultProps("disabledColor", { type: String }),
  /**
   * 是否允许半星选择
   */
  allowHalf: defaultProps("allowHalf", { type: Boolean }),
  /**
   * 图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const rateEmits = {
  change: (value: number) => value,
  "update:modelValue": (value: number) => value,
}

export type RateEmits = typeof rateEmits
export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateInstance = InstanceType<typeof Rate>
