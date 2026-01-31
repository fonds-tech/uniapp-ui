import type BackTop from "./ui-back-top.vue"
import type { TransitionName } from "../ui-transition"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("back-top", {
  scrollTop: undefined,
  offset: "200rpx",
  right: undefined,
  bottom: undefined,
  zIndex: undefined,
  duration: "200",
  background: undefined,
  borderRadius: undefined,
  icon: "arrowup",
  iconColor: "#fff",
  iconSize: "40rpx",
  iconWeight: "",
  text: "",
  textColor: "#fff",
  textSize: "20rpx",
  textWeight: "",
  size: "80rpx",
  width: undefined,
  height: undefined,
  transition: "fade",
  customClass: undefined,
  customStyle: undefined,
})

export const backTopProps = {
  /** 页面滚动距离，不传则自动监听，传入则使用外部滚动位置 */
  scrollTop: defaultProps("scrollTop", { type: [Number, String] }),
  /** 滚动高度达到此参数值时才显示组件 */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 距离页面右侧的距离 */
  right: defaultProps("right", { type: [Number, String] }),
  /** 距离页面底部的距离 */
  bottom: defaultProps("bottom", { type: [Number, String] }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 返回顶部过程中的过渡时间，单位ms */
  duration: defaultProps("duration", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 圆角值 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 按钮文字 */
  text: defaultProps("text", { type: String }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文字大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文字粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 按钮尺寸（宽高相等） */
  size: defaultProps("size", { type: [Number, String] }),
  /** 按钮宽度（优先于 size） */
  width: defaultProps("width", { type: [Number, String] }),
  /** 按钮高度（优先于 size） */
  height: defaultProps("height", { type: [Number, String] }),
  /** 过渡动画类型 */
  transition: defaultProps("transition", { type: String as PropType<TransitionName> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const backTopEmits = {
  /** 点击事件 */
  click: () => true,
}

export type BackTopEmits = typeof backTopEmits
export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopInstance = InstanceType<typeof BackTop>
