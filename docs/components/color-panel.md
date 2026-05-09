# ColorPanel 颜色面板

用于在页面中直接选择颜色，支持色相、饱和度/亮度、RGB 输入和预设色板。

## 基础用法

```vue
<template>
  <ui-color-panel v-model="color" />
</template>

<script setup>
import { ref } from "vue"

const color = ref("#6366F1")
</script>
```

## 隐藏输入框

```vue
<ui-color-panel v-model="color" :show-input="false" />
```

## 隐藏预设色板

```vue
<ui-color-panel v-model="color" :show-presets="false" />
```

## 自定义色板列数

```vue
<ui-color-panel v-model="color" :columns="8" />
```

## 自定义面板高度

```vue
<ui-color-panel v-model="color" panel-height="200rpx" />
```

## 禁用与只读

```vue
<ui-color-panel v-model="color" disabled />
<ui-color-panel v-model="color" readonly />
```

## Props

| 参数          | 说明             | 类型                             | 默认值     |
| ------------- | ---------------- | -------------------------------- | ---------- |
| v-model       | 当前颜色值       | `string`                         | `''`       |
| size          | 尺寸             | `'small' \| 'medium' \| 'large'` | `'medium'` |
| preset-colors | 预设颜色列表     | `string[]`                       | 内置色板   |
| show-alpha    | 是否显示透明度   | `boolean`                        | `false`    |
| show-input    | 是否显示输入框   | `boolean`                        | `true`     |
| show-presets  | 是否显示预设色板 | `boolean`                        | `true`     |
| columns       | 预设色板每行列数 | `number`                         | `10`       |
| panel-height  | 饱和度面板高度   | `string \| number`               | `''`       |
| disabled      | 是否禁用         | `boolean`                        | `false`    |
| readonly      | 是否只读         | `boolean`                        | `false`    |
| format        | 输出颜色格式     | `'hex' \| 'rgb' \| 'hsl'`        | `'hex'`    |
| custom-class  | 自定义类名       | `string`                         | `''`       |
| custom-style  | 自定义样式       | `string \| object`               | `''`       |

## Events

| 事件名            | 说明           | 回调参数        |
| ----------------- | -------------- | --------------- |
| update:modelValue | 更新绑定值     | `value: string` |
| change            | 颜色变化时触发 | `value: string` |
