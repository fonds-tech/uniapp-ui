import type IndexBar from "./ui-index-bar.vue"
import type { Ref, PropType, InjectionKey, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const indexBarKey: InjectionKey<IndexBarProvide> = Symbol("ui-index-bar")
export const [indexBarProps, useIndexBarProps] = createProps("indexBar", {
  /**
   * 索引字符列表
   */
  indexs: { type: Array as PropType<(string | number)[]>, default: () => [] },
  /**
   * 元素层级
   */
  zIndex: makeNumericProp("1"),
  /**
   * 是否自动吸顶
   */
  sticky: truthProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const indexBarEmits = {
  select: (index: number | string) => index,
}

export type IndexBarEmits = typeof indexBarEmits
export type IndexBarProps = ExtractPropTypes<typeof indexBarProps>
export interface IndexBarProvide {
  props: IndexBarProps
  useProps: IndexBarProps
  currentName: Ref<string | number | null>
}
export type IndexBarInstance = InstanceType<typeof IndexBar>
