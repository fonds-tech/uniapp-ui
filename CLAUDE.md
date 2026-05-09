# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

跨端 UI 组件库（80+ 组件），Vue 3 + UniApp + TypeScript，目标平台：H5 / 微信等小程序 / App。组件本体位于 `src/uni_modules/uniapp-ui/`（README 中提到的 `src/ui/` 已废弃，以 `uni_modules` 为准）；外层 `src/` 是文档/演示工程。

## 常用命令

```bash
# 开发（默认 H5）；切平台
pnpm dev               # H5
pnpm dev:mp-weixin     # 微信小程序
pnpm dev:app           # App

# 构建
pnpm build             # H5
pnpm build:mp-weixin

# 质量检查（提交前都要过）
pnpm lint              # ESLint
pnpm lint:fix
pnpm type-check        # vue-tsc --noEmit
pnpm format            # Prettier

# 测试（vitest + jsdom）
pnpm test                              # 全量 run，verbose
pnpm test:watch                        # 监听
pnpm test:ui                           # vitest UI
pnpm test:coverage                     # v8 覆盖率
pnpm test tests/components/button.test.ts   # 单文件

# 文档（VitePress）
pnpm docs:dev
pnpm docs:build        # 含 H5 build + demoCopy.ts
```

包管理器固定 `pnpm@10.10.0`，Node ≥ 20；`preinstall` 钩子拒绝非 pnpm 安装。

## 高层架构

### 双层项目结构

- `src/uni_modules/uniapp-ui/` — **组件库本体**，符合 uni_modules 规范，包含 `hooks/`、`styles/`、`types/`、`utils/` 与每个 `ui-xxx/` 组件目录。`main.ts` 通过 `app.use(ui)` 安装。
- `src/` 其余目录（`pages/`、`components/`、`hooks/`、`utils/`、`store/`、`router/`、`style/`）— **文档/演示工程**，复用组件库做 demo 页。两层的 `hooks/`、`utils/` 不要混淆：组件库内只引用 `../hooks` / `../utils`，禁止反向依赖文档工程。
- `docs/` — VitePress 文档站。

### easycom 自动注册

`pages.config.ts` 配置 `^ui-(.*)` → `@/uni_modules/uniapp-ui/ui-$1/ui-$1.vue`，模板内 `<ui-button>` 即可使用，**不需要手动 import**。新增组件目录命名必须严格匹配该 glob：`ui-{kebab-case}/ui-{kebab-case}.vue`。

## 协作流程

- 单组件审查节奏：**列改动清单 → 等用户拍板 → 执行 → 等用户验证 → 提交**
- 列改动用紧凑表格：`优先级 | 行号 | 现状 → 动作`，少废话
- 改完跑 `pnpm test tests/components/xxx.test.ts` + `eslint`，全绿后再汇报
- 重构若改了实现细节断言（inline 样式名等），同步更新测试断言对齐新行为
- 只有用户明确说"提交"才 commit

## Husky / 提交

- `prepare` 自动 `git init && husky` 安装钩子
- `lint-staged` 对 `*.{js,ts,vue}` 跑 `prettier --write`
- `commitlint` 走 conventional config
- 提交信息中文/英文皆可，遵循 `feat|fix|refactor|docs|test|chore(scope): subject`，参考最近 commit 历史风格

## 子规则导入

详细规则按主题拆到 `.claude/rules/`，按文件 glob 自动加载。手动也可参考。

@.claude/rules/component-architecture.md
@.claude/rules/props-and-defaults.md
@.claude/rules/scss-conventions.md
@.claude/rules/vue-script-order.md
@.claude/rules/vue-variable-naming.md
@.claude/rules/cross-platform.md
@.claude/rules/mp-pitfalls.md
@.claude/rules/demo-conventions.md
@.claude/rules/testing.md
