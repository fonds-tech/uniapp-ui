# UiSelect 选择字段

## 介绍

`ui-select` 是一个复合选择字段组件，内置 `ui-picker`，用于“展示当前值 + 点击打开选择器 + 确认后回填”的场景，默认仅在确认时更新值。

## 代码示例

### 基础用法

```vue
<template>
  <ui-form-item label="所属公司" prop="companyId">
    <ui-select v-model="companyValue" :columns="companyOptions" placeholder="请选择" title="选择公司" />
  </ui-form-item>
</template>

<script setup lang="ts">
const companyValue = ref<string[]>([])
const companyOptions = ref([
  { text: "华东公司", value: "east" },
  { text: "华南公司", value: "south" },
])
</script>
```

### 受控显示

```vue
<template>
  <ui-select v-model="value" v-model:show="show" :columns="columns" title="选择城市" />
  <ui-button @click="show = true">打开</ui-button>
</template>

<script setup lang="ts">
const show = ref(false)
const value = ref<string[]>([])
const columns = ref([
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
])
</script>
```

### 自定义展示文案

```vue
<template>
  <ui-select
    v-model="value"
    :columns="columns"
    :display-formatter="formatDisplay"
    placeholder="请选择"
  />
</template>

<script setup lang="ts">
const value = ref<string[]>([])
const columns = ref([
  { text: "高优先级", value: "high" },
  { text: "中优先级", value: "mid" },
  { text: "低优先级", value: "low" },
])

function formatDisplay({ texts }) {
  return texts.length ? `已选择：${texts[0]}` : ""
}
</script>
```

### 自定义展示区与右侧图标

```vue
<template>
  <ui-select v-model="value" :columns="columns">
    <template #display="{ text }">
      <text class="text-26">{{ text || "请选择" }}</text>
    </template>
    <template #right-icon>
      <view class="i-lucide-chevron-right text-#999999" />
    </template>
  </ui-select>
</template>
```

## API

### Props

| 参数                 | 说明             | 类型                                                 | 默认值                                                   |
| -------------------- | ---------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| modelValue (v-model) | 选中值           | `Array<string \| number>`                            | `[]`                                                     |
| columns              | 列数据           | `PickerColumn[]`                                     | `[]`                                                     |
| columnsFields        | 字段映射         | `PickerColumnFields`                                 | `{ text: 'text', value: 'value', children: 'children' }` |
| show (v-model:show)  | 是否显示弹窗     | `boolean`                                            | `false`                                                  |
| placeholder          | 占位文案         | `string`                                             | `"请选择"`                                               |
| disabled             | 是否禁用         | `boolean`                                            | `false`                                                  |
| readonly             | 是否只读         | `boolean`                                            | `false`                                                  |
| displaySeparator     | 文案分隔符       | `string`                                             | `"/"`                                                    |
| displayFormatter     | 展示文案格式化   | `(payload) => string`                                | -                                                        |
| rightIcon            | 右侧图标         | `string`                                             | `"arrow"`                                                |
| rightIconSize        | 右侧图标大小     | `string \| number`                                   | -                                                        |
| rightIconColor       | 右侧图标颜色     | `string`                                             | -                                                        |
| rightIconWeight      | 右侧图标粗细     | `string \| number`                                   | -                                                        |
| textColor            | 文案颜色         | `string`                                             | -                                                        |
| placeholderColor     | 占位颜色         | `string`                                             | -                                                        |
| textSize             | 文案大小         | `string \| number`                                   | -                                                        |
| title                | 标题             | `string`                                             | -                                                        |
| showHeader           | 是否显示头部     | `boolean`                                            | `true`                                                   |
| cancelText           | 取消按钮文字     | `string`                                             | `"取消"`                                                 |
| confirmText          | 确认按钮文字     | `string`                                             | `"确认"`                                                 |
| mode                 | 弹窗位置         | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `"bottom"`                                               |
| overlay              | 是否显示遮罩     | `boolean`                                            | `true`                                                   |
| closeOnClickOverlay  | 点击遮罩是否关闭 | `boolean`                                            | `true`                                                   |
| duration             | 动画时长(ms)     | `number`                                             | `300`                                                    |
| zIndex               | 弹窗层级         | `number`                                             | -                                                        |
| background           | 弹窗背景色       | `string`                                             | -                                                        |
| borderRadius         | 弹窗圆角         | `string \| number`                                   | `"16rpx"`                                                |
| safeAreaInsetBottom  | 底部安全区       | `boolean`                                            | `true`                                                   |
| loading              | 是否加载中       | `boolean`                                            | `false`                                                  |
| columnHeight         | 选项高度         | `string \| number`                                   | `"88rpx"`                                                |
| visibleColumnNum     | 可见选项数       | `number`                                             | `5`                                                      |
| columnSize           | 选项文字大小     | `string \| number`                                   | -                                                        |
| columnColor          | 选项文字颜色     | `string`                                             | -                                                        |
| columnWeight         | 选项文字字重     | `string \| number`                                   | -                                                        |
| activeColumnSize     | 激活选项文字大小 | `string \| number`                                   | -                                                        |
| activeColumnColor    | 激活选项文字颜色 | `string`                                             | -                                                        |
| activeColumnWeight   | 激活选项文字字重 | `string \| number`                                   | -                                                        |
| customClass          | 自定义类名       | `string`                                             | -                                                        |
| customStyle          | 自定义样式       | `string \| object`                                   | -                                                        |

### Events

| 事件名                   | 说明         | 回调参数                            |
| ------------------------ | ------------ | ----------------------------------- |
| update:modelValue        | 确认后回填   | `(values: Array<string \| number>)` |
| update:show              | 弹窗显示变化 | `(show: boolean)`                   |
| confirm                  | 点击确认     | `(data: PickerConfirmData)`         |
| cancel                   | 点击取消     | `(data: PickerCancelData)`          |
| change                   | 选择变化     | `(data: PickerChangeData)`          |
| click                    | 点击展示区   | -                                   |
| open/opened/close/closed | 弹窗生命周期 | 同 `ui-picker`                      |

### Slots

| 插槽名                             | 说明                  | 作用域参数                       |
| ---------------------------------- | --------------------- | -------------------------------- |
| display                            | 自定义展示区          | `{ text, payload, placeholder }` |
| right-icon                         | 自定义右侧图标        | -                                |
| header/title/cancel/confirm/footer | 透传 `ui-picker` 插槽 | -                                |

### 方法

通过 ref 可调用：

```ts
const selectRef = ref()

selectRef.value.open()
selectRef.value.close()
selectRef.value.confirm()
selectRef.value.cancel()
selectRef.value.getSelectedValues()
selectRef.value.getSelectedIndexs()
selectRef.value.getSelectedColumns()
```

## 默认值策略

当前版本不提供“全局 props 默认值注入”能力。如需统一默认值，建议在业务侧封装一层组件，或在使用处显式传入相关 props。

## 注意事项

1. `ui-select` 仅在确认时更新值，取消不修改外部数据。
2. 组件内部使用 `ui-picker`，其列结构与字段映射规则保持一致。
