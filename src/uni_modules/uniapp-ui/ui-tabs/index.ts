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
  /** 当前激活的 name */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 整体高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 横向滚动（tab 多时） */
  scrollable: defaultProps("scrollable", { type: Boolean }),
  /** 激活态文字大小（向 ui-tab 继承） */
  activeSize: defaultProps("activeSize", { type: [Number, String] }),
  /** 激活态文字颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 激活态文字粗细 */
  activeWeight: defaultProps("activeWeight", { type: [Number, String] }),
  /** 未激活文字大小 */
  inactiveSize: defaultProps("inactiveSize", { type: [Number, String] }),
  /** 未激活文字颜色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 未激活文字粗细 */
  inactiveWeight: defaultProps("inactiveWeight", { type: [Number, String] }),
  /** 指示器颜色 */
  indicatorColor: defaultProps("indicatorColor", { type: String }),
  /** 指示器宽度（autoIndicatorWidth=true 时跟随文字宽度） */
  indicatorWidth: defaultProps("indicatorWidth", { type: [Number, String] }),
  /** 指示器高度 */
  indicatorHeight: defaultProps("indicatorHeight", { type: [Number, String] }),
  /** 指示器圆角 */
  indicatorRadius: defaultProps("indicatorRadius", { type: [Number, String] }),
  /** 显示指示器 */
  showIndicator: defaultProps("showIndicator", { type: Boolean }),
  /** 指示器宽度跟随激活 tab 文字宽度 */
  autoIndicatorWidth: defaultProps("autoIndicatorWidth", { type: Boolean }),
  /** 单 tab 固定宽度 */
  itemWidth: defaultProps("itemWidth", { type: [Number, String] }),
  /** 单 tab 最大宽度 */
  itemMaxWidth: defaultProps("itemMaxWidth", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 指示器/滚动动画时长 (ms) */
  duration: defaultProps("duration", { type: Number }),
  /** 显示底部分隔线 */
  borderBottom: defaultProps("borderBottom", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const tabsEmits = {
  change: (_name: string | number) => true,
  tabClick: (_name: string | number) => true,
  "update:modelValue": (_name: string | number) => true,
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
