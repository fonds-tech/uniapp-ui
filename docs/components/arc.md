# Arc 弧形

弧形装饰组件，常用于页面顶部装饰。

## 基础用法

```vue
<template>
  <ui-arc background="#1989fa" />
</template>
```

## 自定义高度

通过 `height` 属性设置弧形高度。

```vue
<template>
  <ui-arc height="200rpx" background="#07c160" />
</template>
```

## 自定义弧度

通过 `percent` 属性设置弧度百分比。

```vue
<template>
  <ui-arc height="150rpx" :percent="80" background="#1989fa" />
</template>
```

## 渐变背景

通过 `background` 属性设置渐变背景。

```vue
<template>
  <ui-arc height="180rpx" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
</template>
```

## 组合使用

```vue
<template>
  <ui-arc height="200rpx" :fixed="false" background="#ee0a24">
    <view class="arc-content">
      <text class="arc-title">圆弧装饰</text>
      <text class="arc-desc">可用于页面顶部装饰</text>
    </view>
  </ui-arc>
</template>
```
