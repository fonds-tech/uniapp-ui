<template>
  <demo-page>
    <demo-section title="基础用法" desc="单滑块默认 0-100，步长 1">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="basic" />
        <text class="demo-text">当前值：{{ basic }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="范围 / 步长" desc="切换按钮调整 min/max/step">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="rangeStep.value" :min="rangeStep.min" :max="rangeStep.max" :step="rangeStep.step" />
        <text class="demo-text">{{ rangeStep.value }}（范围 {{ rangeStep.min }} ~ {{ rangeStep.max }}，步长 {{ rangeStep.step }}）</text>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="p in rangePresets" :key="p.label" size="small" :type="rangeStep.min === p.min && rangeStep.max === p.max ? 'primary' : 'default'" @click="applyRangePreset(p)">
            {{ p.label }}
          </ui-button>
        </demo-block>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="s in stepPresets" :key="s" size="small" :type="rangeStep.step === s ? 'primary' : 'default'" @click="rangeStep.step = s">
            步 {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="范围选择 range" desc="双滑块；拖动越过另一 handle 时自动交换">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="rangeValue" range />
        <text class="demo-text">{{ rangeValue[0] }} ~ {{ rangeValue[1] }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="size 预设 + barHeight/handleSize 自定义覆盖">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="sizeDemo.value" :size="sizeDemo.size" :bar-height="sizeDemo.barHeight" :handle-size="sizeDemo.handleSize" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in sizes" :key="s" size="small" :type="sizeDemo.size === s && !sizeDemo.barHeight ? 'primary' : 'default'" @click="applySize(s)">
            {{ s }}
          </ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="sizeDemo.barHeight === '16rpx' ? 'primary' : 'default'" @click="applyCustomSize('16rpx', '60rpx')">细轨 16rpx</ui-button>
          <ui-button size="small" :type="sizeDemo.barHeight === '24rpx' ? 'primary' : 'default'" @click="applyCustomSize('24rpx', '80rpx')">粗轨 24rpx</ui-button>
          <ui-button size="small" :type="sizeDemo.handleSize === '120rpx' ? 'primary' : 'default'" @click="applyCustomSize('20rpx', '120rpx')">大把手 120rpx</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="颜色" desc="active / inactive / handle 三色独立切换">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="colorDemo.value" :active-color="colorDemo.active" :inactive-color="colorDemo.inactive" :handle-color="colorDemo.handle" />
        <text class="demo-label">激活色</text>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in activeColors" :key="c.value" size="small" :type="colorDemo.active === c.value ? 'primary' : 'default'" @click="colorDemo.active = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
        <text class="demo-label">非激活色</text>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="c in inactiveColors" :key="c.value" size="small" :type="colorDemo.inactive === c.value ? 'primary' : 'default'" @click="colorDemo.inactive = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
        <text class="demo-label">把手色</text>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="c in handleColors" :key="c.value" size="small" :type="colorDemo.handle === c.value ? 'primary' : 'default'" @click="colorDemo.handle = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="显示值" desc="showValueMode 三态 + 自定义 formatValue">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="showDemo.value" :show-value-mode="showDemo.mode" :format-value="showDemo.format ? formatPercent : undefined" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="m in showModes" :key="m" size="small" :type="showDemo.mode === m ? 'primary' : 'default'" @click="showDemo.mode = m">
            {{ m }}
          </ui-button>
        </demo-block>
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" :type="!showDemo.format ? 'primary' : 'default'" @click="showDemo.format = false">原值</ui-button>
          <ui-button size="small" :type="showDemo.format ? 'primary' : 'default'" @click="showDemo.format = true">百分号</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="刻度 marks" desc="纯刻度点 / 带 label / 自定义 label 样式">
      <demo-block direction="column" :gap="24">
        <view>
          <text class="demo-label">纯刻度点（无 label）</text>
          <ui-slider v-model="marksA" :marks="{ 0: '', 25: '', 50: '', 75: '', 100: '' }" />
        </view>
        <view>
          <text class="demo-label">带 label</text>
          <ui-slider
            v-model="marksB"
            :marks="{ 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }"
          />
        </view>
        <view>
          <text class="demo-label">自定义 label 样式</text>
          <ui-slider
            v-model="marksC"
            :marks="{
              0: { label: '冷', style: { color: '#1989fa', fontWeight: '600' } },
              50: { label: '温', style: { color: '#ff976a', fontWeight: '600' } },
              100: { label: '热', style: { color: '#ee0a24', fontWeight: '600' } },
            }"
          />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="垂直方向" desc="单 / range / 带 marks 三例">
      <demo-block :gap="32" justify="center">
        <view class="vertical-wrap">
          <ui-slider v-model="vert1" vertical />
          <text class="demo-text">{{ vert1 }}</text>
        </view>
        <view class="vertical-wrap">
          <ui-slider v-model="vert2" vertical range />
          <text class="demo-text">{{ vert2[0] }}~{{ vert2[1] }}</text>
        </view>
        <view class="vertical-wrap">
          <ui-slider v-model="vert3" vertical show-value-mode="always" :marks="{ 0: '低', 50: '中', 100: '高' }" />
          <text class="demo-text">marks</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="状态" desc="normal / disabled / readonly 切换">
      <demo-block direction="column" :gap="16">
        <ui-slider v-model="stateDemo.value" :disabled="stateDemo.state === 'disabled'" :readonly="stateDemo.state === 'readonly'" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in states" :key="s" size="small" :type="stateDemo.state === s ? 'primary' : 'default'" @click="stateDemo.state = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义把手 slot" desc="单 #handle / 范围 #left-handle / #right-handle">
      <demo-block direction="column" :gap="24">
        <view>
          <text class="demo-label">单滑块自定义</text>
          <ui-slider v-model="slotSingle">
            <template #handle="{ value, dragging }">
              <view class="custom-handle" :class="{ 'custom-handle--dragging': dragging }">{{ value }}</view>
            </template>
          </ui-slider>
        </view>
        <view>
          <text class="demo-label">范围左右独立把手</text>
          <ui-slider v-model="slotRange" range>
            <template #left-handle="{ value }">
              <view class="custom-handle custom-handle--left">{{ value }}</view>
            </template>
            <template #right-handle="{ value }">
              <view class="custom-handle custom-handle--right">{{ value }}</view>
            </template>
          </ui-slider>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="drag-start / change / drag-end / update:modelValue 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-slider v-model="eventValue" @drag-start="onDragStart" @change="onChange" @drag-end="onDragEnd" @update:model-value="onUpdate" />
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 reset" desc="按钮触发暴露的 reset()，回到当前 v-model">
      <demo-block direction="column" :gap="16">
        <ui-slider ref="resetRef" v-model="resetValue" />
        <demo-block :cols="2" :gap="12">
          <ui-button size="small" @click="resetValue = 80">外部改值 = 80</ui-button>
          <ui-button size="small" type="primary" @click="onReset">调用 reset()</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="综合场景 · 音量调节" desc="左侧图标 + 滑块 + 数值；常见系统控制条">
      <demo-block direction="column" :gap="12">
        <view class="scene-row">
          <ui-icon :name="volume > 0 ? 'volume-line' : 'volume-mute-line'" size="40rpx" color="text" />
          <view class="scene-row__slider">
            <ui-slider v-model="volume" active-color="primary" />
          </view>
          <text class="scene-row__value">{{ volume }}</text>
        </view>
        <view class="scene-row">
          <ui-icon name="sun-line" size="40rpx" color="warning" />
          <view class="scene-row__slider">
            <ui-slider v-model="brightness" active-color="warning" />
          </view>
          <text class="scene-row__value">{{ brightness }}%</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合场景 · 价格区间筛选" desc="电商筛选页常用：双滑块 + 文字回显 + 步长 10">
      <demo-block direction="column" :gap="16">
        <view class="price-range">
          <text class="price-range__value">¥{{ priceRange[0] }}</text>
          <text class="price-range__sep">—</text>
          <text class="price-range__value">¥{{ priceRange[1] }}</text>
        </view>
        <ui-slider v-model="priceRange" range :min="0" :max="2000" :step="50" active-color="danger" />
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="p in pricePresets" :key="p.label" size="small" @click="priceRange = p.value">
            {{ p.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="综合场景 · 字号调整" desc="设置页常见：实时预览 + 文字示例 + 离散刻度">
      <demo-block direction="column" :gap="16">
        <view class="font-preview" :style="{ fontSize: `${fontSize}rpx` }">示例文字 AaBbCc 123</view>
        <ui-slider
          v-model="fontSize"
          :min="24"
          :max="48"
          :step="4"
          show-value-mode="always"
          :format-value="formatFontSize"
          :marks="{ 24: '小', 32: '标准', 40: '大', 48: '特大' }"
        />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SliderSize, SliderInstance, SliderShowValueMode } from "@/uni_modules/uniapp-ui/ui-slider"
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Slider 滑块" },
})

// 基础用法
const basic = ref(50)

// 范围 / 步长
const rangeStep = reactive({ value: 50, min: 0, max: 100, step: 1 })
const rangePresets = [
  { label: "0 ~ 100", min: 0, max: 100 },
  { label: "0 ~ 200", min: 0, max: 200 },
  { label: "-50 ~ 50", min: -50, max: 50 },
]
const stepPresets = [1, 5, 10, 25]
function applyRangePreset(p: { min: number; max: number }) {
  rangeStep.min = p.min
  rangeStep.max = p.max
  rangeStep.value = Math.min(Math.max(rangeStep.value, p.min), p.max)
}

// 范围选择
const rangeValue = ref<[number, number]>([20, 80])

// 尺寸
const sizes: SliderSize[] = ["small", "medium", "large"]
const sizeDemo = reactive<{ value: number; size: SliderSize; barHeight: string | undefined; handleSize: string | undefined }>({
  value: 40,
  size: "medium",
  barHeight: undefined,
  handleSize: undefined,
})
function applySize(s: SliderSize) {
  sizeDemo.size = s
  sizeDemo.barHeight = undefined
  sizeDemo.handleSize = undefined
}
function applyCustomSize(bar: string, handle: string) {
  sizeDemo.barHeight = bar
  sizeDemo.handleSize = handle
}

// 颜色
const colorDemo = reactive({ value: 60, active: "primary", inactive: "", handle: "" })
const activeColors = [
  { label: "默认", value: "primary" },
  { label: "成功", value: "success" },
  { label: "警告", value: "warning" },
  { label: "危险", value: "danger" },
]
const inactiveColors = [
  { label: "默认", value: "" },
  { label: "浅灰", value: "#ebedf0" },
  { label: "蓝灰", value: "#dbeafe" },
]
const handleColors = [
  { label: "默认", value: "" },
  { label: "黑", value: "#1f1f1f" },
  { label: "主色", value: "primary" },
]

// 显示值
const showModes: SliderShowValueMode[] = ["always", "dragging", "never"]
const showDemo = reactive<{ value: number; mode: SliderShowValueMode; format: boolean }>({
  value: 50,
  mode: "always",
  format: false,
})
function formatPercent(v: number) {
  return `${v}%`
}

// 刻度
const marksA = ref(40)
const marksB = ref(50)
const marksC = ref(70)

// 垂直
const vert1 = ref(40)
const vert2 = ref<[number, number]>([30, 70])
const vert3 = ref(60)

// 状态
const states = ["normal", "disabled", "readonly"] as const
const stateDemo = reactive<{ value: number; state: (typeof states)[number] }>({ value: 60, state: "normal" })

// 把手 slot
const slotSingle = ref(40)
const slotRange = ref<[number, number]>([25, 75])

// 事件回显
const eventValue = ref(50)
const eventLog = ref("等待事件...")
function onDragStart(value: number | [number, number], index: number) {
  eventLog.value = `[drag-start] value=${value}, index=${index}`
}
function onChange(value: number | [number, number]) {
  eventLog.value = `[change] value=${value}`
}
function onDragEnd(value: number | [number, number], index: number) {
  eventLog.value = `[drag-end] value=${value}, index=${index}`
}
function onUpdate(value: number | [number, number]) {
  eventLog.value = `[update:modelValue] value=${value}`
}

// 实例方法
const resetRef = ref<SliderInstance>()
const resetValue = ref(30)
function onReset() {
  resetRef.value?.reset()
}

// 综合：音量 / 亮度
const volume = ref(70)
const brightness = ref(45)

// 综合：价格区间
const priceRange = ref<[number, number]>([200, 1500])
const pricePresets = [
  { label: "0~500", value: [0, 500] as [number, number] },
  { label: "500~1000", value: [500, 1000] as [number, number] },
  { label: "1000~1500", value: [1000, 1500] as [number, number] },
  { label: "全部", value: [0, 2000] as [number, number] },
]

// 综合：字号
const fontSize = ref(32)
function formatFontSize(v: number) {
  return `${v}rpx`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.demo-label {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-sm);
  margin-bottom: var(--ui-spacing-sm);
}

.vertical-wrap {
  gap: var(--ui-spacing-sm);
  height: 400rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.scene-row {
  gap: var(--ui-spacing-md);
  display: flex;
  align-items: center;

  &__slider {
    flex: 1;
  }

  &__value {
    color: var(--ui-color-text-secondary);
    width: 80rpx;
    font-size: var(--ui-font-size-sm);
    text-align: right;
  }
}

.price-range {
  gap: var(--ui-spacing-sm);
  display: flex;
  align-items: center;
  justify-content: center;

  &__value {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__sep {
    color: var(--ui-color-text-tertiary);
  }
}

.font-preview {
  color: var(--ui-color-text);
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background-section);
  text-align: center;
  border-radius: var(--ui-radius-md);
}

.custom-handle {
  color: var(--ui-color-text-inverse);
  width: 60rpx;
  height: 60rpx;
  display: flex;
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-primary);
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--dragging {
    transform: scale(1.2);
  }

  &--left {
    background: var(--ui-color-success);
  }

  &--right {
    background: var(--ui-color-danger);
  }
}
</style>
