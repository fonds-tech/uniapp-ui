import type Switch from "./ui-switch.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const switchProps = buildProps("switch", {
  /**
   * 开关选中状态
   */
  modelValue: { type: [Number, String, Boolean], default: false },
  /**
   * 开关按钮的尺寸
   */
  size: makeNumericProp(""),
  /**
   * 圆点与背景的间距
   */
  gutter: makeNumericProp(""),
  /**
   * 是否为加载状态
   */
  loading: Boolean,
  /**
   * 是否为禁用状态
   */
  disabled: Boolean,
  /**
   * 打开时对应的值
   */
  activeValue: { type: [Number, String, Boolean], default: true },
  /**
   * 关闭时对应的值
   */
  inactiveValue: { type: [Number, String, Boolean], default: false },
  /**
   * 打开时的背景色
   */
  activeColor: makeStringProp(""),
  /**
   * 关闭时的背景色
   */
  inactiveColor: makeStringProp(""),
  /**
   * 加载中图标大小
   */
  loadingIconSize: makeNumericProp(""),
  /**
   * 加载中图标颜色
   */
  loadingIconColor: makeStringProp(""),
  /**
   * 状态变化前的回调函数
   */
  beforeChange: { type: Function },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const switchEmits = {
  change: (value: number | string | boolean) => true,
  "update:modelValue": (value: number | string | boolean) => true,
}

export type SwitchEmits = typeof switchEmits
export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchInstance = InstanceType<typeof Switch>
