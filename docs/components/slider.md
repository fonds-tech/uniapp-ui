# Slider 滑块

用于在一定范围内进行数值选择，支持单滑块和双滑块（范围选择）模式。

## 基础用法

```vue
<template>
  <ui-slider v-model="value" />
</template>

<script setup>
import { ref } from "vue"
const value = ref(50)
</script>
```

## 设置范围

通过 `min` 和 `max` 属性设置取值范围。

```vue
<template>
  <ui-slider v-model="value" :min="0" :max="200" />
</template>
```

## 设置步长

通过 `step` 属性设置步长，步长值必须大于 0。

```vue
<template>
  <ui-slider v-model="value" :step="10" />
</template>
```

## 范围选择

设置 `range` 属性为 `true` 开启双滑块模式，支持范围选择。

```vue
<template>
  <ui-slider v-model="rangeValue" range />
</template>

<script setup>
import { ref } from "vue"
const rangeValue = ref([20, 80])
</script>
```

## 显示当前值

通过 `show-value` 属性显示当前值提示。

```vue
<template>
  <!-- 拖动时显示 -->
  <ui-slider v-model="value" show-value />

  <!-- 始终显示 -->
  <ui-slider v-model="value" show-value show-value-mode="always" />
</template>
```

## 自定义颜色

通过 `active-color` 和 `inactive-color` 属性设置轨道颜色。

```vue
<template>
  <ui-slider v-model="value" active-color="#ee0a24" inactive-color="#ebedf0" />
</template>
```

## 自定义按钮

通过插槽自定义滑块按钮。

```vue
<template>
  <ui-slider v-model="value">
    <template #button="{ value, dragging }">
      <view class="custom-button">{{ value }}</view>
    </template>
  </ui-slider>
</template>
```

## 刻度标记

通过 `marks` 属性设置刻度标记。

```vue
<template>
  <ui-slider
    v-model="value"
    :marks="{
      0: '0%',
      25: '25%',
      50: '50%',
      75: '75%',
      100: '100%'
    }"
  />
</template>
```

## 垂直方向

设置 `vertical` 属性为 `true` 可垂直展示滑块。

```vue
<template>
  <ui-slider v-model="value" vertical />
</template>
```

## 禁用状态

设置 `disabled` 属性禁用滑块。

```vue
<template>
  <ui-slider v-model="value" disabled />
</template>
```

## 格式化显示值

通过 `format-value` 属性格式化显示的值。

```vue
<template>
  <ui-slider
    v-model="value"
    show-value
    show-value-mode="always"
    :format-value="(val) => `${val}%`"
  />
</template>
```

## Props

| 参数            | 说明                         | 类型                                                          | 默认值     |
| --------------- | ---------------------------- | ------------------------------------------------------------- | ---------- |
| v-model         | 绑定值，范围模式时为数组     | `number \| [number, number]`                                  | `0`        |
| min             | 最小值                       | `number`                                                      | `0`        |
| max             | 最大值                       | `number`                                                      | `100`      |
| step            | 步长                         | `number`                                                      | `1`        |
| range           | 是否为范围选择（双滑块模式） | `boolean`                                                     | `false`    |
| vertical        | 是否垂直展示                 | `boolean`                                                     | `false`    |
| disabled        | 是否禁用                     | `boolean`                                                     | `false`    |
| readonly        | 是否只读                     | `boolean`                                                     | `false`    |
| show-value      | 是否显示值提示               | `boolean`                                                     | `false`    |
| show-value-mode | 值提示显示模式               | `always \| dragging \| never`                                 | `dragging` |
| marks           | 刻度标记                     | `Record<number, string \| { label: string; style?: object }>` | -          |
| bar-height      | 轨道高度                     | `number \| string`                                            | `4`        |
| button-size     | 滑块按钮尺寸                 | `number \| string`                                            | `24`       |
| active-color    | 激活轨道颜色                 | `string`                                                      | -          |
| inactive-color  | 非激活轨道颜色               | `string`                                                      | -          |
| button-color    | 滑块按钮颜色                 | `string`                                                      | -          |
| format-value    | 格式化显示值函数             | `(value: number) => string`                                   | -          |
| custom-class    | 自定义类名                   | `string`                                                      | -          |
| custom-style    | 自定义样式                   | `string \| object`                                            | -          |

## Events

| 事件名            | 说明                   | 回调参数                                           |
| ----------------- | ---------------------- | -------------------------------------------------- |
| update:modelValue | 值变化完成时触发       | `value: number \| [number, number]`                |
| change            | 拖动过程中值变化时触发 | `value: number \| [number, number]`                |
| drag-start        | 开始拖动时触发         | `value: number \| [number, number], index: number` |
| drag-end          | 拖动结束时触发         | `value: number \| [number, number], index: number` |

## Slots

| 名称         | 说明                           | 参数                                   |
| ------------ | ------------------------------ | -------------------------------------- |
| button       | 自定义单滑块按钮（非范围模式） | `{ value: number, dragging: boolean }` |
| left-button  | 自定义左侧滑块按钮（范围模式） | `{ value: number, dragging: boolean }` |
| right-button | 自定义右侧滑块按钮（范围模式） | `{ value: number, dragging: boolean }` |

## 主题定制

### CSS 变量

组件提供了以下 CSS 变量，可用于自定义样式：

| 名称                       | 默认值 | 说明           |
| -------------------------- | ------ | -------------- |
| --ui-color-primary         | -      | 激活轨道颜色   |
| --ui-color-background      | -      | 滑块按钮颜色   |
| --ui-color-background-dark | -      | 非激活轨道颜色 |
| --ui-color-text-main       | -      | 值提示背景颜色 |
| --ui-font-size-xs          | -      | 值提示文字大小 |
| --ui-radius-round          | -      | 圆角大小       |

## 注意事项

1. `step` 步长值必须大于 0
2. 范围模式下，左值始终小于等于右值
3. 垂直模式下，需要设置容器高度或使用默认高度（300rpx）
4. 在小程序中，建议使用 `touch` 事件而非 `click` 事件以获得更好的体验
