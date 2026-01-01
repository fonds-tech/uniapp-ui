import type Image from "./ui-image.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [imageProps, useImageProps] = createProps("image", {
  /**
   * 图片资源地址
   */
  src: makeStringProp(""),
  /**
   * 图片裁剪、缩放的模式
   */
  mode: makeStringProp<UniHelper.ImageProps["mode"]>("scaleToFill"),
  /**
   * 图片宽度
   */
  width: makeNumericProp(""),
  /**
   * 图片高度
   */
  height: makeNumericProp(""),
  /**
   * 图片圆角
   */
  radius: makeNumericProp(""),
  /**
   * 是否显示块级元素
   */
  block: Boolean,
  /**
   * 是否显示为圆形
   */
  round: Boolean,
  /**
   * 是否显示为正方形，会自动根据宽度计算高度
   */
  square: Boolean,
  /**
   * 图片懒加载。只针对page与scroll-view下的image有效
   */
  lazyLoad: truthProp,
  /**
   * 图片显示动画效果
   */
  fade: truthProp,
  /**
   * 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。webp支持详见下面说明
   */
  webp: Boolean,
  /**
   * 开启长按图片显示识别小程序码菜单
   */
  showMenuByLongpress: Boolean,
  /**
   * 是否能拖动图片
   */
  draggable: truthProp,
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const imageEmits = {
  load: (event: any) => true,
  error: (event: any) => true,
  click: (event: any) => true,
}

export type ImageEmits = typeof imageEmits
export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageInstance = InstanceType<typeof Image>
