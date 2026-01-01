# SkeletonAvatar 骨架屏头像

骨架屏头像占位组件，需配合 `Skeleton` 使用。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-avatar />
  </ui-skeleton>
</template>
```

## 自定义尺寸

通过 `size` 属性设置头像大小。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-avatar size="80rpx" />
  </ui-skeleton>
</template>
```

## 方形头像

设置 `shape="square"` 显示方形头像。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-avatar shape="square" />
  </ui-skeleton>
</template>
```

## Props

| 参数         | 说明           | 类型               | 默认值  |
| ------------ | -------------- | ------------------ | ------- |
| size         | 头像占位图大小 | `string \| number` | -       |
| shape        | 头像形状       | `round \| square`  | `round` |
| custom-class | 自定义类名     | `string`           | -       |
| custom-style | 自定义样式     | `string \| object` | -       |
