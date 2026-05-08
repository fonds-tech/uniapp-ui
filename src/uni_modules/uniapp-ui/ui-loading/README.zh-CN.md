# UiLoading 组件

## 介绍

UiLoading 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-loading />
  <ui-loading type="spinner" />
  <ui-loading text="加载中..." />
  <ui-loading text="加载中..." vertical />
</template>
```

## Props

| 参数        | 说明           | 类型                      | 默认值     |
| ----------- | -------------- | ------------------------- | ---------- |
| show        | 是否显示       | `boolean`                 | `true`     |
| type        | 类型           | `"circular" \| "spinner"` | `circular` |
| size        | 图标大小       | `string \| number`        | `32rpx`    |
| color       | 图标颜色       | `string`                  | -          |
| text        | 文本内容       | `string`                  | -          |
| textGap     | 文本与图标间距 | `string \| number`        | `12rpx`    |
| textSize    | 文本字号       | `string \| number`        | -          |
| textColor   | 文本颜色       | `string`                  | -          |
| textWeight  | 文本粗细       | `string \| number`        | -          |
| vertical    | 垂直布局       | `boolean`                 | `false`    |
| customClass | 自定义类名     | `string`                  | -          |
| customStyle | 自定义样式     | `string \| CSSProperties` | -          |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义文本内容 |
| icon    | 自定义加载图标 |

## CSS 变量

| 变量名                     | 默认值                          |
| -------------------------- | ------------------------------- |
| `--ui-loading-color`       | `var(--ui-color-text-tertiary)` |
| `--ui-loading-size`        | `32rpx`                         |
| `--ui-loading-text-gap`    | `12rpx`                         |
| `--ui-loading-text-size`   | `inherit`                       |
| `--ui-loading-text-color`  | `inherit`                       |
| `--ui-loading-text-weight` | `inherit`                       |
