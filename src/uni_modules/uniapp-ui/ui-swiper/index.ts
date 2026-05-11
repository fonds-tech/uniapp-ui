import type Swiper from "./ui-swiper.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("swiper", {
  list: () => [],
  width: undefined,
  height: undefined,
  radius: undefined,
  current: 0,
  circular: true,
  interval: 3000,
  duration: 500,
  vertical: false,
  autoplay: true,
  disableTouch: false,
  indicator: true,
  indicatorType: "dot",
  indicatorPosition: "bottom-right",
  prevGap: undefined,
  nextGap: undefined,
  easingFunction: "default",
  imageMode: "scaleToFill",
  fieldKeys: undefined,
  forKey: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const swiperProps = {
  /** 数据列表：URL 字符串数组、`,` 分隔的字符串、或对象数组（用 fieldKeys 映射字段） */
  list: defaultProps("list", { type: [Array, String] }),
  /** 宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 当前所在滑块 index（v-model:current） */
  current: defaultProps("current", { type: Number }),
  /** 循环播放 */
  circular: defaultProps("circular", { type: Boolean }),
  /** 自动切换间隔 (ms) */
  interval: defaultProps("interval", { type: Number }),
  /** 滑动动画时长 (ms) */
  duration: defaultProps("duration", { type: Number }),
  /** 垂直滚动 */
  vertical: defaultProps("vertical", { type: Boolean }),
  /** 自动切换 */
  autoplay: defaultProps("autoplay", { type: Boolean }),
  /** 禁止用户 touch */
  disableTouch: defaultProps("disableTouch", { type: Boolean }),
  /** 显示指示器 */
  indicator: defaultProps("indicator", { type: Boolean }),
  /** 指示器类型 */
  indicatorType: defaultProps("indicatorType", { type: String as PropType<SwiperIndicatorType> }),
  /** 指示器位置 */
  indicatorPosition: defaultProps("indicatorPosition", { type: String as PropType<SwiperIndicatorPosition> }),
  /** 前露出尺寸（peek） */
  prevGap: defaultProps("prevGap", { type: [Number, String] }),
  /** 后露出尺寸（peek） */
  nextGap: defaultProps("nextGap", { type: [Number, String] }),
  /** 缓动函数 */
  easingFunction: defaultProps("easingFunction", { type: String as PropType<SwiperEasingFunction> }),
  /** 图片裁剪/缩放模式 */
  imageMode: defaultProps("imageMode", { type: String as PropType<UniHelper.ImageProps["mode"]> }),
  /** 对象数组字段映射 */
  fieldKeys: defaultProps("fieldKeys", { type: Object as PropType<SwiperFieldKeys> }),
  /** v-for key 字段名（推荐传入稳定 id 字段，避免重排错位） */
  forKey: defaultProps("forKey", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const swiperEmits = {
  "update:current": (_index: number) => true,
  click: (_index: number) => true,
  change: (_index: number) => true,
  transition: (_detail: { x: number; y: number }) => true,
  animationfinish: (_index: number) => true,
}

export interface SwiperFieldKeys {
  type?: string
  url?: string
  poster?: string
  title?: string
}

export type SwiperIndicatorType = "dot" | "number"
export type SwiperEasingFunction = "default" | "linear" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic"
export type SwiperIndicatorPosition = "left" | "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" | "right"
export type SwiperProps = ExtractPropTypes<typeof swiperProps>
export type SwiperInstance = InstanceType<typeof Swiper>
