import type Tab from "./ui-tab.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("tab", {
  title: undefined,
  name: undefined,
  disabled: false,
  customClass: undefined,
  customStyle: undefined,
})

export const tabProps = {
  /**
   * 标题
   */
  title: defaultProps("title", { type: String }),
  /**
   * 标识符
   */
  name: defaultProps("name", { type: [Number, String] }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const tabEmits = {
  click: (name: number | string) => true,
}

export type TabEmits = typeof tabEmits
export type TabProps = ExtractPropTypes<typeof tabProps>
export type TabInstance = InstanceType<typeof Tab>
