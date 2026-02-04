<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-tooltip content="这是一段提示文字">
          <ui-button type="primary">点击显示提示</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置">
      <demo-block :cols="2" :gap="24">
        <ui-tooltip content="顶部提示" placement="top">
          <ui-button>顶部 top</ui-button>
        </ui-tooltip>
        <ui-tooltip content="底部提示" placement="bottom">
          <ui-button>底部 bottom</ui-button>
        </ui-tooltip>
        <ui-tooltip content="左侧提示" placement="left">
          <ui-button>左侧 left</ui-button>
        </ui-tooltip>
        <ui-tooltip content="右侧提示" placement="right">
          <ui-button>右侧 right</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容">
      <demo-block>
        <ui-tooltip>
          <ui-button type="primary">自定义插槽内容</ui-button>
          <template #content>
            <view class="custom-tooltip">
              <ui-icon name="info" size="32rpx" color="#fff" />
              <text class="custom-tooltip__text">这是自定义的提示内容</text>
            </view>
          </template>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="浅色主题">
      <demo-block :cols="2" :gap="24">
        <ui-tooltip content="浅色主题提示" bg-color="#fff" text-color="#333">
          <ui-button>浅色背景</ui-button>
        </ui-tooltip>
        <ui-tooltip content="自定义颜色提示" bg-color="#1989fa" text-color="#fff">
          <ui-button type="primary">主题色背景</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="禁用状态">
      <demo-block :cols="2" :gap="24">
        <ui-tooltip content="此提示不会显示" disabled>
          <ui-button type="warning">禁用状态</ui-button>
        </ui-tooltip>
        <ui-tooltip content="此提示可以显示">
          <ui-button type="primary">正常状态</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="显示箭头">
      <demo-block :cols="2" :gap="24">
        <ui-tooltip content="带箭头的提示" :show-arrow="true">
          <ui-button>显示箭头</ui-button>
        </ui-tooltip>
        <ui-tooltip content="无箭头的提示" :show-arrow="false">
          <ui-button>隐藏箭头</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="受控模式">
      <demo-block direction="column" align="start" :gap="16">
        <view class="control-buttons">
          <ui-button size="small" @click="controlledVisible = true">打开</ui-button>
          <ui-button size="small" @click="controlledVisible = false">关闭</ui-button>
          <ui-button size="small" @click="controlledVisible = !controlledVisible">切换</ui-button>
        </view>
        <ui-tooltip v-model:visible="controlledVisible" content="受控模式的提示">
          <ui-button type="primary">受控模式 ({{ controlledVisible ? '显示中' : '已隐藏' }})</ui-button>
        </ui-tooltip>
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <ui-tooltip content="点击查看事件" @open="onOpen" @close="onClose">
          <ui-button type="primary">监听事件</ui-button>
        </ui-tooltip>
        <text class="demo-text">{{ eventLog }}</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Tooltip 文字提示" },
})

const toast = useToast()

// 受控模式
const controlledVisible = ref(false)

// 事件日志
const eventLog = ref("点击按钮触发事件")

// 事件处理
function onOpen() {
  eventLog.value = "触发 open 事件 - 提示框已打开"
  toast.success("提示框已打开")
}

function onClose() {
  eventLog.value = "触发 close 事件 - 提示框已关闭"
  toast.text("提示框已关闭")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.control-buttons {
  gap: 16rpx;
  display: flex;
}

.custom-tooltip {
  gap: 8rpx;
  display: flex;
  align-items: center;

  &__text {
    color: #fff;
    font-size: 24rpx;
  }
}
</style>
