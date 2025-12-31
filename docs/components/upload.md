# Upload 上传

文件上传组件，支持图片选择和预览。

## 基础用法

```vue
<template>
  <ui-upload v-model="fileList" />
</template>

<script setup>
import { ref } from "vue"
const fileList = ref([])
</script>
```

## 多选上传

通过 `multiple` 属性支持多选。

```vue
<template>
  <ui-upload v-model="fileList" multiple />
</template>
```

## 限制数量

通过 `max-count` 属性限制上传数量。

```vue
<template>
  <ui-upload v-model="fileList" :max-count="3" multiple />
</template>
```

## 限制大小

通过 `max-size` 属性限制文件大小（单位：字节），超出时触发 `oversize` 事件。

```vue
<template>
  <ui-upload v-model="fileList" :max-size="1024 * 1024" @oversize="onOversize" />
</template>

<script setup>
function onOversize() {
  uni.showToast({ title: "文件大小超过限制", icon: "none" })
}
</script>
```

## 禁用状态

通过 `disabled` 属性禁用上传。

```vue
<template>
  <ui-upload v-model="fileList" disabled />
</template>
```

## 自定义尺寸

通过 `width` 和 `height` 属性自定义上传区域尺寸。

```vue
<template>
  <ui-upload v-model="fileList" width="200rpx" height="200rpx" />
</template>
```

## 开启预览

通过 `preview` 属性开启图片预览功能。

```vue
<template>
  <ui-upload v-model="fileList" preview />
</template>
```
