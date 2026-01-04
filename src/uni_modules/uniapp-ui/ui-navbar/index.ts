import type Navbar from "./ui-navbar.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp } from "../utils/props"

export const [navbarProps, useNavbarProps] = createProps("navbar", {
  /**
   * 高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 左右内边距
   */
  padding: { type: [String, Number], default: "20rpx" },
  /**
   * 返回按钮图标颜色
   */
  backIconColor: { type: String, default: "#333333" },
  /**
   * 返回按钮图标名称
   */
  backIconName: { type: String, default: "left" },
  /**
   * 返回按钮图标大小
   */
  backIconSize: { type: [String, Number], default: "44rpx" },
  /**
   * 返回按钮文字
   */
  backText: { type: String, default: "" },
  /**
   * 返回按钮文字大小
   */
  backTextSize: { type: String, default: "30rpx" },
  /**
   * 返回按钮文字颜色
   */
  backTextColor: { type: String, default: "#333333" },
  /**
   * 返回按钮文字颜色
   */
  backTextWeight: { type: [String, Number], default: "" },
  /**
   * 标题内容
   */
  title: { type: [String, null], default: "" },
  /**
   * 标题是否居中显示
   */
  titleCenter: { type: Boolean, default: true },
  /**
   * 标题文字大小
   */
  titleSize: { type: [String, Number], default: "32rpx" },
  /**
   * 标题宽度
   */
  titleWidth: { type: [String, Number] },
  /**
   * 标题文字颜色
   */
  titleColor: { type: String, default: "#333333" },
  /**
   * 标题文字粗细
   */
  titleWeight: { type: [String, Number], default: 700 },
  /**
   * 是否显示返回按钮
   */
  isBack: { type: [Boolean, String], default: true },
  /**
   * 是否显示渐变背景
   */
  gradient: Boolean,
  /**
   * 渐变背景高度
   */
  gradientHeight: { type: [String, Number], default: "200px" },
  /**
   * 背景颜色
   */
  background: { type: String, default: "#ffffff" },
  /**
   * 是否固定在顶部
   */
  fixed: { type: Boolean, default: true },
  /**
   * 是否沉浸式模式
   */
  immersive: Boolean,
  /**
   * 是否显示底部边框
   */
  borderBottom: Boolean,
  /**
   * 滚动位置
   */
  scrollTop: { type: [Number] },
  /**
   * 元素层级
   */
  zIndex: { type: [String, Number], default: "" },
  /**
   * 自定义返回
   */
  customBack: { type: Function },
  /**
   * 首页路径，当页面栈只有一个页面时，点击返回会跳转到此路径
   */
  homePath: { type: String, default: "/pages/tabbar/home/index" },
  /**
   * 首页类型
   * - 'tab': 使用 switchTab 跳转（适用于 tabBar 页面）
   * - 'page': 使用 reLaunch 跳转（适用于普通页面）
   */
  homeType: { type: String, default: "tab" },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const navbarEmits = {
  back: () => true,
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
  gradient: (scrollTop: number) => true,
}

export type NavbarEmits = typeof navbarEmits
export type NavbarProps = ExtractPropTypes<typeof navbarProps>
export type NavbarInstance = InstanceType<typeof Navbar>
