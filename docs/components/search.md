# Search 搜索

搜索框组件，支持多种样式和事件。

## 基础用法

```vue
<template>
  <ui-search v-model="value" placeholder="请输入搜索关键词" />
</template>

<script setup>
import { ref } from "vue"
const value = ref("")
</script>
```

## 圆角搜索框

通过 `round` 属性设置圆角样式。

```vue
<template>
  <ui-search v-model="value" round placeholder="圆角搜索框" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用搜索框。

```vue
<template>
  <ui-search v-model="value" disabled placeholder="禁用状态" />
</template>
```

## 自定义背景色

通过 `background` 属性自定义背景颜色。

```vue
<template>
  <ui-search v-model="value" background="#f5f5f5" placeholder="自定义背景色" />
</template>
```

## 自定义按钮文字

通过 `action-text` 属性自定义搜索按钮文字。

```vue
<template>
  <ui-search v-model="value" action-text="确定" placeholder="自定义按钮文字" />
</template>
```

## 隐藏搜索按钮

通过 `:action="false"` 隐藏搜索按钮。

```vue
<template>
  <ui-search v-model="value" :action="false" placeholder="隐藏搜索按钮" />
</template>
```

## 搜索事件

点击搜索按钮或键盘搜索键时触发 `search` 事件。

```vue
<template>
  <ui-search v-model="value" placeholder="点击搜索按钮触发事件" @search="onSearch" />
</template>

<script setup>
function onSearch(value) {
  uni.showToast({ title: `搜索: ${value}`, icon: "none" })
}
</script>
```
