import type Qrcode from "./ui-qrcode.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type QrcodeType = "qrcode" | "barcode"
/** 容错级别 (0=L 7%, 1=M 15%, 2=Q 25%, 3=H 30%) */
export type QrcodeCorrectLevel = 0 | 1 | 2 | 3

const defaultProps = buildDefaultProps("qrcode", {
  show: true,
  size: "200rpx",
  value: "",
  // canvas 不接受 CSS var，必须传 hex/rgba
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
  /** 显示成品图 */
  show: defaultProps("show", { type: Boolean }),
  /** 二维码尺寸 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 编码内容 */
  value: defaultProps("value", { type: [Number, String] }),
  /** 背景色 (canvas hex/rgba) */
  background: defaultProps("background", { type: String }),
  /** 前景色 (canvas hex/rgba) */
  foreground: defaultProps("foreground", { type: String }),
  /** 定位角点颜色 (qrcode 专用) */
  pdground: defaultProps("pdground", { type: String }),
  /** 中心 logo 图片 url */
  icon: defaultProps("icon", { type: String }),
  /** 中心 logo 尺寸 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 容错级别 */
  lv: defaultProps("lv", { type: Number as PropType<QrcodeCorrectLevel> }),
  /** props 变化自动重生成 */
  auto: defaultProps("auto", { type: Boolean }),
  /** 生成中提示文案 */
  loadingText: defaultProps("loadingText", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 类型: qrcode 二维码 / barcode 条形码 */
  type: defaultProps("type", { type: String as PropType<QrcodeType> }),
  /** 条形码高度 (type=barcode 时生效) */
  barcodeHeight: defaultProps("barcodeHeight", { type: [Number, String] }),
  /** 条形码宽度 (type=barcode 时生效) */
  barcodeWidth: defaultProps("barcodeWidth", { type: [Number, String] }),
}

export const qrcodeEmits = {
  /** 点击 */
  click: () => true,
  /** 生成失败 */
  error: (_err: unknown) => true,
  /** 生成成功 (回调 tempFilePath) */
  success: (_res: string) => true,
}

export type QrcodeEmits = typeof qrcodeEmits
export type QrcodeProps = ExtractPropTypes<typeof qrcodeProps>
export type QrcodeInstance = InstanceType<typeof Qrcode>
