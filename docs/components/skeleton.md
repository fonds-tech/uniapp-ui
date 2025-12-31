# Skeleton 骨架屏

加载中的占位骨架屏组件。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 显示头像

使用 `ui-skeleton-avatar` 组件显示头像占位。

```vue
<template>
  <ui-skeleton>
    <view class="skeleton-row">
      <ui-skeleton-avatar />
      <view class="skeleton-content">
        <ui-skeleton-title />
        <ui-skeleton-paragraph :rows="2" />
      </view>
    </view>
  </ui-skeleton>
</template>
```

## 显示图片

使用 `ui-skeleton-image` 组件显示图片占位。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image />
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 关闭动画

通过 `:animate="false"` 关闭加载动画。

```vue
<template>
  <ui-skeleton :animate="false">
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 自定义背景色

通过 `background` 属性自定义骨架屏背景色。

```vue
<template>
  <ui-skeleton background="#e0e0e0">
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## Skeleton Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| animate | 是否开启动画 | `boolean` | `true` |
| background | 背景颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Skeleton Slots

| 名称 | 说明 |
| --- | --- |
| default | 骨架屏内容 |

## SkeletonTitle Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | `string \| number` | `40%` |
| height | 高度 | `string \| number` | `32rpx` |
| radius | 圆角 | `string \| number` | `8rpx` |

## SkeletonParagraph Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数 | `number` | `3` |
| row-width | 每行宽度 | `string \| number \| array` | `100%` |
| row-height | 行高 | `string \| number` | `28rpx` |
| row-gap | 行间距 | `string \| number` | `16rpx` |

## SkeletonAvatar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 头像大小 | `string \| number` | `64rpx` |
| shape | 头像形状 | `round \| square` | `round` |

## SkeletonImage Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 图片宽度 | `string \| number` | `100%` |
| height | 图片高度 | `string \| number` | `200rpx` |
| radius | 圆角 | `string \| number` | `8rpx` |
