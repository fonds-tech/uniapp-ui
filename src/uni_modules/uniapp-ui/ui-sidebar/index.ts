import type Sidebar from "./ui-sidebar.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeNumericProp } from "../utils/props"

export const sidebarKey: InjectionKey<SidebarProvide> = Symbol("ui-sidebar")
export const [sidebarProps, useSidebarProps] = createProps("sidebar", {
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(0),
  /**
   * 宽度
   */
  width: numericProp,
  /**
   * 高度，默认自动
   */
  height: numericProp,
  /**
   * 激活线条动画过渡时间，单位ms
   */
  duration: makeNumericProp(300),
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 激活线条颜色
   */
  lineColor: String,
  /**
   * 激活线条宽度
   */
  lineWidth: numericProp,
  /**
   * 激活线条高度
   */
  lineHeight: makeNumericProp("40rpx"),
  /**
   * 激活线条圆角
   */
  lineRadius: numericProp,
  /**
   * 是否显示线条
   */
  showLine: truthProp,
  /**
   * 是否自动滚动
   */
  autoScroll: truthProp,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const sidebarEmits = {
  change: (name: number | string) => true,
  clickItem: (name: number | string, index: number) => true,
  "update:modelValue": (name: number | string) => true,
}

export type SidebarEmits = typeof sidebarEmits
export type SidebarProps = ExtractPropTypes<typeof sidebarProps>
export interface SidebarProvide {
  props: SidebarProps
  useProps: SidebarProps
  currentName: Ref<string | number | null>
  clickItem: (name: string | number, index: number) => void
  setLine: (name: string | number) => void
  scrollIntoView: (name: string | number) => void
  setCurrentName: (name: string | number) => void
}
export type SidebarInstance = InstanceType<typeof Sidebar>
