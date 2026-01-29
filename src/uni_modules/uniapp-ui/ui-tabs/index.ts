import type Tabs from "./ui-tabs.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, numericProp, makeNumericProp } from "../utils/props"

export const tabsKey: InjectionKey<TabsProvide> = Symbol("ui-tabs")
export const tabsProps = {
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(0),
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 是否可以滚动
   */
  scrollable: Boolean,
  /**
   * 激活文字大小
   */
  activeSize: numericProp,
  /**
   * 激活文字颜色
   */
  activeColor: String,
  /**
   * 激活文字粗细
   */
  activeWeight: numericProp,
  /**
   * 未激活文字大小
   */
  inactiveSize: numericProp,
  /**
   * 未激活文字颜色
   */
  inactiveColor: String,
  /**
   * 未激活文字粗细
   */
  inactiveWeight: numericProp,
  /**
   * 指示器颜色
   */
  indicatorColor: String,
  /**
   * 指示器宽度
   */
  indicatorWidth: makeNumericProp("40rpx"),
  /**
   * 指示器高度
   */
  indicatorHeight: numericProp,
  /**
   * 指示器圆角
   */
  indicatorRadius: numericProp,
  /**
   * 是否显示指示器
   */
  showIndicator: truthProp,
  /**
   * 指示器宽度是否自动匹配文字宽度
   */
  autoIndicatorWidth: Boolean,
  /**
   * 单项宽度
   */
  itemWidth: numericProp,
  /**
   * 单项最大宽度
   */
  itemMaxWidth: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 指示器动画过渡时间，单位ms
   */
  duration: makeNumericProp(300),
  /**
   * 是否显示底部边框线
   */
  borderBottom: Boolean,
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
}
export const tabsEmits = {
  change: (name: string | number) => true,
  tabClick: (name: string | number) => true,
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
