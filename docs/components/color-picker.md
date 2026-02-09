# ColorPicker 颜色选择器

基于弹窗的颜色选择器，内置 `ui-color-panel`，适合表单选择和设置页场景。

## 基础用法

```vue
<template>
  <ui-cell title="选择颜色" :value="color || '请选择'" is-link @click="show = true" />
  <ui-color-picker v-model="color" v-model:show="show" title="选择颜色" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const color = ref("")
</script>
```

## 自定义预设颜色

```vue
<ui-color-picker
  v-model="color"
  v-model:show="show"
  title="选择品牌色"
  :preset-colors="['#1DA1F2', '#4267B2', '#E4405F', '#FF0000']"
  :columns="4"
/>
```

## 隐藏输入框

```vue
<ui-color-picker v-model="color" v-model:show="show" :show-input="false" />
```

## 隐藏预设色板

```vue
<ui-color-picker v-model="color" v-model:show="show" :show-presets="false" />
```

## Props

| 参数          | 说明             | 类型                          | 默认值 |
| ------------- | ---------------- | ----------------------------- | ------ |
| v-model       | 当前颜色值       | `string`                      | `''` |
| v-model:show  | 是否显示弹窗     | `boolean`                     | `false` |
| title         | 弹窗标题         | `string`                      | `''` |
| size          | 面板尺寸         | `'small' \| 'medium' \| 'large'` | `'medium'` |
| show-alpha    | 是否显示透明度   | `boolean`                     | `false` |
| show-input    | 是否显示输入框   | `boolean`                     | `true` |
| show-presets  | 是否显示预设色板 | `boolean`                     | `true` |
| columns       | 预设色板每行列数 | `number`                      | `10` |
| preset-colors | 预设颜色列表     | `string[]`                    | `[]` |
| format        | 输出颜色格式     | `'hex' \| 'rgb' \| 'hsl'`   | `'hex'` |
| custom-class  | 自定义类名       | `string`                      | `''` |
| custom-style  | 自定义样式       | `string \| object`           | `''` |

## Events

| 事件名            | 说明           | 回调参数 |
| ----------------- | -------------- | -------- |
| update:modelValue | 更新绑定值     | `value: string` |
| update:show       | 更新弹窗显示状态 | `value: boolean` |
| change            | 颜色确认变更后触发 | `value: string` |
| confirm           | 点击确认时触发 | `value: string` |
| cancel            | 点击取消时触发 | - |
| close             | 弹窗关闭时触发 | - |
