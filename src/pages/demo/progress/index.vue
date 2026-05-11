<template>
  <demo-page>
    <demo-section title="基础用法" desc="拖拽控制百分比">
      <demo-block direction="column" :gap="16">
        <ui-progress :percentage="state.value" />
        <demo-block :cols="4" :gap="12">
          <ui-button size="small" @click="step(-10)">-10</ui-button>
          <ui-button size="small" @click="step(-1)">-1</ui-button>
          <ui-button size="small" type="primary" @click="step(1)">+1</ui-button>
          <ui-button size="small" type="primary" @click="step(10)">+10</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="文本位置" desc="textPosition: inside / outside / none">
      <demo-block direction="column" :gap="20">
        <view v-for="p in textPositions" :key="p" class="row">
          <text class="row__label">{{ p }}</text>
          <ui-progress :percentage="state.value" :text-position="p" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="进度条高度" desc="height 控制粗细">
      <demo-block direction="column" :gap="20">
        <view v-for="h in heights" :key="h" class="row">
          <text class="row__label">{{ h }}</text>
          <ui-progress :percentage="state.value" :height="h" :show-text="false" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="语义色" desc="color 接受语义色名">
      <demo-block direction="column" :gap="20">
        <view v-for="c in semanticColors" :key="c" class="row">
          <text class="row__label">{{ c }}</text>
          <ui-progress :percentage="state.value" :color="c" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色" desc="hex / rgba 任意色">
      <demo-block direction="column" :gap="20">
        <view v-for="c in customColors" :key="c.label" class="row">
          <text class="row__label">{{ c.label }}</text>
          <ui-progress :percentage="state.value" :color="c.value" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="渐变色" desc="color 支持 linear-gradient">
      <demo-block direction="column" :gap="20">
        <ui-progress v-for="g in gradients" :key="g" :percentage="state.value" :color="g" />
      </demo-block>
    </demo-section>

    <demo-section title="轨道背景色" desc="trackColor 自定义底色">
      <demo-block direction="column" :gap="20">
        <view v-for="t in trackPairs" :key="t.label" class="row">
          <text class="row__label">{{ t.label }}</text>
          <ui-progress :percentage="state.value" :track-color="t.track" :color="t.color" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义文本" desc="text 覆盖默认百分比">
      <demo-block direction="column" :gap="20">
        <ui-progress :percentage="state.value" :text="`${state.value}MB / 100MB`" />
        <ui-progress :percentage="state.value" text="处理中…" />
        <ui-progress :percentage="state.value">
          <template #text="{ percentage }">
            <text class="custom-pivot">{{ percentage }}/100</text>
          </template>
        </ui-progress>
      </demo-block>
    </demo-section>

    <demo-section title="文本样式" desc="textColor / textSize / textWeight">
      <demo-block direction="column" :gap="20">
        <ui-progress :percentage="state.value" text-position="outside" text-color="primary" text-size="28rpx" text-weight="600" />
        <ui-progress :percentage="state.value" text-position="outside" text-color="danger" text-size="24rpx" text-weight="500" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式" desc="customClass + customStyle">
      <demo-block direction="column" :gap="20">
        <ui-progress :percentage="state.value" :custom-style="{ borderRadius: '4rpx' }" :show-text="false" />
        <ui-progress :percentage="state.value" :custom-style="{ height: '40rpx' }" />
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:文件下载" desc="带文件名 + 速率信息">
      <demo-block direction="column" :gap="12">
        <view class="file-row">
          <text class="file-row__name">{{ download.name }}</text>
          <text class="file-row__rate">{{ download.rate }}</text>
        </view>
        <ui-progress :percentage="download.percentage" text-position="outside" color="success" />
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" @click="downloadAction('start')">{{ download.timer ? "暂停" : "开始" }}</ui-button>
          <ui-button size="small" type="warning" @click="downloadAction('reset')">重置</ui-button>
          <ui-button size="small" type="success" @click="downloadAction('complete')">完成</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:任务进度" desc="多步任务总进度 + 步骤完成度">
      <demo-block direction="column" :gap="16">
        <view v-for="(t, i) in tasks" :key="t.label" class="task-row">
          <view class="task-row__head">
            <text class="task-row__label">{{ t.label }}</text>
            <text class="task-row__status" :class="{ 'task-row__status--done': t.percentage === 100 }">
              {{ t.percentage === 100 ? "已完成" : `${t.percentage}%` }}
            </text>
          </view>
          <ui-progress :percentage="t.percentage" :color="t.percentage === 100 ? 'success' : 'primary'" :show-text="false" :height="10" />
          <ui-button size="small" type="primary" @click="advanceTask(i)">推进 +20</ui-button>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="finish 事件在跨入 100 时触发一次">
      <demo-block direction="column" :gap="12">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-progress :percentage="state.value" @finish="onFinish" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { ProgressTextPosition } from "@/uni_modules/uniapp-ui/ui-progress"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Progress 进度条" },
})

