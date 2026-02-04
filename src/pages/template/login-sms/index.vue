<template>
  <view class="flex min-h-screen flex-col bg-white px-[40rpx] pt-[160rpx]">
    <view class="mb-[80rpx]">
      <text class="block text-[48rpx] font-bold text-slate-900">验证码登录</text>
      <text class="mt-[12rpx] block text-[28rpx] text-slate-400">未注册手机号将自动创建账号</text>
    </view>

    <view class="space-y-[32rpx]">
      <view class="flex items-center rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <view class="mr-[24rpx] border-r border-slate-200 pr-[24rpx]">
          <text class="text-[30rpx] font-bold text-slate-700">+86</text>
        </view>
        <input class="flex-1 h-[48rpx] text-[32rpx] text-slate-900" type="number" placeholder="请输入手机号码" placeholder-style="color: #cbd5e1" />
      </view>

      <view class="flex items-center justify-between rounded-[24rpx] bg-slate-50 px-[32rpx] py-[28rpx]">
        <input class="flex-1 h-[48rpx] text-[32rpx] text-slate-900" type="number" placeholder="请输入验证码" placeholder-style="color: #cbd5e1" />
        <text class="ml-[24rpx] text-[28rpx] font-bold text-indigo-500">获取验证码</text>
      </view>
    </view>

    <view class="mt-[64rpx]">
      <button class="h-[96rpx] w-full rounded-[48rpx] bg-indigo-600 text-[32rpx] font-bold text-white flex items-center justify-center active:opacity-90">登录 / 注册</button>
    </view>

    <view class="mt-[40rpx] flex items-center justify-center">
      <view class="h-[32rpx] w-[32rpx] rounded-full border border-slate-300 mr-[12rpx]" />
      <text class="text-[24rpx] text-slate-400">我已阅读并同意 <text class="text-indigo-500">服务条款</text> 和 <text class="text-indigo-500">隐私政策</text></text>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "手机验证码登录",
  },
}
</route>
