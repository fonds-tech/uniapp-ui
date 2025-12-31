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
