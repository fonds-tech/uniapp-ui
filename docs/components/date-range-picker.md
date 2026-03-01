# DateRangePicker 日期范围选择器

纯弹窗日期范围选择器，不包含触发区域，适合与 `ui-cell`、`ui-button`、自定义输入框配合使用。

## 基础用法

```vue
<template>
  <ui-cell title="选择日期范围" :value="text" is-link @click="show = true" />
  <ui-date-range-picker v-model:show="show" v-model="range" title="选择日期范围" />
</template>

<script setup>
import { computed, ref } from "vue"

const show = ref(false)
const range = ref([])
const text = computed(() => (range.value.length === 2 ? `${range.value[0]} 至 ${range.value[1]}` : "请选择"))
</script>
```

## 选择年月

```vue
<template>
  <ui-date-range-picker
    v-model:show="show"
    v-model="range"
    :columns="['year', 'month']"
    format="YYYY-MM"
    title="选择月份范围"
  />
</template>
```

## 日期范围限制

```vue
<template>
  <ui-date-range-picker
    v-model:show="show"
    v-model="range"
    min-date="2024-01-01"
    max-date="2025-12-31"
    title="限制日期范围"
  />
</template>
```

## 事件

```vue
<template>
  <ui-date-range-picker
    v-model:show="show"
    v-model="range"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup>
function onChange(data) {
  console.log(data.type, data.value)
}

function onConfirm(data) {
  console.log(data.range)
}

function onCancel(data) {
  console.log(data.range)
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show / v-model:show | 是否显示弹窗 | `boolean` | `false` |
| modelValue / v-model | 日期区间值 | `[string, string] \| []` | `[]` |
| active-type | 打开时默认激活侧 | `'start' \| 'end'` | `'start'` |
| auto-switch-to-end | 选择开始后自动切到结束 | `boolean` | `true` |
| columns | 列配置 | `DatePickerColumnType[]` | `['year','month','day']` |
| format | 时间格式 | `string` | `YYYY-MM-DD` |
| min-date | 最小日期 | `string \| Date \| number` | - |
| max-date | 最大日期 | `string \| Date \| number` | - |
| column-filter | 列过滤函数 | `DatePickerColumnFilter` | - |
| column-formatter | 列格式化函数 | `DatePickerColumnFormatter` | - |
| mode | 弹窗位置 | `PopupMode` | `bottom` |
| border-radius | 圆角大小 | `string \| number` | `16rpx` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| overlay | 是否显示遮罩 | `boolean` | `true` |
| duration | 动画时长 | `number` | `300` |
| z-index | 弹窗层级 | `number` | - |
| background | 背景色 | `string` | - |
| safe-area-inset-bottom | 底部安全区 | `boolean` | `true` |
| show-header | 是否显示头部 | `boolean` | `true` |
| title | 标题 | `string` | - |
| start-placeholder | 开始占位（头部空值时） | `string` | `开始日期` |
| end-placeholder | 结束占位（头部空值时） | `string` | `结束日期` |
| cancel-text | 取消按钮文案 | `string` | `取消` |
| confirm-text | 确认按钮文案 | `string` | `确认` |
| column-height | 选项高度 | `string \| number` | `88rpx` |
| visible-column-num | 可见项数 | `string \| number` | `5` |
| column-size | 未激活文字大小 | `string \| number` | - |
| column-color | 未激活文字颜色 | `string` | - |
| column-weight | 未激活文字字重 | `string \| number` | - |
| active-column-size | 激活文字大小 | `string \| number` | - |
| active-column-color | 激活文字颜色 | `string` | - |
| active-column-weight | 激活文字字重 | `string \| number` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 弹窗显示状态变化 | `show: boolean` |
| update:modelValue | 区间值变化 | `value: [string, string] \| []` |
| open | 打开时触发 | - |
| opened | 打开动画结束时触发 | - |
| close | 关闭时触发 | `action: string` |
| closed | 关闭动画结束时触发 | `action: string` |
| change | 滚动选择值变化 | `DateRangePickerChangeData` |
| confirm | 点击确认时触发 | `DateRangePickerConfirmData` |
| cancel | 点击取消时触发 | `DateRangePickerCancelData` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开弹窗 | `type?: 'start' \| 'end'` |
| close | 关闭弹窗 | - |
| confirm | 手动确认 | - |
| cancel | 手动取消 | - |
| getRange | 获取当前区间 | - |
