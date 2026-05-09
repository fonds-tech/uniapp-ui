---
paths:
  - "tests/**/*.test.ts"
  - "tests/setup.ts"
  - "vitest.config.ts"
---

# 测试规范

## 框架

- vitest + jsdom + `@vue/test-utils`
- 仅跑 `tests/components/*.test.ts`
- 池：`forks` + `singleFork: true`（避免共享状态污染）
- `teardownTimeout: 5000`（防挂起）
- 覆盖率范围：`src/uni_modules/uniapp-ui/**/*.{ts,vue}`，排除 `index.ts` / `*.d.ts` / `README*.md`

## 常用命令

```bash
pnpm test                                    # 全量 run
pnpm test:watch                              # 监听
pnpm test:ui                                 # vitest UI
pnpm test:coverage                           # v8 覆盖率
pnpm test tests/components/button.test.ts    # 单文件
```

## 循环依赖打破

`tests/setup.ts` 用 `vi.mock` 打破 `useDialog` 等 hook 的循环依赖。写新 hook 测试若涉及 hooks 索引循环依赖，参考此处。

## 过渡动画 / setInterval 模拟 RAF

组件库 `useTransition` 用 `setInterval` 模拟 RAF（兼容小程序）。测试需:

```ts
import { it } from "vitest"

it("...", async () => {
  vi.useFakeTimers()
  // 触发动画
  await waitForTransition(300) // 工具函数：推进 timers
  // 断言中间/末态
  vi.useRealTimers()
})
```

工具函数：

- `waitForTransition(ms)`：推进定时器到指定时间
- `waitForRender()`：等一帧渲染完成

否则断言会读到中间状态。

## 弹窗类组件断言

弹窗类组件挂载会**先触发** `update:show=true`。断言"关闭"结果用 `getLastEmitted` 取最后一次而非首次：

```ts
const wrapper = mount(UiDialog, { props: { show: false } })
// 关闭按钮点击 → 第二次 emit
await wrapper.vm.close()
expect(getLastEmitted(wrapper, "update:show")).toBe(false)
```

## 测试断言原则

- 重构若改了**实现细节断言**（inline 样式名等），同步更新断言对齐新行为
- 重构走 CSS var 链路后，inline 样式从 `__text` 等子元素移到根节点 `--ui-xxx-color` 形式，断言要跟着改
- 不为通过测试而妥协实现质量；测试服务于行为正确，不是反向约束

## 文件组织

```
tests/
├── setup.ts                          # vi.mock 打破循环依赖
├── components/
│   ├── button.test.ts                # 一组件一文件
│   ├── dialog.test.ts
│   └── ...
└── utils/                            # 工具函数测试（如有）
```

## 写测试前检查

- 该组件是否有现有测试 → 在现有文件追加，不新建
- 是否需要 fakeTimers → 涉及动画 / setInterval / setTimeout 都要
- mount 的 props 是否覆盖默认值（`show: true` 默认时挂载会立即触发）

## 不要测什么

- 不测 framework 原生行为（vue 响应式 / vue-test-utils API）
- 不测纯样式（CSS var / class 拼接 OK，具体 px 值不测）
- 不测平台条件编译（无法在 jsdom 验证 #ifdef MP）
