import type Pagination from "./ui-pagination.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("pagination", {
  list: () => [],
  page: 1,
  pageSize: 10,
  total: 0,
  loading: false,
  pagination: () => ({}),
  emptyIcon: "",
  emptyText: "暂无数据～",
  customClass: "",
  customStyle: "",
})

export const paginationProps = {
  /**
   * 列表数据
   */
  list: defaultProps("list", { type: Array }),
  /**
   * 当前分页
   */
  page: defaultProps("page", { type: Number }),
  /**
   * 分页大小
   */
  pageSize: defaultProps("pageSize", { type: Number }),
  /**
   * 列表总数
   */
  total: defaultProps("total", { type: Number }),
  /**
   * 是否加载中
   */
  loading: defaultProps("loading", { type: Boolean }),
  /**
   * 分页数据
   */
  pagination: defaultProps("pagination", { type: Object }),
  /**
   * 空数据提示图标
   */
  emptyIcon: defaultProps("emptyIcon", { type: String }),
  /**
   * 空数据提示文字
   */
  emptyText: defaultProps("emptyText", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const paginationEmits = {
  load: (page: number, pageSize: number) => true,
  refresh: (page: number, pageSize: number) => true,
}

export type PaginationEmits = typeof paginationEmits
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationInstance = InstanceType<typeof Pagination>
