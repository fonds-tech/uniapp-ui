import type Notify from "./ui-notify.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [notifyProps, useNotifyProps] = createProps("notify", {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 自定义类名
   */
  type: {
    type: String as PropType<NotifyType>,
    default: "primary",
    validator: (t: string) => ["primary", "success", "warning", "danger"].includes(t),
  },
  /**
   * 展示内容
   */
  content: makeStringProp(""),
  /**
   * 展示时长，单位ms
   */
  duration: makeNumericProp("3000"),
  /**
   * 字体颜色
   */
  color: makeStringProp(""),
  /**
   * 字体大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 字体粗细
   */
  fontWeight: makeStringProp(""),
  /**
   * 背景色
   */
  background: makeStringProp(""),
  /**
   * 元素层级
   */
  zIndex: makeNumericProp("2000"),
  /**
   * 距离顶部偏移
   */
  offsetTop: makeNumericProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const notifyEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: () => true,
  "update:show": (value: boolean) => true,
}

export interface NotifyOptions {
  show?: boolean
  type?: NotifyType
  content?: string
  duration?: string | number
  color?: string
  fontSize?: string | number
  fontWeight?: string
  background?: string
  zIndex?: string | number
  offsetTop?: string | number
  customClass?: string
  customStyle?: string | Record<string, any>
}
export type NotifyType = "primary" | "success" | "warning" | "danger"
export type NotifyProps = ExtractPropTypes<typeof notifyProps>
export type NotifyInstance = InstanceType<typeof Notify>
