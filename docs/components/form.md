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
