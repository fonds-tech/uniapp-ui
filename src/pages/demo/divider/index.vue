<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <text class="demo-text">默认分割线用于分隔内容区块</text>
        <ui-divider />
        <text class="demo-text">下方内容区块</text>
      </demo-block>
    </demo-section>

    <demo-section title="展示文字">
      <demo-block direction="column">
        <text class="demo-text">上方内容</text>
        <ui-divider>文字内容</ui-divider>
        <text class="demo-text">下方内容</text>
      </demo-block>
    </demo-section>

    <demo-section title="内容位置">
      <demo-block direction="column">
        <ui-divider content-position="left">左侧内容</ui-divider>
        <ui-divider content-position="center">居中内容</ui-divider>
        <ui-divider content-position="right">右侧内容</ui-divider>
      </demo-block>
    </demo-section>

    <demo-section title="虚线">
      <demo-block direction="column">
        <ui-divider dashed />
        <ui-divider dashed>虚线分割</ui-divider>
      </demo-block>
    </demo-section>

    <demo-section title="线条类型">
      <demo-block direction="column">
        <ui-divider type="solid">实线 solid</ui-divider>
        <ui-divider type="dashed">虚线 dashed</ui-divider>
        <ui-divider type="dotted">点线 dotted</ui-divider>
      </demo-block>
    </demo-section>

    <demo-section title="垂直分割线">
      <demo-block align="center">
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" />
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" />
        <text class="demo-text">文本</text>
      </demo-block>
      <demo-block align="center" class="mt-16">
        <ui-button type="primary" size="small">按钮</ui-button>
        <ui-divider direction="vertical" />
        <ui-button type="success" size="small">按钮</ui-button>
        <ui-divider direction="vertical" />
        <ui-button type="warning" size="small">按钮</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="细线">
      <demo-block direction="column">
        <ui-divider>默认线条</ui-divider>
        <ui-divider hairline>细线 hairline</ui-divider>
      </demo-block>
      <demo-block align="center" class="mt-16">
        <text class="demo-text">默认</text>
        <ui-divider direction="vertical" />
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" hairline />
        <text class="demo-text">细线</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-divider border-color="primary">主题色</ui-divider>
        <ui-divider border-color="success">成功色</ui-divider>
        <ui-divider border-color="warning">警告色</ui-divider>
        <ui-divider border-color="danger">危险色</ui-divider>
        <ui-divider border-color="#7232dd">自定义紫色</ui-divider>
      </demo-block>
      <demo-block align="center" class="mt-16">
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" border-color="primary" />
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" border-color="danger" />
        <text class="demo-text">文本</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义间距">
      <demo-block direction="column">
        <text class="demo-text">上方内容</text>
        <ui-divider margin="48rpx 0">大间距</ui-divider>
        <text class="demo-text">中间内容</text>
        <ui-divider margin="8rpx 0">小间距</ui-divider>
        <text class="demo-text">下方内容</text>
      </demo-block>
      <demo-block align="center" class="mt-16">
        <text class="demo-text">文本</text>
        <ui-divider direction="vertical" margin="0 32rpx" />
        <text class="demo-text">大间距</text>
        <ui-divider direction="vertical" margin="0 8rpx" />
        <text class="demo-text">小间距</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <ui-divider
          dashed
          border-color="primary"
          :custom-style="{ opacity: 0.6 }"
        >
          组合样式
        </ui-divider>
        <ui-divider
          custom-class="custom-divider"
          border-color="#ff6b6b"
        >
          自定义类名
        </ui-divider>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Divider 分割线" },
})
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
}

.mt-16 {
  margin-top: 16rpx;
}

:deep(.custom-divider) {
  .ui-divider__content {
    color: #ff6b6b;
    font-weight: 600;
  }
}
</style>
