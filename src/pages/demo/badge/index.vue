<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="4" :gap="32">
        <ui-badge :value="5">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="10">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="99">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge value="new">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="最大值">
      <demo-block :cols="4" :gap="32">
        <ui-badge :value="20" :max="9">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="50" :max="20">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="100" :max="99">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="999" :max="99">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="圆点徽标">
      <demo-block :cols="4" :gap="32">
        <ui-badge dot>
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot color="primary">
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

    <demo-section title="自定义圆点大小">
      <demo-block :cols="4" :gap="32">
        <ui-badge dot dot-size="12rpx">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot dot-size="16rpx">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot dot-size="20rpx">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge dot dot-size="24rpx">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="图标徽标">
      <demo-block :cols="4" :gap="32">
        <ui-badge icon="check">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge icon="close" color="danger">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge icon="star" color="warning">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge icon="heart" color="#8B5CF6">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="4" :gap="32">
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
      <demo-block :cols="4" :gap="32">
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
      <demo-block :cols="4" :gap="32">
        <ui-badge :value="1" :offset="[-10, -10]">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="2" :offset="[0, 0]">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="3" :offset="[10, 10]">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="4" :offset="[5, -5]">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block :cols="4" :gap="32">
        <ui-badge :value="6" height="40rpx" radius="8rpx">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="88" height="44rpx" radius="0">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="VIP" value-size="20rpx" value-color="#FFD700" color="#1a1a1a">
          <view class="badge-box" />
        </ui-badge>
        <ui-badge :value="Pro" value-size="18rpx" :value-weight="600" color="linear-gradient(135deg, #667eea, #764ba2)">
          <view class="badge-box" />
        </ui-badge>
      </demo-block>
    </demo-section>

    <demo-section title="独立展示">
      <demo-block :cols="4" :gap="32">
        <ui-badge :value="99" />
        <ui-badge value="Hot" color="danger" />
        <ui-badge value="New" color="primary" />
        <ui-badge value="Sale" color="warning" />
      </demo-block>
    </demo-section>

    <demo-section title="显示零值" desc="左侧隐藏零值，右侧显示零值">
      <demo-block :cols="4" :gap="32">
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

const VIP = "VIP"
const Pro = "Pro"
</script>

<style lang="scss" scoped>
.badge-box {
  width: 80rpx;
  height: 80rpx;
  background: var(--ui-color-background-dark);
  border-radius: var(--ui-radius-md);
}
</style>
