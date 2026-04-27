<template>
  <demo-page>
    <demo-section title="基础用法" desc="span 控制 24 栅格占比">
      <ui-row>
        <ui-col :span="24"><view class="block">span=24</view></ui-col>
      </ui-row>
      <ui-row>
        <ui-col :span="12"><view class="block">12</view></ui-col>
        <ui-col :span="12"><view class="block alt">12</view></ui-col>
      </ui-row>
      <ui-row>
        <ui-col :span="8"><view class="block">8</view></ui-col>
        <ui-col :span="8"><view class="block alt">8</view></ui-col>
        <ui-col :span="8"><view class="block">8</view></ui-col>
      </ui-row>
      <ui-row>
        <ui-col :span="6"><view class="block">6</view></ui-col>
        <ui-col :span="6"><view class="block alt">6</view></ui-col>
        <ui-col :span="6"><view class="block">6</view></ui-col>
        <ui-col :span="6"><view class="block alt">6</view></ui-col>
      </ui-row>
    </demo-section>

    <demo-section title="间距" desc="gap 统一 / colGap+rowGap 单独控制">
      <ui-text size="small" color="secondary" class="mb-8">gap=20rpx</ui-text>
      <ui-row gap="20rpx">
        <ui-col :span="8"><view class="block">8</view></ui-col>
        <ui-col :span="8"><view class="block alt">8</view></ui-col>
        <ui-col :span="8"><view class="block">8</view></ui-col>
      </ui-row>
      <ui-text size="small" color="secondary" class="mb-8 mt-16">colGap=24rpx + rowGap=12rpx</ui-text>
      <ui-row col-gap="24rpx" row-gap="12rpx">
        <ui-col :span="6"><view class="block">6</view></ui-col>
        <ui-col :span="6"><view class="block alt">6</view></ui-col>
        <ui-col :span="6"><view class="block">6</view></ui-col>
        <ui-col :span="6"><view class="block alt">6</view></ui-col>
        <ui-col :span="12"><view class="block">12</view></ui-col>
        <ui-col :span="12"><view class="block alt">12</view></ui-col>
      </ui-row>
    </demo-section>

    <demo-section title="偏移" desc="offset 控制左侧空格数">
      <ui-row gap="20rpx">
        <ui-col :span="6" :offset="6"><view class="block">span=6 offset=6</view></ui-col>
        <ui-col :span="6" :offset="6"><view class="block alt">span=6 offset=6</view></ui-col>
      </ui-row>
      <ui-row gap="20rpx">
        <ui-col :span="12" :offset="12"><view class="block">span=12 offset=12</view></ui-col>
      </ui-row>
    </demo-section>

    <demo-section title="水平对齐" desc="justify=start / center / end / between / around">
      <view v-for="j in justifyList" :key="j" class="row-block">
        <ui-text size="small" color="secondary" class="mb-8">justify={{ j }}</ui-text>
        <ui-row :justify="j" gap="20rpx">
          <ui-col :span="4"><view class="block">4</view></ui-col>
          <ui-col :span="4"><view class="block alt">4</view></ui-col>
          <ui-col :span="4"><view class="block">4</view></ui-col>
        </ui-row>
      </view>
    </demo-section>

    <demo-section title="垂直对齐" desc="align=start / center / end / stretch / baseline">
      <view v-for="a in alignList" :key="a" class="row-block">
        <ui-text size="small" color="secondary" class="mb-8">align={{ a }}</ui-text>
        <ui-row :align="a" gap="20rpx" class="align-row">
          <ui-col :span="8"><view class="block">短</view></ui-col>
          <ui-col :span="8"><view class="block alt tall">高一倍</view></ui-col>
          <ui-col :span="8"><view class="block">短</view></ui-col>
        </ui-row>
      </view>
    </demo-section>

    <demo-section title="不换行" desc="wrap=false 时溢出由 flex 内部分摊">
      <ui-row :wrap="false" gap="20rpx">
        <ui-col :span="8"><view class="block">8</view></ui-col>
        <ui-col :span="8"><view class="block alt">8</view></ui-col>
        <ui-col :span="8"><view class="block">8</view></ui-col>
        <ui-col :span="8"><view class="block alt">8（超出）</view></ui-col>
      </ui-row>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Row/Col 栅格布局" },
})

const justifyList = ["start", "center", "end", "between", "around"] as const
const alignList = ["start", "center", "end", "stretch"] as const
</script>

<style lang="scss" scoped>
.block {
  color: #fff;
  height: 60rpx;
  display: flex;
  font-size: 24rpx;
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;

  &.alt {
    background: #6366f1;
  }

  &.tall {
    height: 120rpx;
  }
}

.row-block {
  margin-bottom: 24rpx;
}

.align-row {
  height: 160rpx;
  background: var(--ui-color-background-section);
}

.mb-8 {
  margin-bottom: 8rpx;
}

.mt-16 {
  margin-top: 16rpx;
}
</style>
