# Swiper 轮播

轮播图组件，支持水平和垂直滚动。

## 基础用法

```vue
<template>
  <ui-swiper :list="images" height="300rpx" />
</template>

<script setup>
const images = ["https://picsum.photos/750/300?random=1", "https://picsum.photos/750/300?random=2", "https://picsum.photos/750/300?random=3"]
</script>
```

## 数字指示器

通过 `indicator-type="number"` 使用数字指示器。

```vue
<template>
  <ui-swiper :list="images" height="300rpx" indicator-type="number" />
</template>
```

## 指示器位置

通过 `indicator-position` 属性设置指示器位置。

```vue
<template>
  <ui-swiper :list="images" height="300rpx" indicator-position="bottom" />
</template>
```

## 垂直滚动

通过 `vertical` 属性开启垂直滚动。

```vue
<template>
  <ui-swiper :list="images" height="300rpx" vertical indicator-position="right" />
</template>
```

## 关闭自动播放

通过 `:autoplay="false"` 关闭自动播放。

```vue
<template>
  <ui-swiper :list="images" height="300rpx" :autoplay="false" />
</template>
```

## 自定义间隔

通过 `interval` 属性设置自动播放间隔（单位：毫秒）。

```vue
<template>
  <ui-swiper :list="images" height="300rpx" :interval="5000" />
</template>
```
