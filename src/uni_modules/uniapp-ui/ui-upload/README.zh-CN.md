# Upload 上传

文件上传组件。支持图片 / 视频 / 文件 / 媒体，多选 / 数量限制 / 大小限制 / 预览 / 删除拦截。

## 基础用法

```vue
<ui-upload v-model="fileList" />
```

```ts
const fileList = ref<string[]>([])  // 数组 → 多文件 URL
// 或单字符串：
const fileList = ref("")  // 逗号分隔 URL
```

## 多选 + 数量上限

```vue
<ui-upload v-model="fileList" multiple :max-count="5" />
```

## 大小限制

```vue
<ui-upload v-model="fileList" :max-size="1024 * 1024" @oversize="onOversize" />
```

函数形式自定义判断：

```vue
<ui-upload :max-size="file => file.size > 5 * 1024 * 1024" />
```

## 文件类型 accept

| accept  | 选择对象               |
| ------- | ---------------------- |
| `""`    | 文件（默认）           |
| `image` | 图片                   |
| `video` | 视频                   |
| `media` | 媒体（仅 MP-WEIXIN）   |
| `file`  | 文件（MP-WEIXIN / H5） |

## 拦截器

```vue
<ui-upload :before-read="onBeforeRead" :after-read="onAfterRead" :before-remove="onBeforeRemove" />
```

```ts
// 上传前：返回 false 拦截；返回 UploadFile[] 替换
function onBeforeRead(files: UploadFile[]) {
  return files.filter(f => /* 校验 */)
}

// 上传后：调 next(files) 把状态写回（处理 uploading → success / fail）
async function onAfterRead(files: UploadFile[], next: (files: UploadFile[]) => void) {
  for (const f of files) f.status = "uploading"
  const uploaded = await uploadToServer(files)
  uploaded.forEach(f => (f.status = "success"))
  next(uploaded)
}

// 删除前：返回 false 拦截
function onBeforeRemove(file: UploadFile, index: number) {
  return new Promise((resolve) => uni.showModal({ title: "确认删除", success: r => resolve(r.confirm) }))
}
```

## API

### Props

| 参数             | 说明                                            | 类型                                    | 默认值                      |
| ---------------- | ----------------------------------------------- | --------------------------------------- | --------------------------- |
| modelValue       | 绑定值（数组开启多 URL；字符串逗号分隔）        | `string \| string[]`                    | `""`                        |
| show             | 显示组件                                        | `boolean`                               | `true`                      |
| width            | 宽度                                            | `number \| string`                      | -                           |
| height           | 高度                                            | `number \| string`                      | -                           |
| accept           | 允许文件类型                                    | `UploadAccept`                          | `""`                        |
| capture          | 拾取模式                                        | `string[]`                              | `["album","camera"]`        |
| camera           | accept=video 时摄像头方向                       | `"back" \| "front"`                     | -                           |
| preview          | 点击预览（仅图片）                              | `boolean`                               | `false`                     |
| multiple         | 多选                                            | `boolean`                               | `false`                     |
| deletable        | 显示删除按钮                                    | `boolean`                               | `true`                      |
| disabled         | 禁用                                            | `boolean`                               | `false`                     |
| compressed       | accept=video 时压缩                             | `boolean`                               | `true`                      |
| background       | 背景色                                          | `string`                                | -                           |
| maxSize          | 单文件最大字节；`0` 无上限；函数自定义判断      | `number \| string \| (file) => boolean` | `0`                         |
| maxCount         | 数量上限；`0` 无上限                            | `number`                                | `0`                         |
| maxDuration      | accept=video 时最长拍摄秒数                     | `number`                                | `60`                        |
| sizeType         | 图片尺寸类型（H5 无效）                         | `string[]`                              | `["original","compressed"]` |
| previewGap       | 预览图间距                                      | `number \| string`                      | -                           |
| imageMode        | 图片显示模式                                    | `ImageProps["mode"]`                    | `"aspectFill"`              |
| previewIconSize  | 预览区图标尺寸                                  | `number \| string`                      | -                           |
| previewIconColor | 预览区图标颜色                                  | `string`                                | -                           |
| icon             | 上传区图标                                      | `string`                                | `"photograph"`              |
| iconSize         | 上传区图标尺寸                                  | `number \| string`                      | -                           |
| iconColor        | 上传区图标颜色                                  | `string`                                | -                           |
| beforeRead       | 上传前拦截 `(files) => boolean \| UploadFile[]` | `Function`                              | -                           |
| afterRead        | 上传后处理 `(files, next) => void`              | `Function`                              | -                           |
| beforeRemove     | 删除前拦截 `(file, index) => boolean`           | `Function`                              | -                           |
| customClass      | 自定义类名                                      | `string`                                | -                           |
| customStyle      | 自定义样式                                      | `string \| CSSProperties`               | -                           |

### Events

| 事件名            | 说明         | 回调参数                              |
| ----------------- | ------------ | ------------------------------------- |
| update:modelValue | v-model 更新 | `value: string \| string[]`           |
| delete            | 删除文件     | `{ index: number, file: UploadFile }` |
| oversize          | 文件超大     | `files: UploadFile[]`                 |

### Slots

| 名称    | 说明                             |
| ------- | -------------------------------- |
| trigger | 自定义触发器（覆盖默认上传图标） |
| icon    | 自定义上传图标                   |
| delete  | 自定义删除按钮                   |

### CSS Variables

| 变量名                           | 默认值                             | 说明         |
| -------------------------------- | ---------------------------------- | ------------ |
| `--ui-upload-width`              | `160rpx`                           | 宽度         |
| `--ui-upload-height`             | `160rpx`                           | 高度         |
| `--ui-upload-bg`                 | `var(--ui-color-background-page)`  | 背景         |
| `--ui-upload-radius`             | `0`                                | 圆角         |
| `--ui-upload-preview-gap`        | `20rpx`                            | 预览图间距   |
| `--ui-upload-icon-size`          | `56rpx`                            | 上传图标尺寸 |
| `--ui-upload-icon-color`         | `var(--ui-color-text-placeholder)` | 上传图标颜色 |
| `--ui-upload-preview-icon-size`  | `60rpx`                            | 预览图标尺寸 |
| `--ui-upload-preview-icon-color` | `var(--ui-color-text-placeholder)` | 预览图标颜色 |
| `--ui-upload-status-bg`          | `rgba(50, 50, 51, 0.88)`           | 状态遮罩背景 |
| `--ui-upload-delete-bg`          | `rgba(0, 0, 0, 0.7)`               | 删除按钮背景 |

## 注意事项

- `accept="media"` 与 `accept="file"` 跨端差异：`media` 仅 MP-WEIXIN；`file` 仅 MP-WEIXIN / H5
- `wx.chooseMessageFile` 仅 MP-WEIXIN，组件内已条件编译
- 上传状态机：选择 → `beforeRead` → push 列表（status=""）→ `afterRead(files, next)` 调用方设置 `status: "uploading" → "success" / "fail"`，通过 `next(files)` 回填
- `v-model` 数据类型决定结构（数组 / 字符串），保持一致
