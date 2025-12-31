import type Transition from "./ui-transition.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { isBoolean } from "../utils/check"
import { truthProp, buildProps, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const transitionProps = buildProps("transition", {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 动画名称，有效值fade、zoom-in、fade-up、fade-down、fade-left、fade-right、slide-up、slide-down、slide-left、slide-right
   */
  name: makeStringProp<TransitionName>("fade"),
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 过渡时间
   */
  duration: makeNumericProp(300),
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: truthProp,
  /**
   * 进入动画函数
   */
  enterTimingFunction: makeStringProp("ease-out"),
  /**
   * 离开动画函数
   */
  leaveTimingFunction: makeStringProp("ease-in"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const transitionEmits = {
  click: () => true,
  enter: () => true,
  leave: () => true,
  beforeEnter: () => true,
  afterEnter: () => true,
  afterLeave: () => true,
  beforeLeave: () => true,
  "update:show": (show: boolean) => isBoolean(show),
}

export type TransitionName = "fade" | "zoom-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right"
export type TransitionEmits = typeof transitionEmits
export type TransitionProps = ExtractPropTypes<typeof transitionProps>
export type TransitionInstance = InstanceType<typeof Transition>
