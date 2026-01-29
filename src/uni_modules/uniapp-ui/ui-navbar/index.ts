import type Navbar from "./ui-navbar.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const navbarProps = {
  /**
   * 高度
   */
  height: makeNumericProp(""),
  /**
   * 左右内边距
   */
  padding: makeNumericProp("20rpx"),
  /**
   * 返回按钮图标颜色
   */
  backIconColor: makeStringProp("#333333"),
  /**
   * 返回按钮图标名称
   */
  backIconName: makeStringProp("left"),
  /**
   * 返回按钮图标大小
   */
  backIconSize: makeNumericProp("44rpx"),
  /**
   * 返回按钮文字
   */
  backText: makeStringProp(""),
  /**
   * 返回按钮文字大小
   */
  backTextSize: makeStringProp("30rpx"),
  /**
   * 返回按钮文字颜色
   */
  backTextColor: makeStringProp("#333333"),
  /**
   * 返回按钮文字粗细
   */
  backTextWeight: makeNumericProp(""),
  /**
   * 标题内容
   */
  title: makeStringProp(""),
  /**
   * 标题是否居中显示
   */
  centerTitle: truthProp,
  /**
   * 标题文字大小
   */
  titleSize: makeNumericProp("32rpx"),
  /**
   * 标题文字颜色
   */
  titleColor: makeStringProp("#333333"),
  /**
   * 标题文字粗细
   */
  titleWeight: makeNumericProp(700),
  /**
   * 是否显示返回按钮
   */
  showBack: truthProp,
  /**
   * 固定定位时是否生成占位元素
   */
  placeholder: truthProp,
  /**
   * 是否显示渐变背景
   */
  gradient: { type: Boolean, default: false },
  /**
   * 渐变背景高度
   */
  gradientHeight: makeNumericProp("100"),
  /**
   * 背景颜色
   */
  background: makeStringProp("#ffffff"),
  /**
   * 是否固定在顶部
   */
  fixed: truthProp,
  /**
   * 是否沉浸式模式
   */
  immersive: { type: Boolean, default: false },
  /**
   * 是否显示底部边框
   */
  borderBottom: { type: Boolean, default: false },
  /**
   * 滚动位置
   */
  scrollTop: Number,
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(""),
  /**
   * 自定义返回
   */
  customBack: Function as PropType<() => void>,
  /**
   * 首页路径，当页面栈只有一个页面时，点击返回会跳转到此路径
   */
  homePath: makeStringProp("/pages/tabbar/home/index"),
  /**
   * 首页图标名称，当页面栈只有一个页面时显示此图标
   */
  homeIconName: makeStringProp("home"),
  /**
   * 首页类型
   * - 'tab': 使用 switchTab 跳转（适用于 tabBar 页面）
   * - 'page': 使用 reLaunch 跳转（适用于普通页面）
   */
  homeType: {
    type: String as PropType<"tab" | "page">,
    default: "tab",
  },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const navbarEmits = {
  back: () => true,
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
  gradient: (scrollTop: number) => true,
  titleClick: () => true,
}

export type NavbarEmits = typeof navbarEmits
export type NavbarProps = ExtractPropTypes<typeof navbarProps>
export type NavbarInstance = InstanceType<typeof Navbar>
