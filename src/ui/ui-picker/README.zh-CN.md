# UiPicker 弹窗选择器

## 介绍

`ui-picker` 是一个弹窗选择器组件,基于 `ui-popup` + `ui-picker-panel` 组合实现,提供完整的弹窗选择交互体验。

**架构说明**:

- 使用 `ui-popup` 作为弹窗容器
- 使用 `ui-picker-panel` 作为选择器面板
- 提供 header(顶部)和 footer(底部)插槽支持灵活布局

## 代码示例

### 基础用法

```vue
<template>
  <view>
    <ui-button @click="show = true">选择城市</ui-button>

    <ui-picker v-model="selectedCity" :show="show" title="请选择城市" :columns="cityColumns" @confirm="handleConfirm" @cancel="handleCancel" @update:show="show = $event" />
  </view>
</template>

<script setup lang="ts">
const show = ref(false)
const selectedCity = ref([])
const cityColumns = ref([
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
])

function handleConfirm({ values }) {
  console.log("确认:", values)
  show.value = false
}

function handleCancel() {
  console.log("取消")
  show.value = false
}
</script>
```

### 底部按钮布局

```vue
<template>
  <ui-picker v-model="value" :show="show" :show-header="false" :columns="columns" @update:show="show = $event">
    <!-- 自定义底部操作按钮 -->
    <template #footer="{ confirm, cancel }">
      <view class="footer-actions">
        <ui-button type="default" block @click="cancel">取消</ui-button>
        <ui-button type="primary" block @click="confirm">确认</ui-button>
      </view>
    </template>
  </ui-picker>
</template>

<style lang="scss">
.footer-actions {
  display: flex;
  gap: 16rpx;
  padding: 24rpx;
  border-top: 1px solid #ebedf0;
}
</style>
```

### 级联选择

```vue
<template>
  <ui-picker v-model="selectedArea" :show="show" title="选择地区" :columns="areaColumns" @confirm="handleConfirm" />
</template>

<script setup lang="ts">
const areaColumns = ref([
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      { text: "杭州市", value: "hangzhou" },
      { text: "宁波市", value: "ningbo" },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [
      { text: "南京市", value: "nanjing" },
      { text: "苏州市", value: "suzhou" },
    ],
  },
])
</script>
```

## API

### Props

| 参数                 | 说明             | 类型                                                 | 默认值                                                   |
| -------------------- | ---------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| **弹窗相关**         |                  |                                                      |                                                          |
| show                 | 是否显示弹窗     | `boolean`                                            | `false`                                                  |
| mode                 | 弹窗位置         | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'`                                               |
| overlay              | 是否显示遮罩     | `boolean`                                            | `true`                                                   |
| closeOnClickOverlay  | 点击遮罩是否关闭 | `boolean`                                            | `true`                                                   |
| duration             | 动画时长(ms)     | `number`                                             | `300`                                                    |
| zIndex               | 弹窗层级         | `number`                                             | -                                                        |
| background           | 背景色           | `string`                                             | -                                                        |
| borderRadius         | 圆角大小         | `string \| number`                                   | `'16rpx'`                                                |
| safeAreaInsetBottom  | 底部安全区       | `boolean`                                            | `true`                                                   |
| **头部相关**         |                  |                                                      |                                                          |
| showHeader           | 是否显示头部     | `boolean`                                            | `true`                                                   |
| title                | 标题             | `string`                                             | -                                                        |
| cancelText           | 取消按钮文字     | `string`                                             | `'取消'`                                                 |
| confirmText          | 确认按钮文字     | `string`                                             | `'确认'`                                                 |
| **选择器相关**       |                  |                                                      |                                                          |
| modelValue (v-model) | 绑定值           | `Array<string \| number>`                            | `[]`                                                     |
| columns              | 列数据           | `PickerColumn[]`                                     | `[]`                                                     |
| loading              | 是否加载中       | `boolean`                                            | `false`                                                  |
| columnFields         | 字段映射         | `PickerColumnFields`                                 | `{ text: 'text', value: 'value', children: 'children' }` |
| columnHeight         | 选项高度         | `string \| number`                                   | `'88rpx'`                                                |
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

| 事件名            | 说明             | 回调参数                           |
| ----------------- | ---------------- | ---------------------------------- |
| update:show       | 弹窗显示状态变化 | `(show: boolean)`                  |
| open              | 弹窗打开时触发   | -                                  |
| opened            | 弹窗打开动画结束 | -                                  |
| close             | 弹窗关闭时触发   | `(action: string)`                 |
| closed            | 弹窗关闭动画结束 | `(action: string)`                 |
| change            | 选择变化时触发   | `(data: PickerChangeData)`         |
| update:modelValue | 值变化时触发     | `(value: Array<string \| number>)` |
| cancel            | 点击取消按钮     | `(data: PickerCancelData)`         |
| confirm           | 点击确认按钮     | `(data: PickerConfirmData)`        |

### Slots

| 插槽名  | 说明           | 作用域参数                                |
| ------- | -------------- | ----------------------------------------- |
| header  | 自定义顶部区域 | -                                         |
| title   | 自定义标题     | -                                         |
| cancel  | 自定义取消按钮 | -                                         |
| confirm | 自定义确认按钮 | -                                         |
| footer  | 自定义底部区域 | `{ confirm: Function, cancel: Function }` |

### 方法

通过 ref 可以调用组件方法:

```typescript
const pickerRef = ref()

// 打开弹窗
pickerRef.value.open()

// 关闭弹窗
pickerRef.value.close()

// 确认选择
pickerRef.value.confirm()

// 取消选择
pickerRef.value.cancel()

// 获取选中值
const values = pickerRef.value.getSelectedValues()

// 获取选中索引
const indexs = pickerRef.value.getSelectedIndexs()

// 获取选中列数据
const columns = pickerRef.value.getSelectedColumns()
```

## 类型定义

```typescript
// 列数据
interface PickerColumn {
  text?: string | number
  value?: string | number
  children?: PickerColumn[]
  [key: string]: any
}

// 字段映射
interface PickerColumnFields {
  text?: string
  value?: string
  children?: string
}

// change 事件数据
interface PickerChangeData {
  values: Array<string | number>
  value: string | number
  indexs: number[]
  index: number
  columns: PickerColumn[]
}

// confirm/cancel 事件数据
interface PickerConfirmData {
  values: Array<string | number>
  indexs: number[]
  columns: PickerColumn[]
}
```

## 样式变量

组件样式可通过 CSS 变量自定义:

```scss
.ui-picker {
  &__header {
    // 自定义头部样式
  }
}
```

## 注意事项

1. **组件依赖**: `ui-picker` 依赖 `ui-popup` 和 `ui-picker-panel` 组件
2. **全局配置**: 支持通过全局配置设置默认 props
3. **插槽灵活性**: 可以通过插槽完全自定义头部和底部布局
4. **事件处理**: `footer` 插槽提供 `confirm` 和 `cancel` 方法供调用
