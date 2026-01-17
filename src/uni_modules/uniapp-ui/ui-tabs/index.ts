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
   * 激活线条颜色
   */
  lineColor: String,
  /**
   * 激活线条宽度
   */
  lineWidth: makeNumericProp("40rpx"),
  /**
   * 激活线条高度
   */
  lineHeight: numericProp,
  /**
   * 激活线条圆角
   */
  lineRadius: numericProp,
  /**
   * 是否显示线条
   */
  showLine: truthProp,
  /**
   * 宽度
   */
  tabWidth: numericProp,
  /**
   * 最大宽度
   */
  tabMaxWidth: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 激活线条动画过渡时间，单位ms
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
  clickTab: (name: string | number) => true,
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
