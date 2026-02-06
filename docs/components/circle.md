# Circle 圆环进度

用于展示环形进度，支持渐变颜色和自定义文本。

## 基础用法

```vue
<template>
  <ui-circle v-model="percent" :rate="percent" />
</template>

<script setup>
import { ref } from "vue"
const percent = ref(60)
</script>
```

## Props

| 参数            | 说明                                | 类型                                                         | 默认值     |
| --------------- | ----------------------------------- | ------------------------------------------------------------ | ---------- |
| v-model         | 当前进度（0-100）                   | `number`                                                     | `0`        |
| rate            | 目标进度（0-100）                   | `number`                                                     | `100`      |
| size            | 圆环直径                            | `string \| number`                                           | `200rpx`   |
| color           | 进度条颜色                          | `string \| Record<string, string>`                           | -          |
| layer-color     | 轨道颜色                            | `string`                                                     | -          |
| fill            | 填充颜色                            | `string`                                                     | `transparent` |
| speed           | 动画速度（每秒增加的进度）          | `number`                                                     | `50`       |
| text            | 文本内容                            | `string`                                                     | -          |
| stroke-width    | 进度条宽度                          | `string \| number`                                           | `8rpx`     |
| stroke-linecap  | 端点样式                            | `round \| butt \| square`                                    | `round`    |
| clockwise       | 是否顺时针                          | `boolean`                                                    | `true`     |
| start-position  | 起始位置                            | `top \| right \| bottom \| left`                             | `top`      |
| custom-class    | 自定义类名                          | `string`                                                     | `""`      |
| custom-style    | 自定义样式                          | `string \| object`                                           | -          |

## Events

| 事件名           | 说明             | 回调参数 |
| ---------------- | ---------------- | -------- |
| update:modelValue | 更新当前进度     | `value: number` |
| finish           | 动画结束时触发   | -        |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 中心内容区域   |