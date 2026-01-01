# Loading 加载

加载中状态组件。

## 基础用法

```vue
<ui-loading />
```

## 加载类型

```vue
<ui-loading type="circular" />
<ui-loading type="spinner" />
```

## 自定义颜色

```vue
<ui-loading color="#1989fa" />
<ui-loading color="#07c160" />
<ui-loading color="#ee0a24" />
```

## 自定义大小

```vue
<ui-loading size="24rpx" />
<ui-loading size="36rpx" />
<ui-loading size="48rpx" />
```

## 加载文案

```vue
<ui-loading text="加载中..." />
<ui-loading text="请稍候..." vertical />
```

## Props

| 参数         | 说明           | 类型                  | 默认值     |
| ------------ | -------------- | --------------------- | ---------- |
| show         | 是否显示       | `boolean`             | `true`     |
| type         | 类型           | `circular \| spinner` | `circular` |
| size         | 大小           | `string \| number`    | `32rpx`    |
| color        | 颜色           | `string`              | `#999999`  |
| text         | 加载文案       | `string`              | -          |
| text-gap     | 文案和图标间距 | `string \| number`    | `12rpx`    |
| text-size    | 文案大小       | `string \| number`    | -          |
| text-color   | 文案颜色       | `string`              | -          |
| text-weight  | 文案粗细       | `string \| number`    | -          |
| vertical     | 是否垂直排列   | `boolean`             | `false`    |
| custom-class | 自定义类名     | `string`              | -          |
| custom-style | 自定义样式     | `string \| object`    | -          |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义加载图标 |
