import type Tag from "./ui-tag.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const tagProps = buildProps("tag", {
  /**
   * 是否显示
   */
  show: truthProp,
  /**
   * 主题类型
   */
  type: { type: String, default: "primary", validator: (v: string) => ["primary", "success", "warning", "error", "info"].includes(v) },
  /**
   * 标签的文字内容
   */
  text: makeStringProp(""),
  /**
   * 标签的文字大小
   */
  textSize: makeNumericProp(""),
  /**
   * 标签的文字颜色
   */
  textColor: makeStringProp(""),
  /**
   * 标签的文字粗细
   */
  textWeight: makeNumericProp(""),
  /**
   * 图标名称
   */
  icon: makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp(""),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 是否圆形的
   */
  round: Boolean,
  /**
   * 是否镂空的
   */
  plain: Boolean,
  /**
   * 是否为可关闭标签
   */
  closeable: Boolean,
  /**
   * 高度
   */
  height: makeNumericProp(""),
  /**
   * 内边距
   */
  padding: makeStringProp(""),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 边框颜色
   */
  borderColor: makeStringProp(""),
  /**
   * 边框大小
   */
  borderWidth: makeNumericProp(""),
  /**
   * 圆角大小
   */
  borderRadius: makeNumericProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const tagEmits = {
  click: () => true,
  close: () => true,
  "update:show": (show: boolean) => show,
}

export type TagEmits = typeof tagEmits
export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagInstance = InstanceType<typeof Tag>
