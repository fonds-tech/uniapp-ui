<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="24">
        <view v-for="item in basicItems" :key="item" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="basicControl.percentage" />
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="basicControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="basicControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="basicControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="线条粗细">
      <demo-block direction="column" :gap="24">
        <view v-for="item in thicknessItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="thicknessControl.percentage" :height="item.height" :show-text="false" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="thicknessControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="thicknessControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="thicknessControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="不同颜色">
      <demo-block direction="column" :gap="24">
        <view v-for="item in colorItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="colorControl.percentage" :color="item.color" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="colorControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="colorControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="colorControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义颜色 -->
    <demo-section title="自定义颜色">
      <demo-block direction="column" :gap="24">
        <view v-for="item in customColorItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="customColorControl.percentage" :color="item.color" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="customColorControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="customColorControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="customColorControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="渐变色">
      <demo-block direction="column" :gap="24">
        <view v-for="item in gradientItems" :key="item.key" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="gradientControl.percentage" :color="item.color" />
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="gradientControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="gradientControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="gradientControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：背景色 -->
    <demo-section title="轨道背景色">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义轨道背景色</text>
        <view v-for="item in trackColorItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="trackColorControl.percentage" :track-color="item.trackColor" :color="item.color" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="trackColorControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="trackColorControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="trackColorControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="显示百分比">
      <demo-block direction="column" :gap="24">
        <view class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="showTextControl.percentage" show-text />
            <text class="progress-label">默认显示</text>
          </view>
          <demo-block :gap="16" align="start">
            <ui-button size="small" @click="showTextControl.decrease">减少</ui-button>
            <ui-button size="small" type="primary" @click="showTextControl.increase">增加</ui-button>
            <ui-button size="small" type="warning" @click="showTextControl.reset">重置</ui-button>
          </demo-block>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏百分比 -->
    <demo-section title="隐藏百分比">
      <demo-block direction="column" :gap="24">
        <view class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="hideTextControl.percentage" :show-text="false" />
          </view>
          <demo-block :gap="16" align="start">
            <ui-button size="small" @click="hideTextControl.decrease">减少</ui-button>
            <ui-button size="small" type="primary" @click="hideTextControl.increase">增加</ui-button>
            <ui-button size="small" type="warning" @click="hideTextControl.reset">重置</ui-button>
          </demo-block>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义文本 -->
    <demo-section title="自定义文本">
      <demo-block direction="column" :gap="24">
        <view v-for="item in customTextItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="customTextControl.percentage" show-text :text="getCustomText(item)" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="customTextControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="customTextControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="customTextControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：文本样式 -->
    <demo-section title="文本样式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义文本颜色、大小和粗细</text>
        <view v-for="item in textStyleItems" :key="item.key" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="textStyleControl.percentage" show-text :text-color="item.textColor" :text-size="item.textSize" :text-weight="item.textWeight" />
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="textStyleControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="textStyleControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="textStyleControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="动态演示">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="dynamicControl.percentage" show-text @finish="onFinish" />
        <demo-block :gap="24">
          <ui-button size="small" @click="dynamicControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="dynamicControl.increase">增加</ui-button>
          <ui-button size="small" type="success" @click="dynamicControl.complete">完成</ui-button>
          <ui-button size="small" type="warning" @click="dynamicControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">当进度达到 100% 时触发 finish 事件</text>
        <ui-progress :percentage="eventControl.percentage" show-text @finish="onEventFinish" />
        <demo-block :gap="24">
          <ui-button size="small" @click="eventControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="eventControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="eventControl.reset">重置</ui-button>
        </demo-block>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="24">
        <view v-for="item in customStyleItems" :key="item.label" class="progress-item-group">
          <view class="progress-item">
            <ui-progress :percentage="customStyleControl.percentage" show-text :custom-class="item.customClass" :custom-style="item.customStyle" />
            <text class="progress-label">{{ item.label }}</text>
          </view>
        </view>
        <demo-block :gap="16" align="start">
          <ui-button size="small" @click="customStyleControl.decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="customStyleControl.increase">增加</ui-button>
          <ui-button size="small" type="warning" @click="customStyleControl.reset">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Progress 进度条" },
})

const toast = useToast()

interface ProgressControllerOptions {
  initial?: number
  step?: number
  resetValue?: number
}

