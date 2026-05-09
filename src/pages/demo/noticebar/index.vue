<template>
  <demo-page>
    <demo-section title="基础演示">
      <ui-notice-bar
        :text="currentText"
        :mode="currentMode"
        :scrollable="currentScrollable"
        :speed="currentSpeed"
        :duration="currentDuration"
        :background="currentBackground"
        :color="currentColor"
        :icon-color="currentColor"
        :right-icon-color="currentColor"
        @click="onBaseClick"
      />
    </demo-section>

    <demo-section title="模式">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :type="currentMode === 'horizontal' ? 'primary' : 'default'" @click="currentMode = 'horizontal'">水平滚动</ui-button>
        <ui-button size="small" :type="currentMode === 'vertical' ? 'primary' : 'default'" @click="currentMode = 'vertical'">垂直轮播</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="滚动开关">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :type="currentScrollable ? 'primary' : 'default'" @click="currentScrollable = true">开启</ui-button>
        <ui-button size="small" :type="!currentScrollable ? 'primary' : 'default'" @click="currentScrollable = false">关闭</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="滚动速度 (px/s)">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="currentSpeed === 30 ? 'primary' : 'default'" @click="currentSpeed = 30">慢 30</ui-button>
        <ui-button size="small" :type="currentSpeed === 60 ? 'primary' : 'default'" @click="currentSpeed = 60">中 60</ui-button>
        <ui-button size="small" :type="currentSpeed === 120 ? 'primary' : 'default'" @click="currentSpeed = 120">快 120</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="垂直动画时长 (ms)">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="currentDuration === 300 ? 'primary' : 'default'" @click="currentDuration = 300">300</ui-button>
        <ui-button size="small" :type="currentDuration === 500 ? 'primary' : 'default'" @click="currentDuration = 500">500</ui-button>
        <ui-button size="small" :type="currentDuration === 1000 ? 'primary' : 'default'" @click="currentDuration = 1000">1000</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="主题色">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="currentTheme === '' ? 'primary' : 'default'" @click="onTheme('', '', '')">默认</ui-button>
        <ui-button size="small" :type="currentTheme === 'primary' ? 'primary' : 'default'" @click="onTheme('primary', 'primary', 'text-inverse')">主色</ui-button>
        <ui-button size="small" :type="currentTheme === 'success' ? 'primary' : 'default'" @click="onTheme('success', 'success', 'text-inverse')">成功</ui-button>
        <ui-button size="small" :type="currentTheme === 'danger' ? 'primary' : 'default'" @click="onTheme('danger', 'danger', 'text-inverse')">危险</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="电商首页促销">
      <ui-notice-bar
        text="🔥 限时特惠：全场满 200 减 30，更有 8 折券限量发放，活动仅剩 2 天！"
        icon="gift"
        right-icon="right"
        background="danger"
        color="text-inverse"
        icon-color="text-inverse"
        right-icon-color="text-inverse"
        font-weight="500"
        radius="16rpx"
        :speed="50"
        @click="onBizClick('查看促销活动')"
      />
    </demo-section>

    <demo-section title="资讯快讯轮播">
      <ui-notice-bar :text="newsList" mode="vertical" icon="sound" right-icon="right" :interval="3000" @click="onNewsClick" />
    </demo-section>

    <demo-section title="系统维护通知">
      <ui-notice-bar
        text="系统将于今晚 22:00 至次日 06:00 进行例行维护，届时部分服务可能暂时无法使用。"
        icon="info-circle"
        background="primary"
        color="text-inverse"
        icon-color="text-inverse"
        :speed="40"
      />
    </demo-section>

    <demo-section title="物流跟踪">
      <ui-notice-bar
        text="您的订单 SF1234567890 已发货，预计明天送达，点击查看物流详情"
        icon="truck"
        icon-size="36rpx"
        right-icon="right"
        right-icon-size="28rpx"
        background="warning"
        color="text-inverse"
        icon-color="text-inverse"
        right-icon-color="text-inverse"
        @click="onBizClick('跳转订单详情')"
      />
    </demo-section>

    <demo-section title="VIP 会员特权">
      <view class="gradient-vip">
        <ui-notice-bar
          :text="vipList"
          mode="vertical"
          icon="crown"
          right-icon="right"
          background="transparent"
          color="#fff8e1"
          icon-color="#fff8e1"
          right-icon-color="#fff8e1"
          font-weight="500"
          :interval="3500"
          @click="onBizClick('进入会员中心')"
        />
      </view>
    </demo-section>

    <demo-section title="紧急安全警告">
      <view class="gradient-danger">
        <ui-notice-bar
          text="【紧急通知】检测到账户存在异常登录，请立即修改密码以保护账户安全！"
          icon="warning-circle"
          icon-size="36rpx"
          icon-weight="600"
          right-icon="close"
          right-icon-size="32rpx"
          right-icon-weight="600"
          background="transparent"
          color="text-inverse"
          icon-color="text-inverse"
          right-icon-color="text-inverse"
          font-weight="500"
          min-height="88rpx"
          :speed="60"
          @click="onBizClick('关闭警告')"
        />
      </view>
    </demo-section>

    <demo-section title="弱提示公告板">
      <view class="weak-board">
        <view class="weak-board__head">
          <ui-icon name="bell" size="28rpx" color="text-secondary" />
          <text class="weak-board__title">公告</text>
        </view>
        <ui-notice-bar
          :text="weakList"
          mode="vertical"
          :scrollable="true"
          icon=""
          right-icon="right"
          right-icon-color="text-secondary"
          background="transparent"
          color="text-secondary"
          font-size="26rpx"
          min-height="60rpx"
          :interval="3500"
          @click="onWeakClick"
        />
      </view>
    </demo-section>

    <demo-section title="插槽自定义">
      <ui-notice-bar text="自定义左右插槽：左侧头像 + 右侧操作按钮，可承载任意内容。" :scrollable="false">
        <template #left>
          <view class="slot-avatar">小</view>
        </template>
        <template #right>
          <ui-button size="mini" type="primary" @click="onBizClick('插槽按钮：去看看')">去看看</ui-button>
        </template>
      </ui-notice-bar>
    </demo-section>

    <demo-section title="自定义类名 / 样式">
      <ui-notice-bar
        text="customClass 加边框，customStyle 加外边距，radius 控制圆角。"
        icon="setting"
        radius="16rpx"
        :scrollable="false"
        custom-class="custom-notice"
        :custom-style="{ margin: '0 16rpx' }"
      />
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
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

