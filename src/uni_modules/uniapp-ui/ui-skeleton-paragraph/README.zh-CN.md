# UiSkeletonParagraph 组件

## 介绍

段落占位骨架。须放在 `ui-skeleton` 内。父级 `animate` 控制闪烁动画。

## 代码演示

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-paragraph :row="4" :row-width="['100%', '80%', '60%', '40%']" />
  </ui-skeleton>
</template>
```

## Props

`rowWidth` 传数组时按索引取宽度；**数组长度不足时循环取模**。`row` 非整数会向下取整，负数/NaN 当作 0。

| 参数        | 说明                         | 类型                                                           | 默认值   |
| ----------- | ---------------------------- | -------------------------------------------------------------- | -------- |
| row         | 段落行数（自动取整，下限 0） | [Number, String]                                               | `3`      |
| rowWidth    | 行宽度，可传数组按行设置     | [Number, String, Array] as PropType<SkeletonParagraphRowWidth> | `"100%"` |
| rowHeight   | 行高                         | [Number, String]                                               | `32rpx`  |
| rowGap      | 行间距                       | [Number, String]                                               | `24rpx`  |
| customClass | 自定义类名                   | String                                                         | -        |
| customStyle | 自定义样式                   | [String, Object] as PropType<string \| CSSProperties>          | -        |
