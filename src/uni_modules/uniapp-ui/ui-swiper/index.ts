import type Swiper from "./ui-swiper.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeNumberProp, makeStringProp } from "../utils/props"

export const [swiperProps, useSwiperProps] = createProps("swiper", {
  /**
   * 数据列表
   */
  list: { type: [Array, String], default: () => [] },
  /**
   * 宽度
   */
  width: numericProp,
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 圆角
   */
  radius: numericProp,
  /**
   * 当前所在滑块的 index
   */
  current: makeNumberProp(0),
  /**
   * 是否开启循环播放
   */
  circular: truthProp,
  /**
   * 自动切换时间间隔
   */
  interval: makeNumberProp(3000),
  /**
   * 滑动动画时长
   */
  duration: makeNumberProp(500),
  /**
   * 是否垂直滚动
   */
  vertical: Boolean,
  /**
   * 是否自动切换
   */
  autoplay: truthProp,
  /**
   * 是否禁止用户 touch 操作
   */
  disableTouch: Boolean,
  /**
   * 是否显示指示器
   */
  indicator: truthProp,
  /**
   * 指示器类型，可选值：dot、number
   */
  indicatorType: makeStringProp<SwiperIndicatorType>("dot"),
  /**
   * 指示器位置，可选值：left、top-left、top、top-right、bottom-left、bottom、bottom-right、right
   */
  indicatorPosition: makeStringProp<SwiperIndicatorPosition>("bottom-right"),
  /**
   * 前边距，可用于露出前一项的一小部分
   */
  prevGap: numericProp,
  /**
   * 后边距，可用于露出后一项的一小部分
   */
  nextGap: numericProp,
  /**
   * 指定切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
   */
  easingFunction: makeStringProp<SwiperEasingFunction>("default"),
  /**
   * 图片模式，可选值：https://uniapp.dcloud.net.cn/component/image.html#image
   */
  imageMode: makeStringProp<UniHelper.ImageProps["mode"]>("scaleToFill"),
  /**
   * 数据字段
   */
  fieldKeys: { type: Object as PropType<SwiperFieldKeys> },
  /**
   * 循环 key
   */
  forKey: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

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
