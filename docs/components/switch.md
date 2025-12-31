# Switch 开关

开关选择器组件。

## 基础用法

```vue
<template>
  <ui-switch v-model="checked" />
</template>

<script setup>
import { ref } from "vue"
const checked = ref(false)
</script>
```

## 禁用状态

```vue
<ui-switch v-model="checked" disabled />
```

## 加载状态

```vue
<ui-switch v-model="checked" loading />
```

## 自定义大小

```vue
<ui-switch v-model="checked" size="40rpx" />
<ui-switch v-model="checked" size="50rpx" />
<ui-switch v-model="checked" size="60rpx" />
```

## 自定义颜色

```vue
<ui-switch v-model="checked" active-color="#ee0a24" />
<ui-switch v-model="checked" active-color="#07c160" />
<ui-switch v-model="checked" inactive-color="#dcdee0" />
```

## 异步控制

```vue
<template>
  <ui-switch v-model="checked" :loading="loading" @change="onChange" />
</template>

<script setup>
import { ref } from "vue"

const checked = ref(false)
const loading = ref(false)

function onChange() {
  loading.value = true
  setTimeout(() => {
    checked.value = !checked.value
    loading.value = false
  }, 1000)
}
</script>
```

## API

### Props

| 属性名         | 说明         | 类型               | 默认值  |
| -------------- | ------------ | ------------------ | ------- |
| v-model        | 开关状态     | `boolean`          | `false` |
| disabled       | 是否禁用     | `boolean`          | `false` |
| loading        | 是否加载中   | `boolean`          | `false` |
| size           | 开关大小     | `string \| number` | -       |
| active-color   | 打开时的颜色 | `string`           | -       |
| inactive-color | 关闭时的颜色 | `string`           | -       |
| active-value   | 打开时的值   | `any`              | `true`  |
| inactive-value | 关闭时的值   | `any`              | `false` |

### Events

| 事件名 | 说明           | 回调参数         |
| ------ | -------------- | ---------------- |
| change | 状态变化时触发 | `value: boolean` |
