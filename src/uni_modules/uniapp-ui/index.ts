import type { App } from "vue"
import type { Options } from "./types"
import { globalMitt } from "./utils/mitt"
import { initGlobalProps } from "./utils/props"

const ui = {
  install(app: App, options: Options = {}): void {
    const mitt = globalMitt

    if (options.components) {
      initGlobalProps(options.components)
    }

    app.mixin({
      beforeCreate() {
        if (this.$mpType === "page") {
          let route = ""
          // #ifdef MP
          route = this.$scope.route
          // #endif
          // #ifndef MP
          route = this.route
          // #endif
          mitt.setNamespace(route)
        }
      },
      beforeUnmount() {
        if (this.$mpType === "page") {
          // #ifdef MP
          mitt.clear(this.$scope.route)
          // #endif
          // #ifndef MP
          mitt.clear(this.route)
          // #endif
        }
      },
      onShow() {
        // #ifdef MP
        mitt.setNamespace(this.$scope.route)
        // #endif
        // #ifndef MP
        mitt.setNamespace(this.route)
        // #endif
      },
      onPageScroll(options: Record<string, any>) {
        const pages = getCurrentPages()
        const { route } = pages[pages.length - 1]
        mitt.emit(`scroll:${route}`, options)
      },
      onReachBottom() {},
    })
  },
}

export * from "./hooks"
export type * from "./types"
export type { CardEmits, CardInstance, CardProps, CardShadow } from "./ui-card"
export type { CircleColor, CircleEmits, CircleExpose, CircleGradientColor, CircleInstance, CircleProps, CircleStartPosition, CircleStrokeLinecap } from "./ui-circle"
export type { CollapseInstance, CollapseModelValue, CollapseProps } from "./ui-collapse"
export type { CollapseItemExpose, CollapseItemInstance, CollapseItemProps } from "./ui-collapse-item"
export { provideDialog } from "./ui-dialog"
export type { DialogExpose, DialogInstance, DialogOptions } from "./ui-dialog"
export type { DividerEmits, DividerExpose, DividerInstance, DividerProps } from "./ui-divider"
export type { GridDirection, GridInstance, GridProps } from "./ui-grid"
export type { GridItemInstance, GridItemProps } from "./ui-grid-item"
export type { ListEmits, ListInstance, ListProps, ListStatus } from "./ui-list"
export { provideNotify } from "./ui-notify"
export type { NotifyInstance, NotifyOptions, NotifyType } from "./ui-notify"
export type { PopoverAction, PopoverEmits, PopoverInstance, PopoverPlacement, PopoverProps, PopoverTheme, PopoverTrigger } from "./ui-popover"
export type { TextEllipsisInstance, TextEllipsisProps } from "./ui-text-ellipsis"
export { provideToast } from "./ui-toast"
export type { ToastInstance, ToastOptions } from "./ui-toast"
export type { TooltipEmits, TooltipInstance, TooltipPlacement, TooltipProps, TooltipTrigger } from "./ui-tooltip"
export type { ActiveIdType, TreeSelectChild, TreeSelectEmits, TreeSelectInstance, TreeSelectItem, TreeSelectProps } from "./ui-tree-select"
export type { WatermarkContent, WatermarkFontWeight, WatermarkInstance, WatermarkProps } from "./ui-watermark"

// 导出全局配置相关（从 utils/props 导出）
export { initGlobalProps, mergeGlobalProps, resetGlobalProps, resolveGlobalProps, setGlobalProps } from "./utils/props"

export default ui
