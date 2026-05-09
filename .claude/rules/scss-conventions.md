---
paths:
  - "src/uni_modules/uniapp-ui/**/*.{vue,scss}"
---

# SCSS / 样式规范

## Token 4 层

`src/uni_modules/uniapp-ui/styles/variables.scss` 是唯一 token 源。

| 层  | 含义     | 示例                                                              |
| --- | -------- | ----------------------------------------------------------------- |
| L0  | 灰阶原色 | `--ui-gray-1` ~ `--ui-gray-9`                                     |
| L1  | 主题色   | `--ui-color-primary` / `--ui-color-success` 等                    |
| L2  | 语义色   | `--ui-color-text` / `--ui-color-border` / `--ui-color-background` |
| L3  | 角色别名 | `--ui-color-on-surface` / `--ui-color-text-link`                  |

**组件只用 L2 / L3 semantic / role-alias，禁止直接引用 L0。**

## CSS Var 命名

`--ui-{component}-{property}-{variant}-{state}`

```scss
--ui-button-height
--ui-button-padding-x
--ui-button-color-disabled
--ui-button-border-color-active
```

## 不硬编码数值

颜色 / 间距 / 字号 / 圆角 / 阴影 / 动画时长 全走 `--ui-*` token。

```scss
// ❌ 错
.ui-x {
  padding: 16rpx;
  color: #333;
  border-radius: 8rpx;
}

// ✅ 对
.ui-x {
  padding: var(--ui-spacing-sm);
  color: var(--ui-color-text);
  border-radius: var(--ui-radius-sm);
}
```

## prop 通过 inline CSS var 注入

SCSS 默认值集中在选择器顶部，**禁双路径**——不允许 inline 写具体值同时 SCSS 也写具体值。

```scss
// ✅ 顶部声明所有 var 默认值
.ui-button {
  --ui-button-height: 76rpx;
  --ui-button-bg: var(--ui-color-primary);
  --ui-button-color: var(--ui-color-text-inverse);

  height: var(--ui-button-height);
  background: var(--ui-button-bg);
  color: var(--ui-button-color);
}
```

JS 端只在 prop 传值时注入对应 var：

```ts
if (props.height) vars["--ui-button-height"] = useUnit(props.height)
```

## 渐变 / 图片用 `background:` 简写

```scss
// ❌ background-color 不接 gradient
background-color: linear-gradient(...);

// ✅
background: linear-gradient(...);
```

`background-color` 只接颜色，不接 gradient。

## 子组件颜色 / 字号

ui-icon / 子组件颜色字号优先由父组件 SCSS 接管（继承 `color` / `font-size`）；prop 不传时由 SCSS 默认值兜住。

> MP 端 cross-component color cascade 不可靠 —— 子组件需要默认色时，prop 显式传 `var(--ui-xxx-color)`，详见 mp-pitfalls.md。

## 禁用样式穿透

**禁** `:deep()` / `>>>` / `/deep/`。MP 不支持，行为与 H5 不一致。

跨组件定制走子组件暴露的 `customClass` / `customStyle` / CSS var props，不要从父组件穿透选择器。

## WXSS 选择器限制

- WeChat MP 不支持通用选择器 `*`
- 选直接子元素枚举常见标签：`> view, > text, > image, > button, > navigator, > scroll-view, > swiper, > input, > textarea, > label`

## variables.scss 的 ESLint 例外

ESLint 关闭 `fonds/style-sort` 仅对 `styles/variables.scss` 生效（token 文件按语义分组而非属性顺序）。其他样式文件按 `style-sort` 规则属性排序。

## SCSS 块顺序（组件根选择器内）

```scss
.ui-xxx {
  // 1. CSS var 默认值（按 var 名长度短→长）
  --ui-xxx-size: 32rpx;
  --ui-xxx-color: var(--ui-color-text);

  // 2. 自身样式
  display: flex;
  ...

  // 3. BEM 子元素
  &__inner { ... }

  // 4. BEM 修饰符
  &--active { ... }
}
```

## 空 wrapper 处理

slot wrapper 可能空时，用 `:empty` 隐藏避免空 box 影响布局：

```scss
&__footer {
  margin-top: var(--ui-spacing-xl);

  &:empty {
    display: none;
  }
}
```

不要在 JS 层用 useHasSlot 等运行期检测包 v-if（详见 mp-pitfalls.md）。
