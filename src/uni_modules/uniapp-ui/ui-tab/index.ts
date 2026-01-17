import type Tab from "./ui-tab.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp } from "../utils/props"

export const [tabProps, useTabProps] = createProps("tab", {
  /**
   * 标题
   */
  title: String,
  /**
   * 标识符
   */
  name: numericProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const tabEmits = {
  click: (name: number | string) => true,
}

export type TabEmits = typeof tabEmits
export type TabProps = ExtractPropTypes<typeof tabProps>
export type TabInstance = InstanceType<typeof Tab>
