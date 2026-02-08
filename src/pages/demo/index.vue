<template>
  <view class="demo-container">
    <view class="search-bar">
      <ui-input v-model="searchText" placeholder="搜索组件..." :clearable="true" />
    </view>

    <view class="component-list">
      <view v-for="category in filteredCategories" :key="category.name" class="category-block">
        <view class="category-header">
          <text class="category-title">{{ category.name }}</text>
          <text class="category-count">{{ category.components.length }} 个组件</text>
        </view>

        <view class="component-grid">
          <view v-for="comp in category.components" :key="comp.name" class="component-card" @click="navigateToDemo(comp.path)">
            <view class="comp-icon">{{ comp.icon }}</view>
            <text class="comp-name">{{ comp.name }}</text>
            <text class="comp-desc">{{ comp.desc }}</text>
          </view>
        </view>
      </view>

      <view v-if="filteredCategories.length === 0" class="empty-state">
        <text class="empty-icon">🔍</text>
        <text class="empty-text">未找到相关组件</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "组件演示" },
})

// 搜索文本
const searchText = ref("")

// 组件分类数据
const componentCategories = [
  {
    name: "基础组件",
    key: "basic",
    components: [
      { name: "Button", path: "button", icon: "🔘", desc: "按钮组件" },
      { name: "Icon", path: "icon", icon: "✨", desc: "图标组件" },
      { name: "Image", path: "image", icon: "🖼️", desc: "图片组件" },
      { name: "Avatar", path: "avatar", icon: "👤", desc: "头像组件" },
      { name: "AvatarGroup", path: "avatar-group", icon: "👥", desc: "头像组组件" },
      { name: "Text", path: "text", icon: "📝", desc: "文本组件" },
      { name: "Badge", path: "badge", icon: "🏷️", desc: "徽标组件" },
      { name: "Tag", path: "tag", icon: "🏷️", desc: "标签组件" },
      { name: "Loading", path: "loading", icon: "⏳", desc: "加载组件" },
      { name: "Line", path: "line", icon: "➖", desc: "分割线组件" },
    ],
  },
  {
    name: "表单组件",
    key: "form",
    components: [
      { name: "Input", path: "input", icon: "📝", desc: "输入框组件" },
      { name: "Textarea", path: "textarea", icon: "📄", desc: "多行输入框" },
      { name: "Checkbox", path: "checkbox", icon: "☑️", desc: "复选框组件" },
      { name: "Radio", path: "radio", icon: "🔘", desc: "单选框组件" },
      { name: "Switch", path: "switch", icon: "🔀", desc: "开关组件" },
      { name: "Stepper", path: "stepper", icon: "🔢", desc: "步进器组件" },
      { name: "Slider", path: "slider", icon: "🎚️", desc: "滑块组件" },
      { name: "Rate", path: "rate", icon: "⭐", desc: "评分组件" },
      { name: "Picker", path: "picker", icon: "📅", desc: "选择器组件" },
      { name: "DatePicker", path: "date-picker", icon: "📆", desc: "日期选择器" },
      { name: "Calendar", path: "calendar", icon: "📅", desc: "日历组件" },
      { name: "Cascader", path: "cascader", icon: "🔗", desc: "级联选择器" },
      { name: "Upload", path: "upload", icon: "📤", desc: "文件上传组件" },
      { name: "Form", path: "form", icon: "📋", desc: "表单组件" },
      { name: "Field", path: "field", icon: "📑", desc: "表单项组件" },
      { name: "Search", path: "search", icon: "🔍", desc: "搜索组件" },
      { name: "Select", path: "select", icon: "📌", desc: "下拉选择组件" },
      { name: "ColorPanel", path: "color-picker", icon: "🎨", desc: "颜色面板" },
    ],
  },
  {
    name: "反馈组件",
    key: "feedback",
    components: [
      { name: "Toast", path: "toast", icon: "💬", desc: "轻提示组件" },
      { name: "Dialog", path: "dialog", icon: "📢", desc: "对话框组件" },
      { name: "Popup", path: "popup", icon: "🪟", desc: "弹出层组件" },
      { name: "ActionSheet", path: "action-sheet", icon: "📋", desc: "动作面板" },
      { name: "Notify", path: "notify", icon: "🔔", desc: "消息通知组件" },
      { name: "Overlay", path: "overlay", icon: "🌫️", desc: "遮罩层组件" },
      { name: "Empty", path: "empty", icon: "📭", desc: "空状态组件" },
      { name: "Skeleton", path: "skeleton", icon: "💀", desc: "骨架屏组件" },
      { name: "SwipeCell", path: "swipe-cell", icon: "👆", desc: "滑动单元格组件" },
      { name: "PullRefresh", path: "pull-refresh", icon: "🔄", desc: "下拉刷新组件" },
    ],
  },
  {
    name: "展示组件",
    key: "display",
    components: [
      { name: "Card", path: "card", icon: "🎴", desc: "卡片组件" },
      { name: "Cell", path: "cell", icon: "📊", desc: "单元格组件" },
      { name: "Progress", path: "progress", icon: "📊", desc: "进度条组件" },
      { name: "CountDown", path: "countdown", icon: "⏰", desc: "倒计时组件" },
      { name: "NumberRoll", path: "number-roll", icon: "🔢", desc: "数字滚动组件" },
      { name: "NoticeBar", path: "noticebar", icon: "📢", desc: "通知栏组件" },
      { name: "Swiper", path: "swiper", icon: "🎠", desc: "轮播图组件" },
      { name: "TextHighlight", path: "text-highlight", icon: "🖍️", desc: "文本高亮组件" },
      { name: "QRCode", path: "qrcode", icon: "📱", desc: "二维码组件" },
      { name: "Arc", path: "arc", icon: "🌈", desc: "弧形组件" },
    ],
  },
  {
    name: "导航组件",
    key: "navigation",
    components: [
      { name: "Navbar", path: "navbar", icon: "🧭", desc: "导航栏组件" },
      { name: "Tabbar", path: "tabbar", icon: "📑", desc: "底部标签栏" },
      { name: "Tabs", path: "tabs", icon: "📂", desc: "标签页组件" },
      { name: "Sidebar", path: "sidebar", icon: "📚", desc: "侧边栏组件" },
      { name: "IndexBar", path: "index-bar", icon: "🔤", desc: "索引栏组件" },
      { name: "Pagination", path: "pagination", icon: "📄", desc: "分页组件" },
      { name: "BackTop", path: "back-top", icon: "⬆️", desc: "回到顶部组件" },
      { name: "DropdownMenu", path: "dropdown-menu", icon: "📋", desc: "下拉菜单组件" },
      { name: "Steps", path: "steps", icon: "👣", desc: "步骤条组件" },
    ],
  },
  {
    name: "布局组件",
    key: "layout",
    components: [
      { name: "Layout", path: "layout", icon: "📐", desc: "栅格布局组件" },
      { name: "Header", path: "header", icon: "🔝", desc: "页头组件" },
      { name: "Footer", path: "footer", icon: "🔚", desc: "页脚组件" },
      { name: "Sticky", path: "sticky", icon: "📌", desc: "粘性布局组件" },
      { name: "SafeArea", path: "safe-area", icon: "📱", desc: "安全区域组件" },
      { name: "Resize", path: "resize", icon: "📏", desc: "尺寸监听组件" },
    ],
  },
  {
    name: "配置组件",
    key: "config",
    components: [
      { name: "ConfigProvider", path: "config-provider", icon: "⚙️", desc: "全局配置组件" },
      { name: "Transition", path: "transition", icon: "✨", desc: "过渡动画组件" },
    ],
  },
  {
    name: "组合组件",
    key: "composite",
    components: [
      { name: "CellGroup", path: "cell-group", icon: "📦", desc: "单元格分组" },
      { name: "FormItem", path: "form-item", icon: "📝", desc: "表单项组件" },
      { name: "TabbarItem", path: "tabbar-item", icon: "📑", desc: "标签栏子项" },
      { name: "DropdownItem", path: "dropdown-item", icon: "📋", desc: "下拉菜单子项" },
      { name: "IndexAnchor", path: "index-anchor", icon: "🔤", desc: "索引锚点" },
      { name: "SkeletonParts", path: "skeleton-components", icon: "💀", desc: "骨架屏子组件" },
      { name: "PickerPanel", path: "picker-panel", icon: "📅", desc: "选择器面板" },
    ],
  },
]

