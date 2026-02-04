<template>
  <view class="min-h-screen bg-[#F6F7F9] pb-[160rpx]">
    <!-- 状态栏 -->
    <view class="bg-indigo-600 px-[40rpx] pt-[40rpx] pb-[80rpx] flex items-center justify-between">
      <view class="text-white">
        <text class="block text-[36rpx] font-bold">商家已发货</text>
        <text class="mt-[8rpx] block text-[26rpx] opacity-80">还剩6天12小时自动确认收货</text>
      </view>
      <view class="i-lucide-truck text-[64rpx] text-white/80" />
    </view>

    <view class="px-[24rpx] -mt-[40rpx] space-y-[24rpx]">
      <!-- 物流 -->
      <view class="bg-white rounded-[24rpx] p-[32rpx] flex items-start shadow-sm active:bg-slate-50">
        <view class="h-[64rpx] w-[64rpx] rounded-full bg-indigo-50 flex items-center justify-center mr-[24rpx] flex-none">
          <view class="i-lucide-map-pin text-[32rpx] text-indigo-500" />
        </view>
        <view class="flex-1">
          <text class="text-[28rpx] text-indigo-500 font-bold leading-relaxed mb-[8rpx] block">已到达 深圳市南山区集散中心，正在分拣中</text>
          <text class="text-[24rpx] text-slate-400">2024-05-20 14:30:25</text>
        </view>
        <view class="i-lucide-chevron-right text-[32rpx] text-slate-300 ml-[16rpx] mt-[8rpx]" />
      </view>

      <!-- 地址 -->
      <view class="bg-white rounded-[24rpx] p-[32rpx] flex items-center shadow-sm">
        <view class="h-[64rpx] w-[64rpx] rounded-full bg-orange-50 flex items-center justify-center mr-[24rpx] flex-none">
          <view class="i-lucide-user text-[32rpx] text-orange-500" />
        </view>
        <view class="flex-1">
          <view class="flex items-baseline mb-[8rpx]">
            <text class="text-[30rpx] font-bold text-slate-800 mr-[16rpx]">张三丰</text>
            <text class="text-[26rpx] text-slate-500">138****8888</text>
          </view>
          <text class="text-[26rpx] text-slate-600 leading-snug">广东省深圳市南山区粤海街道科技园南区虚拟大学园R3-A栋</text>
        </view>
      </view>

      <!-- 商品 -->
      <view class="bg-white rounded-[24rpx] p-[24rpx] shadow-sm">
        <view class="flex items-center mb-[24rpx]">
          <view class="i-lucide-store text-[32rpx] text-slate-700 mr-[12rpx]" />
          <text class="text-[28rpx] font-bold text-slate-800">官方旗舰店</text>
        </view>
        <view class="flex mb-[24rpx]">
          <view class="h-[160rpx] w-[160rpx] bg-slate-100 rounded-[12rpx] mr-[24rpx]" />
          <view class="flex-1 flex flex-col justify-between py-[4rpx]">
            <view>
              <text class="line-clamp-2 text-[28rpx] text-slate-800 leading-snug">2024新款智能手表运动手环监测心率血氧防水长续航</text>
            </view>
            <view class="flex items-center justify-between">
              <text class="text-[32rpx] font-bold text-slate-900">¥299.00</text>
              <text class="text-[26rpx] text-slate-400">x1</text>
            </view>
          </view>
        </view>
        <view class="border-t border-slate-50 pt-[24rpx] space-y-[16rpx]">
          <view class="flex justify-between">
            <text class="text-[26rpx] text-slate-500">商品总价</text>
            <text class="text-[26rpx] text-slate-800">¥299.00</text>
          </view>
          <view class="flex justify-between">
            <text class="text-[26rpx] text-slate-500">运费</text>
            <text class="text-[26rpx] text-slate-800">¥0.00</text>
          </view>
          <view class="flex justify-between items-center pt-[16rpx]">
            <text class="text-[28rpx] font-bold text-slate-800">实付款</text>
            <text class="text-[36rpx] font-bold text-rose-500">¥299.00</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 left-0 w-full bg-white px-[32rpx] py-[20rpx] flex items-center justify-end space-x-[24rpx] pb-[calc(20rpx+env(safe-area-inset-bottom))] border-t border-slate-100">
      <button class="m-0 h-[72rpx] px-[40rpx] rounded-[36rpx] border border-slate-200 bg-white text-[28rpx] text-slate-600 flex items-center">查看物流</button>
      <button class="m-0 h-[72rpx] px-[40rpx] rounded-[36rpx] bg-indigo-600 text-[28rpx] text-white flex items-center font-bold shadow-lg shadow-indigo-200">确认收货</button>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "订单详情",
  },
}
</route>
