# Slider 滑块

数值选择，支持单滑块、范围（双滑块）、垂直方向、刻度标记、自定义把手。

## 基础用法

```vue
<template>
  <ui-slider v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```

## 设置范围 / 步长

```vue
<ui-slider v-model="value" :min="0" :max="200" :step="10" />
```

## 范围选择

```vue
<ui-slider v-model="rangeValue" range />
```

`range=true` 时 `modelValue` 为 `[number, number]`。拖动越过另一 handle 时自动**交换** draggingIndex（继续拖动会拖另一个）。

## 显示当前值

```vue
<!-- 拖动时显示 -->
<ui-slider v-model="value" show-value />
<!-- 始终显示 -->
<ui-slider v-model="value" show-value show-value-mode="always" />
```

## 自定义颜色

```vue
<ui-slider v-model="value" active-color="primary" inactive-color="#ebedf0" handle-color="#fff" />
```

## 自定义把手

```vue
<ui-slider v-model="value">
  <template #handle="{ value, dragging }">
    <view class="custom-handle">{{ value }}</view>
  </template>
</ui-slider>
```

`range` 模式用 `#left-handle` / `#right-handle`。

## 刻度标记

```vue
<ui-slider
  v-model="value"
  :marks="{ 0: '0%', 50: '50%', 100: '100%' }"
/>
```

`marks` 值支持 `string` 或 `{ label, style }` 自定义标签样式。

## 垂直方向

```vue
<ui-slider v-model="value" vertical />
```

垂直模式父容器需给高度，组件自带 `min-height: 200rpx`。

## 格式化

```vue
<ui-slider v-model="value" :format-value="v => `${v}%`" />
```

## API

### Props

| 参数            | 说明                                  | 类型                                                          | 默认值       |
| --------------- | ------------------------------------- | ------------------------------------------------------------- | ------------ |
| v-model         | 绑定值，范围模式为 `[number, number]` | `number \| [number, number]`                                  | `0`          |
| min             | 最小值                                | `number`                                                      | `0`          |
| max             | 最大值                                | `number`                                                      | `100`        |
| step            | 步长（>0；非法值回退到 1）            | `number`                                                      | `1`          |
| range           | 范围选择（双滑块）                    | `boolean`                                                     | `false`      |
| vertical        | 垂直方向                              | `boolean`                                                     | `false`      |
| disabled        | 禁用                                  | `boolean`                                                     | `false`      |
| readonly        | 只读（不可修改但保留视觉反馈）        | `boolean`                                                     | `false`      |
| show-value      | 是否显示值提示                        | `boolean`                                                     | `true`       |
| show-value-mode | 提示显示模式                          | `'always' \| 'dragging' \| 'never'`                           | `'dragging'` |
| size            | 尺寸预设（复合 track + handle）       | `'small' \| 'medium' \| 'large'`                              | `'medium'`   |
| marks           | 刻度标记                              | `Record<number, string \| { label: string; style?: object }>` | -            |
| bar-height      | 自定义轨道高度（覆盖 size 预设）      | `number \| string`                                            | -            |
| handle-size     | 自定义把手尺寸（覆盖 size 预设）      | `number \| string`                                            | -            |
| active-color    | 激活轨道颜色                          | `string`                                                      | -            |
| inactive-color  | 非激活轨道颜色                        | `string`                                                      | -            |
| handle-color    | 把手颜色                              | `string`                                                      | -            |
| format-value    | 格式化显示值                          | `(value: number) => string`                                   | -            |
| custom-class    | 自定义类名                            | `string`                                                      | -            |
| custom-style    | 自定义样式                            | `string \| CSSProperties`                                     | -            |

### Events

| 事件名            | 说明                      | 回调参数                            |
| ----------------- | ------------------------- | ----------------------------------- |
| update:modelValue | 拖动结束 / 点击轨道后触发 | `value: number \| [number, number]` |
| change            | 拖动过程中值变化触发      | `value: number \| [number, number]` |
| drag-start        | 开始拖动                  | `value, index: number`              |
| drag-end          | 拖动结束                  | `value, index: number`              |

### Slots

| 名称         | 说明                       | 参数                                   |
| ------------ | -------------------------- | -------------------------------------- |
| handle       | 自定义单滑块把手（非范围） | `{ value: number, dragging: boolean }` |
| left-handle  | 自定义左侧把手（范围）     | `{ value: number, dragging: boolean }` |
| right-handle | 自定义右侧把手（范围）     | `{ value: number, dragging: boolean }` |

### 暴露方法

| 方法  | 说明                          |
| ----- | ----------------------------- |
| reset | 重置内部值到当前 `modelValue` |

### CSS 变量

| 名称                             | 说明           |
| -------------------------------- | -------------- |
| --ui-slider-track-height         | 轨道高度       |
| --ui-slider-handle-size          | 把手尺寸       |
| --ui-slider-color-active         | 激活轨道色     |
| --ui-slider-color-inactive       | 非激活轨道色   |
| --ui-slider-color-handle         | 把手色         |
| --ui-slider-color-tick           | 刻度点色       |
| --ui-slider-color-tick-active    | 激活刻度点色   |
| --ui-slider-color-label          | 标签色         |
| --ui-slider-color-indicator      | 值指示器背景色 |
| --ui-slider-color-indicator-text | 值指示器文字色 |
| --ui-slider-shadow               | 把手阴影       |
| --ui-slider-shadow-active        | 拖动时把手阴影 |

## 注意事项

- 拖动期间外部 `v-model` 修改不会同步到内部值（避免视觉抖动）；拖动结束后回流
- 垂直模式父容器需给高度
- MP 端事件名内部使用 camelCase；模板触发请用 kebab-case (`@drag-start` / `@drag-end`)
