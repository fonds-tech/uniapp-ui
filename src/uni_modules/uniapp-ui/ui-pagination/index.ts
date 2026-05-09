import type Pagination from "./ui-pagination.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("pagination", {
  list: () => [],
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  emptyIcon: "",
  emptyText: "暂无数据～",
  customClass: "",
  customStyle: "",
})

export const paginationProps = {
  /** 列表数据 */
  list: defaultProps("list", { type: Array as PropType<any[]> }),
  /** 当前页 */
  page: defaultProps("page", { type: [Number, String] }),
  /** 每页条数 */
  pageSize: defaultProps("pageSize", { type: [Number, String] }),
  /** 总条数 */
  total: defaultProps("total", { type: [Number, String] }),
  /** 是否加载中 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 空数据图标 */
  emptyIcon: defaultProps("emptyIcon", { type: String }),
  /** 空数据文案 */
  emptyText: defaultProps("emptyText", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const paginationEmits = {
  /** 触底加载更多 */
  load: (page: number, pageSize: number) => typeof page === "number" && typeof pageSize === "number",
  /** 下拉刷新 */
  refresh: (page: number, pageSize: number) => typeof page === "number" && typeof pageSize === "number",
}

export type PaginationEmits = typeof paginationEmits
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationInstance = InstanceType<typeof Pagination>
