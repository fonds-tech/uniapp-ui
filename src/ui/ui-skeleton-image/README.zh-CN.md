# UiSkeletonImage 组件

## 介绍

UiSkeletonImage 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-skeleton-image />
</template>
```

## Props

| 参数        | 说明                 | 类型                                                  | 默认值 | 可选值 |
| ----------- | -------------------- | ----------------------------------------------------- | ------ | ------ |
| size        | 图片占位图大小       | numericProp                                           | -      | -      |
| width       | 图片占位图宽度       | numericProp                                           | -      | -      |
| height      | 图片占位图高度       | numericProp                                           | -      | -      |
| radius      | 图片占位图圆角       | numericProp                                           | -      | -      |
| square      | 图片占位图是否为方形 | boolean                                               | -      | -      |
| customClass | 自定义类名           | string                                                | -      | -      |
| customStyle | 自定义样式           | [String, Object] as PropType<string \| CSSProperties> | -      | -      |