// 用于各个 demo 的独立进度控制
function useProgressController(options: ProgressControllerOptions = {}) {
  const { initial = 50, step = 10, resetValue = initial } = options
  const control = reactive({
    percentage: initial,
    increase() {
      control.percentage = Math.min(100, control.percentage + step)
    },
    decrease() {
      control.percentage = Math.max(0, control.percentage - step)
    },
    complete() {
      control.percentage = 100
    },
    reset() {
      control.percentage = resetValue
    },
  })

  return control
}

type CustomTextType = "fixed" | "percent" | "download"

interface CustomTextItem {
  label: string
  textType: CustomTextType
  text?: string
}

const basicControl = useProgressController({ initial: 50 })
const thicknessControl = useProgressController({ initial: 50 })
const colorControl = useProgressController({ initial: 50 })
const customColorControl = useProgressController({ initial: 70 })
const gradientControl = useProgressController({ initial: 50 })
const trackColorControl = useProgressController({ initial: 70 })
const showTextControl = useProgressController({ initial: 50 })
const hideTextControl = useProgressController({ initial: 50 })
const customTextControl = useProgressController({ initial: 35 })
const textStyleControl = useProgressController({ initial: 50 })
const customStyleControl = useProgressController({ initial: 60 })
const dynamicControl = useProgressController({ initial: 50, resetValue: 0 })
const eventControl = useProgressController({ initial: 40, step: 20, resetValue: 40 })

const basicItems = ["basic-1", "basic-2", "basic-3"]

const thicknessItems = [
  { label: "8rpx", height: "8rpx" },
  { label: "16rpx", height: "16rpx" },
  { label: "24rpx", height: "24rpx" },
  { label: "32rpx", height: "32rpx" },
]

const colorItems = [
  { label: "primary", color: "primary" },
  { label: "success", color: "success" },
  { label: "warning", color: "warning" },
  { label: "danger", color: "danger" },
]

const customColorItems = [
  { label: "紫色", color: "#8b5cf6" },
  { label: "粉色", color: "#ec4899" },
  { label: "青色", color: "#14b8a6" },
]

const gradientItems = [
  {
    key: "gradient-blue",
    color: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
  },
  {
    key: "gradient-green",
    color: "linear-gradient(90deg, #10b981 0%, #06b6d4 100%)",
  },
  {
    key: "gradient-orange",
    color: "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)",
  },
]

const trackColorItems = [
  { label: "浅蓝", trackColor: "#e0f2fe", color: "#0ea5e9" },
  { label: "浅黄", trackColor: "#fef3c7", color: "#f59e0b" },
  { label: "浅红", trackColor: "#fee2e2", color: "#ef4444" },
]

const customTextItems: CustomTextItem[] = [
  { label: "固定文本", textType: "fixed", text: "已完成" },
  { label: "带百分号", textType: "percent" },
  { label: "下载进度", textType: "download" },
]

const textStyleItems = [
  {
    key: "text-style-blue",
    textColor: "#1989fa",
    textSize: "28rpx",
    textWeight: "600",
  },
  {
    key: "text-style-red",
    textColor: "#ee0a24",
    textSize: "24rpx",
    textWeight: "500",
  },
]

const customStyleItems = [
  { label: "自定义类名", customClass: "my-progress" },
  {
    label: "自定义样式",
    customStyle: { borderRadius: "0", overflow: "visible" },
  },
]

// 事件处理
const eventLog = ref("进度达到 100% 时触发 finish 事件")

function getCustomText(item: CustomTextItem) {
  if (item.textType === "fixed") return item.text ?? ""
  if (item.textType === "percent") return `${customTextControl.percentage}%`
  return `${customTextControl.percentage}MB/100MB`
}

function onFinish() {
  toast.success("已完成!")
}

function onEventFinish() {
  eventLog.value = "✅ 触发 finish 事件 - 进度已完成!"
  toast.success("进度完成!")
}
</script>

<style lang="scss" scoped>
.progress-item {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;
}

.progress-item-group {
  gap: 12rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.progress-item :deep(.ui-progress) {
  flex: 1;
  min-width: 0;
}

.progress-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  min-width: 100rpx;
  flex-shrink: 0;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

:deep(.my-progress) {
  border: 2rpx solid #1989fa;
  padding: 4rpx;
  border-radius: 16rpx;
}
</style>
