import type Tabbar from "./ui-tabbar.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const tabbarKey: InjectionKey<TabbarProvide> = Symbol("ui-tabbar")

const defaultProps = buildDefaultProps("tabbar", {
  modelValue: 0,
  fixed: true,
  border: false,
  zIndex: undefined,
  activeColor: undefined,
  inactiveColor: undefined,
  route: false,
  height: "100rpx",
  background: undefined,
  safeAreaInsetBottom: true,
  placeholder: true,
  customClass: undefined,
  customStyle: undefined,
  beforeChange: undefined,
})

export const tabbarProps = {
  /** 当前选中项 name / index */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 固定到底部 */
  fixed: defaultProps("fixed", { type: Boolean }),
  /** 顶部分隔线 */
  border: defaultProps("border", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 激活色（向下继承） */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 未激活色（向下继承） */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 路由模式：item 点击触发 uni.routeType 跳转 */
  route: defaultProps("route", { type: Boolean }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 适配底部安全区 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** fixed 时生成同高占位元素，避免页面内容被遮挡 */
  placeholder: defaultProps("placeholder", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 切换前拦截，返回 false / reject 阻止切换 */
  beforeChange: defaultProps("beforeChange", { type: Function as PropType<(name: string | number) => boolean | Promise<boolean>> }),
}

export const tabbarEmits = {
  rect: (_rect: UniApp.NodeInfo) => true,
  height: (_height: number) => true,
  change: (_name: string | number) => true,
  "update:modelValue": (_value: string | number) => true,
}

export type TabbarEmits = typeof tabbarEmits

export interface TabbarProvide {
  props: TabbarProps
  updateValue: (value: string | number) => void
}

export type TabbarProps = ExtractPropTypes<typeof tabbarProps>
export type TabbarInstance = InstanceType<typeof Tabbar>
