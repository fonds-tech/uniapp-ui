<template>
  <view class="flex min-h-screen flex-col bg-white px-[40rpx] pt-[160rpx]">
    <view class="mb-[80rpx]">
      <text class="block text-[48rpx] font-bold text-slate-900">欢迎回来</text>
      <text class="mt-[12rpx] block text-[28rpx] text-slate-400">请使用账号密码登录</text>
    </view>

    <view class="space-y-[32rpx]">
      <view class="rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <text class="block text-[24rpx] text-slate-400 mb-[8rpx]">账号</text>
        <input class="h-[48rpx] w-full text-[32rpx] text-slate-900" placeholder="请输入用户名/手机号" placeholder-style="color: #cbd5e1" />
      </view>
      <view class="rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <text class="block text-[24rpx] text-slate-400 mb-[8rpx]">密码</text>
        <input class="h-[48rpx] w-full text-[32rpx] text-slate-900" password placeholder="请输入密码" placeholder-style="color: #cbd5e1" />
      </view>
    </view>

    <view class="mt-[32rpx] flex justify-end">
      <text class="text-[26rpx] text-indigo-500">忘记密码？</text>
    </view>

    <view class="mt-[64rpx]">
      <button class="h-[96rpx] w-full rounded-[48rpx] bg-indigo-600 text-[32rpx] font-bold text-white flex items-center justify-center active:opacity-90">登录</button>
    </view>

    <view class="mt-[40rpx] flex justify-center">
      <text class="text-[26rpx] text-slate-400">还没有账号？<text class="text-indigo-500">立即注册</text></text>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "账号密码登录",
  },
}
</route>
