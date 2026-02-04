<template>
  <view class="min-h-screen bg-[#F6F7F9] pb-[160rpx]">
    <view class="flex flex-col space-y-[24rpx] p-[24rpx]">
      <view v-for="i in 3" :key="i" class="bg-white rounded-[24rpx] p-[32rpx] shadow-sm active:bg-slate-50 relative overflow-hidden">
        <view class="flex items-center justify-between mb-[16rpx]">
          <view class="flex items-baseline">
            <text class="text-[32rpx] font-bold text-slate-800 mr-[16rpx]">张三丰</text>
            <text class="text-[28rpx] text-slate-500">138****8888</text>
          </view>
          <view v-if="i === 1" class="px-[12rpx] py-[4rpx] bg-rose-50 text-rose-500 text-[20rpx] rounded-[8rpx] font-bold">默认</view>
        </view>
        <text class="text-[28rpx] text-slate-600 leading-relaxed mb-[24rpx] block">广东省深圳市南山区粤海街道科技园南区虚拟大学园R3-A栋</text>

        <view class="border-t border-slate-50 pt-[24rpx] flex justify-end space-x-[32rpx]">
          <view class="flex items-center text-slate-400">
            <view class="i-lucide-edit-3 text-[28rpx] mr-[8rpx]" />
            <text class="text-[24rpx]">编辑</text>
          </view>
          <view class="flex items-center text-slate-400">
            <view class="i-lucide-trash-2 text-[28rpx] mr-[8rpx]" />
            <text class="text-[24rpx]">删除</text>
          </view>
        </view>
      </view>
    </view>

    <view class="fixed bottom-0 left-0 w-full bg-white px-[32rpx] py-[24rpx] pb-[calc(24rpx+env(safe-area-inset-bottom))] border-t border-slate-100">
      <button class="h-[88rpx] w-full rounded-[44rpx] bg-indigo-600 text-white font-bold flex items-center justify-center shadow-lg shadow-indigo-200">
        <view class="i-lucide-plus text-[36rpx] mr-[12rpx]" /> 新增收货地址
      </button>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "地址管理",
  },
}
</route>
