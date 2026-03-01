# UiDateRangePicker 组件

## 介绍

`ui-date-range-picker` 是纯弹窗日期区间选择器，专注于开始/结束日期选择逻辑，不包含触发输入区域。

适用于：

- 业务方已有自定义触发 UI（如 Cell、Button、Input）
- 需要手动控制弹窗显示（`v-model:show`）
- 需要使用日期区间弹窗能力并复用 `ui-date-panel` 的日期列选择能力

## 代码示例

```vue
<template>
  <ui-cell title="选择日期范围" :value="text" is-link @click="show = true" />
  <ui-date-range-picker v-model:show="show" v-model="range" title="选择日期范围" @confirm="onConfirm" />
</template>

<script setup>
import { computed, ref } from "vue"

const show = ref(false)
const range = ref([])
const text = computed(() => (range.value.length === 2 ? `${range.value[0]} 至 ${range.value[1]}` : "请选择"))

function onConfirm(data) {
  console.log(data.range)
}
</script>
```

## 说明

- 组件内部基于 `ui-date-panel` 实现开始/结束日期的区间联动选择。
- 与 `ui-date-range-select` 的主要区别：不渲染触发区域，仅保留弹窗选择器。
