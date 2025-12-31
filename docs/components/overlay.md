# Overlay 遮罩层

用于强调特定内容、阻止用户进行其他操作的遮罩层组件。

## 基础用法

```vue
<template>
  <ui-button type="primary" @click="show = true">显示遮罩层</ui-button>
  <ui-overlay :show="show" @click="show = false" />
</template>

<script setup>
import { ref } from "vue"
const show = ref(false)
</script>
```

## 嵌入内容

通过默认插槽在遮罩层上嵌入内容。

```vue
<template>
  <ui-overlay :show="show" @click="show = false">
    <view class="overlay-content">
      <text>嵌入内容</text>
    </view>
  </ui-overlay>
</template>
```

## 自定义透明度

通过 `opacity` 属性设置遮罩层透明度。

```vue
<template>
  <ui-overlay :show="show" :opacity="0.3" @click="show = false" />
  <ui-overlay :show="show" :opacity="0.7" @click="show = false" />
</template>
```

## 点击不关闭

通过 `:close-on-click="false"` 使点击遮罩层不关闭。

```vue
<template>
  <ui-overlay :show="show" :close-on-click="false">
    <view class="overlay-content" @click="show = false">
      <text>点击此处关闭</text>
    </view>
  </ui-overlay>
</template>
```
