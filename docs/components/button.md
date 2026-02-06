# Button 按钮

常用的操作按钮，支持多种类型、尺寸和状态。

## 基础用法

按钮支持 `primary`、`success`、`warning`、`danger`、`info`、`default` 六种类型。

```vue
<template>
  <ui-button type="primary">主要按钮</ui-button>
  <ui-button type="success">成功按钮</ui-button>
  <ui-button type="warning">警告按钮</ui-button>
  <ui-button type="danger">危险按钮</ui-button>
  <ui-button type="info">信息按钮</ui-button>
  <ui-button type="default">默认按钮</ui-button>
</template>
```

## 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```vue
<template>
  <ui-button type="primary" plain>朴素按钮</ui-button>
  <ui-button type="success" plain>朴素按钮</ui-button>
  <ui-button type="warning" plain>朴素按钮</ui-button>
</template>
```

## 文字按钮

通过 `text` 属性将按钮设置为文字按钮，文字按钮没有边框和背景。

```vue
<template>
  <ui-button type="primary" text>文字按钮</ui-button>
  <ui-button type="success" text>文字按钮</ui-button>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用按钮，禁用状态下按钮不可点击。

```vue
<template>
  <ui-button type="primary" disabled>禁用状态</ui-button>
  <ui-button type="success" disabled>禁用状态</ui-button>
</template>
```

## 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下按钮不可点击。

```vue
<template>
  <ui-button type="primary" loading>加载中</ui-button>
  <ui-button type="success" loading loading-text="提交中...">提交</ui-button>
</template>
```

## 按钮尺寸

支持 `mini`、`small`、`normal`、`large` 四种尺寸。

```vue
<template>
  <ui-button type="primary" size="large">大号按钮</ui-button>
  <ui-button type="primary" size="normal">普通按钮</ui-button>
  <ui-button type="primary" size="small">小型按钮</ui-button>
  <ui-button type="primary" size="mini">迷你按钮</ui-button>
</template>
```

## 圆形按钮

通过 `round` 属性设置圆形按钮。

```vue
<template>
  <ui-button type="primary" round>圆形按钮</ui-button>
  <ui-button type="success" round>圆形按钮</ui-button>
</template>
```

## 块级按钮

通过 `block` 属性设置按钮为块级元素，按钮将占满父元素宽度。

```vue
<template>
  <ui-button type="primary" block>块级按钮</ui-button>
  <ui-button type="success" block>块级按钮</ui-button>
</template>
```

## 图标按钮

通过 `icon` 属性设置按钮图标，`icon-position` 控制图标位置。

```vue
<template>
  <ui-button type="primary" icon="search">搜索</ui-button>
  <ui-button type="success" icon="plus">新增</ui-button>
  <ui-button type="primary" icon="arrow-right" icon-position="right">下一步</ui-button>
</template>
```

## 自定义颜色

通过 `color` 属性自定义按钮背景色，`text-color` 自定义文字颜色。

```vue
<template>
  <ui-button color="#7232dd">自定义颜色</ui-button>
  <ui-button color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"> 渐变色按钮 </ui-button>
</template>
```

## Props

