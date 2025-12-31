/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"

  const component: DefineComponent<object, object, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string
  /** 应用部署路径 */
  readonly VITE_APP_BASE: string
  /** 服务端口号 */
  readonly VITE_APP_PORT: string
  /** 应用微信 appid */
  readonly VITE_WX_APPID: string
  /** 应用 uni-appid */
  readonly VITE_UNI_APPID: string
  /** 是否清除console */
  readonly VITE_DELETE_CONSOLE: string
  /** 是否开启sourcemap */
  readonly VITE_SHOW_SOURCEMAP: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
