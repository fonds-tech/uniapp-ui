# Badge 徽标

## 介绍

用于在指定内容右上角展示徽标数字或小红点的组件。它可以应用于各种元素,如图标、按钮或文本,用于显示新消息数量、未读通知等信息。

## 代码演示

```vue
<template>
  <ui-badge :value="5" color="#ff4d4f">
    <view>消息</view>
  </ui-badge>

  <ui-badge dot color="#52c41a">
    <view>通知</view>
  </ui-badge>

  <ui-badge :value="99" :max="99">
    <view>评论</view>
  </ui-badge>
</template>
```

## Props

| 参数         | 说明                                                               | 类型               | 默认值      | 可选值                                    |
| ------------ | ------------------------------------------------------------------ | ------------------ | ----------- | ----------------------------------------- |
| value        | 显示的内容                                                         | `string \| number` | -           | -                                         |
| dot          | 是否显示为小圆点                                                   | `boolean`          | `false`     | -                                         |
| max          | 最大值,超过最大值会显示 '{max}+'                                   | `number`           | -           | -                                         |
| show-zero    | 当数值为 0 时是否显示徽章                                          | `boolean`          | `false`     | -                                         |
| color        | 徽章背景颜色                                                       | `string`           | `#ee0b24`   | -                                         |
| value-color  | 徽章内容颜色                                                       | `string`           | `#ffffff`   | -                                         |
| value-size   | 徽章内容大小                                                       | `string \| number` | `24rpx`     | -                                         |
| value-weight | 徽章内容粗细                                                       | `string \| number` | `normal`    | -                                         |
| offset       | 设置徽标的偏移量，数组的两项分别对应水平向右和垂直向下方向的偏移量 | `number[]`         | -           | -                                         |
| position     | 徽章位置                                                           | `string`           | `top-right` | `top-left`, `bottom-left`, `bottom-right` |
| z-index      | 徽章层级                                                           | `number`           | -           | -                                         |
| custom-class | 自定义类名                                                         | `string`           | -           | -                                         |
| custom-style | 自定义样式                                                         | `string \| object` | -           | -                                         |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击徽章时触发 | -        |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 徽章包裹的内容     |
| content | 自定义徽章显示内容 |
