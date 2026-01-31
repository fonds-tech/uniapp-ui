import type Tabbar from "./ui-tabbar.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const tabbarKey: InjectionKey<TabbarProvide> = Symbol("ui-tabbar")

const defaultProps = buildDefaultProps("tabbar", {
  modelValue: 0,
  fixed: true,
  border: false,
  zIndex: "",
  activeColor: "",
  inactiveColor: "",
  route: false,
  height: "100rpx",
  background: "#ffffff",
  safeAreaInsetBottom: true,
  placeholder: true,
  customClass: "",
  customStyle: "",
  beforeChange: null,
})

export const tabbarProps = {
  /** 当前选中标签的名称或索引值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 是否固定定位 */
  fixed: defaultProps("fixed", { type: Boolean }),
  /** 是否显示边框线 */
  border: defaultProps("border", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 激活颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 未激活颜色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 是否开启路由模式 */
  route: defaultProps("route", { type: Boolean }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 是否开启底部安全区适配 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 固定定位时是否生成占位元素 */
  placeholder: defaultProps("placeholder", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 切换前的回调函数，返回 false 或 Promise.reject 可阻止切换 */
  beforeChange: defaultProps("beforeChange", { type: Function as PropType<(name: string | number) => boolean | Promise<boolean>> }),
}

export const tabbarEmits = {
  /** 元素尺寸信息事件 */
  rect: (rect: UniApp.NodeInfo) => true,
  /** 高度变化事件 */
  height: (height: number) => true,
  /** 值变化事件 */
  change: (name: string | number) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: string | number) => true,
}

export type TabbarEmits = typeof tabbarEmits

export interface TabbarProvide {
  props: TabbarProps
  updateValue: (value: string | number) => void
}

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>
export type TabbarInstance = InstanceType<typeof Tabbar>
