import type Row from "./ui-row.vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [rowProps, useRowProps] = createProps("row", {
  /**
   * 间隔距离
   */
  gap: makeNumericProp(""),
  /**
   * 列间隔距离
   */
  colGap: makeNumericProp(""),
  /**
   * 行间隔距离
   */
  rowGap: makeNumericProp(""),
  /**
   * 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const rowEmits = {}

export type RowEmits = typeof rowEmits
export interface RowExpose {
  name: "ui-row"
  resize: () => void
}

export type RowInstance = InstanceType<typeof Row>
