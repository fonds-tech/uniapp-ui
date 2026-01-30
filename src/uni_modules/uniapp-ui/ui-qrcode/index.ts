import type Qrcode from "./ui-qrcode.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("qrcode", {
  show: true,
  size: "200rpx",
  value: "",
  background: "#ffffff",
  foreground: "#000000",
  pdground: "#000000",
  icon: "",
  iconSize: "60rpx",
  lv: 3,
  auto: true,
  loadingText: "生成中...",
  customClass: "",
  customStyle: "",
  type: "qrcode",
  barcodeHeight: "200rpx",
  barcodeWidth: "600rpx",
})

export const qrcodeProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 二维码大小
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 二维码内容
   */
  value: defaultProps("value", { type: [Number, String] }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 前景色
   */
  foreground: defaultProps("foreground", { type: String }),
  /**
   * 定位角点颜色
   */
  pdground: defaultProps("pdground", { type: String }),
  /**
   * 二维码图标
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 二维码图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 容错级别
   */
  lv: defaultProps("lv", { type: Number }),
  /**
   * 自动生成
   */
  auto: defaultProps("auto", { type: Boolean }),
  /**
   * 生成中文本
   */
  loadingText: defaultProps("loadingText", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
  /**
   * 类型：qrcode-二维码 barcode-条形码
   */
  type: defaultProps("type", { type: String }),
  /**
   * 条形码高度（仅当type为barcode时生效）
   */
  barcodeHeight: defaultProps("barcodeHeight", { type: [Number, String] }),
  /**
   * 条形码宽度（仅当type为barcode时生效，默认使用size值）
   */
  barcodeWidth: defaultProps("barcodeWidth", { type: [Number, String] }),
}
export const qrcodeEmits = {
  click: () => true,
  error: (err: any) => err,
  success: (res: string) => res,
}

export type QrcodeEmits = typeof qrcodeEmits
export type QrcodeProps = ExtractPropTypes<typeof qrcodeProps>
export interface QrcodeExpose {
  name: "ui-qrcode"
  makeCode: () => void
  saveCode: () => void
}

export type QrcodeInstance = InstanceType<typeof Qrcode>
