<template>
  <view class="min-h-screen bg-[#F6F7F9] py-[24rpx]">
    <!-- 分组 1 -->
    <view class="mx-[32rpx] mb-[32rpx] overflow-hidden rounded-[24rpx] bg-white shadow-sm">
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] border-b border-slate-50 active:bg-slate-50">
        <text class="text-[30rpx] text-slate-700">账号安全</text>
        <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
      </view>
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] active:bg-slate-50">
        <text class="text-[30rpx] text-slate-700">隐私设置</text>
        <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
      </view>
    </view>

    <!-- 分组 2 -->
    <view class="mx-[32rpx] mb-[32rpx] overflow-hidden rounded-[24rpx] bg-white shadow-sm">
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] border-b border-slate-50">
        <text class="text-[30rpx] text-slate-700">消息通知</text>
        <switch color="#4f46e5" style="transform: scale(0.8)" checked />
      </view>
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] border-b border-slate-50">
        <text class="text-[30rpx] text-slate-700">深色模式</text>
        <switch color="#4f46e5" style="transform: scale(0.8)" />
      </view>
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] active:bg-slate-50">
        <text class="text-[30rpx] text-slate-700">清除缓存</text>
        <text class="text-[26rpx] text-slate-400">12.8MB</text>
      </view>
    </view>

    <!-- 分组 3 -->
    <view class="mx-[32rpx] overflow-hidden rounded-[24rpx] bg-white shadow-sm">
      <view class="flex items-center justify-between px-[32rpx] py-[32rpx] active:bg-slate-50">
        <text class="text-[30rpx] text-slate-700">关于我们</text>
        <view class="flex items-center">
          <text class="text-[26rpx] text-slate-400 mr-[12rpx]">v1.0.0</text>
          <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
        </view>
      </view>
    </view>

    <view class="mt-[64rpx] px-[32rpx]">
      <button class="h-[88rpx] w-full rounded-[44rpx] bg-white text-[30rpx] text-rose-500 font-bold border border-rose-100 flex items-center justify-center active:bg-rose-50">
        退出登录
      </button>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "设置",
    backgroundColor: "#F6F7F9",
  },
}
</route>
