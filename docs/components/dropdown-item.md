# DropdownItem 下拉菜单项

下拉菜单的菜单项组件，需配合 `DropdownMenu` 使用。

## 基础用法

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value1" :options="options1" />
    <ui-dropdown-item v-model="value2" :options="options2" />
  </ui-dropdown-menu>
</template>

<script setup>
import { ref } from "vue"

const value1 = ref("")
const value2 = ref("")
const options1 = [
  { label: "全部商品", value: "" },
  { label: "新款商品", value: "new" },
  { label: "活动商品", value: "activity" },
]
const options2 = [
  { label: "默认排序", value: "" },
  { label: "好评排序", value: "rating" },
  { label: "销量排序", value: "sales" },
]
</script>
```

## 多选模式

设置 `mode="multiple"` 开启多选模式。

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value" :options="options" mode="multiple" />
  </ui-dropdown-menu>
</template>

<script setup>
import { ref } from "vue"

const value = ref([])
const options = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
]
</script>
```

## 自定义标题

通过 `title` 属性设置菜单标题。

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value" :options="options" title="自定义标题" />
  </ui-dropdown-menu>
</template>
```

## 禁用状态

设置 `disabled` 属性禁用菜单项。

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value" :options="options" disabled />
  </ui-dropdown-menu>
</template>
```

## Props

| 参数                   | 说明             | 类型                        | 默认值   |
| ---------------------- | ---------------- | --------------------------- | -------- |
| v-model                | 绑定值           | `string \| number \| array` | -        |
| mode                   | 菜单模式         | `single \| multiple`        | `single` |
| title                  | 菜单项标题       | `string \| number`          | -        |
| options                | 配置项数据       | `array`                     | `[]`     |
| disabled               | 是否禁用         | `boolean`                   | `false`  |
| min-height             | 菜单最小高度     | `string \| number`          | `auto`   |
| max-height             | 菜单最大高度     | `string \| number`          | `60vh`   |
| title-color            | 标题颜色         | `string`                    | -        |
| title-size             | 标题大小         | `string \| number`          | -        |
| title-weight           | 标题粗细         | `string \| number`          | -        |
| active-title-color     | 激活标题颜色     | `string`                    | -        |
| active-title-size      | 激活标题大小     | `string \| number`          | -        |
| active-title-weight    | 激活标题粗细     | `string \| number`          | -        |
| icon                   | 图标             | `string`                    | -        |
| icon-size              | 图标大小         | `string \| number`          | -        |
| icon-color             | 图标颜色         | `string`                    | -        |
| icon-weight            | 图标粗细         | `string \| number`          | -        |
| active-icon-color      | 激活图标颜色     | `string`                    | -        |
| show-icon              | 是否显示图标     | `boolean`                   | `true`   |
| overlay                | 是否显示遮罩层   | `boolean`                   | `true`   |
| duration               | 动画时长(ms)     | `string \| number`          | -        |
| direction              | 展开方向         | `up \| down`                | -        |
| background             | 菜单背景颜色     | `string`                    | -        |
| border-radius          | 菜单圆角值       | `string \| number`          | -        |
| option-size            | 选项文字大小     | `string \| number`          | -        |
| option-color           | 选项文字颜色     | `string`                    | -        |
| option-weight          | 选项文字粗细     | `string \| number`          | -        |
| active-option-size     | 激活选项文字大小 | `string \| number`          | -        |
| active-option-color    | 激活选项文字颜色 | `string`                    | -        |
| active-option-weight   | 激活选项文字粗细 | `string \| number`          | -        |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean`                   | `true`   |
| z-index                | 弹出层层级       | `string \| number`          | -        |
| label-field            | 选项名称字段     | `string`                    | `label`  |
| value-field            | 选项值字段       | `string`                    | `value`  |
| custom-class           | 自定义类名       | `string`                    | -        |
| custom-style           | 自定义样式       | `string \| object`          | -        |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| change | 选中值变化时触发   | `value`  |
| open   | 打开菜单时触发     | -        |
| opened | 打开动画结束时触发 | -        |
| close  | 关闭菜单时触发     | -        |
| closed | 关闭动画结束时触发 | -        |
