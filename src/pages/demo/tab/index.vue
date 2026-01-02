<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-tabs v-model="activeTab1">
          <ui-tab title="标签一" name="1">
            <view class="tab-content">标签一的内容</view>
          </ui-tab>
          <ui-tab title="标签二" name="2">
            <view class="tab-content">标签二的内容</view>
          </ui-tab>
          <ui-tab title="标签三" name="3">
            <view class="tab-content">标签三的内容</view>
          </ui-tab>
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="使用 name 属性">
      <demo-block direction="column">
        <ui-tabs v-model="activeTab2">
          <ui-tab title="首页" name="home">
            <view class="tab-content">首页内容</view>
          </ui-tab>
          <ui-tab title="分类" name="category">
            <view class="tab-content">分类内容</view>
          </ui-tab>
          <ui-tab title="购物车" name="cart">
            <view class="tab-content">购物车内容</view>
          </ui-tab>
          <ui-tab title="我的" name="profile">
            <view class="tab-content">个人中心内容</view>
          </ui-tab>
        </ui-tabs>
        <ui-text size="small" color="secondary">当前激活：{{ activeTab2 }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用标签">
      <demo-block direction="column">
        <ui-tabs v-model="activeTab3">
          <ui-tab title="可用" name="1">
            <view class="tab-content">可用标签内容</view>
          </ui-tab>
          <ui-tab title="禁用" name="2" disabled>
            <view class="tab-content">禁用标签内容</view>
          </ui-tab>
          <ui-tab title="可用" name="3">
            <view class="tab-content">可用标签内容</view>
          </ui-tab>
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="多个标签滚动">
      <demo-block direction="column">
        <ui-tabs v-model="activeTab4">
          <ui-tab v-for="i in 8" :key="i" :title="`标签 ${i}`" :name="String(i)">
            <view class="tab-content">标签 {{ i }} 的内容</view>
          </ui-tab>
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="自定义标签内容">
      <demo-block direction="column">
        <ui-tabs v-model="activeTab5">
          <ui-tab name="hot">
            <template #title>
              <view class="custom-title">
                <ui-icon name="fire" color="#ff6b6b" />
                <text>热门</text>
              </view>
            </template>
            <view class="tab-content">热门内容</view>
          </ui-tab>
          <ui-tab name="new">
            <template #title>
              <view class="custom-title">
                <ui-icon name="star" color="#ffd43b" />
                <text>最新</text>
              </view>
            </template>
            <view class="tab-content">最新内容</view>
          </ui-tab>
          <ui-tab name="recommend">
            <template #title>
              <view class="custom-title">
                <ui-icon name="like" color="#1989fa" />
                <text>推荐</text>
              </view>
            </template>
            <view class="tab-content">推荐内容</view>
          </ui-tab>
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="Tab 组件属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="title" value="标签页标题" />
          <ui-cell title="name" value="标签标识符" />
          <ui-cell title="disabled" value="是否禁用" />
          <ui-cell title="customClass" value="自定义类名" />
          <ui-cell title="customStyle" value="自定义样式" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Tab 标签页子项" },
})

const activeTab1 = ref('1')
const activeTab2 = ref('home')
const activeTab3 = ref('1')
const activeTab4 = ref('1')
const activeTab5 = ref('hot')
</script>

<style scoped lang="scss">
.tab-content {
  padding: 24px;
  text-align: center;
  color: #666;
}

.custom-title {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
