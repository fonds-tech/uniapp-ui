import type Collapse from "./ui-collapse.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 折叠面板展开值 */
export type CollapseModelValue = string | number | (string | number)[]

export const collapseKey: InjectionKey<CollapseProvide> = Symbol("ui-collapse")

const defaultProps = buildDefaultProps("collapse", {
  modelValue: undefined,
  accordion: false,
  border: true,
  customClass: undefined,
  customStyle: undefined,
})

export const collapseProps = {
  /** 当前展开的 name 或 name 数组 */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] as PropType<CollapseModelValue> }),
  /** 手风琴模式（仅允许展开一项） */
  accordion: defaultProps("accordion", { type: Boolean }),
  /** 是否显示底部分割线 */
  border: defaultProps("border", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const collapseEmits = {
  /** 值变化事件 */
  change: (value: CollapseModelValue) => value !== undefined,
  /** 更新绑定值事件 */
  "update:modelValue": (value: CollapseModelValue) => value !== undefined,
}

export type CollapseEmits = typeof collapseEmits
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export interface CollapseProvide {
  props: CollapseProps
  activeNames: Ref<(string | number)[]>
  toggle: (name: string | number, expanded: boolean) => void
}

export type CollapseInstance = InstanceType<typeof Collapse>
