# DateRangeSelect 日期区间选择

日期区间选择器组件，支持选择开始和结束日期，带有双触发区域。

## 基础用法

```vue
<template>
  <ui-date-range-select v-model="dateRange" />
</template>

<script setup>
import { ref } from "vue"

const dateRange = ref([])
</script>
```

## 设置初始值

通过 `v-model` 绑定一个包含两个日期字符串的数组。

```vue
<template>
  <ui-date-range-select v-model="dateRange" />
</template>

<script setup>
import { ref } from "vue"

const dateRange = ref(["2024-01-01", "2024-01-31"])
</script>
```

## 自定义占位文案

通过 `start-placeholder` 和 `end-placeholder` 自定义占位文案。

```vue
<template>
  <ui-date-range-select v-model="dateRange" start-placeholder="入住日期" end-placeholder="退房日期" separator="→" />
</template>
```

## 选择年月

通过 `columns` 属性配置只选择年月。

```vue
<template>
  <ui-date-range-select v-model="dateRange" :columns="['year', 'month']" format="YYYY-MM" start-placeholder="开始月份" end-placeholder="结束月份" />
</template>
```

## 选择时间

通过 `columns` 属性配置只选择时间。

```vue
<template>
  <ui-date-range-select v-model="timeRange" :columns="['hour', 'minute']" format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" />
</template>
```

## 日期范围限制

通过 `min-date` 和 `max-date` 属性限制可选日期范围。

```vue
<template>
  <ui-date-range-select v-model="dateRange" min-date="2024-01-01" max-date="2024-12-31" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用选择器。

```vue
<template>
  <ui-date-range-select v-model="dateRange" disabled />
</template>
```

## 只读状态

通过 `readonly` 属性设置为只读状态。

```vue
<template>
  <ui-date-range-select v-model="dateRange" readonly />
</template>
```

## 自定义展示格式

通过 `display-formatter` 函数自定义展示文案。

```vue
<template>
  <ui-date-range-select v-model="dateRange" :display-formatter="formatDisplay" />
</template>

<script setup>
function formatDisplay(value, type) {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    const suffix = type === "start" ? "(入住)" : "(退房)"
    return `${parts[1]}月${parts[2]}日${suffix}`
  }
  return value
}
</script>
```

## 带标题

通过 `title` 属性设置弹出层标题。

```vue
<template>
  <ui-date-range-select v-model="dateRange" title="选择日期范围" />
</template>
```

## 酒店预订场景

```vue
<template>
  <ui-date-range-select v-model="bookingDates" start-placeholder="入住日期" end-placeholder="退房日期" separator="→" title="选择入住时间" :min-date="today" />
</template>

<script setup>
import { ref } from "vue"

const today = new Date().toISOString().split("T")[0]
const bookingDates = ref([])
</script>
```

## 表单集成

可与 `ui-form` 和 `ui-form-item` 配合使用进行表单验证。

```vue
<template>
  <ui-form :model="formData" :rules="formRules">
    <ui-form-item label="请假时间" prop="leaveDates">
      <ui-date-range-select v-model="formData.leaveDates" start-placeholder="开始日期" end-placeholder="结束日期" />
    </ui-form-item>
  </ui-form>
</template>

<script setup>
import { reactive } from "vue"

const formData = reactive({
  leaveDates: [],
})

