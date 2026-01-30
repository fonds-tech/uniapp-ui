import type Col from "./ui-col.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("col", {
  span: 24,
  offset: 0,
  customClass: "",
  customStyle: "",
})

export const colProps = {
  /**
   * 栅格占据的列数（总共24列）
   */
  span: defaultProps("span", { type: Number }),
  /**
   * 栅格左侧的偏移格数
   */
  offset: defaultProps("offset", { type: Number }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const colEmits = {}

export type ColEmits = typeof colEmits
export type ColProps = ExtractPropTypes<typeof colProps>
export type ColInstance = InstanceType<typeof Col>
