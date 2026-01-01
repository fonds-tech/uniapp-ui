import type FloatButton from "./ui-float-button.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [floatButtonProps, useFloatButtonProps] = createProps("floatButton", {
  /**
   * 图标名称
   */
  icon: makeStringProp("plus"),
  /**
   * 按钮文本，为空时只显示图标
   */
  text: { type: String, default: "" },
  /**
   * 按钮类型
   */
  type: {
    type: String,
    default: "primary",
    validator: (v: string) => ["primary", "success", "warning", "danger", "default"].includes(v),
  },
  /**
   * 按钮尺寸
   */
  size: makeNumericProp("100rpx"),
  /**
   * 按钮宽度，优先级高于size
   */
  width: numericProp,
  /**
   * 按钮高度，优先级高于size
   */
  height: numericProp,
  /**
   * 位置
   */
  position: {
    type: String,
    default: "right-bottom",
    validator: (v: string) => ["left-bottom", "right-bottom", "left-top", "right-top"].includes(v),
  },
  /**
   * 距离右侧的距离
   */
  right: makeNumericProp("24rpx"),
  /**
   * 距离底部的距离
   */
  bottom: makeNumericProp("100rpx"),
  /**
   * 距离左侧的距离
   */
  left: numericProp,
  /**
   * 距离顶部的距离
   */
  top: numericProp,
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(100),
  /**
   * 自定义背景色
   */
  color: { type: String, default: "" },
  /**
   * 图标颜色
   */
  iconColor: makeStringProp("#fff"),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp("40rpx"),
  /**
   * 文本颜色
   */
  textColor: makeStringProp("#fff"),
  /**
   * 文本大小
   */
  textSize: numericProp,
  /**
   * 阴影样式，传入box-shadow值
   */
  shadow: { type: String, default: "0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2)" },
  /**
   * 圆角大小
   */
  borderRadius: numericProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否加载中
   */
  loading: Boolean,
  /**
   * 是否适配底部安全区域
   */
  safeAreaBottom: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const floatButtonEmits = {
  click: () => true,
}

export type FloatButtonEmits = typeof floatButtonEmits
export type FloatButtonProps = ExtractPropTypes<typeof floatButtonProps>
export type FloatButtonInstance = InstanceType<typeof FloatButton>
