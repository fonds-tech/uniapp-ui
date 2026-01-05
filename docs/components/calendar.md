# Calendar 日历

日历组件，用于选择日期或日期范围，支持单选、多选和范围选择三种模式。

## 基础用法

通过 `v-model:show` 控制日历弹层的显示与隐藏，使用 `@confirm` 事件获取选中的日期。

```vue
<template>
  <ui-cell title="选择日期" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const date = ref("")

function onConfirm(data) {
  date.value = data.dateStr
}
</script>
```

## 选择模式

### 单选模式

默认为单选模式，选择单个日期后点击确认按钮完成选择。

```vue
<template>
  <ui-cell title="单选日期" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" type="single" title="选择日期" @confirm="onConfirm" />
</template>
```

### 多选模式

设置 `type="multiple"` 可以选择多个日期。

```vue
<template>
  <ui-cell title="多选日期" :value="displayText || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" type="multiple" title="选择多个日期" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const displayText = ref("")

function onConfirm(data) {
  const dates = data.dateStr
  displayText.value = dates.length > 0 ? `已选择 ${dates.length} 个日期` : ""
}
</script>
```

### 范围选择

设置 `type="range"` 可以选择日期范围，需要选择开始日期和结束日期。

```vue
<template>
  <ui-cell title="日期范围" :value="dateRange || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" type="range" title="选择日期范围" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const dateRange = ref("")

function onConfirm(data) {
  const range = data.dateStr
  dateRange.value = `${range.start} 至 ${range.end}`
}
</script>
```

## 限制日期范围

通过 `min-date` 和 `max-date` 属性可以限制可选的日期范围。

```vue
<template>
  <ui-cell title="限制范围" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const date = ref("")

// 限制为今天到 30 天后
const minDate = new Date()
const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

function onConfirm(data) {
  date.value = data.dateStr
}
</script>
```

## 最大可选天数

在范围选择模式下，通过 `max-range` 属性限制最多可选的天数。

```vue
<template>
  <ui-cell title="最多选择7天" :value="dateRange || '请选择'" is-link @click="show = true" />
  <ui-calendar
    v-model:show="show"
    type="range"
    :max-range="7"
    range-prompt="最多选择7天"
    @confirm="onConfirm"
    @over-range="onOverRange"
  />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const dateRange = ref("")

function onConfirm(data) {
  const range = data.dateStr
  dateRange.value = `${range.start} 至 ${range.end}`
}

function onOverRange() {
  console.log("超过最大可选天数")
}
</script>
```

## 自定义日期格式化

通过 `formatter` 函数可以自定义日期的显示内容，如添加上方信息、下方信息、自定义类名等。

```vue
<template>
  <ui-cell title="自定义格式" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" :formatter="formatter" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const date = ref("")

function formatter(day) {
  const date = day.date.getDate()

  // 标记每月的 1 号
  if (date === 1) {
    day.topInfo = "月初"
  }

  // 标记周末
  const weekday = day.date.getDay()
  if (weekday === 0 || weekday === 6) {
    day.bottomInfo = "休"
  }

  return day
}

function onConfirm(data) {
  date.value = data.dateStr
}
</script>
```

## 标记日期

通过 `marked-dates` 属性可以为指定日期添加标记点。

```vue
<template>
  <ui-cell title="标记日期" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" :marked-dates="markedDates" @confirm="onConfirm" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const date = ref("")

// 标记日期数组（YYYY-MM-DD 格式）
const markedDates = ref(["2024-01-05", "2024-01-10", "2024-01-15", "2024-01-20"])

function onConfirm(data) {
  date.value = data.dateStr
}
</script>
```

## 自定义主题色

通过 `color` 属性可以自定义日历的主题色。

```vue
<template>
  <ui-cell title="自定义颜色" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" color="#07c160" @confirm="onConfirm" />
</template>
```

## 显示月份水印

设置 `show-mark` 属性可以在日期区域显示当前月份的水印背景。

```vue
<template>
  <ui-cell title="月份水印" :value="date || '请选择'" is-link @click="show = true" />
  <ui-calendar v-model:show="show" show-mark @confirm="onConfirm" />
</template>
```

## 内嵌模式

设置 `poppable` 为 `false` 可以将日历以内嵌的方式展示，而不是弹层形式。

```vue
<template>
  <ui-calendar :poppable="false" :show-confirm="false" @select="onSelect" />
  <view class="selected-info">
    <text>已选日期: {{ date || "未选择" }}</text>
  </view>
</template>

<script setup>
import { ref } from "vue"

const date = ref("")

function onSelect(data) {
  date.value = data.dateStr
}
</script>
```

## 自定义周起始日

通过 `first-day-of-week` 属性可以设置周起始日，默认为周日（0），设置为 1 则周一为起始日。

```vue
<template>
  <ui-calendar v-model:show="show" :first-day-of-week="1" @confirm="onConfirm" />
</template>
```

## 只读模式

