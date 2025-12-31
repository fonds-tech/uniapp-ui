import type Badge from "./ui-badge.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp, makeNumericProp } from "../utils/props"

export const badgeProps = buildProps("badge", {
  /**
   * 内容值
   */
  value: numericProp,
  /**
   * 是否显示圆点
   */
  dot: Boolean,
  /**
   * 图标名称
   */
  icon: String,
  /**
   * 颜色
   */
  color: String,
  /**
   * 圆点大小
   */
  dotSize: numericProp,
  /**
   * 最大值
   */
  max: makeNumericProp("99"),
  /**
   * 为零时是否显示
   */
  showZero: Boolean,
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 圆角值
   */
  radius: numericProp,
  /**
   * 位置偏移值
   */
  offset: [String, Number, Array],
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 定位类型
   */
  position: {
    type: String,
    default: "top-right",
  },
  /**
   * 字体大小
   */
  valueSize: numericProp,
  /**
   * 字体颜色
   */
  valueColor: String,
  /**
   * 字体粗细
   */
  valueWeight: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const badgeEmits = {
  click: () => true,
}

export type BadgeEmits = typeof badgeEmits
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeInstance = InstanceType<typeof Badge>
