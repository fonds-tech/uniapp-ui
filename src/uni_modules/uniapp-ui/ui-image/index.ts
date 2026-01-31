import type Image from "./ui-image.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("image", {
  src: "",
  mode: "scaleToFill",
  width: "",
  height: "",
  radius: "",
  block: false,
  round: false,
  square: false,
  lazyLoad: true,
  fade: true,
  webp: false,
  showMenuByLongpress: false,
  draggable: true,
  background: "",
  customClass: "",
  customStyle: "",
})

export const imageProps = {
  /** 图片资源地址 */
  src: defaultProps("src", { type: String }),
  /** 图片裁剪、缩放的模式 */
  mode: defaultProps("mode", { type: String as PropType<UniHelper.ImageProps["mode"]> }),
  /** 图片宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 图片高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 图片圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 是否显示块级元素 */
  block: defaultProps("block", { type: Boolean }),
  /** 是否显示为圆形 */
  round: defaultProps("round", { type: Boolean }),
  /** 是否显示为正方形，会自动根据宽度计算高度 */
  square: defaultProps("square", { type: Boolean }),
  /** 图片懒加载，只针对page与scroll-view下的image有效 */
  lazyLoad: defaultProps("lazyLoad", { type: Boolean }),
  /** 图片显示动画效果 */
  fade: defaultProps("fade", { type: Boolean }),
  /** 在系统不支持webp的情况下是否单独启用webp */
  webp: defaultProps("webp", { type: Boolean }),
  /** 开启长按图片显示识别小程序码菜单 */
  showMenuByLongpress: defaultProps("showMenuByLongpress", { type: Boolean }),
  /** 是否能拖动图片 */
  draggable: defaultProps("draggable", { type: Boolean }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const imageEmits = {
  /** 图片加载成功事件 */
  load: (event: any) => true,
  /** 图片加载失败事件 */
  error: (event: any) => true,
  /** 点击事件 */
  click: (event: any) => true,
}

export type ImageEmits = typeof imageEmits
export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImageInstance = InstanceType<typeof Image>
