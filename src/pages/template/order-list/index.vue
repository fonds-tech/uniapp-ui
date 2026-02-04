<template>
  <view class="flex h-screen flex-col bg-[#F6F7F9]">
    <!-- Tabs -->
    <view class="flex items-center justify-around bg-white px-[16rpx] h-[88rpx]">
      <view class="flex flex-col items-center h-full justify-center px-[20rpx] relative">
        <text class="text-[30rpx] font-bold text-indigo-600">全部</text>
        <view class="absolute bottom-0 h-[6rpx] w-[40rpx] bg-indigo-600 rounded-full" />
      </view>
      <view class="flex flex-col items-center h-full justify-center px-[20rpx]">
        <text class="text-[28rpx] text-slate-500">待付款</text>
      </view>
      <view class="flex flex-col items-center h-full justify-center px-[20rpx]">
        <text class="text-[28rpx] text-slate-500">待发货</text>
      </view>
      <view class="flex flex-col items-center h-full justify-center px-[20rpx]">
        <text class="text-[28rpx] text-slate-500">待收货</text>
      </view>
      <view class="flex flex-col items-center h-full justify-center px-[20rpx]">
        <text class="text-[28rpx] text-slate-500">评价</text>
      </view>
    </view>

    <!-- 列表 -->
    <scroll-view scroll-y class="flex-1 p-[24rpx]">
      <view class="space-y-[24rpx]">
        <view v-for="i in 5" :key="i" class="bg-white rounded-[24rpx] p-[24rpx] shadow-sm">
          <view class="flex items-center justify-between mb-[24rpx]">
            <view class="flex items-center">
              <view class="i-lucide-store text-[32rpx] text-slate-700 mr-[12rpx]" />
              <text class="text-[28rpx] font-bold text-slate-800">官方旗舰店</text>
              <view class="i-lucide-chevron-right text-[28rpx] text-slate-300 ml-[8rpx]" />
            </view>
            <text class="text-[26rpx] text-indigo-500 font-medium">待发货</text>
          </view>

          <view class="flex mb-[24rpx]">
            <view class="h-[160rpx] w-[160rpx] bg-slate-100 rounded-[12rpx] mr-[24rpx]" />
            <view class="flex-1 flex flex-col justify-between py-[4rpx]">
              <view>
                <text class="line-clamp-2 text-[28rpx] text-slate-800 leading-snug">2024新款智能手表运动手环监测心率血氧防水长续航</text>
                <text class="mt-[12rpx] text-[24rpx] text-slate-400 bg-slate-50 px-[12rpx] py-[4rpx] rounded-[8rpx] inline-block">黑色，标准版</text>
              </view>
              <view class="flex items-center justify-between">
                <text class="text-[32rpx] font-bold text-slate-900">¥299.00</text>
                <text class="text-[26rpx] text-slate-400">x1</text>
              </view>
            </view>
          </view>

          <view class="flex justify-end items-center mb-[24rpx]">
            <text class="text-[26rpx] text-slate-500 mr-[12rpx]">共1件商品 合计:</text>
            <text class="text-[32rpx] font-bold text-slate-900">¥299.00</text>
          </view>

          <view class="flex justify-end space-x-[20rpx]">
            <button class="m-0 h-[64rpx] px-[32rpx] rounded-[32rpx] border border-slate-200 bg-white text-[26rpx] text-slate-600 flex items-center">查看物流</button>
            <button class="m-0 h-[64rpx] px-[32rpx] rounded-[32rpx] border border-indigo-600 bg-white text-[26rpx] text-indigo-600 flex items-center">确认收货</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "我的订单",
  },
}
</route>
