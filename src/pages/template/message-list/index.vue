<template>
  <view class="min-h-screen bg-white">
    <view class="flex flex-col">
      <view class="flex items-center px-[32rpx] py-[28rpx] active:bg-slate-50 border-b border-slate-50">
        <view class="relative mr-[24rpx]">
          <view class="flex h-[96rpx] w-[96rpx] items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
            <view class="i-lucide-bell text-[48rpx]" />
          </view>
          <view class="absolute right-0 top-0 h-[20rpx] w-[20rpx] rounded-full bg-rose-500 border-[2rpx] border-white" />
        </view>
        <view class="flex-1 border-b border-transparent">
          <view class="flex justify-between items-center mb-[8rpx]">
            <text class="text-[32rpx] font-bold text-slate-900">系统通知</text>
            <text class="text-[24rpx] text-slate-400">10:24</text>
          </view>
          <text class="line-clamp-1 text-[28rpx] text-slate-500">您的订单已发货，请注意查收快递信息</text>
        </view>
      </view>

      <view v-for="i in 5" :key="i" class="flex items-center px-[32rpx] py-[28rpx] active:bg-slate-50 border-b border-slate-50">
        <view class="relative mr-[24rpx]">
          <view class="h-[96rpx] w-[96rpx] rounded-full bg-slate-200" />
        </view>
        <view class="flex-1">
          <view class="flex justify-between items-center mb-[8rpx]">
            <text class="text-[32rpx] font-bold text-slate-900">用户名称 {{ i }}</text>
            <text class="text-[24rpx] text-slate-400">昨天</text>
          </view>
          <text class="line-clamp-1 text-[28rpx] text-slate-500">你好，请问这个商品还有货吗？</text>
        </view>
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "消息",
  },
}
</route>
