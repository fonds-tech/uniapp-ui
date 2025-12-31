# Tabbar 标签栏

底部标签栏组件，用于在不同页面间切换。

## 基础用法

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
    <ui-tabbar-item icon="heart" text="收藏" />
    <ui-tabbar-item icon="person" text="我的" />
  </ui-tabbar>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)
</script>
```

## 徽标提示

通过 `dot` 属性显示圆点提示，`badge` 属性显示徽标数字。

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" dot />
    <ui-tabbar-item icon="message" text="消息" badge="5" />
    <ui-tabbar-item icon="person" text="我的" badge="99+" />
  </ui-tabbar>
</template>
```

## 自定义颜色

通过 `active-color` 和 `inactive-color` 自定义颜色。

```vue
<template>
  <ui-tabbar v-model="active" active-color="#07c160" inactive-color="#969799">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
    <ui-tabbar-item icon="heart" text="收藏" />
    <ui-tabbar-item icon="person" text="我的" />
  </ui-tabbar>
</template>
```

## 切换事件

通过 `change` 事件监听标签切换。

```vue
<template>
  <ui-tabbar v-model="active" @change="onChange">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
  </ui-tabbar>
</template>

<script setup>
function onChange(index) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>
```
