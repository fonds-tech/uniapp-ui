import { defineConfig } from "vitepress"

// VitePress 配置
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "UniApp UI",
  description: "跨端 UI 组件库 - 基于 Vue 3 + UniApp",
  lang: "zh-CN",
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
        link: "/demo/",
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
            { text: "Loading 加载", link: "/components/loading" },
            { text: "TextHighlight 文本高亮", link: "/components/text-highlight" },
            { text: "Transition 过渡动画", link: "/components/transition" },
          ],
        },
        {
          text: "布局组件",
          items: [
            { text: "Layout 布局", link: "/components/layout" },
            { text: "Grid 栅格", link: "/components/grid" },
            { text: "Sticky 粘性布局", link: "/components/sticky" },
            { text: "Line 分割线", link: "/components/line" },
            { text: "SafeAreaTop 顶部安全区", link: "/components/safe-area-top" },
            { text: "SafeAreaBottom 底部安全区", link: "/components/safe-area-bottom" },
            { text: "SafeArea 安全区域", link: "/components/safe-area" },
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
            { text: "CheckboxGroup 复选框组", link: "/components/checkbox-group" },
            { text: "Radio 单选框", link: "/components/radio" },
            { text: "RadioGroup 单选框组", link: "/components/radio-group" },
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
            { text: "Upload 上传", link: "/components/upload" },
            { text: "Form 表单", link: "/components/form" },
            { text: "FormItem 表单项", link: "/components/form-item" },
            { text: "Field 输入域", link: "/components/field" },
            { text: "Keyboard 键盘", link: "/components/keyboard" },
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
            { text: "Popover 气泡弹框", link: "/components/popover" },
            { text: "PullRefresh 下拉刷新", link: "/components/pull-refresh" },
            { text: "DropdownMenu 下拉菜单", link: "/components/dropdown-menu" },
            { text: "DropdownItem 下拉菜单项", link: "/components/dropdown-item" },
          ],
        },
        {
          text: "展示组件",
          items: [
            { text: "Cell 单元格", link: "/components/cell" },
            { text: "CellGroup 单元格组", link: "/components/cell-group" },
            { text: "SwipeCell 滑动单元格", link: "/components/swipe-cell" },
            { text: "Card 卡片", link: "/components/card" },
            { text: "Collapse 折叠面板", link: "/components/collapse" },
            { text: "Swiper 轮播", link: "/components/swiper" },
            { text: "NoticeBar 通知栏", link: "/components/noticebar" },
            { text: "Empty 空状态", link: "/components/empty" },
            { text: "Progress 进度条", link: "/components/progress" },
            { text: "Arc 圆弧进度", link: "/components/arc" },
            { text: "CountDown 倒计时", link: "/components/countdown" },
            { text: "NumberRoll 数字滚动", link: "/components/number-roll" },
            { text: "Steps 步骤条", link: "/components/steps" },
            { text: "Skeleton 骨架屏", link: "/components/skeleton" },
            { text: "SkeletonTitle 骨架屏标题", link: "/components/skeleton-title" },
            { text: "SkeletonParagraph 骨架屏段落", link: "/components/skeleton-paragraph" },
            { text: "SkeletonAvatar 骨架屏头像", link: "/components/skeleton-avatar" },
            { text: "SkeletonImage 骨架屏图片", link: "/components/skeleton-image" },
            { text: "QRCode 二维码", link: "/components/qrcode" },
            { text: "Poster 海报", link: "/components/poster" },
          ],
        },
        {
          text: "导航组件",
          items: [
            { text: "Navbar 导航栏", link: "/components/navbar" },
            { text: "Tabbar 标签栏", link: "/components/tabbar" },
            { text: "TabbarItem 标签栏项", link: "/components/tabbar-item" },
            { text: "Tabs 标签页", link: "/components/tabs" },
            { text: "BackTop 返回顶部", link: "/components/back-top" },
            { text: "FloatButton 浮动按钮", link: "/components/float-button" },
            { text: "Pagination 分页", link: "/components/pagination" },
            { text: "Sidebar 侧边导航", link: "/components/sidebar" },
            { text: "IndexBar 索引栏", link: "/components/index-bar" },
            { text: "IndexAnchor 索引锚点", link: "/components/index-anchor" },
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
