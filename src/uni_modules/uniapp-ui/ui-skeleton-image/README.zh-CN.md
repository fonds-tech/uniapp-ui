# UiSkeletonImage 组件

## 介绍

图片占位骨架。须放在 `ui-skeleton` 内。父级 `animate` 控制闪烁动画。

## 代码演示

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image width="320rpx" height="180rpx" />
    <ui-skeleton-image square width="200rpx" />
  </ui-skeleton>
</template>
```

## Props

`size` 是 `width` / `height` 的快捷设置，`width` / `height` 优先级更高。`square=true` 时未显式传 `height` 由 `aspect-ratio: 1` 撑出正方形；显式传 `height` 仍生效。

| 参数        | 说明                          | 类型                                                  | 默认值  |
| ----------- | ----------------------------- | ----------------------------------------------------- | ------- |
| size        | 占位尺寸（同时设宽高的快捷）  | [Number, String]                                      | `96rpx` |
| width       | 宽度                          | [Number, String]                                      | -       |
| height      | 高度                          | [Number, String]                                      | -       |
| radius      | 圆角                          | [Number, String]                                      | `16rpx` |
| square      | 强制正方形（aspect-ratio: 1） | Boolean                                               | `false` |
| customClass | 自定义类名                    | String                                                | -       |
| customStyle | 自定义样式                    | [String, Object] as PropType<string \| CSSProperties> | -       |
