import type Resize from "./ui-resize.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("resize", {
  width: undefined,
  height: undefined,
  disabled: false,
  customClass: "",
  customStyle: "",
})

export const resizeProps = {
  /**
   * 初始宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 初始高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const resizeEmits = {
  resize: (value: any) => true,
}

export type ResizeEmits = typeof resizeEmits
export type ResizeProps = ExtractPropTypes<typeof resizeProps>
export type ResizeInstance = InstanceType<typeof Resize>
