# Toast 轻提示

轻量级的消息提示组件。

## 基础用法

```vue
<script setup>
import { useToast } from "@/uni_modules/uniapp-ui"

const { showToast } = useToast()

function handleClick() {
  showToast("文字提示")
}
</script>
```

## 成功/失败提示

```vue
showToast({ message: '操作成功', type: 'success' }) showToast({ message: '操作失败', type: 'fail' })
```

## 加载提示

```vue
showToast({ message: '加载中...', type: 'loading', duration: 0 }) // 关闭 hideToast()
```

## 自定义图标

```vue
showToast({ message: '收藏成功', icon: 'star' })
```

## 自定义位置

```vue
showToast({ message: '顶部展示', position: 'top' }) showToast({ message: '居中展示', position: 'center' }) showToast({ message: '底部展示', position: 'bottom' })
```

## 自定义时长

```vue
showToast({ message: '3秒后关闭', duration: 3000 })
```

## API

### 方法

| 方法名    | 说明     | 参数                      |
| --------- | -------- | ------------------------- |
| showToast | 展示提示 | `message \| ToastOptions` |
| hideToast | 关闭提示 | -                         |

### ToastOptions

| 属性名      | 说明             | 类型                                 | 默认值   |
| ----------- | ---------------- | ------------------------------------ | -------- |
| message     | 提示内容         | `string`                             | -        |
| type        | 提示类型         | `text \| loading \| success \| fail` | `text`   |
| icon        | 自定义图标       | `string`                             | -        |
| position    | 位置             | `top \| center \| bottom`            | `center` |
| duration    | 展示时长(ms)     | `number`                             | `2000`   |
| overlay     | 是否显示遮罩层   | `boolean`                            | `false`  |
| forbidClick | 是否禁止点击背景 | `boolean`                            | `false`  |
