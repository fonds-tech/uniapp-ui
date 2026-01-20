<template>
  <demo-page padding-x="0">
    <!-- 基础用法 -->
    <demo-section title="基础用法" :card="false">
      <ui-cell-group>
        <ui-cell title="标题" value="内容" />
        <ui-cell title="标题" value="内容" label="描述信息" />
      </ui-cell-group>
    </demo-section>

    <!-- 左侧图标 -->
    <demo-section title="左侧图标" :card="false">
      <ui-cell-group>
        <ui-cell title="默认图标" icon="setting" value="内容" />
        <ui-cell title="图标大小" icon="setting" :icon-size="24" value="icon-size=24" />
        <ui-cell title="图标颜色" icon="setting" icon-color="#1989fa" value="icon-color" />
        <ui-cell title="图标粗细" icon="setting" :icon-weight="600" value="icon-weight=600" />
        <ui-cell title="图标间距" icon="setting" icon-gap="16" value="icon-gap=16" />
      </ui-cell-group>
    </demo-section>

    <!-- 右侧内容样式 -->
    <demo-section title="右侧内容样式" :card="false">
      <ui-cell-group>
        <ui-cell title="默认样式" value="内容" />
        <ui-cell title="内容大小" value="value-size=16" :value-size="16" />
        <ui-cell title="内容颜色" value="value-color" value-color="#07c160" />
        <ui-cell title="内容粗细" value="value-weight=600" :value-weight="600" />
      </ui-cell-group>
    </demo-section>

    <!-- 链接与箭头 -->
    <demo-section title="链接与箭头" :card="false">
      <ui-cell-group>
        <ui-cell title="展示箭头" value="is-link" is-link />
      </ui-cell-group>
    </demo-section>

    <!-- 页面跳转 -->
    <demo-section title="页面跳转" :card="false">
      <ui-cell-group>
        <ui-cell title="默认跳转" value="navigateTo" is-link url="/pages/demo/button/index" />
        <ui-cell title="重定向" value="redirectTo" is-link url="/pages/demo/button/index" link-type="redirectTo" />
      </ui-cell-group>
    </demo-section>

    <!-- 标题样式 -->
    <demo-section title="标题样式" :card="false">
      <ui-cell-group>
        <ui-cell title="标题大小" title-size="18rpx" value="title-size=18rpx" />
        <ui-cell title="标题颜色" title-color="#1989fa" value="title-color" />
        <ui-cell title="标题粗细" title-weight="400" value="title-weight=400" />
      </ui-cell-group>
    </demo-section>

    <!-- 描述样式 -->
    <demo-section title="描述样式" :card="false">
      <ui-cell-group>
        <ui-cell title="默认描述" label="描述信息" value="内容" />
        <ui-cell title="描述大小" label="label-size=20" label-size="20" value="内容" />
        <ui-cell title="描述颜色" label="label-color" label-color="#ee0a24" value="内容" />
        <ui-cell title="描述粗细" label="label-weight=bold" label-weight="bold" value="内容" />
        <ui-cell title="描述间距" label="label-gap=12" label-gap="20" value="内容" />
      </ui-cell-group>
    </demo-section>

    <!-- 尺寸与间距 -->
    <demo-section title="尺寸与间距" :card="false">
      <ui-cell-group>
        <ui-cell title="自定义高度" value="height=120rpx" height="120rpx" />
        <ui-cell title="自定义内边距" value="padding=40rpx" padding="40rpx" />
      </ui-cell-group>
    </demo-section>

    <!-- 点击交互 -->
    <demo-section title="点击交互" :card="false">
      <ui-cell-group>
        <ui-cell title="无点击态" value="默认" />
        <ui-cell title="可点击" value="clickable" clickable @click="onCellClick" />
        <ui-cell title="链接模式" value="is-link 自带点击态" is-link @click="onCellClick" />
      </ui-cell-group>
    </demo-section>

    <!-- 插槽用法 -->
    <demo-section title="插槽用法" :card="false">
      <ui-cell-group>
        <ui-cell title="标题">
          <template #icon>
            <view class="custom-icon">🔥</view>
          </template>
        </ui-cell>
        <ui-cell>
          <template #title>
            <view class="custom-title">
              <text>自定义标题</text>
              <ui-tag type="primary" size="mini">标签</ui-tag>
            </view>
          </template>
        </ui-cell>
        <ui-cell title="自定义内容">
          <template #value>
            <ui-switch :model-value="true" size="32" />
          </template>
        </ui-cell>
        <ui-cell title="自定义右侧图标" is-link>
          <template #right-icon>
            <view class="custom-icon">🍎</view>
          </template>
        </ui-cell>
      </ui-cell-group>
    </demo-section>

    <demo-section title="自定义背景色" :card="false">
      <ui-cell-group background="#e6f7ff">
        <ui-cell title="标题" value="内容" />
        <ui-cell title="标题" value="内容" label="描述信息" />
      </ui-cell-group>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Cell 单元格" },
})

function onCellClick() {
  uni.showToast({ title: "点击了单元格", icon: "none" })
}
</script>

<style lang="scss" scoped>
.custom-icon {
  display: flex;
  align-items: center;
  margin-right: 8rpx;
}

.custom-title {
  gap: 8rpx;
  display: flex;
  align-items: center;
}
</style>
