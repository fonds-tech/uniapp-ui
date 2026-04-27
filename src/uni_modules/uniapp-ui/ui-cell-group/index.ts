import type CellGroup from "./ui-cell-group.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const cellGroupKey: InjectionKey<CellGroupProvide> = Symbol("ui-cell-group")

const defaultProps = buildDefaultProps("cell-group", {
  radius: undefined,
  background: undefined,
  padding: undefined,
  margin: undefined,
  inset: false,
  customClass: undefined,
  customStyle: undefined,
})

export const cellGroupProps = {
  /** 圆角值 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 内边距（CSS padding 简写） */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 外边距（CSS margin 简写） */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 卡片内嵌模式：默认带圆角与外间距，iOS 列表风格 */
  inset: defaultProps("inset", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
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
