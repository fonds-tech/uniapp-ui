<template>
  <view class="pb-[120rpx] bg-[#F6F7F9] min-h-screen">
    <!-- 商品图片 -->
    <view class="h-[750rpx] w-full bg-slate-300 relative">
      <view class="absolute bottom-[24rpx] right-[24rpx] bg-black/40 px-[20rpx] py-[8rpx] rounded-full text-white text-[24rpx]">1/5</view>
    </view>

    <!-- 信息卡片 -->
    <view class="bg-white p-[32rpx] mb-[20rpx]">
      <view class="flex items-baseline text-rose-500 mb-[16rpx]">
        <text class="text-[32rpx] font-bold">¥</text>
        <text class="text-[56rpx] font-bold ml-[4rpx]">299</text>
        <text class="text-[26rpx] text-slate-400 ml-[16rpx] line-through">¥599</text>
      </view>
      <text class="text-[34rpx] font-bold text-slate-900 leading-snug mb-[16rpx]">全新一代智能降噪耳机，超长续航，HiFi音质体验</text>
      <view class="flex justify-between text-[24rpx] text-slate-400">
        <text>快递: 免运费</text>
        <text>月销 2000+</text>
        <text>广东深圳</text>
      </view>
    </view>

    <!-- 规格选择 -->
    <view class="bg-white p-[32rpx] mb-[20rpx] flex items-center justify-between active:bg-slate-50">
      <view class="flex items-center">
        <text class="text-[28rpx] font-bold text-slate-900 mr-[24rpx]">选择</text>
        <text class="text-[28rpx] text-slate-800">颜色分类，尺码</text>
      </view>
      <view class="i-lucide-chevron-right text-[32rpx] text-slate-300" />
    </view>

    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 left-0 w-full bg-white px-[32rpx] py-[16rpx] flex items-center shadow-lg pb-[calc(16rpx+env(safe-area-inset-bottom))]">
      <view class="flex items-center mr-[32rpx] space-x-[32rpx]">
        <view class="flex flex-col items-center">
          <view class="i-lucide-store text-[40rpx] text-slate-600" />
          <text class="text-[20rpx] text-slate-500 mt-[4rpx]">店铺</text>
        </view>
        <view class="flex flex-col items-center">
          <view class="i-lucide-message-circle text-[40rpx] text-slate-600" />
          <text class="text-[20rpx] text-slate-500 mt-[4rpx]">客服</text>
        </view>
        <view class="flex flex-col items-center">
          <view class="i-lucide-star text-[40rpx] text-slate-600" />
          <text class="text-[20rpx] text-slate-500 mt-[4rpx]">收藏</text>
        </view>
      </view>
      <view class="flex-1 flex items-center">
        <button class="flex-1 h-[80rpx] rounded-l-[40rpx] bg-indigo-500 text-white text-[28rpx] font-bold flex items-center justify-center">加入购物车</button>
        <button class="flex-1 h-[80rpx] rounded-r-[40rpx] bg-rose-500 text-white text-[28rpx] font-bold flex items-center justify-center">立即购买</button>
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "商品详情",
  },
}
</route>
