# UiTabs 组件

## 介绍

UiTabs 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-tabs />
</template>
```

## Props

| 参数           | 说明                         | 类型                                                  | 默认值 | 可选值 |
| -------------- | ---------------------------- | ----------------------------------------------------- | ------ | ------ |
| modelValue     | 绑定值                       | makeNumericProp(0)                                    | -      | -      |
| height         | 高度                         | [Number, String]                                      | -      | -      |
| scrollable     | 是否可以滚动                 | truthProp                                             | -      | -      |
| activeSize     | 激活文字大小                 | [Number, String]                                      | -      | -      |
| activeColor    | 激活文字颜色                 | string                                                | -      | -      |
| activeWeight   | 激活文字粗细                 | [Number, String]                                      | -      | -      |
| inactiveSize   | 未激活文字大小               | [Number, String]                                      | -      | -      |
| inactiveColor  | 未激活文字颜色               | string                                                | -      | -      |
| inactiveWeight | 未激活文字粗细               | [Number, String]                                      | -      | -      |
| lineColor      | 激活线条颜色                 | string                                                | -      | -      |
| lineWidth      | 激活线条宽度                 | makeNumericProp("40rpx")                              | -      | -      |
| lineHeight     | 激活线条高度                 | [Number, String]                                      | -      | -      |
| lineRadius     | 激活线条圆角                 | [Number, String]                                      | -      | -      |
| showLine       | 是否显示线条                 | truthProp                                             | -      | -      |
| tabWidth       | 宽度                         | [Number, String]                                      | -      | -      |
| tabMaxWidth    | 最大宽度                     | [Number, String]                                      | -      | -      |
| background     | 背景颜色                     | string                                                | -      | -      |
| duration       | 激活线条动画过渡时间，单位ms | makeNumericProp(300)                                  | -      | -      |
| borderBottom   | 是否显示底部边框线           | boolean                                               | -      | -      |
| zIndex         | 元素层级                     | [Number, String]                                      | -      | -      |
| customClass    | 自定义类名                   | string                                                | -      | -      |
| customStyle    | 自定义样式                   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名   | 说明 | 回调参数               |
| -------- | ---- | ---------------------- |
| change   | -    | name: string \| number |
| clickTab | -    | name: string \| number |
| update   | -    | name: string \| number |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
