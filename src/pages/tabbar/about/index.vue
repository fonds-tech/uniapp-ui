<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <view class="fixed left-0 top-0 z-50 w-full bg-white/95 backdrop-blur-md" :style="{ paddingTop: `${safeAreaInsets?.top}px` }">
      <view class="flex h-[88rpx] items-center px-[32rpx]">
        <text class="text-[36rpx] font-bold text-slate-800">关于</text>
      </view>
    </view>

    <view :style="{ height: `${safeAreaInsets?.top + 44}px` }" />

    <view class="px-[32rpx] py-[32rpx] pb-[180rpx]">
      <view class="flex flex-col items-center py-[80rpx] bg-white rounded-[40rpx] mb-[32rpx] shadow-sm">
        <view
          class="flex h-[180rpx] w-[180rpx] items-center justify-center rounded-[48rpx] bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 mb-[32rpx]"
        >
          <view class="i-lucide-layers text-[90rpx] text-white" />
        </view>
        <text class="text-[44rpx] font-black text-slate-900 mb-[8rpx] tracking-tight">UNIAPP UI</text>
        <text class="text-[26rpx] font-medium text-slate-400 bg-slate-100 px-[20rpx] py-[6rpx] rounded-full">v{{ version }}</text>

        <view class="flex items-center mt-[40rpx] space-x-[20rpx]">
          <view class="flex items-center px-[24rpx] py-[12rpx] rounded-[20rpx] bg-[#F8FAFC] border border-slate-100">
            <view class="i-lucide-file-code text-[28rpx] text-[#42b883] mr-[12rpx]" />
            <text class="text-[24rpx] font-bold text-slate-600">Vue 3</text>
          </view>
          <view class="flex items-center px-[24rpx] py-[12rpx] rounded-[20rpx] bg-[#F8FAFC] border border-slate-100">
            <view class="i-lucide-code-2 text-[28rpx] text-[#3178c6] mr-[12rpx]" />
            <text class="text-[24rpx] font-bold text-slate-600">TypeScript</text>
          </view>
        </view>
      </view>

      <view class="bg-white rounded-[32rpx] p-[40rpx] mb-[24rpx] shadow-sm">
        <view class="flex items-center mb-[24rpx]">
          <view class="h-[8rpx] w-[8rpx] rounded-full bg-indigo-500 mr-[16rpx]" />
          <text class="text-[32rpx] font-bold text-slate-900">About</text>
        </view>
        <text class="text-[30rpx] text-slate-600 leading-relaxed text-justify">
          UNIAPP UI 是一套基于 Vue 3 + TypeScript 的现代化跨端 UI 组件库。专为 UniApp 生态打造，内置 100+ 高质量组件与丰富业务模板，致力于提供极致的开发体验与视觉享受。
        </text>
      </view>

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
    title: "100+ 组件",
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

const contacts = [
  {
    icon: "i-lucide-github",
    label: "GitHub",
    value: "uniapp-ui",
    action: "github",
  },
  {
    icon: "i-lucide-message-circle",
    label: "反馈建议",
    value: "Issues",
    action: "issues",
  },
]

function handleContact(contact: (typeof contacts)[0]) {
  uni.showToast({ title: `打开 ${contact.label}`, icon: "none" })
}
</script>

<style>
page {
  background-color: #f6f7f9;
}
</style>
