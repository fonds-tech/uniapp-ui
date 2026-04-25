# CalendarPanel 日历面板

纯日历选择面板，剥离 popup 包装。可独立内嵌到业务页面，也作为 `ui-calendar` 弹层模式下的内部实现。

## 引入

`ui-calendar-panel` 已在 easycom 中注册，无需手动 import。

## 代码示例

### 基本使用

```vue
<template>
  <ui-calendar-panel @confirm="onConfirm" />
</template>
```

### 范围选择

```vue
<template>
  <ui-calendar-panel type="range" :max-range="7" range-prompt="最多选择 7 天" @confirm="onConfirm" />
</template>
```

### 多选

```vue
<template>
  <ui-calendar-panel type="multiple" @confirm="onConfirm" />
</template>
```

### 标记日期

```vue
<template>
  <ui-calendar-panel :marked-dates="['2026-04-01', '2026-04-15']" />
</template>
```

## API

### Props

| 参数                  | 说明                                      | 类型                                   | 默认值       |
| --------------------- | ----------------------------------------- | -------------------------------------- | ------------ |
| type                  | 选择类型：`single` / `multiple` / `range` | `string`                               | `single`     |
| title                 | 日历标题                                  | `string`                               | `日期选择`   |
| min-date              | 最小可选日期                              | `number \| Date`                       | -            |
| max-date              | 最大可选日期                              | `number \| Date`                       | -            |
| default-date          | 默认选中日期                              | `number \| Date \| (number \| Date)[]` | -            |
| formatter             | 日期格式化函数                            | `(day) => CalendarPanelDay`            | -            |
| show-confirm          | 是否显示确认按钮                          | `boolean`                              | `true`       |
| confirm-text          | 确认按钮文字                              | `string`                               | `确定`       |
| confirm-disabled-text | 确认按钮禁用文字                          | `string`                               | `请选择日期` |
| show-title            | 是否显示标题                              | `boolean`                              | `true`       |
| show-subtitle         | 是否显示年月副标题                        | `boolean`                              | `true`       |
| first-day-of-week     | 周起始日（0 周日 ~ 6 周六）               | `number`                               | `0`          |
| readonly              | 是否只读                                  | `boolean`                              | `false`      |
| max-range             | 范围模式最大可选天数                      | `number`                               | -            |
| range-prompt          | 超过最大可选天数时的提示                  | `string`                               | -            |
| color                 | 主题色                                    | `string`                               | -            |
| show-mark             | 是否显示月份背景水印                      | `boolean`                              | `false`      |
| closeable             | 是否显示关闭按钮（外层 popup 使用）       | `boolean`                              | `false`      |
| marked-dates          | 标记日期数组（YYYY-MM-DD）                | `string[]`                             | `[]`         |
| custom-style          | 自定义样式                                | `string \| CSSProperties`              | -            |
| custom-class          | 自定义类名                                | `string`                               | -            |

### Events

| 事件         | 说明                     | 回调参数                       |
| ------------ | ------------------------ | ------------------------------ |
| select       | 选择日期时触发（未确认） | `CalendarPanelSelectData`      |
| confirm      | 确认选择时触发           | `CalendarPanelConfirmData`     |
| month-change | 月份变化时触发           | `CalendarPanelMonthChangeData` |
| over-range   | 超过最大可选天数时触发   | -                              |
| close        | 点击关闭按钮时触发       | -                              |

### 方法

通过 `ref` 调用：

| 方法           | 说明           |
| -------------- | -------------- |
| reset          | 重置选择       |
| goToToday      | 跳转到今天     |
| goToDate       | 跳转到指定日期 |
| selectDate     | 主动选中某日期 |
| clearSelection | 清空选择       |
