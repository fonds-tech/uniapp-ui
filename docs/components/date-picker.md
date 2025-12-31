# DatePicker 日期选择

日期时间选择器组件，支持年月日时分多种组合。

## 基础用法

```vue
<template>
  <ui-cell title="选择日期" :value="date || '请选择'" is-link @click="show = true" />
  <ui-date-picker v-model="date" v-model:show="show" title="选择日期" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const date = ref("")
</script>
```

## 选择年月

通过 `columns` 属性自定义选择列。

```vue
<template>
  <ui-date-picker v-model="date" v-model:show="show" title="选择年月" :columns="['year', 'month']" format="YYYY-MM" />
</template>
```

## 选择时间

```vue
<template>
  <ui-date-picker v-model="time" v-model:show="show" title="选择时间" :columns="['hour', 'minute']" format="HH:mm" />
</template>
```

## 完整日期时间

```vue
<template>
  <ui-date-picker v-model="datetime" v-model:show="show" title="选择日期时间" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
</template>
```

## 限制日期范围

通过 `min-date` 和 `max-date` 属性限制可选日期范围。

```vue
<template>
  <ui-date-picker v-model="date" v-model:show="show" title="选择日期" :min-date="minDate" :max-date="maxDate" />
</template>

<script setup>
import { ref } from "vue"

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 11, 31)
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中日期 | `string \| Date \| number` | - |
| v-model:show | 是否显示 | `boolean` | `false` |
| columns | 列类型 | `array` | `['year', 'month', 'day']` |
| format | 日期格式 | `string` | `YYYY-MM-DD HH:mm:ss` |
| min-date | 最小日期 | `string \| Date \| number` | - |
| max-date | 最大日期 | `string \| Date \| number` | - |
| title | 顶部标题 | `string` | - |
| cancel-text | 取消按钮文字 | `string` | `取消` |
| confirm-text | 确认按钮文字 | `string` | `确认` |
| show-header | 是否显示头部 | `boolean` | `true` |
| mode | 弹窗位置 | `top \| bottom \| left \| right \| center` | `bottom` |
| border-radius | 圆角大小 | `string \| number` | `16rpx` |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean` | `true` |
| column-height | 选项高度 | `string \| number` | `88rpx` |
| visible-column-num | 可见选项数 | `string \| number` | `5` |
| column-filter | 选项过滤函数 | `function` | - |
| column-formatter | 选项格式化函数 | `function` | - |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选项改变时触发 | `{ value, selectedValues, selectedIndexes }` |
| confirm | 点击确认按钮时触发 | `{ value, selectedValues, selectedIndexes }` |
| cancel | 点击取消按钮时触发 | `{ value, selectedValues, selectedIndexes }` |
| open | 打开时触发 | - |
| opened | 打开动画结束时触发 | - |
| close | 关闭时触发 | `action: string` |
| closed | 关闭动画结束时触发 | `action: string` |
