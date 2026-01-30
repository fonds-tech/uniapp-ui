# UiSkeletonAvatar 组件

## 介绍

UiSkeletonAvatar 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-skeleton-avatar />
</template>
```

## Props

| 参数        | 说明                            | 类型                                                  | 默认值 | 可选值 |
| ----------- | ------------------------------- | ----------------------------------------------------- | ------ | ------ |
| size        | 头像占位图大小                  | [Number, String]                                           | -      | -      |
| shape       | 头像占位图形状，可选值为 square | makeNumericProp<SkeletonAvatarShapte>("round")        | -      | -      |
| customClass | 自定义类名                      | string                                                | -      | -      |
| customStyle | 自定义样式                      | [String, Object] as PropType<string \| CSSProperties> | -      | -      |
