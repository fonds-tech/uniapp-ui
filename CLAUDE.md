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

### 单组件目录约定

每个 `ui-xxx/` 通常包含：

- `ui-xxx.vue` — SFC，`<script setup lang="ts">`，`defineOptions({ name: "ui-xxx" })`，并附第二个 `<script lang="ts">` 导出 `options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" }`（小程序虚拟节点必备）。
- `index.ts` — 导出 `xxxProps`、`xxxEmits`、`XxxProps`、`XxxEmits`、`XxxInstance` 类型，以及业务相关的字面量联合类型（如 `ButtonType`）。
- `README.zh-CN.md` — 组件文档（VitePress 渲染）。

`types/components.ts` 集中 `Components` 接口（easycom 类型补全）；新增组件须同步登记。

### Props 默认值系统（关键）

**禁止**直接写 `default:` 字面量。统一通过 `utils/props.ts` 的 `buildDefaultProps`：

```ts
const defaultProps = buildDefaultProps("button", { type: "primary", size: "normal", ... })
export const buttonProps = {
  type: defaultProps("type", { type: String as PropType<ButtonType> }),
  size: defaultProps("size", { type: String as PropType<ButtonSize> }),
}
```

`buildDefaultProps` 内部走全局响应式 store（`globalPropsConfig`），由 `setGlobalProps` / `initGlobalProps` / `mergeGlobalProps` / `ui-config-provider` 注入；这让用户可以全局覆盖任意组件默认值。新增 prop 必须先在 `defaultValues` 对象列出，再用 `defaultProps(key, ...)`，否则全局配置失效。

### 样式系统

- 设计 token 集中在 `src/uni_modules/uniapp-ui/styles/variables.scss`，分四层：L0 灰阶 → L1 主题色 → L2 语义（文本/边框/背景）→ L3 角色别名。**组件只用 semantic / role-alias**，禁止直接引用 L0。
- 命名规则：`--ui-{category}-{property}-{variant}-{state}`。
- ESLint 关闭 `fonds/style-sort` 仅对 `styles/variables.scss` 生效，其他样式文件按规则排序。
- 单位：`useUnit`（数字 → `rpx` 字符串，已是字符串透传）；颜色透传走 `useColor`；样式合并 `useStyle`。

### 跨端注意事项

- 模板优先用 `<view>` / `<text>`，不要用 `<div>` / `<span>`（小程序不支持）。
- 事件名小程序端必须全小写（如 `getphonenumber`、`launchapp`），见 `ui-button/index.ts` 的 emits 命名。
- 平台差异判断：使用 `@uni-helper/uni-env`（`isH5` / `isMp` 等），不要直接判断 `process.env`。
- 小程序虚拟节点：根组件 `options: { virtualHost: true }`，否则外层多一层 wrapper 影响布局。

### 节流/防抖/DOM 测量

组件库内 hooks 优先：`useThrottle`、`useDebounce`、`useRect/useRects`、`useTransition`（用 `setInterval` 模拟 RAF 兼容小程序）、`useLockScroll`、`useDraggable`、`useUnitToPx/useUnitToRpx`。新需求若 `@vueuse/core` 与组件 hooks 都能解，**优先组件 hooks**（已做小程序适配）。

## 测试

- 仅跑 `tests/components/*.test.ts`（jsdom + `@vue/test-utils`）。
- `tests/setup.ts` 用 `vi.mock` 打破 `useDialog` 的循环依赖；写新 hook 测试时若涉及 hooks 索引循环依赖，参考此处。
- 过渡动画用 `setInterval` 模拟 RAF —— 测试需用 `vi.useFakeTimers()` + 工具函数 `waitForTransition(ms)` / `waitForRender()`，否则断言会读到中间状态。
- 弹窗类组件挂载会先触发 `update:show=true`，断言「关闭」结果用 `getLastEmitted(wrapper, "update:show")` 取最后一次。
- 覆盖率范围限定 `src/uni_modules/uniapp-ui/**/*.{ts,vue}`，排除 `index.ts` / `*.d.ts` / `README*.md`。
- 池：`forks` + `singleFork: true`（避免共享状态污染）；`teardownTimeout: 5000` 防挂起。

## 代码风格要点

### 命名/类型/路径

- 命名：组件 `ui-` 前缀 + kebab-case；类型 `PascalCase`；常量 `SCREAMING_SNAKE_CASE`；变量 `camelCase`。
- TS 类型优先 `type` 而非 `interface`（除非要 declaration merge）。
- ESLint 基于 `@fonds/eslint-config`；不要添加与之冲突的规则。
- 路径别名：`@/*` → `src/*`；`@img/*` → `src/static/*`。

### `<script setup>` 块顺序（严格）

