import type NoticeBar from "./ui-notice-bar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("notice-bar", {
  text: "",
  mode: "horizontal",
  color: undefined,
  speed: 60,
  interval: 3000,
  duration: 500,
  scrollable: true,
  radius: undefined,
  minHeight: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  icon: "sound",
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  rightIcon: "",
  rightIconSize: undefined,
  rightIconColor: undefined,
  rightIconWeight: undefined,
  background: undefined,
  customClass: "",
  customStyle: "",
})

export const noticeBarProps = {
  /** 显示内容，vertical 垂直模式接收数组 */
  text: defaultProps("text", { type: [String, Array] as PropType<string | string[]> }),
  /** 滚动模式 */
  mode: defaultProps("mode", { type: String as PropType<NoticeBarMode>, validator: (v: string) => ["vertical", "horizontal"].includes(v) }),
  /** 内容文本颜色 */
  color: defaultProps("color", { type: String }),
  /** 滚动速率(px/s) */
  speed: defaultProps("speed", { type: Number }),
  /** 垂直滚动时自动切换时间间隔 */
  interval: defaultProps("interval", { type: Number }),
  /** 垂直滚动时滑动动画时长 */
  duration: defaultProps("duration", { type: Number }),
  /** 是否开启滚动 */
  scrollable: defaultProps("scrollable", { type: Boolean }),
  /** 圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 最小高度 */
  minHeight: defaultProps("minHeight", { type: [Number, String] }),
  /** 内容文本大小 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 内容文本粗细 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 左侧图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 左侧图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 左侧图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 左侧图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 右侧图标名称 */
  rightIcon: defaultProps("rightIcon", { type: String }),
  /** 右侧图标大小 */
  rightIconSize: defaultProps("rightIconSize", { type: [Number, String] }),
  /** 右侧图标颜色 */
  rightIconColor: defaultProps("rightIconColor", { type: String }),
  /** 右侧图标粗细 */
  rightIconWeight: defaultProps("rightIconWeight", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const noticeBarEmits = {
  /** 点击通知 */
  click: (index: number) => true,
}

export type NoticeBarMode = "vertical" | "horizontal"
export type NoticeBarEmits = typeof noticeBarEmits
export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>
export type NoticeBarInstance = InstanceType<typeof NoticeBar>
