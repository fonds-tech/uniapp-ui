<template>
  <demo-page>
    <demo-section title="基础用法" desc="点击切换状态">
      <demo-block direction="column" :gap="16">
        <ui-switch v-model="basic" />
        <text class="demo-text">当前: {{ basic }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="状态切换" desc="normal / disabled / loading">
      <demo-block direction="column" :gap="16">
        <ui-switch v-model="stateValue" :disabled="state === 'disabled'" :loading="state === 'loading'" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in states" :key="s" size="small" :type="state === s ? 'primary' : 'default'" @click="state = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="size 自定义高度（width = 2 × size）">
      <demo-block direction="column" :gap="16">
        <ui-switch v-model="sizeValue" :size="sizeDemo" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="s in sizePresets" :key="s" size="small" :type="sizeDemo === s ? 'primary' : 'default'" @click="sizeDemo = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="激活颜色" desc="active-color 切换">
      <demo-block direction="column" :gap="16">
        <ui-switch :model-value="true" :active-color="colorDemo" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.label" size="small" :type="colorDemo === c.value ? 'primary' : 'default'" @click="colorDemo = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义值" desc="active-value / inactive-value 用 '1'/'0' 代替布尔">
      <demo-block direction="column" :gap="16">
        <ui-switch v-model="customValue" active-value="1" inactive-value="0" />
        <text class="demo-text">当前值: {{ customValue }} (类型: {{ typeof customValue }})</text>
      </demo-block>
    </demo-section>

    <demo-section title="内嵌文字" desc="active-text / inactive-text">
      <demo-block direction="column" :gap="24">
        <ui-switch v-model="textValue1" size="56rpx" active-text="开" inactive-text="关" />
        <ui-switch v-model="textValue2" size="70rpx" active-text="ON" inactive-text="OFF" />
        <ui-switch v-model="textValue3" size="80rpx" active-text="启用" inactive-text="禁用" text-size="20rpx" text-weight="600" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义节点 slot" desc="#node 替换默认圆点">
      <demo-block :cols="2" :gap="24">
        <ui-switch v-model="nodeValue1" size="50rpx">
          <template #node="{ checked }">
            <ui-icon :name="checked ? 'check' : 'cross'" size="24rpx" :color="checked ? 'success' : 'text-secondary'" />
          </template>
        </ui-switch>
        <ui-switch v-model="nodeValue2" size="50rpx">
          <template #node="{ checked }">
            <text class="emoji">{{ checked ? "🌙" : "☀️" }}</text>
          </template>
        </ui-switch>
      </demo-block>
    </demo-section>

    <demo-section title="异步控制 before-change" desc="确认后才切换">
      <demo-block direction="column" :gap="12">
        <ui-switch v-model="asyncValue" :loading="asyncLoading" :before-change="onBeforeChange" />
        <text class="demo-text">点击后 1 秒延迟生效</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="change / update:modelValue 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-switch v-model="eventValue" @change="onChange" @update:model-value="onUpdate" />
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 设置页" desc="常见设置项列表">
      <view class="settings-card">
        <view v-for="item in settings" :key="item.key" class="settings-row">
          <view class="settings-row__main">
            <text class="settings-row__title">{{ item.title }}</text>
            <text class="settings-row__desc">{{ item.desc }}</text>
          </view>
          <ui-switch v-model="item.value" />
        </view>
      </view>
    </demo-section>

    <demo-section title="综合 · 通知开关组" desc="主开关 + 子开关联动（主关时禁用子）">
      <view class="settings-card">
        <view class="settings-row">
          <view class="settings-row__main">
            <text class="settings-row__title">推送通知</text>
            <text class="settings-row__desc">允许接收消息推送</text>
          </view>
          <ui-switch v-model="notify.master" />
        </view>
        <view class="settings-row settings-row--indent">
          <view class="settings-row__main">
            <text class="settings-row__title">声音</text>
          </view>
          <ui-switch v-model="notify.sound" :disabled="!notify.master" />
        </view>
        <view class="settings-row settings-row--indent">
          <view class="settings-row__main">
            <text class="settings-row__title">震动</text>
          </view>
          <ui-switch v-model="notify.vibrate" :disabled="!notify.master" />
        </view>
        <view class="settings-row settings-row--indent">
          <view class="settings-row__main">
            <text class="settings-row__title">预览内容</text>
          </view>
          <ui-switch v-model="notify.preview" :disabled="!notify.master" />
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Switch 开关" },
})

const basic = ref(false)

const states = ["normal", "disabled", "loading"] as const
const state = ref<(typeof states)[number]>("normal")
const stateValue = ref(true)

const sizePresets = ["32rpx", "40rpx", "56rpx", "80rpx"]
const sizeDemo = ref("40rpx")
const sizeValue = ref(true)

const colorPresets = [
  { label: "primary", value: "primary" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
  { label: "danger", value: "danger" },
]
const colorDemo = ref("primary")

const customValue = ref("0")

const textValue1 = ref(true)
const textValue2 = ref(false)
const textValue3 = ref(true)

const nodeValue1 = ref(true)
const nodeValue2 = ref(false)

const asyncValue = ref(false)
const asyncLoading = ref(false)
function onBeforeChange(_value: number | string | boolean, next: (val?: number | string | boolean) => void) {
  asyncLoading.value = true
  setTimeout(() => {
    asyncLoading.value = false
    next()
  }, 1000)
}

const eventValue = ref(false)
const eventLog = ref("等待事件...")
function onChange(value: number | string | boolean) {
  eventLog.value = `[change] value=${value}`
}
function onUpdate(value: number | string | boolean) {
  eventLog.value = `[update:modelValue] value=${value}`
}

const settings = reactive([
  { key: "wifi", title: "Wi-Fi", desc: "连接无线网络", value: true },
  { key: "bt", title: "蓝牙", desc: "连接蓝牙设备", value: false },
  { key: "dark", title: "深色模式", desc: "夜间舒适模式", value: true },
  { key: "save", title: "省电模式", desc: "降低性能延长续航", value: false },
])

const notify = reactive({
  master: true,
  sound: true,
  vibrate: true,
  preview: false,
})
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.emoji {
  font-size: 24rpx;
}

.settings-card {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);
}

.settings-row {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  align-items: center;
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &--indent {
    padding-left: var(--ui-spacing-xxl);
  }

  &__main {
    gap: var(--ui-spacing-xxs);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
