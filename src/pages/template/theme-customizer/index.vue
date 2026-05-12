<template>
  <ui-config-provider :theme-vars="themeVars">
    <view class="page">
      <ui-sidebar v-model="section" class="sidebar">
        <ui-sidebar-item v-for="s in sections" :key="s.value" :name="s.value" :title="s.label" />
      </ui-sidebar>

      <view class="content">
        <!-- 主色 -->
        <view v-if="section === 'primary'" class="panel">
          <text class="panel__title">主色</text>
          <view class="swatches">
            <view v-for="c in presetColors" :key="c.value" class="swatch" :class="[primary === c.value ? 'swatch--active' : '']" :style="{ background: c.value }" @click="primary = c.value">
              <ui-icon v-if="primary === c.value" name="check" size="32rpx" color="text-inverse" />
            </view>
          </view>
          <view class="picker">
            <text class="picker__label">自定义主色</text>
            <ui-color-picker v-model="primary" />
          </view>
        </view>

        <!-- 圆角 -->
        <view v-if="section === 'radius'" class="panel">
          <text class="panel__title">圆角 ({{ radius }} rpx)</text>
          <ui-slider v-model="radius" :min="0" :max="40" :step="2" />
          <view class="preview-grid">
            <view class="preview-card" :style="{ borderRadius: `${radius}rpx` }">
              <text>预览卡片</text>
            </view>
          </view>
        </view>

        <!-- 字号 -->
        <view v-if="section === 'fontSize'" class="panel">
          <text class="panel__title">基础字号 ({{ fontSize }} rpx)</text>
          <ui-slider v-model="fontSize" :min="24" :max="36" :step="2" />
          <view class="preview-grid">
            <text class="preview-text" :style="{ fontSize: `${fontSize}rpx` }">这是一段预览文字</text>
          </view>
        </view>

        <!-- 间距 -->
        <view v-if="section === 'spacing'" class="panel">
          <text class="panel__title">间距密度</text>
          <ui-segmented v-model="density" :options="densityOptions" />
          <view class="preview-grid">
            <view v-for="i in 3" :key="i" class="preview-bar" :style="{ marginBottom: `${densityValue}rpx` }">
              <text>条目 {{ i }}</text>
            </view>
          </view>
        </view>

        <!-- 暗色模式 -->
        <view v-if="section === 'mode'" class="panel">
          <text class="panel__title">显示模式</text>
          <ui-cell-group>
            <ui-cell title="暗色模式">
              <template #value>
                <ui-switch v-model="darkMode" />
              </template>
            </ui-cell>
            <ui-cell title="跟随系统" :value="autoMode ? '已开启' : '已关闭'">
              <template #value>
                <ui-switch v-model="autoMode" />
              </template>
            </ui-cell>
          </ui-cell-group>
        </view>

        <view class="actions">
          <ui-button size="small" plain @click="onReset">重置默认</ui-button>
          <ui-button size="small" type="primary" @click="onApply">应用主题</ui-button>
        </view>
      </view>
    </view>
  </ui-config-provider>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "主题定制" },
})

const toast = useToast()

const sections = [
  { label: "主色", value: "primary" },
  { label: "圆角", value: "radius" },
  { label: "字号", value: "fontSize" },
  { label: "间距", value: "spacing" },
  { label: "模式", value: "mode" },
]
const section = ref("primary")

const presetColors = [
  { label: "靛蓝", value: "#6366f1" },
  { label: "天蓝", value: "#0ea5e9" },
  { label: "翠绿", value: "#22c55e" },
  { label: "琥珀", value: "#f59e0b" },
  { label: "玫红", value: "#f43f5e" },
  { label: "紫罗兰", value: "#a855f7" },
]
const primary = ref("#6366f1")

const radius = ref(16)
const fontSize = ref(28)

const densityOptions = [
  { label: "紧凑", value: "compact" },
  { label: "标准", value: "normal" },
  { label: "宽松", value: "loose" },
]
const density = ref("normal")
const densityValue = computed(() => ({ compact: 8, normal: 16, loose: 24 }[density.value] || 16))

const darkMode = ref(false)
const autoMode = ref(false)

const themeVars = computed(() => ({
  "color-primary": primary.value,
  "radius-md": `${radius.value}rpx`,
  "font-size-sm": `${fontSize.value}rpx`,
}))

function onReset() {
  primary.value = "#6366f1"
  radius.value = 16
  fontSize.value = 28
  density.value = "normal"
  darkMode.value = false
  toast.success("已重置")
}

function onApply() {
  toast.success("主题已应用")
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: flex;
  background: var(--ui-color-background-page);
}

.sidebar {
  width: 180rpx;
  height: 100%;
  background: var(--ui-color-background);
}

.content {
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-page);
  flex-direction: column;
}

.panel {
  gap: var(--ui-spacing-lg);
  flex: 1;
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }
}

.swatches {
  gap: var(--ui-spacing-md);
  display: flex;
  flex-wrap: wrap;
}

.swatch {
  width: 80rpx;
  border: 4rpx solid transparent;
  height: 80rpx;
  display: flex;
  box-shadow: var(--ui-shadow-xs);
  align-items: center;
  border-radius: var(--ui-radius-round);
  justify-content: center;

  &--active {
    border-color: var(--ui-color-text);
  }
}

.picker {
  gap: var(--ui-spacing-sm);
  display: flex;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.preview-grid {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;
}

.preview-card {
  color: var(--ui-color-text-inverse);
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-primary);
  text-align: center;
}

.preview-text {
  color: var(--ui-color-text);
}

.preview-bar {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-sm);
}

.actions {
  gap: var(--ui-spacing-md);
  display: flex;
  margin-top: var(--ui-spacing-lg);
}
</style>
