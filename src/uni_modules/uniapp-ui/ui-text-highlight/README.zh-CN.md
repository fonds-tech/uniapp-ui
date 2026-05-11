# TextHighlight 文本高亮

将文本中匹配子串以高亮色显示，常用于搜索结果。

## 基础用法

```vue
<ui-text-highlight text="这是一段测试文本" match="测试" />
```

## 自定义高亮色

```vue
<ui-text-highlight text="..." match="关键词" highlight-color="danger" />
```

## API

### Props

| 参数            | 说明                       | 类型                      | 默认值 |
| --------------- | -------------------------- | ------------------------- | ------ |
| text            | 完整文本                   | `string`                  | -      |
| match           | 需高亮的子串（区分大小写） | `string`                  | -      |
| color           | 普通文字颜色               | `string`                  | -      |
| highlight-color | 高亮文字颜色               | `string`                  | -      |
| text-row        | 行数（line-clamp）         | `number \| string`        | `2`    |
| font-size       | 字号                       | `number \| string`        | -      |
| font-weight     | 粗细                       | `number \| string`        | -      |
| line-height     | 行高                       | `number \| string`        | -      |
| custom-class    | 自定义类名                 | `string`                  | -      |
| custom-style    | 自定义样式                 | `string \| CSSProperties` | -      |

### Events

| 事件名     | 说明           | 回调参数        |
| ---------- | -------------- | --------------- |
| click      | 点击非匹配段   | `value: string` |
| clickMatch | 点击匹配高亮段 | `value: string` |

### 暴露方法

| 方法  | 说明         |
| ----- | ------------ |
| match | 手动触发匹配 |

## 注意事项

- `match` 字符串支持正则转义，可包含 `.*+?` 等元字符
- 不支持多个不同子串同时高亮（仅匹配单一字符串）
