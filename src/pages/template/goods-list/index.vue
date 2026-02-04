<template>
  <view class="flex h-screen flex-col bg-[#F6F7F9]">
    <!-- 搜索栏 -->
    <view class="bg-white px-[32rpx] py-[16rpx]">
      <view class="flex h-[72rpx] items-center rounded-[36rpx] bg-slate-100 px-[24rpx]">
        <view class="i-lucide-search text-[32rpx] text-slate-400 mr-[16rpx]" />
        <input class="flex-1 text-[28rpx] text-slate-900" placeholder="搜索商品" placeholder-style="color: #94a3b8" />
      </view>
    </view>

    <!-- 分类 -->
    <view class="flex items-center justify-around bg-white pb-[16rpx] pt-[8rpx]">
      <view class="flex flex-col items-center">
        <text class="text-[28rpx] font-bold text-indigo-600">综合</text>
        <view class="mt-[8rpx] h-[4rpx] w-[32rpx] rounded-full bg-indigo-600" />
      </view>
      <text class="text-[28rpx] text-slate-500">销量</text>
      <text class="text-[28rpx] text-slate-500">价格</text>
      <text class="text-[28rpx] text-slate-500">筛选</text>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="flex-1 p-[24rpx]">
      <view class="grid grid-cols-2 gap-[20rpx]">
        <view v-for="i in 6" :key="i" class="overflow-hidden rounded-[20rpx] bg-white shadow-sm">
          <view class="h-[320rpx] w-full bg-slate-200" />
          <view class="p-[20rpx]">
            <text class="line-clamp-2 text-[28rpx] text-slate-800 leading-snug">无线蓝牙耳机 降噪运动 舒适入耳 长续航</text>
            <view class="mt-[16rpx] flex items-end justify-between">
              <view class="flex items-baseline text-rose-500">
                <text class="text-[24rpx] font-bold">¥</text>
                <text class="text-[36rpx] font-bold ml-[4rpx]">299</text>
              </view>
              <text class="text-[22rpx] text-slate-400">1.2k+人付款</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "商品列表",
  },
}
</route>
