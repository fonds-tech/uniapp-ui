<template>
  <demo-page>
    <demo-section title="基础用法" desc="modelValue 0-100 控制进度">
      <demo-block :gap="32">
        <ui-circle :model-value="70" />
      </demo-block>
    </demo-section>

    <demo-section title="颜色与轨道" desc="color 进度色 / layerColor 轨道色 / fill 中心填充">
      <demo-block :gap="32">
        <ui-circle :model-value="70" color="#07c160" />
        <ui-circle :model-value="70" color="#ee0a24" layer-color="#fce8eb" />
        <ui-circle :model-value="70" color="#1989fa" fill="#e8f4ff" />
      </demo-block>
    </demo-section>

    <demo-section title="渐变色" desc="color 传渐变映射对象">
      <demo-block :gap="32">
        <ui-circle :model-value="70" :color="gradient" />
      </demo-block>
    </demo-section>

    <demo-section title="尺寸自适应" desc="strokeWidth / textSize 默认按 size 比例缩放">
      <demo-block :gap="32" align="center">
        <ui-circle :model-value="70" size="120rpx" />
        <ui-circle :model-value="70" size="200rpx" />
        <ui-circle :model-value="70" size="280rpx" />
        <ui-circle :model-value="70" size="360rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="覆盖线宽" desc="strokeWidth 显式覆盖默认比例">
      <demo-block :gap="32">
        <ui-circle :model-value="70" stroke-width="4rpx" text="细" />
        <ui-circle :model-value="70" stroke-width="12rpx" text="中" />
        <ui-circle :model-value="70" stroke-width="20rpx" text="粗" />
      </demo-block>
    </demo-section>

    <demo-section title="文字定制" desc="text / textSize / textColor 控制中心文字">
      <demo-block :gap="32">
        <ui-circle :model-value="70" />
        <ui-circle :model-value="70" text="自定义" />
        <ui-circle :model-value="70" text-size="44rpx" text-color="#ee0a24" />
        <ui-circle :model-value="70" :text="false" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容" desc="默认插槽完全自定义中心">
      <demo-block :gap="32">
        <ui-circle :model-value="slotRate">
          <view class="slot-content">
            <text class="slot-content__value">{{ slotRate }}</text>
            <text class="slot-content__unit">分</text>
          </view>
        </ui-circle>
      </demo-block>
    </demo-section>

    <demo-section title="起始位置" desc="startPosition 控制 0% 起点方位">
      <demo-block :cols="2" :gap="24">
        <ui-circle v-for="item in startPositions" :key="item.position" :model-value="70" size="160rpx" :start-position="item.position" :text="item.label" />
      </demo-block>
    </demo-section>

    <demo-section title="顺逆时针">
      <demo-block :gap="32">
        <ui-circle :model-value="70" text="顺时针" />
        <ui-circle :model-value="70" :clockwise="false" text="逆时针" />
      </demo-block>
    </demo-section>

    <demo-section title="端点样式" desc="strokeLinecap round / butt / square">
      <demo-block :gap="32">
        <ui-circle :model-value="70" stroke-linecap="round" text="round" />
        <ui-circle :model-value="70" stroke-linecap="butt" text="butt" />
        <ui-circle :model-value="70" stroke-linecap="square" text="square" />
      </demo-block>
    </demo-section>

    <demo-section title="动画时长" desc="duration 控制过渡毫秒；animated=false 即时绘制">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :gap="32">
          <ui-circle :model-value="durationDemo" :duration="300" text="300ms" />
          <ui-circle :model-value="durationDemo" :duration="1000" text="1000ms" />
          <ui-circle :model-value="durationDemo" :duration="2500" text="2500ms" />
          <ui-circle :model-value="durationDemo" :animated="false" text="无动画" />
        </demo-block>
        <demo-block :gap="16">
          <ui-button size="small" @click="durationDemo = 0">0%</ui-button>
          <ui-button size="small" type="primary" @click="durationDemo = 50">50%</ui-button>
          <ui-button size="small" type="success" @click="durationDemo = 100">100%</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="动态控制 + 状态色" desc="按 modelValue 切换 color">
      <demo-block direction="column" align="start" :gap="16">
        <ui-circle :model-value="dynamicRate" :color="dynamicColor" />
        <demo-block :gap="16">
          <ui-button size="small" @click="step(-10)">-10</ui-button>
          <ui-button size="small" type="primary" @click="step(10)">+10</ui-button>
          <ui-button size="small" type="success" @click="dynamicRate = 100">完成</ui-button>
          <ui-button size="small" type="warning" @click="dynamicRate = 0">重置</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="finish 事件">
      <demo-block direction="column" align="start" :gap="16">
        <ui-circle :model-value="eventRate" @finish="onFinish" />
        <demo-block :gap="16">
          <ui-button size="small" @click="eventRate = Math.max(0, eventRate - 20)">-20</ui-button>
          <ui-button size="small" type="primary" @click="eventRate = Math.min(100, eventRate + 20)">+20</ui-button>
          <ui-button size="small" type="warning" @click="eventRate = 0">重置</ui-button>
        </demo-block>
        <ui-text size="small" color="secondary">{{ eventLog }}</ui-text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "Circle 环形进度条" },
})

const toast = useToast()

const gradient = {
  "0%": "#3fecff",
  "100%": "#6149f6",
}

const startPositions = [
  { position: "top", label: "顶部" },
  { position: "right", label: "右侧" },
  { position: "bottom", label: "底部" },
  { position: "left", label: "左侧" },
] as const

const slotRate = ref(85)

const durationDemo = ref(75)

const dynamicRate = ref(50)
const dynamicColor = computed(() => {
  if (dynamicRate.value < 30) return "#ee0a24"
  if (dynamicRate.value < 70) return "#ff976a"
  return "#07c160"
})
function step(delta: number) {
  dynamicRate.value = Math.min(100, Math.max(0, dynamicRate.value + delta))
}

const eventRate = ref(40)
const eventLog = ref("点击按钮调整进度，动画完成后会触发 finish 事件")
function onFinish() {
  eventLog.value = `finish @ ${new Date().toLocaleTimeString()}`
  toast.success("动画完成")
}
</script>

<style lang="scss" scoped>
.slot-content {
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.slot-content__value {
  color: var(--ui-color-primary);
  font-size: 40rpx;
  font-weight: 600;
}

.slot-content__unit {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-left: 4rpx;
}
</style>
