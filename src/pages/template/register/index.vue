<template>
  <view class="min-h-screen bg-white px-[40rpx] pt-[80rpx]">
    <view class="mb-[60rpx]">
      <text class="block text-[48rpx] font-bold text-slate-900">注册新账号</text>
      <text class="mt-[12rpx] block text-[28rpx] text-slate-400">开启您的精彩之旅</text>
    </view>

    <view class="space-y-[32rpx]">
      <view class="rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <text class="block text-[24rpx] text-slate-400 mb-[8rpx]">手机号</text>
        <input class="h-[48rpx] w-full text-[32rpx] text-slate-900" type="number" placeholder="请输入手机号码" placeholder-style="color: #cbd5e1" />
      </view>

      <view class="flex items-center justify-between rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <input class="flex-1 h-[48rpx] text-[32rpx] text-slate-900" type="number" placeholder="验证码" placeholder-style="color: #cbd5e1" />
        <text class="ml-[24rpx] text-[28rpx] font-bold text-indigo-500">获取验证码</text>
      </view>

      <view class="rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <text class="block text-[24rpx] text-slate-400 mb-[8rpx]">密码</text>
        <input class="h-[48rpx] w-full text-[32rpx] text-slate-900" password placeholder="设置6-20位登录密码" placeholder-style="color: #cbd5e1" />
      </view>
    </view>

    <view class="mt-[64rpx]">
      <button class="h-[96rpx] w-full rounded-[48rpx] bg-indigo-600 text-[32rpx] font-bold text-white flex items-center justify-center active:opacity-90">注册</button>
    </view>

    <view class="mt-[40rpx] flex items-center justify-center">
      <view class="h-[32rpx] w-[32rpx] rounded-full border border-slate-300 mr-[12rpx] flex items-center justify-center">
        <view class="h-[16rpx] w-[16rpx] rounded-full bg-indigo-500" />
      </view>
      <text class="text-[24rpx] text-slate-400">我已阅读并同意 <text class="text-indigo-500">服务条款</text></text>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "注册",
  },
}
</route>
