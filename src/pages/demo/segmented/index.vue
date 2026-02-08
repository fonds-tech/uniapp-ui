<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-segmented v-model="basic" :options="basicOptions" block />
      <text class="demo-tip">当前选中: {{ basic }}</text>
    </demo-section>

    <demo-section title="样式类型">
      <view class="demo-col">
        <view class="demo-item">
          <text class="demo-label">filled</text>
          <ui-segmented v-model="type1" :options="typeOptions" type="filled" block />
        </view>
        <view class="demo-item">
          <text class="demo-label">outline</text>
          <ui-segmented v-model="type2" :options="typeOptions" type="outline" block />
        </view>
        <view class="demo-item">
          <text class="demo-label">block</text>
          <ui-segmented v-model="type3" :options="typeOptions" type="block" block />
        </view>
      </view>
    </demo-section>

    <demo-section title="自定义尺寸">
      <view class="demo-col">
        <view class="demo-item">
          <text class="demo-label">小尺寸 height="48rpx"</text>
          <ui-segmented v-model="size1" :options="sizeOptions" height="48rpx" font-size="24rpx" block />
        </view>
        <view class="demo-item">
          <text class="demo-label">默认尺寸</text>
          <ui-segmented v-model="size2" :options="sizeOptions" block />
        </view>
        <view class="demo-item">
          <text class="demo-label">大尺寸 height="72rpx"</text>
          <ui-segmented v-model="size3" :options="sizeOptions" height="72rpx" font-size="32rpx" block />
        </view>
      </view>
    </demo-section>

    <demo-section title="带图标">
      <ui-segmented v-model="iconValue" :options="iconOptions" block />
    </demo-section>

    <demo-section title="自定义颜色">
      <ui-segmented v-model="custom" :options="typeOptions" active-color="#6366F1" active-text-color="#fff" block />
    </demo-section>

    <demo-section title="滚动模式">
      <ui-segmented v-model="scrollValue" :options="scrollOptions" scrollable />
    </demo-section>

    <demo-section title="禁用状态">
      <view class="demo-col">
        <ui-segmented v-model="disabled1" :options="basicOptions" disabled block />
        <ui-segmented v-model="disabled2" :options="disabledOptions" block />
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SegmentedOption } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Segmented 分段控制器" },
})

const basic = ref("daily")
const type1 = ref("a")
const type2 = ref("a")
const type3 = ref("a")
const size1 = ref(1)
const size2 = ref(1)
const size3 = ref(1)
const block = ref("daily")
const iconValue = ref("list")
const custom = ref("a")
const disabled1 = ref("daily")
const disabled2 = ref("weekly")

const basicOptions: SegmentedOption[] = [
  { label: "日", value: "daily" },
  { label: "周", value: "weekly" },
  { label: "月", value: "monthly" },
]

const typeOptions: SegmentedOption[] = [
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
]

const sizeOptions: SegmentedOption[] = [
  { label: "A", value: 1 },
  { label: "B", value: 2 },
  { label: "C", value: 3 },
]

const scrollValue = ref("option1")
const scrollOptions: SegmentedOption[] = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
  { label: "选项五", value: "option5" },
  { label: "选项六", value: "option6" },
  { label: "选项七", value: "option7" },
  { label: "选项八", value: "option8" },
]

const iconOptions: SegmentedOption[] = [
  { label: "列表", value: "list", icon: "list" },
  { label: "网格", value: "grid", icon: "grid" },
  { label: "卡片", value: "card", icon: "card" },
]

const disabledOptions: SegmentedOption[] = [
  { label: "日", value: "daily" },
  { label: "周", value: "weekly" },
  { label: "月", value: "monthly", disabled: true },
]
</script>

<style lang="scss" scoped>
.demo-col {
  gap: 24rpx;
  display: flex;
  flex-direction: column;
}

.demo-item {
  gap: 8rpx;
  display: flex;
  flex-direction: column;
}

.demo-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.demo-tip {
  color: var(--ui-color-text-tertiary);
  display: block;
  font-size: var(--ui-font-size-xs);
  margin-top: 16rpx;
}
</style>
