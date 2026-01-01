# Upload 上传

文件上传组件，支持图片选择和预览。

## 基础用法

```vue
<template>
  <ui-upload v-model="fileList" />
</template>

<script setup>
import { ref } from "vue"
const fileList = ref([])
</script>
```

## 多选上传

通过 `multiple` 属性支持多选。

```vue
<template>
  <ui-upload v-model="fileList" multiple />
</template>
```

## 限制数量

通过 `max-count` 属性限制上传数量。

```vue
<template>
  <ui-upload v-model="fileList" :max-count="3" multiple />
</template>
```

## 限制大小

通过 `max-size` 属性限制文件大小（单位：字节），超出时触发 `oversize` 事件。

```vue
<template>
  <ui-upload v-model="fileList" :max-size="1024 * 1024" @oversize="onOversize" />
</template>

<script setup>
function onOversize() {
  uni.showToast({ title: "文件大小超过限制", icon: "none" })
}
</script>
```

## 禁用状态

通过 `disabled` 属性禁用上传。

```vue
<template>
  <ui-upload v-model="fileList" disabled />
</template>
```

## 自定义尺寸

通过 `width` 和 `height` 属性自定义上传区域尺寸。

```vue
<template>
  <ui-upload v-model="fileList" width="200rpx" height="200rpx" />
</template>
```

## 开启预览

通过 `preview` 属性开启图片预览功能。

```vue
<template>
  <ui-upload v-model="fileList" preview />
</template>
```

## Props

| 参数               | 说明                         | 类型                                     | 默认值                       |
| ------------------ | ---------------------------- | ---------------------------------------- | ---------------------------- |
| v-model            | 已上传的文件列表             | `string \| array`                        | -                            |
| show               | 是否显示组件                 | `boolean`                                | `true`                       |
| width              | 宽度                         | `string \| number`                       | `160rpx`                     |
| height             | 高度                         | `string \| number`                       | `160rpx`                     |
| accept             | 允许上传的文件类型           | `image \| video \| media \| file \| all` | -                            |
| capture            | 图片或视频拾取模式           | `array`                                  | `['album', 'camera']`        |
| camera             | 视频摄像头选择               | `back \| front`                          | -                            |
| preview            | 是否点击预览                 | `boolean`                                | `false`                      |
| multiple           | 是否多选                     | `boolean`                                | `false`                      |
| deletable          | 是否展示删除按钮             | `boolean`                                | `true`                       |
| disabled           | 是否禁用                     | `boolean`                                | `false`                      |
| compressed         | 是否压缩视频                 | `boolean`                                | `true`                       |
| background         | 背景颜色                     | `string`                                 | -                            |
| max-size           | 选择单个文件的最大大小(字节) | `number \| string \| function`           | `Infinity`                   |
| max-count          | 文件上传数量限制             | `number`                                 | `Infinity`                   |
| max-duration       | 拍摄视频最长时间(秒)         | `number`                                 | `60`                         |
| size-type          | 压缩图类型                   | `array`                                  | `['original', 'compressed']` |
| preview-gap        | 预览上传图之间的间隔         | `string \| number`                       | `20rpx`                      |
| image-mode         | 图片显示模式                 | `string`                                 | `aspectFill`                 |
| preview-icon-size  | 预览区图标大小               | `string \| number`                       | `60rpx`                      |
| preview-icon-color | 预览区图标颜色               | `string`                                 | `#cccccc`                    |
| icon               | 上传区域图标                 | `string`                                 | `photograph`                 |
| icon-size          | 上传区域图标大小             | `string \| number`                       | `56rpx`                      |
| icon-color         | 上传区域图标颜色             | `string`                                 | `#cccccc`                    |
| before-remove      | 文件删除前的回调函数         | `function`                               | -                            |
| after-read         | 文件读取完成后的回调函数     | `function`                               | -                            |
| before-read        | 文件读取前的回调函数         | `function`                               | -                            |
| custom-class       | 自定义类名                   | `string`                                 | -                            |
| custom-style       | 自定义样式                   | `string \| object`                       | -                            |

## Events

| 事件名   | 说明                   | 回调参数                       |
| -------- | ---------------------- | ------------------------------ |
| upload   | 上传时触发             | `{ files: any }`               |
| delete   | 删除时触发             | `{ index: number, file: any }` |
| oversize | 文件大小超过限制时触发 | `files: UploadFile[]`          |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义上传区域内容 |
