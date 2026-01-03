import type Col from "./ui-col.vue"
import { createProps } from "../hooks"
import { styleProp, makeNumberProp, makeStringProp } from "../utils/props"

export const [colProps, useColProps] = createProps("col", {
  /**
   * 栅格占据的列数（总共24列）
   */
  span: makeNumberProp(24),
  /**
   * 栅格左侧的偏移格数
   */
  offset: makeNumberProp(0),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export type ColInstance = InstanceType<typeof Col>
