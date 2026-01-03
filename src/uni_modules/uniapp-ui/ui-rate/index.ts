import type Rate from "./ui-rate.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [rateProps, useRateProps] = createProps("rate", {
  /**
   * 当前分值
   */
  modelValue: makeNumberProp(0),
  /**
   * 图标选中时的名称
   */
  icon: makeStringProp("star"),
  /**
   * 图标未选中时的名称
   */
  voidIcon: makeStringProp("star-o"),
  /**
   * 最多可选数量
   */
  count: makeNumberProp(5),
  /**
   * 图标大小
   */
  size: makeNumericProp(""),
  /**
   * 图标选中时的颜色
   */
  color: makeStringProp("primary"),
  /**
   * 图标未选中时的颜色
   */
  voidColor: makeStringProp("#c8c9cc"),
  /**
   * 图标间距
   */
  gutter: makeNumericProp("8rpx"),
  /**
   * 是否为只读
   */
  readonly: Boolean,
  /**
   * 是否可以通过滑动手势选择评分
   */
  touchable: truthProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 图标禁用时的颜色
   */
  disabledColor: makeStringProp("#c8c9cc"),
  /**
   * 是否允许半星选择
   */
  allowHalf: Boolean,
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const rateEmits = {
  change: (value: number) => value,
  "update:modelValue": (value: number) => value,
}

export type RateEmits = typeof rateEmits
export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateInstance = InstanceType<typeof Rate>
