<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-space>
          <ui-button type="primary">按钮1</ui-button>
          <ui-button type="primary">按钮2</ui-button>
          <ui-button type="primary">按钮3</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="垂直方向">
      <demo-block>
        <ui-space direction="vertical" fill>
          <ui-button type="primary" block>按钮1</ui-button>
          <ui-button type="success" block>按钮2</ui-button>
          <ui-button type="warning" block>按钮3</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="间距大小">
      <demo-block direction="column">
        <ui-space size="mini">
          <ui-button size="small">mini</ui-button>
          <ui-button size="small">间距</ui-button>
          <ui-button size="small">8rpx</ui-button>
        </ui-space>
        <ui-space size="small" class="mt-16">
          <ui-button size="small">small</ui-button>
          <ui-button size="small">间距</ui-button>
          <ui-button size="small">16rpx</ui-button>
        </ui-space>
        <ui-space size="normal" class="mt-16">
          <ui-button size="small">normal</ui-button>
          <ui-button size="small">间距</ui-button>
          <ui-button size="small">24rpx</ui-button>
        </ui-space>
        <ui-space size="large" class="mt-16">
          <ui-button size="small">large</ui-button>
          <ui-button size="small">间距</ui-button>
          <ui-button size="small">32rpx</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="自定义间距">
      <demo-block>
        <ui-space size="48rpx">
          <ui-button>48rpx</ui-button>
          <ui-button>间距</ui-button>
          <ui-button>按钮</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="自动换行">
      <demo-block direction="column">
        <ui-space wrap>
          <ui-button v-for="i in 10" :key="i" size="small">按钮{{ i }}</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="填充整行">
      <demo-block>
        <ui-space fill>
          <ui-button type="primary">按钮1</ui-button>
          <ui-button type="success">按钮2</ui-button>
          <ui-button type="warning">按钮3</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="对齐方式">
      <demo-block direction="column">
        <view class="demo-align-box">
          <ui-space align="start">
            <view class="demo-box" style="height: 80rpx">start</view>
            <view class="demo-box" style="height: 120rpx">对齐</view>
            <view class="demo-box" style="height: 60rpx">方式</view>
          </ui-space>
        </view>
        <view class="demo-align-box mt-16">
          <ui-space align="center">
            <view class="demo-box" style="height: 80rpx">center</view>
            <view class="demo-box" style="height: 120rpx">对齐</view>
            <view class="demo-box" style="height: 60rpx">方式</view>
          </ui-space>
        </view>
        <view class="demo-align-box mt-16">
          <ui-space align="end">
            <view class="demo-box" style="height: 80rpx">end</view>
            <view class="demo-box" style="height: 120rpx">对齐</view>
            <view class="demo-box" style="height: 60rpx">方式</view>
          </ui-space>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="主轴对齐">
      <demo-block direction="column">
        <view class="demo-justify-box">
          <ui-space justify="start">
            <ui-button size="small">start</ui-button>
            <ui-button size="small">对齐</ui-button>
          </ui-space>
        </view>
        <view class="demo-justify-box mt-16">
          <ui-space justify="center">
            <ui-button size="small">center</ui-button>
            <ui-button size="small">对齐</ui-button>
          </ui-space>
        </view>
        <view class="demo-justify-box mt-16">
          <ui-space justify="end">
            <ui-button size="small">end</ui-button>
            <ui-button size="small">对齐</ui-button>
          </ui-space>
        </view>
        <view class="demo-justify-box mt-16">
          <ui-space justify="space-between">
            <ui-button size="small">space</ui-button>
            <ui-button size="small">between</ui-button>
          </ui-space>
        </view>
        <view class="demo-justify-box mt-16">
          <ui-space justify="space-around">
            <ui-button size="small">space</ui-button>
            <ui-button size="small">around</ui-button>
          </ui-space>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="行列间距分离">
      <demo-block direction="column">
        <ui-space wrap gap-col="16rpx" gap-row="32rpx">
          <ui-button v-for="i in 8" :key="i" size="small" type="primary">按钮{{ i }}</ui-button>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="实用场景：表单布局">
      <demo-block>
        <ui-space direction="vertical" fill size="24rpx">
          <ui-input placeholder="请输入用户名" />
          <ui-input placeholder="请输入密码" type="password" />
          <ui-space size="16rpx">
            <ui-button type="default" style="flex: 1">取消</ui-button>
            <ui-button type="primary" style="flex: 1">登录</ui-button>
          </ui-space>
        </ui-space>
      </demo-block>
    </demo-section>

    <demo-section title="实用场景：标签组">
      <demo-block direction="column">
        <ui-space wrap size="small">
          <ui-tag type="primary">Vue</ui-tag>
          <ui-tag type="success">UniApp</ui-tag>
          <ui-tag type="warning">TypeScript</ui-tag>
          <ui-tag type="danger">SCSS</ui-tag>
          <ui-tag>JavaScript</ui-tag>
          <ui-tag type="primary">Node.js</ui-tag>
        </ui-space>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Space 间距" },
})
</script>

<style lang="scss" scoped>
.mt-16 {
  margin-top: 16rpx;
}

.demo-align-box {
  padding: 16rpx;
  background: var(--ui-color-background-light);
  border-radius: 8rpx;
}

.demo-justify-box {
  padding: 16rpx;
  background: var(--ui-color-background-light);
  border-radius: 8rpx;
}

.demo-box {
  color: #fff;
  display: flex;
  padding: 0 24rpx;
  font-size: 24rpx;
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 8rpx;
  justify-content: center;
}
</style>
