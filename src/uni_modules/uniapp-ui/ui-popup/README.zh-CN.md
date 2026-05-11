# UiPopup 组件

## 介绍

UiPopup 弹出层组件,用于展示弹窗、信息提示、模态选择面板等。支持 5 个方向（上/下/左/右/居中）+ 遮罩层 + 安全区适配。

## 代码演示

```vue
<template>
  <ui-button @click="show = true">弹出</ui-button>
  <ui-popup v-model:show="show" mode="bottom">
    <view style="padding: 48rpx">弹出内容</view>
  </ui-popup>
</template>

<script setup>
const show = ref(false)
</script>
```

## Props

| 参数                | 说明             | 类型             | 默认值   | 可选值                                            |
| ------------------- | ---------------- | ---------------- | -------- | ------------------------------------------------- |
| show                | 是否显示         | boolean          | false    | -                                                 |
| mode                | 显示模式         | PopupMode        | "bottom" | top / bottom / left / right / center              |
| width               | 宽度             | string \| number | -        | -                                                 |
| height              | 高度             | string \| number | -        | -                                                 |
| maxWidth            | 最大宽度         | string \| number | -        | -                                                 |
| maxHeight           | 最大高度         | string \| number | -        | -                                                 |
| overlay             | 显示遮罩层       | boolean          | true     | -                                                 |
| duration            | 动画时长 (ms)    | number           | 300      | -                                                 |
| zIndex              | 元素层级         | string \| number | -        | -                                                 |
| background          | 背景色           | string           | -        | -                                                 |
| closeable           | 显示关闭按钮     | boolean          | false    | -                                                 |
| closeIcon           | 关闭按钮图标名   | string           | "cross"  | -                                                 |
| closeIconPosition   | 关闭按钮位置     | string           | -        | top-left / top-right / bottom-left / bottom-right |
| borderRadius        | 圆角大小         | string \| number | -        | -                                                 |
| closeOnClickOverlay | 点击遮罩自动关闭 | boolean          | true     | -                                                 |
| lazyRender          | 显示时才挂载节点 | boolean          | true     | -                                                 |
| safeAreaInsetTop    | 顶部安全区填充   | boolean          | false    | -                                                 |
| safeAreaInsetBottom | 底部安全区填充   | boolean          | true     | -                                                 |
| overlayStyle        | 遮罩自定义样式   | string \| object | -        | -                                                 |
| customClass         | 自定义类名       | string           | -        | -                                                 |
| customStyle         | 自定义样式       | string \| object | -        | -                                                 |

## Events

| 事件名       | 说明            | 回调参数                                   |
| ------------ | --------------- | ------------------------------------------ |
| update:show  | show 双向绑定   | show: boolean                              |
| open         | 弹出 (动画开始) | -                                          |
| opened       | 弹出动画结束    | -                                          |
| close        | 关闭 (动画开始) | action: "external" \| "close" \| "overlay" |
| closed       | 关闭动画结束    | action: "external" \| "close" \| "overlay" |
| click        | 点击 popup 主体 | -                                          |
| clickClose   | 点击关闭按钮    | -                                          |
| clickOverlay | 点击遮罩        | -                                          |

`close` 事件 action 取值含义：

- `external`：外部修改 `props.show=false` 触发
- `close`：用户点击关闭按钮触发
- `overlay`：用户点击遮罩触发

## Slots

| 名称    | 说明                                   |
| ------- | -------------------------------------- |
| default | 弹层主体内容（包裹在可滚动区）         |
| header  | 头部固定区域 (不滚动)                  |
| footer  | 底部固定区域 (不滚动)                  |
| close   | 自定义关闭按钮内容                     |
| outside | 弹层之外的额外节点 (位于 panel 内最末) |

## 实例方法

| 方法名 | 说明 | 参数                                        |
| ------ | ---- | ------------------------------------------- |
| open   | 打开 | -                                           |
| close  | 关闭 | action?: "external" \| "close" \| "overlay" |

## CSS 变量

| 变量名                   | 默认值                         | 说明                |
| ------------------------ | ------------------------------ | ------------------- |
| --ui-popup-border-radius | var(--ui-radius-lg)            | 圆角                |
| --ui-popup-close-color   | var(--ui-color-text-secondary) | 关闭按钮颜色        |
| --ui-popup-close-size    | var(--ui-icon-size-sm)         | 关闭按钮字号        |
| --ui-popup-side-width    | 60vw                           | left/right 模式宽度 |

## 类型定义

```typescript
type PopupMode = "top" | "bottom" | "left" | "right" | "center"
type PopupCloseIconPosition = "" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
type PopupCloseAction = "external" | "close" | "overlay"
```
