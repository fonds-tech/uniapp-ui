<template>
  <div class="comp-overview">
    <section v-for="group in groups" :key="group.title" class="comp-group">
      <header class="comp-group__head">
        <h2 class="comp-group__title">{{ group.title }}</h2>
        <p v-if="group.desc" class="comp-group__desc">{{ group.desc }}</p>
      </header>
      <div class="comp-grid">
        <a v-for="item in group.items" :key="item.link" :href="withBase(item.link)" class="comp-card">
          <span class="comp-card__icon">{{ item.icon }}</span>
          <span class="comp-card__body">
            <span class="comp-card__name">{{ item.name }}</span>
            <span class="comp-card__desc">{{ item.desc }}</span>
          </span>
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
  icon: string
}
interface Group {
  title: string
  desc?: string
  items: Item[]
}

const groups: Group[] = [
  {
    title: "基础组件",
    desc: "构建页面的基本元素",
    items: [
      { name: "Button 按钮", link: "/components/button", desc: "常用操作按钮", icon: "Bt" },
      { name: "Icon 图标", link: "/components/icon", desc: "字体图标集", icon: "Ic" },
      { name: "Image 图片", link: "/components/image", desc: "增强图片", icon: "Im" },
      { name: "Avatar 头像", link: "/components/avatar", desc: "头像展示", icon: "Av" },
      { name: "AvatarGroup 头像组", link: "/components/avatar-group", desc: "头像组合", icon: "Ag" },
      { name: "Text 文本", link: "/components/text", desc: "文本组件", icon: "Tx" },
      { name: "Tag 标签", link: "/components/tag", desc: "分类标记", icon: "Tg" },
      { name: "Badge 徽标", link: "/components/badge", desc: "角标展示", icon: "Bd" },
      { name: "Watermark 水印", link: "/components/watermark", desc: "页面水印", icon: "Wm" },
      { name: "Loading 加载", link: "/components/loading", desc: "加载状态", icon: "Ld" },
      { name: "TextHighlight 高亮", link: "/components/text-highlight", desc: "文本高亮", icon: "Th" },
      { name: "TextEllipsis 省略", link: "/components/text-ellipsis", desc: "超长省略", icon: "Te" },
      { name: "Transition 过渡", link: "/components/transition", desc: "过渡动画", icon: "Tr" },
    ],
  },
  {
    title: "表单组件",
    desc: "数据采集与输入",
    items: [
      { name: "Input 输入框", link: "/components/input", desc: "单行输入", icon: "In" },
      { name: "Textarea 文本域", link: "/components/textarea", desc: "多行输入", icon: "Ta" },
      { name: "Search 搜索", link: "/components/search", desc: "搜索框", icon: "Sr" },
      { name: "Switch 开关", link: "/components/switch", desc: "开关选择", icon: "Sw" },
      { name: "Checkbox 复选框", link: "/components/checkbox", desc: "多选操作", icon: "Cb" },
      { name: "Radio 单选框", link: "/components/radio", desc: "单选操作", icon: "Rd" },
      { name: "Stepper 步进器", link: "/components/stepper", desc: "数量选择", icon: "Sp" },
      { name: "Slider 滑块", link: "/components/slider", desc: "滑动选择", icon: "Sl" },
      { name: "Rate 评分", link: "/components/rate", desc: "评分操作", icon: "Ra" },
      { name: "Select 选择器", link: "/components/select", desc: "下拉选择", icon: "Se" },
      { name: "Picker 选择器", link: "/components/picker", desc: "弹出选择", icon: "Pk" },
      { name: "PickerPanel 面板", link: "/components/picker-panel", desc: "面板选择", icon: "Pp" },
      { name: "DatePicker 日期", link: "/components/date-picker", desc: "日期选择", icon: "Dp" },
      { name: "DateSelect 日期", link: "/components/date-select", desc: "日期选择", icon: "Ds" },
      { name: "DateRangePicker 范围", link: "/components/date-range-picker", desc: "日期范围", icon: "Dr" },
      { name: "DateRangeSelect 范围", link: "/components/date-range-select", desc: "日期范围", icon: "Rs" },
      { name: "Calendar 日历", link: "/components/calendar", desc: "日历选择", icon: "Cl" },
      { name: "ColorPanel 颜色面板", link: "/components/color-panel", desc: "颜色面板", icon: "Cp" },
      { name: "ColorPicker 颜色选择", link: "/components/color-picker", desc: "颜色选择", icon: "Co" },
      { name: "Cascader 级联", link: "/components/cascader", desc: "级联选择", icon: "Cs" },
      { name: "TreeSelect 树形选择", link: "/components/tree-select", desc: "树形选择", icon: "Ts" },
      { name: "Upload 上传", link: "/components/upload", desc: "文件上传", icon: "Up" },
      { name: "Form 表单", link: "/components/form", desc: "表单容器", icon: "Fm" },
      { name: "Keyboard 键盘", link: "/components/keyboard", desc: "虚拟键盘", icon: "Kb" },
      { name: "CodeInput 验证码", link: "/components/code-input", desc: "验证码输入", icon: "Ci" },
    ],
  },
  {
    title: "反馈组件",
    desc: "用户操作反馈与信息提示",
    items: [
      { name: "Toast 轻提示", link: "/components/toast", desc: "轻量提示", icon: "To" },
      { name: "Dialog 对话框", link: "/components/dialog", desc: "模态对话框", icon: "Dl" },
      { name: "Popup 弹出层", link: "/components/popup", desc: "弹出层", icon: "Pu" },
      { name: "ActionSheet 动作面板", link: "/components/action-sheet", desc: "底部操作", icon: "As" },
      { name: "Notify 通知", link: "/components/notify", desc: "顶部通知", icon: "No" },
      { name: "Overlay 遮罩层", link: "/components/overlay", desc: "遮罩层", icon: "Ov" },
      { name: "PullRefresh 下拉刷新", link: "/components/pull-refresh", desc: "下拉刷新", icon: "Pr" },
      { name: "DropdownMenu 下拉菜单", link: "/components/dropdown-menu", desc: "下拉菜单", icon: "Dm" },
      { name: "Popover 气泡", link: "/components/popover", desc: "气泡面板", icon: "Po" },
      { name: "Tooltip 文字提示", link: "/components/tooltip", desc: "文字提示", icon: "Tt" },
    ],
  },
  {
    title: "展示组件",
    desc: "数据与内容呈现",
    items: [
      { name: "Cell 单元格", link: "/components/cell", desc: "列表单元格", icon: "Ce" },
      { name: "SwipeCell 滑动单元格", link: "/components/swipe-cell", desc: "滑动操作", icon: "Sc" },
      { name: "Swiper 轮播", link: "/components/swiper", desc: "轮播图", icon: "Sp" },
      { name: "NoticeBar 通知栏", link: "/components/notice-bar", desc: "公告栏", icon: "Nb" },
      { name: "Collapse 折叠", link: "/components/collapse", desc: "折叠面板", icon: "Cs" },
      { name: "Empty 空状态", link: "/components/empty", desc: "空数据", icon: "Em" },
      { name: "Progress 进度条", link: "/components/progress", desc: "进度展示", icon: "Pg" },
      { name: "Arc 弧形", link: "/components/arc", desc: "弧形进度", icon: "Ar" },
      { name: "Circle 圆环", link: "/components/circle", desc: "圆环进度", icon: "Cr" },
      { name: "CountDown 倒计时", link: "/components/count-down", desc: "倒计时", icon: "Cd" },
      { name: "NumberRoll 数字滚动", link: "/components/number-roll", desc: "数字动画", icon: "Nr" },
      { name: "Steps 步骤条", link: "/components/steps", desc: "步骤展示", icon: "St" },
      { name: "Skeleton 骨架屏", link: "/components/skeleton", desc: "加载占位", icon: "Sk" },
      { name: "QRCode 二维码", link: "/components/qrcode", desc: "二维码", icon: "Qr" },
      { name: "Poster 海报", link: "/components/poster", desc: "海报生成", icon: "Ps" },
      { name: "Timeline 时间轴", link: "/components/timeline", desc: "时间轴", icon: "Tl" },
      { name: "List 列表", link: "/components/list", desc: "虚拟列表", icon: "Ls" },
    ],
  },
  {
    title: "导航组件",
    desc: "页面导航与切换",
    items: [
      { name: "Navbar 导航栏", link: "/components/navbar", desc: "顶部导航", icon: "Nv" },
      { name: "Tabbar 标签栏", link: "/components/tabbar", desc: "底部标签", icon: "Tb" },
      { name: "Tabs 标签页", link: "/components/tabs", desc: "选项卡", icon: "Tp" },
      { name: "Sidebar 侧边栏", link: "/components/sidebar", desc: "侧边导航", icon: "Sb" },
      { name: "IndexBar 索引栏", link: "/components/index-bar", desc: "索引导航", icon: "Ib" },
      { name: "Pagination 分页", link: "/components/pagination", desc: "分页器", icon: "Pn" },
      { name: "Segmented 分段", link: "/components/segmented", desc: "分段控制", icon: "Sg" },
      { name: "BackTop 返回顶部", link: "/components/back-top", desc: "返回顶部", icon: "Bt" },
      { name: "FloatButton 浮动按钮", link: "/components/float-button", desc: "浮动操作", icon: "Fb" },
    ],
  },
  {
    title: "布局组件",
    desc: "页面结构组织",
    items: [
      { name: "Row/Col 栅格", link: "/components/row", desc: "栅格布局", icon: "Rc" },
      { name: "Grid 宫格", link: "/components/grid", desc: "宫格布局", icon: "Gd" },
      { name: "Space 间距", link: "/components/space", desc: "间距容器", icon: "Sp" },
      { name: "Sticky 粘性", link: "/components/sticky", desc: "粘性定位", icon: "Sy" },
      { name: "Divider 分割线", link: "/components/divider", desc: "分割线", icon: "Dv" },
      { name: "Header 页头", link: "/components/header", desc: "页面头部", icon: "Hd" },
      { name: "Footer 页脚", link: "/components/footer", desc: "页面底部", icon: "Ft" },
      { name: "SafeAreaTop 顶部安全区", link: "/components/safe-area-top", desc: "顶部安全区", icon: "St" },
      { name: "SafeAreaBottom 底部安全区", link: "/components/safe-area-bottom", desc: "底部安全区", icon: "Sb" },
      { name: "Resize 尺寸监听", link: "/components/resize", desc: "尺寸监听", icon: "Rz" },
    ],
  },
  {
    title: "配置组件",
    items: [
      { name: "ConfigProvider 全局配置", link: "/components/config-provider", desc: "全局配置", icon: "Cf" },
    ],
  },
]
</script>
