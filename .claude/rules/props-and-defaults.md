---
paths:
  - "src/uni_modules/uniapp-ui/ui-*/index.ts"
  - "src/uni_modules/uniapp-ui/ui-*/ui-*.vue"
---

# Props 与默认值规范

## 禁止直接 `default:` 字面量

统一通过 `utils/props.ts` 的 `buildDefaultProps` 注册：

```ts
const defaultProps = buildDefaultProps("button", {
  type: "primary",
  size: undefined,
  color: undefined,
})

export const buttonProps = {
  type: defaultProps("type", { type: String as PropType<ButtonType> }),
  size: defaultProps("size", { type: [Number, String] }),
  color: defaultProps("color", { type: String }),
}
```

`buildDefaultProps` 走全局响应式 store（`globalPropsConfig`），由 `setGlobalProps` / `initGlobalProps` / `mergeGlobalProps` / `ui-config-provider` 注入。**让用户能全局覆盖任意组件默认值。**

新增 prop 必须先在 `defaultValues` 对象列出，再用 `defaultProps(key, ...)`，否则全局配置失效。

## 默认值哲学：尽量 `undefined`，由 SCSS token 兜底

**禁止**硬编码颜色 / 字号 / 间距 / 圆角等"设计 token"作 prop 默认值。

```ts
// ❌ 错
{
  color: "#333333",
  size: "32rpx",
  background: "#ffffff",
  weight: 700,
}

// ✅ 对
{
  color: undefined,
  size: undefined,
  background: undefined,
  weight: undefined,
}
```

理由:

- 默认值改 token 时不用动 N 个组件
- 用户全局覆盖更纯粹
- prop = undefined → useStyle 剥空 inline → SCSS 默认值（从 token）兜住

## prop → CSS var → SCSS 默认 三层链路

每个组件根节点用一个 `rootStyle` computed 把 prop 转成 CSS var inline 注入；SCSS 在选择器顶部声明同名 var 默认值（来自 token）。

```ts
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.color) vars["--ui-button-color"] = useColor(props.color)
  if (props.size !== undefined) vars["--ui-button-size"] = useUnit(props.size)
  if (props.background) vars["--ui-button-bg"] = useColor(props.background)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})
```

```scss
.ui-button {
  --ui-button-color: var(--ui-color-text);
  --ui-button-size: var(--ui-font-size-md);
  --ui-button-bg: var(--ui-color-background);

  color: var(--ui-button-color);
  font-size: var(--ui-button-size);
  background: var(--ui-button-bg);
}
```

**禁双路径**：不允许 inline 写具体值同时 SCSS 也写具体值。要么走 var 链，要么纯 SCSS 写死。

## 单位 / 颜色 / 样式工具

- 数字 → `rpx` 字符串：`useUnit(props.size)`（已是字符串透传）
- 颜色透传：`useColor(props.color)`（语义名如 `primary` → `var(--ui-color-primary)`，hex/rgb 原样返回）
- 样式合并：`useStyle({...})` 自动剥空值
- 注意：`useColor(undefined)` 返回 `""`，`useUnit(undefined)` 返回 `undefined` —— `useStyle` 都会剥掉

## 子组件需显式色时传 CSS var

MP 端 cross-component color cascade 不可靠。组件需要默认色但要给 ui-icon 等子组件用时，**显式传 var 字符串**而不是依赖父级继承：

```vue
<!-- ❌ 错：靠父级 color 继承 -->
<ui-icon :name="iconName" />

<!-- ✅ 对：显式 fallback 到 var -->
<ui-icon :name="iconName" :color="props.iconColor || 'var(--ui-xxx-icon-color)'" />
```

详见 mp-pitfalls.md。

## 不做尺寸/字号预设档

- ❌ `size="mini" | "small" | "medium" | "large"` 这类关键字预设
- ✅ `size: string | number` 接受任意值，用户直传具体数值
- 仅**离散语义**保留预设档：`type: "primary" | "danger"` / `shape: "circle" | "square"` 等

## 暴露大量灵活 prop，不为"简洁"牺牲可定制性

颜色 / 尺寸 / 间距 / 圆角 / 字号 / 边框 / 阴影 各自独立 prop。
