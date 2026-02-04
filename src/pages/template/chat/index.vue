<template>
  <view class="flex h-screen flex-col bg-[#F6F7F9]">
    <scroll-view scroll-y class="flex-1 px-[24rpx] py-[32rpx]">
      <view class="space-y-[40rpx] pb-[40rpx]">
        <view class="flex justify-center">
          <text class="rounded-[8rpx] bg-slate-200 px-[16rpx] py-[4rpx] text-[22rpx] text-slate-500">昨天 14:30</text>
        </view>

        <!-- 对方消息 -->
        <view class="flex items-start">
          <view class="h-[80rpx] w-[80rpx] rounded-[12rpx] bg-indigo-100 flex-none mr-[20rpx]" />
          <view class="bg-white p-[24rpx] rounded-[20rpx] rounded-tl-[4rpx] max-w-[70%] shadow-sm">
            <text class="text-[30rpx] text-slate-800 leading-relaxed">你好，请问这个商品什么时候发货呢？</text>
          </view>
        </view>

        <!-- 我方消息 -->
        <view class="flex items-start justify-end">
          <view class="bg-indigo-500 p-[24rpx] rounded-[20rpx] rounded-tr-[4rpx] max-w-[70%] shadow-sm shadow-indigo-200 mr-[20rpx]">
            <text class="text-[30rpx] text-white leading-relaxed">您好，我们一般在24小时内发货，请您耐心等待。</text>
          </view>
          <view class="h-[80rpx] w-[80rpx] rounded-[12rpx] bg-slate-200 flex-none" />
        </view>

        <view class="flex justify-center">
          <text class="rounded-[8rpx] bg-slate-200 px-[16rpx] py-[4rpx] text-[22rpx] text-slate-500">10:24</text>
        </view>

        <!-- 对方消息 -->
        <view class="flex items-start">
          <view class="h-[80rpx] w-[80rpx] rounded-[12rpx] bg-indigo-100 flex-none mr-[20rpx]" />
          <view class="bg-white p-[24rpx] rounded-[20rpx] rounded-tl-[4rpx] max-w-[70%] shadow-sm">
            <text class="text-[30rpx] text-slate-800 leading-relaxed">好的，谢谢！</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入栏 -->
    <view class="bg-white px-[24rpx] py-[16rpx] pb-[calc(16rpx+env(safe-area-inset-bottom))] border-t border-slate-100 flex items-end">
      <view class="i-lucide-mic text-[56rpx] text-slate-500 mb-[12rpx] mr-[24rpx]" />
      <view class="flex-1 min-h-[80rpx] bg-slate-100 rounded-[40rpx] px-[32rpx] py-[20rpx] mr-[24rpx]">
        <textarea auto-height class="w-full text-[30rpx] text-slate-900 leading-relaxed max-h-[200rpx]" cursor-spacing="20" placeholder="发消息..." />
      </view>
      <view class="i-lucide-plus-circle text-[56rpx] text-slate-500 mb-[12rpx] mr-[24rpx]" />
      <view class="h-[64rpx] px-[32rpx] bg-indigo-500 rounded-[32rpx] flex items-center justify-center mb-[8rpx] active:bg-indigo-600 transition-colors">
        <text class="text-[28rpx] text-white font-bold">发送</text>
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "联系客服",
  },
}
</route>
