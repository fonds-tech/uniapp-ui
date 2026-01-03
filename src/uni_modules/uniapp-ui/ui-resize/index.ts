import type Resize from "./ui-resize.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, numericProp, makeStringProp } from "../utils/props"

export const [resizeProps, useResizeProps] = createProps("resize", {
  /**
   * 初始宽度
   */
  width: numericProp,
  /**
   * 初始高度
   */
  height: numericProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const resizeEmits = {
  resize: (value: any) => true,
}

export type ResizeEmits = typeof resizeEmits
export type ResizeProps = ExtractPropTypes<typeof resizeProps>
export type ResizeInstance = InstanceType<typeof Resize>
