# UiSkeletonParagraph 组件

## 介绍

UiSkeletonParagraph 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-skeleton-paragraph />
</template>
```

## Props

| 参数        | 说明                                       | 类型                                                           | 默认值 | 可选值 |
| ----------- | ------------------------------------------ | -------------------------------------------------------------- | ------ | ------ |
| row         | 段落占位图行数                             | makeNumericProp(1)                                             | -      | -      |
| rowWidth    | 段落占位图宽度，可传数组来设置每一行的宽度 | [Number, String, Array] as PropType<SkeletonParagraphRowWidth> | "100%" | -      |
| customClass | 自定义类名                                 | string                                                         | -      | -      |
| customStyle | 自定义样式                                 | [String, Object] as PropType<string \| CSSProperties>          | -      | -      |
