# UiDatePanel 组件

## 介绍

`ui-date-panel` 是纯时间面板组件，不包含弹窗头部与确认/取消交互，适合与 `ui-popup`、`ui-picker` 等组件组合使用。

## 代码示例

```vue
<template>
  <ui-date-panel v-model="value" :columns="['year', 'month', 'day', 'hour', 'minute']" @change="handleChange" />
</template>
```

## Props

| 参数               | 说明                      | 类型                                                | 默认值                                 |
| ------------------ | ------------------------- | --------------------------------------------------- | -------------------------------------- |
| modelValue         | 绑定日期                  | `string \| Date \| number`                           | `""`                                   |
| columns            | 列类型                    | `DatePanelColumnType[]`                             | `["year","month","day"]`               |
| minDate            | 最小时间                  | `string \| Date \| number`                           | -                                      |
| maxDate            | 最大时间                  | `string \| Date \| number`                           | -                                      |
| format             | 时间格式                  | `string`                                            | `"YYYY-MM-DD HH:mm:ss"`                |
| columnFilter       | 选项过滤函数              | `DatePanelColumnFilter`                             | -                                      |
| columnFormatter    | 选项格式化函数            | `DatePanelColumnFormatter`                          | `(type, option) => option`             |
| columnHeight       | 选项高度                  | `string \| number`                                   | `"88rpx"`                              |
| visibleColumnNum   | 可见选项个数              | `string \| number`                                   | `5`                                    |
| columnSize         | 选项文字大小              | `string \| number`                                   | -                                      |
| columnColor        | 选项文字颜色              | `string`                                            | -                                      |
| columnWeight       | 选项文字字重              | `string \| number`                                   | -                                      |
| activeColumnSize   | 激活选项文字大小          | `string \| number`                                   | -                                      |
| activeColumnColor  | 激活选项文字颜色          | `string`                                            | -                                      |
| activeColumnWeight | 激活选项文字字重          | `string \| number`                                   | -                                      |
| indicatorClass     | picker-view 选中框类名    | `string`                                            | -                                      |
| maskStyle          | picker-view 蒙层样式      | `string`                                            | -                                      |
| maskTopStyle       | picker-view 上半蒙层样式  | `string`                                            | -                                      |
| maskBottomStyle    | picker-view 下半蒙层样式  | `string`                                            | -                                      |
| maskClass          | picker-view 蒙层类名      | `string`                                            | -                                      |
| immediateChange    | picker-view 即时变更触发  | `boolean`                                           | `true`                                 |
| customClass        | 自定义类名                | `string`                                            | -                                      |
| customStyle        | 自定义样式                | `string \| object`                                   | -                                      |

## Events

| 事件名            | 说明                 | 回调参数                                                                                |
| ----------------- | -------------------- | --------------------------------------------------------------------------------------- |
| change            | 选项变化时触发       | `{ value, selectedValues, selectedIndexes, selectedDateParts }`                        |
| update:modelValue | 值更新时触发         | `value: string`                                                                         |
| pickstart         | 开始滚动选择时触发   | -                                                                                       |
| pickend           | 结束滚动选择时触发   | -                                                                                       |

## Methods

| 方法名               | 说明           | 参数                                      |
| -------------------- | -------------- | ----------------------------------------- |
| getSelectedValue     | 获取格式化值   | -                                         |
| getSelectedValues    | 获取列值数组   | -                                         |
| getSelectedIndexes   | 获取列索引数组 | -                                         |
| getSelectedDateParts | 获取时间拆解值 | -                                         |
| setValue             | 设置当前值     | `value: string \| number \| Date \| null` |
