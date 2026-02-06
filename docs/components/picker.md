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

## Props

| 参数                   | 说明               | 类型                                       | 默认值                                                   |
| ---------------------- | ------------------ | ------------------------------------------ | -------------------------------------------------------- |
| v-model                | 当前选中值         | `string \| number \| array`                | -                                                        |
| v-model:show           | 是否显示           | `boolean`                                  | `false`                                                  |
| columns                | 列数据             | `array`                                    | `[]`                                                     |
| title                  | 顶部标题           | `string`                                   | -                                                        |
| loading                | 是否加载中         | `boolean`                                  | `false`                                                  |
| cancel-text            | 取消按钮文字       | `string`                                   | `取消`                                                   |
| confirm-text           | 确认按钮文字       | `string`                                   | `确认`                                                   |
| show-header            | 是否显示头部       | `boolean`                                  | `true`                                                   |
| mode                   | 弹窗位置           | `top \| bottom \| left \| right \| center` | `bottom`                                                 |
| border-radius          | 圆角大小           | `string \| number`                         | `16rpx`                                                  |
| close-on-click-overlay | 点击遮罩是否关闭   | `boolean`                                  | `true`                                                   |
| overlay                | 是否显示遮罩       | `boolean`                                  | `true`                                                   |
| duration               | 动画时长(ms)       | `string \| number`                         | `300`                                                    |
| z-index                | 层级               | `number`                                   | -                                                        |
| column-height          | 选项高度           | `string \| number`                         | `88rpx`                                                  |
| visible-column-num     | 可见选项数         | `string \| number`                         | `5`                                                      |
| column-fields          | 字段映射           | `object`                                   | `{ text: 'text', value: 'value', children: 'children' }` |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean`                                  | `true`                                                   |
| custom-class           | 自定义类名         | `string`                                   | -                                                        |
| custom-style           | 自定义样式         | `string \| object`                         | -                                                        |

## Events

| 事件名  | 说明               | 回调参数                      |
| ------- | ------------------ | ----------------------------- |
| change  | 选项改变时触发     | `{ values, indexs, columns }` |
| confirm | 点击确认按钮时触发 | `{ values, indexs, columns }` |
| cancel  | 点击取消按钮时触发 | `{ values, indexs, columns }` |
| open    | 打开时触发         | -                             |
| opened  | 打开动画结束时触发 | -                             |
| close   | 关闭时触发         | `action: string`              |
| closed  | 关闭动画结束时触发 | `action: string`              |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| toolbar | 自定义工具栏 |
| title   | 自定义标题   |


<!-- AUTO-PROPS-SUPPLEMENT: ui-picker -->
## Picker Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `show` |
| `background` |
| `column-size` |
| `column-color` |
| `column-weight` |
| `active-column-size` |
| `active-column-color` |
| `active-column-weight` |
| `indicator-class` |
| `mask-style` |
| `mask-top-style` |
| `mask-bottom-style` |
| `mask-class` |
| `immediate-change` |

<!-- AUTO-EVENTS-SUPPLEMENT: ui-picker -->
## Picker Events 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 事件名 |
| --- |
| `pickstart` |
| `pickend` |

<!-- AUTO-METHODS-SUPPLEMENT: ui-picker -->
## Picker Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `get-selected-values` |
| `get-selected-indexs` |
| `get-selected-columns` |

