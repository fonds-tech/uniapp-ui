<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="30" />
        <ui-progress :percentage="50" />
        <ui-progress :percentage="80" />
      </demo-block>
    </demo-section>

    <demo-section title="线条粗细">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="50" height="8rpx" />
          <text class="progress-label">8rpx</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" height="16rpx" />
          <text class="progress-label">16rpx</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" height="24rpx" />
          <text class="progress-label">24rpx</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" height="32rpx" />
          <text class="progress-label">32rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="不同颜色">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="30" color="primary" />
          <text class="progress-label">primary</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="50" color="success" />
          <text class="progress-label">success</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="70" color="warning" />
          <text class="progress-label">warning</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="90" color="danger" />
          <text class="progress-label">danger</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义颜色 -->
    <demo-section title="自定义颜色">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="60" color="#8b5cf6" />
          <text class="progress-label">紫色</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="70" color="#ec4899" />
          <text class="progress-label">粉色</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="80" color="#14b8a6" />
          <text class="progress-label">青色</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="渐变色">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="percentage" color="linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)" />
        <ui-progress :percentage="percentage" color="linear-gradient(90deg, #10b981 0%, #06b6d4 100%)" />
        <ui-progress :percentage="percentage" color="linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)" />
      </demo-block>
    </demo-section>

    <!-- 新增：背景色 -->
    <demo-section title="背景色">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义轨道背景色</text>
        <view class="progress-item">
          <ui-progress :percentage="60" background="#e0f2fe" color="#0ea5e9" />
          <text class="progress-label">浅蓝</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="70" background="#fef3c7" color="#f59e0b" />
          <text class="progress-label">浅黄</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="80" background="#fee2e2" color="#ef4444" />
          <text class="progress-label">浅红</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="显示百分比">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="percentage" show-text />
          <text class="progress-label">默认显示</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：隐藏百分比 -->
    <demo-section title="隐藏百分比">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="percentage" :show-text="false" />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义文本 -->
    <demo-section title="自定义文本">
      <demo-block direction="column" :gap="24">
        <view class="progress-item">
          <ui-progress :percentage="75" show-text text="已完成" />
          <text class="progress-label">固定文本</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="percentage" show-text :text="`${percentage}%`" />
          <text class="progress-label">带百分号</text>
        </view>
        <view class="progress-item">
          <ui-progress :percentage="downloadProgress" show-text :text="`${downloadProgress}MB/100MB`" />
          <text class="progress-label">下载进度</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：文本样式 -->
    <demo-section title="文本样式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义文本颜色、大小和粗细</text>
        <ui-progress :percentage="percentage" show-text text-color="#1989fa" text-size="28rpx" text-weight="600" />
        <ui-progress :percentage="percentage" show-text text-color="#ee0a24" text-size="24rpx" text-weight="500" />
      </demo-block>
    </demo-section>

    <demo-section title="动态演示">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="percentage" show-text @finish="onFinish" />
        <demo-block :gap="24">
          <ui-button size="small" @click="decrease">减少</ui-button>
          <ui-button size="small" type="primary" @click="increase">增加</ui-button>
          <ui-button size="small" type="success" @click="percentage = 100">完成</ui-button>
          <ui-button size="small" type="warning" @click="percentage = 0">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">当进度达到 100% 时触发 finish 事件</text>
        <ui-progress :percentage="eventPercentage" show-text @finish="onEventFinish" />
        <demo-block :gap="24">
          <ui-button size="small" @click="eventPercentage = Math.max(0, eventPercentage - 20)">-20</ui-button>
          <ui-button size="small" @click="eventPercentage = Math.min(100, eventPercentage + 20)">+20</ui-button>
          <ui-button size="small" type="primary" @click="eventPercentage = 100">完成</ui-button>
        </demo-block>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="24">
        <ui-progress :percentage="60" show-text custom-class="my-progress" />
        <ui-progress :percentage="70" show-text :custom-style="{ borderRadius: '0', overflow: 'visible' }" />
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 文件上传 -->
    <demo-section title="综合示例 - 文件上传">
      <demo-block direction="column" :gap="16">
        <view class="upload-box">
          <view class="upload-info">
            <ui-icon name="document" size="40rpx" color="#1989fa" />
            <view class="upload-detail">
              <text class="upload-name">example_file.zip</text>
              <text class="upload-size">{{ uploadProgress }}% - {{ (uploadProgress * 1.28).toFixed(1) }}MB / 128MB</text>
            </view>
          </view>
          <ui-progress :percentage="uploadProgress" height="8rpx" color="linear-gradient(90deg, #1989fa 0%, #07c160 100%)" :show-text="false" />
        </view>
        <demo-block :gap="24">
          <ui-button v-if="!isUploading" size="small" type="primary" @click="startUpload">开始上传</ui-button>
          <ui-button v-else size="small" type="warning" @click="pauseUpload">暂停</ui-button>
          <ui-button size="small" @click="resetUpload">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 任务完成度 -->
    <demo-section title="综合示例 - 任务完成度">
      <demo-block direction="column" :gap="16">
        <view v-for="(task, index) in tasks" :key="index" class="task-item">
          <view class="task-header">
            <text class="task-name">{{ task.name }}</text>
            <text class="task-percent" :style="{ color: getTaskColor(task.progress) }">{{ task.progress }}%</text>
          </view>
          <ui-progress :percentage="task.progress" height="12rpx" :color="getTaskColor(task.progress)" :show-text="false" />
        </view>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 步骤进度 -->
    <demo-section title="综合示例 - 步骤进度">
      <demo-block direction="column" :gap="16">
        <view class="step-progress">
          <view class="step-info">
            <text class="step-title">订单处理进度</text>
            <text class="step-desc">当前步骤: {{ currentStep }}/4</text>
          </view>
          <ui-progress
            :percentage="stepPercentage"
            height="16rpx"
            color="linear-gradient(90deg, #1989fa 0%, #8b5cf6 100%)"
            show-text
            :text="stepText"
            text-color="#1989fa"
            text-size="24rpx"
            text-weight="600"
          />
          <view class="step-labels">
            <text v-for="step in stepLabels" :key="step" class="step-label" :class="{ 'step-label--active': stepLabels.indexOf(step) < currentStep }">{{ step }}</text>
          </view>
        </view>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="currentStep = 1">步骤1</ui-button>
          <ui-button size="small" @click="currentStep = 2">步骤2</ui-button>
          <ui-button size="small" @click="currentStep = 3">步骤3</ui-button>
          <ui-button size="small" type="success" @click="currentStep = 4">完成</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 综合示例 - 技能展示 -->
    <demo-section title="综合示例 - 技能展示">
      <demo-block direction="column" :gap="16">
        <view v-for="(skill, index) in skills" :key="index" class="skill-item">
          <view class="skill-info">
            <text class="skill-name">{{ skill.name }}</text>
            <text class="skill-level">{{ skill.level }}</text>
          </view>
          <ui-progress :percentage="skill.percentage" height="10rpx" :color="skill.color" background="#f5f5f5" :show-text="false" />
        </view>
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

