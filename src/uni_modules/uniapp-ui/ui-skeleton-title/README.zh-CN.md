# UiSkeletonTitle 组件

## 介绍

标题占位骨架。须放在 `ui-skeleton` 内。父级 `animate` 控制闪烁动画。

## 代码演示

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title width="60%" />
  </ui-skeleton>
</template>
```

## Props

| 参数        | 说明       | 类型                                                  | 默认值  |
| ----------- | ---------- | ----------------------------------------------------- | ------- |
| width       | 宽度       | [Number, String]                                      | `100%`  |
| height      | 高度       | [Number, String]                                      | `32rpx` |
| radius      | 圆角       | [Number, String]                                      | `8rpx`  |
| customClass | 自定义类名 | String                                                | -       |
| customStyle | 自定义样式 | [String, Object] as PropType<string \| CSSProperties> | -       |
