import type CollapseItem from "./ui-collapse-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("collapse-item", {
  name: "",
  title: "",
  value: "",
  label: "",
  icon: "",
  disabled: false,
  readonly: false,
  isLink: true,
  border: true,
  duration: 300,
  customClass: "",
  customStyle: "",
})

export const collapseItemProps = {
  /** 唯一标识符（必填） */
  name: defaultProps("name", { type: [String, Number], required: true as const }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 右侧内容 */
  value: defaultProps("value", { type: [String, Number] }),
  /** 标题下方描述 */
  label: defaultProps("label", { type: String }),
  /** 左侧图标 */
  icon: defaultProps("icon", { type: String }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否显示箭头 */
  isLink: defaultProps("isLink", { type: Boolean }),
  /** 是否显示下边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 动画时长（毫秒） */
  duration: defaultProps("duration", { type: Number }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const collapseItemEmits = {
  /** 点击事件 */
  click: (event: any) => true,
}

export type CollapseItemEmits = typeof collapseItemEmits
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export interface CollapseItemExpose {
  /** 组件名称 */
  name: string | number
  /** 是否展开 */
  expanded: boolean
  /** 切换展开状态 */
  toggle: (expanded?: boolean) => void
}

export type CollapseItemInstance = InstanceType<typeof CollapseItem>
