<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="empty-block">
        <ui-empty />
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block class="empty-block">
        <ui-empty icon="search" text="暂无搜索结果" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block class="empty-block">
        <ui-empty icon="wifi-off" text="网络异常" icon-size="120rpx" icon-color="#999" text-color="#666" />
      </demo-block>
    </demo-section>

    <demo-section title="底部插槽">
      <demo-block class="empty-block">
        <ui-empty icon="cart" text="购物车是空的">
          <template #footer>
            <ui-button type="primary" size="small">去购物</ui-button>
          </template>
        </ui-empty>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Empty 空状态" },
})
</script>

<style lang="scss" scoped>
.empty-block {
  padding: 40rpx 0;
}
</style>
