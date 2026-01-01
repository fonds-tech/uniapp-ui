# Form 表单

表单容器组件，用于数据采集和验证。

## 基础用法

```vue
<template>
  <ui-form ref="formRef" :model="formData" :rules="rules">
    <ui-form-item label="用户名" prop="username">
      <ui-input v-model="formData.username" placeholder="请输入用户名" />
    </ui-form-item>
    <ui-form-item label="密码" prop="password">
      <ui-input v-model="formData.password" type="password" placeholder="请输入密码" />
    </ui-form-item>
    <ui-form-item label="手机号" prop="phone">
      <ui-input v-model="formData.phone" type="number" placeholder="请输入手机号" />
    </ui-form-item>
  </ui-form>
  <ui-button type="primary" @click="onSubmit">提交</ui-button>
  <ui-button @click="onReset">重置</ui-button>
</template>

<script setup>
import { ref } from "vue"

const formRef = ref()
const formData = ref({
  username: "",
  password: "",
  phone: "",
})

const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [{ required: true, message: "请输入密码" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1\d{10}$/, message: "手机号格式不正确" },
  ],
}

async function onSubmit() {
  try {
    await formRef.value?.validate()
    uni.showToast({ title: "验证通过", icon: "success" })
  } catch {
    uni.showToast({ title: "验证失败", icon: "none" })
  }
}

function onReset() {
  formData.value = { username: "", password: "", phone: "" }
  formRef.value?.resetValidation()
}
</script>
```

## 必填项标记

通过 `required` 属性显示必填项标记。

```vue
<template>
  <ui-form :model="formData" required>
    <ui-form-item label="姓名">
      <ui-input v-model="formData.name" placeholder="请输入姓名" />
    </ui-form-item>
  </ui-form>
</template>
```

## 标签位置

通过 `label-position` 属性设置标签位置，可选值为 `left` 和 `top`。

```vue
<template>
  <ui-form :model="formData" label-position="top">
    <ui-form-item label="详细地址">
      <ui-textarea v-model="formData.address" placeholder="请输入详细地址" />
    </ui-form-item>
  </ui-form>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用整个表单。

```vue
<template>
  <ui-form :model="formData" disabled>
    <ui-form-item label="用户名">
      <ui-input v-model="formData.username" placeholder="请输入用户名" />
    </ui-form-item>
  </ui-form>
</template>
```

## Form Props

| 参数                 | 说明                             | 类型                                | 默认值    |
| -------------------- | -------------------------------- | ----------------------------------- | --------- |
| model                | 表单数据对象                     | `object`                            | `{}`      |
| rules                | 表单验证规则                     | `object`                            | `{}`      |
| colon                | 是否在标签文字后面添加冒号       | `boolean`                           | `false`   |
| border               | 是否显示边框                     | `boolean`                           | `false`   |
| border-color         | 边框颜色                         | `string`                            | `#F6F6F6` |
| required             | 是否为必填项，显示\*号           | `boolean`                           | `false`   |
| disabled             | 是否禁用表单                     | `boolean`                           | `false`   |
| readonly             | 是否只读状态                     | `boolean`                           | `false`   |
| label-gap            | 标签文字和内容的间隔             | `string \| number`                  | -         |
| label-size           | 标签文字大小                     | `string \| number`                  | -         |
| label-color          | 标签文字颜色                     | `string`                            | -         |
| label-weight         | 标签文字字重                     | `string \| number`                  | -         |
| label-width          | 标签文字宽度                     | `string \| number`                  | `auto`    |
| label-line-height    | 标签文字行高                     | `string \| number`                  | -         |
| label-position       | 标签文字位置                     | `left \| right \| top`              | `left`    |
| content-align        | 输入内容对齐方式                 | `left \| center \| right`           | `left`    |
| error-message-size   | 校验错误信息文字大小             | `string \| number`                  | -         |
| error-message-color  | 校验错误信息文字颜色             | `string`                            | -         |
| error-message-weight | 校验错误信息文字字重             | `string \| number`                  | -         |
| error-message-align  | 校验错误信息对齐方式             | `left \| center \| right`           | `left`    |
| show-error-message   | 是否在校验不通过时展示错误提示   | `boolean`                           | `true`    |
| validate-first       | 是否在某一项校验不通过时停止校验 | `boolean`                           | `false`   |
| validate-trigger     | 表单校验触发时机                 | `blur \| change \| submit \| array` | `blur`    |
| custom-class         | 自定义类名                       | `string`                            | -         |
| custom-style         | 自定义样式                       | `string \| object`                  | -         |

