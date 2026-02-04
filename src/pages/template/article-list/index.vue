<template>
  <view class="min-h-screen bg-white">
    <view class="flex flex-col">
      <view v-for="i in 5" :key="i" class="flex border-b border-slate-100 p-[32rpx] active:bg-slate-50">
        <view class="flex-1 mr-[24rpx]">
          <text class="line-clamp-2 text-[32rpx] font-bold text-slate-800 leading-snug">2024年最值得期待的科技产品发布会前瞻，AI将重塑生活</text>
          <view class="mt-[24rpx] flex items-center text-[24rpx] text-slate-400">
            <text class="text-indigo-500 mr-[16rpx]">科技前沿</text>
            <text class="mr-[16rpx]">3小时前</text>
            <text>2.3k阅读</text>
          </view>
        </view>
        <view class="h-[160rpx] w-[220rpx] flex-none rounded-[12rpx] bg-slate-200" />
      </view>
    </view>
  </view>
</template>

<route lang="json5">
{
  style: {
    navigationBarTitleText: "资讯列表",
  },
}
</route>
