<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block">
        <ui-upload v-model="fileList1" />
      </view>
    </view>

    <!-- 多选上传 -->
    <view class="demo-section">
      <text class="section-title">多选上传</text>
      <view class="demo-block">
        <ui-upload v-model="fileList2" multiple />
      </view>
    </view>

    <!-- 限制数量 -->
    <view class="demo-section">
      <text class="section-title">限制数量 (最多3张)</text>
      <view class="demo-block">
        <ui-upload v-model="fileList3" :max-count="3" multiple />
      </view>
    </view>

    <!-- 限制大小 -->
    <view class="demo-section">
      <text class="section-title">限制大小 (最大1MB)</text>
      <view class="demo-block">
        <ui-upload v-model="fileList4" :max-size="1024 * 1024" @oversize="onOversize" />
      </view>
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <text class="section-title">禁用状态</text>
      <view class="demo-block">
        <ui-upload v-model="fileList5" disabled />
      </view>
    </view>

    <!-- 自定义尺寸 -->
    <view class="demo-section">
      <text class="section-title">自定义尺寸</text>
      <view class="demo-block">
        <ui-upload v-model="fileList6" width="200rpx" height="200rpx" />
      </view>
    </view>

    <!-- 预览功能 -->
    <view class="demo-section">
      <text class="section-title">开启预览</text>
      <view class="demo-block">
        <ui-upload v-model="fileList7" preview />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Upload 上传" },
})

const fileList1 = ref<string[]>([])
const fileList2 = ref<string[]>([])
const fileList3 = ref<string[]>([])
const fileList4 = ref<string[]>([])
const fileList5 = ref<string[]>(["https://picsum.photos/200"])
const fileList6 = ref<string[]>([])
const fileList7 = ref<string[]>([])

function onOversize() {
  uni.showToast({ title: "文件大小超过限制", icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;
</style>
