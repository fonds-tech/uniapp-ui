# TabbarItem 标签栏项

`ui-tabbar` 的子项。颜色等样式由父级集中配置，可通过自身 prop 覆盖。

## 用法

```vue
<ui-tabbar v-model="active">
  <ui-tabbar-item icon="home" text="首页" />
  <ui-tabbar-item icon="message" text="消息" badge="5" />
  <ui-tabbar-item icon="user" text="我的" dot />
</ui-tabbar>
```

## 图片图标

`icon` 接受 URL / data: / 绝对路径 / 相对路径 / 已知图片扩展名 → 渲染 `<image>`；否则按字体图标走 `ui-icon`。

```vue
<ui-tabbar-item
  icon="/static/home-inactive.png"
  active-icon="/static/home-active.png"
  text="首页"
/>
```

## API

### Props

| 参数           | 说明                                         | 类型                                                        | 默认值        |
| -------------- | -------------------------------------------- | ----------------------------------------------------------- | ------------- |
| name           | 标识符（缺省回退到 index）                   | `number \| string`                                          | -             |
| text           | 文字                                         | `string`                                                    | -             |
| icon           | 图标名 / 图片链接                            | `string`                                                    | -             |
| active-icon    | 激活态图标                                   | `string`                                                    | -             |
| icon-size      | 图标大小                                     | `number \| string`                                          | `48rpx`       |
| icon-weight    | 图标粗细                                     | `number \| string`                                          | -             |
| icon-prefix    | 图标自定义前缀                               | `string`                                                    | -             |
| dot            | 小红点                                       | `boolean`                                                   | `false`       |
| badge          | 徽标内容                                     | `string`                                                    | -             |
| disabled       | 禁用                                         | `boolean`                                                   | `false`       |
| active-color   | 激活色（覆盖父级）                           | `string`                                                    | -             |
| inactive-color | 未激活色（覆盖父级）                         | `string`                                                    | -             |
| route          | 路由路径（父级 `route=true` 时必传）         | `string`                                                    | -             |
| route-params   | 路由 query（routeType !== switchTab 时拼接） | `object`                                                    | `{}`          |
| route-type     | 跳转类型                                     | `'switchTab' \| 'navigateTo' \| 'redirectTo' \| 'reLaunch'` | `'switchTab'` |
| custom-class   | 自定义类名                                   | `string`                                                    | -             |
| custom-style   | 自定义样式                                   | `string \| CSSProperties`                                   | -             |

### Events

| 事件名 | 说明     | 回调参数                 |
| ------ | -------- | ------------------------ |
| click  | 点击事件 | `name: number \| string` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| icon    | 自定义图标区     |
| default | 自定义文字区     |
| extra   | 文字下方额外内容 |
