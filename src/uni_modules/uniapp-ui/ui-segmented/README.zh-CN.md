# UiSegmented 组件

## 介绍

UiSegmented 分段控制器，多选项中切换一个，常用于视图切换、周期切换、状态筛选等。

## 代码演示

### 基础用法

```vue
<ui-segmented v-model="value" :options="options" block />
```

### 样式类型

```vue
<ui-segmented v-model="value" :options="options" type="filled" />
<ui-segmented v-model="value" :options="options" type="outline" />
<ui-segmented v-model="value" :options="options" type="block" />
```

### 滚动模式

选项过多时启用横向滚动；此模式下浮动 indicator 不渲染，改由激活项背景呈现。

```vue
<ui-segmented v-model="value" :options="manyOptions" scrollable />
```

### 带图标 / 禁用

```vue
<ui-segmented v-model="value" :options="iconOptions" />
<ui-segmented v-model="value" :options="options" disabled />
```

## Props

| 参数              | 说明               | 类型              | 默认值   | 可选值                   |
| ----------------- | ------------------ | ----------------- | -------- | ------------------------ |
| modelValue        | 选中值 (v-model)   | string \| number  | -        | -                        |
| options           | 选项列表           | SegmentedOption[] | []       | -                        |
| disabled          | 整体禁用           | boolean           | false    | -                        |
| type              | 样式类型           | string            | "filled" | filled / outline / block |
| block             | 撑满父容器         | boolean           | false    | -                        |
| round             | 胶囊圆角           | boolean           | true     | -                        |
| radius            | 自定义圆角         | string \| number  | -        | -                        |
| scrollable        | 横向滚动           | boolean           | false    | -                        |
| height            | 选项高度           | string \| number  | "56rpx"  | -                        |
| fontSize          | 字体大小           | string \| number  | "28rpx"  | -                        |
| itemPadding       | 选项左右内边距     | string \| number  | "24rpx"  | -                        |
| indicatorGap      | 滑块与容器边缘间距 | string \| number  | "4rpx"   | -                        |
| activeColor       | 激活项滑块背景色   | string            | -        | -                        |
| activeTextColor   | 激活项文字颜色     | string            | -        | -                        |
| inactiveColor     | 未激活项背景色     | string            | -        | -                        |
| inactiveTextColor | 未激活项文字颜色   | string            | -        | -                        |
| customClass       | 自定义类名         | string            | -        | -                        |
| customStyle       | 自定义样式         | string \| object  | -        | -                        |

### SegmentedOption

```ts
interface SegmentedOption {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
}
```

## Events

| 事件名            | 说明                      | 回调参数                       |
| ----------------- | ------------------------- | ------------------------------ |
| update:modelValue | v-model 更新              | value: string \| number        |
| change            | 值变化                    | value: string \| number        |
| click             | 点击选项 (含禁用项也触发) | option: SegmentedOption, index |
