import type Upload from "./ui-upload.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [uploadProps, useUploadProps] = createProps("upload", {
  /**
   * 绑定值
   */
  modelValue: { type: [String, Array], default: "" },
  /**
   * 是否显示组件
   */
  show: truthProp,
  /**
   * 宽度
   */
  width: makeNumericProp("160rpx"),
  /**
   * 高度
   */
  height: makeNumericProp("160rpx"),
  /**
   * 允许上传的文件类型, https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file
   */
  accept: { type: String as PropType<UniApp.ChooseMessageFileOption["type"] | "media">, default: "" },
  /**
   * 图片或视频拾取模式，当accept为image类型时，设置capture为camera可以直接调起摄像头，默认值["album", "camera"]
   */
  capture: { type: Array as PropType<string[]>, default: () => ["album", "camera"] },
  /**
   * 当accept为video时生效，可选值为back或front
   */
  camera: { type: String as PropType<"back" | "front">, default: "" },
  /**
   * 是否点击预览，仅支持图片格式
   */
  preview: Boolean,
  /**
   * 是否多选
   */
  multiple: Boolean,
  /**
   * 是否展示删除按钮
   */
  deletable: truthProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 当accept为video时生效，是否压缩视频，默认为true
   */
  compressed: truthProp,
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 选择单个文件的最大大小
   */
  maxSize: { type: [Number, String, Function], default: Infinity },
  /**
   * 文件上传数量限制
   */
  maxCount: makeNumberProp(Infinity),
  /**
   * 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
   */
  maxDuration: makeNumberProp(60),
  /**
   * original 原图，compressed 压缩图，默认二者都有，H5无效
   */
  sizeType: { type: Array as PropType<string[]>, default: () => ["original", "compressed"] },
  /**
   * 预览上传图之间的间隔
   */
  previewGap: makeNumericProp("20rpx"),
  /**
   * 图片显示模式，和image组件mode属性一致
   */
  imageMode: makeStringProp("aspectFill"),
  /**
   * 预览区图标大小
   */
  previewIconSize: makeNumericProp("60rpx"),
  /**
   * 预览区图标颜色
   */
  previewIconColor: makeStringProp("#cccccc"),
  /**
   * 预览区图标粗细
   */
  previewIconWeight: makeNumericProp(""),
  /**
   * 上传区域图标
   */
  icon: makeStringProp("photograph"),
  /**
   * 上传区域图标大小
   */
  iconSize: makeNumericProp("56rpx"),
  /**
   * 上传区域图标颜色
   */
  iconColor: makeStringProp("#cccccc"),
  /**
   * 上传区域图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 文件删除前的回调函数
   */
  beforeRemove: { type: Function },
  /**
   * 文件读取完成后的回调函数
   */
  afterRead: { type: Function },
  /**
   * 文件读取前的回调函数
   */
  beforeRead: { type: Function },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const uploadEmits = {
  upload: (event: { files: any }) => true,
  delete: (event: { inex: number; file: any }) => true,
  oversize: (files: UploadFile[]) => true,
  "update:modelValue": (value: string | string[]) => true,
}

export interface UploadFile {
  file?: File
  url?: string
  name?: string
  size?: number
  type?: string
  message?: string
  status?: "success" | "fail" | "uploading"
  [key: string]: any
}
export type UploadEmits = typeof uploadEmits
export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadInstance = InstanceType<typeof Upload>
