# UiFormItem 组件

## 介绍

UiFormItem 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-form-item />
</template>
```

## Props

| 参数               | 说明                                                                     | 类型                                                                      | 默认值    | 可选值 |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- | --------- | ------ |
| prop               | model的键名                                                              | string                                                                    | -         | -      |
| label              | 标签文本                                                                 | string                                                                    | -         | -      |
| colon              | 是否在标签文字后面添加冒号                                               | boolean                                                                   | -         | -      |
| border             | 是否显示边框                                                             | boolean                                                                   | undefined | -      |
| borderColor        | 边框颜色                                                                 | string                                                                    | -         | -      |
| required           | 是否为必填项，会显示标签文字右侧\*号                                     | boolean                                                                   | -         | -      |
| padding            | 内边距                                                                   | [Number, String]                                                          | -         | -      |
| labelGap           | 表单域标签文字和内容的间隔                                               | [Number, String]                                                          | -         | -      |
| labelSize          | 表单域标签文字大小                                                       | [Number, String]                                                          | -         | -      |
| labelColor         | 表单域标签文字颜色                                                       | string                                                                    | -         | -      |
| labelWidth         | 表单域标签文字宽度                                                       | [Number, String]                                                          | -         | -      |
| labelWeight        | 表单域标签文字字重                                                       | [Number, String]                                                          | -         | -      |
| labelLineHeight    | 表单域标签文字行高                                                       | [Number, String]                                                          | -         | -      |
| labelAlign         | 表单域标签对齐方式                                                       | String as PropType<FormItemLabelAlign>                                    | -         | -      |
| labelPosition      | 表单域标签文字位置，可选值为 left right top                              | String as PropType<FormLabelPosition>                                     | -         | -      |
| contentAlign       | 输入内容对齐方式，可选值为 left center right                             | String as PropType<FormItemContentAlign>                                  | -         | -      |
| errorMessage       | 校验错误信息文字                                                         | string                                                                    | -         | -      |
| errorMessageSize   | 校验错误信息文字大小                                                     | [Number, String]                                                          | -         | -      |
| errorMessageColor  | 校验错误信息文字颜色                                                     | makeStringProp("error")                                                   | -         | -      |
| errorMessageWeight | 校验错误信息文字字重                                                     | [Number, String]                                                          | -         | -      |
| errorMessageAlign  | 校验错误信息文字对齐方式，可选值为 left center right                     | String as PropType<FormErrorMessageAlign>                                 | ""        | -      |
| showErrorMessage   | 是否在校验不通过时在输入框下方展示错误提示                               | truthProp                                                                 | -         | -      |
| validateTrigger    | 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值 | [String, Array] as PropType<FormValidateTrigger \| FormValidateTrigger[]> | "blur"    | -      |
| customClass        | 自定义类名                                                               | string                                                                    | ""        | -      |
| customStyle        | 自定义样式                                                               | string \| object                                                          | ""        | -      |

## Events

| 事件名 | 说明 | 回调参数                                                                 |
| ------ | ---- | ------------------------------------------------------------------------ |
| submit | -    | values: Record<string, unknown>                                          |
| failed | -    | result: { values: Record<string, unknown>; errors: FormValidateError[] } |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| error   | -    |
| label   | -    |

## Methods

| 方法名        | 说明 | 参数 |
| ------------- | ---- | ---- |
| labelPosition | -    | -    |
| modelValue    | -    | -    |
| prop          | -    | -    |
