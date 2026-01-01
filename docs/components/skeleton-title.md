# SkeletonTitle 骨架屏标题

骨架屏标题占位组件，需配合 `Skeleton` 使用。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title />
  </ui-skeleton>
</template>
```

## 自定义尺寸

通过 `width` 和 `height` 属性设置尺寸。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title width="200rpx" height="40rpx" />
  </ui-skeleton>
</template>
```

## 自定义圆角

通过 `radius` 属性设置圆角。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title radius="8rpx" />
  </ui-skeleton>
</template>
```

## Props

| 参数         | 说明           | 类型               | 默认值 |
| ------------ | -------------- | ------------------ | ------ |
| width        | 标题占位图宽度 | `string \| number` | -      |
| height       | 标题占位图高度 | `string \| number` | -      |
| radius       | 标题占位图圆角 | `string \| number` | -      |
| custom-class | 自定义类名     | `string`           | -      |
| custom-style | 自定义样式     | `string \| object` | -      |