// 过滤后的分类
const filteredCategories = computed(() => {
  if (!searchText.value) {
    return componentCategories
  }

  const keyword = searchText.value.toLowerCase()
  return componentCategories
    .map((category) => ({
      ...category,
      components: category.components.filter((comp) => comp.name.toLowerCase().includes(keyword) || comp.desc.includes(searchText.value)),
    }))
    .filter((category) => category.components.length > 0)
})

function navigateToDemo(compPath: string) {
  uni.navigateTo({
    url: `/pages/demo/${compPath}/index`,
  })
}
</script>

<style lang="scss" scoped>
.demo-container {
  background: #f5f6fa;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

.search-bar {
  top: 0;
  padding: 24rpx 32rpx;
  z-index: 100;
  position: sticky;
  background: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.component-list {
  padding: 24rpx 32rpx;
}

.category-block {
  margin-bottom: 32rpx;
}

.category-header {
  display: flex;
  padding: 0 8rpx;
  align-items: center;
  margin-bottom: 20rpx;
  justify-content: space-between;

  .category-title {
    color: #333;
    font-size: 32rpx;
    font-weight: 600;
  }

  .category-count {
    color: #999;
    font-size: 24rpx;
  }
}

.component-grid {
  gap: 20rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.component-card {
  display: flex;
  padding: 28rpx;
  background: #fff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
  border-radius: 16rpx;
  flex-direction: column;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  }

  .comp-icon {
    font-size: 44rpx;
    margin-bottom: 12rpx;
  }

  .comp-name {
    color: #333;
    font-size: 28rpx;
    font-weight: 600;
    margin-bottom: 8rpx;
  }

  .comp-desc {
    color: #666;
    font-size: 24rpx;
    line-height: 1.4;
  }
}

.empty-state {
  display: flex;
  padding: 100rpx 0;
  align-items: center;
  flex-direction: column;

  .empty-icon {
    font-size: 80rpx;
    margin-bottom: 20rpx;
  }

  .empty-text {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
