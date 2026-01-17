import type Tabbar from "./ui-tabbar.vue"
import type { PropType, InjectionKey, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const tabbarKey: InjectionKey<TabbarProvide> = Symbol("ui-tabbar")
export const [tabbarProps, useTabbarProps] = createProps("tabbar", {
  /**
   * 当前选中标签的名称或索引值
   */
  modelValue: makeNumericProp(0),
  /**
   * 是否固定定位
   */
  fixed: truthProp,
  /**
   * 是否显示边框线
   */
  border: Boolean,
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(""),
  /**
   * 激活颜色
   */
  activeColor: makeStringProp(""),
  /**
   * 未激活颜色
   */
  inactiveColor: makeStringProp(""),
  /**
   * 是否开启路由模式
   */
  route: Boolean,
  /**
   * 高度
   */
  height: makeNumericProp("100rpx"),
  /**
   * 背景色
   */
  background: makeStringProp("#ffffff"),
  /**
   * 是否开启底部安全区适配
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 固定定位时是否生成占位元素
   */
  placeholder: truthProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
  /**
   * 切换前的回调函数，返回 false 或 Promise.reject 可阻止切换
   */
  beforeChange: {
    type: Function as PropType<(name: string | number) => boolean | Promise<boolean>>,
    default: null,
  },
})
export const tabbarEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
  change: (name: string | number) => true,
  "update:modelValue": (value: string | number) => true,
}

export type TabbarEmits = typeof tabbarEmits
export interface TabbarProvide {
  props: TabbarProps
  useProps: TabbarProps
  updateValue: (value: string | number) => void
}
export type TabbarProps = ExtractPropTypes<typeof tabbarProps>
export type TabbarInstance = InstanceType<typeof Tabbar>
