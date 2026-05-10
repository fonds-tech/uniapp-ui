# UiRate 组件

## 介绍

UiRate 评分组件，支持半星、自定义图标、滑动手势改分。

## 代码演示

```vue
<template>
  <ui-rate v-model="score" allow-half />
</template>

<script setup>
const score = ref(3.5)
</script>
```

## Props

| 参数          | 说明                              | 类型             | 默认值     |
| ------------- | --------------------------------- | ---------------- | ---------- |
| modelValue    | 当前分值 (v-model)                | number           | 0          |
| icon          | 选中态图标名                      | string           | "star"     |
| voidIcon      | 未选态图标名                      | string           | "star-o"   |
| count         | 总数量                            | number           | 5          |
| size          | 图标大小                          | string \| number | "40rpx"    |
| color         | 选中态颜色                        | string           | "primary"  |
| voidColor     | 未选态颜色                        | string           | "border"   |
| disabledColor | 禁用态颜色                        | string           | "border"   |
| gutter        | 图标间距                          | string \| number | "8rpx"     |
| iconWeight    | 图标字重                          | string \| number | -          |
| readonly      | 只读 (允许半星显示，禁止交互)     | boolean          | false      |
| touchable     | 滑动手势可改分                    | boolean          | true       |
| disabled      | 禁用                              | boolean          | false      |
| allowHalf     | 允许半星                          | boolean          | false      |
| customClass   | 自定义类名                        | string           | -          |
| customStyle   | 自定义样式                        | string \| object | -          |

## Events

| 事件名             | 说明        | 回调参数        |
| ------------------ | ----------- | --------------- |
| update:modelValue  | v-model 更新 | value: number   |
| change             | 评分变化     | value: number   |

## 实例方法

| 方法名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| resize | 重新测量布局   | -    |

## 注意事项

- 滑动手势改分由 `touchable` 控制，独立于 `readonly` / `disabled`
- `readonly + allowHalf` 模式下半星精确显示分数小数部分（不会强制取整到 0.5）
- 图标必须是 ui-icon 注册的名字，常用：`star/star-o`、`like/like-o`、`smile/smile-o`
