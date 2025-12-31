# Image 图片

增强型图片组件，支持多种填充模式、圆形图片、懒加载等功能。

## 基础用法

```vue
<template>
  <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" />
</template>
```

## 填充模式

通过 `mode` 属性设置图片填充模式，与 uni-app 的 image 组件一致。

```vue
<template>
  <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="scaleToFill" />
  <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFit" />
  <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFill" />
  <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="widthFix" />
</template>
```

## 圆形图片

通过 `round` 属性设置图片为圆形。

```vue
<template>
  <ui-image src="https://picsum.photos/200" width="160rpx" height="160rpx" round />
</template>
```

## 圆角图片

通过 `radius` 属性设置圆角大小。

```vue
<template>
  <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" radius="8rpx" />
  <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" radius="16rpx" />
  <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" radius="32rpx" />
</template>
```

## 正方形图片

通过 `square` 属性设置图片为正方形，无论原始图片尺寸如何。

```vue
<template>
  <ui-image src="https://picsum.photos/300/200" width="200rpx" square />
  <ui-image src="https://picsum.photos/200/300" width="200rpx" square />
</template>
```

## 懒加载

通过 `lazy-load` 属性启用懒加载功能，图片会在进入可视区域时才开始加载。

```vue
<template>
  <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" lazy-load />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片资源地址 | `string` | - |
| mode | 图片裁剪、缩放模式 | `string` | `scaleToFill` |
| width | 图片宽度 | `string \| number` | - |
| height | 图片高度 | `string \| number` | - |
| radius | 圆角大小 | `string \| number` | - |
| block | 是否块级元素 | `boolean` | `false` |
| round | 是否圆形 | `boolean` | `false` |
| square | 是否正方形 | `boolean` | `false` |
| lazy-load | 是否懒加载 | `boolean` | `true` |
| fade | 是否显示动画效果 | `boolean` | `true` |
| webp | 是否启用 webp | `boolean` | `false` |
| show-menu-by-longpress | 长按显示菜单 | `boolean` | `false` |
| draggable | 是否可拖动 | `boolean` | `true` |
| background | 背景颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击图片时触发 | `event` |
| load | 图片加载成功时触发 | `event` |
| error | 图片加载失败时触发 | `event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义加载中内容 |
| error | 自定义加载失败内容 |
