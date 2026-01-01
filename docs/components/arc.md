# Arc 弧形

弧形装饰组件，常用于页面顶部装饰。

## 基础用法

```vue
<template>
  <ui-arc background="#1989fa" />
</template>
```

## 自定义高度

通过 `height` 属性设置弧形高度。

```vue
<template>
  <ui-arc height="200rpx" background="#07c160" />
</template>
```

## 自定义弧度

通过 `percent` 属性设置弧度百分比。

```vue
<template>
  <ui-arc height="150rpx" :percent="80" background="#1989fa" />
</template>
```

## 渐变背景

通过 `background` 属性设置渐变背景。

```vue
<template>
  <ui-arc height="180rpx" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
</template>
```

## 组合使用

```vue
<template>
  <ui-arc height="200rpx" :fixed="false" background="#ee0a24">
    <view class="arc-content">
      <text class="arc-title">圆弧装饰</text>
      <text class="arc-desc">可用于页面顶部装饰</text>
    </view>
  </ui-arc>
</template>
```

## Props

| 参数         | 说明           | 类型               | 默认值   |
| ------------ | -------------- | ------------------ | -------- |
| height       | 弧形高度       | `string \| number` | `130rpx` |
| percent      | 圆弧弧度百分比 | `string \| number` | `120`    |
| background   | 背景色         | `string`           | -        |
| top          | 顶部位置       | `string \| number` | -        |
| left         | 左边位置       | `string \| number` | -        |
| fixed        | 是否固定定位   | `boolean`          | `true`   |
| z-index      | 元素层级       | `string \| number` | -        |
| custom-class | 自定义类名     | `string`           | -        |
| custom-style | 自定义样式     | `string \| object` | -        |

## Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | -        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 弧形内容 |
