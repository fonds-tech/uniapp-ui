# Transition 过渡动画

过渡动画组件，用于为元素添加进入/离开动画。

## 基础用法 (fade)

```vue
<template>
  <ui-button @click="show = !show">切换</ui-button>
  <ui-transition :show="show">
    <view class="demo-content">Fade 淡入淡出</view>
  </ui-transition>
</template>

<script setup>
import { ref } from "vue"
const show = ref(true)
</script>
```

## 缩放动画 (zoom-in)

```vue
<template>
  <ui-transition :show="show" name="zoom-in">
    <view class="demo-content">Zoom In 缩放</view>
  </ui-transition>
</template>
```

## 滑动动画

支持 `slide-up`、`slide-down`、`slide-left`、`slide-right` 四种滑动动画。

```vue
<template>
  <ui-transition :show="show" name="slide-up">
    <view class="demo-content">Slide Up</view>
  </ui-transition>
</template>
```

## 淡入动画

支持 `fade-up`、`fade-down`、`fade-left`、`fade-right` 四种淡入动画。

```vue
<template>
  <ui-transition :show="show" name="fade-up">
    <view class="demo-content">Fade Up</view>
  </ui-transition>
</template>
```

## 自定义时长

通过 `duration` 属性设置动画时长（单位：毫秒）。

```vue
<template>
  <ui-transition :show="show" :duration="200">
    <view class="demo-content">快速 (200ms)</view>
  </ui-transition>
  <ui-transition :show="show" :duration="800">
    <view class="demo-content">慢速 (800ms)</view>
  </ui-transition>
</template>
```
