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

## Props

| 参数               | 说明             | 类型               | 默认值         |
| ------------------ | ---------------- | ------------------ | -------------- |
| list               | 数据列表         | `array \| string`  | `[]`           |
| width              | 宽度             | `string \| number` | -              |
| height             | 高度             | `string \| number` | -              |
| radius             | 圆角             | `string \| number` | -              |
| current            | 当前滑块索引     | `number`           | `0`            |
| circular           | 是否循环播放     | `boolean`          | `true`         |
| interval           | 自动切换间隔(ms) | `number`           | `3000`         |
| duration           | 滑动动画时长(ms) | `number`           | `500`          |
| vertical           | 是否垂直滚动     | `boolean`          | `false`        |
| autoplay           | 是否自动播放     | `boolean`          | `true`         |
| disable-touch      | 是否禁止触摸滑动 | `boolean`          | `false`        |
| indicator          | 是否显示指示器   | `boolean`          | `true`         |
| indicator-type     | 指示器类型       | `dot \| number`    | `dot`          |
| indicator-position | 指示器位置       | `string`           | `bottom-right` |
| prev-gap           | 前边距           | `string \| number` | -              |
| next-gap           | 后边距           | `string \| number` | -              |
| image-mode         | 图片裁剪模式     | `string`           | `scaleToFill`  |
| custom-class       | 自定义类名       | `string`           | -              |
| custom-style       | 自定义样式       | `string \| object` | -              |

## Events

| 事件名          | 说明             | 回调参数        |
| --------------- | ---------------- | --------------- |
| click           | 点击轮播项时触发 | `index: number` |
| change          | 轮播切换时触发   | `index: number` |
| transition      | 切换过渡中触发   | `{ x, y }`      |
| animationfinish | 动画结束时触发   | `index: number` |

## Slots

| 名称      | 说明           |
| --------- | -------------- |
| default   | 自定义轮播内容 |
| indicator | 自定义指示器   |


<!-- AUTO-PROPS-SUPPLEMENT: ui-swiper -->
## Swiper Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `easing-function` |
| `field-keys` |
| `for-key` |