| 参数                   | 说明                       | 类型                                                                 | 默认值    |
| ---------------------- | -------------------------- | -------------------------------------------------------------------- | --------- |
| type                   | 按钮类型                   | `primary \| success \| warning \| danger \| info \| default \| error` | `primary` |
| size                   | 按钮尺寸                   | `mini \| small \| normal \| large`                                   | `normal`  |
| round                  | 是否圆形按钮               | `boolean`                                                            | `false`   |
| text                   | 是否文字按钮               | `boolean`                                                            | `false`   |
| plain                  | 是否朴素按钮               | `boolean`                                                            | `false`   |
| block                  | 是否块级按钮               | `boolean`                                                            | `false`   |
| color                  | 按钮颜色，支持渐变色       | `string`                                                             | -         |
| width                  | 按钮宽度                   | `string \| number`                                                    | -         |
| height                 | 按钮高度                   | `string \| number`                                                    | -         |
| disabled               | 是否禁用                   | `boolean`                                                            | `false`   |
| loading                | 是否加载中                 | `boolean`                                                            | `false`   |
| shadow                 | 按钮阴影                   | `string`                                                             | -         |
| loading-text           | 加载中文本                 | `string`                                                             | -         |
| loading-icon-size      | 加载图标大小               | `string \| number`                                                    | -         |
| text-size              | 文本大小                   | `string \| number`                                                    | -         |
| text-color             | 文本颜色                   | `string`                                                             | -         |
| text-weight            | 文本粗细                   | `string \| number`                                                    | -         |
| icon                   | 图标名称                   | `string`                                                             | `""`     |
| icon-position          | 图标位置                   | `left \| right`                                                       | `left`    |
| icon-size              | 图标大小                   | `string \| number`                                                    | -         |
| icon-color             | 图标颜色                   | `string`                                                             | `""`     |
| icon-weight            | 图标粗细                   | `string \| number`                                                    | -         |
| border-radius          | 圆角大小                   | `string \| number`                                                    | -         |
| border-width           | 边框宽度                   | `string \| number`                                                    | -         |
| border-color           | 边框颜色                   | `string`                                                             | -         |
| form-type              | 表单类型                   | `submit \| reset`                                                     | -         |
| open-type              | 开放能力                   | `feedback \| share \| getUserInfo \| contact \| getPhoneNumber \| getRealtimePhoneNumber \| launchApp \| openSetting \| chooseAvatar \| getAuthorize \| lifestyle \| contactShare \| openGroupProfile \| openGuildProfile \| openPublicProfile \| shareMessageToFriend \| addFriend \| addColorSign \| addGroupApp \| addToFavorites \| chooseAddress \| chooseInvoiceTitle \| login \| subscribe \| favorite \| watchLater \| openProfile \| agreePrivacyAuthorization` | - |
| app-parameter          | 打开 APP 参数              | `string`                                                             | -         |
| hover-stop-propagation | 阻止祖先节点出现点击态     | `boolean`                                                            | `true`    |
| lang                   | 指定返回用户信息语言       | `zh_CN \| zh_TW \| en`                                                | `zh_CN`   |
| session-from           | 会话来源（contact）        | `string`                                                             | -         |
| send-message-title     | 会话内消息卡片标题         | `string`                                                             | -         |
| send-message-path      | 会话内消息卡片路径         | `string`                                                             | -         |
| send-message-img       | 会话内消息卡片图片         | `string`                                                             | -         |
| show-message-card      | 是否显示会话内消息卡片     | `boolean`                                                            | `false`   |
| group-id               | 群号（openGroupProfile）   | `string`                                                             | -         |
| guild-id               | 频道号（openGuildProfile） | `string`                                                             | -         |
| public-id              | 公众号号（openPublicProfile） | `string`                                                          | -         |
| data-im-id             | 客服抖音号（im）           | `string`                                                             | -         |
| data-im-type           | IM卡片类型（im）           | `string`                                                             | -         |
| data-goods-id          | 商品 id（im）              | `string`                                                             | -         |
| data-order-id          | 订单 id（im）              | `string`                                                             | -         |
| data-biz-line          | 商品类型（im）             | `string`                                                             | -         |
| contact-type           | 客服类型                   | `string`                                                             | -         |
| contact-id             | 客服 ID                    | `string`                                                             | -         |
| throttle               | 节流时间(ms)               | `number`                                                             | `200`     |
| hover-start-time       | 按住后多久出现点击态       | `number`                                                             | `0`       |
| hover-stay-time        | 手指松开后点击态保留时间   | `number`                                                             | `50`      |
| margin-left            | 左外边距                   | `string \| number`                                                    | -         |
| margin-right           | 右外边距                   | `string \| number`                                                    | -         |
| custom-class           | 自定义类名                 | `string`                                                             | `""`     |
| custom-style           | 自定义样式                 | `string \| object`                                                    | `""`     |

## Events

| 事件名                     | 说明                         | 回调参数 |
| -------------------------- | ---------------------------- | -------- |
| click                      | 点击按钮时触发               | `event`  |
| error                      | 发生错误时触发               | `event`  |
| launchapp                  | 打开 APP 时触发              | `event`  |
| getuserinfo                | 获取用户信息时触发           | `event`  |
| opensetting                | 打开设置时触发               | `event`  |
| getphonenumber             | 获取手机号时触发             | `event`  |
| contact                    | 客服消息回调                 | `event`  |
| chooseavatar               | 获取用户头像回调             | `event`  |
| agreeprivacyauthorization  | 同意隐私协议回调             | `event`  |
| addgroupapp                | 添加群应用回调               | `event`  |
| chooseaddress              | 选择收货地址回调             | `event`  |
| chooseinvoicetitle         | 选择发票抬头回调             | `event`  |
| subscribe                  | 订阅消息授权回调             | `event`  |
| login                      | 登录回调                     | `event`  |
| im                         | IM 跳转回调                  | `event`  |

## Methods

| 方法名      | 说明           | 参数 |
| ----------- | -------------- | ---- |
| setLoading  | 设置加载状态   | `state: boolean, text?: string` |
| setDisabled | 设置禁用状态   | `state: boolean` |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |
