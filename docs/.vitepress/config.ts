import process from "node:process"
import { defineConfig } from "vitepress"

// VitePress 配置
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "UniApp UI",
  description: "跨端 UI 组件库 - 基于 Vue 3 + UniApp",
  lang: "zh-CN",
  // GitHub Pages 部署时的 base 路径
  base: process.env.DOCS_BASE || "/",
  // 忽略指向 H5 预览的外部链接
  ignoreDeadLinks: [/h5/],
  vite: {
    server: {
      port: 5180, // 固定端口，避免与其他项目冲突
    },
  },

  // 主题配置
  themeConfig: {
    // 顶部导航
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/components/" },
      {
        text: "在线演示",
        link: "./h5/",
        target: "_blank",
      },
    ],

    // 侧边栏
    sidebar: {
      "/guide/": [
        {
          text: "开始",
          items: [
            { text: "介绍", link: "/guide/" },
            { text: "快速开始", link: "/guide/quickstart" },
            { text: "主题定制", link: "/guide/theme" },
          ],
        },
      ],
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" },
            { text: "Icon 图标", link: "/components/icon" },
            { text: "Image 图片", link: "/components/image" },
            { text: "Avatar 头像", link: "/components/avatar" },
            { text: "AvatarGroup 头像组", link: "/components/avatar-group" },
            { text: "Text 文本", link: "/components/text" },
            { text: "Tag 标签", link: "/components/tag" },
            { text: "Badge 徽标", link: "/components/badge" },
            { text: "Watermark 水印", link: "/components/watermark" },
            { text: "Loading 加载", link: "/components/loading" },
            { text: "TextHighlight 文本高亮", link: "/components/text-highlight" },
            { text: "TextEllipsis 文本省略", link: "/components/text-ellipsis" },
            { text: "Transition 过渡动画", link: "/components/transition" },
          ],
        },
        {
          text: "布局组件",
          items: [
            { text: "Row/Col 栅格布局", link: "/components/row" },
            { text: "Grid 宫格", link: "/components/grid" },
            { text: "Sticky 粘性布局", link: "/components/sticky" },
            { text: "Divider 分割线", link: "/components/divider" },
            { text: "SafeAreaTop 顶部安全区", link: "/components/safe-area-top" },
            { text: "SafeAreaBottom 底部安全区", link: "/components/safe-area-bottom" },
            { text: "Header 页头", link: "/components/header" },
            { text: "Footer 页脚", link: "/components/footer" },
            { text: "Resize 尺寸监听", link: "/components/resize" },
          ],
        },
        {
          text: "表单组件",
          items: [
            { text: "Input 输入框", link: "/components/input" },
            { text: "Textarea 文本域", link: "/components/textarea" },
            { text: "Search 搜索", link: "/components/search" },
            { text: "Switch 开关", link: "/components/switch" },
            { text: "Checkbox 复选框", link: "/components/checkbox" },
            { text: "Radio 单选框", link: "/components/radio" },
            { text: "Stepper 步进器", link: "/components/stepper" },
            { text: "Slider 滑块", link: "/components/slider" },
            { text: "Rate 评分", link: "/components/rate" },
            { text: "Select 选择器", link: "/components/select" },
            { text: "Picker 选择器", link: "/components/picker" },
            { text: "PickerPanel 选择器面板", link: "/components/picker-panel" },
            { text: "DatePicker 日期选择", link: "/components/date-picker" },
            { text: "DateSelect 日期选择", link: "/components/date-select" },
            { text: "DateRangeSelect 日期范围选择", link: "/components/date-range-select" },
            { text: "Calendar 日历", link: "/components/calendar" },
            { text: "Cascader 级联选择", link: "/components/cascader" },
            { text: "TreeSelect 树形选择", link: "/components/tree-select" },
            { text: "Upload 上传", link: "/components/upload" },
            { text: "Form 表单", link: "/components/form" },
            { text: "Keyboard 键盘", link: "/components/keyboard" },
            { text: "CodeInput 验证码输入", link: "/components/code-input" },
          ],
        },
        {
          text: "反馈组件",
          items: [
            { text: "Toast 轻提示", link: "/components/toast" },
            { text: "Dialog 对话框", link: "/components/dialog" },
            { text: "Popup 弹出层", link: "/components/popup" },
            { text: "ActionSheet 动作面板", link: "/components/action-sheet" },
            { text: "Notify 消息通知", link: "/components/notify" },
            { text: "Overlay 遮罩层", link: "/components/overlay" },
            { text: "PullRefresh 下拉刷新", link: "/components/pull-refresh" },
            { text: "DropdownMenu 下拉菜单", link: "/components/dropdown-menu" },
            { text: "Popover 气泡弹出", link: "/components/popover" },
            { text: "Tooltip 文字提示", link: "/components/tooltip" },
          ],
        },
        {
          text: "展示组件",
          items: [
            { text: "Cell 单元格", link: "/components/cell" },
            { text: "SwipeCell 滑动单元格", link: "/components/swipe-cell" },
            { text: "Swiper 轮播", link: "/components/swiper" },
            { text: "NoticeBar 通知栏", link: "/components/notice-bar" },
            { text: "Collapse 折叠面板", link: "/components/collapse" },
            { text: "Empty 空状态", link: "/components/empty" },
            { text: "Progress 进度条", link: "/components/progress" },
            { text: "Arc 圆弧进度", link: "/components/arc" },
            { text: "Circle 圆环进度", link: "/components/circle" },
            { text: "CountDown 倒计时", link: "/components/count-down" },
            { text: "NumberRoll 数字滚动", link: "/components/number-roll" },
            { text: "Steps 步骤条", link: "/components/steps" },
            { text: "Skeleton 骨架屏", link: "/components/skeleton" },
            { text: "QRCode 二维码", link: "/components/qrcode" },
            { text: "Poster 海报", link: "/components/poster" },
            { text: "Card 卡片", link: "/components/card" },
            { text: "Timeline 时间轴", link: "/components/timeline" },
            { text: "List 列表", link: "/components/list" },
          ],
        },
        {
          text: "导航组件",
          items: [
            { text: "Navbar 导航栏", link: "/components/navbar" },
            { text: "Tabbar 标签栏", link: "/components/tabbar" },
            { text: "Tabs 标签页", link: "/components/tabs" },
            { text: "BackTop 返回顶部", link: "/components/back-top" },
            { text: "FloatButton 浮动按钮", link: "/components/float-button" },
            { text: "Pagination 分页", link: "/components/pagination" },
            { text: "Sidebar 侧边导航", link: "/components/sidebar" },
            { text: "IndexBar 索引栏", link: "/components/index-bar" },
          ],
        },
        {
          text: "配置组件",
          items: [{ text: "ConfigProvider 全局配置", link: "/components/config-provider" }],
        },
      ],
    },

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/your-org/uniapp-ui" }],

    // 页脚
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "Copyright © 2024 UniApp UI",
    },

    // 搜索
    search: {
      provider: "local",
    },

    // 编辑链接
    editLink: {
      pattern: "https://github.com/your-org/uniapp-ui/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },

    // 最后更新时间
    lastUpdated: {
      text: "最后更新于",
    },

    // 目录标题
    outline: {
      label: "本页目录",
    },

    // 文档页脚
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: false,
  },
})
