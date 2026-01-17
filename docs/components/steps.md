# Steps 步骤条

步骤条组件，用于展示操作流程的各个环节，引导用户按照流程完成任务。

## 基础用法

通过 `active` 属性设置当前激活的步骤索引（从 0 开始）。

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="步骤一" />
    <ui-step title="步骤二" />
    <ui-step title="步骤三" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

## 带描述信息

通过 `description` 属性设置步骤的描述信息。

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="下单" description="2024-01-01 10:00" />
    <ui-step title="付款" description="2024-01-01 10:05" />
    <ui-step title="发货" description="等待商家发货" />
    <ui-step title="收货" description="预计 3-5 天送达" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

## 竖向步骤条

通过 `direction` 属性设置步骤条为竖向显示。

```vue
<template>
  <ui-steps :active="active" direction="vertical">
    <ui-step title="【城市】物流状态1" description="2024-01-01 10:00" />
    <ui-step title="【城市】物流状态2" description="2024-01-02 12:30" />
    <ui-step title="快件已发出" description="2024-01-03 08:45" />
    <ui-step title="等待揽收" description="2024-01-03 15:20" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

## 自定义图标

通过 `active-icon`、`inactive-icon`、`finish-icon` 属性可以设置不同状态下的图标。

```vue
<template>
  <ui-steps
    :active="active"
    active-icon="location"
    inactive-icon="circle"
    finish-icon="check-circle"
  >
    <ui-step title="步骤一" />
    <ui-step title="步骤二" />
    <ui-step title="步骤三" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

也可以为单个步骤设置自定义图标：

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="购物车" icon="cart" />
    <ui-step title="付款" icon="pay" />
    <ui-step title="发货" icon="logistics" />
    <ui-step title="完成" icon="success" />
  </ui-steps>
</template>
```

## 自定义颜色

通过 `active-color`、`inactive-color`、`error-color` 属性自定义步骤条的颜色。

```vue
<template>
  <ui-steps
    :active="active"
    active-color="#07c160"
    inactive-color="#969799"
  >
    <ui-step title="步骤一" />
    <ui-step title="步骤二" />
    <ui-step title="步骤三" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

## 步骤状态

通过 `status` 属性可以单独设置每个步骤的状态。

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="步骤一" status="finish" />
    <ui-step title="步骤二" status="process" />
    <ui-step title="步骤三" status="error" />
    <ui-step title="步骤四" status="wait" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(1)
</script>
```

## 可点击步骤

通过 `clickable` 属性开启步骤可点击功能，配合 `click-step` 事件进行交互。

```vue
<template>
  <ui-steps :active="active" clickable @click-step="onClickStep">
    <ui-step title="步骤一" />
    <ui-step title="步骤二" />
    <ui-step title="步骤三" />
  </ui-steps>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)

function onClickStep(index) {
  active.value = index
}
</script>
```

## 自定义内容

通过默认插槽自定义步骤内容。

```vue
<template>
  <ui-steps :active="active" direction="vertical">
    <ui-step>
      <template #default="{ status, index }">
        <view class="custom-content">
          <text class="title">自定义标题 {{ index + 1 }}</text>
          <text class="desc">当前状态: {{ status }}</text>
        </view>
      </template>
    </ui-step>
    <ui-step>
      <template #default="{ status, index }">
        <view class="custom-content">
          <text class="title">自定义标题 {{ index + 1 }}</text>
          <text class="desc">当前状态: {{ status }}</text>
        </view>
      </template>
    </ui-step>
  </ui-steps>
</template>
```

## 自定义图标插槽

通过 `icon` 插槽自定义步骤图标。

```vue
<template>
  <ui-steps :active="active">
    <ui-step title="步骤一">
      <template #icon="{ status, active }">
        <ui-icon
          :name="active ? 'star-fill' : 'star'"
          :color="active ? '#1989fa' : '#969799'"
        />
      </template>
    </ui-step>
    <ui-step title="步骤二">
      <template #icon="{ status, active }">
        <ui-icon
          :name="active ? 'heart-fill' : 'heart'"
          :color="active ? '#1989fa' : '#969799'"
        />
      </template>
    </ui-step>
  </ui-steps>
</template>
```

## Steps Props

| 参数           | 说明                      | 类型                     | 默认值       |
| -------------- | ------------------------- | ------------------------ | ------------ |
| active         | 当前步骤索引（从 0 开始） | `string \| number`       | `0`          |
| direction      | 步骤条方向                | `horizontal \| vertical` | `horizontal` |
| active-color   | 激活状态颜色              | `string`                 | -            |
| inactive-color | 未激活状态颜色            | `string`                 | -            |
| error-color    | 错误状态颜色              | `string`                 | -            |
| active-icon    | 激活状态图标              | `string`                 | -            |
| inactive-icon  | 未激活状态图标            | `string`                 | -            |
| finish-icon    | 完成状态图标              | `string`                 | -            |
| error-icon     | 错误状态图标              | `string`                 | -            |
| icon-size      | 图标大小                  | `string \| number`       | `40rpx`      |
| clickable      | 是否可点击步骤            | `boolean`                | `false`      |
| custom-class   | 自定义类名                | `string`                 | -            |
| custom-style   | 自定义样式                | `string \| object`       | -            |

## Steps Events

| 事件名     | 说明           | 回调参数        |
| ---------- | -------------- | --------------- |
| click-step | 点击步骤时触发 | `index: number` |

## Steps Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 步骤项内容 |

## Step Props

| 参数         | 说明                                               | 类型               | 默认值 |
| ------------ | -------------------------------------------------- | ------------------ | ------ |
| title        | 步骤标题                                           | `string \| number` | -      |
| description  | 步骤描述                                           | `string`           | -      |
| icon         | 自定义图标                                         | `string`           | -      |
| status       | 步骤状态，可选值 `wait` `process` `finish` `error` | `string`           | -      |
| icon-size    | 图标大小                                           | `string \| number` | -      |
| custom-class | 自定义类名                                         | `string`           | -      |
| custom-style | 自定义样式                                         | `string \| object` | -      |

## Step Events

| 事件名 | 说明           | 回调参数        |
| ------ | -------------- | --------------- |
| click  | 点击步骤时触发 | `index: number` |

## Step Slots

| 名称    | 说明       | 参数                                                 |
| ------- | ---------- | ---------------------------------------------------- |
| default | 自定义内容 | `{ status: string, index: number, active: boolean }` |
| icon    | 自定义图标 | `{ status: string, index: number, active: boolean }` |

## 类型定义

```typescript
// 步骤状态类型
type StepStatus = "wait" | "process" | "finish" | "error"

// 步骤条方向类型
type StepDirection = "horizontal" | "vertical"
```

## 样式变量

组件使用了以下 CSS 变量，可用于自定义样式：

| 变量名                      | 说明         | 默认值    |
| --------------------------- | ------------ | --------- |
| --ui-color-primary          | 主题色       | `#1890ff` |
| --ui-color-danger           | 错误颜色     | `#ff4d4f` |
| --ui-color-border           | 边框颜色     | `#ebedf0` |
| --ui-color-text-primary     | 主文本颜色   | `#323233` |
| --ui-color-text-secondary   | 次要文本颜色 | `#969799` |
| --ui-color-text-placeholder | 占位符颜色   | `#c8c9cc` |
| --ui-color-background       | 背景颜色     | `#ffffff` |
