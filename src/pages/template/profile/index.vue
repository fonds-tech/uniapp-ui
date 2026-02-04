<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <!-- 顶部背景 -->
    <view class="h-[360rpx] bg-gradient-to-br from-indigo-500 to-purple-600 relative">
      <view class="absolute bottom-0 left-0 w-full h-[40rpx] bg-[#F6F7F9] rounded-t-[40rpx]" />
    </view>

    <!-- 用户卡片 -->
    <view class="px-[32rpx] -mt-[120rpx] relative z-10">
      <view class="bg-white rounded-[32rpx] p-[32rpx] shadow-sm flex items-center">
        <view class="h-[120rpx] w-[120rpx] rounded-full bg-slate-200 border-[4rpx] border-white shadow-sm mr-[24rpx]" />
        <view class="flex-1">
          <text class="block text-[36rpx] font-bold text-slate-900">User Name</text>
          <text class="mt-[8rpx] block text-[26rpx] text-slate-400">前端开发工程师</text>
        </view>
        <view class="i-lucide-chevron-right text-[40rpx] text-slate-300" />
      </view>

      <!-- 统计数据 -->
      <view class="mt-[32rpx] grid grid-cols-3 gap-[24rpx]">
        <view class="bg-white rounded-[24rpx] p-[24rpx] flex flex-col items-center shadow-sm">
          <text class="text-[36rpx] font-bold text-slate-900">128</text>
          <text class="mt-[8rpx] text-[24rpx] text-slate-400">关注</text>
        </view>
        <view class="bg-white rounded-[24rpx] p-[24rpx] flex flex-col items-center shadow-sm">
          <text class="text-[36rpx] font-bold text-slate-900">3,456</text>
          <text class="mt-[8rpx] text-[24rpx] text-slate-400">粉丝</text>
        </view>
        <view class="bg-white rounded-[24rpx] p-[24rpx] flex flex-col items-center shadow-sm">
          <text class="text-[36rpx] font-bold text-slate-900">892</text>
          <text class="mt-[8rpx] text-[24rpx] text-slate-400">获赞</text>
        </view>
      </view>

      <!-- 菜单列表 -->
      <view class="mt-[32rpx] bg-white rounded-[32rpx] overflow-hidden shadow-sm">
        <view class="flex items-center px-[32rpx] py-[32rpx] border-b border-slate-50 active:bg-slate-50">
          <view class="i-lucide-heart text-[40rpx] text-rose-500 mr-[24rpx]" />
          <text class="flex-1 text-[30rpx] text-slate-700">我的收藏</text>
          <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
        </view>
        <view class="flex items-center px-[32rpx] py-[32rpx] border-b border-slate-50 active:bg-slate-50">
          <view class="i-lucide-wallet text-[40rpx] text-amber-500 mr-[24rpx]" />
          <text class="flex-1 text-[30rpx] text-slate-700">我的钱包</text>
          <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
        </view>
        <view class="flex items-center px-[32rpx] py-[32rpx] active:bg-slate-50">
          <view class="i-lucide-settings text-[40rpx] text-slate-500 mr-[24rpx]" />
          <text class="flex-1 text-[30rpx] text-slate-700">设置</text>
          <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
        </view>
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "用户资料页",
    navigationStyle: "custom",
  },
}
</route>
