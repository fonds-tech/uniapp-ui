<template>
  <div class="comp-overview">
    <section v-for="group in groups" :key="group.title" class="comp-group">
      <header class="comp-group__head">
        <h2 class="comp-group__title">{{ group.title }}</h2>
        <span class="comp-group__count">{{ String(group.items.length).padStart(2, "0") }}</span>
      </header>
      <div class="comp-grid">
        <a v-for="item in group.items" :key="item.link" :href="withBase(item.link)" class="comp-card">
          <span class="comp-card__name">{{ item.name }}</span>
          <span class="comp-card__desc">{{ item.desc }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { withBase } from "vitepress"

interface Item {
  name: string
  link: string
  desc: string
}
interface Group {
  title: string
  items: Item[]
}

const groups: Group[] = [
  {
    title: "基础",
    items: [
      { name: "Button 按钮", link: "/components/button", desc: "常用操作按钮" },
      { name: "Icon 图标", link: "/components/icon", desc: "字体图标集" },
      { name: "Image 图片", link: "/components/image", desc: "增强图片" },
      { name: "Avatar 头像", link: "/components/avatar", desc: "头像展示" },
      { name: "AvatarGroup 头像组", link: "/components/avatar-group", desc: "头像组合" },
      { name: "Text 文本", link: "/components/text", desc: "文本组件" },
      { name: "Tag 标签", link: "/components/tag", desc: "分类标记" },
      { name: "Badge 徽标", link: "/components/badge", desc: "角标展示" },
      { name: "Watermark 水印", link: "/components/watermark", desc: "页面水印" },
      { name: "Loading 加载", link: "/components/loading", desc: "加载状态" },
      { name: "TextHighlight 高亮", link: "/components/text-highlight", desc: "文本高亮" },
      { name: "TextEllipsis 省略", link: "/components/text-ellipsis", desc: "超长省略" },
      { name: "Transition 过渡", link: "/components/transition", desc: "过渡动画" },
    ],
  },
  {
    title: "表单",
    items: [
      { name: "Input 输入框", link: "/components/input", desc: "单行输入" },
      { name: "Textarea 文本域", link: "/components/textarea", desc: "多行输入" },
      { name: "Search 搜索", link: "/components/search", desc: "搜索框" },
      { name: "Switch 开关", link: "/components/switch", desc: "开关选择" },
      { name: "Checkbox 复选框", link: "/components/checkbox", desc: "多选操作" },
      { name: "Radio 单选框", link: "/components/radio", desc: "单选操作" },
      { name: "Stepper 步进器", link: "/components/stepper", desc: "数量选择" },
      { name: "Slider 滑块", link: "/components/slider", desc: "滑动选择" },
      { name: "Rate 评分", link: "/components/rate", desc: "评分操作" },
      { name: "Select 选择器", link: "/components/select", desc: "下拉选择" },
      { name: "Picker 选择器", link: "/components/picker", desc: "弹出选择" },
      { name: "PickerPanel 面板", link: "/components/picker-panel", desc: "面板选择" },
      { name: "DatePicker 日期", link: "/components/date-picker", desc: "日期选择" },
      { name: "DateSelect 日期", link: "/components/date-select", desc: "日期选择" },
      { name: "DateRangePicker 范围", link: "/components/date-range-picker", desc: "日期范围" },
      { name: "DateRangeSelect 范围", link: "/components/date-range-select", desc: "日期范围" },
      { name: "Calendar 日历", link: "/components/calendar", desc: "日历选择" },
      { name: "ColorPanel 颜色面板", link: "/components/color-panel", desc: "颜色面板" },
      { name: "ColorPicker 颜色选择", link: "/components/color-picker", desc: "颜色选择" },
      { name: "Cascader 级联", link: "/components/cascader", desc: "级联选择" },
      { name: "TreeSelect 树形选择", link: "/components/tree-select", desc: "树形选择" },
      { name: "Upload 上传", link: "/components/upload", desc: "文件上传" },
      { name: "Form 表单", link: "/components/form", desc: "表单容器" },
      { name: "Keyboard 键盘", link: "/components/keyboard", desc: "虚拟键盘" },
      { name: "CodeInput 验证码", link: "/components/code-input", desc: "验证码输入" },
    ],
  },
  {
    title: "反馈",
    items: [
      { name: "Toast 轻提示", link: "/components/toast", desc: "轻量提示" },
      { name: "Dialog 对话框", link: "/components/dialog", desc: "模态对话框" },
      { name: "Popup 弹出层", link: "/components/popup", desc: "弹出层" },
      { name: "ActionSheet 动作面板", link: "/components/action-sheet", desc: "底部操作" },
      { name: "Notify 通知", link: "/components/notify", desc: "顶部通知" },
      { name: "Overlay 遮罩层", link: "/components/overlay", desc: "遮罩层" },
      { name: "PullRefresh 下拉刷新", link: "/components/pull-refresh", desc: "下拉刷新" },
      { name: "DropdownMenu 下拉菜单", link: "/components/dropdown-menu", desc: "下拉菜单" },
      { name: "Popover 气泡", link: "/components/popover", desc: "气泡面板" },
      { name: "Tooltip 文字提示", link: "/components/tooltip", desc: "文字提示" },
    ],
  },
  {
    title: "展示",
    items: [
      { name: "Cell 单元格", link: "/components/cell", desc: "列表单元格" },
      { name: "SwipeCell 滑动单元格", link: "/components/swipe-cell", desc: "滑动操作" },
      { name: "Swiper 轮播", link: "/components/swiper", desc: "轮播图" },
      { name: "NoticeBar 通知栏", link: "/components/notice-bar", desc: "公告栏" },
      { name: "Collapse 折叠", link: "/components/collapse", desc: "折叠面板" },
      { name: "Empty 空状态", link: "/components/empty", desc: "空数据" },
      { name: "Progress 进度条", link: "/components/progress", desc: "进度展示" },
      { name: "Arc 弧形", link: "/components/arc", desc: "弧形进度" },
      { name: "Circle 圆环", link: "/components/circle", desc: "圆环进度" },
      { name: "CountDown 倒计时", link: "/components/count-down", desc: "倒计时" },
      { name: "NumberRoll 数字滚动", link: "/components/number-roll", desc: "数字动画" },
      { name: "Steps 步骤条", link: "/components/steps", desc: "步骤展示" },
      { name: "Skeleton 骨架屏", link: "/components/skeleton", desc: "加载占位" },
      { name: "QRCode 二维码", link: "/components/qrcode", desc: "二维码" },
      { name: "Poster 海报", link: "/components/poster", desc: "海报生成" },
      { name: "Timeline 时间轴", link: "/components/timeline", desc: "时间轴" },
      { name: "List 列表", link: "/components/list", desc: "虚拟列表" },
    ],
  },
  {
    title: "导航",
    items: [
      { name: "Navbar 导航栏", link: "/components/navbar", desc: "顶部导航" },
      { name: "Tabbar 标签栏", link: "/components/tabbar", desc: "底部标签" },
      { name: "Tabs 标签页", link: "/components/tabs", desc: "选项卡" },
      { name: "Sidebar 侧边栏", link: "/components/sidebar", desc: "侧边导航" },
      { name: "IndexBar 索引栏", link: "/components/index-bar", desc: "索引导航" },
      { name: "Pagination 分页", link: "/components/pagination", desc: "分页器" },
      { name: "Segmented 分段", link: "/components/segmented", desc: "分段控制" },
      { name: "BackTop 返回顶部", link: "/components/back-top", desc: "返回顶部" },
      { name: "FloatButton 浮动按钮", link: "/components/float-button", desc: "浮动操作" },
    ],
  },
  {
    title: "布局",
    items: [
      { name: "Row/Col 栅格", link: "/components/row", desc: "栅格布局" },
      { name: "Grid 宫格", link: "/components/grid", desc: "宫格布局" },
      { name: "Space 间距", link: "/components/space", desc: "间距容器" },
      { name: "Sticky 粘性", link: "/components/sticky", desc: "粘性定位" },
      { name: "Divider 分割线", link: "/components/divider", desc: "分割线" },
      { name: "Header 页头", link: "/components/header", desc: "页面头部" },
      { name: "Footer 页脚", link: "/components/footer", desc: "页面底部" },
      { name: "SafeAreaTop 顶部安全区", link: "/components/safe-area-top", desc: "顶部安全区" },
      { name: "SafeAreaBottom 底部安全区", link: "/components/safe-area-bottom", desc: "底部安全区" },
      { name: "Resize 尺寸监听", link: "/components/resize", desc: "尺寸监听" },
    ],
  },
  {
    title: "配置",
    items: [
      { name: "ConfigProvider 全局配置", link: "/components/config-provider", desc: "全局配置" },
    ],
  },
]
</script>
