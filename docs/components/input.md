# Input 输入框

常用的文本输入组件。

## 基础用法

```vue
<template>
  <ui-input v-model="value" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from "vue"
const value = ref("")
</script>
```

## 输入类型

通过 `type` 属性设置输入类型。

```vue
<ui-input v-model="text" type="text" placeholder="文本输入" />
<ui-input v-model="number" type="number" placeholder="数字输入" />
<ui-input v-model="digit" type="digit" placeholder="带小数点" />
<ui-input v-model="password" password placeholder="密码输入" />
```

## 禁用和只读

```vue
<ui-input model-value="禁用状态" disabled />
<ui-input model-value="只读状态" readonly />
```

## 清除按钮

设置 `clearable` 可显示清除按钮。

```vue
<ui-input v-model="value" clearable placeholder="可清除" />
<ui-input v-model="value" :clearable="false" placeholder="不可清除" />
```

## 自定义样式

```vue
<!-- 自定义背景和圆角 -->
<ui-input v-model="value" background="#f5f6fa" radius="16rpx" />

<!-- 文字对齐 -->
<ui-input v-model="value" input-align="center" />
<ui-input v-model="value" input-align="right" />
```

## API

### Props

| 属性名            | 说明               | 类型                                  | 默认值       |
| ----------------- | ------------------ | ------------------------------------- | ------------ |
| v-model           | 输入值             | `string \| number`                    | `''`         |
| type              | 输入类型           | `text \| number \| digit \| password` | `text`       |
| placeholder       | 占位文本           | `string`                              | `请输入内容` |
| disabled          | 是否禁用           | `boolean`                             | `false`      |
| readonly          | 是否只读           | `boolean`                             | `false`      |
| clearable         | 是否显示清除按钮   | `boolean`                             | `true`       |
| maxlength         | 最大输入长度       | `number`                              | `-1`         |
| password          | 是否密码类型       | `boolean`                             | `false`      |
| focus             | 自动获取焦点       | `boolean`                             | `false`      |
| confirm-type      | 键盘右下角按钮文字 | `string`                              | `done`       |
| input-align       | 输入内容对齐       | `left \| center \| right`             | `left`       |
| background        | 背景颜色           | `string`                              | -            |
| radius            | 圆角大小           | `string \| number`                    | -            |
| color             | 字体颜色           | `string`                              | -            |
| font-size         | 字体大小           | `string \| number`                    | -            |
| placeholder-color | 占位符颜色         | `string`                              | -            |

### Events

| 事件名  | 说明               | 回调参数        |
| ------- | ------------------ | --------------- |
| input   | 输入时触发         | `value: string` |
| change  | 内容变化时触发     | `value: string` |
| focus   | 获取焦点时触发     | -               |
| blur    | 失去焦点时触发     | `value: string` |
| clear   | 点击清除按钮时触发 | -               |
| confirm | 点击完成按钮时触发 | `value: string` |

### Methods

| 方法名 | 说明   | 参数                      |
| ------ | ------ | ------------------------- |
| reset  | 重置值 | `value: string \| number` |
