<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" class="tabbar-wrap">
        <ui-tabbar v-model="active1" :fixed="false" :safe-area="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="徽标提示">
      <demo-block direction="column" class="tabbar-wrap">
        <ui-tabbar v-model="active2" :fixed="false" :safe-area="false">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" dot />
          <ui-tabbar-item icon="message" text="消息" badge="5" />
          <ui-tabbar-item icon="person" text="我的" badge="99+" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" class="tabbar-wrap">
        <ui-tabbar v-model="active3" :fixed="false" :safe-area="false" active-color="#07c160" inactive-color="#969799">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="切换事件">
      <demo-block direction="column" class="tabbar-wrap">
        <ui-tabbar v-model="active4" :fixed="false" :safe-area="false" @change="onChange">
          <ui-tabbar-item icon="home" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="heart" text="收藏" />
          <ui-tabbar-item icon="person" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Tabbar 标签栏" },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

function onChange(index: number) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>

<style lang="scss" scoped>
.tabbar-wrap {
  border: 1rpx solid var(--ui-color-border-light);
  overflow: hidden;
  border-radius: 12rpx;
}
</style>
