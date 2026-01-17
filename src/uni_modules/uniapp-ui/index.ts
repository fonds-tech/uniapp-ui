import type { App } from "vue"
import type { Config } from "./types"
import { globalMitt } from "./utils/mitt"
import { initGlobalProps } from "./utils/component"

const ui = {
  install(app: App, options: Config = {}): void {
    const mitt = globalMitt

    // 初始化组件默认值
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
export { provideDialog } from "./ui-dialog"
export type { DialogExpose, DialogInstance, DialogOptions } from "./ui-dialog"
export { setGlobalProps } from "./utils/component"
export default ui
