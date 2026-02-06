# IndexBar 索引栏

索引导航组件，常用于城市选择、联系人列表等场景。

## 基础用法

```vue
<template>
  <ui-index-bar :indexs="indexList" @select="onSelect">
    <template v-for="letter in indexList" :key="letter">
      <ui-index-anchor :index="letter" />
      <ui-cell v-for="item in getItemsByLetter(letter)" :key="item" :title="item" />
    </template>
  </ui-index-bar>
</template>

<script setup>
import { ref } from "vue"

const indexList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const cityData = {
  A: ["阿坝", "安康", "安庆"],
  B: ["北京", "保定", "宝鸡"],
  C: ["成都", "重庆", "长沙"],
  // ...更多数据
}

function getItemsByLetter(letter) {
  return cityData[letter] || []
}

function onSelect(index) {
  uni.showToast({ title: `选择了 ${index}`, icon: "none" })
}
</script>
```

## IndexBar Props

| 参数         | 说明         | 类型                   | 默认值 |
| ------------ | ------------ | ---------------------- | ------ |
| indexs       | 索引字符列表 | `(string \| number)[]` | `[]`   |
| z-index      | 层级         | `string \| number`     | `1`    |
| sticky       | 是否自动吸顶 | `boolean`              | `true` |
| custom-class | 自定义类名   | `string`               | -      |
| custom-style | 自定义样式   | `string \| object`     | -      |

## IndexBar Events

| 事件名 | 说明               | 回调参数                  |
| ------ | ------------------ | ------------------------- |
| select | 点击索引字符时触发 | `index: string \| number` |

## IndexBar Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 列表内容 |

## IndexAnchor Props

| 参数  | 说明     | 类型               | 默认值 |
| ----- | -------- | ------------------ | ------ |
| index | 索引字符 | `string \| number` | -      |

<!-- AUTO-METHODS-SUPPLEMENT: ui-index-bar -->
## IndexBar Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `resize` |