const formRules = {
  leaveDates: [
    {
      validator: (rule, value, callback) => {
        if (!value || value.length !== 2) {
          callback(new Error("请选择请假时间范围"))
        } else {
          callback()
        }
      },
    },
  ],
}
</script>
```

## Props

| 参数                   | 说明               | 类型                                                               | 默认值                     |
| ---------------------- | ------------------ | ------------------------------------------------------------------ | -------------------------- |
| v-model                | 绑定日期区间值     | `[string, string] \| []`                                           | `[]`                       |
| columns                | 列类型             | `('year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second')[]` | `['year', 'month', 'day']` |
| format                 | 日期格式           | `string`                                                           | `YYYY-MM-DD`               |
| min-date               | 最小日期           | `string \| Date \| number`                                         | 当前日期前 10 年           |
| max-date               | 最大日期           | `string \| Date \| number`                                         | 当前日期后 10 年           |
| start-placeholder      | 开始日期占位文案   | `string`                                                           | `开始日期`                 |
| end-placeholder        | 结束日期占位文案   | `string`                                                           | `结束日期`                 |
| separator              | 分隔符             | `string`                                                           | `至`                       |
| disabled               | 是否禁用           | `boolean`                                                          | `false`                    |
| readonly               | 是否只读           | `boolean`                                                          | `false`                    |
| display-formatter      | 展示文案格式化函数 | `(value: string, type: 'start' \| 'end') => string`                | -                          |
| mode                   | 弹窗位置           | `bottom \| top \| left \| right \| center`                         | `bottom`                   |
| border-radius          | 圆角大小           | `string \| number`                                                 | `16rpx`                    |
| close-on-click-overlay | 点击遮罩是否关闭   | `boolean`                                                          | `true`                     |
| overlay                | 是否显示遮罩       | `boolean`                                                          | `true`                     |
| duration               | 动画时长           | `string \| number`                                                 | `300`                      |
| z-index                | 弹窗层级           | `number`                                                           | -                          |
| background             | 背景色             | `string`                                                           | -                          |
| safe-area-inset-bottom | 底部安全区         | `boolean`                                                          | `true`                     |
| show-header            | 是否显示头部       | `boolean`                                                          | `true`                     |
| title                  | 标题               | `string`                                                           | -                          |
| cancel-text            | 取消按钮文字       | `string`                                                           | `取消`                     |
| confirm-text           | 确认按钮文字       | `string`                                                           | `确认`                     |
| column-height          | 选项高度           | `string \| number`                                                 | `88rpx`                    |
| visible-column-num     | 可见选项数         | `string \| number`                                                 | `5`                        |
| column-size            | 选项文字大小       | `string \| number`                                                 | -                          |
| column-color           | 选项文字颜色       | `string`                                                           | -                          |
| column-weight          | 选项文字字重       | `string \| number`                                                 | -                          |
| active-column-size     | 激活选项文字大小   | `string \| number`                                                 | -                          |
| active-column-color    | 激活选项文字颜色   | `string`                                                           | -                          |
| active-column-weight   | 激活选项文字字重   | `string \| number`                                                 | -                          |
| right-icon             | 右侧图标           | `string`                                                           | `right`                    |
| right-icon-size        | 右侧图标大小       | `string \| number`                                                 | -                          |
| right-icon-color       | 右侧图标颜色       | `string`                                                           | -                          |
| right-icon-weight      | 右侧图标粗细       | `string \| number`                                                 | -                          |
| text-color             | 文案颜色           | `string`                                                           | -                          |
| placeholder-color      | 占位文案颜色       | `string`                                                           | -                          |
| text-size              | 文案大小           | `string \| number`                                                 | -                          |
| text-weight            | 文案字重           | `string \| number`                                                 | -                          |
| separator-color        | 分隔符颜色         | `string`                                                           | -                          |
| custom-class           | 自定义类名         | `string`                                                           | -                          |
| custom-style           | 自定义样式         | `string \| object`                                                 | -                          |

## Events

| 事件名  | 说明                   | 回调参数                           |
| ------- | ---------------------- | ---------------------------------- |
| click   | 点击选择器时触发       | `type: 'start' \| 'end'`           |
| open    | 打开弹窗时触发         | -                                  |
| opened  | 打开弹窗动画结束时触发 | -                                  |
| close   | 关闭弹窗时触发         | `action: string`                   |
| closed  | 关闭弹窗动画结束时触发 | `action: string`                   |
| change  | 选项变化时触发         | `data: DateRangeSelectChangeData`  |
| cancel  | 点击取消按钮时触发     | `data: DateRangeSelectCancelData`  |
| confirm | 点击确认按钮时触发     | `data: DateRangeSelectConfirmData` |

## Slots

| 名称       | 说明               |
| ---------- | ------------------ |
| start      | 自定义开始日期内容 |
| end        | 自定义结束日期内容 |
| separator  | 自定义分隔符       |
| right-icon | 自定义右侧图标     |
| header     | 自定义弹窗头部     |
| title      | 自定义弹窗标题     |
| cancel     | 自定义取消按钮     |
| confirm    | 自定义确认按钮     |
| footer     | 自定义弹窗底部     |

## Methods

| 方法名        | 说明             | 参数                      | 返回值             |
| ------------- | ---------------- | ------------------------- | ------------------ |
| open          | 打开弹窗         | `type?: 'start' \| 'end'` | -                  |
| close         | 关闭弹窗         | -                         | -                  |
| confirm       | 确认选择         | -                         | -                  |
| cancel        | 取消选择         | -                         | -                  |
| getRange      | 获取日期区间     | -                         | `[string, string]` |
| setActiveType | 设置当前选择类型 | `type: 'start' \| 'end'`  | -                  |
| getActiveType | 获取当前选择类型 | -                         | `'start' \| 'end'` |

## 类型定义

```typescript
// 日期区间选择器值类型
type DateRangeSelectValue = [string, string] | []

// 当前选择的类型（开始/结束）
type DateRangeSelectActiveType = "start" | "end"

// 区间变化事件数据
interface DateRangeSelectChangeData {
  type: DateRangeSelectActiveType
  value: string
  range: DateRangeSelectValue
  selectedValues: string[]
  selectedIndexes: number[]
}

// 区间确认事件数据
interface DateRangeSelectConfirmData {
  range: DateRangeSelectValue
  startValue: string
  endValue: string
}

// 区间取消事件数据
interface DateRangeSelectCancelData {
  range: DateRangeSelectValue
}
```

## 注意事项

1. **日期约束**：选择结束日期时，会自动限制不能早于开始日期；选择开始日期时，会自动限制不能晚于结束日期
2. **Tab 切换**：弹窗打开后可通过头部 Tab 切换开始/结束日期的选择
3. **双向绑定**：使用 `v-model` 绑定时，值为 `[startDate, endDate]` 格式的数组
4. **表单验证**：配合表单使用时需自定义验证器检查数组长度


<!-- AUTO-PROPS-SUPPLEMENT: ui-date-range-select -->
## DateRangeSelect Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `auto-switch-to-end` |
| `column-filter` |
| `column-formatter` |

<!-- AUTO-METHODS-SUPPLEMENT: ui-date-range-select -->
## DateRangeSelect Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `get-selected-range` |

