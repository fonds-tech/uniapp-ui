# TreeSelect 分类选择

左侧分类导航 + 右侧子项选择。支持单选 / 多选 / 禁用 / 最大数量限制。

## 单选

`activeId` 传单值开启单选。

```vue
<ui-tree-select v-model:main-active-index="navIndex" v-model:active-id="activeId" :items="items" />
```

```ts
const items = [
  { text: "浙江", children: [{ id: 1, text: "杭州" }, { id: 2, text: "温州" }] },
  { text: "江苏", children: [{ id: 3, text: "南京" }] },
]
const navIndex = ref(0)
const activeId = ref<number>(1)
```

## 多选

`activeId` 传数组开启多选。

```vue
<ui-tree-select v-model:main-active-index="navIndex" v-model:active-id="activeIds" :items="items" />
```

```ts
const activeIds = ref<number[]>([1, 2])
```

## 限制最大数量

```vue
<ui-tree-select v-model:active-id="activeIds" :items="items" :max="3" @max-reached="onMaxReached" />
```

## 禁用

分类 / 子项任一节点设 `disabled: true`。

```ts
const items = [
  { text: "广东", disabled: true, children: [] },
  { text: "浙江", children: [{ id: 1, text: "杭州", disabled: true }] },
]
```

## 自定义内容

```vue
<ui-tree-select :items="items">
  <template #nav-text="{ item, active }">
    <text>{{ active ? "→" : "" }}{{ item.text }}</text>
  </template>
  <template #item="{ item, active }">
    <view>{{ item.text }} {{ active ? "✓" : "" }}</view>
  </template>
</ui-tree-select>
```

## API

### Props

| 参数            | 说明                             | 类型                        | 默认值     |
| --------------- | -------------------------------- | --------------------------- | ---------- |
| items           | 分类数据                         | `TreeSelectItem[]`          | `[]`       |
| mainActiveIndex | 当前分类索引（v-model）          | `number \| string`          | `0`        |
| activeId        | 选中 id（v-model；数组开启多选） | `number \| string \| array` | -          |
| max             | 多选上限；`0` 无上限             | `number \| string`          | `0`        |
| height          | 组件高度                         | `number \| string`          | `"600rpx"` |
| selectedIcon    | 选中图标名                       | `string`                    | `"check"`  |
| navWidth        | 左侧 nav 宽度                    | `number \| string`          | -          |
| navBg           | 左侧 nav 背景色                  | `string`                    | -          |
| activeColor     | 选中态主色                       | `string`                    | -          |
| indicatorWidth  | 激活指示条宽度                   | `number \| string`          | -          |
| indicatorHeight | 激活指示条高度                   | `number \| string`          | -          |
| itemFontSize    | 子项字号                         | `number \| string`          | -          |
| customClass     | 自定义类名                       | `string`                    | -          |
| customStyle     | 自定义样式                       | `string \| CSSProperties`   | -          |

### Events

| 事件名                 | 说明             | 回调参数                  |
| ---------------------- | ---------------- | ------------------------- |
| update:mainActiveIndex | 分类索引变化     | `index: number \| string` |
| update:activeId        | 选中变化         | `id: ActiveIdType`        |
| clickNav               | 点击左侧分类     | `index: number`           |
| clickItem              | 点击右侧子项     | `item: TreeSelectChild`   |
| maxReached             | 多选达上限再点击 | `max: number`             |

### Slots

| 名称     | 说明                | 插槽参数                  |
| -------- | ------------------- | ------------------------- |
| nav-text | 自定义 nav 文字渲染 | `{ item, index, active }` |
| item     | 自定义子项渲染      | `{ item, active }`        |
| content  | 完全自定义右侧内容  | -                         |

### CSS Variables

| 变量名                              | 默认值                            | 说明          |
| ----------------------------------- | --------------------------------- | ------------- |
| `--ui-tree-select-nav-width`        | `200rpx`                          | 左侧 nav 宽度 |
| `--ui-tree-select-nav-bg`           | `var(--ui-color-background-page)` | nav 背景      |
| `--ui-tree-select-content-bg`       | `var(--ui-color-background)`      | 内容区背景    |
| `--ui-tree-select-active-color`     | `var(--ui-color-primary)`         | 选中态主色    |
| `--ui-tree-select-indicator-width`  | `6rpx`                            | 指示条宽度    |
| `--ui-tree-select-indicator-height` | `40rpx`                           | 指示条高度    |
| `--ui-tree-select-nav-font-size`    | `var(--ui-font-size-md)`          | nav 字号      |
| `--ui-tree-select-item-font-size`   | `var(--ui-font-size-md)`          | 子项字号      |

## 注意事项

- `activeId` 数据类型决定单/多选模式（单值 vs 数组）
- `max=0` 表示无上限；正数表示多选上限
- `disabled` 可设在分类层（整组不可点）或子项层（单项不可点）
- 长文本会自动 ellipsis 截断
