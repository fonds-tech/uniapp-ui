<template>
  <view class="h-screen flex flex-col bg-[#F7F8FA]">
    <!-- 顶部搜索栏 (固定) -->
    <view class="bg-white z-50 flex-none" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="px-[24rpx] py-[16rpx] flex items-center">
        <!-- 搜索框 -->
        <view class="flex-1 h-[72rpx] bg-[#F5F7FA] rounded-full flex items-center px-[24rpx] active:bg-[#EFF1F4] transition-colors" @click="showSearch = true">
          <view class="i-lucide-search text-[32rpx] text-[#86909C] mr-[12rpx]" />
          <text class="text-[28rpx] text-[#86909C]">搜索组件...</text>
        </view>

        <!-- 右侧小图标 (可选，如设置/关于) -->
        <!-- <view class="ml-[24rpx] w-[72rpx] h-[72rpx] flex items-center justify-center rounded-full active:bg-[#F5F7FA]">
          <view class="i-lucide-settings-2 text-[40rpx] text-[#1D1D1F]" />
        </view> -->
      </view>
      <view class="h-[1rpx] w-full bg-[#F0F0F2]" />
    </view>

    <!-- 主体内容区 (左右分栏) -->
    <view class="flex-1 flex overflow-hidden">
      <!-- 左侧分类导航 -->
      <scroll-view scroll-y class="w-[180rpx] h-full bg-[#F7F8FA]" :show-scrollbar="false">
        <view class="pb-[180rpx]">
          <!-- 底部垫高，防止被tabbar遮挡 -->
          <view
            v-for="(category, index) in componentCategories"
            :key="category.name"
            class="relative h-[100rpx] flex items-center justify-center px-[10rpx] transition-all duration-300"
            :class="activeCategoryIndex === index ? 'bg-white' : 'bg-transparent'"
            @click="activeCategoryIndex = index"
          >
            <!-- 选中指示条 -->
            <view v-if="activeCategoryIndex === index" class="absolute left-0 top-[50%] translate-y-[-50%] w-[6rpx] h-[32rpx] rounded-r-full bg-[#2979FF]" />

            <text
              class="text-[26rpx] font-medium transition-colors duration-300 text-center"
              :class="activeCategoryIndex === index ? 'text-[#2979FF] font-bold scale-105' : 'text-[#86909C]'"
            >
              {{ category.name }}
            </text>
          </view>
        </view>
      </scroll-view>

      <!-- 右侧组件列表 -->
      <scroll-view scroll-y class="flex-1 h-full bg-white" :show-scrollbar="false">
        <view class="px-[24rpx] pt-[24rpx] pb-[180rpx]">
          <!-- 分类标题 -->
          <view class="flex items-center justify-between mb-[32rpx] pl-[8rpx]">
            <view>
              <text class="text-[36rpx] font-900 text-[#1D1D1F] block">{{ currentCategory.name }}</text>
              <text class="text-[24rpx] text-[#86909C] mt-[4rpx] block">{{ currentCategory.desc }}</text>
            </view>
            <view class="i-lucide-layers text-[48rpx] text-[#F0F0F2]" />
          </view>

          <!-- 组件列表 -->
          <view class="grid grid-cols-1 gap-[24rpx]">
            <view
              v-for="comp in currentCategory.components"
              :key="comp.name"
              class="flex items-center p-[24rpx] bg-[#F9FAFB] rounded-[20rpx] active:scale-[0.99] active:bg-[#F2F3F5] transition-all border border-transparent active:border-[#E5E7EB]"
              @click="navigateToDemo(comp.path)"
            >
              <!-- 图标容器 -->
              <view class="w-[80rpx] h-[80rpx] bg-white rounded-[16rpx] flex items-center justify-center shadow-sm mr-[24rpx]">
                <view class="text-[40rpx] text-[#1D1D1F]" :class="[comp.icon]" />
              </view>

              <!-- 文字 -->
              <view class="flex-1">
                <text class="text-[30rpx] font-bold text-[#1D1D1F] block">{{ comp.name }}</text>
                <text class="text-[22rpx] text-[#86909C] block mt-[4rpx]">{{ comp.desc }}</text>
              </view>

              <!-- 箭头 -->
              <view class="i-lucide-chevron-right text-[32rpx] text-[#C0C4CC]" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 搜索弹窗 -->
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
      { name: "Line", path: "line", icon: "i-lucide-minus", desc: "分割线" },
    ],
  },
  {
    name: "表单",
    desc: "Form Components",
    components: [
      { name: "Input", path: "input", icon: "i-lucide-text-cursor-input", desc: "输入框" },
      { name: "Textarea", path: "textarea", icon: "i-lucide-align-left", desc: "多行输入" },
      { name: "Checkbox", path: "checkbox", icon: "i-lucide-check-square", desc: "复选框" },
      { name: "Radio", path: "radio", icon: "i-lucide-circle-dot", desc: "单选框" },
      { name: "Switch", path: "switch", icon: "i-lucide-toggle-right", desc: "开关" },
      { name: "Stepper", path: "stepper", icon: "i-lucide-minus-square", desc: "步进器" },
      { name: "Rate", path: "rate", icon: "i-lucide-star", desc: "评分" },
      { name: "Picker", path: "picker", icon: "i-lucide-list", desc: "选择器" },
      { name: "DatePicker", path: "date-picker", icon: "i-lucide-calendar", desc: "日期" },
      { name: "Calendar", path: "calendar", icon: "i-lucide-calendar-days", desc: "日历" },
      { name: "Cascader", path: "cascader", icon: "i-lucide-git-merge", desc: "级联" },
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
    components: [
      { name: "Toast", path: "toast", icon: "i-lucide-message-circle", desc: "轻提示" },
      { name: "Dialog", path: "dialog", icon: "i-lucide-alert-triangle", desc: "对话框" },
      { name: "Popup", path: "popup", icon: "i-lucide-panel-bottom-open", desc: "弹出层" },
      { name: "ActionSheet", path: "action-sheet", icon: "i-lucide-menu", desc: "菜单" },
      { name: "Notify", path: "notify", icon: "i-lucide-bell", desc: "通知" },
      { name: "Overlay", path: "overlay", icon: "i-lucide-layers", desc: "遮罩" },
      { name: "Empty", path: "empty", icon: "i-lucide-inbox", desc: "空状态" },
      { name: "Skeleton", path: "skeleton", icon: "i-lucide-layout-template", desc: "骨架屏" },
      { name: "SwipeCell", path: "swipe-cell", icon: "i-lucide-hand", desc: "滑动单元格" },
      { name: "PullRefresh", path: "pull-refresh", icon: "i-lucide-refresh-cw", desc: "下拉刷新" },
      { name: "Popover", path: "popover", icon: "i-lucide-message-square", desc: "气泡弹框" },
    ],
  },
  {
    name: "展示",
    desc: "Display Components",
    components: [
      { name: "Card", path: "card", icon: "i-lucide-square", desc: "卡片" },
      { name: "Cell", path: "cell", icon: "i-lucide-table", desc: "单元格" },
      { name: "Collapse", path: "collapse", icon: "i-lucide-chevrons-down-up", desc: "折叠面板" },
      { name: "Progress", path: "progress", icon: "i-lucide-bar-chart-horizontal", desc: "进度条" },
      { name: "CountDown", path: "countdown", icon: "i-lucide-timer", desc: "倒计时" },
      { name: "NumberRoll", path: "number-roll", icon: "i-lucide-hash", desc: "数字滚动" },
      { name: "NoticeBar", path: "noticebar", icon: "i-lucide-megaphone", desc: "通知栏" },
      { name: "Swiper", path: "swiper", icon: "i-lucide-gallery-horizontal-end", desc: "轮播" },
      { name: "TextHighlight", path: "text-highlight", icon: "i-lucide-highlighter", desc: "高亮" },
      { name: "QRCode", path: "qrcode", icon: "i-lucide-qr-code", desc: "二维码" },
      { name: "Arc", path: "arc", icon: "i-lucide-circle", desc: "弧形" },
      { name: "Poster", path: "poster", icon: "i-lucide-file-image", desc: "海报" },
    ],
  },
  {
    name: "导航",
    desc: "Navigation Components",
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
    ],
  },
  {
    name: "布局",
    desc: "Layout Components",
    components: [
      { name: "Layout", path: "layout", icon: "i-lucide-layout-grid", desc: "布局" },
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
