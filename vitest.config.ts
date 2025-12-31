import path from "node:path"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [vue()],
  test: {
    // 测试环境
    environment: "jsdom",

    // 全局变量
    globals: true,

    // 测试文件匹配模式
    include: ["tests/**/*.{test,spec}.{js,ts}"],

    // 排除目录
    exclude: ["node_modules", "dist", ".git", ".cache"],

    // 覆盖率配置
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/ui/**/*.{ts,vue}"],
      exclude: [
        "src/ui/**/index.ts",
        "src/ui/**/*.d.ts",
      ],
    },

    // 设置文件
    setupFiles: ["./tests/setup.ts"],

    // 超时时间
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
