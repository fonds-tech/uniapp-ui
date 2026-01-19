<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-notice-bar text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="滚动播放">
      <demo-block direction="column">
        <ui-notice-bar scrollable text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <!-- 新增：关闭滚动 -->
    <demo-section title="关闭滚动">
      <demo-block direction="column">
        <ui-notice-bar :scrollable="false" text="这是一条不会滚动的通知消息。" />
      </demo-block>
    </demo-section>

    <!-- 新增：滚动速度 -->
    <demo-section title="滚动速度">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前速度: {{ currentSpeed }}px/s</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentSpeed = 30">慢速 30</ui-button>
          <ui-button size="small" @click="currentSpeed = 60">默认 60</ui-button>
          <ui-button size="small" @click="currentSpeed = 120">快速 120</ui-button>
        </demo-block>
        <ui-notice-bar scrollable :speed="currentSpeed" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      </demo-block>
    </demo-section>

    <demo-section title="左侧图标">
      <demo-block direction="column" :gap="16">
        <ui-notice-bar icon="sound" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
        <ui-notice-bar icon="info-circle" text="这是一条信息通知。" />
        <ui-notice-bar icon="warning-circle" text="这是一条警告通知。" />
      </demo-block>
    </demo-section>

    <!-- 新增：图标样式 -->
    <demo-section title="图标样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义图标大小、颜色和粗细</text>
        <ui-notice-bar icon="sound" icon-size="40rpx" icon-color="#ee0a24" icon-weight="600" text="自定义图标样式的通知栏。" />
      </demo-block>
    </demo-section>

    <!-- 新增：右侧图标 -->
    <demo-section title="右侧图标">
      <demo-block direction="column" :gap="16">
        <ui-notice-bar icon="sound" right-icon="right" text="点击查看详情" @click="onNoticeClick" />
        <ui-notice-bar icon="info-circle" right-icon="close" right-icon-color="#999" text="可关闭的通知" @click="onCloseClick" />
      </demo-block>
    </demo-section>

    <!-- 新增：右侧图标样式 -->
    <demo-section title="右侧图标样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义右侧图标大小、颜色和粗细</text>
        <ui-notice-bar icon="sound" right-icon="right" right-icon-size="32rpx" right-icon-color="#1989fa" right-icon-weight="600" text="自定义右侧图标样式。" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <ui-notice-bar background="#ecf9ff" color="#1989fa" icon="info-circle" text="技术是开发它的人的共同灵魂。" />
        <ui-notice-bar background="#fff7e6" color="#ff9500" icon="warning-circle" text="请注意查看重要通知。" />
        <ui-notice-bar background="#ffece8" color="#ee0a24" icon="warning-circle" text="紧急通知：系统将于今晚维护。" />
      </demo-block>
    </demo-section>

    <!-- 新增：文字样式 -->
    <demo-section title="文字样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义文字大小和粗细</text>
        <ui-notice-bar icon="sound" font-size="28rpx" text="小号文字通知。" />
        <ui-notice-bar icon="sound" font-size="32rpx" font-weight="600" text="加粗文字通知。" />
      </demo-block>
    </demo-section>

    <!-- 新增：最小高度 -->
    <demo-section title="最小高度">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">当前高度: {{ currentMinHeight }}</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentMinHeight = '60rpx'">60rpx</ui-button>
          <ui-button size="small" @click="currentMinHeight = '80rpx'">80rpx</ui-button>
          <ui-button size="small" @click="currentMinHeight = '100rpx'">100rpx</ui-button>
        </demo-block>
        <ui-notice-bar icon="sound" :min-height="currentMinHeight" text="自定义高度的通知栏。" />
      </demo-block>
    </demo-section>

    <demo-section title="垂直滚动">
      <demo-block direction="column">
        <ui-notice-bar :text="notices" mode="vertical" icon="sound" />
      </demo-block>
    </demo-section>

    <!-- 新增：垂直滚动间隔 -->
    <demo-section title="垂直滚动间隔">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前间隔: {{ currentInterval }}ms</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentInterval = 2000">2秒</ui-button>
          <ui-button size="small" @click="currentInterval = 3000">3秒</ui-button>
          <ui-button size="small" @click="currentInterval = 5000">5秒</ui-button>
        </demo-block>
        <ui-notice-bar :text="notices" mode="vertical" icon="sound" :interval="currentInterval" />
      </demo-block>
    </demo-section>

    <!-- 新增：垂直滚动动画时长 -->
    <demo-section title="垂直滚动动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前动画时长: {{ currentDuration }}ms</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 500">500ms</ui-button>
          <ui-button size="small" @click="currentDuration = 1000">1000ms</ui-button>
        </demo-block>
        <ui-notice-bar :text="notices" mode="vertical" icon="sound" :duration="currentDuration" />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-notice-bar :text="notices" mode="vertical" icon="sound" right-icon="right" @click="onNoticeItemClick" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义类名和样式 -->
    <demo-section title="自定义类名和样式">
      <demo-block direction="column" :gap="16">
        <ui-notice-bar icon="sound" text="自定义类名通知栏。" custom-class="my-notice-bar" />
        <ui-notice-bar icon="sound" text="自定义样式通知栏。" :custom-style="{ borderRadius: '16rpx', margin: '0 16rpx' }" />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 活动公告 -->
    <demo-section title="综合示例 - 活动公告">
      <demo-block direction="column">
        <ui-notice-bar
          :text="activityNotices"
          mode="vertical"
          icon="gift"
          icon-size="36rpx"
          icon-color="#ee0a24"
          right-icon="right"
          right-icon-color="#ee0a24"
          background="#fff0f0"
          color="#ee0a24"
          font-weight="500"
          :interval="4000"
          @click="onActivityClick"
        />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 系统通知 -->
    <demo-section title="综合示例 - 系统通知">
      <demo-block direction="column">
        <ui-notice-bar
          scrollable
          icon="info-circle"
          icon-size="32rpx"
          icon-color="#1989fa"
          background="#e8f4ff"
          color="#1989fa"
          :speed="40"
          text="系统将于今晚 22:00 至次日 06:00 进行例行维护，届时部分服务可能暂时无法使用，敬请谅解。"
        />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 紧急警告 -->
    <demo-section title="综合示例 - 紧急警告">
      <demo-block direction="column">
        <view class="warning-notice">
          <ui-notice-bar
            scrollable
            icon="warning-circle"
            icon-size="36rpx"
            icon-color="#fff"
            icon-weight="600"
            right-icon="close"
            right-icon-color="rgba(255,255,255,0.8)"
            background="linear-gradient(135deg, #ee0a24 0%, #ff6034 100%)"
            color="#fff"
            font-size="28rpx"
            font-weight="500"
            min-height="88rpx"
            :speed="80"
            text="【紧急通知】请所有用户立即更新密码以保护账户安全！"
            @click="onWarningClick"
          />
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 多条公告轮播 -->
    <demo-section title="综合示例 - 多条公告轮播">
      <demo-block direction="column">
        <view class="announcement-box">
          <view class="announcement-header">
            <ui-icon name="bell" size="32rpx" color="#ff9500" />
            <text class="announcement-title">最新公告</text>
          </view>
          <ui-notice-bar
            :text="announcements"
            mode="vertical"
            :scrollable="false"
            icon=""
            right-icon="right"
            background="transparent"
            color="#333"
            font-size="26rpx"
            min-height="60rpx"
            :interval="3500"
            @click="onAnnouncementClick"
          />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "NoticeBar 通知栏" },
})

