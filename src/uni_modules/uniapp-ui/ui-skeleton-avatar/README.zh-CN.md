# UiSkeletonAvatar 组件

## 介绍

头像占位骨架。须放在 `ui-skeleton` 内。父级 `animate` 控制闪烁动画。

## 代码演示

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-avatar shape="round" />
    <ui-skeleton-avatar shape="square" size="120rpx" />
  </ui-skeleton>
</template>
```

## Props

| 参数        | 说明                                   | 类型                                                  | 默认值  |
| ----------- | -------------------------------------- | ----------------------------------------------------- | ------- |
| size        | 占位尺寸                               | [Number, String]                                      | `96rpx` |
| shape       | 形状：`round` 圆形 / `square` 方形圆角 | String                                                | `round` |
| customClass | 自定义类名                             | String                                                | -       |
| customStyle | 自定义样式                             | [String, Object] as PropType<string \| CSSProperties> | -       |
