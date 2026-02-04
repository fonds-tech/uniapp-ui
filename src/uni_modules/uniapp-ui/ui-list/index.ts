import type List from "./ui-list.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 列表加载状态类型
 */
export type ListStatus = "loading" | "finished" | "error"

const defaultProps = buildDefaultProps("list", {
  itemHeight: 50,
  bufferSize: 5,
  loading: false,
  finished: false,
  finishedText: "没有更多了",
  loadingText: "加载中...",
  errorText: "加载失败，点击重试",
  error: false,
  offset: 300,
  immediateCheck: true,
  customClass: undefined,
  customStyle: undefined,
})

export const listProps = {
  /** 列表项高度，用于虚拟滚动计算（单位：px） */
  itemHeight: defaultProps("itemHeight", { type: [Number, String] }),
  /** 缓冲区大小，上下各预渲染的列表项数量 */
  bufferSize: defaultProps("bufferSize", { type: [Number, String] }),
  /** 是否处于加载状态 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 是否已加载完成所有数据 */
  finished: defaultProps("finished", { type: Boolean }),
  /** 加载完成后的提示文案 */
  finishedText: defaultProps("finishedText", { type: String }),
  /** 加载过程中的提示文案 */
  loadingText: defaultProps("loadingText", { type: String }),
  /** 加载失败后的提示文案 */
  errorText: defaultProps("errorText", { type: String }),
  /** 是否加载失败 */
  error: defaultProps("error", { type: Boolean }),
  /** 滚动条与底部距离小于该值时触发 load 事件（单位：px） */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 是否在初始化时立即检查并触发 load 事件 */
  immediateCheck: defaultProps("immediateCheck", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const listEmits = {
  /** 滚动条与底部距离小于 offset 时触发 */
  load: () => true,
  /** 更新 loading 状态 */
  "update:loading": (value: boolean) => typeof value === "boolean",
  /** 更新 error 状态 */
  "update:error": (value: boolean) => typeof value === "boolean",
}

export type ListEmits = typeof listEmits
export type ListProps = ExtractPropTypes<typeof listProps>
export type ListInstance = InstanceType<typeof List>
