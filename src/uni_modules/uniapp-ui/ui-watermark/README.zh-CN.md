# Watermark 水印

文字 / 图片水印组件。在内容区或全屏叠加重复水印，防止内容截图盗用。

## 基础用法

```vue
<ui-watermark content="Uniapp UI" :full-page="false">
  <view class="content">需要保护的内容</view>
</ui-watermark>
```

## 多行文字

`content` 传字符串数组：

```vue
<ui-watermark :content="['公司名称', '2026-05-12']" :full-page="false">
  <view>...</view>
</ui-watermark>
```

## 图片水印

`image` 优先级高于 `content`（同时设置时 content 被忽略）。

```vue
<ui-watermark image="/static/logo.png" :width="60" :height="60" :full-page="false">
  <view>...</view>
</ui-watermark>
```

## 全屏水印

```vue
<ui-watermark content="机密" full-page />
```

## API

### Props

| 参数        | 说明                               | 类型                                      | 默认值                                       |
| ----------- | ---------------------------------- | ----------------------------------------- | -------------------------------------------- |
| content     | 文字内容（数组=多行）              | `string \| string[]`                      | -                                            |
| image       | 图片 URL（优先于 content）         | `string`                                  | -                                            |
| width       | 单个水印宽度（px）                 | `number \| string`                        | `120`                                        |
| height      | 单个水印高度（px）                 | `number \| string`                        | `64`                                         |
| rotate      | 旋转角度（度）                     | `number`                                  | `-22`                                        |
| zIndex      | 水印层级                           | `number`                                  | `100`                                        |
| fullPage    | 全屏覆盖                           | `boolean`                                 | `true`                                       |
| gapX        | 水平间距（px）                     | `number \| string`                        | `24`                                         |
| gapY        | 垂直间距（px）                     | `number \| string`                        | `48`                                         |
| fontSize    | 字号（px）                         | `number \| string`                        | `14`                                         |
| fontColor   | 字色（必须具体色值，不接 CSS var） | `string`                                  | `"rgba(0, 0, 0, 0.15)"`                      |
| fontFamily  | 字体                               | `string`                                  | `"PingFang SC, Microsoft YaHei, sans-serif"` |
| fontWeight  | 字重                               | `"normal" \| "light" \| "bold" \| number` | `"normal"`                                   |
| opacity     | 透明度                             | `number`                                  | `1`                                          |
| customClass | 自定义类名                         | `string`                                  | -                                            |
| customStyle | 自定义样式                         | `string \| CSSProperties`                 | -                                            |

### 暴露方法

| 方法       | 说明         |
| ---------- | ------------ |
| regenerate | 重新生成水印 |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 被水印覆盖的内容 |

## 注意事项

- `fontColor` 必须是具体色值（hex / rgb / rgba），**不接** `primary` 等语义名（canvas API 限制）
- `image` 与 `content` 同时设置时 `image` 优先；想用文字需删 `image`
- H5 跨域图片需服务器配合 CORS 头（组件内已加 `crossOrigin = "anonymous"`）
- 单位是 **px** 不是 rpx（canvas 绘制单位）
- 水印通过 canvas 离屏渲染 base64 后注入 background-image；动态变更属性会触发重新生成
