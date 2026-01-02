import path from "node:path"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 Vue API，与项目配置保持一致
    AutoImport({
      imports: ["vue"],
      dts: false, // 测试环境不生成类型文件
    }),
  ],
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
        "src/ui/**/README*.md",
      ],
    },

    // 设置文件
    setupFiles: ["./tests/setup.ts"],

    // 超时时间
    testTimeout: 10000,

    // 线程池配置 - 确保测试完成后正确退出
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },

    // 强制退出 - 防止挂起的定时器/资源阻止进程退出
    teardownTimeout: 5000,

    // 依赖优化 - 预打包 Vue 相关依赖
    deps: {
      optimizer: {
        web: {
          include: ["vue", "@vue/test-utils"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
