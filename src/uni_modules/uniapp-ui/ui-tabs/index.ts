import type Tabs from "./ui-tabs.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const tabsKey: InjectionKey<TabsProvide> = Symbol("ui-tabs")

const defaultProps = buildDefaultProps("tabs", {
  modelValue: 0,
  height: undefined,
  scrollable: false,
  activeSize: undefined,
  activeColor: undefined,
  activeWeight: undefined,
  inactiveSize: undefined,
  inactiveColor: undefined,
  inactiveWeight: undefined,
  indicatorColor: undefined,
  indicatorWidth: "40rpx",
  indicatorHeight: undefined,
  indicatorRadius: undefined,
  showIndicator: true,
  autoIndicatorWidth: false,
  itemWidth: undefined,
  itemMaxWidth: undefined,
  background: undefined,
  duration: 300,
  borderBottom: false,
  zIndex: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const tabsProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 是否可以滚动 */
  scrollable: defaultProps("scrollable", { type: Boolean }),
  /** 激活文字大小 */
  activeSize: defaultProps("activeSize", { type: [Number, String] }),
  /** 激活文字颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 激活文字粗细 */
  activeWeight: defaultProps("activeWeight", { type: [Number, String] }),
  /** 未激活文字大小 */
  inactiveSize: defaultProps("inactiveSize", { type: [Number, String] }),
  /** 未激活文字颜色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 未激活文字粗细 */
  inactiveWeight: defaultProps("inactiveWeight", { type: [Number, String] }),
  /** 指示器颜色 */
  indicatorColor: defaultProps("indicatorColor", { type: String }),
  /** 指示器宽度 */
  indicatorWidth: defaultProps("indicatorWidth", { type: [Number, String] }),
  /** 指示器高度 */
  indicatorHeight: defaultProps("indicatorHeight", { type: [Number, String] }),
  /** 指示器圆角 */
  indicatorRadius: defaultProps("indicatorRadius", { type: [Number, String] }),
  /** 是否显示指示器 */
  showIndicator: defaultProps("showIndicator", { type: Boolean }),
  /** 指示器宽度是否自动匹配文字宽度 */
  autoIndicatorWidth: defaultProps("autoIndicatorWidth", { type: Boolean }),
  /** 单项宽度 */
  itemWidth: defaultProps("itemWidth", { type: [Number, String] }),
  /** 单项最大宽度 */
  itemMaxWidth: defaultProps("itemMaxWidth", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 指示器动画过渡时间，单位ms */
  duration: defaultProps("duration", { type: Number }),
  /** 是否显示底部边框线 */
  borderBottom: defaultProps("borderBottom", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const tabsEmits = {
  /** 值变化事件 */
  change: (name: string | number) => true,
  /** 点击选项卡事件 */
  tabClick: (name: string | number) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (name: string | number) => true,
}

export type TabsEmits = typeof tabsEmits
export type TabsProps = ExtractPropTypes<typeof tabsProps>

export interface TabRect {
  width: number
  height: number
  titleWidth: number
}

export interface TabsProvide {
  props: TabsProps
  currentName: Ref<string | number | null>
  tabRects: Ref<Map<number, TabRect>>
  clickTab: (name: string | number) => void
  setCurrentName: (name: string | number) => void
  updateTabRect: (index: number, rect: TabRect) => void
}

export type TabsInstance = InstanceType<typeof Tabs>
