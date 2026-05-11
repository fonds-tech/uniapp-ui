# Space 间距

flex 布局快捷封装，自动给子元素加间距。

## 基础用法

```vue
<template>
  <ui-space>
    <ui-button>按钮1</ui-button>
    <ui-button>按钮2</ui-button>
    <ui-button>按钮3</ui-button>
  </ui-space>
</template>
```

## 垂直方向

```vue
<ui-space direction="vertical">
  <ui-button block>按钮1</ui-button>
  <ui-button block>按钮2</ui-button>
</ui-space>
```

## 间距大小

预设档对应 token：

| 预设 | token           | 实际值 |
| ---- | --------------- | ------ |
| xs   | --ui-spacing-xs | 8rpx   |
| sm   | --ui-spacing-sm | 16rpx  |
| md   | --ui-spacing-md | 24rpx  |
| lg   | --ui-spacing-lg | 32rpx  |
| xl   | --ui-spacing-xl | 48rpx  |

```vue
<ui-space size="lg">...</ui-space>
<ui-space size="48rpx">...</ui-space>
<ui-space :size="20">...</ui-space>
```

## 自动换行 / 行列分离

```vue
<ui-space wrap gap-row="32rpx" gap-col="16rpx">
  <ui-tag v-for="i in 10" :key="i">标签{{ i }}</ui-tag>
</ui-space>
```

## 均分填充

```vue
<ui-space fill>
  <ui-button>1</ui-button>
  <ui-button>2</ui-button>
  <ui-button>3</ui-button>
</ui-space>
```

## 对齐

```vue
<ui-space align="center" justify="space-between">...</ui-space>
```

## API

### Props

| 参数         | 说明                       | 类型                                                                                  | 默认值         |
| ------------ | -------------------------- | ------------------------------------------------------------------------------------- | -------------- |
| direction    | 排列方向                   | `'horizontal' \| 'vertical'`                                                          | `'horizontal'` |
| size         | 间距大小（预设档或任意值） | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number \| string`                            | `'md'`         |
| align        | 交叉轴对齐                 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'`                             | -              |
| justify      | 主轴对齐                   | `'start' \| 'end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | -              |
| wrap         | 自动换行（仅 horizontal）  | `boolean`                                                                             | `false`        |
| fill         | 子元素均分 flex:1          | `boolean`                                                                             | `false`        |
| inline       | 行内布局 inline-flex       | `boolean`                                                                             | `false`        |
| gap-row      | 行间距，覆盖 size          | `number \| string`                                                                    | -              |
| gap-col      | 列间距，覆盖 size          | `number \| string`                                                                    | -              |
| custom-class | 自定义类名                 | `string`                                                                              | -              |
| custom-style | 自定义样式                 | `string \| CSSProperties`                                                             | -              |

### Slots

| 名称    | 说明   |
| ------- | ------ |
| default | 子元素 |

## 注意事项

- 依赖 CSS `flex gap`；MP 高版本与现代浏览器支持。低版本 MP 自动降级到普通 flex（无间距）
- `fill` 通过 WXSS 直接子元素选择器列表（`> view / > button / ...`）实现，自定义子组件需根节点是 `view` 才生效
