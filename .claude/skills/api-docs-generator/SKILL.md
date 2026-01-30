---
name: api-docs-generator
description: 根据组件 Props/Emits/Slots 自动生成 API 文档表格。
user_invocable: true
---

# API 文档生成器

根据组件的 Props、Emits、Slots 定义自动生成标准化的 API 文档。

---

## 使用方式

用户输入示例：

- "为 ui-button 生成 API 文档"
- "生成 button 组件文档"
- "/api-docs-generator ui-button"

---

## 文档模板

```markdown
# {Name} 组件

{组件描述}

## 基础用法

\`\`\`vue
<template>
  <ui-{name}>内容</ui-{name}>
</template>
\`\`\`

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | `'mini' \| 'small' \| 'normal' \| 'medium' \| 'large'` | `'normal'` | 尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| customStyle | `string \| CSSProperties` | - | 自定义样式 |
| customClass | `string` | - | 自定义类名 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: Event)` | 点击时触发 |
| change | `(value: T)` | 值变化时触发 |

## Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽 |
| icon | 图标插槽 |
| prefix | 前缀插槽 |
| suffix | 后缀插槽 |

## 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| focus | - | `void` | 获取焦点 |
| blur | - | `void` | 失去焦点 |
| validate | - | `Promise<boolean>` | 触发校验 |

## CSS 变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| --ui-{name}-color | `var(--ui-color-primary)` | 主色调 |
| --ui-{name}-size | `var(--ui-size-normal)` | 尺寸 |

## 示例

### 基础用法

\`\`\`vue
<ui-{name}>基础</ui-{name}>
\`\`\`

### 不同尺寸

\`\`\`vue
<ui-{name} size="small">小</ui-{name}>
<ui-{name} size="normal">中</ui-{name}>
<ui-{name} size="large">大</ui-{name}>
\`\`\`

### 禁用状态

\`\`\`vue
<ui-{name} disabled>禁用</ui-{name}>
\`\`\`
```

---

## Props 类型映射

从 `index.ts` 提取 Props 定义并转换：

| Props 工具函数            | 文档类型                  | 默认值  |
| ------------------------- | ------------------------- | ------- |
| `Boolean`                 | `boolean`                 | `false` |
| `truthProp`               | `boolean`                 | `true`  |
| `String`                  | `string`                  | -       |
| `Number`                  | `number`                  | -       |
| `[Number, String]`        | `string \| number`        | -       |
| `makeStringProp<T>(val)`  | `T`                       | `val`   |
| `makeNumericProp(val)`    | `string \| number`        | `val`   |
| `makeNumberProp(val)`     | `number`                  | `val`   |
| `styleProp`               | `string \| CSSProperties` | -       |
| `Array as PropType<T[]>`  | `T[]`                     | `[]`    |
| `Object as PropType<T>`   | `T`                       | -       |
| `Function as PropType<T>` | `T`                       | -       |

---

## Emits 格式

从 `xxxEmits` 对象提取：

```typescript
// 源代码
export const buttonEmits = {
  click: (event: any) => true,
  change: (value: string) => true,
}

// 生成文档
| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: Event)` | 点击时触发 |
| change | `(value: string)` | 值变化时触发 |
```

---

## Slots 提取

从 `.vue` 文件的 `<template>` 中提取：

```vue
<!-- 源代码 -->
<slot />
<slot name="icon" />
<slot name="prefix" :value="value" />

<!-- 生成文档 -->
| 名称 | 参数 | 说明 |
|------|------|------|
| default | - | 默认插槽 |
| icon | - | 图标插槽 |
| prefix | `{ value }` | 前缀插槽 |
```

---

## 文档位置

生成的文档可放置于：

1. **组件目录**：`src/uni_modules/uniapp-ui/ui-{name}/README.md`
2. **文档站点**：`docs/components/{name}.md`
3. **直接输出**：在对话中展示

---

## 检查清单

生成文档后确保：

- [ ] 所有 Props 都有说明
- [ ] 类型标注准确
- [ ] 默认值正确
- [ ] 所有 Events 都有说明
- [ ] 所有 Slots 都有说明
- [ ] 示例代码可运行
- [ ] 中文描述清晰

---

## 示例输出

```markdown
# Button 按钮

常用的操作按钮。

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | 按钮类型 |
| size | `'mini' \| 'small' \| 'normal' \| 'medium' \| 'large'` | `'normal'` | 按钮尺寸 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| round | `boolean` | `false` | 是否圆角 |
| plain | `boolean` | `false` | 是否朴素按钮 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `(event: Event)` | 点击按钮时触发（loading/disabled 时不触发） |

## Slots

| 名称 | 说明 |
|------|------|
| default | 按钮内容 |
| icon | 自定义图标 |
| loading | 自定义加载图标 |
```
