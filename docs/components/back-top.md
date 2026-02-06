# BackTop 返回顶部

返回顶部按钮组件，当页面滚动到一定距离时显示。

## 基础用法

向下滚动页面时，右下角会出现返回顶部按钮。

```vue
<template>
  <view>
    <!-- 页面内容 -->
    <view v-for="i in 30" :key="i" class="content-item"> 内容 {{ i }} </view>

    <!-- 返回顶部按钮 -->
    <ui-back-top />
  </view>
</template>
```

## Props

| 参数          | 说明                   | 类型               | 默认值   |
| ------------- | ---------------------- | ------------------ | -------- |
| offset        | 滚动高度达到此值时显示 | `string \| number` | `200rpx` |
| right         | 距离页面右侧的距离     | `string \| number` | -        |
| bottom        | 距离页面底部的距离     | `string \| number` | -        |
| z-index       | 层级                   | `string \| number` | -        |
| duration      | 返回顶部过渡时间(ms)   | `string \| number` | `200`    |
| background    | 背景颜色               | `string`           | -        |
| border-radius | 圆角大小               | `string \| number` | -        |
| custom-class  | 自定义类名             | `string`           | -        |
| custom-style  | 自定义样式             | `string \| object` | -        |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击按钮时触发 | -        |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |


<!-- AUTO-PROPS-SUPPLEMENT: ui-back-top -->
## BackTop Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `scroll-top` |
| `icon` |
| `icon-color` |
| `icon-size` |
| `icon-weight` |
| `text` |
| `text-color` |
| `text-size` |
| `text-weight` |
| `size` |
| `width` |
| `height` |
| `transition` |

