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
  /**
   * 数据列表
   */
  list: defaultProps("list", { type: [Array, String] }),
  /**
   * 宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 圆角
   */
  radius: defaultProps("radius", { type: [Number, String] }),
  /**
   * 当前所在滑块的 index
   */
  current: defaultProps("current", { type: Number }),
  /**
   * 是否开启循环播放
   */
  circular: defaultProps("circular", { type: Boolean }),
  /**
   * 自动切换时间间隔
   */
  interval: defaultProps("interval", { type: Number }),
  /**
   * 滑动动画时长
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 是否垂直滚动
   */
  vertical: defaultProps("vertical", { type: Boolean }),
  /**
   * 是否自动切换
   */
  autoplay: defaultProps("autoplay", { type: Boolean }),
  /**
   * 是否禁止用户 touch 操作
   */
  disableTouch: defaultProps("disableTouch", { type: Boolean }),
  /**
   * 是否显示指示器
   */
  indicator: defaultProps("indicator", { type: Boolean }),
  /**
   * 指示器类型，可选值：dot、number
   */
  indicatorType: defaultProps("indicatorType", { type: String as PropType<SwiperIndicatorType> }),
  /**
   * 指示器位置，可选值：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right
   */
  indicatorPosition: defaultProps("indicatorPosition", { type: String as PropType<SwiperIndicatorPosition> }),
  /**
   * 前边距，可用于露出前一项的一小部分
   */
  prevGap: defaultProps("prevGap", { type: [Number, String] }),
  /**
   * 后边距，可用于露出后一项的一小部分
   */
  nextGap: defaultProps("nextGap", { type: [Number, String] }),
  /**
   * 指定切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
   */
  easingFunction: defaultProps("easingFunction", { type: String as PropType<SwiperEasingFunction> }),
  /**
   * 图片模式，可选值：https://uniapp.dcloud.net.cn/component/image.html#image
   */
  imageMode: defaultProps("imageMode", { type: String as PropType<UniHelper.ImageProps["mode"]> }),
  /**
   * 数据字段
   */
  fieldKeys: defaultProps("fieldKeys", { type: Object as PropType<SwiperFieldKeys> }),
  /**
   * 循环 key
   */
  forKey: defaultProps("forKey", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const swiperEmits = {
  "update:current": (index: number) => true,
  click: (index: number) => true,
  change: (index: number) => true,
  transition: (detail: { x: number; y: number }) => true,
  animationfinish: (index: number) => true,
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
