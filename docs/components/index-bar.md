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
