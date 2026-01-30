import type IndexBar from "./ui-index-bar.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const indexBarKey: InjectionKey<IndexBarProvide> = Symbol("ui-index-bar")
const defaultProps = buildDefaultProps("index-bar", {
  indexs: () => [],
  zIndex: "1",
  sticky: true,
  customClass: "",
  customStyle: "",
})

export const indexBarProps = {
  /**
   * 索引字符列表
   */
  indexs: defaultProps("indexs", { type: Array as PropType<(string | number)[]> }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 是否自动吸顶
   */
  sticky: defaultProps("sticky", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const indexBarEmits = {
  select: (index: number | string) => index,
}

export type IndexBarEmits = typeof indexBarEmits
export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>
export interface IndexBarProvide {
  props: IndexBarProps
  currentName: Ref<string | number | null>
}
export type IndexBarInstance = InstanceType<typeof IndexBar>
