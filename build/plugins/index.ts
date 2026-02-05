import process from "node:process"
import useUniPlugin from "./uni"
import useUnoCssPlugin from "./unocss"
import useUniRootPlugin from "./root"
import useImageminPlugin from "./imagemin"
import useUniPagesPlugin from "./pages"
import useComponentsPlugin from "./components"
import useFixVitePluginVue from "./fix-vite-plugin-vue"
import useAutoImportPlugin from "./import"
import useUniLayoutsPlugin from "./layouts"
import useVisualizerPlugin from "./visualizer"
import useUniPlatformPlugin from "./platform"
import useViteRestartPlugin from "./restart"
import useHtmlTransformPlugin from "./html-transform"
import useBundleOptimizerPlugin from "./optimizer"

export default function createVitePlugins(mode: string, env: Record<string, string>) {
  const UNI_PLATFORM = process.env.UNI_PLATFORM
  const { VITE_APP_TITLE } = env

  const plugins: any[] = [
    useUniLayoutsPlugin(),
    useUniPlatformPlugin(),
    useUniPagesPlugin(),
    useBundleOptimizerPlugin(),
    useUniRootPlugin(),
    // Components 必须在 uni 之前，否则组件无法正确解析
    useComponentsPlugin(),
    useUniPlugin(),
    useFixVitePluginVue(),
    useUnoCssPlugin(),
    useAutoImportPlugin(),
    useViteRestartPlugin(),
    UNI_PLATFORM === "h5" ? useHtmlTransformPlugin(VITE_APP_TITLE) : null,
    UNI_PLATFORM === "h5" && mode === "production" ? useVisualizerPlugin() : null,
    // 图片压缩：仅在生产环境启用
    mode === "production" ? useImageminPlugin() : null,
  ]

  return plugins.filter(Boolean)
}
