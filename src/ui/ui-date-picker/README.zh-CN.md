# UiDatePicker 组件

## 介绍

UiDatePicker 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-date-time-picker />
</template>
```

## Props

| 参数             | 说明           | 类型                                            | 默认值                                                     | 可选值 |
| ---------------- | -------------- | ----------------------------------------------- | ---------------------------------------------------------- | ------ |
| modelValue       | 绑定日期       | string \| Date \| number                        | ""                                                         | -      |
| title            | 标题           | string                                          | ""                                                         | -      |
| columns          | 列类型         | Array as PropType<DatePickerColumnType[]>       | () => ["year", "month", "day", "hour", "minute", "second"] | -      |
| minDate          | 最小时间       | string \| Date \| number                        | new Date(new Date().getFullYear() - 10, 0, 1)              | -      |
| maxDate          | 最大时间       | string \| Date \| number                        | new Date(new Date().getFullYear() + 10, 11, 31)            | -      |
| cancelText       | 取消文字       | string                                          | "取消"                                                     | -      |
| confirmText      | 确认文字       | string                                          | "确认"                                                     | -      |
| showHeader       | 是否显示顶部栏 | boolean                                         | true                                                       | -      |
| format           | 时间格式       | string                                          | "YYYY-MM-DD HH:mm:ss"                                      | -      |
| columnFilter     | 选项过滤函数   | Function as PropType<DatePickerColumnFilter>    | -                                                          | -      |
| columnFormatter  | 选项格式化函数 | Function as PropType<DatePickerColumnFormatter> | (type: string, option: DatePickerOption) => option         | -      |
| columnHeight     | 选项高度       | string \| number                                | "88rpx"                                                    | -      |
| visibleColumnNum | 可见的选项个数 | string \| number                                | 5                                                          | -      |
| customClass      | 自定义类名     | string                                          | ""                                                         | -      |
| customStyle      | 自定义样式     | string \| object                                | ""                                                         | -      |

## Events

| 事件名  | 说明 | 回调参数                                                                     |
| ------- | ---- | ---------------------------------------------------------------------------- |
| cancel  | -    | data: { value: string; selectedValues: string[]; selectedIndexes: number[] } |
| change  | -    | data: { value: string; selectedValues: string[]; selectedIndexes: number[] } |
| confirm | -    | data: { value: string; selectedValues: string[]; selectedIndexes: number[] } |
| update  | -    | value: string                                                                |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| cancel  | -    |
| confirm | -    |
| header  | -    |
| title   | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
