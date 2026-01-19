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
   * 内容颜色（可被子组件继承）
   */
  contentColor: String,
  /**
   * 内容大小（可被子组件继承）
   */
  contentSize: numericProp,
  /**
   * 内容粗细（可被子组件继承）
   */
  contentWeight: numericProp,
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
