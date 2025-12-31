# Picker 选择器

弹出式选择器组件，支持单列、多列和级联选择。

## 基础用法

```vue
<template>
  <ui-cell title="选择城市" :value="city || '请选择'" is-link @click="show = true" />
  <ui-picker v-model="city" v-model:show="show" title="选择城市" :columns="columns" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const city = ref("")
const columns = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
  { text: "深圳", value: "shenzhen" },
]
</script>
```

## 多列选择

通过传入多维数组实现多列选择。

```vue
<template>
  <ui-cell title="选择时间" :value="timeText" is-link @click="show = true" />
  <ui-picker v-model="time" v-model:show="show" title="选择时间" :columns="timeColumns" />
</template>

<script setup>
import { ref, computed } from "vue"

const show = ref(false)
const time = ref([])
const timeColumns = [
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
  [
    { text: "9:00", value: "9" },
    { text: "10:00", value: "10" },
    { text: "11:00", value: "11" },
  ],
]

const timeText = computed(() => {
  return time.value.length > 0 ? time.value.join(" ") : "请选择"
})
</script>
```

## 级联选择

通过 `children` 属性实现级联选择。

```vue
<template>
  <ui-picker v-model="area" v-model:show="show" title="选择地区" :columns="areaColumns" />
</template>

<script setup>
import { ref } from "vue"

const areaColumns = [
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
  <ui-picker v-model:show="show" title="加载中" :columns="[]" loading />
</template>
```
