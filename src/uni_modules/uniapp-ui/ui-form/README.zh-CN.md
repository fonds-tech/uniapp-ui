# UiForm 组件

## 介绍

UiForm 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-form />
</template>
```

## Props

| 参数               | 说明                                                                     | 类型                                                                      | 默认值     | 可选值 |
| ------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ---------- | ------ |
| model              | 表单数据对象                                                             | object                                                                    | () => ({}) | -      |
| rules              | 表单验证规则                                                             | Object as PropType<FormRules>                                             | () => ({}) | -      |
| colon              | 是否在标签文字后面添加冒号                                               | boolean                                                                   | -          | -      |
| border             | 是否显示边框                                                             | boolean                                                                   | -          | -      |
| borderColor        | 边框颜色                                                                 | makeStringProp("#F6F6F6")                                                 | -          | -      |
| required           | 是否为必填项，会显示标签文字右侧\*号                                     | boolean                                                                   | -          | -      |
| disabled           | 是否禁用表单                                                             | boolean                                                                   | -          | -      |
| readonly           | 是否只读状态                                                             | boolean                                                                   | -          | -      |
| labelGap           | 表单域标签文字和内容的间隔                                               | numericProp                                                               | -          | -      |
| labelSize          | 表单域标签文字大小                                                       | numericProp                                                               | -          | -      |
| labelColor         | 表单域标签文字颜色                                                       | string                                                                    | -          | -      |
| labelWeight        | 表单域标签文字字重                                                       | numericProp                                                               | -          | -      |
| labelWidth         | 表单域标签文字宽度                                                       | makeNumericProp("auto")                                                   | -          | -      |
| labelLineHeight    | 表单域标签文字行高                                                       | numericProp                                                               | -          | -      |
| labelPosition      | 表单域标签文字位置，可选值为 left right top                              | makeStringProp<FormLabelPosition>("left")                                 | -          | -      |
| contentAlign       | 输入内容对齐方式，可选值为 left center right                             | makeStringProp<FormContentAlign>("left")                                  | -          | -      |
| errorMessageSize   | 校验错误信息文字大小                                                     | numericProp                                                               | -          | -      |
| errorMessageColor  | 校验错误信息文字颜色                                                     | string                                                                    | -          | -      |
| errorMessageWeight | 校验错误信息文字字重                                                     | numericProp                                                               | -          | -      |
| errorMessageAlign  | 校验错误信息文字对齐方式，可选值为 left center right                     | makeStringProp<FormErrorMessageAlign>("left")                             | -          | -      |
| showErrorMessage   | 是否在校验不通过时在输入框下方展示错误提示                               | truthProp                                                                 | -          | -      |
| validateFirst      | 是否在某一项校验不通过时停止校验                                         | boolean                                                                   | -          | -      |
| validateTrigger    | 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值 | [String, Array] as PropType<FormValidateTrigger \| FormValidateTrigger[]> | "blur"     | -      |
| customClass        | 自定义类名                                                               | string                                                                    | -          | -      |
| customStyle        | 自定义样式                                                               | [String, Object] as PropType<string \| CSSProperties>                     | -          | -      |

## Events

| 事件名 | 说明 | 回调参数                                                                 |
| ------ | ---- | ------------------------------------------------------------------------ |
| submit | -    | values: Record<string, unknown>                                          |
| failed | -    | result: { values: Record<string, unknown>; errors: FormValidateError[] } |
| update | -    | values: Record<string, unknown>                                          |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
