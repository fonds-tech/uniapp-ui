import type CellGroup from "./ui-cell-group.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp } from "../utils/props"

export const cellGroupKey: InjectionKey<TabsProvide> = Symbol("ui-cell-group")
export const cellGroupProps = buildProps("cellGroup", {
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
export interface TabsProvide {
  props: CellGroupProps
}
export type CellGroupInstance = InstanceType<typeof CellGroup>
