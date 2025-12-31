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
