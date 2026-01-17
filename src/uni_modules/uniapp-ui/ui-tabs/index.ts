import type Tabs from "./ui-tabs.vue"
import type { Ref, PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeNumericProp } from "../utils/props"

export const tabsKey: InjectionKey<TabsProvide> = Symbol("ui-tabs")
export const [tabsProps, useTabsProps] = createProps("tabs", {
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
  activeFontSize: numericProp,
  /**
   * 激活文字颜色
   */
  activeColor: String,
  /**
   * 激活文字粗细
   */
  activeFontWeight: numericProp,
  /**
   * 未激活文字大小
   */
  inactiveFontSize: numericProp,
  /**
   * 未激活文字颜色
   */
  inactiveColor: String,
  /**
   * 未激活文字粗细
   */
  inactiveFontWeight: numericProp,
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
})

export const tabsEmits = {
  change: (name: string | number) => true,
  tabClick: (name: string | number) => true,
  "update:modelValue": (name: string | number) => true,
}

export type TabsEmits = typeof tabsEmits
export type TabsProps = ExtractPropTypes<typeof tabsProps>
export interface TabsProvide {
  props: TabsProps
  useProps: TabsProps
  currentName: Ref<string | number | null>
  clickTab: (name: string | number) => void
  setCurrentName: (name: string | number) => void
}
export type TabsInstance = InstanceType<typeof Tabs>
