import type Row from "./ui-row.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 水平对齐方式 */
export type RowJustify = "start" | "end" | "center" | "between" | "around"

/** 垂直对齐方式 */
export type RowAlign = "start" | "end" | "center" | "stretch" | "baseline"

const defaultProps = buildDefaultProps("row", {
  gap: undefined,
  colGap: undefined,
  rowGap: undefined,
  align: "stretch" as RowAlign,
  justify: "start" as RowJustify,
  wrap: true,
  customClass: undefined,
  customStyle: undefined,
})

export const rowProps = {
  /** 统一间距（同时设置行/列） */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 列间距（水平） */
  colGap: defaultProps("colGap", { type: [Number, String] }),
  /** 行间距（垂直，wrap 启用时生效） */
  rowGap: defaultProps("rowGap", { type: [Number, String] }),
  /** 垂直对齐 */
  align: defaultProps("align", { type: String as PropType<RowAlign> }),
  /** 水平对齐 */
  justify: defaultProps("justify", { type: String as PropType<RowJustify> }),
  /** 是否允许换行 */
  wrap: defaultProps("wrap", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const rowEmits = {}

export type RowEmits = typeof rowEmits
export type RowProps = ExtractPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row>
