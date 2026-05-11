# UiProgress 组件

## 介绍

UiProgress 进度条组件，展示任务完成度。支持文字位置切换、自定义颜色（含渐变）、自定义高度，达到 100% 触发 finish 事件。

## 代码演示

```vue
<template>
  <ui-progress :percentage="60" />
  <ui-progress :percentage="80" color="success" text-position="outside" />
  <ui-progress :percentage="100" color="linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)" @finish="onFinish" />
</template>
```

## Props

| 参数         | 说明                                                  | 类型             | 默认值   | 可选值                  |
| ------------ | ----------------------------------------------------- | ---------------- | -------- | ----------------------- |
| percentage   | 百分比 (0-100，超出自动夹紧)                          | number \| string | 0        | -                       |
| color        | 进度填充色（语义色名 / hex / rgba / linear-gradient） | string           | -        | -                       |
| trackColor   | 轨道背景色                                            | string           | -        | -                       |
| text         | 进度文本（不填则显示 `${percentage}%`）               | string           | -        | -                       |
| showText     | 显示进度文本                                          | boolean          | true     | -                       |
| textPosition | 文本位置                                              | string           | "inside" | inside / outside / none |
| textColor    | 文本颜色                                              | string           | -        | -                       |
| textSize     | 文本字号                                              | string \| number | -        | -                       |
| textWeight   | 文本字重                                              | string \| number | -        | -                       |
| height       | 进度条高度                                            | string \| number | -        | -                       |
| customClass  | 自定义类名                                            | string           | -        | -                       |
| customStyle  | 自定义样式                                            | string \| object | -        | -                       |

## Events

| 事件名 | 说明                             | 回调参数 |
| ------ | -------------------------------- | -------- |
| finish | 百分比从非 100 跨入 100 触发一次 | -        |

## Slots

| 名称 | 说明                               | 作用域参数             |
| ---- | ---------------------------------- | ---------------------- |
| text | 自定义进度文本（覆盖默认文字渲染） | { percentage: number } |

## CSS 变量

进度条颜色 / 轨道色通过 SCSS 默认值 (`--ui-color-primary` / `--ui-color-border-light`) 兜底。如需全局覆盖，通过 `ui-config-provider` 或重写 token。

## 注意事项

- `textPosition="inside"` 时进度低于 10% 会强制 `left: 10%`，避免文字被 `transform: translate(-100%)` 推出左侧
- `color` 支持 `linear-gradient(...)`，作为 `background` 使用
- `finish` 仅在跨边界（< 100 → 100）触发一次，重置后再次到 100 会再次触发