const horizontalText = "在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
const verticalNotices = ["通知内容一", "通知内容二", "通知内容三"]

const currentMode = ref<"horizontal" | "vertical">("horizontal")
const currentScrollable = ref(true)
const currentSpeed = ref(60)
const currentDuration = ref(500)
const currentTheme = ref("")
const currentBackground = ref("")
const currentColor = ref("")
const eventLog = ref("点击通知触发事件")

const currentText = computed(() => (currentMode.value === "vertical" ? verticalNotices : horizontalText))

function onBaseClick(index: number) {
  eventLog.value = `[基础] 点击第 ${index + 1} 条`
}

function onTheme(theme: string, bg: string, color: string) {
  currentTheme.value = theme
  currentBackground.value = bg
  currentColor.value = color
}

const newsList = ["央行：稳健货币政策灵活适度", "A 股三大指数集体收涨，沪指涨 1.2%", "新能源汽车销量再创历史新高", "国常会部署进一步扩大内需相关举措"]

function onNewsClick(index: number) {
  toast.text(`查看快讯：${newsList[index]}`)
  eventLog.value = `[快讯] 第 ${index + 1} 条`
}

const vipList = ["👑 VIP 专享：全场再 9 折", "🎁 生日月双倍积分", "🚚 包邮门槛降至 99 元", "⚡ 优先客服 30 秒响应"]

const weakList = ["【公告】平台服务协议已更新，请查阅", "【通知】春节期间物流时效可能延迟", "【活动】年货节大促，满 300 减 50", "【提醒】请及时完成实名认证"]

function onWeakClick(index: number) {
  toast.text(`查看公告：${weakList[index]}`)
  eventLog.value = `[公告] 第 ${index + 1} 条`
}

function onBizClick(label: string) {
  toast.text(label)
  eventLog.value = `[业务] ${label}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

// notice-bar 不接渐变背景，由外层 wrapper 提供
.gradient-vip {
  overflow: hidden;
  background: linear-gradient(135deg, #c79b3a 0%, #f1c75a 60%, #b8893a 100%);
  border-radius: 12rpx;
}

.gradient-danger {
  overflow: hidden;
  background: linear-gradient(135deg, #ee0a24 0%, #ff6034 100%);
  border-radius: 12rpx;
}

.weak-board {
  padding: 12rpx 24rpx;
  background: var(--ui-color-background-section);
  border-radius: 12rpx;
}

.weak-board__head {
  gap: 8rpx;
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);
  margin-bottom: 4rpx;
  padding-bottom: 8rpx;
}

.weak-board__title {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  font-weight: 500;
}

.slot-avatar {
  color: var(--ui-color-text-inverse);
  width: 48rpx;
  height: 48rpx;
  display: flex;
  font-size: 24rpx;
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}

.custom-notice {
  border: 2rpx solid var(--ui-color-primary);
}
</style>
