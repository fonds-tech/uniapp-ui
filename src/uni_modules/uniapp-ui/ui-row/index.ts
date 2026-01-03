import type Row from "./ui-row.vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [rowProps, useRowProps] = createProps("row", {
  /**
   * 统一间距（同时设置行间距和列间距）
   */
  gap: makeNumericProp(0),
  /**
   * 列间距（水平方向）
   */
  colGap: makeNumericProp(0),
  /**
   * 行间距（垂直方向）
   */
  rowGap: makeNumericProp(0),
  /**
   * 垂直对齐方式
   */
  align: { type: String, default: "stretch", values: ["start", "end", "center", "stretch", "baseline"] },
  /**
   * 水平对齐方式
   */
  justify: { type: String, default: "start", values: ["start", "end", "center", "between", "around"] },
  /**
   * 是否允许换行
   */
  wrap: { type: Boolean, default: true },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export type RowInstance = InstanceType<typeof Row>
