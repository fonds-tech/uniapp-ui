import type Pagination from "./ui-pagination.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [paginationProps, usePaginationProps] = createProps("pagination", {
  /**
   * 列表数据
   */
  list: { type: Array, default: () => [] },
  /**
   * 当前分页
   */
  page: makeNumericProp(1),
  /**
   * 分页大小
   */
  pageSize: makeNumericProp(10),
  /**
   * 列表总数
   */
  total: makeNumericProp(0),
  /**
   * 是否加载中
   */
  loading: Boolean,
  /**
   * 分页数据
   */
  pagination: { type: Object, default: () => ({}) },
  /**
   * 空数据提示图标
   */
  emptyIcon: makeStringProp(""),
  /**
   * 空数据提示文字
   */
  emptyText: makeStringProp("暂无数据～"),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const paginationEmits = {
  load: (page: number, pageSize: number) => true,
  refresh: (page: number, pageSize: number) => true,
}

export type PaginationEmits = typeof paginationEmits
export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationInstance = InstanceType<typeof Pagination>
