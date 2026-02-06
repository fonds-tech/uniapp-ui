# Select 选择器

下拉选择器组件，支持单列、多列和级联选择。

## 基础用法

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="请选择城市" />
</template>

<script setup>
import { ref } from "vue"

const value = ref("")
const cities = [
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
  <ui-select v-model="value" :columns="timeColumns" placeholder="请选择时间" />
</template>

<script setup>
const timeColumns = [
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
  [
    { text: "9:00", value: "9" },
    { text: "10:00", value: "10" },
  ],
]
</script>
```

## 级联选择

通过 `children` 属性实现级联选择。

```vue
<template>
  <ui-select v-model="value" :columns="areaColumns" placeholder="请选择地区" />
</template>

<script setup>
const areaColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      { text: "杭州", value: "hangzhou" },
      { text: "宁波", value: "ningbo" },
    ],
  },
]
</script>
```

## 禁用状态

通过 `disabled` 属性禁用选择器。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="禁用状态" disabled />
</template>
```

## 只读状态

通过 `readonly` 属性设置为只读状态。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="只读状态" readonly />
</template>
```

## 自定义分隔符

通过 `display-separator` 属性自定义显示值的分隔符。

```vue
<template>
  <ui-select v-model="value" :columns="areaColumns" placeholder="请选择" display-separator=" - " />
</template>
```

## 带标题

通过 `title` 属性设置弹出层标题。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="请选择城市" title="选择城市" />
</template>
```

## Props

| 参数                   | 说明               | 类型                                       | 默认值                                                   |
| ---------------------- | ------------------ | ------------------------------------------ | -------------------------------------------------------- |
| v-model                | 绑定值             | `string \| number \| array`                | -                                                        |
| multiple               | 是否多选模式       | `boolean`                                  | `false`                                                  |
| columns                | 列数据             | `array`                                    | `[]`                                                     |
| columns-fields         | 字段映射           | `object`                                   | `{ text: 'text', value: 'value', children: 'children' }` |
| mode                   | 弹窗位置           | `bottom \| top \| left \| right \| center` | `bottom`                                                 |
| border-radius          | 圆角大小           | `string \| number`                         | `16rpx`                                                  |
| close-on-click-overlay | 点击遮罩是否关闭   | `boolean`                                  | `true`                                                   |
| overlay                | 是否显示遮罩       | `boolean`                                  | `true`                                                   |
| duration               | 动画时长           | `string \| number`                         | `300`                                                    |
| z-index                | 弹窗层级           | `string \| number`                         | -                                                        |
| background             | 背景色             | `string`                                   | -                                                        |
| safe-area-inset-bottom | 底部安全区         | `boolean`                                  | `true`                                                   |
| show-header            | 是否显示头部       | `boolean`                                  | `true`                                                   |
| title                  | 标题               | `string`                                   | -                                                        |
| cancel-text            | 取消按钮文字       | `string`                                   | `取消`                                                   |
| confirm-text           | 确认按钮文字       | `string`                                   | `确认`                                                   |
| loading                | 是否加载中         | `boolean`                                  | `false`                                                  |
| column-height          | 选项高度           | `string \| number`                         | `88rpx`                                                  |
| visible-column-num     | 可见选项数         | `string \| number`                         | `5`                                                      |
| column-size            | 选项文字大小       | `string \| number`                         | -                                                        |
| column-color           | 选项文字颜色       | `string`                                   | -                                                        |
| column-weight          | 选项文字字重       | `string \| number`                         | -                                                        |
| active-column-size     | 激活选项文字大小   | `string \| number`                         | -                                                        |
| active-column-color    | 激活选项文字颜色   | `string`                                   | -                                                        |
| active-column-weight   | 激活选项文字字重   | `string \| number`                         | -                                                        |
| placeholder            | 占位文案           | `string`                                   | `请选择`                                                 |
| disabled               | 是否禁用           | `boolean`                                  | `false`                                                  |
| readonly               | 是否只读           | `boolean`                                  | `false`                                                  |
| display-separator      | 展示文案分隔符     | `string`                                   | `/`                                                      |
| display-formatter      | 展示文案格式化函数 | `function`                                 | -                                                        |
| right-icon             | 右侧图标           | `string`                                   | `arrow`                                                  |
| right-icon-size        | 右侧图标大小       | `string \| number`                         | -                                                        |
| right-icon-color       | 右侧图标颜色       | `string`                                   | -                                                        |
| right-icon-weight      | 右侧图标粗细       | `string \| number`                         | -                                                        |
| text-color             | 文案颜色           | `string`                                   | -                                                        |
| placeholder-color      | 占位文案颜色       | `string`                                   | -                                                        |
| text-size              | 文案大小           | `string \| number`                         | -                                                        |
| text-align             | 文案对齐方向       | `left \| center \| right`                  | `left`                                                   |
| text-weight            | 文案字重           | `string \| number`                         | -                                                        |
| custom-class           | 自定义类名         | `string`                                   | -                                                        |
| custom-style           | 自定义样式         | `string \| object`                         | -                                                        |

## Events

| 事件名  | 说明                   | 回调参数                  |
| ------- | ---------------------- | ------------------------- |
| click   | 点击选择器时触发       | -                         |
| open    | 打开弹窗时触发         | -                         |
| opened  | 打开弹窗动画结束时触发 | -                         |
| close   | 关闭弹窗时触发         | `action: string`          |
| closed  | 关闭弹窗动画结束时触发 | `action: string`          |
| change  | 选项变化时触发         | `data: PickerChangeData`  |
| cancel  | 点击取消按钮时触发     | `data: PickerCancelData`  |
| confirm | 点击确认按钮时触发     | `data: PickerConfirmData` |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义触发区域内容 |

<!-- AUTO-METHODS-SUPPLEMENT: ui-select -->
## Select Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `get-selected-values` |
| `get-selected-indexs` |
| `get-selected-columns` |

