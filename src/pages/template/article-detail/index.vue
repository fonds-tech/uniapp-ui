<template>
  <view class="pb-[120rpx] bg-white min-h-screen">
    <view class="px-[32rpx] pt-[32rpx]">
      <text class="text-[44rpx] font-bold text-slate-900 leading-snug">深度解析：为什么 Uniapp 是跨端开发的最佳选择？</text>

      <view class="mt-[32rpx] flex items-center justify-between">
        <view class="flex items-center">
          <view class="h-[72rpx] w-[72rpx] rounded-full bg-slate-200 mr-[16rpx]" />
          <view class="flex flex-col">
            <text class="text-[28rpx] font-bold text-slate-800">技术小哥</text>
            <text class="text-[22rpx] text-slate-400">2024-05-20 14:30</text>
          </view>
        </view>
        <button class="h-[56rpx] px-[24rpx] rounded-full bg-indigo-50 text-indigo-600 text-[24rpx] font-bold flex items-center">
          <view class="i-lucide-plus text-[24rpx] mr-[4rpx]" />关注
        </button>
      </view>

      <view class="mt-[48rpx] text-[32rpx] leading-relaxed text-slate-700 space-y-[32rpx]">
        <text class="block"> 在移动应用开发领域，跨平台技术一直是一个热门话题。开发者希望能够通过一套代码，同时构建 iOS、Android、Web 以及各种小程序平台的应用。 </text>
        <view class="h-[400rpx] w-full bg-slate-100 rounded-[16rpx] flex items-center justify-center text-slate-300">
          <view class="i-lucide-image text-[64rpx]" />
        </view>
        <text class="block"> Uniapp 正是解决这一痛点的佼佼者。它基于 Vue.js 框架，继承了 Vue 优秀的开发体验，同时通过强大的编译器将代码转换为各平台的原生代码。 </text>
        <text class="block font-bold text-slate-900"> 核心优势： </text>
        <text class="block">
          1. 学习成本低：只要会 Vue 就能上手。<br />
          2. 生态丰富：拥有庞大的插件市场。<br />
          3. 性能优秀：底层优化保证了接近原生的体验。
        </text>
      </view>
    </view>

    <!-- 底部栏 -->
    <view class="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-[32rpx] py-[20rpx] flex items-center pb-[calc(20rpx+env(safe-area-inset-bottom))]">
      <view class="flex-1 bg-slate-100 h-[72rpx] rounded-full px-[32rpx] flex items-center mr-[32rpx]">
        <view class="i-lucide-edit-3 text-[32rpx] text-slate-400 mr-[16rpx]" />
        <text class="text-[28rpx] text-slate-400">写评论...</text>
      </view>
      <view class="flex items-center space-x-[32rpx]">
        <view class="relative">
          <view class="i-lucide-message-square text-[48rpx] text-slate-600" />
          <view class="absolute -top-[8rpx] -right-[8rpx] px-[8rpx] h-[28rpx] rounded-full bg-rose-500 flex items-center justify-center">
            <text class="text-[18rpx] text-white font-bold">128</text>
          </view>
        </view>
        <view class="i-lucide-star text-[48rpx] text-slate-600" />
        <view class="i-lucide-share-2 text-[48rpx] text-slate-600" />
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "文章详情",
  },
}
</route>
