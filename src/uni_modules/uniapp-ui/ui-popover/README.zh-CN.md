# UiPopover 组件

## 介绍

UiPopover 气泡弹出框,围绕触发元素弹出菜单或自定义内容,支持 8 个方位 + 浅色/深色主题。

## 代码演示

```vue
<template>
  <ui-popover v-model:show="show" :actions="actions" @select="onSelect">
    <ui-button>点击弹出</ui-button>
  </ui-popover>
</template>

<script setup>
const show = ref(false)
const actions = [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }]
function onSelect(action) {
  console.log(action.text)
}
</script>
```

## Props

| 参数                | 说明                               | 类型             | 默认值   | 可选值                                                                        |
| ------------------- | ---------------------------------- | ---------------- | -------- | ----------------------------------------------------------------------------- |
| show                | 是否显示                           | boolean          | false    | -                                                                             |
| actions             | 操作选项数组                       | PopoverAction[]  | []       | -                                                                             |
| placement           | 弹出位置                           | PopoverPlacement | "bottom" | top / top-start / top-end / bottom / bottom-start / bottom-end / left / right |
| theme               | 主题风格                           | PopoverTheme     | "light"  | light / dark                                                                  |
| trigger             | 触发方式                           | PopoverTrigger   | "click"  | click / manual                                                                |
| offset              | 偏移量 [x, y]                      | [number, number] | [0, 8]   | -                                                                             |
| showArrow           | 显示箭头                           | boolean          | true     | -                                                                             |
| closeOnClickAction  | 点击选项后自动关闭                 | boolean          | true     | -                                                                             |
| closeOnClickOutside | 点击外部区域自动关闭 (见下方平台差异) | boolean          | true     | -                                                                             |
| duration            | 动画时长 (ms)                      | number           | 200      | -                                                                             |
| zIndex              | 元素层级                           | string \| number | -        | -                                                                             |
| overlay             | 显示遮罩层                         | boolean          | false    | -                                                                             |
| overlayStyle        | 遮罩层样式                         | string \| object | -        | -                                                                             |
| customClass         | 自定义类名                         | string           | ""       | -                                                                             |
| customStyle         | 自定义样式                         | string \| object | ""       | -                                                                             |

## Events

| 事件名       | 说明          | 回调参数                             |
| ------------ | ------------- | ------------------------------------ |
| update:show  | show 双向绑定 | show: boolean                        |
| select       | 选中操作项    | action: PopoverAction, index: number |
| open         | 弹层打开      | -                                    |
| opened       | 打开动画结束  | -                                    |
| close        | 弹层关闭      | -                                    |
| closed       | 关闭动画结束  | -                                    |
| clickOutside | 点击外部区域  | -                                    |

## 实例方法

| 方法名 | 说明                                       | 参数 |
| ------ | ------------------------------------------ | ---- |
| resize | 手动重测触发元素与气泡尺寸 (用于异步内容） | -    |

## Slots

| 名称    | 说明                                 |
| ------- | ------------------------------------ |
| default | 触发元素                             |
| content | 自定义气泡内容,覆盖默认 actions 渲染 |

## CSS 变量

| 变量名                    | 默认值                       | 说明                |
| ------------------------- | ---------------------------- | ------------------- |
| --ui-popover-shadow       | 0 4rpx 24rpx rgba(0,0,0,.12) | 气泡阴影            |
| --ui-popover-arrow-size   | 16rpx                        | 箭头尺寸            |
| --ui-popover-light-bg     | var(--ui-color-background)   | 浅色主题背景        |
| --ui-popover-light-color  | var(--ui-color-text)         | 浅色主题文字        |
| --ui-popover-dark-bg      | var(--ui-gray-9)             | 深色主题背景        |
| --ui-popover-dark-color   | var(--ui-color-text-inverse) | 深色主题文字        |
| --ui-popover-dark-divider | rgba(255, 255, 255, 0.1)     | 深色分割线/激活背景 |

## 平台行为差异

`closeOnClickOutside` 行为依平台而异：

- **H5**：监听 `document` 全局点击，点击 popover 外任意位置自动关闭，与主流 Web UI 库一致
- **小程序 / App**：受平台限制无 document 事件，仅当 `overlay=true` 时点击遮罩关闭。无遮罩需点击触发元素或调用 `close()` 方法手动关闭

需在小程序端实现外部点击关闭，请显式开启 `overlay`（可配合 `overlayStyle` 调透明度做轻量遮罩）。

## 类型定义

```typescript
interface PopoverAction {
  id?: string | number
  text: string
  icon?: string
  disabled?: boolean
  className?: string
}
```
