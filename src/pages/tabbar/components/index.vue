<template>
  <view class="h-screen flex flex-col bg-[#F7F8FA]">
    <view class="bg-white/80 backdrop-blur-md z-50 flex-none sticky top-0" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="px-[32rpx] py-[20rpx] flex items-center">
        <view
          class="flex-1 h-[80rpx] bg-slate-100/80 rounded-[24rpx] flex items-center px-[28rpx] active:bg-slate-200/80 transition-all duration-200 border border-transparent focus-within:border-indigo-500/20 focus-within:bg-white focus-within:shadow-sm"
          @click="showSearch = true"
        >
          <view class="i-lucide-search text-[36rpx] text-slate-400 mr-[16rpx]" />
          <text class="text-[28rpx] text-slate-400">搜索组件...</text>
        </view>
      </view>
      <view class="h-[1rpx] w-full bg-slate-100" />
    </view>

    <view class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <scroll-view scroll-y class="w-[190rpx] h-full bg-[#F7F8FA]" :show-scrollbar="false">
        <view class="pb-[180rpx] pt-[20rpx]">
          <view
            v-for="(category, index) in componentCategories"
            :key="category.name"
            class="relative h-[108rpx] flex items-center justify-center px-[20rpx] mb-[8rpx] transition-all duration-300 group"
            @click="activeCategoryIndex = index"
          >
            <!-- 选中背景 -->
            <view
              class="absolute inset-0 transition-all duration-300 rounded-l-[32rpx] ml-[24rpx]"
              :class="activeCategoryIndex === index ? 'bg-white shadow-[-4rpx_4rpx_12rpx_rgba(0,0,0,0.02)]' : 'bg-transparent'"
            />

            <!-- 选中指示条 -->
            <view
              v-if="activeCategoryIndex === index"
              class="absolute left-[24rpx] top-[50%] translate-y-[-50%] w-[8rpx] h-[36rpx] rounded-full transition-all duration-300 bg-indigo-600"
            />

            <view class="relative z-10 flex flex-col items-center pl-[10rpx]">
              <text
                class="text-[28rpx] transition-all duration-300"
                :class="activeCategoryIndex === index ? 'text-indigo-600 font-bold scale-105' : 'text-slate-500 font-medium group-active:scale-95'"
              >
                {{ category.name }}
              </text>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- Content -->
      <scroll-view scroll-y class="flex-1 h-full bg-white rounded-tl-[40rpx] overflow-hidden shadow-[-4rpx_0_16rpx_rgba(0,0,0,0.01)]" :show-scrollbar="false">
        <view class="px-[32rpx] pt-[40rpx] pb-[180rpx] min-h-full relative overflow-hidden">
          <!-- 背景装饰大图标 -->
          <view class="absolute right-[-80rpx] top-[-40rpx] opacity-[0.05] pointer-events-none text-slate-900 z-0">
            <view class="text-[420rpx] rotate-[15deg]" :class="currentCategory.icon" />
          </view>

          <view class="flex items-end justify-between mb-[48rpx] relative z-10">
            <view>
              <text class="text-[44rpx] font-extrabold text-slate-900 block leading-tight">
                {{ currentCategory.name }}
              </text>
              <text class="text-[24rpx] font-medium text-slate-400 mt-[8rpx] block uppercase tracking-wider">{{ currentCategory.desc }}</text>
            </view>
          </view>

          <view class="grid grid-cols-2 gap-[20rpx] relative z-10">
            <view
              v-for="comp in currentCategory.components"
              :key="comp.name"
              class="group flex flex-col p-[24rpx] rounded-[28rpx] border border-slate-100 shadow-[0_2rpx_12rpx_rgba(0,0,0,0.02)] active:scale-[0.98] active:border-indigo-100 active:shadow-none transition-all duration-200"
              @click="navigateToDemo(comp.path)"
            >
              <view class="mb-[20rpx] flex h-[80rpx] w-[80rpx] items-center justify-center rounded-[20rpx] bg-indigo-50 group-active:bg-indigo-100 transition-colors duration-200">
                <view class="text-[40rpx] text-indigo-500 group-active:text-indigo-600 transition-colors duration-200" :class="[comp.icon]" />
              </view>

              <text class="text-[30rpx] font-bold text-slate-800 group-active:text-indigo-600 transition-colors">{{ comp.name }}</text>
              <text class="mt-[6rpx] text-[22rpx] text-slate-400 line-clamp-1">{{ comp.desc }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <ui-popup v-model:show="showSearch" position="bottom" round custom-style="height: 90vh;">
      <view class="flex flex-col h-full bg-[#F7F8FA] rounded-t-[32rpx] overflow-hidden">
        <view class="px-[32rpx] py-[24rpx] bg-white border-b border-[#F0F0F2] flex items-center sticky top-0 z-10">
          <view class="flex-1 bg-[#F5F7FA] h-[80rpx] rounded-full flex items-center px-[28rpx]">
            <view class="i-lucide-search text-[36rpx] text-[#86909C] mr-[16rpx]" />
            <input v-model="searchText" class="flex-1 text-[30rpx] text-[#1D1D1F] h-full" placeholder="搜索组件..." :focus="showSearch" placeholder-style="color: #86909C" />
            <view v-if="searchText" class="i-lucide-x-circle-fill text-[36rpx] text-[#C0C4CC] p-[8rpx]" @click="searchText = ''" />
          </view>
          <text class="text-[30rpx] text-[#2979FF] font-bold ml-[24rpx]" @click="showSearch = false"> 取消 </text>
        </view>

        <scroll-view scroll-y class="flex-1 px-[24rpx] pt-[24rpx]">
          <view v-if="searchResults.length > 0" class="pb-[40rpx]">
            <view
              v-for="comp in searchResults"
              :key="comp.path"
              class="flex items-center p-[24rpx] bg-white rounded-[20rpx] mb-[20rpx] shadow-sm active:scale-[0.99] transition-transform"
              @click="navigateToDemo(comp.path)"
            >
              <view class="w-[80rpx] h-[80rpx] bg-[#F5F7FA] rounded-[16rpx] flex items-center justify-center mr-[24rpx]">
                <view class="text-[40rpx] text-[#1D1D1F]" :class="[comp.icon]" />
              </view>
              <view class="flex-1">
                <text class="text-[30rpx] font-bold text-[#1D1D1F] block">{{ comp.name }}</text>
                <text class="text-[22rpx] text-[#86909C] block mt-[4rpx]">{{ comp.desc }}</text>
              </view>
              <view class="i-lucide-arrow-up-right text-[32rpx] text-[#C0C4CC]" />
            </view>
          </view>

          <view v-else-if="searchText" class="flex flex-col items-center justify-center pt-[200rpx]">
            <view class="w-[120rpx] h-[120rpx] bg-[#F0F2F5] rounded-full flex items-center justify-center mb-[24rpx]">
              <view class="i-lucide-search text-[60rpx] text-[#C0C4CC]" />
            </view>
            <text class="text-[28rpx] text-[#86909C]">未找到相关组件</text>
          </view>
        </scroll-view>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

definePage({
  style: {
    navigationStyle: "custom",
  },
})

const safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets
const showSearch = ref(false)
const searchText = ref("")
const activeCategoryIndex = ref(0)

const componentCategories = [
  {
    name: "基础",
    desc: "Basic Components",
    icon: "i-lucide-box",
    components: [
      { name: "Button", path: "button", icon: "i-lucide-mouse-pointer-2", desc: "按钮" },
      { name: "Icon", path: "icon", icon: "i-lucide-stars", desc: "图标" },
      { name: "Image", path: "image", icon: "i-lucide-image", desc: "图片" },
      { name: "Avatar", path: "avatar", icon: "i-lucide-user-circle", desc: "头像" },
      { name: "AvatarGroup", path: "avatar-group", icon: "i-lucide-users", desc: "头像组" },
      { name: "Text", path: "text", icon: "i-lucide-type", desc: "文本" },
      { name: "Badge", path: "badge", icon: "i-lucide-dot", desc: "徽标" },
      { name: "Tag", path: "tag", icon: "i-lucide-tag", desc: "标签" },
      { name: "Loading", path: "loading", icon: "i-lucide-loader", desc: "加载" },
      { name: "Divider", path: "divider", icon: "i-lucide-separator-horizontal", desc: "分割线" },
    ],
  },
  {
    name: "表单",
    desc: "Form Components",
    icon: "i-lucide-check-square",
    components: [
      { name: "Input", path: "input", icon: "i-lucide-text-cursor-input", desc: "输入框" },
      { name: "Textarea", path: "textarea", icon: "i-lucide-align-left", desc: "多行输入" },
      { name: "Checkbox", path: "checkbox", icon: "i-lucide-check-square", desc: "复选框" },
      { name: "Radio", path: "radio", icon: "i-lucide-circle-dot", desc: "单选框" },
      { name: "Switch", path: "switch", icon: "i-lucide-toggle-right", desc: "开关" },
      { name: "Stepper", path: "stepper", icon: "i-lucide-minus-square", desc: "步进器" },
      { name: "Slider", path: "slider", icon: "i-lucide-sliders-horizontal", desc: "滑块" },
      { name: "Rate", path: "rate", icon: "i-lucide-star", desc: "评分" },
      { name: "Picker", path: "picker", icon: "i-lucide-list", desc: "选择器" },
      { name: "DatePicker", path: "date-picker", icon: "i-lucide-calendar", desc: "日期" },
      { name: "Calendar", path: "calendar", icon: "i-lucide-calendar-days", desc: "日历" },
      { name: "Cascader", path: "cascader", icon: "i-lucide-git-merge", desc: "级联" },
      { name: "TreeSelect", path: "tree-select", icon: "i-lucide-git-branch", desc: "分类选择" },
      { name: "Upload", path: "upload", icon: "i-lucide-upload", desc: "上传" },
      { name: "Form", path: "form", icon: "i-lucide-file-edit", desc: "表单" },
      { name: "Search", path: "search", icon: "i-lucide-search", desc: "搜索" },
      { name: "Select", path: "select", icon: "i-lucide-chevron-down", desc: "下拉" },
      { name: "Keyboard", path: "keyboard", icon: "i-lucide-keyboard", desc: "键盘" },
    ],
  },
  {
    name: "反馈",
    desc: "Feedback Components",
    icon: "i-lucide-message-circle",
    components: [
      { name: "Toast", path: "toast", icon: "i-lucide-message-circle", desc: "轻提示" },
      { name: "Dialog", path: "dialog", icon: "i-lucide-alert-triangle", desc: "对话框" },
      { name: "Popup", path: "popup", icon: "i-lucide-panel-bottom-open", desc: "弹出层" },
      { name: "Popover", path: "popover", icon: "i-lucide-message-square", desc: "气泡弹出" },
      { name: "Tooltip", path: "tooltip", icon: "i-lucide-info", desc: "文字提示" },
      { name: "ActionSheet", path: "action-sheet", icon: "i-lucide-menu", desc: "菜单" },
      { name: "Notify", path: "notify", icon: "i-lucide-bell", desc: "通知" },
      { name: "Overlay", path: "overlay", icon: "i-lucide-layers", desc: "遮罩" },
      { name: "Empty", path: "empty", icon: "i-lucide-inbox", desc: "空状态" },
      { name: "Skeleton", path: "skeleton", icon: "i-lucide-layout-template", desc: "骨架屏" },
      { name: "SwipeCell", path: "swipe-cell", icon: "i-lucide-hand", desc: "滑动单元格" },
      { name: "PullRefresh", path: "pull-refresh", icon: "i-lucide-refresh-cw", desc: "下拉刷新" },
    ],
  },
  {
    name: "展示",
    desc: "Display Components",
    icon: "i-lucide-image",
    components: [
      { name: "Card", path: "card", icon: "i-lucide-square", desc: "卡片" },
      { name: "Cell", path: "cell", icon: "i-lucide-table", desc: "单元格" },
      { name: "Collapse", path: "collapse", icon: "i-lucide-chevrons-down-up", desc: "折叠面板" },
      { name: "Progress", path: "progress", icon: "i-lucide-bar-chart-horizontal", desc: "进度条" },
      { name: "Circle", path: "circle", icon: "i-lucide-pie-chart", desc: "环形进度" },
      { name: "CountDown", path: "countdown", icon: "i-lucide-timer", desc: "倒计时" },
      { name: "NumberRoll", path: "number-roll", icon: "i-lucide-hash", desc: "数字滚动" },
      { name: "NoticeBar", path: "noticebar", icon: "i-lucide-megaphone", desc: "通知栏" },
      { name: "Swiper", path: "swiper", icon: "i-lucide-gallery-horizontal-end", desc: "轮播" },
      { name: "TextHighlight", path: "text-highlight", icon: "i-lucide-highlighter", desc: "高亮" },
      { name: "TextEllipsis", path: "text-ellipsis", icon: "i-lucide-more-horizontal", desc: "文本省略" },
      { name: "List", path: "list", icon: "i-lucide-list", desc: "列表" },
      { name: "Watermark", path: "watermark", icon: "i-lucide-droplets", desc: "水印" },
      { name: "QRCode", path: "qrcode", icon: "i-lucide-qr-code", desc: "二维码" },
      { name: "Arc", path: "arc", icon: "i-lucide-circle", desc: "弧形" },
      { name: "Poster", path: "poster", icon: "i-lucide-file-image", desc: "海报" },
    ],
  },
  {
    name: "导航",
    desc: "Navigation Components",
    icon: "i-lucide-compass",
    components: [
      { name: "Navbar", path: "navbar", icon: "i-lucide-panel-top", desc: "导航栏" },
      { name: "Tabbar", path: "tabbar", icon: "i-lucide-panel-bottom", desc: "标签栏" },
      { name: "Tabs", path: "tabs", icon: "i-lucide-folder", desc: "标签页" },
      { name: "Sidebar", path: "sidebar", icon: "i-lucide-panel-left", desc: "侧边栏" },
      { name: "IndexBar", path: "index-bar", icon: "i-lucide-sort-asc", desc: "索引栏" },
      { name: "Pagination", path: "pagination", icon: "i-lucide-arrow-right-circle", desc: "分页" },
      { name: "BackTop", path: "back-top", icon: "i-lucide-arrow-up", desc: "回到顶部" },
      { name: "DropdownMenu", path: "dropdown-menu", icon: "i-lucide-list-filter", desc: "下拉菜单" },
      { name: "FloatButton", path: "float-button", icon: "i-lucide-plus", desc: "浮动按钮" },
      { name: "Steps", path: "steps", icon: "i-lucide-footprints", desc: "步骤条" },
      { name: "Timeline", path: "timeline", icon: "i-lucide-history", desc: "时间轴" },
    ],
  },
  {
    name: "布局",
    desc: "Layout Components",
    icon: "i-lucide-layout-grid",
    components: [
      { name: "Layout", path: "layout", icon: "i-lucide-layout-grid", desc: "布局" },
      { name: "Grid", path: "grid", icon: "i-lucide-grid-3x3", desc: "宫格" },
      { name: "Header", path: "header", icon: "i-lucide-arrow-up-to-line", desc: "页头" },
      { name: "Footer", path: "footer", icon: "i-lucide-arrow-down-to-line", desc: "页脚" },
      { name: "Sticky", path: "sticky", icon: "i-lucide-pin", desc: "粘性" },
      { name: "SafeArea", path: "safe-area", icon: "i-lucide-shield", desc: "安全区" },
      { name: "Resize", path: "resize", icon: "i-lucide-maximize-2", desc: "尺寸" },
      { name: "Transition", path: "transition", icon: "i-lucide-move", desc: "动画" },
      { name: "ConfigProvider", path: "config-provider", icon: "i-lucide-settings", desc: "全局配置" },
    ],
  },
]

const currentCategory = computed(() => componentCategories[activeCategoryIndex.value])

const searchResults = computed(() => {
  if (!searchText.value) return []
  const keyword = searchText.value.toLowerCase()
  const results: Array<any> = []
  componentCategories.forEach((cat) => {
    cat.components.forEach((comp) => {
      if (comp.name.toLowerCase().includes(keyword) || comp.desc.includes(searchText.value)) {
        results.push(comp)
      }
    })
  })
  return results
})

function navigateToDemo(compPath: string) {
  uni.navigateTo({
    url: `/pages/demo/${compPath}/index`,
  })
}
</script>

<style>
/* 隐藏滚动条 */
scroll-view ::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  display: none;
  background: transparent;
  -webkit-appearance: none;
}
</style>
