<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-badge :value="5">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="10">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge value="new">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="最大值">
      <demo-block>
        <ui-badge :value="20" :max="9">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="50" :max="20">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="200" :max="99">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="圆点徽标">
      <demo-block>
        <ui-badge dot>
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot color="success">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot color="warning">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block>
        <ui-badge :value="5" color="primary">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="10" color="success">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="15" color="warning">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="20" color="#8B5CF6">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="定位位置">
      <demo-block>
        <ui-badge :value="1" position="top-left">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="2" position="top-right">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="3" position="bottom-left">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="4" position="bottom-right">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="自定义偏移">
      <demo-block>
        <ui-badge :value="8" :offset="[-10, -10]">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="8" :offset="[0, 0]">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="8" :offset="[10, 10]">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="独立展示">
      <demo-block>
        <ui-badge :value="99" />
        <ui-badge value="Hot" color="error" />
        <ui-badge value="New" color="primary" />
      </demo-block>
    </demo-section>

    <demo-section title="显示零值" desc="左侧隐藏零值，右侧显示零值">
      <demo-block>
        <ui-badge :value="0">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="0" show-zero>
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Badge 徽标" },
})
</script>

<style lang="scss" scoped>
.badge-box {
  width: 80rpx;
  height: 80rpx;
  background: var(--ui-color-background-dark);
  border-radius: var(--ui-radius-md);
}
</style>
