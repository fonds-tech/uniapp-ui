<template>
  <view class="min-h-screen bg-[#F6F7F9] p-[32rpx]">
    <view class="mb-[32rpx]">
      <text class="text-[32rpx] font-bold text-slate-800 mb-[24rpx] block">问题类型</text>
      <view class="flex flex-wrap gap-[24rpx]">
        <view class="px-[32rpx] py-[16rpx] rounded-[32rpx] bg-indigo-50 border border-indigo-200 text-[26rpx] text-indigo-600 font-medium">功能异常</view>
        <view class="px-[32rpx] py-[16rpx] rounded-[32rpx] bg-white border border-slate-200 text-[26rpx] text-slate-600">体验优化</view>
        <view class="px-[32rpx] py-[16rpx] rounded-[32rpx] bg-white border border-slate-200 text-[26rpx] text-slate-600">新功能建议</view>
        <view class="px-[32rpx] py-[16rpx] rounded-[32rpx] bg-white border border-slate-200 text-[26rpx] text-slate-600">其他</view>
      </view>
    </view>

    <view class="mb-[32rpx]">
      <text class="text-[32rpx] font-bold text-slate-800 mb-[24rpx] block">问题描述</text>
      <view class="bg-white rounded-[24rpx] p-[24rpx] shadow-sm">
        <textarea class="w-full h-[240rpx] text-[30rpx] text-slate-800 leading-relaxed" placeholder="请详细描述您遇到的问题或建议，以便我们更好地为您解决..." placeholder-style="color: #cbd5e1" maxlength="500" />
        <view class="text-right text-[24rpx] text-slate-400 mt-[16rpx]">0/500</view>
      </view>
    </view>

    <view class="mb-[48rpx]">
      <text class="text-[32rpx] font-bold text-slate-800 mb-[24rpx] block">图片上传 <text class="text-[24rpx] font-normal text-slate-400">(选填，最多4张)</text></text>
      <view class="flex flex-wrap gap-[24rpx]">
        <view class="h-[160rpx] w-[160rpx] bg-slate-100 rounded-[16rpx] flex flex-col items-center justify-center text-slate-400 active:bg-slate-200">
          <view class="i-lucide-camera text-[48rpx] mb-[8rpx]" />
          <text class="text-[24rpx]">上传图片</text>
        </view>
      </view>
    </view>

    <view class="mb-[32rpx]">
      <text class="text-[32rpx] font-bold text-slate-800 mb-[24rpx] block">联系方式 <text class="text-[24rpx] font-normal text-slate-400">(选填)</text></text>
      <view class="bg-white rounded-[24rpx] px-[32rpx] py-[28rpx] shadow-sm">
        <input class="h-[48rpx] w-full text-[30rpx] text-slate-900" placeholder="请输入手机号/邮箱/微信号" placeholder-style="color: #cbd5e1" />
      </view>
    </view>

    <view class="mt-[64rpx]">
      <button class="h-[96rpx] w-full rounded-[48rpx] bg-indigo-600 text-[32rpx] font-bold text-white flex items-center justify-center active:opacity-90 shadow-lg shadow-indigo-200">提交反馈</button>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "意见反馈",
  },
}
</route>
