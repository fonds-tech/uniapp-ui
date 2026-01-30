import type Row from "./ui-row.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("row", {
  gap: 0,
  colGap: 0,
  rowGap: 0,
  align: "stretch",
  justify: "start",
  wrap: true,
  customClass: "",
  customStyle: "",
})

export const rowProps = {
  /**
   * 统一间距（同时设置行间距和列间距）
   */
  gap: defaultProps("gap", { type: Number }),
  /**
   * 列间距（水平方向）
   */
  colGap: defaultProps("colGap", { type: Number }),
  /**
   * 行间距（垂直方向）
   */
  rowGap: defaultProps("rowGap", { type: Number }),
  /**
   * 垂直对齐方式
   */
  align: defaultProps("align", { type: String, values: ["start", "end", "center", "stretch", "baseline"] }),
  /**
   * 水平对齐方式
   */
  justify: defaultProps("justify", { type: String, values: ["start", "end", "center", "between", "around"] }),
  /**
   * 是否允许换行
   */
  wrap: defaultProps("wrap", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const rowEmits = {}

export type RowEmits = typeof rowEmits
export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row>
