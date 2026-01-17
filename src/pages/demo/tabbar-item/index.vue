<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="tabbar-demo">
          <ui-tabbar v-model="active1">
            <ui-tabbar-item name="home" icon="home">首页</ui-tabbar-item>
            <ui-tabbar-item name="category" icon="apps">分类</ui-tabbar-item>
            <ui-tabbar-item name="cart" icon="cart">购物车</ui-tabbar-item>
            <ui-tabbar-item name="profile" icon="user">我的</ui-tabbar-item>
          </ui-tabbar>
        </view>
        <ui-text size="small" color="secondary">当前选中：{{ active1 }}</ui-text>
      </demo-block>
    </demo-section>

    <demo-section title="使用图片图标">
      <demo-block direction="column">
        <view class="tabbar-demo">
          <ui-tabbar v-model="active2">
            <ui-tabbar-item name="home">
              <template #icon>
                <image class="tab-icon" src="/static/icons/home.png" mode="aspectFit" />
              </template>
              首页
            </ui-tabbar-item>
            <ui-tabbar-item name="profile">
              <template #icon>
                <image class="tab-icon" src="/static/icons/user.png" mode="aspectFit" />
              </template>
              我的
            </ui-tabbar-item>
          </ui-tabbar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标大小">
      <demo-block direction="column">
        <view class="tabbar-demo">
          <ui-tabbar v-model="active3">
            <ui-tabbar-item name="home" icon="home" icon-size="48rpx">首页</ui-tabbar-item>
            <ui-tabbar-item name="category" icon="apps" icon-size="48rpx">分类</ui-tabbar-item>
            <ui-tabbar-item name="profile" icon="user" icon-size="48rpx">我的</ui-tabbar-item>
          </ui-tabbar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="配合徽标使用">
      <demo-block direction="column">
        <view class="tabbar-demo">
          <ui-tabbar v-model="active4">
            <ui-tabbar-item name="home" icon="home">首页</ui-tabbar-item>
            <ui-tabbar-item name="message" icon="message">
              <template #icon>
                <ui-badge :content="5" :offset="[-5, 5]">
                  <ui-icon name="message" size="22" />
                </ui-badge>
              </template>
              消息
            </ui-tabbar-item>
            <ui-tabbar-item name="cart" icon="cart">
              <template #icon>
                <ui-badge dot :offset="[-5, 5]">
                  <ui-icon name="cart" size="22" />
                </ui-badge>
              </template>
              购物车
            </ui-tabbar-item>
            <ui-tabbar-item name="profile" icon="user">我的</ui-tabbar-item>
          </ui-tabbar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="TabbarItem 属性说明">
      <demo-block direction="column">
        <ui-cell-group :radius="12">
          <ui-cell title="name" value="标识符" />
          <ui-cell title="icon" value="图标名称" />
          <ui-cell title="iconSize" value="图标大小" />
          <ui-cell title="iconWeight" value="图标粗细" />
          <ui-cell title="iconPrefix" value="图标前缀" />
          <ui-cell title="route" value="跳转路由" />
          <ui-cell title="routeParams" value="路由参数" />
          <ui-cell title="routeType" value="跳转类型" />
        </ui-cell-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "TabbarItem 标签栏子项" },
})

const active1 = ref("home")
const active2 = ref("home")
const active3 = ref("home")
const active4 = ref("home")
</script>

<style scoped lang="scss">
.tabbar-demo {
  border: 1px solid #eee;
  overflow: hidden;
  border-radius: 12px;
}

.tab-icon {
  width: 44rpx;
  height: 44rpx;
}
</style>
