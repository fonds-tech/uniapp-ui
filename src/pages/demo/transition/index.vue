<template>
  <demo-page>
    <demo-section title="基础用法" desc="fade 淡入淡出">
      <demo-block direction="column" :gap="12">
        <ui-button size="small" @click="show1 = !show1">{{ show1 ? "隐藏" : "显示" }}</ui-button>
        <view class="trans-box">
          <ui-transition :show="show1">
            <view class="trans-content">Fade</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="动画名 name" desc="切换 10 种内置动画">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="replay">重播当前</ui-button>
          <ui-button size="small" type="primary" @click="showAnim = !showAnim">{{ showAnim ? "隐藏" : "显示" }}</ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="8">
          <ui-button v-for="n in animPresets" :key="n" size="small" :type="animName === n ? 'primary' : 'default'" @click="animName = n">
            {{ n }}
          </ui-button>
        </demo-block>
        <view class="trans-box trans-box--lg">
          <ui-transition :show="showAnim" :name="animName" :duration="400">
            <view class="trans-content">{{ animName }}</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="时长 duration">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="d in durationPresets" :key="d" size="small" :type="durationDemo === d ? 'primary' : 'default'" @click="durationDemo = d">
            {{ d }}ms
          </ui-button>
        </demo-block>
        <ui-button size="small" @click="showDuration = !showDuration">{{ showDuration ? "隐藏" : "显示" }}</ui-button>
        <view class="trans-box">
          <ui-transition :show="showDuration" name="zoom-in" :duration="durationDemo">
            <view class="trans-content">{{ durationDemo }}ms</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="缓动函数 timingFunction">
      <demo-block direction="column" :gap="16">
        <demo-block :cols="2" :gap="12">
          <ui-button v-for="t in timingPresets" :key="t.label" size="small" :type="timingDemo === t.value ? 'primary' : 'default'" @click="timingDemo = t.value">
            {{ t.label }}
          </ui-button>
        </demo-block>
        <ui-button size="small" @click="showTiming = !showTiming">{{ showTiming ? "隐藏" : "显示" }}</ui-button>
        <view class="trans-box">
          <ui-transition :show="showTiming" name="zoom-in" :duration="600" :enter-timing-function="timingDemo" :leave-timing-function="timingDemo">
            <view class="trans-content">{{ timingDemo }}</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="懒渲染 lazyRender">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="showLazyT = !showLazyT">lazy=true 切换</ui-button>
          <ui-button size="small" @click="showLazyF = !showLazyF">lazy=false 切换</ui-button>
        </demo-block>
        <view class="trans-row">
          <ui-transition :show="showLazyT" :lazy-render="true">
            <view class="trans-content trans-content--sm">lazy=true</view>
          </ui-transition>
          <ui-transition :show="showLazyF" :lazy-render="false">
            <view class="trans-content trans-content--sm">lazy=false</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" :gap="12">
        <ui-button size="small" type="primary" @click="showEvent = !showEvent">{{ showEvent ? "隐藏" : "显示" }}</ui-button>
        <view class="trans-box">
          <ui-transition
            :show="showEvent"
            name="zoom-in"
            :duration="500"
            @click="onClick"
            @before-enter="addLog('before-enter')"
            @enter="addLog('enter')"
            @after-enter="addLog('after-enter')"
            @before-leave="addLog('before-leave')"
            @leave="addLog('leave')"
            @after-leave="addLog('after-leave')"
          >
            <view class="trans-content">点击我</view>
          </ui-transition>
        </view>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法" desc="enter / leave 命令式">
      <demo-block direction="column" :gap="12">
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="trRef?.enter()">enter()</ui-button>
          <ui-button size="small" @click="trRef?.leave()">leave()</ui-button>
        </demo-block>
        <view class="trans-box">
          <ui-transition ref="trRef" :show="false" name="fade-up">
            <view class="trans-content">实例控制</view>
          </ui-transition>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 弹窗组合">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" @click="openModal('fade')">淡入</ui-button>
        <ui-button size="small" @click="openModal('zoom-in')">缩放</ui-button>
        <ui-button size="small" @click="openModal('slide-up')">上滑</ui-button>
      </demo-block>
    </demo-section>

    <ui-transition :show="modalMask" :duration="300">
      <view class="modal-mask" @click="closeModal">
        <ui-transition :show="modalContent" :name="modalAnim" :duration="300">
          <view class="modal-card" @click.stop>
            <text class="modal-card__title">弹窗组合</text>
            <text class="modal-card__desc">演示外层 fade mask + 内层 {{ modalAnim }} 双层 transition</text>
            <ui-button block type="primary" @click="closeModal">关闭</ui-button>
          </view>
        </ui-transition>
      </view>
    </ui-transition>
  </demo-page>
</template>

<script setup lang="ts">
import type { TransitionName, TransitionInstance } from "@/uni_modules/uniapp-ui/ui-transition"
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Transition 过渡动画" },
})

const show1 = ref(true)

const animPresets: TransitionName[] = ["fade", "zoom-in", "fade-up", "fade-down", "fade-left", "fade-right", "slide-up", "slide-down", "slide-left", "slide-right"]
const animName = ref<TransitionName>("fade")
const showAnim = ref(true)
function replay() {
  showAnim.value = false
  setTimeout(() => (showAnim.value = true), 50)
}

const durationPresets = [100, 300, 800]
const durationDemo = ref(300)
const showDuration = ref(true)

const timingPresets = [
  { label: "ease-out", value: "ease-out" },
  { label: "linear", value: "linear" },
  { label: "ease-in-out", value: "ease-in-out" },
  { label: "弹性", value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
]
const timingDemo = ref("ease-out")
const showTiming = ref(true)

const showLazyT = ref(false)
const showLazyF = ref(false)

const showEvent = ref(false)
const eventLog = ref("等待事件...")
function addLog(name: string) {
  eventLog.value = `[${name}]`
}
function onClick() {
  eventLog.value = "[click]"
}

const trRef = ref<TransitionInstance>()

const modalMask = ref(false)
const modalContent = ref(false)
const modalAnim = ref<TransitionName>("fade")
function openModal(anim: TransitionName) {
  modalAnim.value = anim
  modalMask.value = true
  setTimeout(() => (modalContent.value = true), 50)
}
function closeModal() {
  modalContent.value = false
  setTimeout(() => (modalMask.value = false), 300)
}
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.trans-box {
  display: flex;
  margin-top: var(--ui-spacing-md);
  min-height: 120rpx;
  align-items: center;
  justify-content: center;

  &--lg {
    min-height: 200rpx;
  }
}

.trans-row {
  gap: var(--ui-spacing-md);
  display: flex;
  margin-top: var(--ui-spacing-md);
  min-height: 100rpx;
}

.trans-content {
  color: var(--ui-color-text-inverse);
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  font-size: var(--ui-font-size-sm);
  background: var(--ui-color-primary);
  text-align: center;
  border-radius: var(--ui-radius-md);

  &--sm {
    flex: 1;
    padding: var(--ui-spacing-sm) var(--ui-spacing-md);
    font-size: var(--ui-font-size-xs);
  }
}

.modal-mask {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 1000;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
}

.modal-card {
  gap: var(--ui-spacing-md);
  width: 560rpx;
  display: flex;
  padding: var(--ui-spacing-xl);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    text-align: center;
    font-weight: var(--ui-font-weight-bold);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    line-height: var(--ui-line-height-normal);
  }
}
</style>
