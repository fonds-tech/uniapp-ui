# DateSelect 日期选择

日期选择器组件，支持年、月、日、时、分、秒的选择，带有触发区域。

## 基础用法

```vue
<template>
  <ui-date-select v-model="date" placeholder="请选择日期" />
</template>

<script setup>
import { ref } from "vue"

const date = ref("")
</script>
```

## 选择年月

通过 `columns` 属性配置只选择年月。

```vue
<template>
  <ui-date-select v-model="date" :columns="['year', 'month']" format="YYYY-MM" placeholder="请选择年月" />
</template>
```

## 选择时间

通过 `columns` 属性配置只选择时间。

```vue
<template>
  <ui-date-select v-model="time" :columns="['hour', 'minute', 'second']" format="HH:mm:ss" placeholder="请选择时间" />
</template>
```

## 选择日期时间

通过 `columns` 属性配置选择完整的日期时间。

```vue
<template>
  <ui-date-select v-model="datetime" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" placeholder="请选择日期时间" />
</template>
```

## 日期范围限制

通过 `min-date` 和 `max-date` 属性限制可选日期范围。

```vue
<template>
  <ui-date-select v-model="date" min-date="2024-01-01" max-date="2025-12-31" placeholder="请选择日期" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用选择器。

```vue
<template>
  <ui-date-select v-model="date" placeholder="禁用状态" disabled />
</template>
```

## 只读状态

通过 `readonly` 属性设置为只读状态。

```vue
<template>
  <ui-date-select v-model="date" placeholder="只读状态" readonly />
</template>
```

## 自定义展示格式

通过 `display-formatter` 函数自定义展示文案。

```vue
<template>
  <ui-date-select v-model="date" :display-formatter="formatDisplay" placeholder="请选择日期" />
</template>

<script setup>
function formatDisplay(value) {
  if (!value) return ""
  const parts = value.split("-")
  if (parts.length >= 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`
  }
  return value
}
</script>
```

## 带标题

通过 `title` 属性设置弹出层标题。

```vue
<template>
  <ui-date-select v-model="date" title="选择出生日期" placeholder="请选择日期" />
</template>
```

## 表单集成

可与 `ui-form` 和 `ui-form-item` 配合使用进行表单验证。

```vue
<template>
  <ui-form :model="formData" :rules="formRules">
    <ui-form-item label="出生日期" prop="birthday">
      <ui-date-select v-model="formData.birthday" placeholder="请选择出生日期" />
    </ui-form-item>
  </ui-form>
</template>

<script setup>
import { reactive } from "vue"

const formData = reactive({
  birthday: "",
})

const formRules = {
  birthday: [{ required: true, message: "请选择出生日期" }],
}
</script>
```

## Props

| 参数                   | 说明               | 类型                                                               | 默认值                     |
| ---------------------- | ------------------ | ------------------------------------------------------------------ | -------------------------- |
| v-model                | 绑定日期值         | `string \| Date \| number`                                         | -                          |
| columns                | 列类型             | `('year' \| 'month' \| 'day' \| 'hour' \| 'minute' \| 'second')[]` | `['year', 'month', 'day']` |
| format                 | 日期格式           | `string`                                                           | `YYYY-MM-DD`               |
| min-date               | 最小日期           | `string \| Date \| number`                                         | 当前日期前 10 年           |
| max-date               | 最大日期           | `string \| Date \| number`                                         | 当前日期后 10 年           |
| placeholder            | 占位文案           | `string`                                                           | `请选择日期`               |
| disabled               | 是否禁用           | `boolean`                                                          | `false`                    |
| readonly               | 是否只读           | `boolean`                                                          | `false`                    |
| display-formatter      | 展示文案格式化函数 | `(value: string) => string`                                        | -                          |
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
| text-align             | 文案对齐方向       | `left \| center \| right`                                          | `left`                     |
| text-weight            | 文案字重           | `string \| number`                                                 | -                          |
| custom-class           | 自定义类名         | `string`                                                           | -                          |
| custom-style           | 自定义样式         | `string \| object`                                                 | -                          |

## Events

| 事件名  | 说明                   | 回调参数                      |
| ------- | ---------------------- | ----------------------------- |
| click   | 点击选择器时触发       | -                             |
| open    | 打开弹窗时触发         | -                             |
| opened  | 打开弹窗动画结束时触发 | -                             |
| close   | 关闭弹窗时触发         | `action: string`              |
| closed  | 关闭弹窗动画结束时触发 | `action: string`              |
| change  | 选项变化时触发         | `data: DatePickerChangeData`  |
| cancel  | 点击取消按钮时触发     | `data: DatePickerCancelData`  |
| confirm | 点击确认按钮时触发     | `data: DatePickerConfirmData` |

## Slots

| 名称       | 说明               |
| ---------- | ------------------ |
| display    | 自定义展示区域内容 |
| right-icon | 自定义右侧图标     |
| header     | 自定义头部         |
| title      | 自定义标题         |
| cancel     | 自定义取消按钮     |
| confirm    | 自定义确认按钮     |
| footer     | 自定义底部         |

## Methods

| 方法名             | 说明                 | 参数 | 返回值     |
| ------------------ | -------------------- | ---- | ---------- |
| open               | 打开弹窗             | -    | -          |
| close              | 关闭弹窗             | -    | -          |
| confirm            | 确认选择             | -    | -          |
| cancel             | 取消选择             | -    | -          |
| getSelectedValue   | 获取格式化后的选中值 | -    | `string`   |
| getSelectedValues  | 获取选中值数组       | -    | `string[]` |
| getSelectedIndexes | 获取选中索引数组     | -    | `number[]` |


<!-- AUTO-PROPS-SUPPLEMENT: ui-date-select -->
## DateSelect Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `column-filter` |
| `column-formatter` |

