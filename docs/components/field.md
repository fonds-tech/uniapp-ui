# Field 输入域

表单输入域组件，整合了标签和输入框。

## 基础用法

```vue
<template>
  <ui-field v-model="username" label="用户名" placeholder="请输入用户名" />
  <ui-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
</template>

<script setup>
import { ref } from "vue"
const username = ref("")
const password = ref("")
</script>
```

## 必填项

通过 `required` 属性显示必填标记。

```vue
<template>
  <ui-field v-model="phone" label="手机号" placeholder="请输入手机号" required />
</template>
```

## 禁用与只读

```vue
<template>
  <ui-field v-model="value1" label="禁用" placeholder="禁用状态" disabled />
  <ui-field v-model="value2" label="只读" placeholder="只读状态" readonly />
</template>
```

## 带图标

通过 `prefix-icon` 和 `suffix-icon` 属性设置前后图标。

```vue
<template>
  <ui-field v-model="value" label="用户名" placeholder="请输入" prefix-icon="person" />
  <ui-field v-model="value" label="密码" type="password" placeholder="请输入" suffix-icon="eye" />
</template>
```

## 可清除

通过 `clearable` 属性显示清除按钮。

```vue
<template>
  <ui-field v-model="value" label="内容" placeholder="输入后显示清除按钮" clearable />
</template>
```

## 多行文本

通过 `type="textarea"` 设置为多行文本输入。

```vue
<template>
  <ui-field v-model="value" label="留言" type="textarea" placeholder="请输入留言" :maxlength="200" autosize />
</template>
```

## 输入对齐

通过 `input-align` 属性设置输入框对齐方式。

```vue
<template>
  <ui-field v-model="value" label="左对齐" placeholder="请输入" input-align="left" />
  <ui-field v-model="value" label="居中" placeholder="请输入" input-align="center" />
  <ui-field v-model="value" label="右对齐" placeholder="请输入" input-align="right" />
</template>
```

## 标签位置

通过 `label-align="top"` 将标签放置在顶部。

```vue
<template>
  <ui-field v-model="value" label="详细地址" type="textarea" placeholder="请输入详细地址" label-align="top" />
</template>
```
