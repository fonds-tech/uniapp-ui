# UiStepper 组件

## 介绍

UiStepper 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-stepper />
</template>
```

## Props

| 参数             | 说明                     | 类型                             | 默认值    | 可选值 |
| ---------------- | ------------------------ | -------------------------------- | --------- | ------ |
| modelValue       | 绑定值                   | number \| string                 | 0         | -      |
| min              | 最小值                   | number \| string                 | 0         | -      |
| max              | 最大值                   | number \| string                 | Infinity  | -      |
| step             | 步长，每次点击时改变的值 | number \| string                 | 1         | -      |
| name             | 标识符                   | number \| string                 | ""        | -      |
| height           | 高度                     | string \| number                 | ""        | -      |
| theme            | 主题样式                 | String as PropType<StepperTheme> | "button"  | -      |
| integer          | 是否只能输入正整数       | boolean                          | false     | -      |
| decimalLength    | 显示的小数位数           | number \| string                 | ""        | -      |
| disabled         | 是否禁用                 | boolean                          | false     | -      |
| disablePlus      | 是否禁用增加按钮         | boolean                          | false     | -      |
| disableMinus     | 是否禁用减少按钮         | boolean                          | false     | -      |
| disabledInput    | 是否禁止输入框           | boolean                          | false     | -      |
| inputGap         | 输入框左右间隙           | string \| number                 | ""        | -      |
| inputWidth       | 输入框宽度               | number \| string                 | ""        | -      |
| inputColor       | 输入框颜色               | string                           | ""        | -      |
| inputTextSize    | 输入框文字大小           | number \| string                 | ""        | -      |
| inputTextWeight  | 输入框文字粗细           | number \| string                 | ""        | -      |
| inputTextColor   | 输入框文字颜色           | string                           | ""        | -      |
| minusWidth       | 减少按钮宽度             | number \| string                 | ""        | -      |
| minusColor       | 减少按钮颜色             | string                           | ""        | -      |
| minusTextSize    | 减少按钮文字大小         | string                           | ""        | -      |
| minusTextColor   | 减少按钮文字颜色         | string                           | "#333333" | -      |
| minusBorderColor | border主题下的边框颜色   | string                           | ""        | -      |
| plusWidth        | 增加按钮宽度             | number \| string                 | ""        | -      |
| plusColor        | 增加按钮颜色             | string                           | ""        | -      |
| plusTextSize     | 增加按钮文字大小         | string                           | ""        | -      |
| plusTextColor    | 增加按钮文字颜色         | string                           | "#333333" | -      |
| plusBorderColor  | border主题下的边框颜色   | string                           | ""        | -      |
| borderColor      | border主题下的边框颜色   | string                           | ""        | -      |
| borderWidth      | border主题下的边框宽度   | string \| number                 | ""        | -      |
| showPlus         | 是否显示增加按钮         | boolean                          | true      | -      |
| showMinus        | 是否显示减少按钮         | boolean                          | true      | -      |
| showInput        | 是否显示输入框           | boolean                          | true      | -      |
| longPress        | 是否允许长按进行加减     | boolean                          | false     | -      |
| beforeChange     | 输入值变化前的回调函数   | Function                         | -         | -      |
| customClass      | 自定义类名               | string                           | ""        | -      |
| customStyle      | 自定义样式               | string \| object                 | ""        | -      |

## Events

| 事件名    | 说明 | 回调参数                                        |
| --------- | ---- | ----------------------------------------------- |
| click     | -    | -                                               |
| blur      | -    | event: any                                      |
| focus     | -    | -                                               |
| plus      | -    | -                                               |
| minus     | -    | -                                               |
| overlimit | -    | type: string                                    |
| change    | -    | value: number \| string, name: number \| string |
| update    | -    | value: number \| string                         |

## Slots

| 名称  | 说明 |
| ----- | ---- |
| minus | -    |
| plus  | -    |
