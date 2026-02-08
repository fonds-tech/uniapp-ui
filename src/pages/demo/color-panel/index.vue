<template>
  <view class="demo-page">
    <ui-cell-group title="基础用法">
      <view class="demo-panel">
        <ui-color-panel v-model="color1" />
      </view>
      <ui-cell title="当前值">
        <template #value>
          <text>{{ color1 }}</text>
        </template>
      </ui-cell>
    </ui-cell-group>

    <ui-cell-group title="隐藏输入框">
      <view class="demo-panel">
        <ui-color-panel v-model="color2" :show-input="false" />
      </view>
    </ui-cell-group>

    <ui-cell-group title="隐藏预设色板">
      <view class="demo-panel">
        <ui-color-panel v-model="color3" :show-presets="false" />
      </view>
    </ui-cell-group>

    <ui-cell-group title="自定义列数">
      <view class="demo-panel">
        <ui-color-panel v-model="color4" :columns="8" />
      </view>
    </ui-cell-group>

    <ui-cell-group title="自定义面板高度">
      <view class="demo-panel">
        <ui-color-panel v-model="color5" panel-height="200rpx" />
      </view>
    </ui-cell-group>

    <ui-cell-group title="禁用状态">
      <view class="demo-panel">
        <ui-color-panel v-model="color6" disabled />
      </view>
    </ui-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const color1 = ref("#6366F1")
const color2 = ref("#10B981")
const color3 = ref("#F59E0B")
const color4 = ref("#EF4444")
const color5 = ref("#8B5CF6")
const color6 = ref("#3B82F6")
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 20rpx;
}

.demo-panel {
  padding: 20rpx;
}
</style>
