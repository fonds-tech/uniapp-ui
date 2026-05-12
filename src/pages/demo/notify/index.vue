<template>
  <demo-page>
    <demo-section title="基础调用" desc="按类型快捷展示，type 控制语义色">
      <demo-block :cols="2" :gap="16">
        <ui-button v-for="item in typeButtons" :key="item.type" :type="item.type" @click="onShowByType(item.type)">{{ item.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="调用方式" desc="useNotify Hook 与组件 ref 两种入口">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="notify.success('通过 useNotify 调用')">Hook</ui-button>
        <ui-button size="small" @click="notifyRef?.show({ type: 'primary', content: '通过 ref 调用' })">Ref</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="展示时长 (ms)" desc="duration 控制自动关闭时间">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="ms in [1500, 3000, 5000]" :key="ms" size="small" :type="currentDuration === ms ? 'primary' : 'default'" @click="currentDuration = ms">{{ ms }}</ui-button>
      </demo-block>
      <demo-block direction="column" :gap="8">
        <ui-button type="primary" @click="onShowDuration">应用时长展示</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="顶部偏移 / 层级" desc="offsetTop 让出状态栏，zIndex 控制堆叠层级">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="o in offsetOptions" :key="o.value" size="small" :type="currentOffset === o.value ? 'primary' : 'default'" @click="currentOffset = o.value">
          {{ o.label }}
        </ui-button>
      </demo-block>
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="z in [1000, 2000, 9999]" :key="z" size="small" :type="currentZIndex === z ? 'primary' : 'default'" @click="currentZIndex = z">z {{ z }}</ui-button>
      </demo-block>
      <demo-block direction="column" :gap="8">
        <ui-button type="primary" @click="onShowOffset">应用偏移 / 层级</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="字号 / 字重" desc="fontSize + fontWeight 调整文本视觉权重">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="f in fontVariants" :key="f.label" size="small" @click="onShowFont(f.size, f.weight)">{{ f.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="文字 / 背景" desc="color + background，支持语义 token 与十六进制">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="notify.show({ content: '语义 token', background: 'success', color: 'text-inverse' })">语义 token</ui-button>
        <ui-button size="small" @click="notify.show({ content: '十六进制', background: '#7232dd', color: '#ffffff' })">十六进制</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义类名 / 样式" desc="customClass 加圆角阴影，customStyle 直接改样式">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="onShowCustomClass">customClass</ui-button>
        <ui-button size="small" @click="onShowCustomStyle">customStyle</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容" desc="default slot 替换 content，承载图标 + 文字组合">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="onShowSlot">显示插槽通知</ui-button>
        <ui-button size="small" @click="notify.close()">手动关闭</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景" desc="订单 / 网络 / 库存 / 系统更新等真实推送">
      <demo-block :cols="2" :gap="12">
        <ui-button v-for="s in scenarios" :key="s.label" size="small" @click="notify[s.type](s.content)">{{ s.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="open / opened / close / closed / click 实时打印">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <ui-notify
      ref="notifyRef"
      :custom-class="currentCustomClass"
      :custom-style="currentCustomStyle"
      @open="onEvent('open')"
      @opened="onEvent('opened')"
      @close="onEvent('close')"
      @closed="onEvent('closed')"
      @click="onEvent('click')"
    >
      <view v-if="useSlot" class="slot-row">
        <ui-icon name="info-circle" color="text-inverse" size="32rpx" />
        <text class="slot-text">这是 slot 自定义内容</text>
      </view>
    </ui-notify>
  </demo-page>
</template>

<script setup lang="ts">
import type { NotifyType } from "@/uni_modules/uniapp-ui"
import { useNotify, provideNotify } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Notify 消息通知" },
})

const notifyRef = ref()
const notify = useNotify()

const typeButtons: Array<{ type: NotifyType; label: string }> = [
  { type: "primary", label: "主要通知" },
  { type: "success", label: "成功通知" },
  { type: "warning", label: "警告通知" },
  { type: "danger", label: "危险通知" },
]

const offsetOptions = [
  { value: "", label: "默认" },
  { value: "40rpx", label: "40rpx" },
  { value: "120rpx", label: "120rpx" },
]

const fontVariants = [
  { label: "小号", size: "24rpx", weight: "400" },
  { label: "中号", size: "28rpx", weight: "500" },
  { label: "大号加粗", size: "32rpx", weight: "600" },
  { label: "特大粗体", size: "36rpx", weight: "700" },
]

const scenarios: Array<{ type: "primary" | "success" | "warning" | "danger"; label: string; content: string }> = [
  { type: "success", label: "订单提交成功", content: "订单已提交，请耐心等待发货" },
  { type: "danger", label: "网络异常", content: "网络连接异常，请检查后重试" },
  { type: "warning", label: "库存预警", content: "库存仅剩 3 件，下单要快" },
  { type: "primary", label: "系统更新", content: "系统已更新到 v2.4.0，点击查看更新内容" },
]

const currentDuration = ref(3000)
const currentOffset = ref("")
const currentZIndex = ref(2000)
const currentCustomClass = ref("")
const currentCustomStyle = ref<Record<string, string>>({})
const useSlot = ref(false)
const eventLog = ref("等待事件…")

onMounted(() => provideNotify(notifyRef))

function onShowByType(type: NotifyType) {
  resetCustom()
  notify.show({ type, content: `${type} 类型通知` })
}

function onShowDuration() {
  resetCustom()
  notify.show({ content: `展示 ${currentDuration.value}ms`, duration: currentDuration.value })
}

function onShowOffset() {
  resetCustom()
  notify.show({
    content: `偏移 ${currentOffset.value || "默认"} / z-index ${currentZIndex.value}`,
    offsetTop: currentOffset.value || undefined,
    zIndex: currentZIndex.value,
  })
}

function onShowFont(fontSize: string, fontWeight: string) {
  resetCustom()
  notify.show({ content: `字号 ${fontSize} / 字重 ${fontWeight}`, fontSize, fontWeight })
}

function onShowCustomClass() {
  useSlot.value = false
  currentCustomClass.value = "demo-notify-fancy"
  currentCustomStyle.value = {}
  notify.show({ content: "customClass 加圆角与阴影" })
}

function onShowCustomStyle() {
  useSlot.value = false
  currentCustomClass.value = ""
  currentCustomStyle.value = { borderBottomLeftRadius: "24rpx", borderBottomRightRadius: "24rpx" }
  notify.show({ content: "customStyle 加底部圆角" })
}

function onShowSlot() {
  resetCustom()
  useSlot.value = true
  notify.show({ duration: 4000 })
}

function resetCustom() {
  useSlot.value = false
  currentCustomClass.value = ""
  currentCustomStyle.value = {}
}

function onEvent(name: string) {
  eventLog.value = `[${new Date().toLocaleTimeString()}] ${name}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.slot-row {
  gap: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-text {
  color: var(--ui-color-text-inverse);
  font-size: 28rpx;
  font-weight: var(--ui-font-weight-normal);
}

.demo-notify-fancy {
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.16);
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}
</style>
