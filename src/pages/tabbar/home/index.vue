<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <!-- 顶部导航栏占位 -->
    <view class="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="flex h-[88rpx] items-center px-[32rpx]">
        <text class="text-[36rpx] font-bold text-slate-800">Fonds UI</text>
      </view>
    </view>

    <!-- 头部区域 -->
    <view class="relative overflow-hidden bg-white pt-[calc(var(--status-bar-height)+100rpx)] pb-[64rpx]">
      <!-- 装饰背景 -->
      <view class="absolute right-0 top-0 -mr-[100rpx] -mt-[100rpx] h-[400rpx] w-[400rpx] rounded-full bg-indigo-500/10 blur-[80rpx] opacity-60" />
      <view class="absolute left-0 top-[200rpx] -ml-[100rpx] h-[300rpx] w-[300rpx] rounded-full bg-fuchsia-500/10 blur-[60rpx] opacity-60" />

      <view class="relative px-[40rpx]">
        <view class="flex items-center justify-between">
          <view>
            <text class="block text-[64rpx] font-extrabold text-slate-900 leading-tight tracking-tight">
              Design <br />
              System
            </text>
            <text class="mt-[24rpx] block text-[30rpx] font-medium text-slate-500">构建优雅的跨端应用界面</text>
          </view>
          <view class="flex h-[112rpx] w-[112rpx] items-center justify-center rounded-[32rpx] bg-indigo-50 border border-indigo-100 shadow-sm rotate-3">
            <view class="i-lucide-layers text-[56rpx] text-indigo-600" />
          </view>
        </view>

        <!-- 统计卡片 -->
        <view class="mt-[80rpx] relative overflow-hidden rounded-[40rpx] bg-gradient-to-r from-indigo-600 to-violet-600 p-[1rpx] shadow-xl shadow-indigo-500/25">
          <view class="relative h-full w-full bg-gradient-to-br from-white/10 to-transparent p-[48rpx]">
            <view class="flex justify-between text-white relative z-10">
              <view class="flex flex-col items-center">
                <text class="text-[52rpx] font-bold leading-none tracking-tight">80+</text>
                <text class="mt-[12rpx] text-[24rpx] font-medium text-indigo-100 opacity-90">组件总数</text>
              </view>
              <view class="h-[80rpx] w-[1rpx] bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
              <view class="flex flex-col items-center">
                <text class="text-[52rpx] font-bold leading-none tracking-tight">20+</text>
                <text class="mt-[12rpx] text-[24rpx] font-medium text-indigo-100 opacity-90">工具函数</text>
              </view>
              <view class="h-[80rpx] w-[1rpx] bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
              <view class="flex flex-col items-center">
                <text class="text-[52rpx] font-bold leading-none tracking-tight">3</text>
                <text class="mt-[12rpx] text-[24rpx] font-medium text-indigo-100 opacity-90">多端适配</text>
              </view>
            </view>

            <!-- 装饰圆环 -->
            <view class="absolute -right-[40rpx] -top-[40rpx] h-[200rpx] w-[200rpx] rounded-full border-[20rpx] border-white/5 opacity-50" />
            <view class="absolute -left-[40rpx] -bottom-[40rpx] h-[160rpx] w-[160rpx] rounded-full border-[16rpx] border-white/5 opacity-50" />
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="px-[32rpx] -mt-[32rpx] relative z-10">
      <view class="grid grid-cols-2 gap-[24rpx]">
        <view
          class="group flex flex-col justify-center rounded-[32rpx] bg-white p-[36rpx] shadow-[0_8rpx_30rpx_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all duration-200"
          @click="switchToComponents"
        >
          <view class="mb-[24rpx] flex h-[88rpx] w-[88rpx] items-center justify-center rounded-[24rpx] bg-indigo-50 group-active:bg-indigo-100 transition-colors">
            <view class="i-lucide-component text-[44rpx] text-indigo-600" />
          </view>
          <text class="text-[32rpx] font-bold text-slate-800">组件演示</text>
          <text class="mt-[8rpx] text-[24rpx] text-slate-400">实时预览效果</text>
        </view>

        <view
          class="group flex flex-col justify-center rounded-[32rpx] bg-white p-[36rpx] shadow-[0_8rpx_30rpx_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all duration-200"
          @click="openDocs"
        >
          <view class="mb-[24rpx] flex h-[88rpx] w-[88rpx] items-center justify-center rounded-[24rpx] bg-emerald-50 group-active:bg-emerald-100 transition-colors">
            <view class="i-lucide-book-open text-[44rpx] text-emerald-600" />
          </view>
          <text class="text-[32rpx] font-bold text-slate-800">开发文档</text>
          <text class="mt-[8rpx] text-[24rpx] text-slate-400">API 与指南</text>
        </view>
      </view>

      <!-- 次级入口 -->
      <view class="mt-[24rpx] grid grid-cols-2 gap-[24rpx]">
        <view class="flex items-center rounded-[28rpx] bg-white p-[24rpx] shadow-sm active:bg-gray-50 transition-colors" @click="switchToTemplates">
          <view class="flex h-[72rpx] w-[72rpx] items-center justify-center rounded-[20rpx] bg-amber-50 mr-[20rpx]">
            <view class="i-lucide-layout-template text-[36rpx] text-amber-600" />
          </view>
          <view>
            <text class="block text-[28rpx] font-bold text-slate-800">业务模板</text>
            <text class="text-[22rpx] text-slate-400">快速搭建页面</text>
          </view>
        </view>

        <view class="flex items-center rounded-[28rpx] bg-white p-[24rpx] shadow-sm active:bg-gray-50 transition-colors" @click="switchToAbout">
          <view class="flex h-[72rpx] w-[72rpx] items-center justify-center rounded-[20rpx] bg-rose-50 mr-[20rpx]">
            <view class="i-lucide-info text-[36rpx] text-rose-600" />
          </view>
          <view>
            <text class="block text-[28rpx] font-bold text-slate-800">关于我们</text>
            <text class="text-[22rpx] text-slate-400">版本与更新</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 组件分类 -->
    <view class="px-[32rpx] py-[64rpx] pb-[180rpx]">
      <view class="mb-[40rpx] flex items-center justify-between">
        <view class="flex items-center">
          <view class="h-[32rpx] w-[8rpx] rounded-full bg-indigo-600 mr-[16rpx]" />
          <text class="text-[36rpx] font-bold text-slate-900">组件分类</text>
        </view>
        <text class="text-[26rpx] font-medium text-indigo-500 active:opacity-60" @click="switchToComponents"> 查看全部 </text>
      </view>

      <view class="flex flex-col space-y-[24rpx]">
        <view
          v-for="category in categories"
          :key="category.name"
          class="relative overflow-hidden flex items-center justify-between rounded-[32rpx] bg-white p-[32rpx] shadow-[0_4rpx_20rpx_rgba(0,0,0,0.02)] border border-gray-100 active:bg-gray-50 active:scale-[0.99] transition-all duration-300"
          @click="navigateToCategory(category.key)"
        >
          <view class="flex items-center z-10">
            <view :class="`flex h-[96rpx] w-[96rpx] items-center justify-center rounded-[24rpx] ${category.bgClass} transition-transform duration-300`">
              <view :class="`${category.icon} text-[44rpx] ${category.textClass}`" />
            </view>
            <view class="ml-[32rpx] flex flex-col">
              <text class="text-[32rpx] font-bold text-slate-800">{{ category.name }}</text>
              <text class="text-[24rpx] text-slate-400 mt-[6rpx]">{{ category.desc }}</text>
            </view>
          </view>
          <view class="flex items-center z-10">
            <view class="flex items-center justify-center rounded-full bg-gray-50 px-[20rpx] py-[8rpx]">
              <text class="text-[24rpx] font-bold text-gray-400">{{ category.count }}</text>
            </view>
            <view class="i-lucide-chevron-right ml-[16rpx] text-gray-300 text-[36rpx]" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  type: "home",
  style: {
    navigationBarTitleText: "Fonds UI",
    navigationStyle: "custom",
  },
})

const safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets

const categories = [
  {
    key: "basic",
    name: "基础组件",
    desc: "Button, Icon, Layout...",
    icon: "i-lucide-box",
    count: 12,
    bgClass: "bg-blue-50",
    textClass: "text-blue-500",
  },
  {
    key: "form",
    name: "表单组件",
    desc: "Input, Select, Switch...",
    icon: "i-lucide-check-square",
    count: 15,
    bgClass: "bg-indigo-50",
    textClass: "text-indigo-500",
  },
  {
    key: "feedback",
    name: "反馈组件",
    desc: "Toast, Modal, Popup...",
    icon: "i-lucide-message-circle",
    count: 10,
    bgClass: "bg-amber-50",
    textClass: "text-amber-500",
  },
  {
    key: "display",
    name: "展示组件",
    desc: "Avatar, Tag, Badge...",
    icon: "i-lucide-image",
    count: 18,
    bgClass: "bg-rose-50",
    textClass: "text-rose-500",
  },
  {
    key: "navigation",
    name: "导航组件",
    desc: "Tabs, Navbar, Tabbar...",
    icon: "i-lucide-compass",
    count: 8,
    bgClass: "bg-emerald-50",
    textClass: "text-emerald-500",
  },
  {
    key: "layout",
    name: "布局组件",
    desc: "Grid, Section, Divider...",
    icon: "i-lucide-layout-grid",
    count: 6,
    bgClass: "bg-cyan-50",
    textClass: "text-cyan-500",
  },
]

function switchToComponents() {
  uni.switchTab({ url: "/pages/tabbar/components/index" })
}

function switchToTemplates() {
  uni.switchTab({ url: "/pages/tabbar/templates/index" })
}

function switchToAbout() {
  uni.switchTab({ url: "/pages/tabbar/about/index" })
}

function navigateToCategory(category: string) {
  uni.navigateTo({ url: `/pages/demo/index?category=${category}` })
}

function openDocs() {
  // #ifdef H5
  window.open("/docs/", "_blank")
  // #endif
  // #ifndef H5
  uni.showToast({ title: "请在 H5 端查看文档", icon: "none" })
  // #endif
}
</script>

<style>
page {
  background-color: #f6f7f9;
}
</style>
