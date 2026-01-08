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

    <demo-section title="显示/隐藏">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="showButton" />
        <text class="switch-label">{{ showButton ? "显示按钮" : "隐藏按钮" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="徽标功能">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="badgeType = 'none'">无徽标</ui-button>
          <ui-button size="small" @click="badgeType = 'dot'">小红点</ui-button>
          <ui-button size="small" @click="badgeType = 'number'">数字徽标</ui-button>
        </demo-block>
        <demo-block v-if="badgeType === 'number'" align="center" :gap="16">
          <text class="demo-text">徽标数值:</text>
          <ui-stepper v-model="badgeValue" :min="0" :max="200" />
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="可拖拽">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="draggable" />
        <text class="switch-label">{{ draggable ? "可拖拽" : "固定位置" }}</text>
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
        <demo-block :cols="4" :gap="16">
          <ui-button size="small" @click="customColor = ''">默认</ui-button>
          <ui-button size="small" @click="customColor = '#ff6b6b'">红色</ui-button>
          <ui-button size="small" @click="customColor = '#4ecdc4'">青色</ui-button>
          <ui-button size="small" @click="customColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">渐变</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="isDisabled" />
        <text class="switch-label">{{ isDisabled ? "已禁用" : "正常" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="isLoading" />
        <text class="switch-label">{{ isLoading ? "加载中" : "正常" }}</text>
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
      :right="currentPosition.includes('right') ? '24rpx' : '24rpx'"
      :bottom="currentPosition.includes('bottom') ? '150rpx' : '150rpx'"
      :color="customColor"
      :disabled="isDisabled"
      :loading="isLoading"
      :badge="badgeComputed"
      :draggable="draggable"
      @click="onClick"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "FloatButton 浮动按钮" },
})

const toast = useToast()

const currentType = ref("primary")
const currentIcon = ref("plus")
const showText = ref(false)
const showButton = ref(true)

const badgeType = ref<"none" | "dot" | "number">("none")
const badgeValue = ref(5)
const badgeComputed = computed(() => {
  if (badgeType.value === "dot") return true
  if (badgeType.value === "number") return badgeValue.value
  return false
})

const draggable = ref(false)
const currentSize = ref("100rpx")
const currentPosition = ref("right-bottom")
const customColor = ref("")
const isDisabled = ref(false)
const isLoading = ref(false)

function onClick() {
  if (isLoading.value) {
    toast.text("加载中，请稍候...")
    return
  }
  toast.success("点击了浮动按钮")
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
</style>
