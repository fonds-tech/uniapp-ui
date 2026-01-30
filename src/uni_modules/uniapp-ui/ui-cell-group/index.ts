import type CellGroup from "./ui-cell-group.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const cellGroupKey: InjectionKey<CellGroupProvide> = Symbol("ui-cell-group")
const defaultProps = buildDefaultProps("cell-group", {
  radius: undefined,
  background: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const cellGroupProps = {
  /**
   * 圆角值
   */
  radius: defaultProps("radius", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const cellGroupEmits = {}

export type CellGroupEmits = typeof cellGroupEmits
export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
export interface CellGroupProvide {
  props: CellGroupProps
  childrens: any[]
}
export type CellGroupInstance = InstanceType<typeof CellGroup>
