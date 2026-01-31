import type Transition from "./ui-transition.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { isBoolean } from "../utils/check"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("transition", {
  show: false,
  name: "fade",
  zIndex: undefined,
  duration: 300,
  lazyRender: true,
  enterTimingFunction: "ease-out",
  leaveTimingFunction: "ease-in",
  customClass: undefined,
  customStyle: undefined,
})

export const transitionProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 动画名称，有效值fade、zoom-in、fade-up、fade-down、fade-left、fade-right、slide-up、slide-down、slide-left、slide-right */
  name: defaultProps("name", { type: String as PropType<TransitionName> }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 过渡时间 */
  duration: defaultProps("duration", { type: Number }),
  /** 是否在显示时才渲染节点 */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /** 进入动画函数 */
  enterTimingFunction: defaultProps("enterTimingFunction", { type: String }),
  /** 离开动画函数 */
  leaveTimingFunction: defaultProps("leaveTimingFunction", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const transitionEmits = {
  /** 点击事件 */
  click: () => true,
  /** 进入过渡开始事件 */
  enter: () => true,
  /** 离开过渡开始事件 */
  leave: () => true,
  /** 进入过渡之前事件 */
  beforeEnter: () => true,
  /** 进入过渡结束事件 */
  afterEnter: () => true,
  /** 离开过渡结束事件 */
  afterLeave: () => true,
  /** 离开过渡之前事件 */
  beforeLeave: () => true,
  /** 更新显示状态事件 */
  "update:show": (show: boolean) => isBoolean(show),
}

export type TransitionName = "fade" | "zoom-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right"
export type TransitionEmits = typeof transitionEmits
export type TransitionProps = ExtractPropTypes<typeof transitionProps>
export type TransitionInstance = InstanceType<typeof Transition>