// 基础进度
const percentage = ref(50)

function increase() {
  percentage.value = Math.min(100, percentage.value + 10)
}

function decrease() {
  percentage.value = Math.max(0, percentage.value - 10)
}

function onFinish() {
  toast.success("已完成!")
}

// 下载进度示例
const downloadProgress = ref(35)

// 事件处理
const eventPercentage = ref(40)
const eventLog = ref("进度达到 100% 时触发 finish 事件")

function onEventFinish() {
  eventLog.value = "✅ 触发 finish 事件 - 进度已完成!"
  toast.success("进度完成!")
}

// 文件上传示例
const uploadProgress = ref(0)
const isUploading = ref(false)
let uploadTimer: ReturnType<typeof setInterval> | null = null

function startUpload() {
  isUploading.value = true
  uploadTimer = setInterval(() => {
    if (uploadProgress.value >= 100) {
      pauseUpload()
      toast.success("上传完成!")
      return
    }
    uploadProgress.value += Math.floor(Math.random() * 5) + 1
    uploadProgress.value = Math.min(100, uploadProgress.value)
  }, 200)
}

function pauseUpload() {
  isUploading.value = false
  if (uploadTimer) {
    clearInterval(uploadTimer)
    uploadTimer = null
  }
}

function resetUpload() {
  pauseUpload()
  uploadProgress.value = 0
}

// 任务完成度示例
const tasks = ref([
  { name: "需求分析", progress: 100 },
  { name: "UI 设计", progress: 85 },
  { name: "前端开发", progress: 60 },
  { name: "后端开发", progress: 40 },
  { name: "测试部署", progress: 15 },
])

function getTaskColor(progress: number) {
  if (progress >= 100) return "#07c160"
  if (progress >= 60) return "#1989fa"
  if (progress >= 30) return "#ff9500"
  return "#ee0a24"
}

// 步骤进度示例
const currentStep = ref(2)
const stepLabels = ["下单", "支付", "发货", "完成"]

const stepPercentage = computed(() => (currentStep.value / 4) * 100)
const stepText = computed(() => `${currentStep.value}/4 步`)

// 技能展示示例
const skills = ref([
  { name: "Vue.js", level: "精通", percentage: 95, color: "#42b883" },
  { name: "TypeScript", level: "熟练", percentage: 85, color: "#3178c6" },
  { name: "React", level: "熟练", percentage: 80, color: "#61dafb" },
  { name: "Node.js", level: "了解", percentage: 65, color: "#68a063" },
  { name: "Python", level: "入门", percentage: 45, color: "#3776ab" },
])
</script>

<style lang="scss" scoped>
.progress-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
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

.upload-box {
  padding: 24rpx;
  background: #f7f8fa;
  border-radius: 12rpx;
}

.upload-info {
  gap: 16rpx;
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.upload-detail {
  gap: 4rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.upload-name {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 500;
}

.upload-size {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.task-item {
  padding: 16rpx 0;
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
  justify-content: space-between;
}

.task-name {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
}

.task-percent {
  font-size: 26rpx;
  font-weight: 500;
}

.step-progress {
  padding: 24rpx;
  background: #f7f8fa;
  border-radius: 12rpx;
}

.step-info {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  justify-content: space-between;
}

.step-title {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 600;
}

.step-desc {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.step-labels {
  display: flex;
  margin-top: 12rpx;
  justify-content: space-between;
}

.step-label {
  color: var(--ui-color-text-placeholder);
  font-size: 22rpx;

  &--active {
    color: #1989fa;
    font-weight: 500;
  }
}

.skill-item {
  padding: 12rpx 0;
}

.skill-info {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
  justify-content: space-between;
}

.skill-name {
  color: var(--ui-color-text-primary);
  font-size: 28rpx;
  font-weight: 500;
}

.skill-level {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

:deep(.my-progress) {
  border: 2rpx solid #1989fa;
  padding: 4rpx;
  border-radius: 16rpx;
}
</style>
