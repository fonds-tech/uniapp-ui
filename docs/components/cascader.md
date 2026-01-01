# Cascader 级联选择

多级联动选择组件，用于省市区、地址等层级数据选择。

## 基础用法

```vue
<template>
  <ui-cell title="选择地区" :value="areaText || '请选择'" is-link @click="show = true" />

  <ui-popup v-model:show="show" mode="bottom" border-radius="24rpx 24rpx 0 0">
    <ui-cascader v-model="value" title="请选择地区" :options="options" @close="show = false" @finish="onFinish" />
  </ui-popup>
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const value = ref("")
const areaText = ref("")

const options = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110" },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        children: [
          { text: "海曙区", value: "330203" },
          { text: "江北区", value: "330205" },
        ],
      },
    ],
  },
]

function onFinish(data) {
  areaText.value = data.selectedOptions.map((item) => item.text).join("/")
  show.value = false
}
</script>
```

## 自定义颜色

通过 `active-color` 属性自定义选中项颜色。

```vue
<template>
  <ui-cascader v-model="value" title="请选择地区" :options="options" active-color="#07c160" @finish="onFinish" />
</template>
```

## 禁用选项

在选项中设置 `disabled: true` 可禁用该选项。

```vue
<script setup>
const options = [
  {
    text: "浙江省",
    value: "330000",
    children: [
      {
        text: "杭州市",
        value: "330100",
        children: [
          { text: "西湖区", value: "330106" },
          { text: "余杭区", value: "330110", disabled: true },
        ],
      },
      {
        text: "宁波市",
        value: "330200",
        disabled: true,
        children: [],
      },
    ],
  },
]
</script>
```

## Props

| 参数             | 说明                 | 类型               | 默认值                                                   |
| ---------------- | -------------------- | ------------------ | -------------------------------------------------------- |
| v-model          | 选中项的值           | `string \| number` | -                                                        |
| options          | 可选项数据源         | `CascaderOption[]` | `[]`                                                     |
| title            | 顶部标题             | `string`           | -                                                        |
| placeholder      | 未选中时的提示文案   | `string`           | `请选择`                                                 |
| color            | 选项文字颜色         | `string`           | `#323233`                                                |
| active-color     | 选中选项的颜色       | `string`           | -                                                        |
| swipeable        | 是否开启手势滑动切换 | `boolean`          | `true`                                                   |
| closeable        | 是否显示关闭图标     | `boolean`          | `true`                                                   |
| show-header      | 是否展示头部栏       | `boolean`          | `true`                                                   |
| close-icon       | 关闭图标名称         | `string`           | `cross`                                                  |
| close-icon-size  | 关闭图标大小         | `string \| number` | `32rpx`                                                  |
| close-icon-color | 关闭图标颜色         | `string`           | `#333333`                                                |
| field-keys       | 自定义字段名         | `object`           | `{ text: 'text', value: 'value', children: 'children' }` |
| before-change    | 切换前的回调函数     | `function`         | -                                                        |
| custom-class     | 自定义类名           | `string`           | -                                                        |
| custom-style     | 自定义样式           | `string \| object` | -                                                        |

## Events

| 事件名    | 说明                   | 回调参数                            |
| --------- | ---------------------- | ----------------------------------- |
| change    | 选中项变化时触发       | `{ value, selectedOptions, index }` |
| finish    | 全部选项选择完成时触发 | `{ value, selectedOptions, index }` |
| close     | 点击关闭图标时触发     | -                                   |
| click-tab | 点击标签时触发         | `{ index }`                         |

## Slots

| 名称  | 说明       |
| ----- | ---------- |
| title | 自定义标题 |
