import type CellGroup from "./ui-cell-group.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp } from "../utils/props"

export const cellGroupKey: InjectionKey<CellGroupProvide> = Symbol("ui-cell-group")
export const [cellGroupProps, useCellGroupProps] = createProps("cellGroup", {
  /**
   * 圆角值
   */
  radius: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const cellGroupEmits = {}

export type CellGroupEmits = typeof cellGroupEmits
export type CellGroupProps = ExtractPropTypes<typeof cellGroupProps>
export interface CellGroupProvide {
  props: CellGroupProps
  childrens: any[]
}
export type CellGroupInstance = InstanceType<typeof CellGroup>
