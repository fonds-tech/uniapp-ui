import path from "node:path"
import process from "node:process"
import useVitePlugins from "./build/plugins"
import { loadEnv, defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"))

  return defineConfig({
    envDir: "./env",
    // H5 使用相对路径以支持任意部署路径
    base: process.env.VITE_APP_BASE || env.VITE_APP_BASE || "./",
    plugins: useVitePlugins(mode, env),
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
      },
    },
    server: {
      hmr: true,
      host: "0.0.0.0",
      port: Number.parseInt(env.VITE_APP_PORT, 10),
    },
    esbuild: {
      drop: env.VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : [],
    },
    build: {
      target: "es6",
      sourcemap: false,
      minify: mode === "development" ? false : "esbuild",
    },
  })
})
