<template>
  <demo-page>
    <demo-section title="基础用法" desc="右下角显示一个浮动按钮" />

    <demo-section title="按钮类型">
      <demo-block :cols="5" :gap="16">
        <ui-button size="small" :type="currentType === 'primary' ? 'primary' : 'default'" @click="currentType = 'primary'">Primary</ui-button>
        <ui-button size="small" :type="currentType === 'success' ? 'primary' : 'default'" @click="currentType = 'success'">Success</ui-button>
        <ui-button size="small" :type="currentType === 'warning' ? 'primary' : 'default'" @click="currentType = 'warning'">Warning</ui-button>
        <ui-button size="small" :type="currentType === 'danger' ? 'primary' : 'default'" @click="currentType = 'danger'">Danger</ui-button>
        <ui-button size="small" :type="currentType === 'default' ? 'primary' : 'default'" @click="currentType = 'default'">Default</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标">
      <demo-block :cols="4" :gap="24">
        <ui-button size="small" @click="currentIcon = 'plus'">Plus</ui-button>
        <ui-button size="small" @click="currentIcon = 'edit'">Edit</ui-button>
        <ui-button size="small" @click="currentIcon = 'message'">Message</ui-button>
        <ui-button size="small" @click="currentIcon = 'share'">Share</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="带文字">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="showText" />
        <text class="switch-label">{{ showText ? "显示文字" : "隐藏文字" }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：按钮尺寸 -->
    <demo-section title="按钮尺寸">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 size 设置按钮尺寸（宽高相同）</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentSize = '80rpx'">小 (80rpx)</ui-button>
          <ui-button size="small" @click="currentSize = '100rpx'">中 (100rpx)</ui-button>
          <ui-button size="small" @click="currentSize = '120rpx'">大 (120rpx)</ui-button>
        </demo-block>
        <text class="demo-text">当前尺寸: {{ currentSize }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义宽高 -->
    <demo-section title="自定义宽高">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 width/height 单独设置宽高</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="toggleCustomSize(false)">正方形</ui-button>
          <ui-button size="small" @click="toggleCustomSize(true)">长方形</ui-button>
        </demo-block>
        <text class="demo-text">{{ useCustomSize ? '当前: 160rpx × 80rpx' : '当前: 100rpx × 100rpx' }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：按钮位置 -->
    <demo-section title="按钮位置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 position 设置按钮位置</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="currentPosition = 'right-bottom'">右下角</ui-button>
          <ui-button size="small" @click="currentPosition = 'left-bottom'">左下角</ui-button>
          <ui-button size="small" @click="currentPosition = 'right-top'">右上角</ui-button>
          <ui-button size="small" @click="currentPosition = 'left-top'">左上角</ui-button>
        </demo-block>
        <text class="demo-text">当前位置: {{ currentPosition }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义距离 -->
    <demo-section title="自定义距离">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 right/bottom/left/top 设置距离边缘的距离</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentOffset = 24">24rpx</ui-button>
          <ui-button size="small" @click="currentOffset = 48">48rpx</ui-button>
          <ui-button size="small" @click="currentOffset = 80">80rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前距离: {{ currentOffset }}rpx</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义颜色 -->
    <demo-section title="自定义颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 color 设置自定义背景色</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="customColor = ''">默认</ui-button>
          <ui-button size="small" @click="customColor = '#ff6b6b'">红色</ui-button>
          <ui-button size="small" @click="customColor = '#4ecdc4'">青色</ui-button>
          <ui-button size="small" @click="customColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">渐变</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：图标样式 -->
    <demo-section title="图标样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 icon-color 和 icon-size 设置图标样式</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="iconStyle = { color: '#fff', size: '40rpx' }">默认</ui-button>
          <ui-button size="small" @click="iconStyle = { color: '#ffe66d', size: '48rpx' }">黄色大图标</ui-button>
          <ui-button size="small" @click="iconStyle = { color: '#a8e6cf', size: '32rpx' }">绿色小图标</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：文字样式 -->
    <demo-section title="文字样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 text-color 和 text-size 设置文字样式</text>
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="textStyle = { color: '#fff', size: '' }">默认</ui-button>
          <ui-button size="small" @click="textStyle = { color: '#ffe66d', size: '28rpx' }">自定义</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：阴影样式 -->
    <demo-section title="阴影样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 shadow 设置阴影样式</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentShadow = 'default'">默认</ui-button>
          <ui-button size="small" @click="currentShadow = 'large'">大阴影</ui-button>
          <ui-button size="small" @click="currentShadow = 'none'">无阴影</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：圆角大小 -->
    <demo-section title="圆角大小">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 border-radius 设置圆角大小</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentRadius = ''">圆形</ui-button>
          <ui-button size="small" @click="currentRadius = '24rpx'">圆角</ui-button>
          <ui-button size="small" @click="currentRadius = '8rpx'">小圆角</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：禁用状态 -->
    <demo-section title="禁用状态">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="isDisabled" />
        <text class="switch-label">{{ isDisabled ? "已禁用" : "正常" }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：加载状态 -->
    <demo-section title="加载状态">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="isLoading" />
        <text class="switch-label">{{ isLoading ? "加载中" : "正常" }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentZIndex = 50">z-index: 50</ui-button>
          <ui-button size="small" @click="currentZIndex = 100">z-index: 100</ui-button>
          <ui-button size="small" @click="currentZIndex = 999">z-index: 999</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- 新增：安全区域 -->
    <demo-section title="安全区域">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="useSafeArea" />
        <text class="switch-label">{{ useSafeArea ? "适配底部安全区" : "不适配安全区" }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="useCustomStyle = false">默认样式</ui-button>
          <ui-button size="small" @click="useCustomStyle = true">自定义样式</ui-button>
        </demo-block>
        <text class="demo-text">{{ useCustomStyle ? '使用 customClass 和 customStyle' : '默认样式' }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">点击下方按钮查看不同场景的浮动按钮</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" type="primary" @click="showSceneButton('add')">添加按钮</ui-button>
          <ui-button size="small" type="primary" @click="showSceneButton('service')">客服按钮</ui-button>
          <ui-button size="small" type="primary" @click="showSceneButton('feedback')">反馈按钮</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <!-- Placeholder Content -->
    <demo-section v-for="i in 6" :key="i" :title="`占位内容 ${i}`" desc="滚动页面查看浮动按钮效果" />

    <!-- Float Button -->
    <ui-float-button
      :type="customColor ? 'default' : currentType"
      :icon="currentIcon"
      :text="showText ? '添加' : ''"
      :size="useCustomSize ? undefined : currentSize"
      :width="useCustomSize ? '160rpx' : undefined"
      :height="useCustomSize ? '80rpx' : undefined"
      :position="currentPosition"
      :right="currentPosition.includes('right') ? `${currentOffset}rpx` : undefined"
      :bottom="currentPosition.includes('bottom') ? `${currentOffset + 50}rpx` : undefined"
      :left="currentPosition.includes('left') ? `${currentOffset}rpx` : undefined"
      :top="currentPosition.includes('top') ? `${currentOffset + 100}rpx` : undefined"
      :z-index="currentZIndex"
      :color="customColor"
      :icon-color="iconStyle.color"
      :icon-size="iconStyle.size"
      :text-color="textStyle.color"
      :text-size="textStyle.size"
      :shadow="shadowValue"
      :border-radius="currentRadius"
      :disabled="isDisabled"
      :loading="isLoading"
      :safe-area-bottom="useSafeArea"
      :custom-class="useCustomStyle ? 'my-float-button' : ''"
      :custom-style="useCustomStyle ? { border: '4rpx solid #fff' } : {}"
      @click="onClick"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "FloatButton 浮动按钮" },
})

const toast = useToast()

// 基础状态
const currentType = ref("primary")
const currentIcon = ref("plus")
const showText = ref(false)

// 尺寸
const currentSize = ref("100rpx")
const useCustomSize = ref(false)

// 位置
const currentPosition = ref("right-bottom")
const currentOffset = ref(24)

// 颜色
const customColor = ref("")

// 图标样式
const iconStyle = ref({ color: "#fff", size: "40rpx" })

// 文字样式
const textStyle = ref({ color: "#fff", size: "" })

// 阴影
const currentShadow = ref("default")
const shadowValue = computed(() => {
  switch (currentShadow.value) {
    case "large":
      return "0 8rpx 32rpx 0 rgba(0, 0, 0, 0.3)"
    case "none":
      return "none"
    default:
      return "0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2)"
  }
})

// 圆角
const currentRadius = ref("")

// 状态
const isDisabled = ref(false)
const isLoading = ref(false)

// 层级
const currentZIndex = ref(100)

// 安全区域
const useSafeArea = ref(true)

// 自定义样式
const useCustomStyle = ref(false)

// 切换自定义尺寸
function toggleCustomSize(custom: boolean) {
  useCustomSize.value = custom
}

// 点击事件
function onClick() {
  if (isLoading.value) {
    toast.text("加载中，请稍候...")
    return
  }
  toast.success("点击了浮动按钮")
}

// 场景示例
function showSceneButton(scene: string) {
  switch (scene) {
    case "add":
      currentIcon.value = "plus"
      currentType.value = "primary"
      showText.value = false
      customColor.value = ""
      break
    case "service":
      currentIcon.value = "chat"
      currentType.value = "success"
      showText.value = true
      customColor.value = ""
      break
    case "feedback":
      currentIcon.value = "message"
      currentType.value = "warning"
      showText.value = true
      customColor.value = ""
      break
  }
  toast.text(`已切换到${scene === "add" ? "添加" : scene === "service" ? "客服" : "反馈"}按钮`)
}
</script>

<style lang="scss" scoped>
.switch-label {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
  margin-left: 16rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

:deep(.my-float-button) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
