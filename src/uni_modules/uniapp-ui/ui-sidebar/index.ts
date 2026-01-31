import type Sidebar from "./ui-sidebar.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const sidebarKey: InjectionKey<SidebarProvide> = Symbol("ui-sidebar")

const defaultProps = buildDefaultProps("sidebar", {
  modelValue: 0,
  width: undefined,
  height: undefined,
  duration: 300,
  background: undefined,
  lineColor: undefined,
  lineWidth: undefined,
  lineHeight: "40rpx",
  lineRadius: undefined,
  showLine: true,
  autoScroll: true,
  zIndex: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const sidebarProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 高度，默认自动 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 激活线条动画过渡时间，单位ms */
  duration: defaultProps("duration", { type: Number }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 激活线条颜色 */
  lineColor: defaultProps("lineColor", { type: String }),
  /** 激活线条宽度 */
  lineWidth: defaultProps("lineWidth", { type: [Number, String] }),
  /** 激活线条高度 */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /** 激活线条圆角 */
  lineRadius: defaultProps("lineRadius", { type: [Number, String] }),
  /** 是否显示线条 */
  showLine: defaultProps("showLine", { type: Boolean }),
  /** 是否自动滚动 */
  autoScroll: defaultProps("autoScroll", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const sidebarEmits = {
  /** 值变化事件 */
  change: (name: number | string) => true,
  /** 点击选项事件 */
  clickItem: (name: number | string, index: number) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (name: number | string) => true,
}

export type SidebarEmits = typeof sidebarEmits
export type SidebarProps = ExtractPropTypes<typeof sidebarProps>

export interface SidebarProvide {
  props: SidebarProps
  currentName: Ref<string | number | null>
  clickItem: (name: string | number, index: number) => void
  setLine: (name: string | number) => void
  scrollIntoView: (name: string | number) => void
  setCurrentName: (name: string | number) => void
}

export type SidebarInstance = InstanceType<typeof Sidebar>
