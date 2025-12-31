# Line 分割线

用于分隔内容区域的分割线组件。

## 基础用法

```vue
<template>
  <text>上方内容</text>
  <ui-line />
  <text>下方内容</text>
</template>
```

## 虚线

通过 `type` 属性设置虚线样式。

```vue
<template>
  <ui-line type="dashed" />
</template>
```

## 点线

```vue
<template>
  <ui-line type="dotted" />
</template>
```

## 自定义颜色

通过 `color` 属性自定义分割线颜色。

```vue
<template>
  <ui-line color="#ff4757" />
  <ui-line color="#2ed573" />
  <ui-line color="#1e90ff" />
</template>
```

## 自定义高度

通过 `height` 属性设置分割线粗细。

```vue
<template>
  <ui-line height="4rpx" />
  <ui-line height="8rpx" />
  <ui-line height="12rpx" />
</template>
```

## 垂直线条

通过 `vertical` 属性设置垂直方向的分割线。

```vue
<template>
  <view class="flex items-center">
    <text>左边</text>
    <ui-line vertical height="40rpx" margin="0 20rpx" />
    <text>中间</text>
    <ui-line vertical height="40rpx" margin="0 20rpx" />
    <text>右边</text>
  </view>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 线条颜色 | `string` | - |
| width | 线条宽度 | `string \| number` | `100%` |
| height | 线条高度/粗细 | `string \| number` | `2rpx` |
| type | 线条类型 | `solid \| dashed \| dotted` | `solid` |
| vertical | 是否为垂直线条 | `boolean` | `false` |
| margin | 外边距 | `string \| number` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |
