# Text 文本

文字渲染基础组件。封装 uniapp `<text>`，提供颜色 / 字号 / 对齐 / 单/多行省略 / 可点击 / 可选中。

## 基础用法

```vue
<ui-text text="一段普通文本" />
<ui-text color="primary" size="32rpx" weight="600">加粗主色</ui-text>
```

## 多行省略

```vue
<ui-text :rows="2" text="超过两行会被省略号截断..." />
```

## 可点击

```vue
<ui-text clickable @click="onClick">点击我</ui-text>
```

## API

### Props

| 参数         | 说明                                  | 类型                                      | 默认值  |
| ------------ | ------------------------------------- | ----------------------------------------- | ------- |
| text         | 文本内容（也可走 default slot）       | `number \| string`                        | -       |
| size         | 字号                                  | `number \| string`                        | -       |
| color        | 颜色                                  | `string`                                  | -       |
| weight       | 字重                                  | `number \| string`                        | -       |
| align        | 对齐                                  | `'left' \| 'center' \| 'right'`           | -       |
| rows         | 行数（0=不限 / 1=单行省略 / >1=多行） | `number \| string`                        | `0`     |
| decoration   | 文本修饰                              | `'none' \| 'underline' \| 'line-through'` | -       |
| line-height  | 行高                                  | `number \| string`                        | -       |
| decode       | uniapp text 组件 decode               | `boolean`                                 | `false` |
| clickable    | 可点击（active 反馈）                 | `boolean`                                 | `false` |
| selectable   | 可选中                                | `boolean`                                 | `false` |
| custom-class | 自定义类名                            | `string`                                  | -       |
| custom-style | 自定义样式                            | `string \| CSSProperties`                 | -       |

### Events

| 事件名 | 说明 | 参数 |
| ------ | ---- | ---- |
| click  | 点击 | -    |
