import type Space from "./ui-space.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type SpaceDirection = "horizontal" | "vertical"

export type SpaceAlign = "start" | "end" | "center" | "baseline" | "stretch"

export type SpaceJustify = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly"

/** 预设间距档对应 token */
export type SpaceSizeToken = "xs" | "sm" | "md" | "lg" | "xl"

export type SpaceSize = SpaceSizeToken | number | string

export const SPACE_SIZE_MAP: Record<SpaceSizeToken, string> = {
  xs: "var(--ui-spacing-xs)",
  sm: "var(--ui-spacing-sm)",
  md: "var(--ui-spacing-md)",
  lg: "var(--ui-spacing-lg)",
  xl: "var(--ui-spacing-xl)",
}

const defaultProps = buildDefaultProps("space", {
  direction: "horizontal",
  size: "md",
  align: undefined,
  justify: undefined,
  wrap: false,
  fill: false,
  inline: false,
  gapRow: undefined,
  gapCol: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const spaceProps = {
  /** 排列方向 */
  direction: defaultProps("direction", {
    type: String as PropType<SpaceDirection>,
    validator: (v: string) => ["horizontal", "vertical"].includes(v),
  }),
  /** 间距大小：预设档 xs/sm/md/lg/xl 或任意 number/string */
  size: defaultProps("size", { type: [String, Number] as PropType<SpaceSize> }),
  /** 交叉轴对齐 */
  align: defaultProps("align", {
    type: String as PropType<SpaceAlign>,
    validator: (v: string) => ["start", "end", "center", "baseline", "stretch"].includes(v),
  }),
  /** 主轴对齐 */
  justify: defaultProps("justify", {
    type: String as PropType<SpaceJustify>,
    validator: (v: string) => ["start", "end", "center", "space-between", "space-around", "space-evenly"].includes(v),
  }),
  /** 自动换行（仅 horizontal 有效） */
  wrap: defaultProps("wrap", { type: Boolean }),
  /** 子元素均分填充 */
  fill: defaultProps("fill", { type: Boolean }),
  /** 行内布局 */
  inline: defaultProps("inline", { type: Boolean }),
  /** 行间距，覆盖 size（仅 wrap 时影响行间） */
  gapRow: defaultProps("gapRow", { type: [String, Number] }),
  /** 列间距，覆盖 size */
  gapCol: defaultProps("gapCol", { type: [String, Number] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export type SpaceProps = ExtractPropTypes<typeof spaceProps>
export type SpaceInstance = InstanceType<typeof Space>
