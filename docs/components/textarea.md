# Textarea 文本域

多行文本输入组件，支持自动高度、字数统计等功能。

## 基础用法

```vue
<template>
  <ui-textarea v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from "vue"
const value = ref("")
</script>
```

## 字数统计

通过 `maxlength` 和 `show-count` 属性显示字数统计。

```vue
<template>
  <ui-textarea v-model="value" placeholder="请输入内容" :maxlength="100" show-count />
</template>
```

## 自动高度

通过 `auto-height` 属性使文本域高度随着内容自动增加。

```vue
<template>
  <ui-textarea v-model="value" placeholder="高度自动增加" auto-height />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用文本域。

```vue
<template>
  <ui-textarea v-model="value" placeholder="禁用状态" disabled />
</template>
```

## 可清除

通过 `clearable` 属性显示清除按钮。

```vue
<template>
  <ui-textarea v-model="value" placeholder="可清除内容" clearable />
</template>
```

## 自定义样式

通过 `border`、`radius`、`padding` 等属性自定义样式。

```vue
<template>
  <ui-textarea v-model="value" placeholder="自定义样式" border="1rpx solid #dcdee0" radius="16rpx" padding="24rpx" />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 输入值 | `string` | - |
| placeholder | 占位文本 | `string` | `请输入内容` |
| placeholder-color | 占位符颜色 | `string` | - |
| maxlength | 最大输入长度 | `string \| number` | `200` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `true` |
| focus | 是否自动获取焦点 | `boolean` | `false` |
| auto-height | 是否自动增加高度 | `boolean` | `false` |
| input-align | 输入内容对齐方式 | `left \| center \| right` | `left` |
| show-count | 是否显示字数统计 | `boolean` | `true` |
| min-height | 最小高度 | `string \| number` | `150rpx` |
| width | 宽度 | `string \| number` | - |
| padding | 内边距 | `string \| number` | - |
| background | 背景颜色 | `string` | - |
| color | 文字颜色 | `string` | - |
| font-size | 文字大小 | `string \| number` | - |
| font-weight | 文字粗细 | `string \| number` | - |
| radius | 圆角大小 | `string \| number` | - |
| border | 边框样式 | `string` | - |
| confirm-type | 键盘右下角按钮文字 | `string` | `done` |
| cursor-spacing | 光标与键盘距离 | `string \| number` | `30` |
| count-size | 字数统计文字大小 | `string \| number` | - |
| count-color | 字数统计文字颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入时触发 | `value: string` |
| change | 内容变化时触发 | `value: string` |
| focus | 获取焦点时触发 | - |
| blur | 失去焦点时触发 | `value: string` |
| confirm | 点击完成按钮时触发 | `value: string` |
| clear | 点击清除按钮时触发 | - |
| linechange | 输入框行数变化时触发 | `event` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义输入框右侧内容 |
