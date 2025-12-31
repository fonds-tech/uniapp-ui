# NoticeBar 通知栏

通知栏组件，用于循环播放通知公告。

## 基础用法

```vue
<template>
  <ui-notice-bar text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 滚动播放

通过 `scrollable` 属性控制是否滚动播放。

```vue
<template>
  <ui-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 多行展示

通过 `wrapable` 属性开启多行展示，需同时设置 `:scrollable="false"`。

```vue
<template>
  <ui-notice-bar wrapable :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 左侧图标

通过 `left-icon` 属性设置左侧图标。

```vue
<template>
  <ui-notice-bar left-icon="volume-up" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
</template>
```

## 通知模式

通过 `mode` 属性设置通知模式，可选 `closeable` 和 `link`。

```vue
<template>
  <ui-notice-bar mode="closeable" text="可关闭的通知栏" />
  <ui-notice-bar mode="link" text="可点击的通知栏" />
</template>
```

## 自定义样式

通过 `background` 和 `color` 属性自定义样式。

```vue
<template>
  <ui-notice-bar background="#ecf9ff" color="#1989fa" left-icon="info" text="技术是开发它的人的共同灵魂。" />
</template>
```

## 垂直滚动

传入数组并设置 `vertical` 属性实现垂直滚动。

```vue
<template>
  <ui-notice-bar :text="notices" vertical left-icon="volume-up" />
</template>

<script setup>
const notices = ["通知内容一", "通知内容二", "通知内容三"]
</script>
```
