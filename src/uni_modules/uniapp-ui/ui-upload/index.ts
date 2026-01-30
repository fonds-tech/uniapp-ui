import type Upload from "./ui-upload.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("upload", {
  modelValue: "",
  show: true,
  width: "160rpx",
  height: "160rpx",
  accept: "",
  capture: () => ["album", "camera"],
  camera: "",
  preview: false,
  multiple: false,
  deletable: true,
  disabled: false,
  compressed: true,
  background: "",
  maxSize: Infinity,
  maxCount: Infinity,
  maxDuration: 60,
  sizeType: () => ["original", "compressed"],
  previewGap: "20rpx",
  imageMode: "aspectFill",
  previewIconSize: "60rpx",
  previewIconColor: "#cccccc",
  previewIconWeight: "",
  icon: "photograph",
  iconSize: "56rpx",
  iconColor: "#cccccc",
  iconWeight: "",
  beforeRemove: undefined,
  afterRead: undefined,
  beforeRead: undefined,
  customClass: "",
  customStyle: "",
})

export const uploadProps = {
  /**
   * 绑定值
   */
  modelValue: defaultProps("modelValue", { type: [String, Array] }),
  /**
   * 是否显示组件
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 允许上传的文件类型, https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file
   */
  accept: defaultProps("accept", { type: String as PropType<UniApp.ChooseMessageFileOption["type"] | "media" | ""> }),
  /**
   * 图片或视频拾取模式，当accept为image类型时，设置capture为camera可以直接调起摄像头，默认值["album", "camera"]
   */
  capture: defaultProps("capture", { type: Array as PropType<string[]> }),
  /**
   * 当accept为video时生效，可选值为back或front
   */
  camera: defaultProps("camera", { type: String as PropType<"back" | "front"> }),
  /**
   * 是否点击预览，仅支持图片格式
   */
  preview: defaultProps("preview", { type: Boolean }),
  /**
   * 是否多选
   */
  multiple: defaultProps("multiple", { type: Boolean }),
  /**
   * 是否展示删除按钮
   */
  deletable: defaultProps("deletable", { type: Boolean }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 当accept为video时生效，是否压缩视频，默认为true
   */
  compressed: defaultProps("compressed", { type: Boolean }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 选择单个文件的最大大小
   */
  maxSize: defaultProps("maxSize", { type: [Number, String, Function] }),
  /**
   * 文件上传数量限制
   */
  maxCount: defaultProps("maxCount", { type: Number }),
  /**
   * 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
   */
  maxDuration: defaultProps("maxDuration", { type: Number }),
  /**
   * original 原图，compressed 压缩图，默认二者都有，H5无效
   */
  sizeType: defaultProps("sizeType", { type: Array as PropType<string[]> }),
  /**
   * 预览上传图之间的间隔
   */
  previewGap: defaultProps("previewGap", { type: [Number, String] }),
  /**
   * 图片显示模式，和image组件mode属性一致
   */
  imageMode: defaultProps("imageMode", { type: String as PropType<UniHelper.ImageProps["mode"]> }),
  /**
   * 预览区图标大小
   */
  previewIconSize: defaultProps("previewIconSize", { type: [Number, String] }),
  /**
   * 预览区图标颜色
   */
  previewIconColor: defaultProps("previewIconColor", { type: String }),
  /**
   * 预览区图标粗细
   */
  previewIconWeight: defaultProps("previewIconWeight", { type: [Number, String] }),
  /**
   * 上传区域图标
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 上传区域图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 上传区域图标颜色
   */
  iconColor: defaultProps("iconColor", { type: String }),
  /**
   * 上传区域图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 文件删除前的回调函数
   */
  beforeRemove: defaultProps("beforeRemove", { type: Function }),
  /**
   * 文件读取完成后的回调函数
   */
  afterRead: defaultProps("afterRead", { type: Function }),
  /**
   * 文件读取前的回调函数
   */
  beforeRead: defaultProps("beforeRead", { type: Function }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const uploadEmits = {
  upload: (event: { files: any }) => true,
  delete: (event: { index: number; file: any }) => true,
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
