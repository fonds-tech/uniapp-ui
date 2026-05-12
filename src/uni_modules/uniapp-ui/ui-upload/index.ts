import type Upload from "./ui-upload.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type UploadAccept = UniApp.ChooseMessageFileOption["type"] | "media" | ""

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

const defaultProps = buildDefaultProps("upload", {
  modelValue: "",
  show: true,
  width: undefined,
  height: undefined,
  accept: "",
  capture: () => ["album", "camera"],
  camera: undefined,
  preview: false,
  multiple: false,
  deletable: true,
  disabled: false,
  compressed: true,
  background: undefined,
  maxSize: 0,
  maxCount: 0,
  maxDuration: 60,
  sizeType: () => ["original", "compressed"],
  previewGap: undefined,
  imageMode: "aspectFill",
  previewIconSize: undefined,
  previewIconColor: undefined,
  previewIconWeight: undefined,
  icon: "photograph",
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  beforeRemove: undefined,
  afterRead: undefined,
  beforeRead: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const uploadProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [String, Array] }),
  /** 显示组件 */
  show: defaultProps("show", { type: Boolean }),
  /** 宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 允许上传的文件类型 */
  accept: defaultProps("accept", { type: String as PropType<UploadAccept> }),
  /** 拾取模式 */
  capture: defaultProps("capture", { type: Array as PropType<string[]> }),
  /** accept=video 时摄像头方向 */
  camera: defaultProps("camera", { type: String as PropType<"back" | "front"> }),
  /** 点击预览（仅图片） */
  preview: defaultProps("preview", { type: Boolean }),
  /** 多选 */
  multiple: defaultProps("multiple", { type: Boolean }),
  /** 显示删除按钮 */
  deletable: defaultProps("deletable", { type: Boolean }),
  /** 禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** accept=video 时是否压缩 */
  compressed: defaultProps("compressed", { type: Boolean }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 单文件最大字节；`0` 无上限；函数自定义判断 */
  maxSize: defaultProps("maxSize", { type: [Number, String, Function] }),
  /** 数量上限；`0` 无上限 */
  maxCount: defaultProps("maxCount", { type: Number }),
  /** accept=video 时最长拍摄秒数 */
  maxDuration: defaultProps("maxDuration", { type: Number }),
  /** 图片尺寸类型（H5 无效） */
  sizeType: defaultProps("sizeType", { type: Array as PropType<string[]> }),
  /** 预览图间距 */
  previewGap: defaultProps("previewGap", { type: [Number, String] }),
  /** 图片显示模式 */
  imageMode: defaultProps("imageMode", { type: String as PropType<UniHelper.ImageProps["mode"]> }),
  /** 预览区图标尺寸 */
  previewIconSize: defaultProps("previewIconSize", { type: [Number, String] }),
  /** 预览区图标颜色 */
  previewIconColor: defaultProps("previewIconColor", { type: String }),
  /** 预览区图标字重 */
  previewIconWeight: defaultProps("previewIconWeight", { type: [Number, String] }),
  /** 上传区图标 */
  icon: defaultProps("icon", { type: String }),
  /** 上传区图标尺寸 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 上传区图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 上传区图标字重 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 删除前拦截 `(file, index) => boolean | Promise<boolean>` */
  beforeRemove: defaultProps("beforeRemove", { type: Function }),
  /** 上传后处理 `(files, next) => void` */
  afterRead: defaultProps("afterRead", { type: Function }),
  /** 上传前拦截 `(files) => boolean | Promise<boolean> | UploadFile[]` */
  beforeRead: defaultProps("beforeRead", { type: Function }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const uploadEmits = {
  delete: (_event: { index: number; file: UploadFile }) => true,
  oversize: (_files: UploadFile[]) => true,
  "update:modelValue": (_value: string | string[]) => true,
}

export type UploadEmits = typeof uploadEmits
export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadInstance = InstanceType<typeof Upload>
