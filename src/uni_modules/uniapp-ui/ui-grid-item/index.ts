import type GridItem from "./ui-grid-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("grid-item", {
  text: "",
  icon: "",
  iconColor: "",
  iconSize: "",
  dot: false,
  badge: "",
  customClass: "",
  customStyle: "",
})

export const gridItemProps = {
  /** 文字 */
  text: defaultProps("text", { type: String }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 是否显示徽标小红点 */
  dot: defaultProps("dot", { type: Boolean }),
  /** 徽标内容 */
  badge: defaultProps("badge", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const gridItemEmits = {
  /** 点击事件 */
  click: (event: any) => true,
}

export type GridItemEmits = typeof gridItemEmits
export type GridItemProps = ExtractPropTypes<typeof gridItemProps>
export type GridItemInstance = InstanceType<typeof GridItem>
