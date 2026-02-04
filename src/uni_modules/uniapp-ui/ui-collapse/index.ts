import type Collapse from "./ui-collapse.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 折叠面板展开值类型 */
export type CollapseModelValue = string | number | (string | number)[]

export const collapseKey: InjectionKey<CollapseProvide> = Symbol("ui-collapse")

const defaultProps = buildDefaultProps("collapse", {
  modelValue: undefined,
  accordion: false,
  border: true,
  customClass: "",
  customStyle: "",
})

export const collapseProps = {
  /** 当前展开的 name 或 name 数组 */
  modelValue: defaultProps("modelValue", { type: [String, Number, Array] as PropType<CollapseModelValue> }),
  /** 是否为手风琴模式（只允许展开一个） */
  accordion: defaultProps("accordion", { type: Boolean }),
  /** 是否显示边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const collapseEmits = {
  /** 值变化事件 */
  change: (value: CollapseModelValue) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: CollapseModelValue) => true,
}

export type CollapseEmits = typeof collapseEmits
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export interface CollapseProvide {
  props: CollapseProps
  activeNames: Ref<(string | number)[]>
  toggle: (name: string | number, expanded: boolean) => void
}

export type CollapseInstance = InstanceType<typeof Collapse>
