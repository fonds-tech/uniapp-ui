<template>
  <view class="min-h-screen bg-[#F6F7F9]">
    <view class="bg-indigo-600 px-[40rpx] pt-[60rpx] pb-[120rpx]">
      <text class="text-[28rpx] text-indigo-200">总资产 (元)</text>
      <text class="mt-[16rpx] block text-[72rpx] font-bold text-white">8,942.50</text>
    </view>

    <view class="px-[32rpx] -mt-[60rpx]">
      <!-- 统计卡片 -->
      <view class="mb-[32rpx] flex rounded-[24rpx] bg-white p-[32rpx] shadow-sm">
        <view class="flex-1 flex flex-col items-center border-r border-slate-100">
          <text class="text-[26rpx] text-slate-400">今日收益</text>
          <text class="mt-[8rpx] text-[32rpx] font-bold text-rose-500">+12.80</text>
        </view>
        <view class="flex-1 flex flex-col items-center">
          <text class="text-[26rpx] text-slate-400">累计收益</text>
          <text class="mt-[8rpx] text-[32rpx] font-bold text-slate-800">420.50</text>
        </view>
      </view>

      <!-- 功能入口 -->
      <view class="mb-[32rpx] grid grid-cols-3 gap-[20rpx]">
        <view class="flex flex-col items-center justify-center bg-white rounded-[24rpx] h-[160rpx] shadow-sm active:bg-slate-50">
          <view class="i-lucide-credit-card text-[48rpx] text-indigo-500 mb-[12rpx]" />
          <text class="text-[26rpx] text-slate-700">银行卡</text>
        </view>
        <view class="flex flex-col items-center justify-center bg-white rounded-[24rpx] h-[160rpx] shadow-sm active:bg-slate-50">
          <view class="i-lucide-arrow-down-circle text-[48rpx] text-emerald-500 mb-[12rpx]" />
          <text class="text-[26rpx] text-slate-700">充值</text>
        </view>
        <view class="flex flex-col items-center justify-center bg-white rounded-[24rpx] h-[160rpx] shadow-sm active:bg-slate-50">
          <view class="i-lucide-arrow-up-circle text-[48rpx] text-rose-500 mb-[12rpx]" />
          <text class="text-[26rpx] text-slate-700">提现</text>
        </view>
      </view>

      <!-- 账单列表 -->
      <view class="bg-white rounded-[24rpx] p-[32rpx] shadow-sm">
        <text class="text-[32rpx] font-bold text-slate-800 mb-[24rpx] block">近期账单</text>
        <view class="space-y-[32rpx]">
          <view v-for="i in 5" :key="i" class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="h-[72rpx] w-[72rpx] rounded-full bg-slate-100 flex items-center justify-center mr-[20rpx]">
                <view class="i-lucide-shopping-bag text-[36rpx] text-slate-500" />
              </view>
              <view>
                <text class="block text-[30rpx] font-bold text-slate-800">购物消费</text>
                <text class="text-[24rpx] text-slate-400">10-24 14:30</text>
              </view>
            </view>
            <text class="text-[32rpx] font-bold text-slate-900">-89.00</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "我的钱包",
    navigationStyle: "custom",
  },
}
</route>
