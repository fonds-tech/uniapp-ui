<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <!-- 顶部导航栏 -->
    <view
      class="fixed left-0 top-0 z-50 w-full bg-white/95 backdrop-blur-md"
      :style="{ paddingTop: `${safeAreaInsets?.top}px` }"
    >
      <view class="flex h-[88rpx] items-center px-[32rpx]">
        <text class="text-[36rpx] font-bold text-slate-800">关于</text>
      </view>
    </view>

    <!-- 占位区域 -->
    <view :style="{ height: `${safeAreaInsets?.top + 44}px` }" />

    <!-- 主体内容 -->
    <view class="px-[32rpx] py-[32rpx] pb-[180rpx]">
      <!-- Logo 和版本信息 -->
      <view class="flex flex-col items-center py-[60rpx] bg-white rounded-[32rpx] mb-[32rpx]">
        <view
          class="flex h-[160rpx] w-[160rpx] items-center justify-center rounded-[40rpx] bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-[32rpx]"
        >
          <view class="i-lucide-layers text-[80rpx] text-white" />
        </view>
        <text class="text-[40rpx] font-bold text-slate-800 mb-[12rpx]">Fonds UI</text>
        <text class="text-[28rpx] text-gray-400">v{{ version }}</text>
        <view class="flex items-center mt-[24rpx] space-x-[16rpx]">
          <view class="px-[20rpx] py-[8rpx] rounded-full bg-emerald-50 text-[24rpx] text-emerald-600">
            Vue 3
          </view>
          <view class="px-[20rpx] py-[8rpx] rounded-full bg-blue-50 text-[24rpx] text-blue-600">
            TypeScript
          </view>
          <view class="px-[20rpx] py-[8rpx] rounded-full bg-violet-50 text-[24rpx] text-violet-600">
            UniApp
          </view>
        </view>
      </view>

      <!-- 项目介绍 -->
      <view class="bg-white rounded-[28rpx] p-[32rpx] mb-[24rpx]">
        <view class="flex items-center mb-[20rpx]">
          <view class="i-lucide-info text-[36rpx] text-indigo-500 mr-[16rpx]" />
          <text class="text-[30rpx] font-bold text-slate-800">项目介绍</text>
        </view>
        <text class="text-[28rpx] text-gray-600 leading-relaxed">
          Fonds UI 是一套基于 Vue 3 + TypeScript 的跨端 UI 组件库，专为 UniApp 生态打造。
          提供 80+ 高质量组件，覆盖移动端开发常见场景，助力开发者快速构建优雅的应用界面。
        </text>
      </view>

      <!-- 功能特性 -->
      <view class="bg-white rounded-[28rpx] p-[32rpx] mb-[24rpx]">
        <view class="flex items-center mb-[24rpx]">
          <view class="i-lucide-sparkles text-[36rpx] text-amber-500 mr-[16rpx]" />
          <text class="text-[30rpx] font-bold text-slate-800">功能特性</text>
        </view>
        <view class="flex flex-col space-y-[20rpx]">
          <view v-for="feature in features" :key="feature.title" class="flex items-start">
            <view :class="`${feature.icon} text-[32rpx] ${feature.textClass} mr-[20rpx] mt-[4rpx]`" />
            <view class="flex-1">
              <text class="text-[28rpx] font-medium text-slate-700">{{ feature.title }}</text>
              <text class="text-[24rpx] text-gray-400 ml-[12rpx]">{{ feature.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 更新日志 -->
      <view class="bg-white rounded-[28rpx] p-[32rpx] mb-[24rpx]">
        <view class="flex items-center justify-between mb-[24rpx]">
          <view class="flex items-center">
            <view class="i-lucide-git-commit text-[36rpx] text-emerald-500 mr-[16rpx]" />
            <text class="text-[30rpx] font-bold text-slate-800">更新日志</text>
          </view>
          <text class="text-[26rpx] text-indigo-500" @click="viewAllChangelog">查看全部</text>
        </view>
        <view class="flex flex-col space-y-[24rpx]">
          <view v-for="log in changelog" :key="log.version" class="relative pl-[32rpx]">
            <view class="absolute left-0 top-[8rpx] h-[16rpx] w-[16rpx] rounded-full bg-indigo-500" />
            <view
              v-if="changelog.indexOf(log) !== changelog.length - 1"
              class="absolute left-[6rpx] top-[28rpx] bottom-[-24rpx] w-[4rpx] bg-gray-200"
            />
            <view class="flex items-center mb-[8rpx]">
              <text class="text-[28rpx] font-bold text-slate-800">v{{ log.version }}</text>
              <text class="text-[24rpx] text-gray-400 ml-[16rpx]">{{ log.date }}</text>
            </view>
            <view class="flex flex-col space-y-[8rpx]">
              <text v-for="(item, index) in log.items" :key="index" class="text-[26rpx] text-gray-600">
                • {{ item }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 联系我们 -->
      <view class="bg-white rounded-[28rpx] p-[32rpx] mb-[24rpx]">
        <view class="flex items-center mb-[24rpx]">
          <view class="i-lucide-mail text-[36rpx] text-rose-500 mr-[16rpx]" />
          <text class="text-[30rpx] font-bold text-slate-800">联系我们</text>
        </view>
        <view class="flex flex-col space-y-[20rpx]">
          <view
            v-for="contact in contacts"
            :key="contact.label"
            class="flex items-center justify-between py-[16rpx] border-b border-gray-100 last:border-b-0 active:bg-gray-50"
            @click="handleContact(contact)"
          >
            <view class="flex items-center">
              <view :class="`${contact.icon} text-[32rpx] text-gray-400 mr-[20rpx]`" />
              <text class="text-[28rpx] text-slate-700">{{ contact.label }}</text>
            </view>
            <view class="flex items-center">
              <text class="text-[26rpx] text-gray-400 mr-[12rpx]">{{ contact.value }}</text>
              <view class="i-lucide-chevron-right text-[28rpx] text-gray-300" />
            </view>
          </view>
        </view>
      </view>

      <!-- 版权信息 -->
      <view class="flex flex-col items-center py-[40rpx]">
        <text class="text-[24rpx] text-gray-400">Made with ❤️ by Fonds Team</text>
        <text class="text-[22rpx] text-gray-300 mt-[12rpx]">© 2024 Fonds UI. MIT License.</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "关于",
    navigationStyle: "custom",
  },
})

const safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets

const version = "1.0.0"

const features = [
  {
    icon: "i-lucide-box",
    textClass: "text-blue-500",
    title: "80+ 组件",
    desc: "覆盖常见业务场景",
  },
  {
    icon: "i-lucide-smartphone",
    textClass: "text-emerald-500",
    title: "多端适配",
    desc: "H5、小程序、App",
  },
  {
    icon: "i-lucide-palette",
    textClass: "text-violet-500",
    title: "主题定制",
    desc: "支持深度样式定制",
  },
  {
    icon: "i-lucide-zap",
    textClass: "text-amber-500",
    title: "轻量高效",
    desc: "按需引入，体积更小",
  },
  {
    icon: "i-lucide-code-2",
    textClass: "text-rose-500",
    title: "TypeScript",
    desc: "完整类型定义支持",
  },
]

const changelog = [
  {
    version: "1.0.0",
    date: "2024-01-15",
    items: ["正式发布 1.0 版本", "新增 80+ 基础组件", "完善文档和示例"],
  },
  {
    version: "0.9.0",
    date: "2024-01-01",
    items: ["新增表单验证组件", "优化组件性能", "修复已知问题"],
  },
  {
    version: "0.8.0",
    date: "2023-12-15",
    items: ["新增反馈类组件", "支持暗黑模式"],
  },
]

const contacts = [
  {
    icon: "i-lucide-github",
    label: "GitHub",
    value: "fonds-ui",
    action: "github",
  },
  {
    icon: "i-lucide-book-open",
    label: "文档",
    value: "docs.fonds-ui.com",
    action: "docs",
  },
  {
    icon: "i-lucide-message-circle",
    label: "反馈建议",
    value: "Issues",
    action: "issues",
  },
]

function viewAllChangelog() {
  uni.showToast({ title: "更多日志开发中", icon: "none" })
}

function handleContact(contact: (typeof contacts)[0]) {
  uni.showToast({ title: `打开 ${contact.label}`, icon: "none" })
}
</script>

<style>
page {
  background-color: #f6f7f9;
}
</style>
