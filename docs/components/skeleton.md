# Skeleton 骨架屏

加载中的占位骨架屏组件。

## 基础用法

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 显示头像

使用 `ui-skeleton-avatar` 组件显示头像占位。

```vue
<template>
  <ui-skeleton>
    <view class="skeleton-row">
      <ui-skeleton-avatar />
      <view class="skeleton-content">
        <ui-skeleton-title />
        <ui-skeleton-paragraph :rows="2" />
      </view>
    </view>
  </ui-skeleton>
</template>
```

## 显示图片

使用 `ui-skeleton-image` 组件显示图片占位。

```vue
<template>
  <ui-skeleton>
    <ui-skeleton-image />
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 关闭动画

通过 `:animate="false"` 关闭加载动画。

```vue
<template>
  <ui-skeleton :animate="false">
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```

## 自定义背景色

通过 `background` 属性自定义骨架屏背景色。

```vue
<template>
  <ui-skeleton background="#e0e0e0">
    <ui-skeleton-title />
    <ui-skeleton-paragraph />
  </ui-skeleton>
</template>
```
