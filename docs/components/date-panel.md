# DatePanel 日期面板

`ui-date-panel` 是纯面板形态的日期时间选择器，不包含弹出层和头部按钮，适合与 `ui-popup`、`ui-card`、表单容器等组合使用。

## 基础用法

```vue
<template>
  <ui-date-panel v-model="value" />
</template>

<script setup>
import { ref } from "vue"

const value = ref("")
</script>
```

## 选择年月

通过 `columns` 和 `format` 自定义选择维度和输出格式。

```vue
<template>
  <ui-date-panel v-model="value" :columns="['year', 'month']" format="YYYY-MM" />
</template>
```

## 选择时间

```vue
<template>
  <ui-date-panel v-model="value" :columns="['hour', 'minute']" format="HH:mm" />
</template>
```

## 完整日期时间

```vue
<template>
  <ui-date-panel v-model="value" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
</template>
```

## 限制可选范围

通过 `min-date` 和 `max-date` 限制可选区间。

```vue
<template>
  <ui-date-panel v-model="value" :min-date="minDate" :max-date="maxDate" />
</template>

<script setup>
const minDate = "2024-01-01"
const maxDate = "2025-12-31"
</script>
```

## 自定义选项文案

通过 `column-formatter` 自定义每一列的显示文本。

```vue
<template>
  <ui-date-panel v-model="value" :columns="['year', 'month', 'day']" format="YYYY-MM-DD" :column-formatter="columnFormatter" />
</template>

<script setup>
function columnFormatter(type, option) {
  const suffixMap = {
    year: "年",
    month: "月",
    day: "日",
    hour: "时",
    minute: "分",
    second: "秒",
  }

  return {
    ...option,
    text: `${option.text}${suffixMap[type]}`,
  }
}
</script>
```

## Props

| 参数                   | 说明                         | 类型                                                               | 默认值                     |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------ | -------------------------- |
| `v-model`              | 绑定日期值                   | `string \| Date \| number`                                         | `""`                       |
| `columns`              | 列类型                       | `('year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second')[]` | `['year', 'month', 'day']` |
| `format`               | 输出格式                     | `string`                                                           | `YYYY-MM-DD HH:mm:ss`      |
| `min-date`             | 最小时间                     | `string \| Date \| number`                                         | 当前时间前 10 年           |
| `max-date`             | 最大时间                     | `string \| Date \| number`                                         | 当前时间后 10 年           |
| `column-filter`        | 选项过滤函数                 | `(type, options, selectedValues?) => options`                      | -                          |
| `column-formatter`     | 选项格式化函数               | `(type, option) => option`                                         | `(type, option) => option` |
| `column-height`        | 选项高度                     | `string \| number`                                                 | `88rpx`                    |
| `visible-column-num`   | 可见选项个数                 | `string \| number`                                                 | `5`                        |
| `column-size`          | 选项文字大小                 | `string \| number`                                                 | -                          |
| `column-color`         | 选项文字颜色                 | `string`                                                           | -                          |
| `column-weight`        | 选项文字字重                 | `string \| number`                                                 | -                          |
| `active-column-size`   | 激活选项文字大小             | `string \| number`                                                 | -                          |
| `active-column-color`  | 激活选项文字颜色             | `string`                                                           | -                          |
| `active-column-weight` | 激活选项文字字重             | `string \| number`                                                 | -                          |
| `indicator-class`      | picker-view 选中框类名       | `string`                                                           | -                          |
| `mask-style`           | picker-view 蒙层样式         | `string`                                                           | -                          |
| `mask-top-style`       | picker-view 上半蒙层样式     | `string`                                                           | -                          |
| `mask-bottom-style`    | picker-view 下半蒙层样式     | `string`                                                           | -                          |
| `mask-class`           | picker-view 蒙层类名         | `string`                                                           | -                          |
| `immediate-change`     | 是否在滚动结束时立即触发变更 | `boolean`                                                          | `true`                     |
| `custom-class`         | 自定义类名                   | `string`                                                           | -                          |
| `custom-style`         | 自定义样式                   | `string \| object`                                                 | -                          |

## Events

| 事件名              | 说明               | 回调参数                                                        |
| ------------------- | ------------------ | --------------------------------------------------------------- |
| `change`            | 选项变化时触发     | `{ value, selectedValues, selectedIndexes, selectedDateParts }` |
| `update:modelValue` | 值更新时触发       | `value: string`                                                 |
| `pickstart`         | 开始滚动选择时触发 | -                                                               |
| `pickend`           | 结束滚动选择时触发 | -                                                               |

## Methods

通过 `ref` 调用组件方法：

| 方法名                 | 说明                 | 参数                                      | 返回值                                       |
| ---------------------- | -------------------- | ----------------------------------------- | -------------------------------------------- |
| `getSelectedValue`     | 获取格式化后的选中值 | -                                         | `string`                                     |
| `getSelectedValues`    | 获取各列选中值数组   | -                                         | `string[]`                                   |
| `getSelectedIndexes`   | 获取各列选中索引     | -                                         | `number[]`                                   |
| `getSelectedDateParts` | 获取年月日时分秒对象 | -                                         | `{ year, month, day, hour, minute, second }` |
| `setValue`             | 设置当前值           | `value: string \| number \| Date \| null` | -                                            |
