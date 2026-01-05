# SwipeCell 滑动单元格

可以左右滑动来展示操作按钮的单元格组件，常用于列表项的快捷操作场景。

## 基础用法

左滑显示操作按钮，通过 `right` 插槽设置右侧操作区域内容。

```vue
<ui-swipe-cell @open="onOpen" @close="onClose">
  <ui-cell title="单元格" value="内容" />
  <template #right>
    <view class="action-btn action-btn--danger" @click="onDelete">删除</view>
  </template>
</ui-swipe-cell>

<script setup lang="ts">
function onOpen(params: { name: string | number; position: string }) {
  console.log('打开:', params.position)
}

function onClose(params: { name: string | number; position: string }) {
  console.log('关闭:', params.position)
}

function onDelete() {
  uni.showModal({
    title: '提示',
    content: '确定删除吗？',
  })
}
</script>

<style scoped>
.action-btn {
  color: #fff;
  height: 100%;
  display: flex;
  padding: 0 32rpx;
  font-size: 28rpx;
  align-items: center;
  justify-content: center;
}
.action-btn--danger {
  background: #ee0a24;
}
</style>
```

## 左右滑动

同时设置 `left` 和 `right` 插槽，可以实现左右滑动展示不同的操作按钮。

```vue
<ui-swipe-cell>
  <ui-cell title="单元格" value="左右滑动试试" />
  <template #left>
    <view class="action-btn action-btn--primary">选择</view>
  </template>
  <template #right>
    <view class="action-btn action-btn--warning">收藏</view>
    <view class="action-btn action-btn--danger">删除</view>
  </template>
</ui-swipe-cell>

<style scoped>
.action-btn {
  color: #fff;
  height: 100%;
  display: flex;
  padding: 0 32rpx;
  font-size: 28rpx;
  align-items: center;
  justify-content: center;
}
.action-btn--primary {
  background: #1989fa;
}
.action-btn--warning {
  background: #ff976a;
}
.action-btn--danger {
  background: #ee0a24;
}
</style>
```

## 自定义内容

默认插槽可以放置任意内容，实现自定义单元格样式。

```vue
<ui-swipe-cell>
  <view class="custom-cell">
    <ui-image
      src="https://img.yzcdn.cn/vant/cat.jpeg"
      width="80rpx"
      height="80rpx"
      radius="8rpx"
    />
    <view class="custom-cell__content">
      <text class="custom-cell__title">商品名称</text>
      <text class="custom-cell__desc">描述信息</text>
    </view>
    <text class="custom-cell__price">¥99.00</text>
  </view>
  <template #right>
    <view class="action-btn action-btn--danger">删除</view>
  </template>
</ui-swipe-cell>

<style scoped>
.custom-cell {
  display: flex;
  padding: 24rpx 32rpx;
  background: #fff;
  align-items: center;
}
.custom-cell__content {
  flex: 1;
  display: flex;
  margin-left: 24rpx;
  flex-direction: column;
}
.custom-cell__title {
  color: #323233;
  font-size: 28rpx;
  font-weight: 500;
}
.custom-cell__desc {
  color: #969799;
  font-size: 24rpx;
  margin-top: 8rpx;
}
.custom-cell__price {
  color: #ee0a24;
  font-size: 32rpx;
  font-weight: 600;
}
.action-btn {
  color: #fff;
  height: 100%;
  display: flex;
  padding: 0 48rpx;
  font-size: 28rpx;
  align-items: center;
  justify-content: center;
}
.action-btn--danger {
  background: #ee0a24;
}
</style>
```

## 异步关闭

通过 `before-close` 属性可以设置关闭前的回调函数，返回 `false` 可以阻止关闭，支持返回 Promise。

```vue
<ui-swipe-cell :before-close="beforeClose">
  <ui-cell title="异步关闭" value="点击删除按钮" />
  <template #right>
    <view class="action-btn action-btn--danger">删除</view>
  </template>
</ui-swipe-cell>

<script setup lang="ts">
import type { SwipeCellBeforeCloseParams } from '@/uni_modules/uniapp-ui/ui-swipe-cell'

function beforeClose(params: SwipeCellBeforeCloseParams): Promise<boolean> {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: (res) => {
        if (res.confirm) {
          uni.showToast({ title: '删除成功', icon: 'success' })
          resolve(true) // 允许关闭
        } else {
          resolve(false) // 阻止关闭
        }
      },
    })
  })
}
</script>
```

## 禁用滑动

设置 `disabled` 属性可以禁用滑动功能。

```vue
<ui-swipe-cell disabled>
  <ui-cell title="禁用滑动" value="无法滑动" />
  <template #right>
    <view class="action-btn action-btn--danger">删除</view>
  </template>
</ui-swipe-cell>
```

## 列表场景

在列表中使用滑动单元格时，可以通过 `name` 属性为每个单元格设置唯一标识。

