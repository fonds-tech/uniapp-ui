import type Col from "./ui-col.vue"
import { createProps } from "../hooks"
import { styleProp, makeNumberProp, makeStringProp } from "../utils/props"

export const [colProps, useColProps] = createProps("col", {
  /**
   * 栅格占据的列数
   */
  span: makeNumberProp(24),
  /**
   * 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * 栅格左侧的间隔格数
   */
  offset: makeNumberProp(0),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const colEmits = {}

export type ColEmits = typeof colEmits
export type ColInstance = InstanceType<typeof Col>
