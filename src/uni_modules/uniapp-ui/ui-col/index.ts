import type Col from "./ui-col.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("col", {
  span: 24,
  offset: 0,
  customClass: undefined,
  customStyle: undefined,
})

export const colProps = {
  /** 栅格占据的列数（总 24 列） */
  span: defaultProps("span", { type: [Number, String] }),
  /** 栅格左侧偏移格数 */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const colEmits = {}

export type ColEmits = typeof colEmits
export type ColProps = ExtractPropTypes<typeof colProps>
export type ColInstance = InstanceType<typeof Col>
