<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="sidebar-demo">
          <ui-sidebar v-model="active1">
            <ui-sidebar-item title="分类一" name="1" />
            <ui-sidebar-item title="分类二" name="2" />
            <ui-sidebar-item title="分类三" name="3" />
            <ui-sidebar-item title="分类四" name="4" />
          </ui-sidebar>
        </view>
        <ui-text size="small" color="secondary">当前选中：{{ active1 }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block direction="column">
        <view class="sidebar-demo">
          <ui-sidebar v-model="active2">
            <ui-sidebar-item title="可用" name="1" />
            <ui-sidebar-item title="禁用" name="2" disabled />
            <ui-sidebar-item title="可用" name="3" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度">
      <demo-block direction="column">
        <view class="sidebar-demo">
          <ui-sidebar v-model="active3">
            <ui-sidebar-item title="选项一" name="1" height="100rpx" />
            <ui-sidebar-item title="选项二" name="2" height="100rpx" />
            <ui-sidebar-item title="选项三" name="3" height="100rpx" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column">
        <view class="sidebar-demo">
          <ui-sidebar v-model="active4">
            <ui-sidebar-item 
              title="热门" 
              name="1" 
              title-color="#666"
              active-title-color="#1989fa"
              active-background="#e8f4ff"
            />
            <ui-sidebar-item 
              title="推荐" 
              name="2"
              title-color="#666"
              active-title-color="#07c160"
              active-background="#e8fff0"
            />
            <ui-sidebar-item 
              title="新品" 
              name="3"
              title-color="#666"
              active-title-color="#ff6b6b"
              active-background="#fff0f0"
            />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义字体">
      <demo-block direction="column">
        <view class="sidebar-demo">
          <ui-sidebar v-model="active5">
            <ui-sidebar-item 
              title="大字体" 
              name="1" 
              title-size="32rpx"
              active-title-size="34rpx"
              active-title-weight="600"
            />
            <ui-sidebar-item 
              title="普通" 
              name="2"
              title-size="32rpx"
              active-title-size="34rpx"
              active-title-weight="600"
            />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="SidebarItem 属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="name" value="标识符" />
          <ui-cell title="title" value="标题文字" />
          <ui-cell title="height" value="选项高度" />
          <ui-cell title="disabled" value="是否禁用" />
          <ui-cell title="titleColor" value="标题颜色" />
          <ui-cell title="titleSize" value="标题大小" />
          <ui-cell title="titleWeight" value="标题粗细" />
          <ui-cell title="activeTitleColor" value="激活标题颜色" />
          <ui-cell title="activeBackground" value="激活背景色" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "SidebarItem 侧边栏子项" },
})

const active1 = ref('1')
const active2 = ref('1')
const active3 = ref('1')
const active4 = ref('1')
const active5 = ref('1')
</script>

<style scoped lang="scss">
.sidebar-demo {
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
}
</style>
