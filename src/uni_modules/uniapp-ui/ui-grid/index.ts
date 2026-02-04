import type Grid from "./ui-grid.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** Grid 内容排列方向 */
export type GridDirection = "horizontal" | "vertical"

/** Grid 注入 Key */
export const gridKey: InjectionKey<GridProvide> = Symbol("ui-grid")

const defaultProps = buildDefaultProps("grid", {
  columnNum: 4,
  border: true,
  center: true,
  square: false,
  gutter: 0,
  clickable: false,
  direction: "vertical",
  customClass: "",
  customStyle: "",
})

export const gridProps = {
  /** 列数 */
  columnNum: defaultProps("columnNum", { type: Number }),
  /** 是否显示边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 是否居中内容 */
  center: defaultProps("center", { type: Boolean }),
  /** 是否为正方形格子 */
  square: defaultProps("square", { type: Boolean }),
  /** 格子间距 */
  gutter: defaultProps("gutter", { type: [Number, String] }),
  /** 是否可点击 */
  clickable: defaultProps("clickable", { type: Boolean }),
  /** 内容排列方向 */
  direction: defaultProps("direction", { type: String as PropType<GridDirection> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const gridEmits = {}

export interface GridProvide {
  props: GridProps
}

export type GridEmits = typeof gridEmits
export type GridProps = ExtractPropTypes<typeof gridProps>
export type GridInstance = InstanceType<typeof Grid>
