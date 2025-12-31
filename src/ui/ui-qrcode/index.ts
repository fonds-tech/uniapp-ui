import type Qrcode from "./ui-qrcode.vue"
import { styleProp, truthProp, buildProps, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const qrcodeProps = buildProps("qrcode", {
  /**
   * 是否显示
   */
  show: truthProp,
  /**
   * 二维码大小
   */
  size: makeNumericProp("200rpx"),
  /**
   * 二维码内容
   */
  value: makeNumericProp(""),
  /**
   * 背景色
   */
  background: makeStringProp("#ffffff"),
  /**
   * 前景色
   */
  foreground: makeStringProp("#000000"),
  /**
   * 定位角点颜色
   */
  pdground: makeStringProp("#000000"),
  /**
   * 二维码图标
   */
  icon: makeStringProp(""),
  /**
   * 二维码图标大小
   */
  iconSize: makeNumericProp("60rpx"),
  /**
   * 容错级别
   */
  lv: makeNumberProp(3),
  /**
   * 自动生成
   */
  auto: truthProp,
  /**
   * 生成中文本
   */
  loadingText: makeStringProp("生成中..."),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
  /**
   * 类型：qrcode-二维码 barcode-条形码
   */
  type: makeStringProp("qrcode"),
  /**
   * 条形码高度（仅当type为barcode时生效）
   */
  barcodeHeight: makeNumericProp("200rpx"),
  /**
   * 条形码宽度（仅当type为barcode时生效，默认使用size值）
   */
  barcodeWidth: makeNumericProp("600rpx"), // 不设置默认值，便于后续判断是否使用size
})
export const qrcodeEmits = {
  click: () => true,
  error: (err: any) => err,
  success: (res: string) => res,
}

export type QrcodeEmits = typeof qrcodeEmits
export interface QrcodeExpose {
  name: "ui-qrcode"
  makeCode: () => void
  saveCode: () => void
}

export type QrcodeInstance = InstanceType<typeof Qrcode>
