# UiSkeleton 组件

## 介绍

骨架屏容器。配合 `ui-skeleton-title` / `ui-skeleton-paragraph` / `ui-skeleton-avatar` / `ui-skeleton-image` 使用。`loading=false` 时切换为真实内容（`content` 插槽）。

## 代码演示

```vue
<template>
  <ui-skeleton :loading="loading" gap="24rpx">
    <ui-skeleton-title />
    <ui-skeleton-paragraph :row="3" />
    <template #content>
      <view>真实内容</view>
    </template>
  </ui-skeleton>
</template>
```

## Props

| 参数        | 说明                              | 类型                                                  | 默认值 |
| ----------- | --------------------------------- | ----------------------------------------------------- | ------ |
| loading     | 是否显示骨架屏，false 时切到内容  | Boolean                                               | `true` |
| animate     | 是否开启闪烁动画                  | Boolean                                               | `true` |
| background  | 背景色，支持语义色名 / hex / rgba | String                                                | -      |
| gap         | 子元素间距                        | [Number, String]                                      | -      |
| duration    | 动画时长，如 `1.5s` / `1500ms`    | String                                                | `1.5s` |
| customClass | 自定义类名                        | String                                                | -      |
| customStyle | 自定义样式                        | [String, Object] as PropType<string \| CSSProperties> | -      |

## Slots

| 名称    | 说明                           |
| ------- | ------------------------------ |
| default | 骨架屏占位内容（loading=true） |
| content | 真实内容（loading=false）      |
