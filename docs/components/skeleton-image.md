# SkeletonImage 骨架屏图片

骨架屏图片占位组件，需配合 `Skeleton` 使用。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image />
  </ui-skeleton>
</template>
```

## 自定义尺寸

通过 `size` 属性统一设置宽高，或分别设置 `width` 和 `height`。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image size="200rpx" />
  </ui-skeleton>

  <ui-skeleton>
    <ui-skeleton-image width="300rpx" height="200rpx" />
  </ui-skeleton>
</template>
```

## 方形图片

设置 `square` 属性显示方形图片。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image square />
  </ui-skeleton>
</template>
```

## 自定义圆角

通过 `radius` 属性设置圆角。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image radius="16rpx" />
  </ui-skeleton>
</template>
```

## Props

| 参数         | 说明           | 类型               | 默认值  |
| ------------ | -------------- | ------------------ | ------- |
| size         | 图片占位图大小 | `string \| number` | -       |
| width        | 图片占位图宽度 | `string \| number` | -       |
| height       | 图片占位图高度 | `string \| number` | -       |
| radius       | 图片占位图圆角 | `string \| number` | -       |
| square       | 是否为方形     | `boolean`          | `false` |
| custom-class | 自定义类名     | `string`           | -       |
| custom-style | 自定义样式     | `string \| object` | -       |
