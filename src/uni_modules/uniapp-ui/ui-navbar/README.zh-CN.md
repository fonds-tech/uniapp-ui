# Navbar 导航栏

## 介绍

自定义导航栏,用于替代原生导航栏。它提供了丰富的自定义选项,包括标题、返回按钮、自定义左右内容等。该组件支持固定顶部、沉浸式效果、渐变背景等特性,并且能够自适应不同平台(如小程序中的胶囊按钮)。Navbar 组件还提供了事件监听和尺寸计算功能,方便开发者进行更复杂的定制。

## 代码演示

```vue
<template>
  <ui-navbar
    title="页面标题"
    :is-back="true"
    @back="onBack"
  >
    <template #right>
      <view>右侧内容</view>
    </template>
  </ui-navbar>
</template>

<script setup>
function onBack() {
  console.log("点击了返回")
}
</script>
```

## Props

| 参数           | 说明             | 类型             | 默认值       | 可选值 |
| -------------- | ---------------- | ---------------- | ------------ | ------ |
| title          | 标题文字         | string           | -            | -      |
| fixed          | 是否固定顶部     | boolean          | false        | -      |
| placeholder    | 是否生成占位元素 | boolean          | false        | -      |
| isBack         | 是否显示返回按钮 | boolean          | false        | -      |
| backText       | 返回按钮文字     | string           | -            | -      |
| backIconName   | 返回图标名称     | string           | 'arrow-left' | -      |
| backIconColor  | 返回图标颜色     | string           | -            | -      |
| backIconSize   | 返回图标大小     | string \| number | -            | -      |
| titleCenter    | 标题是否居中     | boolean          | true         | -      |
| titleWidth     | 标题宽度         | string \| number | '400rpx'     | -      |
| titleColor     | 标题颜色         | string           | -            | -      |
| titleSize      | 标题字体大小     | string \| number | -            | -      |
| titleWeight    | 标题字体粗细     | string \| number | -            | -      |
| background     | 背景颜色         | string           | -            | -      |
| borderBottom   | 是否显示底部边框 | boolean          | false        | -      |
| zIndex         | z-index 层级     | number           | 100          | -      |
| customStyle    | 自定义样式       | object           | {}           | -      |
| customClass    | 自定义类名       | string           | -            | -      |
| height         | 导航栏高度       | string \| number | -            | -      |
| immersive      | 是否开启沉浸式   | boolean          | false        | -      |
| customBack     | 自定义返回方法   | Function         | -            | -      |
| gradient       | 是否启用渐变效果 | boolean          | false        | -      |
| gradientHeight | 渐变高度         | string \| number | '400rpx'     | -      |
| customClass    | 自定义类名       | string           | -            | -      |
| customStyle    | 自定义样式       | string \| object | -            | -      |

## Events

| 事件名   | 说明           | 回调参数              |
| -------- | -------------- | --------------------- |
| rect     | 导航栏尺寸信息 | rect: UniApp.NodeInfo |
| height   | 导航栏高度     | height: number        |
| gradient | 渐变滚动事件   | scrollTop: number     |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| left    | 自定义左侧内容 |
| default | 自定义标题内容 |
| title   | 自定义标题     |
| right   | 自定义右侧内容 |
| back    | 自定义返回内容 |

## Methods

| 方法名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| resize | 重新计算尺寸 | -    |

## 注意事项

1. 该组件会自动适配不同平台,如在小程序中会考虑胶囊按钮的位置。
2. 使用 `gradient` 属性时,需要配合页面滚动事件来实现渐变效果。
3. `customBack` 属性允许自定义返回逻辑,如果未设置,则会根据页面栈自动判断返回首页或上一页。
4. 组件内部使用了 `mitt` 进行事件管理,可以通过事件监听获取导航栏的尺寸信息。
