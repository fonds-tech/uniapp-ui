# PickerPanel 选择器面板

选择器核心面板组件，可嵌入任意容器中使用，不带弹出层。适用于需要自定义布局或内嵌选择器的场景。

## 基础用法

```vue
<template>
  <ui-picker-panel v-model="value" :columns="columns" />
</template>

<script setup>
import { ref } from "vue"

const value = ref([])
const columns = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
  { text: "深圳", value: "shenzhen" },
]
</script>
```

## 多列选择

通过传入二维数组实现多列选择。

```vue
<template>
  <ui-picker-panel v-model="value" :columns="columns" />
</template>

<script setup>
import { ref } from "vue"

const value = ref([])
const columns = [
  [
    { text: "周一", value: "mon" },
    { text: "周二", value: "tue" },
    { text: "周三", value: "wed" },
  ],
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
]
</script>
```

## 级联选择

通过 `children` 属性实现级联选择。

```vue
<template>
  <ui-picker-panel v-model="value" :columns="columns" />
</template>

<script setup>
import { ref } from "vue"

const value = ref([])
const columns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      { text: "杭州", value: "hangzhou" },
      { text: "宁波", value: "ningbo" },
    ],
  },
  {
    text: "江苏",
    value: "jiangsu",
    children: [
      { text: "南京", value: "nanjing" },
      { text: "苏州", value: "suzhou" },
    ],
  },
]
</script>
```

## 加载状态

通过 `loading` 属性显示加载状态。

```vue
<template>
  <ui-picker-panel :columns="[]" loading />
</template>
```

## 自定义样式

通过相关属性自定义选项样式。

```vue
<template>
  <ui-picker-panel
    v-model="value"
    :columns="columns"
    column-height="100rpx"
    :visible-column-num="7"
    column-color="#999"
    active-column-color="#1989fa"
    active-column-size="32rpx"
    active-column-weight="600"
  />
</template>
```

## 自定义字段名

通过 `column-fields` 自定义数据字段名。

```vue
<template>
  <ui-picker-panel v-model="value" :columns="columns" :column-fields="fieldNames" />
</template>

<script setup>
import { ref } from "vue"

const value = ref([])
const fieldNames = { text: "label", value: "id", children: "items" }
const columns = [
  { label: "选项一", id: "1" },
  { label: "选项二", id: "2" },
  { label: "选项三", id: "3" },
]
</script>
```

## Props

| 参数                 | 说明             | 类型               | 默认值                                                   |
| -------------------- | ---------------- | ------------------ | -------------------------------------------------------- |
| v-model              | 当前选中值       | `array`            | `[]`                                                     |
| columns              | 列数据           | `array`            | `[]`                                                     |
| loading              | 是否加载中       | `boolean`          | `false`                                                  |
| column-fields        | 字段映射         | `object`           | `{ text: 'text', value: 'value', children: 'children' }` |
| column-height        | 选项高度         | `string \| number` | `88rpx`                                                  |
| visible-column-num   | 可见选项数       | `string \| number` | `5`                                                      |
| column-size          | 选项文字大小     | `string \| number` | -                                                        |
| column-color         | 选项文字颜色     | `string`           | -                                                        |
| column-weight        | 选项文字字重     | `string \| number` | -                                                        |
| active-column-size   | 激活选项文字大小 | `string \| number` | -                                                        |
| active-column-color  | 激活选项文字颜色 | `string`           | -                                                        |
| active-column-weight | 激活选项文字字重 | `string \| number` | -                                                        |
| custom-class         | 自定义类名       | `string`           | -                                                        |
| custom-style         | 自定义样式       | `string \| object` | -                                                        |

## Events

| 事件名 | 说明           | 回调参数                                    |
| ------ | -------------- | ------------------------------------------- |
| change | 选项改变时触发 | `{ values, value, indexs, index, columns }` |

## Methods

通过 ref 调用组件方法：

| 方法名             | 说明                 | 参数                                       |
| ------------------ | -------------------- | ------------------------------------------ |
| getSelectedValues  | 获取当前选中值数组   | -                                          |
| getSelectedIndexs  | 获取当前选中索引数组 | -                                          |
| getSelectedColumns | 获取当前选中的列数据 | -                                          |
| getColumns         | 获取所有列数据       | -                                          |
| setColumnValue     | 设置指定列的值       | `(index: number, value: string \| number)` |

## 与 Picker 组件的区别

| 特性     | PickerPanel          | Picker            |
| -------- | -------------------- | ----------------- |
| 弹出层   | 无                   | 有                |
| 工具栏   | 无                   | 有(确认/取消按钮) |
| 使用场景 | 嵌入页面、自定义弹窗 | 独立弹出选择      |


<!-- AUTO-PROPS-SUPPLEMENT: ui-picker-panel -->
## PickerPanel Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `indicator-class` |
| `mask-style` |
| `mask-top-style` |
| `mask-bottom-style` |
| `mask-class` |
| `immediate-change` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-picker-panel -->
## PickerPanel Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `pickstart` |
| `pickend` |

