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
