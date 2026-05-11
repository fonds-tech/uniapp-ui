# UiSidebar 组件

## 介绍

侧边栏导航容器。配合 `ui-sidebar-item` 使用。

## 代码演示

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>

<script setup lang="ts">
const active = ref(0)
</script>
```

## Props

| 参数              | 说明                                          | 类型                                                  | 默认值                |
| ----------------- | --------------------------------------------- | ----------------------------------------------------- | --------------------- |
| modelValue        | 绑定值（与 item.name 对应，缺省回退到 index） | [Number, String]                                      | `0`                   |
| width             | 宽度                                          | [Number, String]                                      | `300rpx`（SCSS 默认） |
| height            | 高度                                          | [Number, String]                                      | `100%`（SCSS 默认）   |
| duration          | 激活线条动画过渡时间（ms）                    | Number                                                | `300`                 |
| background        | 背景颜色                                      | string                                                | -                     |
| lineColor         | 激活线条颜色                                  | string                                                | -                     |
| lineWidth         | 激活线条宽度                                  | [Number, String]                                      | -                     |
| lineHeight        | 激活线条高度，传 `"100%"` 时拉满当前项高度    | [Number, String]                                      | `40rpx`               |
| lineRadius        | 激活线条圆角                                  | [Number, String]                                      | -                     |
| showLine          | 是否显示激活线条                              | Boolean                                               | `true`                |
| autoScroll        | 选中项自动滚动到可见区域                      | Boolean                                               | `true`                |
| titleColor        | 子项标题颜色（item 同名 prop 覆盖）           | string                                                | -                     |
| titleSize         | 子项标题大小                                  | [Number, String]                                      | -                     |
| titleWeight       | 子项标题粗细                                  | [Number, String]                                      | -                     |
| titleAlign        | 子项标题对齐方式                              | string                                                | -                     |
| activeTitleColor  | 子项激活标题颜色                              | string                                                | -                     |
| activeTitleSize   | 子项激活标题大小                              | [Number, String]                                      | -                     |
| activeTitleWeight | 子项激活标题粗细                              | [Number, String]                                      | -                     |
| activeBackground  | 子项激活背景颜色                              | string                                                | -                     |
| zIndex            | 元素层级                                      | [Number, String]                                      | -                     |
| customClass       | 自定义类名                                    | string                                                | -                     |
| customStyle       | 自定义样式                                    | [String, Object] as PropType<string \| CSSProperties> | -                     |

## Events

| 事件名            | 说明                           | 回调参数                              |
| ----------------- | ------------------------------ | ------------------------------------- |
| change            | 选中项变化                     | name: number \| string                |
| clickItem         | 点击选项（无论是否禁用）       | name: number \| string, index: number |
| update:modelValue | v-model 同步（仅匹配到时触发） | name: number \| string                |

## Slots

| 名称    | 说明                      |
| ------- | ------------------------- |
| default | 默认插槽，放 sidebar-item |
| line    | 自定义激活线条内容        |

## 实例方法

| 方法名 | 说明                   | 参数                     |
| ------ | ---------------------- | ------------------------ |
| resize | 重测自身与所有子项布局 | `isChildrensResize=true` |
