# SkeletonParagraph 骨架屏段落

骨架屏段落占位组件，需配合 `Skeleton` 使用。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 设置行数

通过 `row` 属性设置段落行数。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-paragraph :row="3" />
  </ui-skeleton>
</template>
```

## 自定义行宽

通过 `row-width` 属性设置每行宽度，可传数组分别设置每行宽度。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-paragraph :row="3" :row-width="['100%', '80%', '60%']" />
  </ui-skeleton>
</template>
```

## Props

| 参数         | 说明                           | 类型                        | 默认值 |
| ------------ | ------------------------------ | --------------------------- | ------ |
| row          | 段落占位图行数                 | `string \| number`          | `1`    |
| row-width    | 段落宽度，可传数组设置每行宽度 | `string \| number \| array` | `100%` |
| custom-class | 自定义类名                     | `string`                    | -      |
| custom-style | 自定义样式                     | `string \| object`          | -      |
