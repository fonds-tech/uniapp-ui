# IconText 图标文字

图标和文字组合组件。

## 基础用法

```vue
<template>
  <ui-icon-text name="home" text="首页" />
  <ui-icon-text name="search" text="搜索" />
  <ui-icon-text name="heart" text="收藏" />
  <ui-icon-text name="person" text="我的" />
</template>
```

## 自定义大小

通过 `size` 和 `text-size` 属性设置图标和文字大小。

```vue
<template>
  <ui-icon-text name="star" text="小" size="32rpx" text-size="24rpx" />
  <ui-icon-text name="star" text="中" size="48rpx" text-size="28rpx" />
  <ui-icon-text name="star" text="大" size="64rpx" text-size="32rpx" />
</template>
```

## 自定义颜色

通过 `color` 和 `text-color` 属性自定义颜色。

```vue
<template>
  <ui-icon-text name="heart-fill" text="红色" color="#ee0a24" text-color="#ee0a24" />
  <ui-icon-text name="check-circle-fill" text="绿色" color="#07c160" text-color="#07c160" />
  <ui-icon-text name="info-circle-fill" text="蓝色" color="#1989fa" text-color="#1989fa" />
</template>
```

## 文字在左边

通过 `text-left` 属性将文字放在图标左边。

```vue
<template>
  <ui-icon-text name="arrow-right" text="更多" text-left />
  <ui-icon-text name="arrow-right" text="查看详情" text-left />
</template>
```

## 自定义间距

通过 `text-gap` 属性设置图标和文字的间距。

```vue
<template>
  <ui-icon-text name="location" text="位置" text-gap="8rpx" />
  <ui-icon-text name="location" text="位置" text-gap="16rpx" />
  <ui-icon-text name="location" text="位置" text-gap="24rpx" />
</template>
```

## 使用图片

通过传入图片 URL 替代图标。

```vue
<template>
  <ui-icon-text name="https://example.com/icon.png" text="图片" width="40rpx" height="40rpx" radius="8rpx" />
</template>
```

## Props

| 参数          | 说明                   | 类型               | 默认值        |
| ------------- | ---------------------- | ------------------ | ------------- |
| name          | 图标名称或图片地址     | `string`           | -             |
| size          | 图标大小               | `string \| number` | -             |
| color         | 图标颜色               | `string`           | -             |
| radius        | 图标圆角               | `string \| number` | -             |
| weight        | 图标粗细               | `string`           | -             |
| text          | 文本内容               | `string \| number` | -             |
| text-size     | 文本大小               | `string \| number` | -             |
| text-color    | 文本颜色               | `string`           | -             |
| text-weight   | 文本粗细               | `string`           | -             |
| text-gap      | 文本和图标的间隔       | `string \| number` | -             |
| text-left     | 文本在图标左边         | `boolean`          | `false`       |
| width         | 图标为图片时的宽度     | `string \| number` | -             |
| height        | 图标为图片时的高度     | `string \| number` | -             |
| image-mode    | 图标为图片时的显示模式 | `string`           | `scaleToFill` |
| background    | 背景颜色               | `string`           | -             |
| custom-prefix | 自定义图标名称前缀     | `string`           | `ui-icon`     |
| custom-class  | 自定义类名             | `string`           | -             |
| custom-style  | 自定义样式             | `string \| object` | -             |

## Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | -        |
