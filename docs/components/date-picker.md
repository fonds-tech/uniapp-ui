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