const toast = useToast()

// 基础数据
const notices = ["通知内容一", "通知内容二", "通知内容三"]

// 滚动速度
const currentSpeed = ref(60)

// 最小高度
const currentMinHeight = ref("80rpx")

// 垂直滚动间隔
const currentInterval = ref(3000)

// 垂直滚动动画时长
const currentDuration = ref(500)

// 事件处理
const eventLog = ref("点击通知条目触发事件")

function onNoticeClick() {
  toast.text("点击查看详情")
}

function onCloseClick() {
  toast.text("关闭通知")
}

function onNoticeItemClick(index: number) {
  eventLog.value = `点击了第 ${index + 1} 条通知`
  toast.text(`点击了第 ${index + 1} 条通知`)
}

// 综合示例 - 活动公告
const activityNotices = ["🎉 新用户注册即送 100 积分", "🔥 限时特惠：全场商品 8 折起", "🎁 邀请好友各得 50 元红包", "⭐ VIP 会员专享双倍积分"]

function onActivityClick(index: number) {
  toast.success(`查看活动 ${index + 1} 详情`)
}

// 综合示例 - 多条公告轮播
const announcements = ["【公告】平台服务协议已更新，请查阅", "【通知】春节期间物流时效可能延迟", "【活动】年货节大促，满 300 减 50", "【提醒】请及时完成实名认证"]

function onAnnouncementClick(index: number) {
  toast.text(`查看公告 ${index + 1}`)
}

function onWarningClick() {
  toast.fail("前往安全中心")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.warning-notice {
  overflow: hidden;
  border-radius: 12rpx;
}

.announcement-box {
  padding: 16rpx 24rpx;
  background: #fffbe6;
  border-radius: 12rpx;
}

.announcement-header {
  gap: 12rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid rgba(255, 149, 0, 0.2);
  margin-bottom: 8rpx;
  padding-bottom: 12rpx;
}

.announcement-title {
  color: #ff9500;
  font-size: 26rpx;
  font-weight: 600;
}

:deep(.my-notice-bar) {
  border: 2rpx solid #1989fa;
  border-radius: 12rpx;
}
</style>
