# Collapse 折叠面板

可以折叠/展开的内容区域，常用于将复杂的内容区域分组并隐藏。

## 基础用法

通过 `v-model` 绑定当前展开的面板名称数组，`name` 属性标识每个面板的唯一标识。

```vue
<template>
  <ui-collapse v-model="activeNames">
    <ui-collapse-item title="标题1" name="1">
      代码是写出来给人看的，附带能在机器上运行。
    </ui-collapse-item>
    <ui-collapse-item title="标题2" name="2">
      任何足够先进的技术都和魔法无异。
    </ui-collapse-item>
    <ui-collapse-item title="标题3" name="3">
      好的代码本身就是最好的文档。
    </ui-collapse-item>
  </ui-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref<(string | number)[]>(['1'])
</script>
```

## 手风琴模式

通过 `accordion` 属性开启手风琴模式，开启后同时只能展开一个面板。此时 `v-model` 绑定的值为单个值而非数组。

```vue
<template>
  <ui-collapse v-model="activeName" accordion>
    <ui-collapse-item title="标题1" name="1">
      手风琴模式下，同时只能展开一个面板。
    </ui-collapse-item>
    <ui-collapse-item title="标题2" name="2">
      点击其他面板时，当前面板会自动收起。
    </ui-collapse-item>
    <ui-collapse-item title="标题3" name="3">
      适用于需要节省空间的场景。
    </ui-collapse-item>
  </ui-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref<string | number>('1')
</script>
```

## 禁用状态

通过 `disabled` 属性禁用单个面板，禁用后无法展开或收起。

```vue
<ui-collapse v-model="activeNames">
  <ui-collapse-item title="正常状态" name="1">
    这是一个正常的折叠面板项。
  </ui-collapse-item>
  <ui-collapse-item title="禁用状态" name="2" disabled>
    禁用状态下无法展开或收起。
  </ui-collapse-item>
  <ui-collapse-item title="正常状态" name="3">
    这是另一个正常的折叠面板项。
  </ui-collapse-item>
</ui-collapse>
```

## 带图标

通过 `icon` 属性设置左侧图标，支持所有内置图标。

```vue
<ui-collapse v-model="activeNames">
  <ui-collapse-item title="个人信息" name="1" icon="user">
    用户的个人信息展示区域。
  </ui-collapse-item>
  <ui-collapse-item title="系统设置" name="2" icon="setting">
    系统相关的设置选项。
  </ui-collapse-item>
  <ui-collapse-item title="消息通知" name="3" icon="bell">
    消息通知的配置和查看。
  </ui-collapse-item>
</ui-collapse>
```

## 自定义标题内容

通过 `title` 插槽可以自定义标题区域的内容。

```vue
<ui-collapse v-model="activeNames">
  <ui-collapse-item name="1">
    <template #title>
      <view class="custom-title">
        <text>自定义标题</text>
        <ui-tag type="primary" size="mini">HOT</ui-tag>
      </view>
    </template>
    通过 title 插槽可以自定义标题区域的内容。
  </ui-collapse-item>
  <ui-collapse-item title="带标签的标题" name="2" label="这是一段描述信息">
    使用 label 属性可以添加标题下方的描述信息。
  </ui-collapse-item>
  <ui-collapse-item title="带右侧内容" name="3" value="更多">
    使用 value 属性可以在标题右侧显示额外内容。
  </ui-collapse-item>
</ui-collapse>
```

## 无边框

通过设置 `border` 属性为 `false` 可以隐藏边框。

```vue
<ui-collapse v-model="activeNames" :border="false">
  <ui-collapse-item title="标题1" name="1" :border="false">
    无边框模式下的折叠面板。
  </ui-collapse-item>
  <ui-collapse-item title="标题2" name="2" :border="false">
    适用于特定的设计风格。
  </ui-collapse-item>
</ui-collapse>
```

## 隐藏箭头

通过设置 `is-link` 属性为 `false` 可以隐藏右侧箭头图标。

```vue
<ui-collapse v-model="activeNames">
  <ui-collapse-item title="隐藏箭头" name="1" :is-link="false">
    通过设置 is-link 为 false 可以隐藏右侧箭头。
  </ui-collapse-item>
  <ui-collapse-item title="显示箭头" name="2">
    默认显示右侧箭头。
  </ui-collapse-item>
</ui-collapse>
```

## 事件监听

通过 `change` 事件可以监听折叠面板的展开/收起状态变化。

```vue
<template>
  <ui-collapse v-model="activeNames" @change="onCollapseChange">
    <ui-collapse-item title="点击触发事件" name="1" @change="onItemChange">
      点击标题区域会触发 change 事件。
    </ui-collapse-item>
    <ui-collapse-item title="点击触发事件" name="2" @change="onItemChange">
      可以监听折叠面板的展开/收起状态变化。
    </ui-collapse-item>
  </ui-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref<(string | number)[]>([])

// 折叠面板整体变化事件
function onCollapseChange(names: (string | number)[] | string | number) {
  console.log('当前展开的面板:', names)
}

// 单个面板项变化事件
function onItemChange(expanded: boolean) {
  console.log('面板展开状态:', expanded)
}
</script>
```

## 切换所有面板

通过 `ref` 获取组件实例后，可以调用 `toggleAll` 方法切换所有面板的展开状态。

