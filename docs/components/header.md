# Header 页头

固定在页面顶部的头部组件。

## 基础用法

```vue
<template>
  <ui-header background="#1989fa">
    <view class="header-content">
      <text class="header-title">页头标题</text>
    </view>
  </ui-header>
</template>
```

## 自定义背景

通过 `background` 属性自定义背景色，支持渐变。

```vue
<template>
  <ui-header background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    <view class="header-content">
      <text class="header-title">渐变背景</text>
    </view>
  </ui-header>
</template>
```

## 带操作按钮

```vue
<template>
  <ui-header background="#07c160">
    <view class="header-bar">
      <ui-icon name="arrow-left" color="#fff" size="40rpx" />
      <text class="header-title">标题</text>
      <ui-icon name="more" color="#fff" size="40rpx" />
    </view>
  </ui-header>
</template>
```
