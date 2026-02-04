<template>
  <demo-page>
    <demo-section title="基础用法" desc="右下角显示一个浮动按钮" />

    <demo-section title="按钮类型">
      <demo-block :cols="3" :gap="12">
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

    <demo-section title="显示/隐藏">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="showButton" />
        <text class="switch-label">{{ showButton ? "显示按钮" : "隐藏按钮" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="可拖拽">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block align="center" :gap="16">
          <ui-switch v-model="draggable" />
          <text class="switch-label">{{ draggable ? "可拖拽" : "固定位置" }}</text>
        </demo-block>
        <demo-block v-if="draggable" :cols="4" :gap="12">
          <ui-button size="small" :type="magnetic === false ? 'primary' : 'default'" @click="magnetic = false">无吸附</ui-button>
          <ui-button size="small" :type="magnetic === 'x' ? 'primary' : 'default'" @click="magnetic = 'x'">X轴吸附</ui-button>
          <ui-button size="small" :type="magnetic === 'y' ? 'primary' : 'default'" @click="magnetic = 'y'">Y轴吸附</ui-button>
          <ui-button size="small" :type="magnetic === 'both' ? 'primary' : 'default'" @click="magnetic = 'both'">双向吸附</ui-button>
        </demo-block>
        <demo-block v-if="draggable" align="center" :gap="16">
          <ui-switch v-model="dragBoundary" />
          <text class="switch-label">{{ dragBoundary ? "限制在屏幕内" : "无边界限制" }}</text>
        </demo-block>
        <text v-if="dragInfo" class="demo-text">{{ dragInfo }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="按钮尺寸">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentSize = '80rpx'">小 (80rpx)</ui-button>
          <ui-button size="small" @click="currentSize = '100rpx'">中 (100rpx)</ui-button>
          <ui-button size="small" @click="currentSize = '120rpx'">大 (120rpx)</ui-button>
        </demo-block>
        <text class="demo-text">当前尺寸: {{ currentSize }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="按钮位置">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="2" :gap="24">
          <ui-button size="small" @click="currentPosition = 'right-bottom'">右下角</ui-button>
          <ui-button size="small" @click="currentPosition = 'left-bottom'">左下角</ui-button>
          <ui-button size="small" @click="currentPosition = 'right-top'">右上角</ui-button>
          <ui-button size="small" @click="currentPosition = 'left-top'">左上角</ui-button>
        </demo-block>
        <text class="demo-text">当前位置: {{ currentPosition }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">背景色:</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="customColor = ''">默认</ui-button>
          <ui-button size="small" @click="customColor = '#ff6b6b'">红色</ui-button>
          <ui-button size="small" @click="customColor = '#4ecdc4'">青色</ui-button>
          <ui-button size="small" @click="customColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">渐变</ui-button>
        </demo-block>
        <text class="demo-text">前景色 (图标/文字):</text>
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="foregroundColor = '#fff'">白色</ui-button>
          <ui-button size="small" @click="foregroundColor = '#333'">黑色</ui-button>
          <ui-button size="small" @click="foregroundColor = '#ffd700'">金色</ui-button>
          <ui-button size="small" @click="foregroundColor = '#ff69b4'">粉色</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="图标大小">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="iconSize = '32rpx'">小 (32rpx)</ui-button>
        <ui-button size="small" @click="iconSize = '40rpx'">中 (40rpx)</ui-button>
        <ui-button size="small" @click="iconSize = '52rpx'">大 (52rpx)</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="isDisabled" />
        <text class="switch-label">{{ isDisabled ? "已禁用" : "正常" }}</text>
      </demo-block>
    </demo-section>

    <demo-section v-for="i in 4" :key="i" :title="`占位内容 ${i}`" desc="滚动页面查看浮动按钮效果" />

    <ui-float-button
      :show="showButton"
      :type="customColor ? 'default' : currentType"
      :icon="currentIcon"
      :text="showText ? '添加' : ''"
      :size="currentSize"
      :position="currentPosition"
      :offset-x="24"
      :offset-y="150"
      :color="customColor"
      :foreground-color="foregroundColor"
      :icon-size="iconSize"
      :disabled="isDisabled"
      :draggable="draggable"
      :drag-boundary="dragBoundary"
      :magnetic="magnetic"
      @click="onClick"
      @drag-start="onDragStart"
      @drag-move="onDragMove"
      @drag-end="onDragEnd"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "FloatButton 浮动按钮" },
})

const toast = useToast()

const currentType = ref("primary")
const currentIcon = ref("plus")
const showText = ref(false)
const showButton = ref(true)

const draggable = ref(false)
const dragBoundary = ref(true)
const magnetic = ref<false | "x" | "y" | "both">(false)
const dragInfo = ref("")
const currentSize = ref("100rpx")
const currentPosition = ref("right-bottom")
const customColor = ref("")
const foregroundColor = ref("#fff")
const iconSize = ref("40rpx")
const isDisabled = ref(false)

function onClick() {
  toast.success("点击了浮动按钮")
}

function onDragStart() {
  dragInfo.value = "拖拽开始"
}

function onDragMove(detail: { left: number; top: number }) {
  dragInfo.value = `移动中: X=${detail.left.toFixed(0)}, Y=${detail.top.toFixed(0)}`
}

function onDragEnd(detail: { left: number; top: number }) {
  dragInfo.value = `拖拽结束: X=${detail.left.toFixed(0)}, Y=${detail.top.toFixed(0)}`
}
</script>

<style lang="scss" scoped>
.switch-label {
  color: var(--ui-color-text);
  font-size: 28rpx;
  margin-left: 16rpx;
}

.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