```
1. imports — type 最前 / utils → 兄弟组件 inject key → ./index → hooks → vue api 最后
2. defineOptions / defineProps / defineEmits          ← 三件套永远紧跟 imports，不被任何代码打断
3. use* 钩子（useParent / useChildren / useSlots ...）
4. instance 引用（getCurrentInstance）
5. ref / reactive 响应式状态（同样按变量名长度短→长排序）
6. computed
   - 单行 computed 一组，紧排无空行，按变量名长度短→长
   - 多行 computed 接在单行组下面，同样短→长
7. watch
8. 普通函数（业务方法）
9. 生命周期（onMounted 等）
10. linkChildren（在它依赖的 toggle 等函数定义后）
11. defineExpose（最末尾）
```

### 注释

- 每个 ref / computed / function 上方一行简短注释**说作用**（写"是干嘛"，不写"这是 computed/ref"等废话）。
- 命名能自解释的省略；SCSS 几何 trick / 公式 / 跨端坑 / 隐藏约束 必须注释。
- **禁引用其他 UI 框架名**（Element / Vant / Ant / wot-design 等）。

### 命名约定（组件内 computed）

- 根节点样式 → `rootStyle`；类名 → `classNames`
- 子部位样式 → `xxxStyle`（如 `headerStyle` / `titleStyle`）
- 类名集合 → `xxxClassList` 或 `classNames`

### SCSS / 样式

- 不硬编码数值（颜色 / 间距 / 字号 / 圆角 / 阴影 / 动画）— 全走 `--ui-*` token。
- prop 通过 inline CSS var 注入（`--ui-{component}-xxx`），SCSS 默认值集中在选择器顶部，**禁双路径**（不允许 inline 写具体值同时 SCSS 也写具体值）。
- 渐变/图片用 `background:` 简写；`background-color` 只接颜色不接 gradient。
- ui-icon / 子组件颜色字号优先由父组件 SCSS 接管（继承 `color` / `font-size`），prop 不传时由 SCSS 默认接管。
- **禁用样式穿透**（`:deep()` / `>>>` / `/deep/`）：跨端兼容性差，小程序与 H5 行为不一致。子组件定制走其暴露的 `customClass` / `customStyle` / CSS var props，不要从父组件穿透选择器。

### 组件设计原则

- **不做尺寸/字号预设档**（mini/small/medium/large 这类关键字）。`size` / `iconSize` / `padding` 等连续值类型为 `string | number`，用户直传具体数值。
- 语义档保留（`type: primary/danger`、`shape: circle/square`）—— 离散语义不是连续数值。
- 暴露**大量灵活 prop**（颜色/尺寸/间距/圆角/字号/边框/阴影 各自独立可控），不要为"简洁"牺牲可定制性。
- **非必要不提取常量**：单次使用的字面量直接 inline（视需要加注释说明含义/单位）。仅当**多次复用**、或**大型数据表/映射**时才抽常量。
- 真正必要的模块级常量（数据表/正则）和工具类型从 `<script setup>` 里提到 `./index.ts` export，避免破坏 setup 块顺序与被 `vue/define-macros-order` 报错。
- props 默认值统一走 `buildDefaultProps("xxx", {...})`，让用户能全局覆盖。

## 协作流程

- 单组件审查节奏: **列改动清单 → 等用户拍板 → 执行 → 等用户验证 → 提交**。
- 列改动用紧凑表格: `优先级 | 行号 | 现状 → 动作`，少废话。
- 改完跑 `pnpm test tests/components/xxx.test.ts` + `eslint`，全绿后再汇报。
- 重构若改了实现细节断言（inline 样式名等），同步更新测试断言对齐新行为。
- 只有用户明确说"提交"才 commit。

## Husky / 提交

- `prepare` 会自动 `git init && husky` 安装钩子。
- `lint-staged` 对 `*.{js,ts,vue}` 跑 `prettier --write`；`commitlint` 走 conventional config。
- 提交信息中文/英文皆可，遵循 `feat|fix|refactor|docs|test|chore(scope): subject`，参考最近 commit 历史风格。

## 新增组件 checklist

1. `src/uni_modules/uniapp-ui/ui-xxx/ui-xxx.vue` + `index.ts` + `README.zh-CN.md`。
2. `index.ts` 用 `buildDefaultProps("xxx", {...})` 定义所有 props 默认值。
3. SFC 双 `<script>` 块：`setup` + `options` 配 `virtualHost: true`。
4. `types/components.ts` 注册 `"xxx": Partial<XxxProps>`。
5. `tests/components/xxx.test.ts` 覆盖 props / events / slots / 边界态。
6. `pnpm lint && pnpm type-check && pnpm test tests/components/xxx.test.ts` 全绿。