```vue
<template>
  <ui-button @click="toggleAll">切换全部</ui-button>
  <ui-button @click="expandAll">全部展开</ui-button>
  <ui-button @click="collapseAll">全部收起</ui-button>

  <ui-collapse ref="collapseRef" v-model="activeNames">
    <ui-collapse-item title="标题1" name="1">内容1</ui-collapse-item>
    <ui-collapse-item title="标题2" name="2">内容2</ui-collapse-item>
    <ui-collapse-item title="标题3" name="3">内容3</ui-collapse-item>
  </ui-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const collapseRef = ref()
const activeNames = ref<(string | number)[]>([])

// 切换所有面板状态
function toggleAll() {
  collapseRef.value?.toggleAll()
}

// 展开所有面板
function expandAll() {
  collapseRef.value?.toggleAll(true)
}

// 收起所有面板
function collapseAll() {
  collapseRef.value?.toggleAll(false)
}
</script>
```

::: warning 注意
`toggleAll` 方法仅在非手风琴模式下可用，手风琴模式下调用将会打印警告并忽略操作。
:::

## API

### Collapse Props

| 属性名       | 说明                                                         | 类型                                         | 默认值  |
| ------------ | ------------------------------------------------------------ | -------------------------------------------- | ------- |
| v-model      | 当前展开的面板名称，多选模式下为数组，手风琴模式下为字符串或数字 | `(string \| number)[] \| string \| number`   | `[]`    |
| accordion    | 是否开启手风琴模式，开启后同时只能展开一个面板               | `boolean`                                    | `false` |
| border       | 是否显示外边框                                               | `boolean`                                    | `true`  |
| custom-class | 自定义类名                                                   | `string`                                     | -       |
| custom-style | 自定义样式                                                   | `string \| CSSProperties`                    | -       |

### Collapse Events

| 事件名 | 说明                   | 回调参数                                              |
| ------ | ---------------------- | ----------------------------------------------------- |
| change | 切换面板时触发         | `activeNames: (string \| number)[] \| string \| number` |

### Collapse Methods

通过 `ref` 获取组件实例后可以调用以下方法：

| 方法名    | 说明                                                         | 参数                 |
| --------- | ------------------------------------------------------------ | -------------------- |
| toggleAll | 切换所有面板的展开状态，仅在非手风琴模式下可用               | `expanded?: boolean` |

### Collapse Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 放置 CollapseItem 组件内容 |

### CollapseItem Props

| 属性名          | 说明                                 | 类型                      | 默认值    |
| --------------- | ------------------------------------ | ------------------------- | --------- |
| name            | 唯一标识符，默认为索引值             | `string \| number`        | 索引值    |
| title           | 标题文本                             | `string`                  | -         |
| icon            | 左侧图标名称                         | `string`                  | -         |
| icon-size       | 图标大小                             | `string \| number`        | -         |
| icon-color      | 图标颜色                             | `string`                  | -         |
| icon-weight     | 图标粗细                             | `string \| number`        | -         |
| arrow-icon      | 右侧箭头图标名称                     | `string`                  | `arrow`   |
| is-link         | 是否显示右侧箭头                     | `boolean`                 | `true`    |
| disabled        | 是否禁用                             | `boolean`                 | `false`   |
| readonly        | 是否只读                             | `boolean`                 | `false`   |
| border          | 是否显示下边框                       | `boolean`                 | `true`    |
| value           | 标题右侧内容                         | `string`                  | -         |
| label           | 标题下方的描述信息                   | `string`                  | -         |
| content-padding | 内容区域的内边距                     | `string`                  | -         |
| custom-class    | 自定义类名                           | `string`                  | -         |
| custom-style    | 自定义样式                           | `string \| CSSProperties` | -         |

### CollapseItem Events

| 事件名 | 说明                   | 回调参数             |
| ------ | ---------------------- | -------------------- |
| click  | 点击标题区域时触发     | -                    |
| change | 展开或收起时触发       | `expanded: boolean`  |

### CollapseItem Methods

通过 `ref` 获取组件实例后可以调用以下方法：

| 方法名 | 说明                                 | 参数                |
| ------ | ------------------------------------ | ------------------- |
| toggle | 切换面板展开状态                     | `expanded?: boolean` |

### CollapseItem Slots

| 名称       | 说明               |
| ---------- | ------------------ |
| default    | 面板内容           |
| title      | 自定义标题区域     |
| icon       | 自定义左侧图标     |
| label      | 自定义描述信息     |
| value      | 自定义右侧内容     |
| right-icon | 自定义右侧箭头图标 |

## 主题定制

### CSS 变量

Collapse 组件提供了以下 CSS 变量，可用于自定义样式：

```scss
:root {
  // Collapse 组件变量
  --ui-collapse-border-color: var(--ui-color-border-light);
  --ui-collapse-border-width: var(--ui-border-width);

  // CollapseItem 组件变量
  --ui-collapse-item-arrow-size: var(--ui-font-size-md);
  --ui-collapse-item-label-size: var(--ui-font-size-sm);
  --ui-collapse-item-title-size: var(--ui-font-size-md);
  --ui-collapse-item-value-size: var(--ui-font-size-md);
  --ui-collapse-item-arrow-color: var(--ui-color-text-secondary);
  --ui-collapse-item-label-color: var(--ui-color-text-secondary);
  --ui-collapse-item-title-color: var(--ui-color-text-main);
  --ui-collapse-item-value-color: var(--ui-color-text-secondary);
  --ui-collapse-item-border-color: var(--ui-color-border-light);
  --ui-collapse-item-disabled-color: var(--ui-color-text-disabled);
  --ui-collapse-item-header-padding: var(--ui-spacing-lg) var(--ui-spacing-xl);
  --ui-collapse-item-content-padding: 0 var(--ui-spacing-xl) var(--ui-spacing-lg);
  --ui-collapse-item-transition-duration: 300ms;
}
```
