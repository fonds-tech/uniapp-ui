<template>
  <demo-page>
    <demo-section title="基础用法" desc="不传 icon 时使用内置默认插画">
      <ui-empty padding="32rpx 0" />
    </demo-section>

    <demo-section title="ui-icon 模式" desc="icon 不含 / 或 . 时按图标名渲染 ui-icon">
      <ui-empty icon="search" icon-size="120rpx" icon-color="#bbb" text="暂无搜索结果" padding="32rpx 0" />
    </demo-section>

    <demo-section title="image 模式" desc="icon 含 / 或 . 时按图片 URL 渲染">
      <ui-empty icon="https://img01.yzcdn.cn/vant/empty-image-default.png" icon-size="200rpx" text="自定义插画" padding="32rpx 0" />
    </demo-section>

    <demo-section title="底部操作" desc="footer 插槽承载主操作（重试、跳转等）">
      <ui-empty icon="wifi-off" icon-size="140rpx" icon-color="#bbb" text="网络连接异常" padding="32rpx 0">
        <template #footer>
          <ui-button type="primary" size="small">重新加载</ui-button>
        </template>
      </ui-empty>
    </demo-section>

    <demo-section title="自定义颜色" desc="textColor / iconColor 单独配色">
      <ui-empty icon="cart" icon-size="140rpx" icon-color="primary" text="购物车是空的" text-color="primary" :text-weight="600" padding="32rpx 0">
        <template #footer>
          <ui-button type="primary" size="small">去逛逛</ui-button>
        </template>
      </ui-empty>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Empty 空状态" },
})
</script>