## FormItem Props

| 参数                 | 说明                       | 类型                                | 默认值  |
| -------------------- | -------------------------- | ----------------------------------- | ------- |
| prop                 | model的键名                | `string`                            | -       |
| label                | 标签文本                   | `string`                            | -       |
| colon                | 是否在标签文字后面添加冒号 | `boolean`                           | `false` |
| border               | 是否显示边框               | `boolean`                           | -       |
| border-color         | 边框颜色                   | `string`                            | -       |
| required             | 是否为必填项               | `boolean`                           | `false` |
| padding              | 内边距                     | `string \| number`                  | -       |
| label-gap            | 标签文字和内容的间隔       | `string \| number`                  | -       |
| label-size           | 标签文字大小               | `string \| number`                  | -       |
| label-color          | 标签文字颜色               | `string`                            | -       |
| label-width          | 标签文字宽度               | `string \| number`                  | -       |
| label-weight         | 标签文字字重               | `string \| number`                  | -       |
| label-line-height    | 标签文字行高               | `string \| number`                  | -       |
| label-align          | 标签对齐方式               | `top \| center \| bottom`           | -       |
| label-position       | 标签文字位置               | `left \| right \| top`              | -       |
| content-align        | 输入内容对齐方式           | `left \| center \| right`           | -       |
| error-message        | 校验错误信息文字           | `string`                            | -       |
| error-message-size   | 校验错误信息文字大小       | `string \| number`                  | -       |
| error-message-color  | 校验错误信息文字颜色       | `string`                            | `error` |
| error-message-weight | 校验错误信息文字字重       | `string \| number`                  | -       |
| error-message-align  | 校验错误信息对齐方式       | `left \| center \| right`           | -       |
| show-error-message   | 是否展示错误提示           | `boolean`                           | `true`  |
| validate-trigger     | 表单校验触发时机           | `blur \| change \| submit \| array` | `blur`  |
| custom-class         | 自定义类名                 | `string`                            | -       |
| custom-style         | 自定义样式                 | `string \| object`                  | -       |

## Form Events

| 事件名 | 说明               | 回调参数                          |
| ------ | ------------------ | --------------------------------- |
| submit | 表单提交时触发     | `values: Record<string, unknown>` |
| failed | 表单验证失败时触发 | `{ values, errors }`              |

## Form Methods

| 方法名              | 说明         | 参数                        |
| ------------------- | ------------ | --------------------------- |
| validate            | 验证表单     | `name?: string \| string[]` |
| validateField       | 验证单个字段 | `name?: string`             |
| resetValidation     | 重置表单验证 | `name?: string \| string[]` |
| getValidationStatus | 获取验证状态 | -                           |

## FormRule 验证规则

| 参数          | 说明           | 类型                                            |
| ------------- | -------------- | ----------------------------------------------- |
| required      | 是否必填       | `boolean`                                       |
| message       | 错误提示       | `string \| ((value, rule) => string)`           |
| pattern       | 正则校验       | `RegExp`                                        |
| trigger       | 触发时机       | `blur \| change \| submit`                      |
| validator     | 自定义校验函数 | `(value, rule) => boolean \| string \| Promise` |
| formatter     | 格式化函数     | `(value, rule) => string`                       |
| validateEmpty | 是否校验空值   | `boolean`                                       |

## Form Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 表单内容 |

## FormItem Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 表单项内容     |
| label   | 自定义标签内容 |
