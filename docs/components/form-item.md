# FormItem 表单项

表单项组件，用于包裹表单控件，提供标签、校验等功能。

## 基础用法

```vue
<template>
  <ui-form :model="formData">
    <ui-form-item label="用户名" prop="username">
      <ui-input v-model="formData.username" placeholder="请输入用户名" />
    </ui-form-item>
    <ui-form-item label="密码" prop="password">
      <ui-input v-model="formData.password" type="password" placeholder="请输入密码" />
    </ui-form-item>
  </ui-form>
</template>

<script setup>
import { reactive } from "vue"

const formData = reactive({
  username: "",
  password: "",
})
</script>
```

## 必填标识

设置 `required` 属性显示必填标识。

```vue
<template>
  <ui-form-item label="用户名" prop="username" required>
    <ui-input v-model="formData.username" />
  </ui-form-item>
</template>
```

## 标签位置

通过 `label-position` 设置标签位置。

```vue
<template>
  <ui-form-item label="用户名" label-position="top">
    <ui-input v-model="formData.username" />
  </ui-form-item>
</template>
```

## 显示冒号

设置 `colon` 属性在标签后显示冒号。

```vue
<template>
  <ui-form-item label="用户名" colon>
    <ui-input v-model="formData.username" />
  </ui-form-item>
</template>
```

## 错误提示

通过 `error-message` 手动设置错误信息。

```vue
<template>
  <ui-form-item label="用户名" error-message="用户名不能为空">
    <ui-input v-model="formData.username" />
  </ui-form-item>
</template>
```

## Props

| 参数                 | 说明                       | 类型                                | 默认值  |
| -------------------- | -------------------------- | ----------------------------------- | ------- |
| prop                 | model 的键名，用于表单校验 | `string`                            | -       |
| label                | 标签文本                   | `string`                            | -       |
| colon                | 是否在标签文字后添加冒号   | `boolean`                           | `false` |
| border               | 是否显示边框               | `boolean`                           | -       |
| border-color         | 边框颜色                   | `string`                            | -       |
| required             | 是否为必填项               | `boolean`                           | `false` |
| padding              | 内边距                     | `string \| number`                  | -       |
| label-gap            | 标签与内容的间隔           | `string \| number`                  | -       |
| label-size           | 标签文字大小               | `string \| number`                  | -       |
| label-color          | 标签文字颜色               | `string`                            | -       |
| label-width          | 标签文字宽度               | `string \| number`                  | -       |
| label-weight         | 标签文字字重               | `string \| number`                  | -       |
| label-line-height    | 标签文字行高               | `string \| number`                  | -       |
| label-align          | 标签对齐方式               | `top \| center \| bottom`           | -       |
| label-position       | 标签位置                   | `left \| right \| top`              | -       |
| content-align        | 内容对齐方式               | `left \| center \| right`           | -       |
| error-message        | 错误信息文字               | `string`                            | -       |
| error-message-size   | 错误信息文字大小           | `string \| number`                  | -       |
| error-message-color  | 错误信息文字颜色           | `string`                            | `error` |
| error-message-weight | 错误信息文字字重           | `string \| number`                  | -       |
| error-message-align  | 错误信息对齐方式           | `left \| center \| right`           | -       |
| show-error-message   | 是否显示错误提示           | `boolean`                           | `true`  |
| validate-trigger     | 校验触发时机               | `blur \| change \| submit \| array` | `blur`  |
| custom-class         | 自定义类名                 | `string`                            | -       |
| custom-style         | 自定义样式                 | `string \| object`                  | -       |

## Events

| 事件名 | 说明           | 回调参数             |
| ------ | -------------- | -------------------- |
| submit | 提交表单时触发 | `values: object`     |
| failed | 校验失败时触发 | `{ values, errors }` |
