<template>
  <demo-page>
    <demo-section title="基础用法" desc="ui-index-bar 内承载 ui-index-anchor 锚点 + 列表项">
      <view class="anchor-demo">
        <ui-index-bar :indexs="['A', 'B', 'C']">
          <ui-index-anchor name="A" text="A" />
          <ui-cell title="阿里巴巴" />
          <ui-cell title="爱奇艺" />
          <ui-index-anchor name="B" text="B" />
          <ui-cell title="百度" />
          <ui-cell title="哔哩哔哩" />
          <ui-index-anchor name="C" text="C" />
          <ui-cell title="抖音" />
          <ui-cell title="携程" />
        </ui-index-bar>
      </view>
    </demo-section>

    <demo-section title="自定义颜色 / 字号 / 粗细" desc="color / fontSize / fontWeight + background">
      <view class="anchor-demo">
        <ui-index-bar :indexs="['hot', 'new']">
          <ui-index-anchor name="hot" text="🔥 热门" color="#ee0a24" font-size="28rpx" font-weight="600" background="#fff0f0" />
          <ui-cell title="微信" />
          <ui-cell title="支付宝" />
          <ui-index-anchor name="new" text="✨ 最新" color="#1989fa" font-size="28rpx" font-weight="600" background="#e8f4ff" />
          <ui-cell title="抖音" />
          <ui-cell title="快手" />
        </ui-index-bar>
      </view>
    </demo-section>

    <demo-section title="吸顶激活样式" desc="stickyColor / stickyFontSize / stickyFontWeight / stickyBackground">
      <view class="anchor-demo">
        <ui-index-bar :indexs="['A', 'B', 'C']">
          <ui-index-anchor v-for="g in stickyGroups" :key="g.name" :name="g.name" :text="g.name" sticky-color="#1989fa" sticky-font-size="32rpx" sticky-font-weight="700" sticky-background="#e8f4ff" />
        </ui-index-bar>
      </view>
      <text class="demo-tip">滚动列表，命中锚点切换吸顶样式</text>
    </demo-section>

    <demo-section title="自定义高度" desc="height 控制锚点条高度">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="h in heights" :key="h" size="small" :type="height === h ? 'primary' : 'default'" @click="height = h">{{ h }}</ui-button>
      </demo-block>
      <view class="anchor-demo" style="margin-top: 16rpx">
        <ui-index-bar :indexs="['1', '2', '3']">
          <ui-index-anchor name="1" text="第一组" :height="height" background="#f7f8fa" />
          <ui-cell title="项目 1-1" />
          <ui-index-anchor name="2" text="第二组" :height="height" background="#f7f8fa" />
          <ui-cell title="项目 2-1" />
          <ui-index-anchor name="3" text="第三组" :height="height" background="#f7f8fa" />
          <ui-cell title="项目 3-1" />
        </ui-index-bar>
      </view>
    </demo-section>

    <demo-section title="自定义内容（默认插槽）" desc="不用 text，直接通过 slot 自定义锚点内部">
      <view class="anchor-demo">
        <ui-index-bar :indexs="['A', 'B']">
          <ui-index-anchor name="A" background="#fff7e6">
            <view class="custom-anchor">
              <ui-icon name="star" color="#faad14" size="32rpx" />
              <text class="custom-anchor__text">推荐 (Recommended)</text>
            </view>
          </ui-index-anchor>
          <ui-cell title="苹果 Apple" />
          <ui-cell title="亚马逊 Amazon" />
          <ui-index-anchor name="B" background="#e6f7ff">
            <view class="custom-anchor">
              <ui-icon name="bell" color="#1989fa" size="32rpx" />
              <text class="custom-anchor__text">订阅 (Subscribed)</text>
            </view>
          </ui-index-anchor>
          <ui-cell title="百度 Baidu" />
          <ui-cell title="字节跳动 ByteDance" />
        </ui-index-bar>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "IndexAnchor 索引锚点" },
})

const heights = ["48rpx", "60rpx", "80rpx"]
const stickyGroups = [
  { name: "A", title: "苹果 Apple" },
  { name: "B", title: "百度 Baidu" },
  { name: "C", title: "抖音 Douyin" },
]

const height = ref("60rpx")
</script>

<style lang="scss" scoped>
.anchor-demo {
  border: 2rpx solid var(--ui-color-border-light);
  height: 600rpx;
  overflow: hidden;
  border-radius: var(--ui-radius-md);
}

.demo-tip {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 12rpx;
}

.custom-anchor {
  gap: 8rpx;
  display: flex;
  padding: 12rpx 24rpx;
  align-items: center;

  &__text {
    color: var(--ui-color-text);
    font-size: 26rpx;
    font-weight: 600;
  }
}
</style>
