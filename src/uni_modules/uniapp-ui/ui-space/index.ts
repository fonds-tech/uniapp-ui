import type Space from "./ui-space.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

// 间距方向类型
export type SpaceDirection = "horizontal" | "vertical"

// 对齐方式类型
export type SpaceAlign = "start" | "end" | "center" | "baseline" | "stretch"

// 主轴对齐方式类型
export type SpaceJustify = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly"

// 预设间距大小
export type SpaceSize = "mini" | "small" | "normal" | "large" | number | string

const defaultProps = buildDefaultProps("space", {
  direction: "horizontal",
  size: "normal",
  align: "",
  justify: "",
  wrap: false,
  fill: false,
  inline: false,
  gapRow: "",
  gapCol: "",
  customClass: "",
  customStyle: "",
})

export const spaceProps = {
  // ===== 布局配置 =====
  /** 间距方向 horizontal 水平 vertical 垂直 */
  direction: defaultProps("direction", {
    type: String as PropType<SpaceDirection>,
    validator: (v: string) => ["horizontal", "vertical"].includes(v),
  }),
  /** 间距大小，支持预设值 mini/small/normal/large 或自定义数值 */
  size: defaultProps("size", { type: [String, Number] as PropType<SpaceSize> }),
  /** 交叉轴对齐方式 */
  align: defaultProps("align", {
    type: String as PropType<SpaceAlign | "">,
    validator: (v: string) => ["", "start", "end", "center", "baseline", "stretch"].includes(v),
  }),
  /** 主轴对齐方式 */
  justify: defaultProps("justify", {
    type: String as PropType<SpaceJustify | "">,
    validator: (v: string) => ["", "start", "end", "center", "space-between", "space-around", "space-evenly"].includes(v),
  }),
  /** 是否自动换行（仅 horizontal 方向有效） */
  wrap: defaultProps("wrap", { type: Boolean }),
  /** 子元素是否填充整行/整列 */
  fill: defaultProps("fill", { type: Boolean }),
  /** 是否使用行内元素 */
  inline: defaultProps("inline", { type: Boolean }),
  /** 行间距（优先级高于 size） */
  gapRow: defaultProps("gapRow", { type: [String, Number] }),
  /** 列间距（优先级高于 size） */
  gapCol: defaultProps("gapCol", { type: [String, Number] }),

  // ===== 通用 =====
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const spaceEmits = {}

export type SpaceEmits = typeof spaceEmits
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

export interface SpaceExpose {
  name: "ui-space"
}

export type SpaceInstance = InstanceType<typeof Space>
