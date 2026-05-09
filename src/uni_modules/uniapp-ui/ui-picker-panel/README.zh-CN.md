# UiPickerPanel 组件

## 介绍

UiPickerPanel 纯面板选择器组件,不包含头部交互控制,适合嵌入式使用场景。属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-picker-panel v-model="value" :columns="columns" @change="onChange" />
</template>
```

## Props

| 参数               | 说明                      | 类型                                            | 默认值                                                         | 可选值 |
| ------------------ | ------------------------- | ----------------------------------------------- | -------------------------------------------------------------- | ------ |
| modelValue         | 绑定值                    | Array as PropType<(number \| string)[]>         | () => []                                                       | -      |
| columns            | 列数据                    | Array as PropType<PickerColumn[]>               | () => []                                                       | -      |
| loading            | 是否显示加载中            | boolean                                         | false                                                          | -      |
| columnFields       | 自定义columns结构中的字段 | Object as PropType<Partial<PickerColumnFields>> | () => ({ text: "text", value: "value", children: "children" }) | -      |
| columnHeight       | 选项高度                  | string \| number                                | -                                                              | -      |
| visibleColumnNum   | 可见的选项个数            | string \| number                                | 5                                                              | -      |
| columnSize         | 选项文字大小              | string \| number                                | -                                                              | -      |
| columnColor        | 选项文字颜色              | string                                          | -                                                              | -      |
| columnWeight       | 选项文字字重              | string \| number                                | -                                                              | -      |
| activeColumnSize   | 激活选项文字大小          | string \| number                                | -                                                              | -      |
| activeColumnColor  | 激活选项文字颜色          | string                                          | -                                                              | -      |
| activeColumnWeight | 激活选项文字字重          | string \| number                                | -                                                              | -      |
| customClass        | 自定义类名                | string                                          | ""                                                             | -      |
| customStyle        | 自定义样式                | string \| object                                | ""                                                             | -      |

## Events

| 事件名            | 说明           | 回调参数                                                                                                      |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| change            | 选项变化时触发 | data: { values: PickerValue[]; value: PickerValue; indexs: number[]; index: number; columns: PickerColumn[] } |
| update:modelValue | 值更新时触发   | value: PickerValue[]                                                                                          |

## Slots

无

## Methods

通过 ref 调用:

| 方法名             | 说明             | 参数                                   |
| ------------------ | ---------------- | -------------------------------------- |
| getSelectedValues  | 获取当前选中值   | -                                      |
| getSelectedIndexs  | 获取当前选中索引 | -                                      |
| getSelectedColumns | 获取选中列项     | -                                      |
| getColumns         | 获取标准化列     | -                                      |
| setColumnValue     | 设置某列值       | index: number, value: string \| number |

## CSS 变量

| 变量名                                | 默认值                  | 说明         |
| ------------------------------------- | ----------------------- | ------------ |
| --ui-picker-panel-loading-bg          | rgba(255, 255, 255, .6) | 加载遮罩背景 |
| --ui-picker-panel-transition-duration | 0.15s                   | 选项过渡时长 |
