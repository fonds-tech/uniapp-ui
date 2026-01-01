# FloatButton 浮动按钮

悬浮在页面上的浮动操作按钮。

## 基础用法

```vue
<template>
  <ui-float-button @click="onClick" />
</template>

<script setup>
function onClick() {
  uni.showToast({ title: "点击了浮动按钮", icon: "none" })
}
</script>
```

## 按钮类型

通过 `type` 属性设置按钮类型。

```vue
<template>
  <ui-float-button type="primary" />
  <ui-float-button type="success" />
  <ui-float-button type="warning" />
  <ui-float-button type="danger" />
</template>
```

## 自定义图标

通过 `icon` 属性设置按钮图标。

```vue
<template>
  <ui-float-button icon="plus" />
  <ui-float-button icon="edit" />
  <ui-float-button icon="message" />
</template>
```

## 带文字

通过 `text` 属性添加文字。

```vue
<template>
  <ui-float-button icon="plus" text="添加" />
</template>
```

## Props

| 参数             | 说明                     | 类型                                                   | 默认值                              |
| ---------------- | ------------------------ | ------------------------------------------------------ | ----------------------------------- |
| icon             | 图标名称                 | `string`                                               | `plus`                              |
| text             | 按钮文本                 | `string`                                               | -                                   |
| type             | 按钮类型                 | `primary \| success \| warning \| danger \| default`   | `primary`                           |
| size             | 按钮尺寸                 | `string \| number`                                     | `100rpx`                            |
| width            | 按钮宽度，优先级高于size | `string \| number`                                     | -                                   |
| height           | 按钮高度，优先级高于size | `string \| number`                                     | -                                   |
| position         | 位置                     | `left-bottom \| right-bottom \| left-top \| right-top` | `right-bottom`                      |
| right            | 距离右侧的距离           | `string \| number`                                     | `24rpx`                             |
| bottom           | 距离底部的距离           | `string \| number`                                     | `100rpx`                            |
| left             | 距离左侧的距离           | `string \| number`                                     | -                                   |
| top              | 距离顶部的距离           | `string \| number`                                     | -                                   |
| z-index          | 元素层级                 | `string \| number`                                     | `100`                               |
| color            | 自定义背景色             | `string`                                               | -                                   |
| icon-color       | 图标颜色                 | `string`                                               | `#fff`                              |
| icon-size        | 图标大小                 | `string \| number`                                     | `40rpx`                             |
| text-color       | 文本颜色                 | `string`                                               | `#fff`                              |
| text-size        | 文本大小                 | `string \| number`                                     | -                                   |
| shadow           | 阴影样式                 | `string`                                               | `0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2)` |
| border-radius    | 圆角大小                 | `string \| number`                                     | -                                   |
| disabled         | 是否禁用                 | `boolean`                                              | `false`                             |
| loading          | 是否加载中               | `boolean`                                              | `false`                             |
| safe-area-bottom | 是否适配底部安全区域     | `boolean`                                              | `true`                              |
| custom-class     | 自定义类名               | `string`                                               | -                                   |
| custom-style     | 自定义样式               | `string \| object`                                     | -                                   |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击按钮时触发 | -        |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |
