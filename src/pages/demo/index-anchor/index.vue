<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="index-bar-demo">
          <ui-index-bar>
            <ui-index-anchor name="A" text="A" />
            <ui-cell title="阿里巴巴" />
            <ui-cell title="爱奇艺" />

            <ui-index-anchor name="B" text="B" />
            <ui-cell title="百度" />
            <ui-cell title="哔哩哔哩" />

            <ui-index-anchor name="C" text="C" />
            <ui-cell title="抖音" />
            <ui-cell title="滴滴出行" />
          </ui-index-bar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义锚点样式">
      <demo-block direction="column">
        <view class="index-bar-demo">
          <ui-index-bar>
            <ui-index-anchor name="hot" text="热门" color="#ff6b6b" font-size="28rpx" font-weight="600" background="#fff0f0" />
            <ui-cell title="微信" />
            <ui-cell title="支付宝" />

            <ui-index-anchor name="new" text="最新" color="#1989fa" font-size="28rpx" font-weight="600" background="#e8f4ff" />
            <ui-cell title="抖音" />
            <ui-cell title="快手" />
          </ui-index-bar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="吸顶样式">
      <demo-block direction="column">
        <view class="index-bar-demo">
          <ui-index-bar>
            <ui-index-anchor name="A" text="A" sticky-color="#1989fa" sticky-font-size="32rpx" sticky-font-weight="700" sticky-background="#e8f4ff" />
            <ui-cell title="苹果 Apple" />
            <ui-cell title="亚马逊 Amazon" />

            <ui-index-anchor name="B" text="B" sticky-color="#1989fa" sticky-font-size="32rpx" sticky-font-weight="700" sticky-background="#e8f4ff" />
            <ui-cell title="百度 Baidu" />
            <ui-cell title="字节跳动 ByteDance" />
          </ui-index-bar>
        </view>
        <ui-text size="small" color="secondary">滚动列表查看吸顶效果</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度">
      <demo-block direction="column">
        <view class="index-bar-demo-small">
          <ui-index-bar>
            <ui-index-anchor name="1" text="第一组" height="60rpx" />
            <ui-cell title="项目 1-1" />
            <ui-cell title="项目 1-2" />

            <ui-index-anchor name="2" text="第二组" height="60rpx" />
            <ui-cell title="项目 2-1" />
            <ui-cell title="项目 2-2" />
          </ui-index-bar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="IndexAnchor 属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="name" value="索引名称标识符" />
          <ui-cell title="text" value="显示的索引字符" />
          <ui-cell title="color" value="字符颜色" />
          <ui-cell title="height" value="锚点高度" />
          <ui-cell title="fontSize" value="字符大小" />
          <ui-cell title="fontWeight" value="字符粗细" />
          <ui-cell title="background" value="背景颜色" />
          <ui-cell title="stickyColor" value="吸顶时字符颜色" />
          <ui-cell title="stickyFontSize" value="吸顶时字符大小" />
          <ui-cell title="stickyBackground" value="吸顶时背景颜色" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "IndexAnchor 索引锚点" },
})
</script>

<style scoped lang="scss">
.index-bar-demo {
  border: 1px solid #eee;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
}

.index-bar-demo-small {
  border: 1px solid #eee;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
}
</style>
