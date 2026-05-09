<template>
  <demo-page>
    <demo-section title="基础调用" desc="show 切换显示，点击遮罩关闭">
      <demo-block>
        <ui-button type="primary" @click="basicShow = true">显示遮罩</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="嵌入内容" desc="default slot 承载任意内容，需 stop 阻止冒泡">
      <demo-block>
        <ui-button type="primary" @click="contentShow = true">显示带内容</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="透明度" desc="点击立即应用并打开实例">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="o in opacities" :key="o" size="small" :type="config.opacity === o ? 'primary' : 'default'" @click="apply('opacity', o)">{{ o }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="过渡时长 (ms)" desc="点击立即应用并打开（关闭后再打开看进入动画）">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="d in durations" :key="d" size="small" :type="config.duration === d ? 'primary' : 'default'" @click="apply('duration', d)">{{ d }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="缓动函数" desc="enter / leave 同步切换">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="t in timings" :key="t" size="small" :type="config.timing === t ? 'primary' : 'default'" @click="apply('timing', t)">{{ t }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="层级" desc="zIndex 控制堆叠层级">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="z in zIndexes" :key="z" size="small" :type="config.zIndex === z ? 'primary' : 'default'" @click="apply('zIndex', z)">{{ z }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="懒渲染" desc="lazyRender 控制 show=false 时是否保留 DOM">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :type="config.lazyRender ? 'primary' : 'default'" @click="apply('lazyRender', true)">懒渲染</ui-button>
        <ui-button size="small" :type="!config.lazyRender ? 'primary' : 'default'" @click="apply('lazyRender', false)">立即渲染</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="背景色" desc="background 覆盖默认半透明黑（与 opacity 互斥）">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="b in backgrounds" :key="b.value" size="small" :type="config.background === b.value ? 'primary' : 'default'" @click="apply('background', b.value)">{{ b.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义类名" desc="customClass 加渐变 + customStyle 加毛玻璃">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="fancyShow = true">渐变遮罩</ui-button>
        <ui-button size="small" @click="blurShow = true">毛玻璃</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="open / opened / close / closed / click 顺序触发">
      <demo-block direction="column" align="start" :gap="12">
        <ui-button type="primary" @click="eventShow = true">监听事件</ui-button>
        <view class="event-list">
          <text v-for="(log, i) in eventLogs" :key="i" class="event-item">{{ log }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：加载遮罩" desc="点击后 2 秒自动关闭">
      <demo-block>
        <ui-button type="primary" @click="onShowLoading">加载中</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：确认弹窗" desc="阻止背景滚动 + 二次确认">
      <demo-block>
        <ui-button type="primary" @click="confirmShow = true">删除项目</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景：图片预览" desc="高透明度遮罩 + 居中图片">
      <demo-block>
        <ui-button type="primary" @click="previewShow = true">预览图片</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法" desc="defineExpose 暴露 open / close">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" @click="methodRef?.open()">ref.open()</ui-button>
        <ui-button size="small" @click="methodRef?.close()">ref.close()</ui-button>
      </demo-block>
    </demo-section>

    <ui-overlay v-model:show="basicShow" @click="basicShow = false" />

    <ui-overlay v-model:show="contentShow" @click="contentShow = false">
      <view class="demo-center">
        <view class="content-box" @click.stop>
          <text class="content-title">嵌入内容</text>
          <text class="content-desc">点击空白处关闭</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay
      v-model:show="configShow"
      :opacity="config.opacity"
      :duration="config.duration"
      :enter-timing-function="config.timing"
      :leave-timing-function="config.timing"
      :z-index="config.zIndex"
      :lazy-render="config.lazyRender"
      :background="config.background"
      @click="configShow = false"
    >
      <view class="demo-center">
        <view class="content-box" @click.stop>
          <text class="content-title">配置预览</text>
          <text class="content-desc">opacity {{ config.opacity }} / {{ config.duration }}ms</text>
          <text class="content-desc">{{ config.timing }} / z-index {{ config.zIndex }}</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay v-model:show="fancyShow" :custom-style="{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85))' }" @click="fancyShow = false">
      <view class="demo-center">
        <view class="content-box" @click.stop>
          <text class="content-title">渐变遮罩</text>
          <text class="content-desc">customStyle 直接设 background</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay v-model:show="blurShow" :custom-style="{ background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(20rpx)' }" @click="blurShow = false">
      <view class="demo-center">
        <view class="content-box content-box--dark" @click.stop>
          <text class="content-title content-title--inverse">毛玻璃效果</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay
      v-model:show="eventShow"
      :duration="400"
      @open="onEvent('open')"
      @opened="onEvent('opened')"
      @close="onEvent('close')"
      @closed="onEvent('closed')"
      @click="onEventClick"
    >
      <view class="demo-center">
        <view class="content-box" @click.stop>
          <text class="content-title">事件演示</text>
          <ui-button size="small" type="primary" @click="eventShow = false">关闭</ui-button>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay v-model:show="loadingShow" :opacity="0.5">
      <view class="demo-center">
        <view class="loading-box">
          <ui-loading size="48rpx" color="text-inverse" />
          <text class="loading-text">加载中…</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay v-model:show="confirmShow" :opacity="0.6">
      <view class="demo-center">
        <view class="confirm-card" @click.stop>
          <text class="confirm-title">删除确认</text>
          <text class="confirm-text">删除后无法恢复，是否继续？</text>
          <view class="confirm-actions">
            <ui-button size="small" @click="onConfirmCancel">取消</ui-button>
            <ui-button size="small" type="danger" @click="onConfirmOk">删除</ui-button>
          </view>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay v-model:show="previewShow" :opacity="0.92" @click="previewShow = false">
      <view class="demo-center">
        <view class="preview-box">
          <image class="preview-image" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" mode="aspectFit" />
          <text class="preview-tip">点击空白处关闭</text>
        </view>
      </view>
    </ui-overlay>

    <ui-overlay ref="methodRef" />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Overlay 遮罩层" },
})

const toast = useToast()

const opacities = [0.3, 0.5, 0.7, 0.9]
const durations = [100, 300, 600, 1000]
const timings = ["ease", "ease-in-out", "linear"]
const zIndexes = [100, 500, 1000]
const backgrounds = [
  { label: "默认", value: "" },
  { label: "主色", value: "primary" },
  { label: "成功", value: "success" },
  { label: "危险", value: "danger" },
]

const config = reactive({
  opacity: 0.7,
  duration: 300,
  timing: "ease-out",
  zIndex: 100,
  lazyRender: true,
  background: "",
})

const basicShow = ref(false)
const contentShow = ref(false)
const configShow = ref(false)
const fancyShow = ref(false)
const blurShow = ref(false)
const eventShow = ref(false)
const loadingShow = ref(false)
const confirmShow = ref(false)
const previewShow = ref(false)
const methodRef = ref()

const eventLogs = ref<string[]>([])

function onEvent(name: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${name}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

function onEventClick() {
  onEvent("click")
  eventShow.value = false
}

function onShowLoading() {
  loadingShow.value = true
  setTimeout(() => {
    loadingShow.value = false
    toast.success("加载完成")
  }, 2000)
}

function onConfirmCancel() {
  confirmShow.value = false
  toast.text("已取消")
}

function onConfirmOk() {
  confirmShow.value = false
  toast.success("删除成功")
}

// 切 prop + 立即打开实例。duration/timing 需关闭后再开看动画，故先关再开。
function apply<K extends keyof typeof config>(key: K, value: (typeof config)[K]) {
  configShow.value = false
  setTimeout(() => {
    config[key] = value
    configShow.value = true
  }, 50)
}
</script>

<style lang="scss" scoped>
// overlay 默认 fixed 全屏 mask，slot 内容自身布局；demo 内统一加居中容器
.demo-center {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-list {
  width: 100%;
  display: flex;
  padding: 16rpx;
  background: var(--ui-color-background-section);
  max-height: 250rpx;
  border-radius: 8rpx;
  flex-direction: column;
}

.event-item {
  color: var(--ui-color-text-secondary);
  padding: 4rpx 0;
  font-size: 22rpx;
}

.content-box {
  gap: 16rpx;
  width: 360rpx;
  display: flex;
  padding: 40rpx;
  background: var(--ui-color-background);
  align-items: center;
  border-radius: 16rpx;
  flex-direction: column;
  justify-content: center;

  &--dark {
    background: rgba(0, 0, 0, 0.5);
  }
}

.content-title {
  color: var(--ui-color-text);
  font-size: 32rpx;
  font-weight: 600;

  &--inverse {
    color: var(--ui-color-text-inverse);
  }
}

.content-desc {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
}

.loading-box {
  gap: 24rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.loading-text {
  color: var(--ui-color-text-inverse);
  font-size: 28rpx;
}

.confirm-card {
  gap: 24rpx;
  width: 560rpx;
  display: flex;
  padding: 40rpx;
  background: var(--ui-color-background);
  align-items: center;
  border-radius: 24rpx;
  flex-direction: column;
}

.confirm-title {
  color: var(--ui-color-text);
  font-size: 32rpx;
  font-weight: 600;
}

.confirm-text {
  color: var(--ui-color-text-secondary);
  font-size: 26rpx;
  text-align: center;
}

.confirm-actions {
  gap: 24rpx;
  display: flex;
}

.preview-box {
  gap: 32rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.preview-image {
  width: 600rpx;
  height: 600rpx;
  border-radius: 16rpx;
}

.preview-tip {
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
}
</style>
