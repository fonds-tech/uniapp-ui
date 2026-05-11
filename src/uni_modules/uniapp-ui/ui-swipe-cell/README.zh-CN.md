# SwipeCell 滑动单元格

左右滑动显示操作按钮。常用于列表项删除 / 编辑 / 收藏等场景。

## 基础用法

```vue
<ui-swipe-cell>
  <ui-cell title="单元格" value="左滑试试" />
  <template #right>
    <view class="action">删除</view>
  </template>
</ui-swipe-cell>
```

## 双向操作

```vue
<ui-swipe-cell>
  <ui-cell title="单元格" value="左右都可滑" />
  <template #left>
    <view class="action action--collect">收藏</view>
  </template>
  <template #right>
    <view class="action action--danger">删除</view>
  </template>
</ui-swipe-cell>
```

## 异步关闭

`beforeClose` 返回 `false` / `Promise<false>` 阻止关闭：

```vue
<ui-swipe-cell :before-close="beforeClose">
  ...
</ui-swipe-cell>

<script setup>
async function beforeClose({ position, close }) {
  if (position === "right") {
    const ok = await confirm("确定删除？")
    if (!ok) return false
  }
}
</script>
```

## 自定义宽度

未显式传 `left-width` / `right-width` 时自动测量插槽宽度。需要精确控制可显式传入：

```vue
<ui-swipe-cell left-width="120rpx" right-width="200rpx">...</ui-swipe-cell>
```

## 实例方法

```vue
<ui-swipe-cell ref="cellRef">...</ui-swipe-cell>

<script setup>
const cellRef = ref()
cellRef.value?.open("right")  // 编程式打开
cellRef.value?.close()        // 关闭（走 beforeClose）
cellRef.value?.isOpen()       // 当前是否打开
</script>
```

## API

### Props

| 参数             | 说明                                                         | 类型                                          | 默认值  |
| ---------------- | ------------------------------------------------------------ | --------------------------------------------- | ------- |
| name             | 标识符；点击事件参数区分多个单元格                           | `string \| number`                            | -       |
| disabled         | 禁用滑动                                                     | `boolean`                                     | `false` |
| left-width       | 左侧区域宽度（px/rpx/纯数字），未传自动测量                  | `number \| string`                            | -       |
| right-width      | 右侧区域宽度（px/rpx/纯数字），未传自动测量                  | `number \| string`                            | -       |
| before-close     | 关闭前拦截                                                   | `(params) => boolean \| void \| Promise<...>` | -       |
| stop-propagation | 阻止滑动事件冒泡（仅 H5 生效，MP 端需模板修饰符）            | `boolean`                                     | `true`  |
| threshold        | 打开阈值（0-1）；滑动距离超过 `阈值 × 区域宽度` 触发自动打开 | `number \| string`                            | `0.3`   |
| custom-class     | 自定义类名                                                   | `string`                                      | -       |
| custom-style     | 自定义样式                                                   | `string \| CSSProperties`                     | -       |

### Events

| 事件名 | 说明           | 回调参数                                |
| ------ | -------------- | --------------------------------------- |
| open   | 打开滑动单元格 | `{ name, position: 'left' \| 'right' }` |
| close  | 关闭滑动单元格 | `{ name, position: 'left' \| 'right' }` |
| click  | 点击区域       | `position: 'left' \| 'right' \| 'cell'` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 单元格主内容 |
| left    | 左侧操作区   |
| right   | 右侧操作区   |

### 暴露方法

| 方法   | 说明                           |
| ------ | ------------------------------ |
| open   | 打开 `'left'` / `'right'` 方向 |
| close  | 关闭（走 beforeClose 拦截链）  |
| isOpen | 当前是否打开                   |

## 注意事项

- 拖动结束后下一帧才解锁 click，避免拖动尾部触发到内容点击
- `stop-propagation` 只在 H5 生效；小程序端需要内层用 `catch:touchmove` 处理冒泡
- 同一列表多个 swipe-cell 互不感知；如需「同时只展开一个」，需自行维护引用并调用 `close()`
