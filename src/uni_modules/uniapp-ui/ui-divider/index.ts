import type Divider from "./ui-divider.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("divider", {
  type: "solid",
  direction: "horizontal",
  contentPosition: "center",
  borderColor: "",
  margin: "",
  dashed: false,
  hairline: false,
  customClass: "",
  customStyle: "",
})

export const dividerProps = {
  /** 分割线类型 solid 实线 dashed 虚线 dotted 点线 */
  type: defaultProps("type", {
    type: String as PropType<"solid" | "dashed" | "dotted">,
    validator: (v: string) => ["solid", "dashed", "dotted"].includes(v),
  }),
  /** 分割线方向 horizontal 水平 vertical 垂直 */
  direction: defaultProps("direction", {
    type: String as PropType<"horizontal" | "vertical">,
    validator: (v: string) => ["horizontal", "vertical"].includes(v),
  }),
  /** 内容位置 left 左侧 center 居中 right 右侧 */
  contentPosition: defaultProps("contentPosition", {
    type: String as PropType<"left" | "center" | "right">,
    validator: (v: string) => ["left", "center", "right"].includes(v),
  }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 外边距 */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 是否为虚线（快捷属性，优先级高于 type） */
  dashed: defaultProps("dashed", { type: Boolean }),
  /** 是否使用细线（0.5px） */
  hairline: defaultProps("hairline", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const dividerEmits = {}

export type DividerEmits = typeof dividerEmits
export type DividerProps = ExtractPropTypes<typeof dividerProps>

export interface DividerExpose {
  name: "ui-divider"
}

export type DividerInstance = InstanceType<typeof Divider>
