# CountDown 倒计时

倒计时组件，支持多种格式和手动控制。

## 基础用法

通过 `time` 属性设置倒计时时长（单位：毫秒）。

```vue
<template>
  <ui-count-down :time="time" />
</template>

<script setup>
import { ref } from "vue"
// 30 小时
const time = ref(30 * 60 * 60 * 1000)
</script>
```

## 自定义格式

通过 `format` 属性设置倒计时显示格式。

```vue
<template>
  <ui-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
  <ui-count-down :time="time" format="HH:mm:ss" />
  <ui-count-down :time="time" format="mm:ss:SSS" millisecond />
</template>
```

## 毫秒级渲染

通过 `millisecond` 属性开启毫秒级渲染。

```vue
<template>
  <ui-count-down :time="time" millisecond format="HH:mm:ss:SSS" />
</template>
```

## 自定义样式

通过默认插槽自定义倒计时样式。

```vue
<template>
  <ui-count-down :time="time">
    <template #default="{ current }">
      <text class="countdown-block">{{ current.hours }}</text>
      <text class="countdown-colon">:</text>
      <text class="countdown-block">{{ current.minutes }}</text>
      <text class="countdown-colon">:</text>
      <text class="countdown-block">{{ current.seconds }}</text>
    </template>
  </ui-count-down>
</template>
```

## 手动控制

通过 ref 可以调用 `start`、`pause`、`reset` 方法手动控制倒计时。

```vue
<template>
  <ui-count-down ref="countDownRef" :time="3000" :auto-start="false" format="ss:SSS" millisecond @finish="onFinish" />
  <ui-button size="small" @click="start">开始</ui-button>
  <ui-button size="small" @click="pause">暂停</ui-button>
  <ui-button size="small" @click="reset">重置</ui-button>
</template>

<script setup>
import { ref } from "vue"

const countDownRef = ref()

function start() {
  countDownRef.value?.start()
}
function pause() {
  countDownRef.value?.pause()
}
function reset() {
  countDownRef.value?.reset()
}

function onFinish() {
  uni.showToast({ title: "倒计时结束", icon: "none" })
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 倒计时时长(ms) | `string \| number` | - |
| format | 时间格式 | `string` | `HH:mm:ss` |
| auto-start | 是否自动开始倒计时 | `boolean` | `true` |
| millisecond | 是否开启毫秒级渲染 | `boolean` | `false` |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## format 格式说明

| 格式 | 说明 |
| --- | --- |
| DD | 天数 |
| HH | 小时 |
| mm | 分钟 |
| ss | 秒数 |
| SSS | 毫秒 |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始倒计时 | - |
| pause | 暂停倒计时 | - |
| reset | 重置倒计时 | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| finish | 倒计时结束时触发 | - |
| change | 时间变化时触发 | `timeData` |

## Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义内容 | `{ current: timeData }` |

## timeData 结构

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| days | 剩余天数 | `number` |
| hours | 剩余小时 | `number` |
| minutes | 剩余分钟 | `number` |
| seconds | 剩余秒数 | `number` |
| milliseconds | 剩余毫秒 | `number` |