```vue
<ui-swipe-cell
  v-for="(item, index) in listData"
  :key="item.id"
  :name="item.id"
  @click="onItemClick"
>
  <ui-cell :title="item.title" :value="item.value" />
  <template #right>
    <view class="action-btn action-btn--primary" @click.stop="onEdit(item)">编辑</view>
    <view class="action-btn action-btn--danger" @click.stop="onDeleteItem(item)">删除</view>
  </template>
</ui-swipe-cell>

<script setup lang="ts">
import { ref } from 'vue'

const listData = ref([
  { id: 1, title: '列表项 1', value: '内容' },
  { id: 2, title: '列表项 2', value: '内容' },
  { id: 3, title: '列表项 3', value: '内容' },
])

function onItemClick(position: string) {
  console.log('点击位置:', position)
}

function onEdit(item: { id: number; title: string }) {
  uni.showToast({ title: `编辑: ${item.title}`, icon: 'none' })
}

function onDeleteItem(item: { id: number; title: string }) {
  uni.showModal({
    title: '提示',
    content: `确定删除 ${item.title} 吗？`,
    success: (res) => {
      if (res.confirm) {
        const index = listData.value.findIndex((i) => i.id === item.id)
        if (index > -1) {
          listData.value.splice(index, 1)
        }
      }
    },
  })
}
</script>
```

## 手动控制

通过 ref 获取组件实例，可以调用 `open` 和 `close` 方法手动控制滑动单元格的展开与收起。

```vue
<ui-swipe-cell ref="swipeCellRef">
  <ui-cell title="手动控制" value="通过按钮控制" />
  <template #right>
    <view class="action-btn action-btn--danger">删除</view>
  </template>
</ui-swipe-cell>

<ui-button @click="openLeft">打开左侧</ui-button>
<ui-button @click="openRight">打开右侧</ui-button>
<ui-button @click="closeCell">关闭</ui-button>

<script setup lang="ts">
import { ref } from 'vue'
import type { SwipeCellInstance } from '@/uni_modules/uniapp-ui/ui-swipe-cell'

const swipeCellRef = ref<SwipeCellInstance>()

function openLeft() {
  swipeCellRef.value?.open('left')
}

function openRight() {
  swipeCellRef.value?.open('right')
}

function closeCell() {
  swipeCellRef.value?.close()
}
</script>
```

## API

### Props

| 属性名          | 说明                                              | 类型                                                    | 默认值  |
| --------------- | ------------------------------------------------- | ------------------------------------------------------- | ------- |
| name            | 标识符，用于在事件中区分不同的滑动单元格          | `string \| number`                                      | -       |
| disabled        | 是否禁用滑动                                      | `boolean`                                               | `false` |
| left-width      | 左侧滑动区域宽度，单位为 px                       | `number \| string`                                      | `0`     |
| right-width     | 右侧滑动区域宽度，单位为 px                       | `number \| string`                                      | `0`     |
| before-close    | 关闭前的回调函数，返回 false 可阻止关闭           | `(params: SwipeCellBeforeCloseParams) => boolean \| void \| Promise<boolean \| void>` | -       |
| stop-propagation | 是否阻止滑动事件冒泡                              | `boolean`                                               | `true`  |
| threshold       | 打开时触发的阈值比例，超过此比例自动打开，范围 0-1 | `number \| string`                                      | `0.3`   |
| custom-class    | 自定义类名                                        | `string`                                                | -       |
| custom-style    | 自定义样式                                        | `string \| CSSProperties`                               | -       |

### Events

| 事件名 | 说明         | 回调参数                                              |
| ------ | ------------ | ----------------------------------------------------- |
| open   | 打开时触发   | `{ name: string \| number, position: SwipeCellPosition }` |
| close  | 关闭时触发   | `{ name: string \| number, position: SwipeCellPosition }` |
| click  | 点击时触发   | `position: 'left' \| 'right' \| 'cell' \| 'outside'`  |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 主内容区域     |
| left    | 左侧操作区域   |
| right   | 右侧操作区域   |

### Methods

通过 ref 可以获取到 SwipeCell 实例并调用实例方法。

| 方法名 | 说明                          | 参数                              | 返回值 |
| ------ | ----------------------------- | --------------------------------- | ------ |
| open   | 打开滑动单元格                | `position: 'left' \| 'right'`     | -      |
| close  | 关闭滑动单元格                | -                                 | -      |

### 类型定义

```typescript
// 滑动位置类型
type SwipeCellPosition = 'left' | 'right' | ''

// 关闭前回调参数
interface SwipeCellBeforeCloseParams {
  /** 当前展开的位置 */
  position: SwipeCellPosition
  /** 关闭方法 */
  close: () => void
}

// 关闭前回调函数类型
type SwipeCellBeforeClose = (
  params: SwipeCellBeforeCloseParams
) => boolean | void | Promise<boolean | void>

// 组件实例类型
type SwipeCellInstance = InstanceType<typeof SwipeCell>
```

## 主题定制

组件使用以下 CSS 变量，可通过修改变量值来自定义样式。

| 变量名                    | 说明           | 默认值  |
| ------------------------- | -------------- | ------- |
| --ui-color-background     | 背景颜色       | `#fff`  |

## 注意事项

1. **操作区域宽度**：组件会自动计算左右插槽的宽度，但也可以通过 `left-width` 和 `right-width` 属性手动指定，手动指定时优先级更高。

2. **阻止事件冒泡**：在列表场景中，操作按钮的点击事件需要使用 `@click.stop` 来阻止事件冒泡到单元格。

3. **内存管理**：组件内部已处理好资源清理，无需额外处理。

4. **跨平台兼容**：组件基于触摸事件实现，支持 H5、微信小程序等多端平台。