设置 `readonly` 属性可以将日历设为只读状态，此时无法选择日期。

```vue
<template>
  <ui-calendar v-model:show="show" readonly />
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示日历（弹层模式） | `boolean` | `false` |
| type | 选择类型，可选值为 `single` `multiple` `range` | `string` | `single` |
| title | 日历标题 | `string` | `日期选择` |
| min-date | 最小可选日期 | `number \| Date` | - |
| max-date | 最大可选日期 | `number \| Date` | - |
| default-date | 默认选中日期 | `number \| Date \| (number \| Date)[]` | - |
| formatter | 日期格式化函数 | `(day: CalendarDay) => CalendarDay` | - |
| show-confirm | 是否显示确认按钮 | `boolean` | `true` |
| confirm-text | 确认按钮文字 | `string` | `确定` |
| confirm-disabled-text | 确认按钮禁用时的文字 | `string` | `请选择日期` |
| show-title | 是否显示标题 | `boolean` | `true` |
| show-subtitle | 是否显示副标题（当前年月） | `boolean` | `true` |
| first-day-of-week | 周起始日，0-6 代表周日到周六 | `number \| string` | `0` |
| readonly | 是否只读 | `boolean` | `false` |
| poppable | 是否以弹层形式展示 | `boolean` | `true` |
| max-range | 范围选择模式下的最大可选天数 | `number` | - |
| range-prompt | 超过最大可选天数时的提示文案 | `string` | - |
| color | 主题色 | `string` | - |
| show-mark | 是否显示月份背景水印 | `boolean` | `false` |
| marked-dates | 需要标记的日期数组（YYYY-MM-DD 格式） | `string[]` | `[]` |
| close-on-click-overlay | 点击遮罩是否关闭弹层 | `boolean` | `true` |
| closeable | 是否显示关闭按钮 | `boolean` | `false` |
| border-radius | 弹层圆角 | `number \| string` | `16rpx` |
| z-index | 弹层层级 | `number \| string` | - |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean` | `true` |
| custom-style | 自定义样式 | `string \| CSSProperties` | - |
| custom-class | 自定义类名 | `string` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 选择日期时触发（未确认） | `data: CalendarSelectData` |
| confirm | 确认选择时触发 | `data: CalendarConfirmData` |
| month-change | 月份变化时触发 | `data: CalendarMonthChangeData` |
| over-range | 超过最大可选天数时触发 | - |
| open | 打开弹层时触发 | - |
| opened | 弹层打开完成时触发 | - |
| close | 关闭弹层时触发 | - |
| closed | 弹层关闭完成时触发 | - |
| click-overlay | 点击遮罩时触发 | - |

## Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| reset | 重置选择 | - | - |
| goToToday | 跳转到今天 | - | - |
| goToDate | 跳转到指定日期 | `date: Date \| string` | - |
| selectDate | 选择指定日期 | `date: string` | - |
| clearSelection | 清除选择 | - | - |

## 类型定义

### CalendarDay

日历日期项对象：

```ts
interface CalendarDay {
  /** 日期对象 */
  date: Date
  /** 日期类型 */
  type: "normal" | "start" | "middle" | "end" | "selected" | "disabled" | "today"
  /** 显示的日期数字 */
  text: string | number
  /** 日期上方的信息 */
  topInfo?: string
  /** 日期下方的信息 */
  bottomInfo?: string
  /** 自定义类名 */
  className?: string
  /** 完整日期字符串 YYYY-MM-DD */
  fullDate: string
  /** 是否是当前月的日期 */
  isCurrentMonth: boolean
  /** 是否禁用 */
  disabled: boolean
  /** 是否选中 */
  selected: boolean
  /** 是否是今天 */
  isToday: boolean
  /** 是否是范围起始 */
  isRangeStart: boolean
  /** 是否是范围结束 */
  isRangeEnd: boolean
  /** 是否在范围内 */
  inRange: boolean
  /** 是否有标记点 */
  hasDot: boolean
}
```

### CalendarSelectData

选择事件数据：

```ts
interface CalendarSelectData {
  /** 选中的日期对象 */
  date: Date | Date[]
  /** 选中的日期字符串 */
  dateStr: string | string[]
}
```

### CalendarConfirmData

确认事件数据：

```ts
interface CalendarConfirmData {
  /** 确认的日期对象 */
  date: Date | Date[] | { start: Date; end: Date }
  /** 确认的日期字符串 */
  dateStr: string | string[] | { start: string; end: string }
}
```

### CalendarMonthChangeData

月份变化数据：

```ts
interface CalendarMonthChangeData {
  /** 年份 */
  year: number
  /** 月份 */
  month: number
  /** 日期对象 */
  date: Date
}
```

## 主题定制

组件提供了以下 CSS 变量用于自定义样式：

```scss
:root {
  --ui-calendar-color: var(--ui-color-primary);
  --ui-calendar-day-size: 80rpx;
  --ui-calendar-day-font-size: 28rpx;
}
```
