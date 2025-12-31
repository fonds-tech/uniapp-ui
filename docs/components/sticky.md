# Sticky 粘性布局

粘性布局组件，使元素在滚动时固定在指定位置。

## 基础用法

向下滚动页面时，组件会固定在顶部。

```vue
<template>
  <ui-sticky>
    <ui-button type="primary" block>基础用法</ui-button>
  </ui-sticky>
</template>
```

## 吸顶距离

通过 `offset-top` 属性设置距离顶部的偏移量。

```vue
<template>
  <ui-sticky :offset-top="100">
    <ui-button type="success" block>吸顶距离 100rpx</ui-button>
  </ui-sticky>
</template>
```
