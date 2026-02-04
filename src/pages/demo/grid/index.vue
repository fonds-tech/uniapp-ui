<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <ui-grid>
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 自定义列数 -->
    <demo-section title="自定义列数">
      <view class="column-label">3 列</view>
      <ui-grid :column-num="3">
        <ui-grid-item v-for="i in 6" :key="i" icon="image" text="文字" />
      </ui-grid>

      <view class="column-label">4 列（默认）</view>
      <ui-grid :column-num="4">
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="文字" />
      </ui-grid>

      <view class="column-label">5 列</view>
      <ui-grid :column-num="5">
        <ui-grid-item v-for="i in 10" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 自定义间距 -->
    <demo-section title="自定义间距">
      <ui-grid :gutter="20">
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 正方形格子 -->
    <demo-section title="正方形格子">
      <ui-grid square>
        <ui-grid-item v-for="i in 8" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 内容排列方向 -->
    <demo-section title="内容排列方向">
      <view class="column-label">垂直排列（默认）</view>
      <ui-grid direction="vertical">
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>

      <view class="column-label">水平排列</view>
      <ui-grid direction="horizontal">
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 显示边框 -->
    <demo-section title="显示边框">
      <view class="column-label">显示边框（默认）</view>
      <ui-grid border>
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>

      <view class="column-label">无边框</view>
      <ui-grid :border="false">
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>

    <!-- 图标颜色和大小 -->
    <demo-section title="图标颜色和大小">
      <ui-grid>
        <ui-grid-item icon="home" text="默认" />
        <ui-grid-item icon="search" icon-color="#1989fa" text="蓝色" />
        <ui-grid-item icon="heart" icon-color="#ee0a24" text="红色" />
        <ui-grid-item icon="star" icon-color="#ff976a" text="橙色" />
        <ui-grid-item icon="setting" icon-size="72rpx" text="大图标" />
        <ui-grid-item icon="info" icon-size="40rpx" text="小图标" />
        <ui-grid-item icon="like" icon-color="#07c160" icon-size="64rpx" text="绿色大图标" />
        <ui-grid-item icon="bell" icon-color="#7232dd" icon-size="48rpx" text="紫色图标" />
      </ui-grid>
    </demo-section>

    <!-- 徽标提示 -->
    <demo-section title="徽标提示">
      <ui-grid>
        <ui-grid-item icon="message" text="消息" dot />
        <ui-grid-item icon="bell" text="通知" badge="5" />
        <ui-grid-item icon="cart" text="购物车" badge="99+" />
        <ui-grid-item icon="home" text="首页" />
      </ui-grid>
    </demo-section>

    <!-- 可点击 -->
    <demo-section title="可点击">
      <ui-grid clickable>
        <ui-grid-item v-for="item in clickableItems" :key="item.text" :icon="item.icon" :text="item.text" @click="onGridItemClick(item.text)" />
      </ui-grid>
    </demo-section>

    <!-- 使用插槽 -->
    <demo-section title="使用插槽">
      <ui-grid>
        <!-- 自定义图标插槽 -->
        <ui-grid-item text="自定义图标">
          <template #icon>
            <view class="custom-icon">
              <image class="custom-icon__image" src="/static/logo.png" mode="aspectFit" />
            </view>
          </template>
        </ui-grid-item>

        <!-- 自定义文字插槽 -->
        <ui-grid-item icon="star">
          <template #text>
            <view class="custom-text">
              <text class="custom-text__title">自定义文字</text>
              <text class="custom-text__desc">描述信息</text>
            </view>
          </template>
        </ui-grid-item>

        <!-- 同时自定义图标和文字 -->
        <ui-grid-item>
          <template #icon>
            <ui-icon name="heart" color="#ee0a24" size="48rpx" />
          </template>
          <template #text>
            <text class="custom-text__highlight">精选推荐</text>
          </template>
        </ui-grid-item>

        <!-- 使用默认插槽 -->
        <ui-grid-item>
          <view class="custom-content">
            <ui-icon name="image" size="48rpx" color="#1989fa" />
            <text class="custom-content__text">完全自定义</text>
          </view>
        </ui-grid-item>
      </ui-grid>
    </demo-section>

    <!-- 内容居中 -->
    <demo-section title="内容居中">
      <view class="column-label">居中（默认）</view>
      <ui-grid center>
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>

      <view class="column-label">不居中</view>
      <ui-grid :center="false">
        <ui-grid-item v-for="i in 4" :key="i" icon="image" text="文字" />
      </ui-grid>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Grid 宫格" },
})

// 可点击宫格项数据
const clickableItems = [
  { icon: "wechat", text: "微信" },
  { icon: "alipay", text: "支付宝" },
  { icon: "qq", text: "QQ" },
  { icon: "weibo", text: "微博" },
]

// 点击事件处理
function onGridItemClick(text: string) {
  uni.showToast({
    title: `点击了${text}`,
    icon: "none",
  })
}
</script>

<style lang="scss" scoped>
.column-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-bottom: 16rpx;
}

.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &__image {
    width: 56rpx;
    height: 56rpx;
  }
}

.custom-text {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
    margin-top: 4rpx;
  }

  &__highlight {
    color: #ee0a24;
    font-size: var(--ui-font-size-sm);
    font-weight: 500;
  }
}

.custom-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    margin-top: 16rpx;
  }
}
</style>
