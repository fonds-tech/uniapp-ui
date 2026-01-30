import type Navbar from "./ui-navbar.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("navbar", {
  height: "",
  padding: "20rpx",
  backIconColor: "#333333",
  backIconName: "left",
  backIconSize: "44rpx",
  backText: "",
  backTextSize: "30rpx",
  backTextColor: "#333333",
  backTextWeight: "",
  title: "",
  centerTitle: true,
  titleSize: "32rpx",
  titleColor: "#333333",
  titleWeight: 700,
  showBack: true,
  placeholder: true,
  gradient: false,
  gradientHeight: "100",
  background: "#ffffff",
  fixed: true,
  immersive: false,
  borderBottom: false,
  scrollTop: undefined,
  zIndex: "",
  customBack: undefined,
  homePath: "/pages/tabbar/home/index",
  homeIconName: "home",
  homeType: "tab",
  customClass: "",
  customStyle: "",
})

export const navbarProps = {
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 左右内边距
   */
  padding: defaultProps("padding", { type: [Number, String] }),
  /**
   * 返回按钮图标颜色
   */
  backIconColor: defaultProps("backIconColor", { type: String }),
  /**
   * 返回按钮图标名称
   */
  backIconName: defaultProps("backIconName", { type: String }),
  /**
   * 返回按钮图标大小
   */
  backIconSize: defaultProps("backIconSize", { type: [Number, String] }),
  /**
   * 返回按钮文字
   */
  backText: defaultProps("backText", { type: String }),
  /**
   * 返回按钮文字大小
   */
  backTextSize: defaultProps("backTextSize", { type: String }),
  /**
   * 返回按钮文字颜色
   */
  backTextColor: defaultProps("backTextColor", { type: String }),
  /**
   * 返回按钮文字粗细
   */
  backTextWeight: defaultProps("backTextWeight", { type: [Number, String] }),
  /**
   * 标题内容
   */
  title: defaultProps("title", { type: String }),
  /**
   * 标题是否居中显示
   */
  centerTitle: defaultProps("centerTitle", { type: Boolean }),
  /**
   * 标题文字大小
   */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /**
   * 标题文字颜色
   */
  titleColor: defaultProps("titleColor", { type: String }),
  /**
   * 标题文字粗细
   */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /**
   * 是否显示返回按钮
   */
  showBack: defaultProps("showBack", { type: Boolean }),
  /**
   * 固定定位时是否生成占位元素
   */
  placeholder: defaultProps("placeholder", { type: Boolean }),
  /**
   * 是否显示渐变背景
   */
  gradient: defaultProps("gradient", { type: Boolean }),
  /**
   * 渐变背景高度
   */
  gradientHeight: defaultProps("gradientHeight", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 是否固定在顶部
   */
  fixed: defaultProps("fixed", { type: Boolean }),
  /**
   * 是否沉浸式模式
   */
  immersive: defaultProps("immersive", { type: Boolean }),
  /**
   * 是否显示底部边框
   */
  borderBottom: defaultProps("borderBottom", { type: Boolean }),
  /**
   * 滚动位置
   */
  scrollTop: defaultProps("scrollTop", { type: Number }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 自定义返回
   */
  customBack: defaultProps("customBack", { type: Function as PropType<() => void> }),
  /**
   * 首页路径，当页面栈只有一个页面时，点击返回会跳转到此路径
   */
  homePath: defaultProps("homePath", { type: String }),
  /**
   * 首页图标名称，当页面栈只有一个页面时显示此图标
   */
  homeIconName: defaultProps("homeIconName", { type: String }),
  /**
   * 首页类型
   * - 'tab': 使用 switchTab 跳转（适用于 tabBar 页面）
   * - 'page': 使用 reLaunch 跳转（适用于普通页面）
   */
  homeType: defaultProps("homeType", { type: String as PropType<"tab" | "page"> }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
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