const toast = useToast()

const textPositions: ProgressTextPosition[] = ["inside", "outside", "none"]
const heights = ["8rpx", "16rpx", "24rpx", "32rpx"]
const semanticColors = ["primary", "success", "warning", "danger"]
const customColors = [
  { label: "紫色", value: "#8b5cf6" },
  { label: "粉色", value: "#ec4899" },
  { label: "青色", value: "#14b8a6" },
]
const gradients = ["linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)", "linear-gradient(90deg, #10b981 0%, #06b6d4 100%)", "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)"]
const trackPairs = [
  { label: "浅蓝", track: "#e0f2fe", color: "#0ea5e9" },
  { label: "浅黄", track: "#fef3c7", color: "#f59e0b" },
  { label: "浅红", track: "#fee2e2", color: "#ef4444" },
]

const state = reactive({ value: 50 })
const download = reactive({ name: "uniapp-ui-v1.0.zip", rate: "0 KB/s", percentage: 0, timer: 0 as number | ReturnType<typeof setInterval> })
const tasks = reactive([
  { label: "需求评审", percentage: 100 },
  { label: "设计稿", percentage: 60 },
  { label: "开发", percentage: 20 },
  { label: "测试", percentage: 0 },
])
const eventLog = ref("达到 100% 触发 finish 事件")

function step(delta: number) {
  state.value = Math.max(0, Math.min(100, state.value + delta))
}

function downloadAction(type: "start" | "reset" | "complete") {
  if (type === "reset") {
    if (download.timer) clearInterval(download.timer as number)
    download.timer = 0
    download.percentage = 0
    download.rate = "0 KB/s"
    return
  }
  if (type === "complete") {
    if (download.timer) clearInterval(download.timer as number)
    download.timer = 0
    download.percentage = 100
    download.rate = "已完成"
    return
  }
  if (download.timer) {
    clearInterval(download.timer as number)
    download.timer = 0
    download.rate = "已暂停"
    return
  }
  download.timer = setInterval(() => {
    download.percentage = Math.min(100, download.percentage + 5)
    download.rate = `${(Math.random() * 800 + 200).toFixed(0)} KB/s`
    if (download.percentage >= 100) {
      clearInterval(download.timer as number)
      download.timer = 0
      download.rate = "已完成"
    }
  }, 400)
}

function advanceTask(i: number) {
  tasks[i].percentage = Math.min(100, tasks[i].percentage + 20)
}

function onFinish() {
  eventLog.value = `[finish] 触发 @ ${new Date().toLocaleTimeString()}`
  toast.success("已完成")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.row {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-secondary);
    width: 120rpx;
    font-size: 22rpx;
    flex-shrink: 0;
  }
}

// ui-progress 在 row 内必须 flex:1，否则其 width:100% 是相对自身容器（auto 宽度）失效
.row .ui-progress {
  flex: 1;
}

.custom-pivot {
  color: var(--ui-color-text-inverse);
  padding: 0 12rpx;
  font-size: 22rpx;
  font-weight: bold;
}

.file-row {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__name {
    color: var(--ui-color-text);
    font-size: 26rpx;
  }

  &__rate {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}

.task-row {
  gap: 12rpx;
  width: 100%;
  display: flex;
  padding: 20rpx;
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__head {
    display: flex;
    justify-content: space-between;
  }

  &__label {
    color: var(--ui-color-text);
    font-size: 26rpx;
    font-weight: bold;
  }

  &__status {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;

    &--done {
      color: var(--ui-color-success);
    }
  }
}
</style>
