# FloatButton 浮动按钮

悬浮在页面上的浮动操作按钮，支持拖拽、徽标等功能。

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

通过 `text` 属性添加文字，按钮会自动变为药丸形状。

```vue
<template>
  <ui-float-button icon="plus" text="添加" />
</template>
```

## 显示/隐藏

通过 `show` 属性控制按钮的显示与隐藏，支持过渡动画。

```vue
<template>
  <ui-float-button :show="visible" />
  <ui-button @click="visible = !visible">切换显示</ui-button>
</template>

<script setup>
import { ref } from "vue"
const visible = ref(true)
</script>
```

## 徽标提示

通过 `badge` 属性设置徽标。传入 `true` 显示小红点，传入数字显示徽标数字。

```vue
<template>
  <!-- 显示小红点 -->
  <ui-float-button :badge="true" />

  <!-- 显示数字徽标 -->
  <ui-float-button :badge="5" />
</template>
```

## 可拖拽

通过 `draggable` 属性开启拖拽功能，可以拖动按钮到任意位置。

```vue
<template>
  <!-- 基础拖拽 -->
  <ui-float-button draggable />

  <!-- 不限制边界 -->
  <ui-float-button draggable :drag-boundary="false" />
</template>
```

## 按钮位置

通过 `position` 属性设置按钮位置，支持四个角落。

```vue
<template>
  <ui-float-button position="right-bottom" />
  <ui-float-button position="left-bottom" />
  <ui-float-button position="right-top" />
  <ui-float-button position="left-top" />
</template>
```

## 自定义颜色

通过 `color` 设置背景色，`foreground-color` 设置前景色（图标和文字）。

```vue
<template>
  <ui-float-button color="#ff6b6b" />
  <ui-float-button color="linear-gradient(135deg, #667eea, #764ba2)" />
</template>
```

## Props

| 参数             | 说明                                | 类型                                                   | 默认值         |
| ---------------- | ----------------------------------- | ------------------------------------------------------ | -------------- |
| show             | 是否显示                            | `boolean`                                              | `true`         |
| icon             | 图标名称                            | `string`                                               | `plus`         |
| text             | 按钮文本                            | `string`                                               | -              |
| type             | 按钮类型                            | `primary \| success \| warning \| danger \| default`   | `primary`      |
| size             | 按钮尺寸                            | `string \| number`                                     | `100rpx`       |
| position         | 位置                                | `left-bottom \| right-bottom \| left-top \| right-top` | `right-bottom` |
| right            | 距离右侧/左侧的距离                 | `string \| number`                                     | `24rpx`        |
| bottom           | 距离底部/顶部的距离                 | `string \| number`                                     | `100rpx`       |
| z-index          | 元素层级                            | `string \| number`                                     | `100`          |
| color            | 自定义背景色                        | `string`                                               | -              |
| foreground-color | 前景色（图标和文字）                | `string`                                               | `#fff`         |
| icon-size        | 图标大小                            | `string \| number`                                     | `40rpx`        |
| disabled         | 是否禁用                            | `boolean`                                              | `false`        |
| loading          | 是否加载中                          | `boolean`                                              | `false`        |
| badge            | 徽标（true 显示红点，数字显示徽标） | `boolean \| string \| number`                          | `false`        |
| draggable        | 是否可拖拽                          | `boolean`                                              | `false`        |
| drag-boundary    | 是否限制拖拽边界                    | `boolean`                                              | `true`         |
| safe-area-bottom | 是否适配底部安全区域                | `boolean`                                              | `true`         |
| custom-class     | 自定义类名                          | `string`                                               | -              |
| custom-style     | 自定义样式                          | `string \| object`                                     | -              |

## Events

| 事件名      | 说明               | 回调参数          |
| ----------- | ------------------ | ----------------- |
| click       | 点击按钮时触发     | -                 |
| update:show | 显示状态变化时触发 | `(show: boolean)` |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |


<!-- AUTO-PROPS-SUPPLEMENT: ui-float-button -->
## FloatButton Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `offset-x` |
| `offset-y` |
| `magnetic` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-float-button -->
## FloatButton Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `drag-start` |
| `drag-move` |
| `drag-end` |

